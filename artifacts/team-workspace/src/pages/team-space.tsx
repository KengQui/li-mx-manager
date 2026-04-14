import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { members, briefingCards } from "@/lib/data";
import { BriefingCard } from "@/components/BriefingCard";
import { AskBar } from "@/components/AskBar";
import { FilterDropdown } from "@/components/FilterDropdown";
import { ViewToggle } from "@/components/ViewToggle";

const URGENCY_COLORS: Record<string, string> = {
  critical: "#8B1A1A",
  important: "#C8850F",
  headsup: "#1A3A6B",
  light: "#C8CBD4",
};

export default function TeamSpace() {
  const [, setLocation] = useLocation();
  const [activeUrgency, setActiveUrgency] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTimePeriod, setActiveTimePeriod] = useState("today");

  const timePeriodOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "this-week", label: "This week" },
    { value: "this-month", label: "This month" },
    { value: "last-3-months", label: "Last 3 months" },
  ];

  const activeMembers = members.filter((m) => m.status === "active");

  const periodMap: Record<string, string[]> = {
    "today": ["today"],
    "yesterday": ["yesterday"],
    "this-week": ["today", "yesterday", "this-week"],
    "this-month": ["today", "yesterday", "this-week", "this-month"],
    "last-3-months": ["today", "yesterday", "this-week", "this-month", "last-3-months"],
  };
  const activePeriods = periodMap[activeTimePeriod] || ["today"];

  const allCards = briefingCards.filter((c) =>
    activeMembers.some((m) => m.id === c.memberId) && activePeriods.includes(c.timePeriod)
  );

  const urgencyOptions = useMemo(() => {
    const counts: Record<string, number> = {};
    allCards.forEach((c) => {
      counts[c.urgency] = (counts[c.urgency] || 0) + 1;
    });
    return [
      { value: "all", label: "All", count: allCards.length, color: "#C8CBD4" },
      ...(counts.critical ? [{ value: "critical", label: "Critical", count: counts.critical, color: URGENCY_COLORS.critical }] : []),
      ...(counts.important ? [{ value: "important", label: "Important", count: counts.important, color: URGENCY_COLORS.important }] : []),
      ...(counts.headsup ? [{ value: "headsup", label: "Heads up", count: counts.headsup, color: URGENCY_COLORS.headsup }] : []),
      ...(counts.light ? [{ value: "light", label: "Good to know", count: counts.light, color: URGENCY_COLORS.light }] : []),
    ];
  }, [allCards]);

  const categoryOptions = useMemo(() => {
    const cats = Array.from(new Set(allCards.map((c) => c.category)));
    return [
      { value: "all", label: "All" },
      ...cats.map((cat) => ({ value: cat, label: cat })),
    ];
  }, [allCards]);

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white before:from-70% before:to-transparent before:pointer-events-none">
        <div className="relative w-full max-w-[1278px] mx-auto pt-[60px] flex flex-col gap-5 pointer-events-auto">
          <h1 className="font-medium text-2xl leading-[21px] text-black/95">My team</h1>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <FilterDropdown
                options={urgencyOptions}
                value={activeUrgency}
                onChange={setActiveUrgency}
                allLabel="All urgency levels"
              />
              <FilterDropdown
                options={categoryOptions}
                value={activeCategory}
                onChange={setActiveCategory}
                allLabel="All categories"
              />
              <FilterDropdown
                options={timePeriodOptions}
                value={activeTimePeriod}
                onChange={setActiveTimePeriod}
                allLabel="Today"
              />
            </div>
            <div className="flex items-center gap-6">
              <ViewToggle active="list" />
              <button aria-label="More options" className="w-[18px] h-[18px] border-none bg-transparent cursor-pointer p-0 shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg className="w-[4px] h-[16px]" viewBox="0 0 4 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14Z" fill="black" fillOpacity="0.65"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Grid */}
      <div className="absolute top-[175px] left-0 right-0 h-[783px] px-6 flex gap-6 items-stretch overflow-x-auto pb-4 transition-all duration-300 origin-top-left">
        {activeMembers.map((member, index) => {
          let memberCards = briefingCards.filter((c) => c.memberId === member.id && activePeriods.includes(c.timePeriod));
          if (activeUrgency !== "all") {
            memberCards = memberCards.filter((c) => c.urgency === activeUrgency);
          }
          if (activeCategory !== "all") {
            memberCards = memberCards.filter((c) => c.category === activeCategory);
          }
          
          return (
            <div
              key={member.id}
              className={`flex-1 min-w-[300px] w-[320px] bg-black/5 rounded-[24px] overflow-hidden shadow-[0px_8px_40px_rgba(189,195,214,0.4)] flex flex-col ${
                index === 0 ? "sticky left-6 z-10 shrink-0 mr-2 shadow-[0px_8px_40px_rgba(189,195,214,0.4),6px_0_20px_rgba(0,0,0,0.06)]" : ""
              }`}
            >
              <div className="bg-white p-6 pb-5 flex flex-col gap-3 shrink-0 sticky top-0 z-[2]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-[#e7e9ee] rounded-lg py-1 pr-2 pl-1">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-5 h-5 rounded-[6px] shrink-0 object-cover"
                    />
                    <span className="text-sm font-medium text-black/95 tracking-tight dotted-underline whitespace-nowrap">
                      {member.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setLocation(`/focused/${member.id}`)}
                    className="w-[18px] h-[18px] shrink-0 hover:opacity-80 transition-opacity bg-transparent border-none p-0 cursor-pointer"
                    title="Expand"
                  >
                    <svg className="w-full h-full" viewBox="0 0 18 18" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3 0C1.40232 0 0.0963391 1.24892 0.00509262 2.82373L0 3V6C0 6.55228 0.447715 7 1 7C1.51284 7 1.93551 6.61396 1.99327 6.11662L2 6V3.414L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711C7.06759 6.34662 7.09532 5.77939 6.7903 5.3871L6.70711 5.29289L3.416 2H6C6.55228 2 7 1.55228 7 1C7 0.487164 6.61396 0.0644928 6.11662 0.0067277L6 0H3ZM15 18C16.5977 18 17.9037 16.7511 17.9949 15.1763L18 15V12C18 11.4477 17.5523 11 17 11C16.4872 11 16.0645 11.386 16.0067 11.8834L16 12V14.586L12.7071 11.2929C12.3166 10.9024 11.6834 10.9024 11.2929 11.2929C10.9324 11.6534 10.9047 12.2206 11.2097 12.6129L11.2929 12.7071L14.584 16H12C11.4477 16 11 16.4477 11 17C11 17.5128 11.386 17.9355 11.8834 17.9933L12 18H15ZM15 0C16.5977 0 17.9037 1.24892 17.9949 2.82373L18 3V6C18 6.55228 17.5523 7 17 7C16.4872 7 16.0645 6.61396 16.0067 6.11662L16 6V3.414L12.7071 6.70711C12.3166 7.09763 11.6834 7.09763 11.2929 6.70711C10.9324 6.34662 10.9047 5.77939 11.2097 5.3871L11.2929 5.29289L14.584 2H12C11.4477 2 11 1.55228 11 1C11 0.487164 11.386 0.0644928 11.8834 0.0067277L12 0H15ZM3 18C1.40232 18 0.0963391 16.7511 0.00509262 15.1763L0 15V12C0 11.4477 0.447715 11 1 11C1.51284 11 1.93551 11.386 1.99327 11.8834L2 12V14.586L5.29289 11.2929C5.68342 10.9024 6.31658 10.9024 6.70711 11.2929C7.06759 11.6534 7.09532 12.2206 6.7903 12.6129L6.70711 12.7071L3.416 16H6C6.55228 16 7 16.4477 7 17C7 17.5128 6.61396 17.9355 6.11662 17.9933L6 18H3Z" fill="black" fillOpacity="0.65"/>
                    </svg>
                  </button>
                </div>
                <div className="pl-[29px] flex flex-col gap-[3px]">
                  <span className="text-sm font-normal leading-[18px] text-black/60 tracking-tight whitespace-nowrap">
                    {member.role}
                  </span>
                  <span className="text-sm font-normal leading-[18px] text-black/60 tracking-tight whitespace-nowrap">
                    {member.schedule}
                  </span>
                  {member.clockedIn ? (
                    <span className="text-sm font-normal leading-[18px] text-black/60 tracking-tight whitespace-nowrap">
                      Clocked in: {member.clockedIn}
                    </span>
                  ) : (
                    <span className="text-sm font-normal leading-[18px] text-black/60 tracking-tight whitespace-nowrap">
                      Not clocked in
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-white flex-1 overflow-y-auto px-6 pt-2 pb-8 flex flex-col gap-2 z-[1]">
                {memberCards.map((card) => (
                  <BriefingCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AskBar />
    </div>
  );
}
