import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { members, briefingCards } from "@/lib/data";

const URGENCY_LABELS: Record<string, string> = {
  critical: "Critical",
  important: "Important",
  headsup: "Heads up",
  light: "Good to know",
};

const URGENCY_TAG_STYLES: Record<string, string> = {
  critical: "bg-red-100 text-red-700",
  important: "bg-amber-100 text-amber-700",
  headsup: "bg-blue-100 text-blue-700",
  light: "bg-gray-100 text-gray-600",
};

function generateDetailContent(card: any) {
  const category = card.category;
  const urgency = card.urgency;

  const eligibleMembers = members
    .filter(m => m.status === "active" && m.id !== card.memberId)
    .slice(0, 3);

  let status = "";
  let recommendation = "";
  let summaryPoints: string[] = [];

  if (urgency === "critical") {
    if (category === "Attendance") {
      status = "Unresolved – Immediate attention required";
      recommendation = "Contact the team member and arrange backup coverage immediately.";
      summaryPoints = [
        "Shift coverage is at risk",
        "No response from team member yet",
        "Backup options available",
        "Estimated cost of overtime coverage: $48",
      ];
    } else if (category === "Staffing") {
      status = "Unfilled – Coverage needed within the hour";
      recommendation = "Notify all eligible team members to quickly fill the shift and reduce coverage risk.";
      summaryPoints = [
        "All candidates meet role requirements",
        "No compliance risks detected",
        "Estimated overtime cost: $48",
      ];
    } else {
      status = "Requires immediate action";
      recommendation = "Review and resolve this issue before end of shift.";
      summaryPoints = [
        "High priority item flagged by system",
        "Team lead has been notified",
        "Resolution deadline: today",
      ];
    }
  } else if (urgency === "important") {
    status = "Pending – Action recommended today";
    recommendation = "Review the situation and take appropriate action before the deadline.";
    summaryPoints = [
      "Flagged for manager review",
      "Related policies may apply",
      "Budget impact under evaluation",
    ];
  } else if (urgency === "headsup") {
    status = "Awareness – No immediate action needed";
    recommendation = "Monitor the situation and plan accordingly.";
    summaryPoints = [
      "Informational alert",
      "No compliance risk at this time",
      "Follow-up may be needed later",
    ];
  } else {
    status = "For your information";
    recommendation = "No action required at this time.";
    summaryPoints = [
      "Routine update",
      "All metrics within normal range",
      "Next review scheduled automatically",
    ];
  }

  return { status, recommendation, summaryPoints, eligibleMembers };
}

const tabs = ["Summary", "Candidates", "Why these options", "What happens next"];

export default function ItemDetail() {
  const [match, params] = useRoute("/item/:cardId");
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("Summary");

  if (!match || !params) return null;
  const cardId = parseInt(params.cardId, 10);
  const card = briefingCards.find(c => c.id === cardId);

  if (!card) {
    setLocation("/items");
    return null;
  }

  const member = members.find(m => m.id === card.memberId);
  const { status, recommendation, summaryPoints, eligibleMembers } = generateDetailContent(card);

  const bgClass =
    card.urgency === "critical"
      ? "bg-[#2c2c2c]"
      : card.urgency === "important"
      ? "bg-[#3d3020]"
      : card.urgency === "headsup"
      ? "bg-[#1e2a3e]"
      : "bg-[#f5f5f5]";

  const textClass =
    card.urgency === "light" ? "text-black/85" : "text-white";

  const subTextClass =
    card.urgency === "light" ? "text-black/55" : "text-white/65";

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/items");
    }
  };

  return (
    <div className="fixed inset-0 z-[500] bg-[#eff1f8] flex overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 p-[32px] gap-[24px]">
      <div className="w-[380px] shrink-0 flex flex-col bg-white rounded-[24px] shadow-[4px_0_24px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0 border-b border-black/5">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} aria-label="Go back" className="w-[28px] h-[28px] flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity border-none bg-transparent p-0">
              <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5" stroke="black" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="black" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <svg className="w-[26px] h-[26px]" viewBox="0 0 29.3 29.3" fill="none">
              <path d="M14.6 0C14.9 0 15.3 0.1 15.5 0.3L18.8 3.7C19 3.8 19.2 3.9 19.5 3.9H24.1C24.8 3.9 25.3 4.5 25.3 5.1V9.8C25.3 10.1 25.4 10.3 25.6 10.5L28.9 13.8C29.4 14.3 29.4 15 28.9 15.5L25.6 18.8C25.4 19 25.3 19.2 25.3 19.5V24.1C25.3 24.8 24.8 25.3 24.1 25.3H19.5C19.2 25.3 19 25.4 18.8 25.6L15.5 28.9C15.3 29.1 15 29.2 14.7 29.3C14.3 29.3 14 29.1 13.8 28.9L10.5 25.6C10.3 25.4 10.1 25.3 9.8 25.3H5.1C4.5 25.3 3.9 24.8 3.9 24.1V19.5C3.9 19.2 3.8 19 3.7 18.8L0.3 15.5C-0.1 15 -0.1 14.3 0.3 13.8L3.7 10.5C3.8 10.3 3.9 10.1 3.9 9.8V5.1C3.9 4.5 4.5 3.9 5.1 3.9H9.8C10.1 3.9 10.3 3.8 10.5 3.7L13.8 0.3C14 0.1 14.4 0 14.6 0Z" stroke="#555" strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
              <path d="M12.2 5.3C11.5 6 10.7 6.3 9.8 6.3H6.3V9.8C6.3 10.7 6 11.5 5.3 12.2L5.3 12.2L2.9 14.6L5.3 17.1C6 17.7 6.3 18.6 6.3 19.5V23H9.8C10.7 23 11.5 23.3 12.2 23.9L14.6 26.4L17.1 23.9C17.7 23.3 18.6 23 19.5 23H23V19.5C23 18.6 23.3 17.7 23.9 17.1L26.4 14.6L23.9 12.2C23.3 11.5 23 10.7 23 9.8V6.3H19.5C18.6 6.3 17.7 6 17.1 5.3L14.6 2.9L12.2 5.3Z" stroke="#555" strokeWidth="2.4" strokeLinejoin="round" fill="none"/>
              <path d="M10.3 16.3C10.8 15.9 11.6 16 11.9 16.6L12.1 16.7C12.7 17.5 13.6 18 14.6 18C15.7 18 16.7 17.5 17.3 16.6C17.7 16.1 18.4 15.9 18.9 16.2L19 16.3C19.5 16.7 19.7 17.4 19.3 17.9C18.2 19.5 16.5 20.4 14.6 20.4C12.8 20.4 11 19.5 10 17.9C9.6 17.4 9.7 16.6 10.3 16.3Z" fill="#555"/>
            </svg>
          </div>
          <button className="w-[28px] h-[28px] flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity border-none bg-transparent p-0">
            <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none">
              <path d="M4 14V20H10" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 10V4H14" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 4L21 11" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 20L3 13" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col px-5 overflow-y-auto">
          <div className="flex justify-end mt-4 mb-3">
            <div className="bg-[#f3f3f3] rounded-[16px] px-4 py-2.5 text-[13px] text-black/75 leading-[18px] max-w-[80%]">
              {card.category === "Attendance"
                ? "Why did Tyler call out?"
                : card.category === "Staffing"
                ? "Who else can cover this shift?"
                : "Tell me more about this"}
            </div>
          </div>

          <div className="flex gap-[5px] mb-4">
            <div className="w-[6px] h-[6px] rounded-full bg-black/25" />
            <div className="w-[6px] h-[6px] rounded-full bg-black/25" />
            <div className="w-[6px] h-[6px] rounded-full bg-black/25" />
          </div>

          <div className="flex-1" />
        </div>

        <div className="px-5 pb-5 pt-2 shrink-0">
          <div className="flex items-center gap-2 border border-black/10 rounded-full px-4 py-2.5">
            <span className="flex-1 text-[13px] text-black/35">Ask anything</span>
            <button className="w-[28px] h-[28px] rounded-full flex items-center justify-center border-none bg-transparent cursor-pointer hover:bg-black/5 transition-colors">
              <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="black" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="black" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="19" x2="12" y2="23" stroke="black" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="w-[28px] h-[28px] rounded-full bg-black/5 flex items-center justify-center border-none cursor-pointer hover:bg-black/10 transition-colors">
              <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="6" width="2" height="12" rx="1" fill="black" fillOpacity="0.45"/>
                <rect x="8" y="3" width="2" height="18" rx="1" fill="black" fillOpacity="0.45"/>
                <rect x="12" y="8" width="2" height="8" rx="1" fill="black" fillOpacity="0.45"/>
                <rect x="16" y="5" width="2" height="14" rx="1" fill="black" fillOpacity="0.45"/>
                <rect x="20" y="9" width="2" height="6" rx="1" fill="black" fillOpacity="0.45"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-[24px] overflow-hidden shadow-[-4px_0_24px_rgba(0,0,0,0.06)] relative">
        <div className="flex items-center justify-between px-10 pt-6 pb-0 shrink-0">
          <div className="flex items-center gap-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`bg-transparent border-none cursor-pointer text-[14px] font-medium pb-3 transition-all ${
                  activeTab === tab
                    ? "text-black/90 border-b-2 border-black/80"
                    : "text-black/40 hover:text-black/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="w-8 h-8 rounded-lg bg-transparent border-none flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors" onClick={handleBack}>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path d="M4 8V4H8M4 12V16H8M12 4H16V8M16 12V16H12" stroke="black" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-[140px]">
          <div className={`${bgClass} rounded-[20px] p-8 mt-4 relative overflow-hidden`}>
            <div className="absolute top-4 right-4 w-[36px] h-[36px] rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6"/>
                <rect x="11" y="2" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6"/>
                <rect x="2" y="11" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6"/>
                <rect x="11" y="11" width="7" height="7" rx="1.5" fill="white" fillOpacity="0.6"/>
              </svg>
            </div>

            <div className={`text-[12px] font-medium ${subTextClass} mb-3`}>
              {card.category}
            </div>
            <p
              className={`briefing-text font-sans text-[22px] font-normal leading-[1.5] tracking-[-0.3px] ${textClass} m-0 mb-4 max-w-[85%]`}
              dangerouslySetInnerHTML={{ __html: card.text }}
            />
            <div className={`flex items-center gap-2 text-[13px] ${subTextClass}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M12 1C12.8 7.2 16.8 11.2 23 12C16.8 12.8 12.8 16.8 12 23C11.2 16.8 7.2 12.8 1 12C7.2 11.2 11.2 7.2 12 1Z" fill="currentColor" opacity="0.6"/>
              </svg>
              <span><strong className="font-medium">Recommended:</strong> {recommendation.split(".")[0]}</span>
            </div>

            {card.actions && card.actions.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                {card.actions.map((action, idx) => (
                  <button
                    key={idx}
                    className={
                      idx === 0
                        ? "bg-[#e80d24] hover:bg-[#d00b20] text-white border-none rounded-full px-5 py-2.5 font-medium text-[13px] cursor-pointer transition-colors"
                        : "bg-white/15 hover:bg-white/25 text-white border-none rounded-full px-5 py-2.5 font-medium text-[13px] cursor-pointer transition-colors"
                    }
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-6 max-w-[600px]">
            <div>
              <h3 className="text-[14px] font-semibold text-black/90 mb-1">Status</h3>
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-black/65">{status}</span>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${URGENCY_TAG_STYLES[card.urgency] || "bg-gray-100 text-gray-600"}`}>
                  {URGENCY_LABELS[card.urgency] || card.urgency}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-[14px] font-semibold text-black/90 mb-1">Eligible coverage</h3>
              <p className="text-[14px] text-black/65 mb-2 mt-0">{eligibleMembers.length} team members available:</p>
              <div className="flex flex-col gap-2">
                {eligibleMembers.map(m => (
                  <div key={m.id} className="flex items-center gap-2">
                    <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[13px] font-medium text-black/80">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[14px] font-semibold text-black/90 mb-1">Recommendation</h3>
              <p className="text-[14px] text-black/65 m-0">{recommendation}</p>
            </div>

            <div>
              <h3 className="text-[14px] font-semibold text-black/90 mb-1">Quick summary</h3>
              <ul className="text-[14px] text-black/65 m-0 pl-5 flex flex-col gap-1">
                {summaryPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-white/0 via-white/95 to-white pointer-events-none h-[140px] z-[510] rounded-b-[24px]" />

        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-10 z-[520]">
          <button onClick={handleBack} className="bg-transparent border-none text-[14px] font-medium text-black/50 hover:text-black/80 cursor-pointer transition-colors px-4 py-2">
            Dismiss
          </button>
          <div className="flex items-center gap-3">
            {card.actions && card.actions.map((action, idx) => (
              <button
                key={idx}
                className={
                  idx === 0
                    ? "bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white border-none rounded-full px-6 py-2.5 font-medium text-[13px] cursor-pointer transition-colors"
                    : "bg-white hover:bg-gray-50 text-black/80 border border-black/15 rounded-full px-6 py-2.5 font-medium text-[13px] cursor-pointer transition-colors"
                }
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
