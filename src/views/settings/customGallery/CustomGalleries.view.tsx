import type { CustomGalleriesQuery } from '#/views/settings/customGallery/graphql/queries/__generated__/list_custom_galleries.generated';
import type { CustomGalleryData } from 'types/DataType';

import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import AddNewCustomGallery from 'components/form-components/customGalleries/AddNewCustomGallery';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  addCustomGallery: boolean;
  data: CustomGalleriesQuery | undefined;
  deleteConfirm: (value: string) => void;
  editCustomGallery: CustomGalleryData | undefined;
  loading: boolean;
  onAddCustomGallery: (value: CustomGalleryData) => void;
  onEditCustomGallery: (value: CustomGalleryData) => void;
  saving: boolean;
  search: string;
  setEditCustomGallery: (value: CustomGalleryData | undefined) => void;
  setSearch: (value: string) => void;
  toggleAddCustomGallery: () => void;
}

const CustomGalleries = ({
  addCustomGallery,
  data,
  deleteConfirm,
  editCustomGallery,
  loading,
  onAddCustomGallery,
  onEditCustomGallery,
  saving,
  search,
  setEditCustomGallery,
  setSearch,
  toggleAddCustomGallery,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search custom gallery...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleAddCustomGallery}
            type="primary"
          >
            <FormattedMessage defaultMessage="Add Custom Gallery" />
          </Button>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
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
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            width: 300,
          },
          {
            dataIndex: 'description',
            ellipsis: true,
            key: 'description',
            title: intl.formatMessage({
              defaultMessage: 'Description',
            }),
          },

          {
            dataIndex: 'Options',
            key: 'Options',
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit CustomGallery',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={() => {
                        setEditCustomGallery({
                          ...record.customGallery,
                          groups: record.customGallery.groups.map(
                            ({ id }) => id
                          ),
                        });
                      }}
                      size="small"
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
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      onClick={() => {
                        deleteConfirm(record.key);
                      }}
                      size="small"
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
            title: '',
            width: 100,
          },
        ]}
        dataSource={data?.customGalleriesRelay?.edges?.map(
          ({ node: customGallery }) => ({
            customGallery,
            description: customGallery.description,
            key: customGallery.id,
            name: customGallery.name,
          })
        )}
        loading={loading}
        pagination={{
          defaultPageSize: 20,
          hideOnSinglePage: true,
          pageSize: 20,
        }}
        size="small"
        style={{ marginRight: 10 }}
      />

      <Drawer
        onClose={toggleAddCustomGallery}
        open={addCustomGallery}
        title={intl.formatMessage({
          defaultMessage: 'Add Custom Gallery',
        })}
        width="400"
      >
        {addCustomGallery ? (
          <AddNewCustomGallery
            onClose={toggleAddCustomGallery}
            saving={saving}
            update={onAddCustomGallery}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditCustomGallery(undefined)}
        open={!!editCustomGallery}
        title={intl.formatMessage({
          defaultMessage: 'Edit Custom Gallery',
        })}
        width="400"
      >
        <AddNewCustomGallery
          data={editCustomGallery}
          onClose={() => setEditCustomGallery(undefined)}
          saving={saving}
          update={onEditCustomGallery}
        />
      </Drawer>
    </div>
  );
};

export default CustomGalleries;
