'use client';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import type { blogSchemaType } from '../blog/CreateBlogPostForm';
import { Button } from '../ui/button';

const FRAMEWORKS = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
  {
    value: 'wordpress',
    label: 'WordPress',
  },
  {
    value: 'express.js',
    label: 'Express.js',
  },
  {
    value: 'nest.js',
    label: 'Nest.js',
  },
];

export function TagsMultiInsert() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const { setValue, getValues } = useFormContext<blogSchemaType>();
  const [inputValue, setInputValue] = React.useState('');

  const selectables = FRAMEWORKS.filter(
    (framework) => !getValues('tags').includes(framework.value),
  );
  const handleDelete = React.useCallback(
    (tag: string) => {
      setValue(
        'tags',
        getValues('tags').filter((t) => t !== tag),
      );
    },
    [setValue, getValues],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            const tags = getValues('tags');
            setValue('tags', tags.slice(0, tags.length - 1));
          }
        }

        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [getValues, setValue],
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent flex flex-col"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ">
        <div className="flex gap-1 flex-wrap">
          {getValues('tags').map((tag) => {
            return (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-lg py-0 px-4"
              >
                {tag}
                <Button
                  variant={'ghost'}
                  className="ml-1 ring-offset-background  outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-0 rounded-sm bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleDelete(tag);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => {
                    handleDelete(tag);
                  }}
                >
                  <X className="size-4 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm" />
                </Button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
        </div>
        <CommandPrimitive.Input
          ref={inputRef}
          value={inputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onValueChange={setInputValue}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              const values = getValues('tags');
              if (values.includes(inputValue) || inputValue === '') {
                return;
              }
              setValue('tags', [...values, inputValue]);
              setInputValue('');
            }
          }}
          placeholder="Insert tags"
          className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1  focus-visible:ring-none border-none focus:ring-transparent"
        />
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((framework) => {
                return (
                  <CommandItem
                    key={framework.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue('');
                      setValue('tags', [...getValues('tags'), framework.label]);
                    }}
                    className={'cursor-pointer p-1 '}
                  >
                    {framework.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
