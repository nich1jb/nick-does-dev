import { ContactLink, ContactList, SectionHeader } from "./contact.styles";

const links = [
  {
    label: "email",
    value: "nich2jb@gmail.com",
    href: "mailto:nich2jb@gmail.com",
  },
  {
    label: "linkedin",
    value: "https://www.linkedin.com/in/nick-burnard/",
    href: "https://www.linkedin.com/in/nick-burnard/",
  },
  {
    label: "github",
    value: "https://github.com/nich1jb",
    href: "https://github.com/nich1jb",
  },
];

export const Contact = () => (
  <div>
    <SectionHeader>[contact]</SectionHeader>
    <ContactList>
      {links.map((link) => (
        <div key={link.label}>
          - {link.label}:{" "}
          <ContactLink href={link.href} target="_blank" rel="noreferrer">
            {link.value}
          </ContactLink>
        </div>
      ))}
    </ContactList>
  </div>
);
