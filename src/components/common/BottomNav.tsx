import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/home", label: "Home", icon: "home" },
  { to: "/pets", label: "Pets", icon: "pets" },
  { to: "/routines", label: "Routines", icon: "assignment" },
  { to: "/calendar", label: "Calendar", icon: "calendar_today" },
];

export function BottomNav() {
  return (
    <nav className="bg-surface-container-high dark:bg-surface-container-highest border-t border-paper-shadow fixed bottom-0 w-full z-50 rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(232,228,214,0.5)] md:hidden">
      <div className="flex justify-around items-center px-4 py-2 pb-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1.5 transition-all active:translate-y-0.5 transition-transform duration-200"
                : "flex flex-col items-center justify-center text-on-surface-variant opacity-70 p-2 hover:text-primary dark:hover:text-primary-fixed active:translate-y-0.5 transition-transform duration-200"
            }
          >
            {({ isActive }) => (
              <>
                <span 
                  className="material-symbols-outlined" 
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md mt-1">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
