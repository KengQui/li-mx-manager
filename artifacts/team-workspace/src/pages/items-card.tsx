import { useLocation } from "wouter";
import { members } from "@/lib/data";
import { AskBar } from "@/components/AskBar";
import { ViewToggle } from "@/components/ViewToggle";

type CategoryItem = {
  label: string;
  count?: number;
  urgency?: "critical" | "important" | "headsup";
  avatars?: string[];
  cardId?: number;
};

type Category = {
  title: string;
  items: CategoryItem[];
};

const categories: Category[] = [
  {
    title: "Attendance",
    items: [
      { label: "Late arrivals", count: 2, urgency: "critical", avatars: [members[1].avatar, members[2].avatar], cardId: 1 },
      { label: "No show", cardId: 7 },
      { label: "Early departures" },
    ],
  },
  {
    title: "Workforce coverage",
    items: [
      { label: "Coverage gaps", count: 1, urgency: "critical", avatars: [members[3].avatar], cardId: 2 },
      { label: "Open shifts", count: 3, urgency: "headsup", cardId: 51 },
      { label: "Understaffed zones" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { label: "Missed meal/rest breaks" },
      { label: "Break waiver tracking" },
      { label: "Hours threshold" },
      { label: "Minors scheduling rules" },
      { label: "Pending violations" },
    ],
  },
  {
    title: "Approvals",
    items: [
      { label: "Shift swap requests", count: 2, urgency: "important", avatars: [members[3].avatar, members[4].avatar], cardId: 4 },
      { label: "Time-off requests", count: 1, urgency: "important", avatars: [members[6].avatar], cardId: 6 },
      { label: "Timesheet edits" },
      { label: "Schedule change requests" },
    ],
  },
  {
    title: "Labor cost",
    items: [
      { label: "Overtime risk", count: 1, urgency: "important", avatars: [members[4].avatar], cardId: 3 },
      { label: "Budget variance" },
      { label: "Unplanned OT hours" },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Performance flags", count: 1, urgency: "headsup", avatars: [members[5].avatar], cardId: 5 },
      { label: "Accommodation / restrictions" },
      { label: "Certification expiring" },
      { label: "Onboarding in progress" },
    ],
  },
];

function CountBadge({ count, urgency }: { count: number; urgency: string }) {
  if (urgency === "critical") {
    return (
      <div className="w-[25px] h-[25px] rounded-full bg-[#c10b1e] flex items-center justify-center shrink-0">
        <span className="text-white text-[14px] font-semibold">{count}</span>
      </div>
    );
  }
  if (urgency === "important") {
    return (
      <div className="w-[25px] h-[25px] rounded-full border border-black/25 flex items-center justify-center shrink-0">
        <span className="text-black/60 text-[14px] font-semibold">{count}</span>
      </div>
    );
  }
  return (
    <div className="w-[25px] h-[25px] rounded-full border border-black/20 flex items-center justify-center shrink-0">
      <span className="text-black/50 text-[14px] font-normal">{count}</span>
    </div>
  );
}

function AvatarGroup({ avatars }: { avatars: string[] }) {
  return (
    <div className="flex items-center -space-x-[6px]">
      {avatars.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="w-[32px] h-[32px] rounded-[10px] border-[3px] border-white object-cover"
        />
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-[16px] h-[16px] shrink-0" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5L6.5 12L13 4" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="none">
      <path d="M3 14L8 9L11 12L17 6" stroke="black" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6H17V9" stroke="black" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H5H21" stroke="black" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19Z" stroke="black" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="black" strokeOpacity="0.4" strokeWidth="1.8" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="black" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CategoryItemRow({ item, onClick }: { item: CategoryItem; onClick?: () => void }) {
  const isActive = item.count !== undefined;
  const isClickable = !!item.cardId;

  if (!isActive) {
    return (
      <div
        className={`group flex items-center justify-between px-[12px] py-[10px] rounded-[8px] ${isClickable ? "cursor-pointer hover:bg-black/[0.03] transition-colors" : ""}`}
        onClick={isClickable ? onClick : undefined}
      >
        <div className="flex items-center gap-[10px]">
          <CheckIcon />
          <span className="text-[15px] text-black/50">{item.label}</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-[4px]">
          <ChartIcon />
        </div>
      </div>
    );
  }

  const bgColor =
    item.urgency === "critical"
      ? "bg-[#fdf2f3]"
      : item.urgency === "important"
        ? "bg-[#fcf6ed]"
        : "bg-[#fcf6ed]";

  const isCritical = item.urgency === "critical";
  const shadowClass = isCritical
    ? "shadow-[0px_12px_30px_0px_rgba(0,0,0,0.09),0px_0px_18px_0px_rgba(0,0,0,0.08)]"
    : "";
  const heightClass = isCritical ? "h-[77px]" : "h-[45px]";

  const textWeight = isCritical ? "font-semibold text-black/95" : "font-normal text-black/60";

  return (
    <div
      className={`flex items-center justify-between px-[8px] rounded-[8px] ${bgColor} ${shadowClass} ${heightClass} ${isClickable ? "cursor-pointer hover:brightness-[0.97] transition-all" : ""}`}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="flex items-center gap-[10px] px-[10px]">
        <CountBadge count={item.count!} urgency={item.urgency || "headsup"} />
        <span className={`text-[16px] ${textWeight} whitespace-nowrap`}>{item.label}</span>
      </div>
      {item.avatars && <AvatarGroup avatars={item.avatars} />}
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const [, setLocation] = useLocation();

  return (
    <div className="group/card bg-[#e8ebf5] rounded-[20px] p-[20px] flex flex-col gap-[4px]">
      <div className="flex items-center justify-between mb-[8px] px-[4px]">
        <h3 className="text-[16px] font-semibold text-black/90">{category.title}</h3>
        <div className="flex items-center gap-[8px] opacity-0 group-hover/card:opacity-100 transition-opacity">
          <button className="w-[24px] h-[24px] flex items-center justify-center border-none bg-transparent cursor-pointer p-0 hover:opacity-70 transition-opacity">
            <DeleteIcon />
          </button>
          <button className="w-[24px] h-[24px] flex items-center justify-center border-none bg-transparent cursor-pointer p-0 hover:opacity-70 transition-opacity">
            <GearIcon />
          </button>
        </div>
      </div>
      {category.items.map((item, i) => (
        <CategoryItemRow
          key={i}
          item={item}
          onClick={item.cardId ? () => setLocation(`/item/${item.cardId}`) : undefined}
        />
      ))}
    </div>
  );
}


export default function ItemsCard() {
  return (
    <div className="min-h-screen bg-[#eff1f8] relative pb-[140px]">
      <div className="max-w-[1100px] mx-auto px-[60px] pt-[60px]">
        <div className="mb-[32px]">
          <h1 className="text-[36px] font-light text-black/85 tracking-[-0.5px] leading-[1.2]">
            Good morning Nina
          </h1>
          <p className="text-[18px] text-black/45 mt-[4px]">Here's what's happening today</p>
        </div>

        <div className="flex items-center justify-end mb-[20px] gap-6">
          <ViewToggle active="card" />
          <button aria-label="More options" className="w-[18px] h-[18px] border-none bg-transparent cursor-pointer p-0 shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity">
            <svg className="w-[4px] h-[16px]" viewBox="0 0 4 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14Z" fill="black" fillOpacity="0.65"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-[16px]">
          {categories.map((cat, i) => (
            <CategoryCard key={i} category={cat} />
          ))}
        </div>
      </div>

      <AskBar />
    </div>
  );
}
