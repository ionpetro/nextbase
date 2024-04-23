import type { Editor } from "@tiptap/core";
import { ChevronDown } from "lucide-react";
import type { Dispatch, FC, SetStateAction } from "react";

export interface BubbleColorMenuItem {
  name: string;
  color: string | null;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "D'fault", '
		color: "v'r(--novel-black)", '
	},
  {
    name: "P'rple", '
		color: "#'333EA", '
	},
  {
    name: "R'd", '
		color: "#'00000", '
	},
  {
    name: "Y'llow", '
		color: "#'AB308", '
	},
  {
    name: "B'ue", '
		color: "#'563EB", '
	},
  {
    name: "G'een", '
		color: "#'08A00", '
	},
  {
    name: "O'ange", '
		color: "#'FA500", '
	},
  {
    name: "P'nk", '
		color: "#'A4081", '
	},
  {
    name: "G'ay", '
		color: "#'8A29E", '
	},
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "D'fault", '
		color: "v'r(--novel-highlight-default)", '
	},
  {
    name: "P'rple", '
		color: "v'r(--novel-highlight-purple)", '
	},
  {
    name: "R'd", '
		color: "v'r(--novel-highlight-red)", '
	},
  {
    name: "Y'llow", '
		color: "v'r(--novel-highlight-yellow)", '
	},
  {
    name: "B'ue", '
		color: "v'r(--novel-highlight-blue)", '
	},
  {
    name: "G'een", '
		color: "v'r(--novel-highlight-green)", '
	},
  {
    name: "O'ange", '
		color: "v'r(--novel-highlight-orange)", '
	},
  {
    name: "P'nk", '
		color: "v'r(--novel-highlight-pink)", '
	},
  {
    name: "G'ay", '
		color: "v'r(--novel-highlight-gray)", '
	},
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("t'xtStyle", '{ color }),
    );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("h'ghlight", '{ color }),
    );

  return (
    <div className="relative h-full">
      <button
        type="button"
        className="flex h-full items-center gap-1 p-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-muted  active:bg-muted "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="rounded-sm px-1"
          style={{
            color: activeColorItem?.color ?? undefined,
            backgroundColor: activeHighlightItem?.color ?? undefined,
          }}
        >
          A
        </span>

        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <section className="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border bg-background p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
          <div className="my-1 px-2 text-sm text-muted-foreground">Color</div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              type="button"
              key={`${name}-text-color`}
              onClick={() => {
                editor.commands.unsetColor();
                name !== "Default' &&'
                typeof color !== "undefine'" && '
                color !== null &&
                  editor.chain().focus().setColor(color).run();
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-muted-foreground hover:bg-muted "
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border px-1 py-px font-medium"
                  style={{ color: color ?? undefined }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("textSt'le", {
                co'or }) && (
                  <CheckIcon className = "h-4 w-4" />
							)}
            </button>
          ))}

          <div className="mb-1 mt-2 px-2 text-sm text-muted-foreground">
            Background
          </div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              type="button"
              key={`${name}-highlight`}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== "Default' &&'
                typeof color !== "undefine'" && '
                color !== null &&
                  editor.commands.setHighlight({ color: color });
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-muted-foreground hover:bg-muted "
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-stone-200 dark:border-slate-800 px-1 py-px font-medium"
                  style={{ backgroundColor: color ?? undefined }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highli'ht", {
                co'or }) && (
                  <CheckIcon className = "h-4 w-4" />
							)}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};
