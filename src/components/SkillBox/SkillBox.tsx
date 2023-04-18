// styles
import styles from "./SkillBox.module.scss";
import "./typescriptLogo.scss";

// icons
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiSass,
  SiGit,
} from "react-icons/si";

import { ReactComponent as TypescriptLogo } from "../../assets/typescript-logo.svg";

// types
import { SkillsType } from "../../types/SkillsType";

type SkillBoxProps = {
  skill: SkillsType;
};

const SkillBox = ({ skill }: SkillBoxProps): JSX.Element => {
  let icon: JSX.Element | undefined;
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
      icon = <TypescriptLogo className="typescript-logo-svg" />;
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
    case "Responsive Web Design":
    case "Accessibility":
    case "UI/UX Design":
    case "Algorithms":
    case "Single Page Applications":
    case "Game Development":
      icon = undefined;
      break;
    default:
      const _exhaustiveCheck: never = skill;
      return _exhaustiveCheck;
  }

  return (
    <div className={styles["skill-box"]}>
      {icon && <div className={styles["icon"]}>{icon}</div>}
      {skill}
    </div>
  );
};

export default SkillBox;
