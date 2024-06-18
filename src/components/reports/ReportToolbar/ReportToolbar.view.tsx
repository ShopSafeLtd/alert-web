import React from 'react';
import { Button, Col, Tooltip, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faEraser,
  faFileDownload,
  faFloppyDisk,
  faFloppyDiskPen,
  faLock,
  faPlus,
} from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';

interface ReportToolbarProps {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  minDrawer: boolean;
  setMinDrawer: (value: boolean) => void;
  saveTemplate: (name: string, method: 'create' | 'update') => void;
  setSaveAsDrawer: (value: boolean) => void;
  redactOnPrint?: boolean;
  setRedactOnPrint?: (value: boolean) => void;
  handlePrint: () => void;
  saving?: boolean;
}

const ReportToolbar = ({
  editMode,
  setEditMode,
  minDrawer,
  setMinDrawer,
  saveTemplate,
  setSaveAsDrawer,
  setRedactOnPrint,
  redactOnPrint,
  handlePrint,
  saving = false,
}: ReportToolbarProps) => {
  const intl = useIntl();
  return (
    <Row>
      {!editMode && (
        <Col>
          <Button
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onClick={() => setEditMode(!editMode)}
          >
            <FontAwesomeIcon
              size="lg"
              style={{ marginRight: 5 }}
              icon={faEdit}
            />
            <FormattedMessage defaultMessage="Edit" id="wEQDC6" />
          </Button>
        </Col>
      )}
      {editMode && (
        <Col>
          <Button
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onClick={() => setMinDrawer(!minDrawer)}
          >
            <FontAwesomeIcon
              size="lg"
              style={{ marginRight: 5 }}
              icon={faPlus}
            />
            <FormattedMessage defaultMessage="Add Components" id="PaIeKf" />
          </Button>
        </Col>
      )}
      {editMode && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Finish editing & lock layout',
              id: '29W0tO',
            })}
          >
            <Button
              onClick={() => setEditMode(!editMode)}
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <FontAwesomeIcon size="lg" icon={faLock} />
            </Button>
          </Tooltip>
        </Col>
      )}
      {editMode && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Save changes',
              id: 'X0ha1a',
            })}
          >
            <Button
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              onClick={() => saveTemplate('', 'update')}
              loading={saving}
              disabled={saving}
            >
              <FontAwesomeIcon size="lg" icon={faFloppyDisk} />
            </Button>
          </Tooltip>
        </Col>
      )}
      {editMode && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Save as new report',
              id: 'bLHp7y',
            })}
          >
            <Button
              onClick={() => setSaveAsDrawer(true)}
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: editMode ? 10 : 0,
                borderBottomRightRadius: editMode ? 10 : 0,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              disabled={saving}
            >
              <FontAwesomeIcon size="lg" icon={faFloppyDiskPen} />
            </Button>
          </Tooltip>
        </Col>
      )}
      {!editMode && setRedactOnPrint && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Redact PPI on download',
              id: 'nICoZB',
            })}
          >
            <Button
              danger={redactOnPrint}
              onClick={() => setRedactOnPrint(!redactOnPrint)}
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <FontAwesomeIcon size="lg" icon={faEraser} />
            </Button>
          </Tooltip>
        </Col>
      )}
      {!editMode && (
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Download report as PDF',
              id: 'v4ZiJj',
            })}
          >
            <Button
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onClick={handlePrint}
            >
              <FontAwesomeIcon
                style={{ marginRight: 8 }}
                size="lg"
                icon={faFileDownload}
              />
              <FormattedMessage defaultMessage="Download" id="5q3qC0" />
            </Button>
          </Tooltip>
        </Col>
      )}
    </Row>
  );
};

export default ReportToolbar;
