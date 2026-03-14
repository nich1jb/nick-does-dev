import meImage from "../../assets/me.png";
import { TerminalImage } from "./aboutMe.styles";
import { ToWords } from "to-words";

export const AboutMe = () => {
  const calculateAge = () => {
    var birthDate = new Date("1994-03-18");
    var ageDifMs = Date.now() - birthDate.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const age = calculateAge();
  const toWords = new ToWords();
  const yearsInIndustry = toWords
    .convert(new Date().getFullYear() - 2016)
    .toLowerCase();

  return (
    <div>
      <TerminalImage src={meImage} alt="Nick's avatar" />
      <p>
        Hi, I'm Nick (he/him), a {age}-year-old Senior Software Engineer with
        over {yearsInIndustry} years of experience in the industry.
      </p>
      <p>
        Throughout my career, I've architected and delivered complex, scalable
        systems from concept to production. I specialize in full-stack
        development with experience in modern web technologies, cloud
        infrastructure, and agile methodologies.
      </p>
      <p>
        As a senior engineer, I focus on mentoring junior developers and driving
        technical decisions. I'm passionate about engaging with high-performing
        teams and fostering a culture of continuous learning and innovation.
      </p>
    </div>
  );
};
