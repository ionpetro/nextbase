'use client';

import type { Editor } from '@tiptap/core';
import { EditorContent, useEditor } from '@tiptap/react';

import { EditorBubbleMenu } from './components/EditorBubbleMenu';
import { getTipTapExtention } from './extensions';
import { TiptapEditorProps } from './props';

export function TipTapEditor({
  value,
  onChange,
  onBlur,
  placeholder,
}: {
  value: Record<string, unknown>;
  onChange: (editor: Editor) => void;
  onBlur?: () => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: getTipTapExtention({ placeholder }),
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      onChange(e.editor);
    },
    autofocus: 'end',
    content: value,
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
