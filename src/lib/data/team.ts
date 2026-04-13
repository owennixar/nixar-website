export interface TeamMember {
  name: string;
  role: string;
  type: "founder" | "board" | "consultant";
  initials: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: "Anwar Mirza",
    role: "Co-Founder",
    type: "founder",
    initials: "AM",
    image: "/images/team-anwar.jpg",
  },
  {
    name: "Owen Nixon",
    role: "Co-Founder",
    type: "founder",
    initials: "ON",
    image: "/images/team-owen.jpg",
  },
  {
    name: "Azam Mirza",
    role: "Board of Director",
    type: "board",
    initials: "AZ",
    image: "/images/team-azam.jpg",
  },
  {
    name: "Claudia Mirza",
    role: "Board of Director",
    type: "board",
    initials: "CM",
    image: "/images/team-claudia.jpg",
  },
  {
    name: "Micheal S Nixon",
    role: "Board of Director",
    type: "board",
    initials: "MN",
    image: "/images/team-michael.jpg",
  },
  {
    name: "Mir Ali",
    role: "Board of Director",
    type: "board",
    initials: "MA",
    image: "/images/team-mir.jpg",
  },
  {
    name: "Shahab Bokhari",
    role: "Consultant",
    type: "consultant",
    initials: "SB",
    image: "/images/team-shahab.jpg",
  },
];

export const founders = team.filter((m) => m.type === "founder");
export const board = team.filter((m) => m.type === "board");
export const consultants = team.filter((m) => m.type === "consultant");
