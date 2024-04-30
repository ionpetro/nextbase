'use client';

import { LucideIcon, LucideIconProps } from '@/components/LucideIcon';
import { cn } from '@/utils/cn';
import { BubbleMenu, type BubbleMenuProps } from '@tiptap/react';
import { useState, type FC } from 'react';
import { ColorSelector } from './color-selector';
import { LinkSelector } from './link-selector';
import { NodeSelector } from './node-selector';

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: LucideIconProps['name'];
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children' | 'editor'> & {
  editor: NonNullable<BubbleMenuProps['editor']>;
};

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const { editor } = props;

  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => editor.isActive('bold'),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: 'Bold',
    },
    {
      name: 'italic',
      isActive: () => editor.isActive('italic'),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: 'Italic',
    },
    {
      name: 'underline',
      isActive: () => editor.isActive('underline'),
      command: () => editor.chain().focus().toggleUnderline().run(),
      icon: 'Underline',
    },
    {
      name: 'strike',
      isActive: () => editor.isActive('strike'),
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: 'Strikethrough',
    },
    {
      name: 'code',
      isActive: () => editor.isActive('code'),
      command: () => editor.chain().focus().toggleCode().run(),
      icon: 'Code',
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor }) => {
      // don't show if image is selected
      if (editor.isActive('image')) {
        return false;
      }
      return editor.view.state.selection.content().size > 0;
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
      },
    },
  };

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex w-fit divide-x divide-stone-200 dark:divide-slate-800 rounded border dark:border-slate-700  bg-white dark:bg-slate-950 shadow-xl"
    >
      <NodeSelector
        editor={editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsLinkSelectorOpen(false);
        }}
      />
      <LinkSelector
        editor={editor}
        isOpen={isLinkSelectorOpen}
        setIsOpen={() => {
          setIsLinkSelectorOpen(!isLinkSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsNodeSelectorOpen(false);
        }}
      />
      <div className="flex">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={item.command}
            className="p-2 text-muted-foreground hover:bg-muted  active:bg-muted "
          >
            <LucideIcon
              name={item.icon}
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(),
              })}
            />
          </button>
        ))}
      </div>
      <ColorSelector
        editor={editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen);
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
        }}
      />
    </BubbleMenu>
  );
};
