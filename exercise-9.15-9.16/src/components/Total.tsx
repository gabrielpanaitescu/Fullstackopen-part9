interface TotalProps {
  total: number;
}

export const Total = (props: TotalProps) => {
  return <p>Total exercises: {props.total}</p>;
};
