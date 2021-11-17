import React from 'react';
import IntlMessage from '../../util-components/AntD/IntlMessage';
import { Row, Col } from 'antd';

interface Props {
  title?: string;
  display: boolean;
  breadcrumbs?: JSX.Element;
  noTranslate?: boolean;
  actions?: JSX.Element[];
}

export const PageHeader = ({
  title,
  display,
  breadcrumbs,
  noTranslate,
  actions,
}: Props) => {
  return display ? (
    <Row>
      <Col flex={1}>
        <div className="app-page-header">
          <h3 className="mb-0 mr-3 font-weight-semibold">
            {noTranslate ? title : <IntlMessage id={title ? title : ''} />}
          </h3>
          {!!breadcrumbs ? breadcrumbs : <div />}
        </div>
      </Col>
      <Col>
        <Row gutter={8}>{actions}</Row>
      </Col>
    </Row>
  ) : null;
};

export default PageHeader;
