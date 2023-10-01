import { Editor } from '@tiptap/core';
import Check from 'lucide-react/dist/esm/icons/check';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import Heading1 from 'lucide-react/dist/esm/icons/heading-1';
import Heading2 from 'lucide-react/dist/esm/icons/heading-2';
import Heading3 from 'lucide-react/dist/esm/icons/heading-3';
import QuoteIcon from 'lucide-react/dist/esm/icons/quote';
import ListOrdered from 'lucide-react/dist/esm/icons/list-ordered';
import TextIcon from 'lucide-react/dist/esm/icons/text';
import Code from 'lucide-react/dist/esm/icons/code';
import CheckSquare from 'lucide-react/dist/esm/icons/check-square';
import { Dispatch, FC, SetStateAction } from 'react';

import { BubbleMenuItem } from './EditorBubbleMenu';

interface NodeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NodeSelector: FC<NodeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'Text',
      icon: TextIcon,
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
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      name: 'Heading 2',
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      name: 'Heading 3',
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      name: 'To-do List',
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskItem'),
    },
    {
      name: 'Bullet List',
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      name: 'Numbered List',
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      name: 'Quote',
      icon: QuoteIcon,
      command: () =>
        editor
          .chain()
          .focus()
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      name: 'Code',
      icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: 'Multiple',
  };

  return (
    <div className="relative h-full">
      <button
        type="button"
        className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-900 active:bg-stone-200 dark:active:bg-slate-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{activeItem?.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <section className="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border dark:border-slate-700 bg-white dark:bg-slate-950 p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-900"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 p-1">
                  <item.icon className="h-3 w-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && <Check className="h-4 w-4" />}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};
