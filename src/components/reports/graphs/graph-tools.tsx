import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

enum GraphType {
  BAR = 'bar',
  DONUT = 'donut',
  LINE = 'line',
  PIE = 'pie',
}

enum GraphTextStyle {
  ITALIC = 'italic',
  NORMAL = 'normal',
  OBLIQUE = 'oblique',
}

enum GraphTextWeight {
  BOLD = 'bold',
  BOLDER = 'bolder',
  LIGHTER = 'lighter',
  NORMAL = 'normal',
}

enum GraphTextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

enum GraphTextWrapping {
  ALWAYS = 'always',
  HYPERNATE = 'hyphenate',
  NEVER = 'never',
  ON_SPACE = 'on-space',
}

export interface GraphToolsData {}

export interface GraphToolsFormData {
  animationDuration: number;
  animationEnabled: boolean;
  annotationsButtonAxes: 'x' | 'xy' | 'y';
  annotationsButtonEnabled: boolean;
  annotationsEnabled: boolean;
  backgroundFill: string;
  backgroundVisible: boolean;
  footnoteColor: string;
  footnoteEnabled: boolean;
  footnoteFontSize: number;
  footnoteFontStyle: GraphTextStyle;
  footnoteFontWeight: GraphTextWeight;
  footnoteMaxHeight: number;
  footnoteMaxWidth: number;
  footnoteSpacing: number;
  footnoteText: string;
  footnoteTextAlign: GraphTextAlign;
  footnoteWrapping: GraphTextWrapping;
  height: number;
  legendEnabled: boolean;
  legendMaxHeight: number;
  legendMaxWidth: number;
  legendOrientation: 'horizontal' | 'vertical';
  legendPosition: 'bottom' | 'left' | 'right' | 'top';
  legendPreventHidingAll: boolean;
  legendReverseOrder: boolean;
  legendSpacing: number;
  legendToggleSeries: boolean;
  minHeight: number;
  minWidth: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  subtitleColor: string;
  subtitleEnabled: boolean;
  subtitleFontSize: number;
  subtitleFontStyle: GraphTextStyle;
  subtitleFontWeight: GraphTextWeight;
  subtitleMaxHeight: number;
  subtitleMaxWidth: number;
  subtitleSpacing: number;
  subtitleText: string;
  subtitleTextAlign: GraphTextAlign;
  subtitleWrapping: GraphTextWrapping;
  titleColor: string;
  titleEnabled: true;
  titleFontSize: number;
  titleFontStyle: GraphTextStyle;
  titleFontWeight: GraphTextWeight;
  titleMaxHeight: number;
  titleMaxWidth: number;
  titleSpacing: number;
  titleText: string;
  titleTextAlign: GraphTextAlign;
  titleWrapping: GraphTextWrapping;
  tooltip: boolean;
  tooltipDelay: number;
  tooltipEnabled: boolean;
  tooltipPositionType:
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'node'
    | 'pointer'
    | 'right'
    | 'top'
    | 'top-left'
    | 'top-right';
  tooltipPositionXOffset: number;
  tooltipPositionYOffset: number;
  tooltipRange: 'exact' | 'nearest';
  tooltipShowArrow: true;
  tooltipWrapping: GraphTextWrapping;
  type: GraphType;
  width: number;
}

interface Props {
  onClose: () => void;
  onSubmit: (value: GraphToolsFormData) => void;
  visible: boolean;
}

const GraphTools = ({ onClose, onSubmit, visible }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm<GraphToolsFormData>();

  const legendValue = Form.useWatch('legendEnabled', form);
  const backgroundVisible = Form.useWatch('backgroundVisible', form);

  return (
    <Drawer
      onClose={onClose}
      open={visible}
      title={intl.formatMessage({ defaultMessage: 'Graph Options' })}
    >
      <Form<GraphToolsFormData> onFinish={onSubmit}>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Graph Type' })}
          name="type"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Please select a graph type',
              }),
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: intl.formatMessage({ defaultMessage: 'Bar' }),
                value: GraphType.BAR,
              },
              {
                label: intl.formatMessage({ defaultMessage: 'Pie' }),
                value: GraphType.PIE,
              },
              {
                label: intl.formatMessage({ defaultMessage: 'Donut' }),
                value: GraphType.DONUT,
              },
              {
                label: intl.formatMessage({ defaultMessage: 'Line' }),
                value: GraphType.LINE,
              },
            ]}
          />
        </Form.Item>

        {/* CHART STYLES */}
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Width' })}
          name="width"
          tooltip={intl.formatMessage({
            defaultMessage: 'The width of the chart in pixels.',
          })}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Background Visible' })}
          name="backgroundVisible"
          tooltip={intl.formatMessage({
            defaultMessage: 'Whether the background should be visible.',
          })}
        >
          <Switch />
        </Form.Item>
        {backgroundVisible && (
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Background Fill' })}
            name="backgroundFill"
            tooltip={intl.formatMessage({
              defaultMessage: 'Colour of the chart background as a HEX code.',
            })}
          >
            <Input />
          </Form.Item>
        )}
        <Divider />

        {/* ANIMATION */}
        <Typography.Title>
          <FormattedMessage defaultMessage="Animation" />
        </Typography.Title>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Animation Enabled' })}
          name="animationEnabled"
          tooltip={intl.formatMessage({
            defaultMessage: 'Enable the animation module.',
          })}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Duration' })}
          name="animationDuration"
          tooltip={intl.formatMessage({
            defaultMessage:
              'The total duration of the animation for each series on initial load and updates',
          })}
        >
          <Switch />
        </Form.Item>
        <Divider />

        {/* ANNOTATIONS */}
        <Typography.Title>
          <FormattedMessage defaultMessage="Annotations" />
        </Typography.Title>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Annotations Enabled' })}
          name="annotationsEnabled"
          tooltip={intl.formatMessage({
            defaultMessage:
              'Determines whether annotations should be displayed on the chart.',
          })}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Buttons Enabled' })}
          name="annotationsButtonEnabled"
          tooltip={intl.formatMessage({
            defaultMessage:
              'Determines whether the annotations buttons should be displayed on the chart.',
          })}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Buttons Axis' })}
          name="annotationsButtonAxes"
          tooltip={intl.formatMessage({
            defaultMessage: 'Which axis should display the annotation buttons.',
          })}
        >
          <Select
            options={[
              {
                label: intl.formatMessage({ defaultMessage: 'X axis' }),
                value: 'x',
              },
              {
                label: intl.formatMessage({ defaultMessage: 'Y axis' }),
                value: 'Y',
              },
              {
                label: intl.formatMessage({ defaultMessage: 'X and Y axes' }),
                value: 'xy',
              },
            ]}
          />
        </Form.Item>
        <Divider />

        {/* FOOTNOTE */}
        <Typography.Title>
          <FormattedMessage defaultMessage="Footnote" />
        </Typography.Title>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Footnote Enabled' })}
          name="footnoteEnabled"
          tooltip={intl.formatMessage({
            defaultMessage: 'Whether the text should be shown.',
          })}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Footnote Colour' })}
          name="footnoteColor"
          tooltip={intl.formatMessage({
            defaultMessage: 'The colour to use for the text.',
          })}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Footnote Colour' })}
          name="footnoteColor"
          tooltip={intl.formatMessage({
            defaultMessage: 'The colour to use for the text.',
          })}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Footnote Font Size' })}
          name="footnoteFontSize"
          tooltip={intl.formatMessage({
            defaultMessage: 'The font size in pixels to use for the text.',
          })}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Footnote Font Style' })}
          name="footnoteFontStyle"
          tooltip={intl.formatMessage({
            defaultMessage: 'The font style to use for the text.',
          })}
        >
          <Select
            options={[
              {
                label: intl.formatMessage({ defaultMessage: 'Italic' }),
                value: GraphTextStyle.ITALIC,
              },
              {
                label: intl.formatMessage({ defaultMessage: 'Oblique' }),
                value: GraphTextStyle.OBLIQUE,
              },
              {
                label: intl.formatMessage({ defaultMessage: 'Normal' }),
                value: GraphTextStyle.NORMAL,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Footnote Font Weight' })}
          name="footnoteFontWeight"
          tooltip={intl.formatMessage({
            defaultMessage: 'The font weight to use for the text.',
          })}
        >
          <Select
            options={[
              {
                label: intl.formatMessage({ defaultMessage: 'Bold' }),
                value: GraphTextWeight.BOLD,
              },
              {
                label: intl.formatMessage({ defaultMessage: 'Bolder' }),
                value: GraphTextWeight.BOLDER,
              },
              {
                label: intl.formatMessage({ defaultMessage: 'Normal' }),
                value: GraphTextWeight.NORMAL,
              },
              {
                label: intl.formatMessage({ defaultMessage: 'Lighter' }),
                value: GraphTextWeight.LIGHTER,
              },
            ]}
          />
        </Form.Item>
        <Divider />

        {/* LEGEND */}
        <Typography.Title>
          <FormattedMessage defaultMessage="Legend" />
        </Typography.Title>
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Legend Enabled' })}
          name="legendEnabled"
          tooltip={intl.formatMessage({
            defaultMessage:
              'Whether to show the legend. By default, the chart displays a legend when there is more than one series present.',
          })}
        >
          <Switch />
        </Form.Item>
        {legendValue && (
          <>
            <Form.Item
              label={intl.formatMessage({ defaultMessage: 'Position' })}
              name="legendPosition"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Where the legend should show in relation to the chart.',
              })}
            >
              <Select
                options={[
                  {
                    label: intl.formatMessage({ defaultMessage: 'Top' }),
                    value: 'top',
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'Bottom' }),
                    value: 'bottom',
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'Left' }),
                    value: 'left',
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'Right' }),
                    value: 'right',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({ defaultMessage: 'Orientation' })}
              name="legendOrientation"
              tooltip={intl.formatMessage({
                defaultMessage: 'How the legend items should be arranged.',
              })}
            >
              <Select
                options={[
                  {
                    label: intl.formatMessage({ defaultMessage: 'Top' }),
                    value: 'horizontal',
                  },
                  {
                    label: intl.formatMessage({ defaultMessage: 'Bottom' }),
                    value: 'vertical',
                  },
                ]}
              />
            </Form.Item>
            <Row>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({ defaultMessage: 'Max Height' })}
                  name="legendMaxHeight"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Used to constrain the height of the legend.',
                  })}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({ defaultMessage: 'Max Width' })}
                  name="legendMaxWidth"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Used to constrain the width of the legend.',
                  })}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Allow toggling of series',
              })}
              name="legendToggleSeries"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Turn off toggling of the series visibility in the chart when a legend item is clicked',
              })}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Prevent hiding all series items',
              })}
              name="legendPreventHidingAll"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Prevent the last visible series from being toggled hidden.',
              })}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Reverse Legend Order',
              })}
              name="legendReverseOrder"
              tooltip={intl.formatMessage({
                defaultMessage: 'Reverse the display order of legend items',
              })}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({ defaultMessage: 'Spacing' })}
              name="legendSpacing"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The spacing in pixels to use outside the legend',
              })}
            >
              <InputNumber />
            </Form.Item>
          </>
        )}
        <Divider />
        <Form.Item>
          <Row gutter={20} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button onClick={onClose}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Button htmlType="submit" type="primary">
                {intl.formatMessage({
                  defaultMessage: 'Save Graph',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default GraphTools;
