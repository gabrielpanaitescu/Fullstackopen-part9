import { CoursePart } from "../App";

export const Part = ({ part }: { part: CoursePart }) => {
  let content;

  const exhaustiveCheck = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      content = (
        <div>
          <h3>{part.name}</h3>
          <p>exercises: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>{part.kind}</p>
        </div>
      );
      break;
    case "group":
      content = (
        <div>
          <h3>{part.name}</h3>
          <p>exercises: {part.exerciseCount}</p>
          <p>{part.groupProjectCount}</p>
          <p>{part.kind}</p>
        </div>
      );
      break;
    case "background":
      content = (
        <div>
          <h3>{part.name}</h3>
          <p>exercises: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>{part.backgroundMaterial}</p>
          <p>{part.kind}</p>
        </div>
      );
      break;
    case "special":
      content = (
        <div>
          <h3>{part.name}</h3>
          <p>exercises: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>requirements: {part.requirements.join(", ")}</p>
          <p>{part.kind}</p>
        </div>
      );
      break;
    default:
      exhaustiveCheck(part);
  }

  return content;
};
