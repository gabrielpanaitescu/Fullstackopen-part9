import { CoursePart } from "../App";
import { Part } from "./Part";

export const Content = ({ parts }: { parts: CoursePart[] }) => {
  return parts.map((part, key) => {
    return <Part key={key} part={part} />;
  });
};
