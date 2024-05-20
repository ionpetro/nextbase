"use client";
import { SidebarVisibilityContext } from "@/contexts/SidebarVisibilityContext";
import { cn } from "@/utils/cn";
import { useContext, type ReactNode } from "react";
import { SidebarShell } from "./SidebarShell/SidebarShell";

export function ClientShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  const { isVisible } = useContext(SidebarVisibilityContext);

  return (
    <div
      className={cn(
        "h-screen w-full overflow-hidden grid",
        isVisible ? "lg:grid lg:grid-cols-[auto,1fr]" : "",
      )}
    >
      <SidebarShell>{sidebar}</SidebarShell>
      <div className="h-full overflow-y-auto bg-muted">
        <div
          className="relative flex-1 h-auto w-full overflow-auto"
          id="export-container"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
