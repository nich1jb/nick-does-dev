import { SectionHeader, SkillsList } from "./skills.styles";

const skillGroups = [
  {
    title: "Core Engineering",
    items: [
      "Systems design and architecture",
      "Scalable distributed systems",
      "Performance tuning and observability",
      "API design (REST, GraphQL)",
    ],
  },
  {
    title: "Frontend",
    items: [
      "React and TypeScript",
      "Accessible, responsive UI development",
      "State management and data-fetching patterns",
      "Design systems and component architecture",
    ],
  },
  {
    title: "Backend and Data",
    items: [
      "Node.js services and microservices",
      "SQL and NoSQL data modeling",
      "Caching and asynchronous processing",
      "Event-driven architectures",
    ],
  },
  {
    title: "Cloud and Delivery",
    items: [
      "AWS and cloud-native application design",
      "CI/CD pipeline implementation",
      "Containerization and orchestration",
      "Infrastructure as code",
    ],
  },
  {
    title: "Leadership",
    items: [
      "Technical strategy and roadmap planning",
      "Mentoring and coaching engineers",
      "Cross-functional collaboration",
      "Code review, standards, and quality culture",
    ],
  },
];

export const Skills = () =>
  skillGroups.map((group) => (
    <div key={group.title}>
      <SectionHeader>[{group.title.toLowerCase()}]</SectionHeader>
      <SkillsList>
        {group.items.map((item) => (
          <div key={item}>- {item}</div>
        ))}
      </SkillsList>
    </div>
  ));
