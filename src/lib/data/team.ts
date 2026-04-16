export interface TeamMember {
  name: string;
  role: string;
  type: "founder" | "executive" | "board";
  initials: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: "Anwar Mirza",
    role: "Co-Founder",
    type: "founder",
    initials: "AM",
    image: "/images/team-anwar.webp",
  },
  {
    name: "Owen Nixon",
    role: "Co-Founder",
    type: "founder",
    initials: "ON",
    image: "/images/team-owen.webp",
  },
  {
    name: "Murilo Leite Filho",
    role: "Chief Technology Officer",
    type: "executive",
    initials: "ML",
    image: "/images/team-murilo.jpg",
  },
  {
    name: "Azam Mirza",
    role: "Board of Director",
    type: "board",
    initials: "AZ",
    image: "/images/team-azam.webp",
  },
  {
    name: "Claudia Mirza",
    role: "Board of Director",
    type: "board",
    initials: "CM",
    image: "/images/team-claudia.webp",
  },
  {
    name: "Micheal S Nixon",
    role: "Board of Director",
    type: "board",
    initials: "MN",
    image: "/images/team-michael.webp",
  },
  {
    name: "Shahab Bokhari",
    role: "Board of Director",
    type: "board",
    initials: "SB",
    image: "/images/team-shahab.webp",
  },
];

export const founders = team.filter((m) => m.type === "founder");
export const executives = team.filter((m) => m.type === "executive");
export const board = team.filter((m) => m.type === "board");
