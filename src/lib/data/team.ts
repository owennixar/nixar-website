export interface TeamMember {
  name: string;
  role: string;
  type: "founder" | "board" | "consultant";
  initials: string;
}

export const team: TeamMember[] = [
  {
    name: "Anwar Mirza",
    role: "Co-Founder",
    type: "founder",
    initials: "AM",
  },
  {
    name: "Owen Nixon",
    role: "Co-Founder",
    type: "founder",
    initials: "ON",
  },
  {
    name: "Azam Mirza",
    role: "Board of Director",
    type: "board",
    initials: "AZ",
  },
  {
    name: "Claudia Mirza",
    role: "Board of Director",
    type: "board",
    initials: "CM",
  },
  {
    name: "Micheal S Nixon",
    role: "Board of Director",
    type: "board",
    initials: "MN",
  },
  {
    name: "Mir Ali",
    role: "Board of Director",
    type: "board",
    initials: "MA",
  },
  {
    name: "Shahab Bokhari",
    role: "Consultant",
    type: "consultant",
    initials: "SB",
  },
];

export const founders = team.filter((m) => m.type === "founder");
export const board = team.filter((m) => m.type === "board");
export const consultants = team.filter((m) => m.type === "consultant");
