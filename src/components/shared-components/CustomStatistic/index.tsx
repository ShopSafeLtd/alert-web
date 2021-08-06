import React from "react";

interface ValueProps {
  size: string;
  value: string | number;
}

const Value = (props: ValueProps) => {
  let value;
  switch (props.size) {
    case "lg":
      value = <h1 className="mb-0 font-weight-bold">{props.value}</h1>;
      break;
    case "md":
      value = <h2 className="mb-0 font-weight-bold">{props.value}</h2>;
      break;
    case "sm":
      value = <h3 className="mb-0 font-weight-bold">{props.value}</h3>;
      break;
    default:
      value = <h3 className="mb-0 font-weight-bold">{props.value}</h3>;
  }
  return value;
};

interface Props {
  size: string;
  value: string | number;
  title: string;
}

export const CustomStatistic = (props: Props) => {
  const { size = "md", value, title } = props;
  return (
    <div>
      <Value value={value} size={size} />
      <p className="mb-0 text-muted">{title}</p>
    </div>
  );
};

export default CustomStatistic;
