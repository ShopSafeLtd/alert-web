import React from 'react';

interface ValueProps {
  size: string;
  value: number | string;
}

const Value = (props: ValueProps) => {
  let value;
  switch (props.size) {
    case 'lg': {
      value = <h1 className="mb-0 font-weight-bold">{props.value}</h1>;
      break;
    }
    case 'md': {
      value = <h2 className="mb-0 font-weight-bold">{props.value}</h2>;
      break;
    }
    case 'sm': {
      value = <h3 className="mb-0 font-weight-bold">{props.value}</h3>;
      break;
    }
    default: {
      value = <h3 className="mb-0 font-weight-bold">{props.value}</h3>;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value;
};

interface Props {
  size: string;
  title: string;
  value: number | string;
}

export const CustomStatistic = (props: Props) => {
  const { size = 'md', title, value } = props;
  return (
    <div>
      <Value size={size} value={value} />
      <p className="mb-0 text-muted">{title}</p>
    </div>
  );
};

export default CustomStatistic;
