"use client";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { X } from "lucide-react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import type { BlogTagType, blogSchemaType } from "../blog/CreateBlogPostForm";
import { Button } from "../ui/button";



type TagsMultiInsertProps = {
  tags: BlogTagType[];
};

export function TagsMultiInsert({ tags }: TagsMultiInsertProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const { setValue, getValues } = useFormContext<blogSchemaType>();

  console.log(getValues("tags"), tags)

  const selectables = tags.filter(
    (tag) => !getValues("tags").map((t) => t.name).includes(tag.name)
  );

  console.log(selectables)
  const handleDelete = React.useCallback(
    (tagName: string) => {
      setValue(
        "tags",
        getValues("tags").filter((t) => t.name !== tagName),
      );
    },
    [setValue, getValues],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const tags = getValues("tags");
            setValue("tags", tags.slice(0, tags.length - 1));
          }
        }

        if (e.key === "Escape") {
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
          {getValues("tags").map((tag) => {
            return (
              <Badge
                key={tag.name}
                variant="secondary"
                className="rounded-lg py-0 px-4"
              >
                {tag.name}
                <Button
                  variant={"ghost"}
                  className="ml-1 ring-offset-background  outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-0 rounded-sm bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleDelete(tag.name);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => {
                    handleDelete(tag.name);
                  }}
                >
                  <X className="size-4 text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm" />
                </Button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((tag) => {
                return (
                  <CommandItem
                    key={tag.name}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setValue("tags", [...getValues("tags"), tag]);
                    }}
                    className={"cursor-pointer p-1 "}
                  >
                    {tag.name}
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
