import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { useTheme } from "../../hooks/useTheme";
import { useApp } from "../../contexts/AppContext";

interface LayoutProps {
  title?: string;
  children: ReactNode;
  hideNav?: boolean;
}

export function Layout({ title, children, hideNav = false }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { selectedPet } = useApp();

  return (
    <div className="flex min-h-dvh bg-surface-bright text-on-surface font-body-md transition-colors">
      {!hideNav && <Sidebar />}
      <div className={`flex flex-1 flex-col ${!hideNav ? "md:ml-64" : ""}`}>
        {title && (
          <header className="w-full top-0 sticky bg-surface dark:bg-surface-dim border-b border-paper-shadow shadow-[0_2px_0_0_rgba(232,228,214,1)] z-30 md:hidden flex items-center justify-between px-margin-mobile py-4">
            <h1 className="font-headline-md text-headline-md-mobile text-primary italic tracking-tight">{title}</h1>
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="text-on-surface-variant hover:opacity-80 transition-opacity">
                 {theme === "dark" ? "🌙" : "☀️"}
              </button>
              {selectedPet && (
                <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-paper-shadow hover:opacity-80 transition-opacity cursor-pointer">
                  {selectedPet.photoBase64 ? (
                     <img src={selectedPet.photoBase64} alt="" className="w-full h-full object-cover" />
                  ) : (
                     <span className="flex h-full w-full items-center justify-center text-sm">{selectedPet.emoji}</span>
                  )}
                </div>
              )}
            </div>
          </header>
        )}
        <main className={`flex-grow max-w-container-max mx-auto w-full px-margin-mobile py-stack-lg md:px-gutter ${hideNav ? "" : "pb-32"}`}>
          {children}
        </main>
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}
