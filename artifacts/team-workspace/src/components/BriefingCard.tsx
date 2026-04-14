import { useLocation } from "wouter";
import type { BriefingCard as BriefingCardType } from "@/lib/data";

interface BriefingCardProps {
  card: BriefingCardType;
  isFocused?: boolean;
}

export function BriefingCard({ card, isFocused = false }: BriefingCardProps) {
  const [, setLocation] = useLocation();

  const bgClass =
    card.urgency === "critical"
      ? "bg-critical"
      : card.urgency === "important"
      ? "bg-important"
      : card.urgency === "headsup"
      ? "bg-white border border-black/10"
      : card.urgency === "ai"
      ? "bg-ai text-white"
      : "bg-light";

  const dotClass =
    card.urgency === "critical"
      ? "dot-critical"
      : card.urgency === "important"
      ? "dot-important"
      : card.urgency === "headsup"
      ? "dot-headsup"
      : card.urgency === "ai"
      ? "dot-ai"
      : "dot-light";

  const handleClick = () => {
    if (isFocused) {
      setLocation(`/item/${card.id}`);
    }
  };

  if (isFocused) {
    return (
      <div
        onClick={handleClick}
        className={`rounded-[20px] p-5 px-6 flex flex-col gap-2.5 shrink-0 cursor-pointer hover:shadow-lg hover:scale-[1.005] transition-all duration-200 ${bgClass}`}
      >
        <div className="flex items-center gap-[7px] text-[13px] font-normal text-black/55 leading-none whitespace-nowrap">
          <div className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
          <span className={card.urgency === "ai" ? "text-white/75" : ""}>{card.category}</span>
        </div>
        <div className="flex items-center gap-6">
          <p
            className={`briefing-text flex-1 min-w-0 font-sans text-[24px] font-light leading-[1.45] tracking-[-0.2px] ${
              card.urgency === "ai" ? "text-white" : "text-black/90"
            }`}
            dangerouslySetInnerHTML={{ __html: card.text }}
          />
          {card.actions && card.actions.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              {card.actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={(e) => e.stopPropagation()}
                  className={
                    action.variant === "primary"
                      ? "bg-white hover:shadow-md border-none rounded-full px-[18px] py-2 font-sans font-medium text-[14px] text-black/90 transition-all whitespace-nowrap tracking-tight shadow-sm"
                      : "bg-white/70 hover:bg-white/90 border-none rounded-full px-[18px] py-2 font-sans font-medium text-sm text-black/75 transition-colors whitespace-nowrap tracking-tight"
                  }
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-5 pb-6 flex flex-col gap-2 shrink-0 ${bgClass}`}>
      <div className="flex items-center gap-[7.68px]">
        <div className={`w-[9px] h-[9px] rounded-full shrink-0 ${dotClass}`} />
        <span
          className={`text-[10.24px] font-normal leading-none whitespace-nowrap ${
            card.urgency === "ai" ? "text-white/75" : "text-black/60"
          }`}
        >
          {card.category}
        </span>
      </div>
      <p
        className={`briefing-text font-sans text-[12.8px] font-light tracking-[-0.128px] leading-[1.4] ${
          card.urgency === "ai" ? "text-white" : "text-black/95"
        }`}
        dangerouslySetInnerHTML={{ __html: card.text }}
      />
    </div>
  );
}
