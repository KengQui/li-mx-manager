import { useState, useEffect, useMemo } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

export default function FocusedView() {
  const [match, params] = useRoute("/focused/:memberId");
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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urgency = searchParams.get("urgency");
    if (urgency) setActiveUrgency(urgency);
  }, []);

  if (!match || !params) return null;
  const memberId = parseInt(params.memberId, 10);
  const member = members.find((m) => m.id === memberId);
  const activeMembers = members.filter(m => m.status === 'active');
  const currentIndex = activeMembers.findIndex(m => m.id === memberId);

  if (!member) {
    setLocation("/focused/0");
    return null;
  }

  const periodMap: Record<string, string[]> = {
    "today": ["today"],
    "yesterday": ["yesterday"],
    "this-week": ["today", "yesterday", "this-week"],
    "this-month": ["today", "yesterday", "this-week", "this-month"],
    "last-3-months": ["today", "yesterday", "this-week", "this-month", "last-3-months"],
  };

  const allMemberCards = briefingCards.filter(
    (c) => c.memberId === member.id && (periodMap[activeTimePeriod] || ["today"]).includes(c.timePeriod)
  );

  const urgencyOptions = useMemo(() => {
    const counts: Record<string, number> = {};
    allMemberCards.forEach((c) => {
      counts[c.urgency] = (counts[c.urgency] || 0) + 1;
    });
    return [
      { value: "all", label: "All", count: allMemberCards.length, color: "#C8CBD4" },
      ...(counts.critical ? [{ value: "critical", label: "Critical", count: counts.critical, color: URGENCY_COLORS.critical }] : []),
      ...(counts.important ? [{ value: "important", label: "Important", count: counts.important, color: URGENCY_COLORS.important }] : []),
      ...(counts.headsup ? [{ value: "headsup", label: "Heads up", count: counts.headsup, color: URGENCY_COLORS.headsup }] : []),
      ...(counts.light ? [{ value: "light", label: "Good to know", count: counts.light, color: URGENCY_COLORS.light }] : []),
    ];
  }, [allMemberCards]);

  const categoryOptions = useMemo(() => {
    const cats = Array.from(new Set(allMemberCards.map((c) => c.category)));
    return [
      { value: "all", label: "All" },
      ...cats.map((cat) => ({ value: cat, label: cat })),
    ];
  }, [allMemberCards]);

  const navigateTo = (newId: number) => {
    setLocation(`/focused/${newId}`);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigateTo(activeMembers[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < activeMembers.length - 1) {
      navigateTo(activeMembers[currentIndex + 1].id);
    }
  };

  let memberCards = allMemberCards;
  if (activeUrgency !== "all") {
    memberCards = memberCards.filter((c) => c.urgency === activeUrgency);
  }
  if (activeCategory !== "all") {
    memberCards = memberCards.filter((c) => c.category === activeCategory);
  }

  return (
    <div className="fixed inset-0 z-[300] bg-white flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-5 pt-[60px] px-[180px] shrink-0">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-[72px] h-[72px] rounded-[21.6px] object-cover shrink-0"
        />
        <div className="flex flex-col gap-0.5">
          <h2 className="font-sans font-semibold text-[28px] leading-[1.2] text-black/95 tracking-[-0.4px]">
            {member.id === 0 ? "My daily briefing" : member.name}
          </h2>
          <span className="font-sans font-normal text-sm text-black/50 tracking-[-0.1px]">
            {member.role} • {member.schedule}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between py-6 px-[180px] shrink-0">
        <div className="flex gap-2">
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

      {/* Cards List */}
      <div className="flex-1 overflow-y-auto px-[180px] pb-[200px]">
        <div className="flex flex-col gap-2">
          {memberCards.length > 0 ? (
            memberCards.map((card) => (
              <BriefingCard key={card.id} card={card} isFocused />
            ))
          ) : (
            <div className="text-center py-20 text-black/50">
              No briefings match the current filters.
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button 
          onClick={handlePrev}
          className="fixed top-1/2 -translate-y-1/2 left-10 w-[60px] h-[60px] rounded-full bg-white/80 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border-none cursor-pointer flex items-center justify-center z-[400] transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-black/70" />
        </button>
      )}
      
      {currentIndex < activeMembers.length - 1 && (
        <button 
          onClick={handleNext}
          className="fixed top-1/2 -translate-y-1/2 right-6 w-[60px] h-[60px] rounded-full bg-white/80 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border-none cursor-pointer flex items-center justify-center z-[400] transition-colors"
        >
          <ChevronRight className="w-8 h-8 text-black/70" />
        </button>
      )}

      {/* Frosted Bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-[196px] bg-gradient-to-b from-white/0 via-white/95 to-white pointer-events-none z-[350]" />

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[400]">
        <AskBar />
      </div>

    </div>
  );
}
