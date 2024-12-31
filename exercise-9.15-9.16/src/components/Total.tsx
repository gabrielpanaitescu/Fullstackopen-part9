interface TotalProps {
  total: number;
}

export const Total = (props: TotalProps) => {
  return <h4>Total exercises: {props.total}</h4>;
};
