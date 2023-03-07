import React from 'react';
import IntlMessage from '../../util-components/AntD/IntlMessage';
import { Col, Row } from 'antd';
import useStyles from './PageHeader.styles';

interface Props {
  title?: string;
  display: boolean;
  breadcrumbs?: JSX.Element;
  noTranslate?: boolean;
  actions?: JSX.Element[];
  style?: React.CSSProperties | undefined;
  children?: JSX.Element | undefined;
}

export const PageHeader = ({
  title,
  display,
  breadcrumbs,
  noTranslate,
  actions,
  style,
  children,
}: Props) => {
  const classes = useStyles();
  return display ? (
    <Row align="middle" className={classes.pageHeader} style={style}>
      <Col>
        <div className="app-page-header">
          <h3 className="mb-0 mr-3 font-weight-semibold">
            {noTranslate ? title : <IntlMessage id={title ? title : ''} />}
          </h3>
          {!!breadcrumbs ? breadcrumbs : <div />}
        </div>
      </Col>
      <Col flex={1}>{children}</Col>

      <Col>
        <Row className={classes.pageActions}>{actions}</Row>
      </Col>
    </Row>
  ) : null;
};

export default PageHeader;
