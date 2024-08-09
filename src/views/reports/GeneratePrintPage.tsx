import type { ExtendedLayout } from '#/views/reports/types';

import { Col, Row } from 'antd';
import React from 'react';

interface Props {
  componentRef: React.RefObject<HTMLDivElement>;
  elements: (JSX.Element | undefined)[];
  layout: ExtendedLayout[];
  logo?: JSX.Element;
  title?: JSX.Element;
}

const GeneratePrintPage = ({
  componentRef,
  elements,
  layout,
  logo,
  title,
}: Props) => {
  const formattedComponents = [
    { element: logo, w: 2, x: 0, y: 0 },
    { element: title, w: 2, x: 0, y: 1 },
    ...layout
      .sort((a, b) => a.x - b.x)
      .sort((a, b) => a.y - b.y)
      .filter((item) => !item.i.includes('pageBreak'))
      .map((item) => ({
        element: elements.find((e) => item.i === e?.key),
        w: item.w,
        x: item.x,
        y: item.y + 2,
      })),
  ];

  const result: JSX.Element[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const component of formattedComponents) {
    const { element, w, y } = component;
    const count = formattedComponents.filter((c) => c.y === y).length;
    const defaultCol = w === 1 ? 12 : 24;
    const span = count > 1 ? Math.floor(24 / count) : defaultCol;
    const col = <Col span={span}>{element}</Col>;
    result.push(col);
  }

  return (
    <div className="print-page" ref={componentRef}>
      <div className="print-container">
        <div className="print-body">
          <Row gutter={[10, 10]}>{result}</Row>
        </div>
      </div>
    </div>
  );
};

export default GeneratePrintPage;
