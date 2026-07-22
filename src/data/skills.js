/**
 * Habilidades técnicas reales de Juan Manuel Franco.
 * Ajusta o reordena libremente; los íconos vienen de react-icons
 * (fa6 / si / vsc).
 */
import {
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaFileExcel,
  FaChartColumn,
  FaDatabase,
} from "react-icons/fa6";
import {
  SiJavascript,
  SiPython,
  SiPhp,
  SiReact,
  SiTailwindcss,
  SiVite,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiFirebase,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const skillCategories = [
  {
    id: "lenguajes",
    title: "Languages",
    skills: [
      { name: "Javascript", icon: SiJavascript },
      { name: "Python", icon: SiPython },
      { name: "PHP", icon: SiPhp },
      { name: "SQL", icon: FaDatabase },
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks and Technologies",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    id: "bases-de-datos",
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "SQLite", icon: SiSqlite },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    id: "herramientas",
    title: "Tools",
    skills: [
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "VS Code", icon: VscVscode },
      { name: "Figma", icon: FaFigma },
      { name: "Power BI", icon: FaChartColumn },
      { name: "Excel", icon: FaFileExcel },
    ],
  },
];
