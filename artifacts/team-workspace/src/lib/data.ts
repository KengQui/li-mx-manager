export type TeamMember = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  location: string;
  schedule: string;
  clockedIn: string | null;
  status: "active" | "lunch" | "timeoff";
};

export type TimePeriod = "today" | "yesterday" | "this-week" | "this-month" | "last-3-months";

export type BriefingCard = {
  id: number;
  memberId: number;
  urgency: "critical" | "important" | "headsup" | "light" | "ai";
  category: string;
  text: string;
  actions?: { label: string; variant: "primary" | "secondary" }[];
  timePeriod: TimePeriod;
};

export const members: TeamMember[] = [
  {
    id: 0,
    name: "Me",
    role: "Customer Assistant",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Front desk",
    schedule: "9am – 5pm",
    clockedIn: "8:50 am",
    status: "active",
  },
  {
    id: 1,
    name: "Amanda Lin-Green",
    role: "Bakery Lead",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    location: "Kitchen",
    schedule: "6am – 2pm",
    clockedIn: "6:02 am",
    status: "active",
  },
  {
    id: 2,
    name: "Tom Newman",
    role: "Sales Associate",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Front desk",
    schedule: "8am – 4pm",
    clockedIn: "7:55 am",
    status: "active",
  },
  {
    id: 3,
    name: "Jamie Misch",
    role: "Electronics Specialist",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    location: "Electronics",
    schedule: "10am – 6pm",
    clockedIn: "9:58 am",
    status: "active",
  },
  {
    id: 4,
    name: "Mark Hannaford",
    role: "Stock Associate",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    location: "Stockroom",
    schedule: "7am – 3pm",
    clockedIn: null,
    status: "active",
  },
  {
    id: 5,
    name: "Sarah Chen",
    role: "Customer Assistant",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    location: "Front desk",
    schedule: "9am – 5pm",
    clockedIn: "8:55 am",
    status: "lunch",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Sales Associate",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    location: "Front desk",
    schedule: "8am – 4pm",
    clockedIn: null,
    status: "timeoff",
  },
];

export const briefingCards: BriefingCard[] = [
  // ========== TODAY ==========

  // Member 0 (Me) - Today
  { id: 1, memberId: 0, timePeriod: "today", urgency: "critical", category: "Attendance", text: "<span class='dotted-underline font-medium'>Amanda Lin-Green</span> hasn't clocked in. Day shift started <strong>12 min ago</strong>. <strong>2 contact attempts</strong> unanswered.", actions: [{ label: "Call Amanda", variant: "primary" }, { label: "Find coverage", variant: "secondary" }] },
  { id: 2, memberId: 0, timePeriod: "today", urgency: "critical", category: "Staffing", text: "Unit 3B is <strong>2 nurses short</strong> for tonight's 7p handoff. Patient ratio hits <strong>1:6</strong> if unresolved.", actions: [{ label: "Post open shift", variant: "primary" }, { label: "Call agency", variant: "secondary" }] },
  { id: 3, memberId: 0, timePeriod: "today", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Mark Hannaford</span> is at <strong>38.5 hrs</strong> this week. Tonight's shift will add <strong>$340</strong> in unbudgeted overtime.", actions: [{ label: "Adjust shift", variant: "primary" }, { label: "Approve OT", variant: "secondary" }] },
  { id: 4, memberId: 0, timePeriod: "today", urgency: "important", category: "Scheduling", text: "<strong>3 next-week shifts</strong> remain unassigned. Schedule publish deadline is <strong>tomorrow at noon</strong>.", actions: [{ label: "Assign now", variant: "primary" }, { label: "Extend deadline", variant: "secondary" }] },
  { id: 5, memberId: 0, timePeriod: "today", urgency: "important", category: "Compliance", text: "<span class='dotted-underline font-medium'>Tom Newman</span> has worked <strong>4 consecutive nights</strong> \u2014 exceeds the unit's <strong>3-night fatigue rotation</strong> policy.", actions: [{ label: "Rotate out", variant: "primary" }, { label: "Override", variant: "secondary" }] },
  { id: 6, memberId: 0, timePeriod: "today", urgency: "headsup", category: "Scheduling", text: "<span class='dotted-underline font-medium'>Jamie Misch</span> requested <strong>PTO Thu\u2013Sat</strong>. No qualified night-shift backup identified yet.", actions: [{ label: "Find backup", variant: "primary" }, { label: "View schedule", variant: "secondary" }] },
  { id: 50, memberId: 0, timePeriod: "today", urgency: "headsup", category: "Compliance", text: "<strong>Joint Commission survey</strong> begins Monday. <strong>2 team members</strong> have expired competency checks on file.", actions: [{ label: "View checklist", variant: "primary" }, { label: "Notify team", variant: "secondary" }] },
  { id: 51, memberId: 0, timePeriod: "today", urgency: "headsup", category: "Staffing", text: "Patient acuity <strong>elevated</strong> on 3B \u2014 current <strong>1:5</strong> nurse-to-patient ratio is at your unit threshold.", actions: [{ label: "Request float nurse", variant: "primary" }, { label: "Monitor", variant: "secondary" }] },
  { id: 52, memberId: 0, timePeriod: "today", urgency: "light", category: "Team Patterns & Signals", text: "Team on-time clock-in rate hit <strong>96%</strong> this week \u2014 strongest performance in <strong>3 months</strong>.", actions: [{ label: "View trend", variant: "primary" }, { label: "Share with team", variant: "secondary" }] },
  { id: 53, memberId: 0, timePeriod: "today", urgency: "light", category: "Team Patterns & Signals", text: "Overtime hours <strong>down 18%</strong> vs. last month. Scheduling adjustments are working.", actions: [{ label: "View report", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 1 (Amanda) - Today
  { id: 7, memberId: 1, timePeriod: "today", urgency: "critical", category: "Attendance", text: "<span class='dotted-underline font-medium'>Amanda</span> hasn't clocked in. Day shift started <strong>12 min ago</strong>. <strong>2 contact attempts</strong> unanswered.", actions: [{ label: "Find coverage", variant: "primary" }, { label: "Log absence", variant: "secondary" }] },
  { id: 8, memberId: 1, timePeriod: "today", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Amanda</span> is at <strong>36 hrs</strong> this week. Friday's <strong>12-hr shift</strong> will push her past the <strong>40-hr threshold</strong>.", actions: [{ label: "Trim shift", variant: "primary" }, { label: "Approve OT", variant: "secondary" }] },
  { id: 9, memberId: 1, timePeriod: "today", urgency: "headsup", category: "Compliance", text: "<span class='dotted-underline font-medium'>Amanda's</span> meal break was taken <strong>22 min past</strong> the <strong>5-hr compliance window</strong> yesterday.", actions: [{ label: "File waiver", variant: "primary" }, { label: "View log", variant: "secondary" }] },
  { id: 60, memberId: 1, timePeriod: "today", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Amanda</span> completed <strong>all required</strong> annual training modules this quarter \u2014 <strong>no outstanding items</strong>.", actions: [{ label: "View record", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 2 (Tom) - Today
  { id: 10, memberId: 2, timePeriod: "today", urgency: "critical", category: "Attendance", text: "<span class='dotted-underline font-medium'>Tom</span> called out for tonight's shift \u2014 <strong>3 hrs</strong> before start time. <strong>3rd call-out</strong> in 30 days.", actions: [{ label: "Find coverage", variant: "primary" }, { label: "Log incident", variant: "secondary" }] },
  { id: 11, memberId: 2, timePeriod: "today", urgency: "important", category: "Compliance", text: "<span class='dotted-underline font-medium'>Tom</span> has worked <strong>4 consecutive nights</strong> \u2014 exceeds the unit's <strong>3-night fatigue rotation</strong> policy.", actions: [{ label: "Rotate out", variant: "primary" }, { label: "Override", variant: "secondary" }] },
  { id: 12, memberId: 2, timePeriod: "today", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Tom</span> hits <strong>40 hrs</strong> with tonight's shift. Any extension requires <strong>supervisor sign-off</strong>.", actions: [{ label: "Approve OT", variant: "primary" }, { label: "Shorten shift", variant: "secondary" }] },
  { id: 13, memberId: 2, timePeriod: "today", urgency: "headsup", category: "Scheduling", text: "<span class='dotted-underline font-medium'>Tom</span> is <strong>double-booked</strong> Dec 14 \u2014 scheduled shift conflicts with <strong>mandatory skills lab</strong> training.", actions: [{ label: "Resolve conflict", variant: "primary" }, { label: "View schedule", variant: "secondary" }] },
  { id: 61, memberId: 2, timePeriod: "today", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Tom</span> received <strong>2 positive</strong> patient care comments from families this week.", actions: [{ label: "View feedback", variant: "primary" }, { label: "Acknowledge", variant: "secondary" }] },

  // Member 3 (Jamie) - Today
  { id: 14, memberId: 3, timePeriod: "today", urgency: "important", category: "Scheduling", text: "<span class='dotted-underline font-medium'>Jamie's</span> PTO request <strong>Thu\u2013Sat</strong> leaves <strong>3 night shifts</strong> uncovered. No qualified backup found.", actions: [{ label: "Deny request", variant: "primary" }, { label: "Find backup", variant: "secondary" }] },
  { id: 15, memberId: 3, timePeriod: "today", urgency: "headsup", category: "Compliance", text: "<span class='dotted-underline font-medium'>Jamie's</span> N95 fit test <strong>expired 11 days ago</strong> \u2014 required before next patient assignment.", actions: [{ label: "Schedule test", variant: "primary" }, { label: "Waive 1 shift", variant: "secondary" }] },
  { id: 16, memberId: 3, timePeriod: "today", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Jamie</span> has clocked in early for <strong>8 consecutive shifts</strong> \u2014 <strong>zero late arrivals</strong> this month.", actions: [{ label: "Acknowledge", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 4 (Mark) - Today
  { id: 17, memberId: 4, timePeriod: "today", urgency: "critical", category: "Compliance", text: "<span class='dotted-underline font-medium'>Mark's</span> LPN license <strong>expires in 14 days</strong>. No renewal documentation received.", actions: [{ label: "Contact Mark", variant: "primary" }, { label: "Escalate to HR", variant: "secondary" }] },
  { id: 18, memberId: 4, timePeriod: "today", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Mark</span> is at <strong>38.5 hrs</strong> this week. Tonight's shift will generate <strong>$340</strong> in unbudgeted overtime.", actions: [{ label: "Shorten shift", variant: "primary" }, { label: "Approve OT", variant: "secondary" }] },
  { id: 19, memberId: 4, timePeriod: "today", urgency: "headsup", category: "Scheduling", text: "<span class='dotted-underline font-medium'>Mark's</span> shift swap with <span class='dotted-underline font-medium'>Tom</span> on Thursday hasn't received <strong>manager approval</strong>.", actions: [{ label: "Approve swap", variant: "primary" }, { label: "Deny", variant: "secondary" }] },
  { id: 62, memberId: 4, timePeriod: "today", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Mark's</span> patient satisfaction scores are in the <strong>top 25%</strong> on the unit this month.", actions: [{ label: "View scores", variant: "primary" }, { label: "Share", variant: "secondary" }] },

  // ========== YESTERDAY ==========

  // Member 0 (Me) - Yesterday
  { id: 100, memberId: 0, timePeriod: "yesterday", urgency: "critical", category: "Attendance", text: "<span class='dotted-underline font-medium'>Tom Newman</span> left shift <strong>2 hrs early</strong> without authorization. Patient hand-off was <strong>incomplete</strong>.", actions: [{ label: "Review incident", variant: "primary" }, { label: "File report", variant: "secondary" }] },
  { id: 101, memberId: 0, timePeriod: "yesterday", urgency: "important", category: "Staffing", text: "Evening shift ran with <strong>1 fewer nurse</strong> than required. Agency backup arrived <strong>45 min late</strong>.", actions: [{ label: "View log", variant: "primary" }, { label: "Escalate", variant: "secondary" }] },
  { id: 102, memberId: 0, timePeriod: "yesterday", urgency: "important", category: "Compliance", text: "<span class='dotted-underline font-medium'>Amanda</span> missed <strong>mandatory meal break</strong> \u2014 worked <strong>6.5 hrs</strong> without a documented 30-min break.", actions: [{ label: "File waiver", variant: "primary" }, { label: "View details", variant: "secondary" }] },
  { id: 103, memberId: 0, timePeriod: "yesterday", urgency: "headsup", category: "Scheduling", text: "<strong>2 open shifts</strong> posted for yesterday's evening coverage were filled within <strong>20 min</strong>.", actions: [{ label: "View report", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },
  { id: 104, memberId: 0, timePeriod: "yesterday", urgency: "light", category: "Team Patterns & Signals", text: "All team members clocked in within <strong>5 min</strong> of shift start \u2014 <strong>100% on-time rate</strong>.", actions: [{ label: "View trend", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 1 (Amanda) - Yesterday
  { id: 105, memberId: 1, timePeriod: "yesterday", urgency: "important", category: "Compliance", text: "<span class='dotted-underline font-medium'>Amanda</span> missed <strong>mandatory meal break</strong> \u2014 worked <strong>6.5 hrs</strong> straight on floor duty.", actions: [{ label: "File waiver", variant: "primary" }, { label: "View log", variant: "secondary" }] },
  { id: 106, memberId: 1, timePeriod: "yesterday", urgency: "headsup", category: "Scheduling", text: "<span class='dotted-underline font-medium'>Amanda</span> swapped shifts with <span class='dotted-underline font-medium'>Jamie</span> \u2014 now covering <strong>Thu evening</strong> instead of Thu day.", actions: [{ label: "Confirm swap", variant: "primary" }, { label: "View schedule", variant: "secondary" }] },
  { id: 107, memberId: 1, timePeriod: "yesterday", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Amanda</span> clocked in <strong>8 min early</strong> and completed pre-shift safety checklist.", actions: [{ label: "Acknowledge", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 2 (Tom) - Yesterday
  { id: 108, memberId: 2, timePeriod: "yesterday", urgency: "critical", category: "Attendance", text: "<span class='dotted-underline font-medium'>Tom</span> left shift <strong>2 hrs early</strong> without supervisor approval. Coverage gap on 3B.", actions: [{ label: "Review incident", variant: "primary" }, { label: "Contact Tom", variant: "secondary" }] },
  { id: 109, memberId: 2, timePeriod: "yesterday", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Tom</span> logged <strong>11.5 hrs</strong> yesterday \u2014 <strong>1.5 hrs over</strong> scheduled shift. Overtime approved retroactively.", actions: [{ label: "View timecard", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },
  { id: 110, memberId: 2, timePeriod: "yesterday", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Tom</span> volunteered for an <strong>extra patient transport</strong> run during peak hours.", actions: [{ label: "Acknowledge", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 3 (Jamie) - Yesterday
  { id: 111, memberId: 3, timePeriod: "yesterday", urgency: "headsup", category: "Scheduling", text: "<span class='dotted-underline font-medium'>Jamie</span> submitted a <strong>shift swap request</strong> for Thursday. Awaiting your approval.", actions: [{ label: "Approve", variant: "primary" }, { label: "Deny", variant: "secondary" }] },
  { id: 112, memberId: 3, timePeriod: "yesterday", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Jamie</span> completed patient documentation <strong>30 min before</strong> end of shift \u2014 <strong>zero overdue charts</strong>.", actions: [{ label: "View record", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 4 (Mark) - Yesterday
  { id: 113, memberId: 4, timePeriod: "yesterday", urgency: "important", category: "Compliance", text: "<span class='dotted-underline font-medium'>Mark</span> was flagged for <strong>improper PPE use</strong> during a wound care procedure.", actions: [{ label: "Review report", variant: "primary" }, { label: "Schedule coaching", variant: "secondary" }] },
  { id: 114, memberId: 4, timePeriod: "yesterday", urgency: "headsup", category: "Overtime", text: "<span class='dotted-underline font-medium'>Mark</span> stayed <strong>45 min past</strong> shift end to finish charting. OT auto-approved under <strong>1-hr threshold</strong>.", actions: [{ label: "View timecard", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // ========== THIS WEEK ==========

  // Member 0 (Me) - This Week
  { id: 200, memberId: 0, timePeriod: "this-week", urgency: "critical", category: "Staffing", text: "<strong>3 call-outs</strong> this week across the unit. Staffing dropped below <strong>minimum ratio twice</strong>.", actions: [{ label: "View incidents", variant: "primary" }, { label: "Request agency", variant: "secondary" }] },
  { id: 201, memberId: 0, timePeriod: "this-week", urgency: "important", category: "Overtime", text: "Total team overtime this week: <strong>24.5 hrs</strong> (<strong>$1,960 over budget</strong>). <strong>3 employees</strong> exceeded 40 hrs.", actions: [{ label: "View breakdown", variant: "primary" }, { label: "Adjust next week", variant: "secondary" }] },
  { id: 202, memberId: 0, timePeriod: "this-week", urgency: "important", category: "Compliance", text: "<strong>2 meal break violations</strong> logged this week. Both on Unit 3B during high-acuity shifts.", actions: [{ label: "File waivers", variant: "primary" }, { label: "Review policy", variant: "secondary" }] },
  { id: 203, memberId: 0, timePeriod: "this-week", urgency: "headsup", category: "Scheduling", text: "Next week's schedule is <strong>85% filled</strong>. <strong>4 evening shifts</strong> and <strong>2 weekend slots</strong> still open.", actions: [{ label: "Post shifts", variant: "primary" }, { label: "View gaps", variant: "secondary" }] },
  { id: 204, memberId: 0, timePeriod: "this-week", urgency: "light", category: "Team Patterns & Signals", text: "Team attendance rate: <strong>94%</strong> this week. On-time clock-ins <strong>improved 3%</strong> over last week.", actions: [{ label: "View trend", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 1 (Amanda) - This Week
  { id: 205, memberId: 1, timePeriod: "this-week", urgency: "important", category: "Attendance", text: "<span class='dotted-underline font-medium'>Amanda</span> has <strong>1 late clock-in</strong> and <strong>1 no-show</strong> this week. Attendance score dropped to <strong>78%</strong>.", actions: [{ label: "Schedule check-in", variant: "primary" }, { label: "View history", variant: "secondary" }] },
  { id: 206, memberId: 1, timePeriod: "this-week", urgency: "headsup", category: "Overtime", text: "<span class='dotted-underline font-medium'>Amanda</span> worked <strong>38 hrs</strong> through Thursday. Friday shift will generate <strong>10 hrs overtime</strong>.", actions: [{ label: "Adjust Friday", variant: "primary" }, { label: "Approve", variant: "secondary" }] },
  { id: 207, memberId: 1, timePeriod: "this-week", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Amanda</span> picked up <strong>2 extra shifts</strong> this week to cover call-outs.", actions: [{ label: "Acknowledge", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 2 (Tom) - This Week
  { id: 208, memberId: 2, timePeriod: "this-week", urgency: "critical", category: "Attendance", text: "<span class='dotted-underline font-medium'>Tom</span> has <strong>2 call-outs</strong> this week. Trending toward <strong>corrective action threshold</strong>.", actions: [{ label: "Issue warning", variant: "primary" }, { label: "Schedule meeting", variant: "secondary" }] },
  { id: 209, memberId: 2, timePeriod: "this-week", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Tom</span> logged <strong>14 hrs overtime</strong> this week \u2014 <strong>highest on the unit</strong>.", actions: [{ label: "Review schedule", variant: "primary" }, { label: "Cap hours", variant: "secondary" }] },
  { id: 210, memberId: 2, timePeriod: "this-week", urgency: "headsup", category: "Compliance", text: "<span class='dotted-underline font-medium'>Tom's</span> fatigue rotation was <strong>overridden twice</strong> this week by charge nurse.", actions: [{ label: "Review overrides", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 3 (Jamie) - This Week
  { id: 211, memberId: 3, timePeriod: "this-week", urgency: "headsup", category: "Scheduling", text: "<span class='dotted-underline font-medium'>Jamie</span> swapped <strong>2 shifts</strong> this week. All swaps approved and coverage confirmed.", actions: [{ label: "View swaps", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },
  { id: 212, memberId: 3, timePeriod: "this-week", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Jamie</span> had <strong>zero compliance flags</strong> this week. All breaks documented on time.", actions: [{ label: "Acknowledge", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 4 (Mark) - This Week
  { id: 213, memberId: 4, timePeriod: "this-week", urgency: "important", category: "Compliance", text: "<span class='dotted-underline font-medium'>Mark's</span> LPN renewal still pending. <strong>12 days remaining</strong> before license suspension.", actions: [{ label: "Send reminder", variant: "primary" }, { label: "Escalate", variant: "secondary" }] },
  { id: 214, memberId: 4, timePeriod: "this-week", urgency: "headsup", category: "Overtime", text: "<span class='dotted-underline font-medium'>Mark</span> averaged <strong>9.5 hrs/shift</strong> this week. Consistently staying <strong>30\u201345 min past end</strong>.", actions: [{ label: "Review workload", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // ========== THIS MONTH ==========

  // Member 0 (Me) - This Month
  { id: 300, memberId: 0, timePeriod: "this-month", urgency: "critical", category: "Staffing", text: "Unit averaged <strong>1.2 nurses below</strong> minimum staffing ratio on <strong>8 of 22 shifts</strong> this month.", actions: [{ label: "View analysis", variant: "primary" }, { label: "Request FTEs", variant: "secondary" }] },
  { id: 301, memberId: 0, timePeriod: "this-month", urgency: "important", category: "Overtime", text: "Team overtime: <strong>86 hrs</strong> this month (<strong>$6,880</strong>). <strong>22% over budget</strong>. Top contributors: Tom, Amanda.", actions: [{ label: "View breakdown", variant: "primary" }, { label: "Set caps", variant: "secondary" }] },
  { id: 302, memberId: 0, timePeriod: "this-month", urgency: "important", category: "Compliance", text: "<strong>7 meal break violations</strong> this month. Up from <strong>3 last month</strong>. All on high-census days.", actions: [{ label: "View violations", variant: "primary" }, { label: "Update policy", variant: "secondary" }] },
  { id: 303, memberId: 0, timePeriod: "this-month", urgency: "headsup", category: "Attendance", text: "Team call-out rate: <strong>6.2%</strong> this month (target: <strong>&lt;5%</strong>). Trending upward since week 2.", actions: [{ label: "View trend", variant: "primary" }, { label: "Plan intervention", variant: "secondary" }] },
  { id: 304, memberId: 0, timePeriod: "this-month", urgency: "light", category: "Team Patterns & Signals", text: "Patient satisfaction scores for unit: <strong>4.3/5.0</strong> this month. Up from <strong>4.1</strong> last month.", actions: [{ label: "View scores", variant: "primary" }, { label: "Share with team", variant: "secondary" }] },

  // Member 1 (Amanda) - This Month
  { id: 305, memberId: 1, timePeriod: "this-month", urgency: "important", category: "Attendance", text: "<span class='dotted-underline font-medium'>Amanda</span> has <strong>3 late arrivals</strong> and <strong>1 no-show</strong> this month. Attendance score: <strong>72%</strong>.", actions: [{ label: "Initiate review", variant: "primary" }, { label: "View history", variant: "secondary" }] },
  { id: 306, memberId: 1, timePeriod: "this-month", urgency: "headsup", category: "Overtime", text: "<span class='dotted-underline font-medium'>Amanda</span> logged <strong>18 hrs overtime</strong> this month. Picked up <strong>4 extra shifts</strong> for coverage.", actions: [{ label: "Review hours", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },
  { id: 307, memberId: 1, timePeriod: "this-month", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Amanda</span> completed <strong>BLS recertification</strong> and <strong>annual competency exam</strong> this month.", actions: [{ label: "View record", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 2 (Tom) - This Month
  { id: 308, memberId: 2, timePeriod: "this-month", urgency: "critical", category: "Attendance", text: "<span class='dotted-underline font-medium'>Tom</span> has <strong>5 call-outs</strong> this month. Exceeds <strong>corrective action threshold (3)</strong>.", actions: [{ label: "Initiate writeup", variant: "primary" }, { label: "Schedule meeting", variant: "secondary" }] },
  { id: 309, memberId: 2, timePeriod: "this-month", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Tom</span> logged <strong>32 hrs overtime</strong> this month \u2014 <strong>$2,560</strong> unbudgeted. Highest on unit.", actions: [{ label: "Set hour cap", variant: "primary" }, { label: "Review schedule", variant: "secondary" }] },
  { id: 310, memberId: 2, timePeriod: "this-month", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Tom</span> received <strong>5 positive</strong> patient comments this month despite attendance issues.", actions: [{ label: "View feedback", variant: "primary" }, { label: "Acknowledge", variant: "secondary" }] },

  // Member 3 (Jamie) - This Month
  { id: 311, memberId: 3, timePeriod: "this-month", urgency: "headsup", category: "Compliance", text: "<span class='dotted-underline font-medium'>Jamie's</span> N95 fit test is <strong>25 days overdue</strong>. Must complete before next patient-facing shift.", actions: [{ label: "Schedule now", variant: "primary" }, { label: "Restrict assignment", variant: "secondary" }] },
  { id: 312, memberId: 3, timePeriod: "this-month", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Jamie</span> has <strong>perfect attendance</strong> this month \u2014 <strong>zero absences</strong>, zero late arrivals.", actions: [{ label: "Acknowledge", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 4 (Mark) - This Month
  { id: 313, memberId: 4, timePeriod: "this-month", urgency: "critical", category: "Compliance", text: "<span class='dotted-underline font-medium'>Mark's</span> LPN license renewal is <strong>overdue</strong>. Cannot work patient care until resolved.", actions: [{ label: "Reassign duties", variant: "primary" }, { label: "Contact Mark", variant: "secondary" }] },
  { id: 314, memberId: 4, timePeriod: "this-month", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Mark</span> logged <strong>22 hrs overtime</strong> this month. Charting delays are primary cause.", actions: [{ label: "Review workflow", variant: "primary" }, { label: "Set cap", variant: "secondary" }] },
  { id: 315, memberId: 4, timePeriod: "this-month", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Mark's</span> patient satisfaction scores: <strong>4.6/5.0</strong> \u2014 <strong>highest on the unit</strong> this month.", actions: [{ label: "View scores", variant: "primary" }, { label: "Share", variant: "secondary" }] },

  // ========== LAST 3 MONTHS ==========

  // Member 0 (Me) - Last 3 Months
  { id: 400, memberId: 0, timePeriod: "last-3-months", urgency: "critical", category: "Staffing", text: "Unit operated below minimum staffing ratio on <strong>18 shifts</strong> over 3 months. Agency spend: <strong>$14,200</strong>.", actions: [{ label: "View report", variant: "primary" }, { label: "Request budget", variant: "secondary" }] },
  { id: 401, memberId: 0, timePeriod: "last-3-months", urgency: "important", category: "Overtime", text: "Quarterly overtime: <strong>248 hrs</strong> (<strong>$19,840</strong>). <strong>Down 12%</strong> from previous quarter after scheduling changes.", actions: [{ label: "View trend", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },
  { id: 402, memberId: 0, timePeriod: "last-3-months", urgency: "important", category: "Compliance", text: "<strong>14 meal break violations</strong> in Q4. Concentrated on high-census Tuesdays and Fridays.", actions: [{ label: "View analysis", variant: "primary" }, { label: "Propose fix", variant: "secondary" }] },
  { id: 403, memberId: 0, timePeriod: "last-3-months", urgency: "headsup", category: "Attendance", text: "Team call-out rate averaged <strong>5.8%</strong> over 3 months. Above <strong>5% target</strong> but stable.", actions: [{ label: "View trend", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },
  { id: 404, memberId: 0, timePeriod: "last-3-months", urgency: "light", category: "Team Patterns & Signals", text: "Patient satisfaction trending up: <strong>4.0 \u2192 4.1 \u2192 4.3</strong> over the quarter. Team morale initiatives working.", actions: [{ label: "View report", variant: "primary" }, { label: "Share", variant: "secondary" }] },

  // Member 1 (Amanda) - Last 3 Months
  { id: 405, memberId: 1, timePeriod: "last-3-months", urgency: "important", category: "Attendance", text: "<span class='dotted-underline font-medium'>Amanda</span> had <strong>6 late arrivals</strong> and <strong>2 no-shows</strong> over 3 months. Placed on <strong>attendance improvement plan</strong>.", actions: [{ label: "View plan", variant: "primary" }, { label: "Schedule review", variant: "secondary" }] },
  { id: 406, memberId: 1, timePeriod: "last-3-months", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Amanda</span> completed <strong>3 elective CE courses</strong> and mentored <strong>1 new hire</strong> over the quarter.", actions: [{ label: "View record", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 2 (Tom) - Last 3 Months
  { id: 407, memberId: 2, timePeriod: "last-3-months", urgency: "critical", category: "Attendance", text: "<span class='dotted-underline font-medium'>Tom</span> has <strong>11 call-outs</strong> in 3 months. Progressive discipline: <strong>written warning issued</strong>.", actions: [{ label: "View file", variant: "primary" }, { label: "Schedule HR meeting", variant: "secondary" }] },
  { id: 408, memberId: 2, timePeriod: "last-3-months", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Tom</span> logged <strong>88 hrs overtime</strong> over 3 months (<strong>$7,040</strong>). Pattern: staying late to finish charting.", actions: [{ label: "Review workflow", variant: "primary" }, { label: "Provide training", variant: "secondary" }] },
  { id: 409, memberId: 2, timePeriod: "last-3-months", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Tom</span> received <strong>12 positive</strong> patient comments this quarter \u2014 <strong>top performer</strong> in care quality.", actions: [{ label: "Nominate award", variant: "primary" }, { label: "Acknowledge", variant: "secondary" }] },

  // Member 3 (Jamie) - Last 3 Months
  { id: 410, memberId: 3, timePeriod: "last-3-months", urgency: "headsup", category: "Compliance", text: "<span class='dotted-underline font-medium'>Jamie</span> has <strong>2 overdue</strong> compliance items: <strong>N95 fit test</strong> and <strong>annual TB screening</strong>.", actions: [{ label: "Schedule tests", variant: "primary" }, { label: "Restrict shifts", variant: "secondary" }] },
  { id: 411, memberId: 3, timePeriod: "last-3-months", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Jamie</span> had <strong>98% attendance</strong> and <strong>zero overtime flags</strong> over the quarter. Model consistency.", actions: [{ label: "Acknowledge", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },

  // Member 4 (Mark) - Last 3 Months
  { id: 412, memberId: 4, timePeriod: "last-3-months", urgency: "critical", category: "Compliance", text: "<span class='dotted-underline font-medium'>Mark's</span> LPN license <strong>lapsed 3 weeks ago</strong>. Currently on <strong>restricted non-clinical duties</strong>.", actions: [{ label: "View status", variant: "primary" }, { label: "Contact board", variant: "secondary" }] },
  { id: 413, memberId: 4, timePeriod: "last-3-months", urgency: "important", category: "Overtime", text: "<span class='dotted-underline font-medium'>Mark</span> averaged <strong>8.5 hrs overtime/month</strong> this quarter. Charting efficiency is improving.", actions: [{ label: "View trend", variant: "primary" }, { label: "Dismiss", variant: "secondary" }] },
  { id: 414, memberId: 4, timePeriod: "last-3-months", urgency: "light", category: "Team Patterns & Signals", text: "<span class='dotted-underline font-medium'>Mark's</span> quarterly patient satisfaction: <strong>4.5/5.0</strong>. Consistently in <strong>top quartile</strong>.", actions: [{ label: "View report", variant: "primary" }, { label: "Share", variant: "secondary" }] },
];
