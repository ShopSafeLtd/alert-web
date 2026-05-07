import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './PickingListPrint.module.css';

interface PickingListItem {
  __typename?: 'StockRemovalItem';
  barcode?: null | string;
  brand?: null | string;
  id: string;
  location?: null | string;
  name?: null | string;
  pickedQuantity?: null | number;
  requestedQuantity?: null | number;
  sku?: null | string;
  value?: null | number;
}

interface RecipientInfo {
  address?: string;
  name?: string;
  recipientName?: string;
  recipientPhone?: string;
  type: 'DC' | 'Store';
}

interface PickingListPrintProps {
  createdAt: Date | string;
  createdBy: string;
  items: PickingListItem[];
  recipientInfo: RecipientInfo;
  reference: number;
  title: string;
}

const PickingListPrint: React.FC<PickingListPrintProps> = ({
  createdAt,
  createdBy,
  items,
  recipientInfo,
  reference,
  title,
}) => {
  const formatDate = (dateInput: Date | string) => {
    const date =
      typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const currentDateTime = new Date().toLocaleString('en-GB', {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={styles.printContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          <FormattedMessage defaultMessage="PICKING LIST" />
        </h1>
        <div className={styles.headerInfo}>
          <div className={styles.referenceNumber}>
            <FormattedMessage
              defaultMessage="Request #{reference}"
              values={{ reference }}
            />
          </div>
          <div className={styles.metadata}>
            <div>
              <FormattedMessage
                defaultMessage="<strong>Subject:</strong> {title}"
                values={{
                  strong: (chunks: React.ReactNode) => (
                    <strong>{chunks}</strong>
                  ),
                  title,
                }}
              />
            </div>
            <div>
              <FormattedMessage
                defaultMessage="<strong>Created by:</strong> {createdBy} on {date}"
                values={{
                  createdBy,
                  date: formatDate(createdAt),
                  strong: (chunks: React.ReactNode) => (
                    <strong>{chunks}</strong>
                  ),
                }}
              />
            </div>
            <div>
              <FormattedMessage
                defaultMessage="<strong>Printed:</strong> {currentDateTime}"
                values={{
                  currentDateTime,
                  strong: (chunks: React.ReactNode) => (
                    <strong>{chunks}</strong>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Section */}
      <div className={styles.recipientSection}>
        {recipientInfo.type === 'DC' ? (
          <>
            <div className={styles.recipientLabel}>
              <FormattedMessage defaultMessage="SHIP TO:" />
            </div>
            {recipientInfo.recipientName && (
              <div className={styles.recipientName}>
                <FormattedMessage
                  defaultMessage="<strong>Name:</strong> {name}"
                  values={{
                    name: recipientInfo.recipientName,
                    strong: (chunks: React.ReactNode) => (
                      <strong>{chunks}</strong>
                    ),
                  }}
                />
              </div>
            )}
            {recipientInfo.recipientPhone && (
              <div className={styles.recipientPhone}>
                <FormattedMessage
                  defaultMessage="<strong>Phone:</strong> {phone}"
                  values={{
                    phone: recipientInfo.recipientPhone,
                    strong: (chunks: React.ReactNode) => (
                      <strong>{chunks}</strong>
                    ),
                  }}
                />
              </div>
            )}
            <div className={styles.recipientAddress}>
              <FormattedMessage
                defaultMessage="<strong>Address:</strong> {address}"
                values={{
                  address: recipientInfo.address,
                  strong: (chunks: React.ReactNode) => (
                    <strong>{chunks}</strong>
                  ),
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.recipientLabel}>
              <FormattedMessage defaultMessage="STORE PICKUP" />
            </div>
            <div className={styles.recipientName}>{recipientInfo.name}</div>
          </>
        )}
      </div>

      {/* Items Table */}
      <table className={styles.itemsTable}>
        <thead>
          <tr>
            <th>
              <FormattedMessage defaultMessage="SKU" />
            </th>
            {recipientInfo.type === 'DC' && (
              <th>
                <FormattedMessage defaultMessage="Brand" />
              </th>
            )}
            <th>
              <FormattedMessage defaultMessage="Item Name" />
            </th>
            <th>
              <FormattedMessage defaultMessage="Location" />
            </th>
            <th className={styles.quantityColumn}>
              <FormattedMessage defaultMessage="Qty Requested" />
            </th>
            <th className={styles.pickedColumn}>
              <FormattedMessage defaultMessage="Qty Picked" />
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr className={index % 2 === 0 ? styles.evenRow : ''} key={item.id}>
              <td className={styles.skuCell}>
                {item.sku ?? <FormattedMessage defaultMessage="-" />}
              </td>
              {recipientInfo.type === 'DC' && (
                <td className={styles.brandCell}>
                  {item.brand ?? <FormattedMessage defaultMessage="-" />}
                </td>
              )}
              <td className={styles.nameCell}>
                {item.name ?? <FormattedMessage defaultMessage="-" />}
              </td>
              <td className={styles.locationCell}>
                {item.location ?? <FormattedMessage defaultMessage="-" />}
              </td>
              <td className={styles.quantityCell}>
                {item.requestedQuantity ?? 0}
              </td>
              <td className={styles.pickedCell} />
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer Section */}
      <div className={styles.footer}>
        <div className={styles.signatureLine}>
          <div className={styles.signatureField}>
            <FormattedMessage
              defaultMessage="<strong>Picked by:</strong> {underscores}"
              values={{
                strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                underscores: '_______________________________',
              }}
            />
          </div>
          <div className={styles.signatureField}>
            <FormattedMessage
              defaultMessage="<strong>Date:</strong> {underscores}"
              values={{
                strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                underscores: '_______________________________',
              }}
            />
          </div>
        </div>
        <div className={styles.notesSection}>
          <strong>
            <FormattedMessage defaultMessage="Notes:" />
          </strong>
          {/* eslint-disable formatjs/no-literal-string-in-jsx */}
          <div className={styles.notesLines}>
            <div className={styles.notesLine}>
              {
                '___________________________________________________________________________'
              }
            </div>
            <div className={styles.notesLine}>
              {
                '___________________________________________________________________________'
              }
            </div>
            <div className={styles.notesLine}>
              {
                '___________________________________________________________________________'
              }
            </div>
          </div>
          {/* eslint-enable formatjs/no-literal-string-in-jsx */}
        </div>
      </div>
    </div>
  );
};

export default PickingListPrint;
