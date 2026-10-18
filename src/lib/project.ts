export const project = {
  repository: "https://github.com/enestsc/BioAuth",
  report: "/reports/bioauth-low-level-design-v1.pdf",
  term: "Fall 2026–2027",
  updated: "18 October 2026",
};

export const team = [
  { name: "Esra Eda Kılıç", initials: "EK" },
  { name: "Enes Taşçı", initials: "ET" },
  { name: "Ömer Taylan Alemdar", initials: "ÖA" },
  { name: "Batuhan Mert Korkmaz", initials: "BK" },
];

export const milestones = [
  { date: "16 Oct 2026", iso: "2026-10-16", label: "Low-Level Design · v1", detail: "Initial design and first backlog snapshot", available: true },
  { date: "23 Oct 2026", iso: "2026-10-23", label: "Low-Level Design · v2", detail: "Supervisor feedback and updated backlog", available: false },
  { date: "20 Nov 2026", iso: "2026-11-20", label: "Test Plan", detail: "Testing protocol and updated backlog", available: false },
  { date: "31 Dec 2026", iso: "2026-12-31", label: "Final Report", detail: "Implementation, evaluation and final backlog", available: false },
  { date: "04–17 Jan 2027", iso: "2027-01-04", label: "Presentation & Demo", detail: "Poster, presentation and demonstration · exact date TBA", available: false },
];

export const documents = [
  { title: "Low-Level Design Report", version: "Version 1.0", date: "16 October 2026", description: "Architecture, evidence contracts, fusion policies and the implementation plan.", href: project.report, status: "Available", course: "CMPE 492", type: "PDF" },
  { title: "Low-Level Design Report", version: "Version 2", date: "Due 23 October 2026", description: "Design revision following supervisor feedback.", href: null, status: "Upcoming", course: "CMPE 492", type: "PDF" },
  { title: "Test Plan Report", version: "Testing", date: "Due 20 November 2026", description: "Test cases, evaluation protocol, responsibilities and testing environment.", href: null, status: "Upcoming", course: "CMPE 492", type: "PDF" },
  { title: "Final Report", version: "Final delivery", date: "Due 31 December 2026", description: "Final system design, implementation and measured evaluation results.", href: null, status: "Upcoming", course: "CMPE 492", type: "PDF" },
  { title: "CMPE 491 Report Archive", version: "Previous course", date: "Awaiting publication", description: "Project proposal, specifications, analysis and high-level design reports.", href: null, status: "Not published", course: "CMPE 491", type: "Archive" },
];
