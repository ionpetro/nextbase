'use client';

import { useEditor, EditorContent, generateJSON } from '@tiptap/react';
import { TiptapEditorProps } from './props';
import { TiptapExtensions } from './extensions';
import { EditorBubbleMenu } from './components';

export function TipTapEditor({
  value,
  onChange,
  onBlur,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) {
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      onChange(e.editor.getHTML());
    },
    autofocus: 'end',
    content: generateJSON(value, TiptapExtensions),
    onBlur,
  });

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="relative min-h-[500px] w-full max-w-screen-lg border bg-white dark:bg-slate-950 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
