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
    role: "Co-Founder, Akorbi\nCEO, Tire Geeks\nCEO, Azaaki",
    type: "board",
    initials: "AZ",
    image: "/images/team-azam.webp",
  },
  {
    name: "Claudia Mirza",
    role: "Co-Founder, Akorbi\nFounder, Fluenta\nCEO, Run My Process",
    type: "board",
    initials: "CM",
    image: "/images/team-claudia.webp",
  },
  {
    name: "Michael S. Nixon",
    role: "Founding Partner, Nixon Jach Hubbard\nSuper Lawyers, 2012-2024\nAV Preeminent Rated",
    type: "board",
    initials: "MN",
    image: "/images/team-michael.webp",
  },
  {
    name: "Shahab Bokhari",
    role: "Founder, XLNC Digital",
    type: "board",
    initials: "SB",
    image: "/images/team-shahab.webp",
  },
];

export const founders = team.filter((m) => m.type === "founder");
export const executives = team.filter((m) => m.type === "executive");
export const board = team.filter((m) => m.type === "board");
