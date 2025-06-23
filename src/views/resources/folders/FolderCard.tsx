import { faFile, faFolderTree } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

interface Props {
  data: {
    description?: null | string;
    id: string;
    name: string;
    totalChildFolders: number;
    totalDocuments: number;
  };
}
const FolderCard = ({ data }: Props) => {
  const intl = useIntl();

  return (
    <div style={{ backgroundColor: 'white', borderRadius: 10, paddingTop: 5 }}>
      <div style={{ height: 140, margin: 10 }}>
        <Title level={4}>{data?.name}</Title>
        <Paragraph ellipsis={{ rows: 3 }}>{data?.description}</Paragraph>
        <Row gutter={16}>
          <Col>
            <FontAwesomeIcon icon={faFolderTree} style={{ marginRight: 8 }} />
            {intl.formatMessage(
              {
                defaultMessage: 'Child Folder:  {value}',
              },
              { value: data?.totalChildFolders || 0 }
            )}
          </Col>
          <Col>
            <FontAwesomeIcon icon={faFile} style={{ marginRight: 8 }} />
            {intl.formatMessage(
              {
                defaultMessage: 'Documents:  {value}',
              },
              { value: data?.totalDocuments || 0 }
            )}
          </Col>
        </Row>

        {/* <Descriptions column={2}>
          <Descriptions.Item
            label={
              <span>
                <FontAwesomeIcon
                  icon={faFolderTree}
                  style={{ marginRight: 8 }}
                />
                {intl.formatMessage({
                  defaultMessage: 'Child Folder',
                })}
              </span>
            }
            style={{ marginBottom: -10 }}
          >
            {data?.childFolders.length}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span>
                <FontAwesomeIcon icon={faFile} style={{ marginRight: 8 }} />
                {intl.formatMessage({
                  defaultMessage: 'Documents',
                })}
              </span>
            }
          >
            {data?.documents.length}
          </Descriptions.Item>
        </Descriptions> */}
      </div>

      <Row
        justify="center"
        style={{ alignContent: 'flex-end', flexGrow: 1, paddingBottom: 5 }}
      >
        <Col>
          <Link to={`/app/resources/folders/view/${data?.id}`}>
            <Button size="small" type="default">
              {intl.formatMessage({
                defaultMessage: 'View Folder',
              })}
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default FolderCard;
