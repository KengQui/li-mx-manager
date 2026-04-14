import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
  color?: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
}

export function FilterDropdown({ options, value, onChange, allLabel }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);
  const displayLabel = value === "all" ? allLabel : selected?.label ?? allLabel;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-transparent border-none hover:bg-black/5 rounded-full py-2 px-3.5 text-base font-sans text-black tracking-tight cursor-pointer whitespace-nowrap transition-colors"
      >
        <span>{displayLabel}</span>
        <ChevronDown className="w-5 h-5 opacity-50" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-[0px_8px_40px_rgba(189,195,214,0.5)] border border-black/5 py-2 min-w-[220px] z-[500]">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 text-base font-sans text-black/90 tracking-tight cursor-pointer border-none transition-colors ${
                value === option.value ? "bg-black/5" : "bg-transparent hover:bg-black/[0.03]"
              }`}
            >
              {option.color !== undefined && (
                <div
                  className="w-[22px] h-[22px] rounded-md shrink-0"
                  style={{ backgroundColor: option.color }}
                />
              )}
              <span className="flex-1">{option.label}</span>
              {option.count !== undefined && (
                <span className="text-black/40 text-sm">{option.count}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
