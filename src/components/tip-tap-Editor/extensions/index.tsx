import { BulletList } from '@tiptap/extension-bullet-list';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TiptapImage from '@tiptap/extension-image';
import TiptapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import TiptapUnderline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

import { InputRule } from '@tiptap/core';
import UploadImagesPlugin from '../plugins/upload-images';
import SlashCommand from './slash-command';

const CustomImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [UploadImagesPlugin()];
  },
});

export const getTipTapExtention = ({
  placeholder,
}: {
  placeholder?: string | undefined;
}) => {
  return [
    StarterKit.configure({
      bulletList: {
        HTMLAttributes: {
          class: 'list-disc list-outside leading-3 -mt-2',
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: 'list-decimal list-outside leading-3 -mt-2',
        },
      },
      listItem: {
        HTMLAttributes: {
          class: 'leading-normal -mb-2',
        },
      },
      blockquote: {
        HTMLAttributes: {
          class: 'border-l-4',
        },
      },
      codeBlock: {
        HTMLAttributes: {
          class:
            'rounded-sm bg-muted p-5 font-mono font-medium text-foreground',
        },
      },
      code: {
        HTMLAttributes: {
          class:
            'rounded-md bg-muted px-1.5 py-1 font-mono font-medium text-foreground',
          spellcheck: 'false',
        },
      },
      horizontalRule: false,
      dropcursor: {
        color: '#DBEAFE',
        width: 4,
      },
      gapcursor: false,
    }),
    // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
    HorizontalRule.extend({
      addInputRules() {
        return [
          new InputRule({
            find: /^(?:---|—-|___\s|\*\*\*\s)$/,
            handler: ({ state, range }) => {
              const attributes = {};

              const { tr } = state;
              const start = range.from;
              const end = range.to;

              tr.insert(start - 1, this.type.create(attributes)).delete(
                tr.mapping.map(start),
                tr.mapping.map(end),
              );
            },
          }),
        ];
      },
    }).configure({
      HTMLAttributes: {
        class: 'mt-4 mb-6 border-t',
      },
    }),
    TiptapLink.configure({
      HTMLAttributes: {
        class:
          'text-foreground underline underline-offset-[3px] hover:text-muted-foreground transition-colors cursor-pointer',
      },
    }),
    CustomImage.configure({
      allowBase64: true,
      HTMLAttributes: {
        class: 'rounded-lg border',
      },
    }),

    SlashCommand,
    TiptapUnderline,
    TextStyle,
    Color,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Highlight.configure({
      multicolor: true,
    }),
    TaskList.configure({
      HTMLAttributes: {
        class: 'not-prose pl-2',
      },
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (placeholder) {
          return placeholder;
        }
        if (node.type.name === 'heading') {
          return `Heading ${node.attrs.level}`;
        }
        return 'Hello world...';
      },
      includeChildren: true,
    }),
    TaskItem.configure({
      HTMLAttributes: {
        class: 'flex items-start my-4',
      },
      nested: true,
    }),
    Markdown.configure({
      html: false,
      transformCopiedText: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    BulletList.configure({
      itemTypeName: 'listItem',
    }),
  ];
};
