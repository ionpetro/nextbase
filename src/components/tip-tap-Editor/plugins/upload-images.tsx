import { Plugin, PluginKey, type EditorState } from '@tiptap/pm/state';
import { Decoration, DecorationSet, type EditorView } from '@tiptap/pm/view';
import axios from 'axios';
import { toast } from 'sonner';

const uploadKey = new PluginKey('upload-image');

const UploadImagesPlugin = () =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);
        // See if the transaction adds or removes any placeholders
        const action = tr.getMeta(uploadKey);
        if (action && action.add) {
          const { id, pos, src } = action.add;

          const placeholder = document.createElement('div');
          placeholder.setAttribute('class', 'img-placeholder');
          const image = document.createElement('img');
          image.setAttribute(
            'class',
            'opacity-40 rounded-lg border border-stone-200',
          );
          image.src = src;
          placeholder.appendChild(image);
          const deco = Decoration.widget(pos + 1, placeholder, {
            id,
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(
              undefined,
              undefined,
              (spec) => spec.id == action.remove.id,
            ),
          );
        }
        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

export default UploadImagesPlugin;

function findPlaceholder(state: EditorState, id: Record<string, never>) {
  const decos = uploadKey.getState(state);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const found = decos.find(null, null, (spec: { id: any }) => spec.id == id);
  return found.length ? found[0].from : null;
}

export function startImageUpload(file: File, view: EditorView, pos: number) {
  // check if the file is an image
  if (!file.type.includes('image/')) {
    toast.error('File type not supported.');
    return;

    // check if the file size is less than 20MB
  } else if (file.size / 1024 / 1024 > 20) {
    toast.error('File size too big (max 20MB).');
    return;
  }

  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    tr.setMeta(uploadKey, {
      add: {
        id,
        pos,
        src: reader.result,
      },
    });
    view.dispatch(tr);
  };

  handleImageUpload(file).then((src) => {
    const { schema } = view.state;

    const pos = findPlaceholder(view.state, id);
    // If the content around the placeholder has been deleted, drop
    // the image
    if (pos == null) return;

    // Otherwise, insert it at the placeholder's position, and remove
    // the placeholder

    // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
    // the image locally
    const imageSrc = typeof src === 'object' ? reader.result : src;
    console.log('handleImageUpload imageSrc', imageSrc);

    const node = schema.nodes.image.create({ src: imageSrc });
    const transaction = view.state.tr
      .replaceWith(pos, pos, node)
      .setMeta(uploadKey, { remove: { id } });
    view.dispatch(transaction);
  });
}

export const handleImageUpload = (file: File) => {
  // upload to Vercel Blob
  const formData = new FormData();
  formData.append('file', file);
  console.log('image formData', formData);
  return new Promise((resolve) => {
    toast.promise(
      axios
        .post('/api/tasks/uploadImage', formData, {
          withCredentials: true,
        })
        .then(async ({ data }) => {
          const { publicUrl: url } = data as unknown as {
            publicUrl: string;
          };
          // preload the image
          const image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
        }),
      {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully.',
        error: (e) => e.message,
      },
    );
  });
};
