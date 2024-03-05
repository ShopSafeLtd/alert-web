import type { ExtendedLayout } from '#/views/reports/types';
import { Col, Row } from 'antd';
import React from 'react';

interface Props {
  elements: (JSX.Element | undefined)[];
  layout: ExtendedLayout[];
  logo: JSX.Element;
  title: JSX.Element;
  componentRef: React.RefObject<HTMLDivElement>;
}

const GeneratePrintPage = ({
  elements,
  layout,
  title,
  logo,
  componentRef,
}: Props) => {
  const formattedComponents = [
    { element: logo, x: 0, y: 0, w: 2 },
    { element: title, x: 0, y: 1, w: 2 },
    ...layout
      .sort((a, b) => a.y - b.y)
      .filter((item) => !item.i.includes('pageBreak'))
      .map((item) => ({
        element: elements.find((e) => item.i === e?.key),
        x: item.x,
        y: item.y + 2,
        w: item.w,
      })),
  ];

  const result: JSX.Element[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const component of formattedComponents) {
    const { y, element, w } = component;
    const count = formattedComponents.filter((c) => c.y === y).length;
    const defaultCol = w === 1 ? 12 : 24;
    const span = count > 1 ? Math.floor(24 / count) : defaultCol;
    const col = <Col span={span}>{element}</Col>;
    result.push(col);
  }

  return (
    <div ref={componentRef} className="print-page">
      <div className="print-container">
        <div className="print-body">
          <Row gutter={[10, 10]}>{result}</Row>
        </div>
      </div>
    </div>
  );
};

export default GeneratePrintPage;
