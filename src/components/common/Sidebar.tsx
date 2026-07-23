import { NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const navItems = [
  { to: "/home", label: "Today's Entry", icon: "home" },
  { to: "/pets", label: "Pets", icon: "pets" },
  { to: "/routines", label: "Routines", icon: "assignment" },
  { to: "/calendar", label: "Calendar", icon: "calendar_today" },
];

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-64 flex-col border-r border-paper-shadow bg-surface dark:bg-surface-dim shadow-[2px_0_0_0_rgba(232,228,214,1)] md:flex transition-colors">
      <div className="p-6 flex items-center justify-between">
        <h1 className="font-headline-lg text-headline-lg text-primary italic tracking-tight">Dang Care</h1>
        <button onClick={toggleTheme} className="rounded-full p-2 text-xl hover:bg-surface-container-high transition-colors">
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
      <nav className="flex-1 space-y-2 px-4 mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md transition-colors ${
                isActive
                  ? "bg-primary-container text-on-primary-container shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
