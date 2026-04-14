import { Link, useLocation } from "wouter";

type ViewToggleProps = {
  active: "card" | "list" | "people";
};

export function ViewToggle({ active }: ViewToggleProps) {
  const routes = {
    card: "/items",
    list: "/focused/0",
    people: "/small",
  };

  const icons = {
    card: (opacity: string) => (
      <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="black" fillOpacity={opacity} />
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="black" fillOpacity={opacity} />
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="black" fillOpacity={opacity} />
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="black" fillOpacity={opacity} />
      </svg>
    ),
    list: (opacity: string) => (
      <svg className="w-[18px] h-[16px]" viewBox="0 0 18.4444 16.6" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.68889 0C1.65157 0 0 1.65157 0 3.68889C0 5.72621 1.65157 7.37778 3.68889 7.37778H14.7556C16.7929 7.37778 18.4444 5.72621 18.4444 3.68889C18.4444 1.65157 16.7929 0 14.7556 0H3.68889ZM1.84444 3.68889C1.84444 2.67023 2.67023 1.84444 3.68889 1.84444H14.7556C15.7742 1.84444 16.6 2.67023 16.6 3.68889C16.6 4.70755 15.7742 5.53333 14.7556 5.53333H3.68889C2.67023 5.53333 1.84444 4.70755 1.84444 3.68889Z" fill="black" fillOpacity={opacity} />
        <path fillRule="evenodd" clipRule="evenodd" d="M3.68889 9.22222C1.65157 9.22222 0 10.8738 0 12.9111C0 14.9484 1.65157 16.6 3.68889 16.6H14.7556C16.7929 16.6 18.4444 14.9484 18.4444 12.9111C18.4444 10.8738 16.7929 9.22222 14.7556 9.22222H3.68889ZM1.84444 12.9111C1.84444 11.8925 2.67023 11.0667 3.68889 11.0667H14.7556C15.7742 11.0667 16.6 11.8925 16.6 12.9111C16.6 13.9298 15.7742 14.7556 14.7556 14.7556H3.68889C2.67023 14.7556 1.84444 13.9298 1.84444 12.9111Z" fill="black" fillOpacity={opacity} />
      </svg>
    ),
    people: (opacity: string) => (
      <svg className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="6" r="3.5" stroke="black" strokeOpacity={opacity} strokeWidth="1.8" fill="none" />
        <path d="M3.5 17.5C3.5 13.9 6.4 11 10 11C13.6 11 16.5 13.9 16.5 17.5" stroke="black" strokeOpacity={opacity} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  };

  const order: ("card" | "list" | "people")[] = ["card", "list", "people"];
  const roundedClasses = ["rounded-l-[34.5px]", "", "rounded-r-[34.5px]"];

  return (
    <div className="flex items-center shrink-0 h-[48px] p-1 bg-white/20 rounded-[34.5px] shadow-[0px_8px_40px_0px_rgba(189,195,214,0.4)]">
      {order.map((view, i) => {
        const isActive = active === view;
        const opacity = isActive ? "0.85" : "0.45";
        const bgClass = isActive ? "bg-[rgba(245,245,245,0.1)]" : "bg-transparent";
        const borderClass = i < order.length - 1 ? "border-r-[0.7px] border-solid border-black/10" : "";

        if (isActive) {
          return (
            <button
              key={view}
              className={`w-[41.5px] h-full border-none ${bgClass} ${borderClass} ${roundedClasses[i]} cursor-default flex items-center justify-center`}
            >
              {icons[view](opacity)}
            </button>
          );
        }

        return (
          <Link
            key={view}
            href={routes[view]}
            className={`w-[41.5px] h-full border-none ${bgClass} ${borderClass} ${roundedClasses[i]} cursor-pointer flex items-center justify-center hover:opacity-80 transition-opacity`}
          >
            {icons[view](opacity)}
          </Link>
        );
      })}
    </div>
  );
}
