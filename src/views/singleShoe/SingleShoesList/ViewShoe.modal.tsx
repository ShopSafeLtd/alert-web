import type { SingleShoeFragment } from 'graphql/fragments/__generated__/singleShoe.generated';

import { ShoeStatus } from '#/graphql/types';
import { getShoeSide, getShoeStatus, getShoeType } from '#/types/enums/shoe';
import {
  faBoot,
  faBootHeeled,
  faBox,
  faCircleSterling,
  faLocationDot,
  faNotes,
  faPalette,
  faShoePrints,
  faSocks,
  faSquarePollVertical,
  faTag,
  faTruckFast,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Descriptions, Modal, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './ViewShoe.styles';

interface Props {
  data: SingleShoeFragment;
  onClose: () => void;
  open: boolean;
}
const getTextStatus = (value: ShoeStatus) => {
  if (value === ShoeStatus.Shipped) return 'success';
  if (value === ShoeStatus.AwaitingMatch) return 'danger';
  if (value === ShoeStatus.AwaitingShipping) return 'warning';
  return 'success';
};
const ViewShoe = ({ data, onClose, open }: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Modal
      bodyStyle={{ padding: 20 }}
      onCancel={() => {
        onClose();
      }}
      onOk={() => {
        onClose();
      }}
      open={open}
      title={intl.formatMessage(
        {
          defaultMessage: 'Shoe: {ref}',
        },
        { ref: data.stockItem.sku }
      )}
      width={600}
    >
      {open && (
        <Descriptions column={2} size="small">
          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon className={classes.descIcon} icon={faBoot} />
                {intl.formatMessage({
                  defaultMessage: 'UPC',
                })}
              </span>
            }
          >
            {data.stockItem.sku || ''}
          </Descriptions.Item>
          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon
                  className={classes.descIcon}
                  icon={faSquarePollVertical}
                />
                {intl.formatMessage({
                  defaultMessage: 'Status',
                })}
              </span>
            }
          >
            <Typography.Text type={getTextStatus(data.status)}>
              {getShoeStatus(data.status)}
            </Typography.Text>
          </Descriptions.Item>

          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon className={classes.descIcon} icon={faSocks} />
                {intl.formatMessage({
                  defaultMessage: 'Side',
                })}
              </span>
            }
          >
            {getShoeSide(data.side)}
          </Descriptions.Item>
          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon
                  className={classes.descIcon}
                  icon={faPalette}
                />
                {intl.formatMessage({
                  defaultMessage: 'Colour',
                })}
              </span>
            }
          >
            {data.colour}
          </Descriptions.Item>

          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon
                  className={classes.descIcon}
                  icon={faShoePrints}
                />
                {intl.formatMessage({
                  defaultMessage: 'Size',
                })}
              </span>
            }
          >
            {data.size}
          </Descriptions.Item>
          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon
                  className={classes.descIcon}
                  icon={faBootHeeled}
                />
                {intl.formatMessage({
                  defaultMessage: 'Style',
                })}
              </span>
            }
          >
            {data.style}
          </Descriptions.Item>
          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon className={classes.descIcon} icon={faBox} />
                {intl.formatMessage({
                  defaultMessage: 'Box',
                })}
              </span>
            }
          >
            {data.box
              ? intl.formatMessage({
                  defaultMessage: 'Yes',
                })
              : intl.formatMessage({
                  defaultMessage: 'No',
                })}
          </Descriptions.Item>

          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon className={classes.descIcon} icon={faTag} />
                {intl.formatMessage({
                  defaultMessage: 'Type',
                })}
              </span>
            }
          >
            {getShoeType(data.type)}
          </Descriptions.Item>
          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon
                  className={classes.descIcon}
                  icon={faCircleSterling}
                />
                {intl.formatMessage({
                  defaultMessage: 'Retail Price',
                })}
              </span>
            }
          >
            {data.retailPrice}
          </Descriptions.Item>
          <Descriptions.Item
            className={classes.descItem}
            label={
              <span>
                <FontAwesomeIcon className={classes.descIcon} icon={faNotes} />
                {intl.formatMessage({
                  defaultMessage: 'Description',
                })}
              </span>
            }
            span={2}
          >
            {data.description}
          </Descriptions.Item>
          {data.business.locations && (
            <Descriptions.Item
              className={classes.descItem}
              label={
                <span>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faLocationDot}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Store',
                  })}
                </span>
              }
              span={2}
            >
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {`${data.business.name}, ${data.business.locations[0].full}`}
            </Descriptions.Item>
          )}

          {data.primaryShoe?.business.locations && (
            <Descriptions.Item
              className={classes.descItem}
              label={
                <span>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faTruckFast}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Delivery',
                  })}
                </span>
              }
            >
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {`${data.primaryShoe?.business.name}, ${data.primaryShoe?.business.locations[0].full}`}
            </Descriptions.Item>
          )}
        </Descriptions>
      )}
    </Modal>
  );
};

export default ViewShoe;
