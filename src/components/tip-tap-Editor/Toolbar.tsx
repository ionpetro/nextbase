'use client';

import { LucideIcon } from '@/components/LucideIcon';
import type { Editor } from '@tiptap/react';
import { useCallback, useState, type FC } from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Toggle } from '../ui/toggle';
import { ColorSelect } from './components/color-selector-select';
import { startImageUpload } from './plugins/upload-images';

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar: FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const headings = [
    {
      name: 'Paragraph',
      command: () =>
        editor.chain().focus().toggleNode('paragraph', 'paragraph').run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive('paragraph') &&
        !editor.isActive('bulletList') &&
        !editor.isActive('orderedList'),
    },
    {
      name: 'Heading 1',
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      name: 'Heading 2',
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      name: 'Heading 3',
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
  ];

  const [alignmentText, setAlignmentText] = useState('left');

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center px-2 py-1 space-x-2 border-b-2 sticky top-0 z-10 bg-background">
      <Select
        onValueChange={(value) => {
          const selectedHeading = headings.find(
            (heading) => heading.name === value,
          );
          selectedHeading?.command();
        }}
      >
        <SelectTrigger className="flex items-center w-fit gap-2 border-none">
          <SelectValue defaultValue="Paragraph" placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {headings.map((heading, index) => (
              <SelectItem key={heading.name} value={heading.name}>
                {`${heading.name}heading`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-8" />

      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <LucideIcon name="Bold" size={16} />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <LucideIcon name="Italic" size={16} />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.commands.toggleUnderline()}
      >
        <LucideIcon name="Underline" size={16} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.commands.toggleStrike()}
      >
        <LucideIcon name="Strikethrough" size={16} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <LucideIcon name="Code" size={16} />
      </Toggle>

      <ColorSelect editor={editor} />

      <Toggle size="sm">
        <div className="relative">
          <LucideIcon name="PaintBucket" size={16} />
          <Input
            type="color"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onInput={(event: any) =>
              editor.chain().focus().setColor(event.target.value).run()
            }
            value={editor.getAttributes('textStyle').color}
            data-testid="setColor"
            className="absolute opacity-0 -bottom-3"
          />
        </div>
      </Toggle>
      <Separator orientation="vertical" className="h-8" />
      <Select
        defaultValue={alignmentText}
        onValueChange={(value) => {
          setAlignmentText(value);
          editor.chain().focus().setTextAlign(value).run();
        }}
      >
        <SelectTrigger className="flex items-center border-none gap-1 p-2 px-2 h-fit focus:ring-0 text-sm font-medium rounded-md text-foreground hover:bg-muted active:bg-muted w-fit">
          {alignmentText === 'left' ? (
            <LucideIcon name="AlignLeft" size={16} />
          ) : alignmentText === 'center' ? (
            <LucideIcon name="AlignCenter" size={16} />
          ) : (
            <LucideIcon name="AlignRight" size={16} />
          )}
        </SelectTrigger>
        <SelectContent className="">
          <SelectGroup>
            <SelectItem value="left">
              <LucideIcon name="AlignLeft" size={16} />
            </SelectItem>
            <SelectItem value="center">
              <LucideIcon name="AlignCenter" size={16} />
            </SelectItem>
            <SelectItem value="right">
              <LucideIcon name="AlignRight" size={16} />
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </div>
          <ChevronDown className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-counterclockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
            </svg>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.commands.toggleBulletList()}
      >
        <LucideIcon name="List" size={16} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.commands.toggleOrderedList()}
      >
        <LucideIcon name="ListOrdered" size={16} />
      </Toggle>
      <Separator orientation="vertical" className="h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive('link')}
        onPressedChange={setLink}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-link"
          viewBox="0 0 16 16"
        >
          <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
          <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
        </svg>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('table')}
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <LucideIcon name="Table" size={16} />
      </Toggle>

      <div
        className="hover:bg-muted p-2 flex items-center justify-center rounded-md"
        onClick={() => {
          if (!editor) return;
          const range = {
            from: editor.view.state.selection.from,
            to: editor.view.state.selection.to,
          };
          editor.chain().focus().deleteRange(range).run();
          // upload image
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async () => {
            if (input.files?.length) {
              const file = input.files[0];
              const pos = editor.view.state.selection.from;
              startImageUpload(file, editor.view, pos);
            }
          };
          input.click();
          // input.multiple = true; // Allow multiple file selection
          // input.onchange = async () => {
          //   if (input.files?.length) {
          //     const filesArray = Array.from(input.files);
          //     setDescriptionImages(filesArray); // Pass the array of files to setDescriptionImages
          //   }
          // };
          // input.click();
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            if (!editor) return;
            const range = {
              from: editor.view.state.selection.from,
              to: editor.view.state.selection.to,
            };
            editor.chain().focus().deleteRange(range).run();
            // upload image
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = async () => {
              if (input.files?.length) {
                const file = input.files[0];
                const pos = editor.view.state.selection.from;
                startImageUpload(file, editor.view, pos);
              }
            };
            input.click();
            // input.multiple = true; // Allow multiple file selection
            // input.onchange = async () => {
            //   if (input.files?.length) {
            //     const filesArray = Array.from(input.files);
            //     setDescriptionImages(filesArray); // Pass the array of files to setDescriptionImages
            //   }
            // };
            // input.click();
          }
        }}
      >
        <LucideIcon name="Image" size={16} />
      </div>

      {/* <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 size={16} />
      </Toggle> */}
    </div>
  );
};

export default Toolbar;
