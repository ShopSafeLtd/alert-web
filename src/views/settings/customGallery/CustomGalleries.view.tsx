import React from 'react';
import {
  Button,
  Col,
  Drawer,
  Input,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import type { CustomGalleryData } from 'types/DataType';
import { FormattedMessage, useIntl } from 'react-intl';

import AddNewCustomGallery from 'components/form-components/customGalleries/AddNewCustomGallery';
import type { CustomGalleriesQuery } from '#/views/settings/customGallery/graphql/queries/list_custom_galleries.generated';

interface Props {
  data: CustomGalleriesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addCustomGallery: boolean;
  toggleAddCustomGallery: () => void;
  editCustomGallery: CustomGalleryData | undefined;
  setEditCustomGallery: (value: CustomGalleryData | undefined) => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
  onAddCustomGallery: (value: CustomGalleryData) => void;
  onEditCustomGallery: (value: CustomGalleryData) => void;
}

const CustomGalleries = ({
  data,
  loading,
  search,
  setSearch,
  addCustomGallery,
  toggleAddCustomGallery,
  editCustomGallery,
  saving,
  deleteConfirm,
  onAddCustomGallery,
  onEditCustomGallery,
  setEditCustomGallery,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search custom gallery...',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            type="primary"
            onClick={toggleAddCustomGallery}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            <FormattedMessage defaultMessage="Add Custom Gallery" />
          </Button>
        </Col>
      </Row>
      <Table
        size="small"
        style={{ marginRight: 10 }}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={[
          {
            key: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            dataIndex: 'name',
            width: 300,
            render: (value, record) => (
              <Typography.Link
                disabled={saving}
                onClick={() => {
                  setEditCustomGallery({
                    ...record.customGallery,
                    groups: record.customGallery.groups.map(({ id }) => id),
                  });
                }}
              >
                {value}
              </Typography.Link>
            ),
          },
          {
            key: 'description',
            title: intl.formatMessage({
              defaultMessage: 'Description',
            }),
            dataIndex: 'description',
            ellipsis: true,
          },

          {
            key: 'Options',
            title: '',
            dataIndex: 'Options',
            width: 100,
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit CustomGallery',
                    })}
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        setEditCustomGallery({
                          ...record.customGallery,
                          groups: record.customGallery.groups.map(
                            ({ id }) => id
                          ),
                        });
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove CustomGallery',
                    })}
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        deleteConfirm(record.key);
                      }}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
          },
        ]}
        dataSource={data?.customGalleriesRelay?.edges?.map(
          ({ node: customGallery }) => ({
            key: customGallery.id,
            name: customGallery.name,
            description: customGallery.description,
            customGallery,
          })
        )}
      />

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Custom Gallery',
        })}
        open={addCustomGallery}
        width="400"
        onClose={toggleAddCustomGallery}
      >
        {addCustomGallery ? (
          <AddNewCustomGallery
            update={onAddCustomGallery}
            onClose={toggleAddCustomGallery}
            saving={saving}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Custom Gallery',
        })}
        open={!!editCustomGallery}
        width="400"
        onClose={() => setEditCustomGallery(undefined)}
      >
        <AddNewCustomGallery
          data={editCustomGallery}
          onClose={() => setEditCustomGallery(undefined)}
          update={onEditCustomGallery}
          saving={saving}
        />
      </Drawer>
    </div>
  );
};

export default CustomGalleries;
