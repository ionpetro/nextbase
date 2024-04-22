'use client';

import { EditorContent, generateJSON, useEditor } from '@tiptap/react';
import Toolbar from './Toolbar';
import { getTipTapExtention } from './extensions';
import { TiptapEditorProps } from './props';

interface TipTapProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export default function TipTap({
  value,
  onChange,
  onBlur,
  placeholder,
}: TipTapProps) {
  const TiptapExtensions = getTipTapExtention({
    placeholder: placeholder || undefined,
  });

  const editor = useEditor({
    extensions: TiptapExtensions,
    content: generateJSON(value, TiptapExtensions),
    editorProps: TiptapEditorProps,
    autofocus: 'end',
    onUpdate(e) {
      onChange(e.editor.getHTML());
    },
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
