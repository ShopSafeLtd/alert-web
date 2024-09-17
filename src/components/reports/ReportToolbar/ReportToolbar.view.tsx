import {
  faEdit,
  faEraser,
  faFileDownload,
  faFloppyDisk,
  faFloppyDiskPen,
  faLock,
  faPlus,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Tooltip } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface ReportToolbarProps {
  editMode: boolean;
  handlePrint: () => void;
  isPrinting: boolean;
  minDrawer: boolean;
  redactOnPrint?: boolean;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  saving?: boolean;
  setEditMode: (value: boolean) => void;
  setMinDrawer: (value: boolean) => void;
  setRedactOnPrint?: (value: boolean) => void;
  setSaveAsDrawer: (value: boolean) => void;
}

const ReportToolbar = ({
  editMode,
  handlePrint,
  isPrinting,
  minDrawer,
  redactOnPrint,
  saveTemplate,
  saving = false,
  setEditMode,
  setMinDrawer,
  setRedactOnPrint,
  setSaveAsDrawer,
}: ReportToolbarProps) => {
  const intl = useIntl();
  return (
    <Row>
      {!editMode && (
        <Col>
          <Button
            onClick={() => setEditMode(!editMode)}
            style={{
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            <FontAwesomeIcon
              icon={faEdit}
              size="lg"
              style={{ marginRight: 5 }}
            />
            <FormattedMessage defaultMessage="Edit" />
          </Button>
        </Col>
      )}
      {editMode && (
        <Col>
          <Button
            onClick={() => setMinDrawer(!minDrawer)}
            style={{
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              size="lg"
              style={{ marginRight: 5 }}
            />
            <FormattedMessage defaultMessage="Add Components" />
          </Button>
        </Col>
      )}
      {editMode && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Finish editing & lock layout',
            })}
          >
            <Button
              onClick={() => setEditMode(!editMode)}
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <FontAwesomeIcon icon={faLock} size="lg" />
            </Button>
          </Tooltip>
        </Col>
      )}
      {editMode && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Save changes',
            })}
          >
            <Button
              disabled={saving}
              loading={saving}
              onClick={() => saveTemplate('', 'update')}
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <FontAwesomeIcon icon={faFloppyDisk} size="lg" />
            </Button>
          </Tooltip>
        </Col>
      )}
      {editMode && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Save as new report',
            })}
          >
            <Button
              disabled={saving}
              onClick={() => setSaveAsDrawer(true)}
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: editMode ? 10 : 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: editMode ? 10 : 0,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <FontAwesomeIcon icon={faFloppyDiskPen} size="lg" />
            </Button>
          </Tooltip>
        </Col>
      )}
      {!editMode && setRedactOnPrint && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Redact PPI on download',
            })}
          >
            <Button
              danger={redactOnPrint}
              onClick={() => setRedactOnPrint(!redactOnPrint)}
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <FontAwesomeIcon icon={faEraser} size="lg" />
            </Button>
          </Tooltip>
        </Col>
      )}
      {!editMode && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Download report as PDF',
            })}
          >
            <Button
              loading={isPrinting}
              onClick={handlePrint}
              style={{
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              <FontAwesomeIcon
                icon={faFileDownload}
                size="lg"
                style={{ marginRight: 8 }}
              />
              <FormattedMessage defaultMessage="Download" />
            </Button>
          </Tooltip>
        </Col>
      )}
    </Row>
  );
};

export default ReportToolbar;
