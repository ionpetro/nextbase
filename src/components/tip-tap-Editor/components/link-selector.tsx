import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { Check } from "lucide-react";
import { Trash } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-full items-center space-x-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted active:bg-muted"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className="text-base">↗</p>
        <p
          className={cn("underline decoration-muted underline-offset-4", {
            "text-primary-foreground": editor.isActive("link"),
          })}
        >
          Link
        </p>
      </button>
      {isOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form[0] as HTMLInputElement;
            editor.chain().focus().setLink({ href: input.value }).run();
            setIsOpen(false);
          }}
          className="fixed top-full z-[99999] mt-1 flex w-60 overflow-hidden rounded border bg-background  p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <input
            ref={inputRef}
            type="url"
            placeholder="Paste a link"
            className="flex-1 bg-background p-1 text-sm outline-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <button
              type="button"
              className="flex items-center rounded-sm p-1 text-destructive-foreground transition-all hover:bg-destructive "
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center rounded-sm p-1 text-muted-foreground transition-all hover:bg-muted"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
        </form>
      )}
    </div>
  );
};
