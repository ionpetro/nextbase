'use client';

import type { Editor } from '@tiptap/core';
import { EditorContent, useEditor } from '@tiptap/react';

import Toolbar from './Toolbar';
import { getTipTapExtention } from './extensions';
import { TiptapEditorProps } from './props';

export function TipTap({
  value,
  onChange,
  onBlur,
  placeholder,
}: {
  value: Record<string, unknown>;
  onChange: (editor: Editor | string) => void;
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
    <>
      <style>
        {`
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd; /* Customize this color as needed */
            pointer-events: none;
            height: 0;
          }
        `}
      </style>
      <div
        className="flex flex-col border-none justify-stretch"
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            editor?.chain().focus().run();
          }
        }}
        onClick={() => {
          editor?.chain().focus().run();
        }}
      >
        {/* {editor && <EditorBubbleMenu editor={editor} />} */}
        <Toolbar editor={editor} />
        <EditorContent editor={editor} className="px-4" />
      </div>
    </>
  );
}
