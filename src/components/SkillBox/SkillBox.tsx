// styles
import styles from "./SkillBox.module.scss";

// icons
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiSass,
  SiGit,
} from "react-icons/si";

// utils
import { SKILLS } from "../../utils/constants";

type SkillBoxProps = {
  skill: typeof SKILLS[number];
};

const SkillBox = ({ skill }: SkillBoxProps): JSX.Element => {
  let icon;
  switch (skill) {
    case "HTML":
      icon = <SiHtml5 />;
      break;
    case "CSS":
      icon = <SiCss3 />;
      break;
    case "JavaScript":
      icon = <SiJavascript />;
      break;
    case "TypeScript":
      icon = <SiTypescript />;
      break;
    case "React":
      icon = <SiReact />;
      break;
    case "SASS":
      icon = <SiSass />;
      break;
    case "Git":
      icon = <SiGit />;
      break;
    default:
      const _exhaustiveCheck: never = skill;
      return _exhaustiveCheck;
  }

  return (
    <section className={styles["skill-box"]}>
      <div className={styles["icon"]}>{icon}</div>
      {skill}
    </section>
  );
};

export default SkillBox;
