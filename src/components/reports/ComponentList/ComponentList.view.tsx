import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Row, Col, Typography, Button, Input } from 'antd';
import type { Theme } from '#/configs/ThemeConfig';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faPieChart,
  faBarChart,
  faTable,
  faGridHorizontal,
  faRectangle,
  faChartLine,
  faMap,
} from '@fortawesome/pro-light-svg-icons';
import type { ReportItemTypes } from '#/views/reports/types';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    padding: 0,
  },
  item: {
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: 15,
  },
  image: {
    width: 150,
  },
  title: {
    fontSize: 15,
    marginBottom: 5,
  },
  filters: {
    padding: 10,
    borderBottom: `1px solid ${theme.borderColor}`,
  },
  search: {
    marginBottom: 10,
    width: '100%',
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
    key: string;
    name: string;
    description: React.ReactNode;
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
          placeholder={intl.formatMessage({
            defaultMessage: 'Search report components...',
          })}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CheckTags
          mode={'check'}
          value={typesFilter}
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
          <Row key={item.key} className={classes.item}>
            <Col flex={1}>
              <Typography.Text className={classes.title} strong>
                {item.name}
              </Typography.Text>
              <Typography.Paragraph type="secondary">
                {item.description}
              </Typography.Paragraph>
              <Row justify="end" gutter={16} align="middle">
                <Col flex={1}>
                  <Row gutter={8}>
                    {item.reportItemTypes.map((reportItem) => (
                      <Col key={`${reportItem} ${item.key}`}>
                        <FontAwesomeIcon size="lg" icon={getIcon(reportItem)} />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col>
                  <Button onClick={item.onAdd}>
                    <FontAwesomeIcon style={{ marginRight: 5 }} icon={faPlus} />
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
