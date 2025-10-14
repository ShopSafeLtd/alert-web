import React from 'react';

interface CursorProps {
  color: string;
  cursor: {
    x: number;
    y: number;
  };
  name: string;
}

const Cursor = React.memo(({ color, cursor, name }: CursorProps) => {
  const { x, y } = cursor;
  return (
    <div
      style={{
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
        transition: 'transform 0.5s cubic-bezier(.17,.93,.38,1)',
        userSelect: 'none',
      }}
    >
      <svg
        className="cursor"
        fill="none"
        height="36"
        stroke="white"
        viewBox="0 0 24 36"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>

      <div
        style={{
          backgroundColor: color,
          borderRadius: 4,
          left: 10,
          padding: '5px 10px',
          position: 'absolute',
          top: 20,
        }}
      >
        <p
          style={{
            color: 'white',
            fontSize: 13,
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
});
export default Cursor;
