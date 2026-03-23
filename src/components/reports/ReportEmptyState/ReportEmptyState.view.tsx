import type { ReportType } from '#/graphql/types';
import type {
  ExtendedLayout,
  MetaData,
  ReportItemTypes,
  ReportViews,
} from '#/views/reports/types';

import { faCompass, faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Modal, Space, Typography, message } from 'antd';
import { useGenerateReportLayoutMutation } from 'graphql/reports/mutations/__generated__/generate-report-layout.generated';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { LayoutToReadable } from 'views/reports/types';

import styles from './ReportEmptyState.module.css';

const { Text, Title } = Typography;
const { TextArea } = Input;

// Maps AI-returned type strings to internal ReportItemTypes
const AI_TYPE_TO_REPORT_ITEM_TYPES: Record<string, ReportItemTypes[]> = {
  BAR_CHART: ['bar', 'graph'],
  DONUT: ['donut'],
  HEATMAP: ['heatmap'],
  LINE_CHART: ['graph', 'bar'],
  MAP: ['map'],
  PIE_CHART: ['donut', 'pie'],
  RADIAL: ['radial'],
  STAT_CARDS: ['summary'],
  TABLE: ['table'],
};

interface AILayoutItem {
  h: number;
  i: string;
  w: number;
  x: number;
  y: number;
}

interface AIMetaDataItem {
  key: string;
  type: string;
}

/**
 * Maps the AI-generated layout (12-column grid, generic keys) to the actual
 * component keys and 2-column grid used by the report layout system.
 */
const mapAIResponseToComponents = (
  aiLayout: AILayoutItem[],
  aiMetaData: AIMetaDataItem[],
  reportView: ReportViews
): { layout: ExtendedLayout[]; metadata: MetaData[] } => {
  const available = LayoutToReadable.filter((item) =>
    item.reportViews.includes(reportView)
  );

  const usedKeys = new Set<string>();
  const resultLayout: ExtendedLayout[] = [];
  const resultMetadata: MetaData[] = [];

  for (const aiItem of aiLayout) {
    const aiMeta = aiMetaData.find((m) => m.key === aiItem.i);
    const preferredTypes: ReportItemTypes[] = aiMeta
      ? (AI_TYPE_TO_REPORT_ITEM_TYPES[aiMeta.type] ?? [])
      : [];

    // Try to find an unused component matching the preferred type first
    let match = available.find(
      (c) =>
        !usedKeys.has(c.i) &&
        preferredTypes.some((t) => c.reportItemTypes.includes(t))
    );
    // Fall back to any unused component
    if (!match) {
      match = available.find((c) => !usedKeys.has(c.i));
    }
    if (!match) break;

    usedKeys.add(match.i);

    // Normalize 12-column AI grid → 2-column report grid
    const w = Math.max(1, Math.min(2, Math.round(aiItem.w / 6)));
    const x = w === 2 ? 0 : aiItem.x >= 6 ? 1 : 0;

    resultLayout.push({
      ...match.item,
      h: Math.max(aiItem.h, match.item.minH ?? 0),
      i: match.i,
      w,
      x,
      y: aiItem.y,
    });
    resultMetadata.push({
      key: match.i,
      type: match.reportItemTypes[0],
    });
  }

  return { layout: resultLayout, metadata: resultMetadata };
};

interface ReportEmptyStateProps {
  onAddComponent: () => void;
  onLayoutGenerated: (layout: ExtendedLayout[], metadata: MetaData[]) => void;
  reportType: ReportType;
  reportView: ReportViews;
}

const ReportEmptyState: React.FC<ReportEmptyStateProps> = ({
  onAddComponent,
  onLayoutGenerated,
  reportType,
  reportView,
}) => {
  const intl = useIntl();
  const [modalOpen, setModalOpen] = useState(false);
  const [instructions, setInstructions] = useState('');

  const [generateLayout, { loading }] = useGenerateReportLayoutMutation();

  const handleGenerate = async () => {
    try {
      const result = await generateLayout({
        variables: {
          instructions: instructions.trim() || undefined,
          reportType,
        },
      });

      const data = result.data?.generateReportLayout;
      if (data) {
        const { layout, metadata } = mapAIResponseToComponents(
          data.layout as AILayoutItem[],
          data.metaData as AIMetaDataItem[],
          reportView
        );
        onLayoutGenerated(layout, metadata);
        setModalOpen(false);
        setInstructions('');
      }
    } catch {
      void message.error(
        intl.formatMessage({
          defaultMessage: 'Failed to generate report layout. Please try again.',
        })
      );
    }
  };

  return (
    <>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          justifyContent: 'center',
          minHeight: 400,
          padding: '40px 20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <FontAwesomeIcon
            icon={faCompass}
            size="3x"
            style={{ color: '#d9d9d9', marginBottom: 16 }}
          />
          <Title level={4} style={{ marginBottom: 8 }}>
            {intl.formatMessage({ defaultMessage: 'No components added yet' })}
          </Title>
          <Text style={{ color: '#8c8c8c' }}>
            {intl.formatMessage({
              defaultMessage:
                'Add components manually or let Compass generate a layout for you.',
            })}
          </Text>
        </div>

        <Space size="middle">
          <Button
            icon={
              <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: 8 }} />
            }
            onClick={onAddComponent}
            size="large"
          >
            {intl.formatMessage({ defaultMessage: 'Add Component' })}
          </Button>

          <div className={styles.gradientWrapper}>
            <Button
              className={styles.gradientButton}
              icon={
                <FontAwesomeIcon
                  icon={faCompass}
                  spin={loading}
                  style={{ marginRight: 8 }}
                />
              }
              onClick={() => setModalOpen(true)}
              size="large"
            >
              {intl.formatMessage({ defaultMessage: 'Generate with Compass' })}
            </Button>
          </div>
        </Space>
      </div>

      <Modal
        footer={[
          <Button
            key="cancel"
            onClick={() => setModalOpen(false)}
            style={{ marginRight: 8 }}
          >
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>,
          <div className={styles.gradientWrapper} key="generate-wrapper">
            <Button
              className={styles.gradientButton}
              icon={
                <FontAwesomeIcon
                  icon={faCompass}
                  spin={loading}
                  style={{ marginRight: 8 }}
                />
              }
              loading={loading}
              onClick={() => {
                void handleGenerate();
              }}
            >
              {loading
                ? intl.formatMessage({ defaultMessage: 'Generating…' })
                : intl.formatMessage({ defaultMessage: 'Generate' })}
            </Button>
          </div>,
        ]}
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
        title={
          <Space>
            <FontAwesomeIcon icon={faCompass} />
            {intl.formatMessage({
              defaultMessage: 'Generate Report with Compass',
            })}
          </Space>
        }
        width={520}
      >
        <div style={{ paddingBottom: 8, paddingTop: 8 }}>
          <Text style={{ display: 'block', marginBottom: 8 }}>
            {intl.formatMessage({
              defaultMessage:
                'Optionally provide instructions to steer the generated layout.',
            })}
          </Text>
          <TextArea
            onChange={(e) => setInstructions(e.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'e.g. Focus on loss data, skip the heatmap',
            })}
            rows={4}
            value={instructions}
          />
          <Text style={{ color: '#8c8c8c', display: 'block', marginTop: 8 }}>
            {intl.formatMessage({
              defaultMessage:
                'Leave blank to generate a default layout for this report type.',
            })}
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default ReportEmptyState;
