import type { ColumnsType } from 'antd/es/table';

import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Drawer,
  PageHeader,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CreateBusinessQuestionForm from './components/CreateBusinessQuestionForm';
import useBusinessOptions from './useBusinessOptions';

interface BusinessQuestion {
  createdAt: string;
  deleted: boolean;
  id: string;
  priority: number;
  question: {
    id: string;
    options?: string[];
    question: string;
    type: string;
  };
  questionId: string;
  req: boolean;
  tooltip?: string;
  updatedAt: string;
}

const BusinessOptions = () => {
  const intl = useIntl();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { data, loading, refetch } = useBusinessOptions();

  const columns: ColumnsType<BusinessQuestion> = [
    {
      dataIndex: ['question', 'question'],
      key: 'question',
      title: intl.formatMessage({ defaultMessage: 'Question' }),
      width: '30%',
    },
    {
      dataIndex: ['question', 'type'],
      key: 'type',
      render: (type: string) => {
        const typeMap: Record<string, string> = {
          BOOLEAN: intl.formatMessage({ defaultMessage: 'Yes/No' }),
          DATE: intl.formatMessage({ defaultMessage: 'Date' }),
          MULTISELECT: intl.formatMessage({ defaultMessage: 'Multi-Select' }),
          NUMBER: intl.formatMessage({ defaultMessage: 'Number' }),
          SELECT: intl.formatMessage({ defaultMessage: 'Select' }),
          TEXT: intl.formatMessage({ defaultMessage: 'Text' }),
        };
        return typeMap[type] || type;
      },
      title: intl.formatMessage({ defaultMessage: 'Answer Type' }),
      width: '15%',
    },
    {
      dataIndex: 'req',
      key: 'req',
      render: (required: boolean) => (
        <Tag color={required ? 'red' : 'default'}>
          {required ? (
            <FormattedMessage defaultMessage="Required" />
          ) : (
            <FormattedMessage defaultMessage="Optional" />
          )}
        </Tag>
      ),
      title: intl.formatMessage({ defaultMessage: 'Required' }),
      width: '10%',
    },
    {
      dataIndex: 'deleted',
      key: 'deleted',
      render: (deleted: boolean) => (
        <Tag color={deleted ? 'default' : 'green'}>
          {deleted ? (
            <FormattedMessage defaultMessage="Inactive" />
          ) : (
            <FormattedMessage defaultMessage="Active" />
          )}
        </Tag>
      ),
      title: intl.formatMessage({ defaultMessage: 'Status' }),
      width: '10%',
    },
    {
      dataIndex: ['question', 'options'],
      key: 'options',
      render: (options?: string[]) => {
        if (!options || options.length === 0) return '-';
        return (
          <Space size={[0, 8]} wrap>
            {options.slice(0, 3).map((option, index) => (
              <Tag key={index}>{option}</Tag>
            ))}
            {options.length > 3 && (
              <Tag>
                <FormattedMessage
                  defaultMessage="+{count} more"
                  values={{ count: options.length - 3 }}
                />
              </Tag>
            )}
          </Space>
        );
      },
      title: intl.formatMessage({ defaultMessage: 'Options' }),
      width: '20%',
    },
    {
      key: 'actions',
      render: (_) => (
        <Space>
          <Button size="small" type="link">
            <FormattedMessage defaultMessage="Edit" />
          </Button>
          <Button danger size="small" type="link">
            <FormattedMessage defaultMessage="Delete" />
          </Button>
        </Space>
      ),
      title: intl.formatMessage({ defaultMessage: 'Actions' }),
      width: '15%',
    },
  ];

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleOpenDrawer = () => {
    setDrawerVisible(true);
  };

  const handleQuestionCreated = () => {
    setDrawerVisible(false);
    void refetch();
  };

  interface BusinessQuestionEdge {
    node: BusinessQuestion;
  }

  interface BusinessQuestionRelay {
    edges?: BusinessQuestionEdge[];
  }

  interface BusinessOptionsData {
    businessQuestionRelay?: BusinessQuestionRelay;
  }

  const typedData = data as BusinessOptionsData | undefined;
  const businessQuestions =
    typedData?.businessQuestionRelay?.edges?.map((edge) => edge.node) || [];

  return (
    <div className="page-view">
      <PageHeader
        extra={[
          <Button
            icon={<PlusOutlined />}
            key="create"
            onClick={handleOpenDrawer}
            type="primary"
          >
            <FormattedMessage defaultMessage="Add Question" />
          </Button>,
        ]}
        subTitle={intl.formatMessage({
          defaultMessage:
            'Manage custom questions for business data collection',
        })}
        title={intl.formatMessage({ defaultMessage: 'Business Options' })}
      />

      <Card>
        <Typography.Title level={5}>
          <FormattedMessage defaultMessage="Business Questions" />
        </Typography.Title>
        <Typography.Text type="secondary">
          <FormattedMessage defaultMessage="Configure custom questions that will appear when creating or editing business information." />
        </Typography.Text>

        <Table
          columns={columns}
          dataSource={businessQuestions}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) =>
              intl.formatMessage(
                { defaultMessage: 'Total {total} questions' },
                { total }
              ),
          }}
          rowKey="id"
          style={{ marginTop: 20 }}
        />
      </Card>

      <Drawer
        destroyOnClose
        onClose={handleCloseDrawer}
        open={drawerVisible}
        title={intl.formatMessage({
          defaultMessage: 'Create Business Question',
        })}
        width={600}
      >
        <CreateBusinessQuestionForm
          onCancel={handleCloseDrawer}
          onSuccess={handleQuestionCreated}
        />
      </Drawer>
    </div>
  );
};

export default BusinessOptions;
