import { ExperienceList, SectionHeader } from "./experience.styles";

const companies = [
  {
    company: "REA Group",
    roles: [{ title: "Senior Developer", period: "Oct 2022 - Present" }],
  },
  {
    company: "annalise.ai (Harrison.ai)",
    roles: [
      { title: "Senior Software Engineer", period: "Jan 2022 - Oct 2022" },
      { title: "Software Engineer", period: "Jan 2021 - Jan 2022" },
    ],
  },
  {
    company: "Digio",
    roles: [
      { title: "Senior Software Engineer", period: "Aug 2020 - Dec 2020" },
      { title: "Software Engineer", period: "May 2018 - Aug 2020" },
    ],
  },
  {
    company: "Reece Group (via Digio)",
    roles: [
      {
        title: "Software Engineer (Consultant)",
        period: "Sep 2019 - Dec 2020",
      },
    ],
  },
  {
    company: "ANZ",
    roles: [
      {
        title: "Front End Engineer (via Digio)",
        period: "May 2018 - Sep 2019",
      },
      {
        title: "Front End Engineer (via Odecee)",
        period: "Sep 2017 - May 2018",
      },
      {
        title: "Test Automation Engineer (via Odecee)",
        period: "Jun 2016 - Sep 2017",
      },
    ],
  },
  {
    company: "Odecee, A Cognizant Company",
    roles: [
      { title: "Associate Software Engineer", period: "Feb 2016 - May 2018" },
    ],
  },
  {
    company: "CoreLogic (via Odecee)",
    roles: [
      {
        title: "iOS Test Automation Engineer",
        period: "Feb 2016 - Jun 2016",
      },
    ],
  },
  {
    company: "National Australia Bank",
    roles: [
      {
        title: "IBL - Infrastructure Platforms",
        period: "Jul 2015 - Dec 2015",
      },
    ],
  },
];

export const Experience = () =>
  companies.map((entry) => (
    <div key={entry.company}>
      <SectionHeader>[{entry.company.toLowerCase()}]</SectionHeader>
      <ExperienceList>
        {entry.roles.map((role) => (
          <div key={role.title}>
            - {role.title} · {role.period}
          </div>
        ))}
      </ExperienceList>
    </div>
  ));
