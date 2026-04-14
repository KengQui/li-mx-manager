import { useMemo } from "react";
import type { BriefingCard as BriefingCardType } from "@/lib/data";

const URGENCY_ORDER = ["critical", "important", "headsup", "light", "ai"] as const;

const URGENCY_BAR_COLORS: Record<string, string> = {
  critical: "#D94040",
  important: "#E5A13A",
  headsup: "#4766FF",
  light: "#B8BDD0",
  ai: "#A78BFA",
};

const URGENCY_LABELS: Record<string, string> = {
  critical: "Critical",
  important: "Important",
  headsup: "Heads up",
  light: "Good to know",
  ai: "AI",
};

type Props = {
  cards: BriefingCardType[];
};

const EXCLUDED_CATEGORIES = ["Team Patterns & Signals"];

export function BriefingChart({ cards }: Props) {
  const { categoryData, maxCount, activeUrgencies } = useMemo(() => {
    const catMap: Record<string, Record<string, number>> = {};
    cards.filter((c) => !EXCLUDED_CATEGORIES.includes(c.category)).forEach((c) => {
      if (!catMap[c.category]) catMap[c.category] = {};
      catMap[c.category][c.urgency] = (catMap[c.category][c.urgency] || 0) + 1;
    });

    const data = Object.entries(catMap)
      .map(([category, urgencies]) => {
        const total = Object.values(urgencies).reduce((a, b) => a + b, 0);
        return { category, urgencies, total };
      })
      .sort((a, b) => b.total - a.total);

    const max = Math.max(...data.map((d) => d.total), 1);

    const active = new Set<string>();
    cards.forEach((c) => active.add(c.urgency));

    return { categoryData: data, maxCount: max, activeUrgencies: active };
  }, [cards]);

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-black/40 text-sm font-sans">
        No data to display for current filters.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 h-full font-sans">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-black/70">Briefings by category</span>
        <div className="flex items-center gap-4">
          {URGENCY_ORDER.filter((u) => activeUrgencies.has(u)).map((u) => (
            <div key={u} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: URGENCY_BAR_COLORS[u] }}
              />
              <span className="text-xs text-black/50">{URGENCY_LABELS[u]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 justify-center">
        {categoryData.map(({ category, urgencies, total }) => (
          <div key={category} className="flex items-center gap-3">
            <span className="text-xs text-black/60 w-[120px] text-right truncate shrink-0">
              {category}
            </span>
            <div className="flex-1 flex items-center gap-1">
              <div
                className="h-[22px] rounded-[6px] flex overflow-hidden"
                style={{ width: `${(total / maxCount) * 100}%`, minWidth: "24px" }}
              >
                {URGENCY_ORDER.filter((u) => urgencies[u]).map((u) => (
                  <div
                    key={u}
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${(urgencies[u] / total) * 100}%`,
                      backgroundColor: URGENCY_BAR_COLORS[u],
                      minWidth: "4px",
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-black/50 ml-1">{total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
