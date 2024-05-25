import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import type { Editor } from '@tiptap/core';
import type { FC } from 'react';

export interface BubbleColorMenuItem {
  name: string;
  color: string | null;
}

interface ColorSelectProps {
  editor: Editor;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--text-foreground)',
  },
  {
    name: 'Purple',
    color: '#9333EA',
  },
  {
    name: 'Red',
    color: '#E00000',
  },
  {
    name: 'Yellow',
    color: '#EAB308',
  },
  {
    name: 'Blue',
    color: '#2563EB',
  },
  {
    name: 'Green',
    color: '#008A00',
  },
  {
    name: 'Orange',
    color: '#FFA500',
  },
  {
    name: 'Pink',
    color: '#BA4081',
  },
  {
    name: 'Gray',
    color: '#A8A29E',
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'transparent',
  },
  {
    name: 'Purple',
    color: 'var(--novel-highlight-purple)',
  },
  {
    name: 'Red',
    color: 'var(--novel-highlight-red)',
  },
  {
    name: 'Yellow',
    color: 'var(--novel-highlight-yellow)',
  },
  {
    name: 'Blue',
    color: 'var(--novel-highlight-blue)',
  },
  {
    name: 'Green',
    color: 'var(--novel-highlight-green)',
  },
  {
    name: 'Orange',
    color: 'var(--novel-highlight-orange)',
  },
  {
    name: 'Pink',
    color: 'var(--novel-highlight-pink)',
  },
  {
    name: 'Gray',
    color: 'var(--novel-highlight-gray)',
  },
];

export const ColorSelect: FC<ColorSelectProps> = ({ editor }) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color }),
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color }),
  );

  return (
    <div className="relative h-full">
      <Select
        onValueChange={(value) => {
          const colorItem = TEXT_COLORS.find(({ name }) => name === value);
          if (colorItem?.color) {
            editor.commands.unsetColor();
            editor.chain().focus().setColor(colorItem.color).run();
          }
          const highlightItem = HIGHLIGHT_COLORS.find(
            ({ name }) => name === value,
          );
          if (highlightItem?.color) {
            editor.commands.unsetHighlight();
            editor.commands.setHighlight({ color: highlightItem.color });
          }
        }}
      >
        <SelectTrigger
          aria-label="Select color or highlight"
          className="flex items-center border-none gap-1 p-2 px-2 h-fit focus:ring-0 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted active:bg-muted"
        >
          <span
            className="rounded-sm px-1 text-foreground underline"
            style={{
              color: activeColorItem?.color ?? undefined,
              backgroundColor: activeHighlightItem?.color ?? undefined,
            }}
          >
            A
          </span>
        </SelectTrigger>
        <SelectContent className="w-40">
          <SelectGroup>
            <SelectLabel>Color</SelectLabel>
            {TEXT_COLORS.map(({ name, color }) => (
              <SelectItem key={`${name}text-color`} value={name}>
                <div className="flex items-center space-x-2">
                  <div
                    className="flex space-x-2 rounded-sm border px-1 py-px w-fit font-medium"
                    style={{ color: color ?? undefined }}
                  >
                    A
                  </div>
                  <span>{name}</span>
                </div>
              </SelectItem>
            ))}
            <SelectLabel>Background</SelectLabel>
            {HIGHLIGHT_COLORS.map(({ name, color }) => (
              <SelectItem key={`${name}-highlight`} value={name}>
                <div className="flex items-center space-x-2">
                  <div
                    className="rounded-sm border px-1 py-px w-fit font-medium"
                    style={{ backgroundColor: color ?? undefined }}
                  >
                    A
                  </div>
                  <span className="bg-">{name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
