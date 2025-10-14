import type { Theme } from '#/configs/ThemeConfig';
import type { ReportItemTypes } from '#/views/reports/types';

import {
  faBarChart,
  faChartLine,
  faGridHorizontal,
  faMap,
  faPieChart,
  faPlus,
  faRectangle,
  faTable,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Input, Row, Typography } from 'antd';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    padding: 0,
  },
  filters: {
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: 10,
  },
  image: {
    width: 150,
  },
  item: {
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: 15,
  },
  search: {
    marginBottom: 10,
    width: '100%',
  },
  title: {
    fontSize: 15,
    marginBottom: 5,
  },
}));

const getIcon = (reportItemType: ReportItemTypes) => {
  if (reportItemType === 'bar') return faBarChart;
  if (reportItemType === 'summary') return faRectangle;
  if (reportItemType === 'table') return faTable;
  if (reportItemType === 'heatmap') return faGridHorizontal;
  if (reportItemType === 'graph') return faChartLine;
  if (reportItemType === 'map') return faMap;
  return faPieChart;
};

interface Props {
  components: {
    description: React.ReactNode;
    key: string;
    name: string;
    onAdd: () => void;
    reportItemTypes: ReportItemTypes[];
  }[];
}

const ComponentList = ({ components }: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const [typesFilter, setTypesFilter] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <Input
          className={classes.search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search report components...',
          })}
          value={search}
        />
        <CheckTags
          mode={'check'}
          onChange={setTypesFilter}
          options={[
            {
              label: intl.formatMessage({
                defaultMessage: 'Pie',
              }),
              value: 'donut',
            },
            {
              label: intl.formatMessage({
                defaultMessage: 'Bar',
              }),
              value: 'bar',
            },
            {
              label: intl.formatMessage({
                defaultMessage: 'Summary',
              }),
              value: 'summary',
            },
            {
              label: intl.formatMessage({
                defaultMessage: 'Table',
              }),
              value: 'table',
            },
            {
              label: intl.formatMessage({
                defaultMessage: 'Map',
              }),
              value: 'map',
            },
            {
              label: intl.formatMessage({
                defaultMessage: 'Heatmap',
              }),
              value: 'heatmap',
            },
          ]}
          value={typesFilter}
        />
      </div>
      {components
        .filter((item) => {
          if (typesFilter.length > 0 || search !== '')
            return (
              (typesFilter.length > 0 &&
                typesFilter
                  .map((type) =>
                    item.reportItemTypes.includes(type as ReportItemTypes)
                  )
                  .includes(true)) ||
              (search !== '' &&
                item.name.toLowerCase().includes(search.toLowerCase()))
            );
          return true;
        })
        .map((item) => (
          <Row className={classes.item} key={item.key}>
            <Col flex={1}>
              <Typography.Text className={classes.title} strong>
                {item.name}
              </Typography.Text>
              <Typography.Paragraph type="secondary">
                {item.description}
              </Typography.Paragraph>
              <Row align="middle" gutter={16} justify="end">
                <Col flex={1}>
                  <Row gutter={8}>
                    {item.reportItemTypes.map((reportItem) => (
                      <Col key={`${reportItem} ${item.key}`}>
                        <FontAwesomeIcon icon={getIcon(reportItem)} size="lg" />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col>
                  <Button onClick={item.onAdd}>
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                    <FormattedMessage defaultMessage="Add" />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
    </div>
  );
};

export default ComponentList;
