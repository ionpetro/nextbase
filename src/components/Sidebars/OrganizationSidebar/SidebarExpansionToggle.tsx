import PanelLeftOpen from 'lucide-react/dist/esm/icons/panel-left-open';
import PanelLeftClose from 'lucide-react/dist/esm/icons/panel-left-close';

export function SidebarExpansionToggle({
  isSidebarExpanded,
  setIsSidebarExpanded,
}: {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (isExpanded: boolean) => void;
}) {
  return (
    <div
      className="absolute flex text-gray-700 dark:text-gray-400 justify-start transition-all hover:bg-gray-100 dark:hover:bg-gray-900 p-2.5 rounded-lg text-4xl cursor-pointer left-[calc(100%-19px)] items-start top-[10px]"
      onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
    >
      {isSidebarExpanded ? (
        <PanelLeftClose className="h-6 w-6 z-50" />
      ) : (
        <PanelLeftOpen className="h-6 w-6 z-50" />
      )}
    </div>
  );
}
