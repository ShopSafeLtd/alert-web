import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import { Col, DatePicker, Form, InputNumber, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

export enum FilterType {
  BUSINESS_SELECT = 'businessSelect',
  DATE_PERIOD = 'datePeriod',
  DATE_RANGE = 'dateRange',
  GROUP_SELECT = 'groupSelect',
  USER_SELECT = 'userSelect',
}

export interface FilterConfig {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type: FilterType;
}

interface FiltersControllerProps {
  filters: Record<string, FilterConfig>;
}

const { RangePicker } = DatePicker;

const FiltersController: React.FC<FiltersControllerProps> = ({ filters }) => {
  const intl = useIntl();

  const renderFilter = (key: string, config: FilterConfig) => {
    const commonProps = {
      label: config.label,
      name: config.name,
      rules: config.required
        ? [{ message: `Please select ${config.label}`, required: true }]
        : undefined,
    };

    switch (config.type) {
      case FilterType.DATE_RANGE: {
        return (
          <Form.Item {...commonProps}>
            <RangePicker
              placeholder={[
                intl.formatMessage({ defaultMessage: 'Start Date' }),
                intl.formatMessage({ defaultMessage: 'End Date' }),
              ]}
              style={{ width: '100%' }}
            />
          </Form.Item>
        );
      }

      case FilterType.DATE_PERIOD: {
        return (
          <Form.Item {...commonProps}>
            <InputNumber
              addonAfter={intl.formatMessage({ defaultMessage: 'days' })}
              max={365}
              min={1}
              placeholder={
                config.placeholder ||
                intl.formatMessage({ defaultMessage: 'Last X days' })
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
        );
      }

      case FilterType.BUSINESS_SELECT: {
        return (
          <Form.Item {...commonProps}>
            <BusinessesSelect
              allowClear
              mode="multiple"
              placeholder={
                config.placeholder ||
                intl.formatMessage({ defaultMessage: 'Select businesses' })
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
        );
      }

      case FilterType.GROUP_SELECT: {
        return (
          <Form.Item {...commonProps}>
            <GroupsSelect
              allowClear
              mode="multiple"
              placeholder={
                config.placeholder ||
                intl.formatMessage({ defaultMessage: 'Select groups' })
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
        );
      }

      case FilterType.USER_SELECT: {
        return (
          <Form.Item {...commonProps}>
            <UsersSelect
              allowClear
              mode="multiple"
              placeholder={
                config.placeholder ||
                intl.formatMessage({ defaultMessage: 'Select users' })
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
        );
      }

      default: {
        return null;
      }
    }
  };

  const filterEntries = Object.entries(filters);

  if (filterEntries.length === 0) {
    return null;
  }

  // Arrange filters in a 2-column layout
  return (
    <Row gutter={16}>
      {filterEntries.map(([key, config]) => (
        <Col key={key} span={12}>
          {renderFilter(key, config)}
        </Col>
      ))}
    </Row>
  );
};

export default FiltersController;
