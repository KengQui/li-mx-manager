import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { MapPin, Calendar, Clock, PowerOff, ZoomIn, ZoomOut, Mic, ChevronLeft, ChevronRight, GripVertical, X } from "lucide-react";
import { members, briefingCards } from "@/lib/data";
import { AskBar } from "@/components/AskBar";
import { ViewToggle } from "@/components/ViewToggle";

const scheduleEvents = [
  {
    day: "Wed",
    date: 8,
    label: "Today",
    role: "Front desk",
    time: "9AM \u2013 5PM [8hrs]",
    color: "#A973CE",
    textColor: "white",
    avatars: [
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/women/63.jpg",
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/56.jpg",
    ],
    extra: 3,
  },
  {
    day: "Thu",
    date: 9,
    label: "Tomorrow",
    location: "Kitchen \u2022 Bakery",
    color: "#8EC7E1",
    textColor: "white",
    avatars: [
      "https://randomuser.me/api/portraits/women/28.jpg",
      "https://randomuser.me/api/portraits/men/77.jpg",
      "https://randomuser.me/api/portraits/women/56.jpg",
      "https://randomuser.me/api/portraits/men/32.jpg",
    ],
    extra: 2,
  },
  {
    day: "Fri",
    date: 10,
    label: "Friday",
    location: "Electronics \u2022 Sales floor",
    color: "#F1C48D",
    textColor: "white",
    avatars: [
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/men/41.jpg",
      "https://randomuser.me/api/portraits/women/63.jpg",
      "https://randomuser.me/api/portraits/men/77.jpg",
    ],
    extra: 2,
  },
  {
    day: "Sat",
    date: 11,
    label: "Saturday",
    location: "Stockroom \u2022 Receiving",
    color: "#A973CE",
    textColor: "white",
    avatars: [
      "https://randomuser.me/api/portraits/women/12.jpg",
      "https://randomuser.me/api/portraits/men/45.jpg",
      "https://randomuser.me/api/portraits/women/33.jpg",
    ],
    extra: 1,
  },
  {
    day: "Mon",
    date: 13,
    label: "Monday",
    role: "Front desk",
    time: "7AM \u2013 3PM [8hrs]",
    color: "#8EC7E1",
    textColor: "white",
    avatars: [
      "https://randomuser.me/api/portraits/men/22.jpg",
      "https://randomuser.me/api/portraits/women/28.jpg",
      "https://randomuser.me/api/portraits/men/55.jpg",
      "https://randomuser.me/api/portraits/women/19.jpg",
    ],
    extra: 4,
  },
  {
    day: "Tue",
    date: 14,
    label: "Tuesday",
    location: "Kitchen \u2022 Deli",
    color: "#F1C48D",
    textColor: "white",
    avatars: [
      "https://randomuser.me/api/portraits/women/56.jpg",
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
    ],
    extra: 2,
  },
  {
    day: "Wed",
    date: 15,
    label: "Next Wednesday",
    role: "Electronics",
    time: "10AM \u2013 6PM [8hrs]",
    color: "#A973CE",
    textColor: "white",
    avatars: [
      "https://randomuser.me/api/portraits/men/77.jpg",
      "https://randomuser.me/api/portraits/women/63.jpg",
      "https://randomuser.me/api/portraits/men/41.jpg",
      "https://randomuser.me/api/portraits/women/12.jpg",
    ],
    extra: 3,
  },
];

const calendarDays = [
  { day: 28, outside: true }, { day: 29, outside: true }, { day: 30, outside: true },
  { day: 1 }, { day: 2, dots: ["#d4a843", "#d4a843"] }, { day: 3, dots: ["#d4a843"] }, { day: 4 },
  { day: 5, dots: ["#555"] }, { day: 6, bars: ["#888"] }, { day: 7, bars: ["#888"] },
  { day: 8, today: true, bars: ["#A973CE"] }, { day: 9, dots: ["#555"] }, { day: 10 }, { day: 11 },
  { day: 12, bars: ["#666"] }, { day: 13, bars: ["#888"] }, { day: 14, bars: ["#888"] },
  { day: 15, bars: ["#888"] }, { day: 16 }, { day: 17 }, { day: 18 },
  { day: 19 }, { day: 20, bars: ["#888"] }, { day: 21, bars: ["#888"] },
  { day: 22, dots: ["#555"] }, { day: 23, dots: ["#555"] }, { day: 24, bars: ["#666"] }, { day: 25, bars: ["#666"] },
  { day: 26, dots: ["#555"] }, { day: 27, dots: ["#555", "#555", "#555"] }, { day: 28, bars: ["#888"] },
  { day: 29, dots: ["#555"] }, { day: 30 }, { day: 31 }, { day: 1, outside: true },
];

type NoteItem = {
  id: number;
  text: string;
  source: "typed" | "voice";
};

type NoteCardData = {
  id: number;
  notes: NoteItem[];
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
};

function SingleNoteCard({ card, onAddCard, onRemoveCard, onUpdateNotes, onResize, onResizeHeight, onMove, showRemove }: {
  card: NoteCardData;
  onAddCard: () => void;
  onRemoveCard: () => void;
  onUpdateNotes: (notes: NoteItem[]) => void;
  onResize: (width: number) => void;
  onResizeHeight: (height: number) => void;
  onMove: (x: number, y: number) => void;
  showRemove: boolean;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextNoteId = useRef(1);
  const resizeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const addNote = useCallback((text: string, source: "typed" | "voice") => {
    if (!text.trim()) return;
    const newNote = { id: nextNoteId.current++, text: text.trim(), source };
    onUpdateNotes([...card.notes, newNote]);
  }, [card.notes, onUpdateNotes]);

  const removeNote = (noteId: number) => {
    onUpdateNotes(card.notes.filter(n => n.id !== noteId));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNote(inputValue, "typed");
      setInputValue("");
    }
  };

  const toggleRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const fallback = prompt("Voice input not supported in this browser. Type your note:");
      if (fallback) addNote(fallback, "voice");
      return;
    }
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      addNote(transcript, "voice");
      setIsRecording(false);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedId === null || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    const updated = [...card.notes];
    const fromIdx = updated.findIndex(n => n.id === draggedId);
    const toIdx = updated.findIndex(n => n.id === targetId);
    if (fromIdx !== -1 && toIdx !== -1) {
      const [moved] = updated.splice(fromIdx, 1);
      updated.splice(toIdx, 0, moved);
      onUpdateNotes(updated);
    }
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = card.width;
    const onMouseMove = (moveE: MouseEvent) => {
      const delta = moveE.clientX - startX;
      const newWidth = Math.max(220, Math.min(600, startWidth + delta));
      onResize(newWidth);
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleCardDragStart = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("textarea") || target.closest("button") || target.closest("svg") || target.closest("[draggable]") || target.closest("[data-resize-handle]")) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startOX = card.offsetX;
    const startOY = card.offsetY;
    const onMouseMove = (moveE: MouseEvent) => {
      onMove(startOX + (moveE.clientX - startX), startOY + (moveE.clientY - startY));
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleResizeHeightStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    const startHeight = card.height;
    const onMouseMove = (moveE: MouseEvent) => {
      const delta = moveE.clientY - startY;
      const newHeight = Math.max(200, Math.min(800, startHeight + delta));
      onResizeHeight(newHeight);
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-[24px] shrink-0 p-3 relative group/card cursor-grab active:cursor-grabbing"
      style={{ width: card.width, height: card.height, transform: `translate(${card.offsetX}px, ${card.offsetY}px)` }}
      onMouseDown={handleCardDragStart}
    >
      <div className="bg-[#edf6f4] rounded-[16px] h-full px-4 py-6 flex flex-col relative">
        <div className="flex items-start justify-between mb-4">
          <span className="font-medium text-[18px] leading-[21px] text-black/95" style={{ fontFeatureSettings: "'liga' 0" }}>
            Note
          </span>
          <div className="flex items-center gap-3 opacity-0 group-hover/card:opacity-100 transition-opacity">
            {showRemove && (
              <button
                onClick={onRemoveCard}
                className="w-5 h-5 border-none bg-transparent cursor-pointer p-0 text-black/25 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center">
              <div className="w-5 h-5 rounded border border-black/27 bg-[#edf6f4] shadow-[0px_3px_8px_rgba(0,0,0,0.1),0px_0px_4px_rgba(0,0,0,0.13)]" />
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M10.586 12L8.464 9.879l-.707.707L10.586 13.414l.707-.707L10.586 12z" fill="black" fillOpacity="0.65"/>
                <path d="M12 16l4-4-4-4" stroke="black" strokeOpacity="0.3" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mb-12 flex flex-col gap-2">
          {card.notes.length === 0 && !inputValue && (
            <div
              className="text-[14px] font-normal leading-[21px] text-black/43 cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              Add a note -- type or use your voice
            </div>
          )}

          {card.notes.map(note => (
            <div
              key={note.id}
              draggable
              onDragStart={(e) => handleDragStart(e, note.id)}
              onDragOver={(e) => handleDragOver(e, note.id)}
              onDrop={(e) => handleDrop(e, note.id)}
              onDragEnd={handleDragEnd}
              className={`group flex items-start gap-1.5 bg-white/70 rounded-[10px] px-2 py-2 cursor-grab active:cursor-grabbing transition-all ${
                draggedId === note.id ? "opacity-40 scale-95" : ""
              } ${dragOverId === note.id && draggedId !== note.id ? "ring-2 ring-[#7532bc]/30" : ""}`}
            >
              <GripVertical className="w-3.5 h-3.5 text-black/20 shrink-0 mt-0.5 group-hover:text-black/40 transition-colors" />
              <span className="text-[13px] leading-[19px] text-black/80 flex-1 break-words">
                {note.source === "voice" && (
                  <Mic className="w-3 h-3 text-[#7532bc] inline mr-1 -mt-0.5" />
                )}
                {note.text}
              </span>
              <button
                onClick={() => removeNote(note.id)}
                className="opacity-0 group-hover:opacity-100 w-4 h-4 border-none bg-transparent cursor-pointer p-0 shrink-0 mt-0.5 text-black/30 hover:text-red-500 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={card.notes.length > 0 ? "Add another note..." : ""}
            className="bg-transparent border-none outline-none resize-none text-[14px] leading-[21px] text-black/80 placeholder:text-black/30 w-full min-h-[28px] p-0"
            rows={1}
          />
        </div>

        <div className={`absolute bottom-6 right-4 transition-opacity ${isRecording ? "opacity-100" : "opacity-0 group-hover/card:opacity-100"}`}>
          <button
            onClick={toggleRecording}
            className={`w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer transition-all ${
              isRecording
                ? "bg-red-500 shadow-[0_0_0_6px_rgba(239,68,68,0.25)] animate-[mic-pulse_1.5s_ease-in-out_infinite]"
                : "bg-gradient-to-br from-[#f5ebdc] to-[#ebdccd] shadow-[0px_2px_6px_rgba(235,220,205,0.08),0px_0px_4px_rgba(235,220,205,0.12)]"
            }`}
          >
            <Mic className={`w-5 h-5 transition-all ${isRecording ? "text-white animate-[mic-icon_1s_ease-in-out_infinite]" : "text-black/65"}`} />
          </button>
        </div>
      </div>

      <div
        ref={resizeRef}
        data-resize-handle
        onMouseDown={handleResizeStart}
        className="absolute top-0 right-0 w-[6px] h-full cursor-col-resize opacity-0 group-hover/card:opacity-100 transition-opacity z-10 flex items-center justify-center"
      >
        <div className="w-[3px] h-[40px] rounded-full bg-black/15" />
      </div>

      <div
        data-resize-handle
        onMouseDown={handleResizeHeightStart}
        className="absolute bottom-0 left-0 w-full h-[6px] cursor-row-resize opacity-0 group-hover/card:opacity-100 transition-opacity z-10 flex justify-center items-center"
      >
        <div className="h-[3px] w-[40px] rounded-full bg-black/15" />
      </div>
    </div>
  );
}

const chatMessages = [
  {
    id: 1,
    sender: "Mark Ford",
    isYou: false,
    time: "5 min ago",
    icon: "slack",
    text: "\u201CHi Nina, just a quick heads-up\u2014I\u2019m running about 10 minutes late this morning. I\u2019ll be there shortly. Thanks!\u201D",
  },
  {
    id: 2,
    sender: "You",
    isYou: true,
    time: "",
    text: "\u201COkay! I\u2019ll cover that time for you\u201D",
  },
  {
    id: 3,
    sender: "Mark Hannaford",
    isYou: false,
    time: "1 min ago",
    icon: "slack",
    text: "\u201Cjust a heads-up that we\u2019re running low on papers in the backroom, should I place an order.\u201D",
    aiSuggestion: "According to the system, there is additional stock on record. The inventory looks good.",
    extraTopSpacing: true,
  },
];

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none">
      <path d="M2.94 8.82a1.47 1.47 0 1 1-1.47-1.47h1.47v1.47ZM3.68 8.82a1.47 1.47 0 1 1 2.94 0v3.68a1.47 1.47 0 1 1-2.94 0V8.82Z" fill="#E01E5A"/>
      <path d="M5.15 2.94a1.47 1.47 0 1 1 1.47-1.47v1.47H5.15ZM5.15 3.68a1.47 1.47 0 0 1 0 2.94H1.47a1.47 1.47 0 0 1 0-2.94h3.68Z" fill="#36C5F0"/>
      <path d="M11.06 5.15a1.47 1.47 0 1 1 1.47 1.47h-1.47V5.15ZM10.32 5.15a1.47 1.47 0 1 1-2.94 0V1.47a1.47 1.47 0 1 1 2.94 0v3.68Z" fill="#2EB67D"/>
      <path d="M8.85 11.06a1.47 1.47 0 1 1-1.47 1.47v-1.47h1.47ZM8.85 10.32a1.47 1.47 0 0 1 0-2.94h3.68a1.47 1.47 0 0 1 0 2.94H8.85Z" fill="#ECB22E"/>
    </svg>
  );
}

function ChatCard() {
  return (
    <div className="bg-white rounded-[24px] shrink-0 relative w-[310px] h-[563px]">
      <div className="rounded-[16px] h-full px-4 py-6 flex flex-col relative overflow-hidden">
        <span className="font-medium text-[18px] leading-[21px] text-black/95 mb-4" style={{ fontFeatureSettings: "'liga' 0" }}>
          Chat
        </span>

        <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-12">
          {chatMessages.map(msg => (
            <div key={msg.id} className={`flex flex-col gap-1${(msg as any).extraTopSpacing ? " mt-[20px]" : ""}`}>
              <div className={`flex items-center gap-1.5 ${msg.isYou ? "justify-end" : ""}`}>
                {!msg.isYou && msg.icon === "slack" && (
                  <SlackIcon className="w-3.5 h-3.5" />
                )}
                <span className={`text-[12px] font-medium ${msg.isYou ? "text-black/50" : "text-black/80"}`}>
                  {msg.sender}
                </span>
                {!msg.isYou && (
                  <span className="text-[11px] text-black/35 ml-auto">{msg.time}</span>
                )}
              </div>
              <div className={`${msg.isYou ? "self-end" : ""}`}>
                <p className="text-[13px] leading-[19px] text-black/75 m-0">
                  {msg.text}
                </p>
              </div>
              {msg.aiSuggestion && (
                <div className="mt-2 bg-[#F5EBDC] rounded-[12px] p-3 flex gap-2 items-start">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 1C12.8 7.2 16.8 11.2 23 12C16.8 12.8 12.8 16.8 12 23C11.2 16.8 7.2 12.8 1 12C7.2 11.2 11.2 7.2 12 1Z" fill="#7532bc"/>
                  </svg>
                  <p className="text-[12px] leading-[17px] text-black/70 font-medium m-0">
                    {msg.aiSuggestion}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

let globalAddNoteCard: (() => void) | null = null;

function RightPanel() {
  const [noteCards, setNoteCards] = useState<NoteCardData[]>([]);
  const nextCardId = useRef(1);

  const addCard = useCallback(() => {
    setNoteCards(prev => [...prev, { id: nextCardId.current++, notes: [], width: 310, height: 563, offsetX: 0, offsetY: 0 }]);
  }, []);

  useEffect(() => {
    globalAddNoteCard = addCard;
    return () => { globalAddNoteCard = null; };
  }, [addCard]);

  const removeCard = (cardId: number) => {
    setNoteCards(prev => prev.filter(c => c.id !== cardId));
  };

  const updateCardNotes = (cardId: number, notes: NoteItem[]) => {
    setNoteCards(prev => prev.map(c => c.id === cardId ? { ...c, notes } : c));
  };

  const resizeCard = (cardId: number, width: number) => {
    setNoteCards(prev => prev.map(c => c.id === cardId ? { ...c, width } : c));
  };

  const resizeCardHeight = (cardId: number, height: number) => {
    setNoteCards(prev => prev.map(c => c.id === cardId ? { ...c, height } : c));
  };

  const moveCard = (cardId: number, x: number, y: number) => {
    setNoteCards(prev => prev.map(c => c.id === cardId ? { ...c, offsetX: x, offsetY: y } : c));
  };

  return (
    <div className="flex gap-[20px] shrink-0">
      <ChatCard />
      {noteCards.map(card => (
        <SingleNoteCard
          key={card.id}
          card={card}
          onAddCard={addCard}
          onRemoveCard={() => removeCard(card.id)}
          onUpdateNotes={(notes) => updateCardNotes(card.id, notes)}
          onResize={(w) => resizeCard(card.id, w)}
          onResizeHeight={(h) => resizeCardHeight(card.id, h)}
          onMove={(x, y) => moveCard(card.id, x, y)}
          showRemove={true}
        />
      ))}
    </div>
  );
}

function MiniCalendar() {
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return (
    <div className="w-[320px] shrink-0 pt-[80px] pl-[20px] pr-[20px]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[16px] font-medium text-black/90 tracking-[-0.2px]">June 2026</span>
        <div className="flex items-center gap-1">
          <button className="w-[32px] h-[32px] rounded-lg border border-black/10 bg-transparent flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors">
            <ChevronLeft className="w-4 h-4 text-black/50" />
          </button>
          <button className="w-[32px] h-[32px] rounded-lg border border-black/10 bg-transparent flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors">
            <ChevronRight className="w-4 h-4 text-black/50" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-0">
        {weekdays.map((d) => (
          <div key={d} className="h-[40px] flex items-center justify-center text-[12px] text-black/40 font-medium">
            {d}
          </div>
        ))}
        {calendarDays.map((cell, i) => (
          <div key={i} className="h-[44px] flex flex-col items-center justify-center relative">
            <span
              className={`text-[13px] leading-[18px] ${
                cell.today
                  ? "bg-[#302B26] text-white w-[28px] h-[28px] rounded-[6px] flex items-center justify-center font-medium"
                  : cell.outside
                  ? "text-black/25"
                  : "text-black/80"
              }`}
            >
              {cell.day}
            </span>
            {cell.bars && (
              <div className="flex gap-[2px] mt-[2px]">
                {cell.bars.map((color, j) => (
                  <div key={j} className="w-[20px] h-[5px] rounded-[2px]" style={{ backgroundColor: color }} />
                ))}
              </div>
            )}
            {cell.dots && (
              <div className="flex gap-[3px] mt-[3px]">
                {cell.dots.map((color, j) => (
                  <div key={j} className="w-[4px] h-[4px] rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleList() {
  return (
    <div className="flex-1 pt-[80px] pr-[16px] pl-[8px] flex flex-col gap-[16px] overflow-y-auto">
      {scheduleEvents.map((evt, idx) => (
        <div key={idx} className={`flex gap-[12px] items-start bg-white rounded-[16px] p-[14px] ${idx === 0 ? "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]" : ""}`}>
          <div
            className="w-[56px] h-[56px] rounded-[14px] flex flex-col items-center justify-center shrink-0"
            style={{ backgroundColor: evt.color }}
          >
            <span className="text-[11px] font-medium leading-[14px]" style={{ color: evt.textColor, opacity: 0.85 }}>
              {evt.day}
            </span>
            <span className="text-[18px] font-semibold leading-[22px]" style={{ color: evt.textColor }}>
              {evt.date}
            </span>
          </div>
          <div className="flex flex-col gap-[4px] min-w-0">
            <div className="flex items-center gap-3">
              <span className={`font-semibold tracking-[-0.3px] ${idx === 0 ? "text-[22px] leading-[26px]" : "text-[18px] leading-[22px]"} text-black/90`}>
                {evt.label}
              </span>
            </div>
            {evt.role && (
              <span className="text-[14px] text-black/60 leading-[20px]">{evt.role}</span>
            )}
            {evt.time && (
              <span className="text-[14px] text-black/60 leading-[20px]">{evt.time}</span>
            )}
            {evt.location && (
              <span className="text-[14px] text-black/60 leading-[20px]">{evt.location}</span>
            )}
            <div className="flex items-center mt-[6px]">
              <div className="flex -space-x-2">
                {evt.avatars.map((src, j) => (
                  <img key={j} src={src} alt="" className="w-[32px] h-[32px] rounded-[8px] border-2 border-white object-cover" />
                ))}
              </div>
              {evt.extra > 0 && (
                <div className="ml-1 w-[30px] h-[30px] rounded-[8px] bg-[#f0eeeb] flex items-center justify-center text-[12px] font-semibold text-black/50">+{evt.extra}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TeamSmallView() {
  const [, setLocation] = useLocation();
  const [zoomLevel, setZoomLevel] = useState(100);
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get("tab") === "scheduled" ? "scheduled" : "clocked";
  const [activeTab, setActiveTab] = useState<"clocked" | "scheduled">(initialTab);

  const activeMembers = members.filter((m) => m.status === "active");
  const offShiftMembers = members.filter((m) => m.status !== "active");

  const me = activeMembers.find(m => m.id === 0);
  const otherDisplayed = activeMembers.filter(m => m.id !== 0);

  const getTopBadge = (memberId: number) => {
    const cards = briefingCards.filter(c => c.memberId === memberId && c.timePeriod === "today");
    const total = cards.filter(c => c.urgency !== "ai").length;
    const counts = {
      critical: cards.filter(c => c.urgency === "critical").length,
      important: cards.filter(c => c.urgency === "important").length,
      headsup: cards.filter(c => c.urgency === "headsup").length,
      light: cards.filter(c => c.urgency === "light").length,
    };
    if (total === 0) return null;
    let bg = "#dbe2ff", text = "#062e69";
    if (counts.critical > 0) { bg = "#e80d24"; text = "white"; }
    else if (counts.important > 0) { bg = "#e68200"; text = "white"; }
    else if (counts.headsup > 0) { bg = "#4766ff"; text = "white"; }
    return { count: total, bg, text };
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(200, prev + 10));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(50, prev - 10));

  const navigateTo = (memberId: number, urgency?: string) => {
    let url = `/focused/${memberId}`;
    if (urgency) url += `?urgency=${urgency}`;
    setLocation(url);
  };

  return (
    <div className="min-h-screen bg-[#eff1f8] font-sans relative overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="relative px-[80px] pt-[60px] flex items-center justify-between pointer-events-auto">
          <div className="flex flex-col gap-4">
            <h1 className="font-normal text-[33px] leading-[40px] text-black/95" style={{ fontFeatureSettings: "'liga' 0" }}>
              Good morning Nina
            </h1>
            <p className="font-light text-[24px] leading-[22px] text-black/60 tracking-[-0.5px]" style={{ fontFeatureSettings: "'liga' 0" }}>
              Here's what's happening today
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => globalAddNoteCard?.()}
              className="w-[40px] h-[40px] border-none bg-transparent rounded-full cursor-pointer flex items-center justify-center hover:opacity-70 transition-all"
              aria-label="Add note"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
                <path d="M14 3H6C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V9L14 3Z" stroke="black" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 3V9H20" stroke="black" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 13H16M8 17H13" stroke="black" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <ViewToggle active="people" />
            <button aria-label="More options" className="w-[24px] h-[24px] border-none bg-transparent cursor-pointer p-0 shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg className="w-[4px] h-[16px]" viewBox="0 0 4 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14Z" fill="black" fillOpacity="0.65"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="pt-[203px] px-[80px] pb-[160px] flex gap-[20px] transition-all duration-300 overflow-x-auto">
        <div 
          className={`${activeTab === "scheduled" ? "bg-[#F8F7F6]" : "bg-white"} rounded-[24px] shadow-[0_2px_10px_#eaecf4] flex h-[565px] p-2 relative transition-transform duration-300 origin-top-left shrink-0`}
          style={{ transform: `scale(${zoomLevel / 100})`, width: '840px' }}
        >
          {/* Tab Chips */}
          <div className="absolute top-[22px] left-[22px] flex gap-[7px] items-center z-10">
            <button
              onClick={() => setActiveTab("clocked")}
              className={`rounded-[16px] h-[32px] px-3 py-[7px] flex items-center gap-2 border-none cursor-pointer text-[14px] font-normal tracking-[-0.3px] leading-[18px] transition-colors ${
                activeTab === "clocked" ? "bg-[#4a4a4a] text-white" : "bg-black/8 text-black/95"
              }`}
            >
              <MapPin className="w-[14px] h-[14px]" />
              <span>Clocked in ({activeMembers.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("scheduled")}
              className={`rounded-[16px] h-[32px] px-3 py-[7px] flex items-center gap-2 border-none cursor-pointer text-[14px] font-normal tracking-[-0.3px] leading-[18px] transition-colors ${
                activeTab === "scheduled" ? "bg-[#4a4a4a] text-white" : "bg-black/8 text-black/95"
              }`}
            >
              <Calendar className="w-[14px] h-[14px]" />
              <span>Scheduled ({activeMembers.length + offShiftMembers.length})</span>
            </button>
          </div>

          {activeTab === "clocked" ? (
            <>
              {/* Active Area */}
              <div className="flex-1 min-w-0 relative overflow-hidden">
                {/* Featured ME - centered */}
                {me && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[80px] flex flex-col items-center gap-2">
                    <div className="relative inline-block cursor-pointer" onClick={() => navigateTo(0)}>
                      <img 
                        src={me.avatar} 
                        alt="Me" 
                        className="w-[94px] h-[92px] rounded-[7.2px] object-cover hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <span className="bg-[#222b4b1f] rounded-lg px-1 py-0.5 text-sm font-medium text-black/95 tracking-[-0.14px] dotted-underline cursor-pointer" onClick={() => navigateTo(0)}>
                      Me
                    </span>
                    <div className="flex flex-col gap-0.5 items-center">
                      <div className="bg-white rounded-full pl-[6.4px] pr-2 h-[22px] flex items-center">
                        <MapPin className="w-[14.4px] h-[14.4px] text-black/45 mr-[3px]" />
                        <span className="text-[11.2px] text-black tracking-[-0.112px]">{me.location}</span>
                      </div>
                      <div className="bg-white rounded-full pl-[6.4px] pr-2 h-[22px] flex items-center">
                        <Calendar className="w-[14.4px] h-[14.4px] text-black/45 mr-[3px]" />
                        <span className="text-[11.2px] text-black tracking-[-0.112px]">{me.schedule}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other Employees Row */}
                <div className="absolute bottom-[145px] left-[44px] right-[20px] flex gap-6 items-start">
                  {otherDisplayed.map(emp => {
                    const badge = getTopBadge(emp.id);

                    return (
                      <div key={emp.id} className="flex flex-col items-center gap-2 relative">
                        <div className="relative inline-block cursor-pointer" onClick={() => navigateTo(emp.id)}>
                          <img 
                            src={emp.avatar} 
                            alt={emp.name} 
                            className="w-[53px] h-[53px] rounded-[7.2px] object-cover hover:opacity-90 transition-opacity"
                          />
                          {badge && (
                            <div 
                              className="absolute -top-[10px] -right-[10px] rounded-full border-2 border-white flex items-center justify-center text-[16px] font-bold tracking-[-0.16px] w-[33px] h-[34px] hover:scale-110 transition-transform cursor-pointer"
                              style={{ backgroundColor: badge.bg, color: badge.text }}
                              onClick={(e) => { e.stopPropagation(); navigateTo(emp.id); }}
                            >
                              {badge.count}
                            </div>
                          )}
                        </div>
                        <span 
                          className="bg-[#222b4b1f] rounded-lg px-1 pr-2 py-0.5 text-sm font-medium text-black/95 tracking-[-0.14px] dotted-underline cursor-pointer whitespace-nowrap"
                          onClick={() => navigateTo(emp.id)}
                        >
                          {emp.name}
                        </span>
                        <div className="flex flex-col gap-0.5 items-center">
                          <div className="bg-white rounded-full pl-[6.4px] pr-2 h-[22px] flex items-center">
                            <MapPin className="w-[14.4px] h-[14.4px] text-black/45 mr-[3px]" />
                            <span className="text-[11.2px] text-black tracking-[-0.112px]">{emp.location}</span>
                          </div>
                          <div className="bg-white rounded-full pl-[6.4px] pr-2 h-[22px] flex items-center">
                            <Calendar className="w-[14.4px] h-[14.4px] text-black/45 mr-[3px]" />
                            <span className="text-[11.2px] text-black tracking-[-0.112px]">{emp.schedule}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Sidebar (Off-shift) */}
              {offShiftMembers.length > 0 && (
              <div className="bg-[#f3f3f3] w-[196px] rounded-[20px] shrink-0 flex flex-col items-center justify-center gap-10 py-[60px] px-6">
                {offShiftMembers.map(emp => (
                  <div key={emp.id} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => navigateTo(emp.id)}>
                    <img 
                      src={emp.avatar} 
                      alt={emp.name} 
                      className="w-[53px] h-[53px] rounded-[7.2px] object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <span className="bg-[#222b4b1f] rounded-lg px-1 pr-2 py-0.5 text-sm font-medium text-black/80 tracking-[-0.14px] whitespace-nowrap dotted-underline">
                      {emp.name}
                    </span>
                    <div className={`rounded-full px-[6.4px] flex items-center gap-1.5 ${emp.status === 'lunch' ? 'bg-black/43' : 'bg-[#7532bc]'}`}>
                      {emp.status === 'lunch' ? (
                        <Clock className="w-[14.4px] h-[14.4px] text-white" />
                      ) : (
                        <PowerOff className="w-[14.4px] h-[14.4px] text-white" />
                      )}
                      <span className="text-[11.2px] font-medium text-white tracking-[-0.112px] leading-[22.4px] whitespace-nowrap">
                        {emp.status === 'lunch' ? 'Lunch break' : 'Time off'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </>
          ) : (
            <>
              <MiniCalendar />
              <ScheduleList />
            </>
          )}
        </div>

        {/* Chat + Notes Panel */}
        <RightPanel />
      </div>

      {/* Ask Bar */}
      <AskBar />

      {/* Zoom Control */}
      <div className="fixed bottom-[43px] right-[120px] bg-white rounded-[28px] shadow-[0_6.4px_32px_rgba(189,195,214,0.4)] flex items-center h-[38px] p-[3px] z-50">
        <span className="px-3 text-[16px] font-normal text-black/60 tracking-[-0.16px] w-[71px] text-center leading-[22px]">
          {zoomLevel}%
        </span>
        <button 
          className="w-[33px] h-[33px] rounded-full border-none border-r border-black/10 bg-transparent hover:bg-black/5 flex items-center justify-center text-black/55 cursor-pointer transition-colors"
          onClick={handleZoomIn}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button 
          className="w-[33px] h-[33px] rounded-full border-none bg-transparent hover:bg-black/5 flex items-center justify-center text-black/55 cursor-pointer transition-colors"
          onClick={handleZoomOut}
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
