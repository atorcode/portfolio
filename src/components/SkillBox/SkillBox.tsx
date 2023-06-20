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
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";

import { ReactComponent as TypescriptLogo } from "../../assets/typescript-logo.svg";

// hooks
import { useEffect, useRef } from "react";
import { useScrollContext } from "../../contexts/ScrollContext";
import { useThemeContext } from "../../contexts/ThemeContext";

// types
import { SkillsType } from "../../types/SkillsType";

type SkillBoxProps = {
  skill: SkillsType;
  groupIsVisible: boolean;
};

const SkillBox = ({ skill, groupIsVisible }: SkillBoxProps): JSX.Element => {
  const skillBoxRef = useRef<HTMLDivElement | null>(null);
  const { isScrolling } = useScrollContext();
  const { theme } = useThemeContext();

  useEffect(() => {
    if (!groupIsVisible)
      skillBoxRef.current?.classList.add(styles["skill-box-before"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect((): void => {
    if (!isScrolling && groupIsVisible) {
      skillBoxRef.current?.classList.add(styles["skill-box-after"]);
    }
  }, [isScrolling, groupIsVisible]);

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
      icon = (
        <TypescriptLogo
          className={`${"typescript-logo-svg"} ${`typescript-logo-svg-${theme}`}`}
        />
      );
      break;
    case "React":
      icon = <SiReact />;
      break;
    case "SASS":
      icon = <SiSass />;
      break;
    case "Next.js":
      icon = <SiNextdotjs />;
      break;
    case "Tailwind CSS":
      icon = <SiTailwindcss />;
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
    <div
      className={`${styles["skill-box"]} ${styles[`skill-box-${theme}`]}`}
      ref={skillBoxRef}
    >
      {icon && <div className={styles["icon"]}>{icon}</div>}
      {skill}
    </div>
  );
};

export default SkillBox;
