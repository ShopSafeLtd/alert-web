/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Age, Gender, Race, Build } from 'graphql/generated';

import { Row, Col, Button, Form, Typography, Checkbox, Skeleton } from 'antd';

const { Text } = Typography;

interface FormData {
  selectedOffenderIds: string[];
}

interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
  }[];
  imageUid?: string[] | undefined;
}
interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  data: OffenderData[] | undefined;
}

const ViewOffender = ({
  onClose,
  onSubmit,
  saving,
  data,
}: Props): JSX.Element => (
  <>
    <Form layout="vertical" onFinish={onSubmit}>
      <div className="offenders-side-list">
        <Form.Item
          name="selectedOffenderIds"
          label="Offenders:"
          rules={[
            {
              required: true,
              message:
                'Please at least select an existing offender for the incident.',
            },
          ]}
        >
          <Checkbox.Group>
            {data?.map((offender) => (
              <div key={offender.id} className="offender-item">
                <Row wrap={false} key={offender.id}>
                  <Checkbox
                    value={offender.id}
                    style={{ lineHeight: '32px', borderColor: 'black' }}
                  >
                    <Col>
                      {offender.images && offender.images.length > 0 ? (
                        <div
                          className="offender-item-image"
                          style={{
                            backgroundImage: `url(${offender.images[0].optimised})`,
                          }}
                        />
                      ) : (
                        <Skeleton.Image className="offender-item-image-skeleton" />
                      )}
                    </Col>
                    <Col className="offender-item-content" flex={1}>
                      <Text ellipsis>{offender.name}</Text>
                    </Col>
                  </Checkbox>
                </Row>
              </div>
            ))}
          </Checkbox.Group>
        </Form.Item>
      </div>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              Save Offenders
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  </>
);

export default ViewOffender;
