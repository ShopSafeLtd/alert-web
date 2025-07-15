import type { Theme } from 'configs/ThemeConfig';
import type { Edge, EdgeProps, Node } from 'reactflow';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faCalendar,
  faChevronDown,
  faChevronRight,
  faCompress,
  faDollarSign,
  faExpand,
  faGear,
  faMapMarkerAlt,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Modal, Row, Select, Tooltip } from 'antd';
import { useAtomValue } from 'jotai';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import ReactFlow, {
  Background,
  Controls,
  EdgeLabelRenderer,
  Handle,
  MiniMap,
  Position,
  getStraightPath,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStoreState } from 'state';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    '&:fullscreen': {
      backgroundColor: theme.bodyBackground,
      border: 'none',
      borderRadius: 0,
      height: '100vh',
      width: '100vw',
    },
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 12,
    height: '700px',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },

  floatingStats: {
    WebkitBackdropFilter: 'blur(12px) saturate(150%)',
    backdropFilter: 'blur(12px) saturate(150%)',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(30, 30, 30, 0.75)'
        : 'rgba(255, 255, 255, 0.75)',
    border: `1px solid ${
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.06)'
    }`,
    borderRadius: 16,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
        : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
    padding: 12,
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1000,
  },

  floatingToolbar: {
    WebkitBackdropFilter: 'blur(12px) saturate(150%)',
    backdropFilter: 'blur(12px) saturate(150%)',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(30, 30, 30, 0.75)'
        : 'rgba(255, 255, 255, 0.75)',
    border: `1px solid ${
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.06)'
    }`,
    borderRadius: 16,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
        : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
    left: 16,
    maxWidth: 600,
    minWidth: 48,
    padding: 12,
    position: 'absolute',
    top: 16,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
  },

  namePill: {
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 12,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 1px 4px rgba(0, 0, 0, 0.2)'
        : '0 1px 4px rgba(0, 0, 0, 0.1)',
    fontSize: 10,
    fontWeight: 500,
    marginTop: 6,
    maxWidth: 120,
    overflow: 'hidden',
    padding: '4px 8px',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  offenderContainer: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },

  offenderNode: {
    '&:hover': {
      borderColor: theme.primary,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 8px 24px rgba(0, 0, 0, 0.4)'
          : '0 8px 24px rgba(0, 0, 0, 0.2)',
      transform: 'scale(1.1)',
      zIndex: 1000,
    },
    alignItems: 'center',
    backgroundColor: theme.componentBackground,
    border: `3px solid ${theme.borderColor}`,
    borderRadius: '50%',
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 2px 8px rgba(0, 0, 0, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    fontSize: 11,
    fontWeight: 500,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },

  stats: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
  },

  toolbarButton: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.05)',
    },
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    padding: 8,
    transition: 'all 0.2s ease',
  },
}));

interface CrimeGroupData {
  alias?: null | string;
  id: string;
  incidents?: Array<{
    id: string;
    incidentType?: null | string;
    location?: {
      address?: null | string;
      lat?: null | number;
      lng?: null | number;
    } | null;
    occurredAt?: null | string;
    offenders?: Array<{
      id: string;
      name?: null | string;
    }> | null;
    reference?: null | string;
    totalValue?: null | number;
  }> | null;
  offenders?: Array<{
    id: string;
    images?: Array<{
      id: string;
      optimised?: null | string;
      optimisedPersisted?: null | string;
    }> | null;
    name?: null | string;
    reference?: null | number;
    totalIncidents: number;
    totalValue: number;
  }>;
  reference?: null | number;
}

interface Props {
  crimeGroup: CrimeGroupData;
  onOffenderClick?: (offenderId: string) => void;
}

// Custom node components

interface OffenderNodeData {
  color: string;
  connectionCount?: number;
  currentRatio: number;
  id: string;
  images?: Array<{
    id: string;
    optimised?: null | string;
    optimisedPersisted?: null | string;
  }> | null;
  isDimmed?: boolean;
  isSelected?: boolean;
  layoutMode: 'impact' | 'link-analysis';
  name?: null | string;
  onClick?: (id: string) => void;
  reference?: null | number;
  sharedIncidentCount?: number;
  size: number;
  totalIncidents: number;
  totalValue: number;
}

const OffenderNode = ({ data }: { data: OffenderNodeData }) => {
  const classes = useStyles();
  const currency = useAtomValue(currencyAtom);
  const intl = useIntl();

  const getImageUrl = () => {
    if (data.images && data.images.length > 0) {
      const [image] = data.images;
      return image.optimisedPersisted || image.optimised;
    }
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <>
      {/* Center handle for link-analysis mode */}
      <Handle
        id="center"
        position={Position.Top}
        style={{
          background: 'transparent',
          border: 'none',
          height: 1,
          left: '50%',
          opacity: 0,
          pointerEvents: 'none',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1,
        }}
        type="source"
      />
      <Handle
        id="center-target"
        position={Position.Top}
        style={{
          background: 'transparent',
          border: 'none',
          height: 1,
          left: '50%',
          opacity: 0,
          pointerEvents: 'none',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1,
        }}
        type="target"
      />
      <Tooltip
        title={
          <div>
            <div>
              <strong>
                {data.name ||
                  intl.formatMessage({ defaultMessage: 'Unknown Offender' })}
              </strong>
            </div>
            <div>
              {data.reference ? (
                // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                <React.Fragment>#{data.reference}</React.Fragment>
              ) : (
                ''
              )}
            </div>
            <div>
              {intl.formatMessage(
                { defaultMessage: '{count} incidents' },
                { count: data.totalIncidents }
              )}
            </div>
            <div>
              {intl.formatMessage(
                { defaultMessage: '{value} total loss' },
                {
                  value: intl.formatNumber(data.totalValue || 0, {
                    currency,
                    maximumFractionDigits: 0,
                    notation: 'compact',
                    style: 'currency',
                  }),
                }
              )}
            </div>
            {data.layoutMode === 'link-analysis' ? (
              <>
                <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>
                  {intl.formatMessage(
                    { defaultMessage: 'Connections: {count} offenders' },
                    { count: data.connectionCount || 0 }
                  )}
                </div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>
                  {intl.formatMessage(
                    { defaultMessage: 'Shared incidents: {count}' },
                    { count: data.sharedIncidentCount || 0 }
                  )}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>
                {intl.formatMessage(
                  { defaultMessage: 'Impact score: {score}%' },
                  { score: Math.round((data.currentRatio || 0) * 100) }
                )}
              </div>
            )}
          </div>
        }
      >
        <div
          className={classes.offenderContainer}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            cursor: data.layoutMode === 'link-analysis' ? 'pointer' : 'default',
            opacity: data.isDimmed ? 0.3 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            className={classes.offenderNode}
            style={{
              background: data.isSelected
                ? `radial-gradient(circle, #1890ff30, transparent 70%)`
                : data.currentRatio >= 0.7
                  ? `radial-gradient(circle, ${data.color}15, transparent 70%)`
                  : 'inherit',
              borderColor: data.isSelected ? '#1890ff' : data.color,
              borderWidth: data.isSelected
                ? 5
                : data.currentRatio >= 0.7
                  ? 4
                  : 3,
              boxShadow: data.isSelected
                ? '0 0 20px rgba(24, 144, 255, 0.5)'
                : 'none',
              height: data.size,
              transform: data.isSelected ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s ease',
              width: data.size,
            }}
          >
            {imageUrl ? (
              <img
                alt={
                  data.name ||
                  intl.formatMessage({ defaultMessage: 'Unknown Offender' })
                }
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                src={imageUrl}
                style={{
                  borderRadius: '50%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  width: '100%',
                }}
              />
            ) : (
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                  padding: 4,
                }}
              >
                <div
                  style={{
                    fontSize: Math.max(10, data.size / 8),
                    fontWeight: data.currentRatio >= 0.7 ? 'bold' : 500,
                    lineHeight: 1,
                    marginBottom: 2,
                    textAlign: 'center',
                  }}
                >
                  {data.name
                    ? data.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                    : // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                      '?'}
                </div>
                <div
                  style={{
                    fontSize: Math.max(8, data.size / 12),
                    lineHeight: 1,
                    opacity: 0.8,
                  }}
                >
                  {data.reference ? (
                    // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                    <React.Fragment>#{data.reference}</React.Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={classes.namePill}>
            {data.name || intl.formatMessage({ defaultMessage: 'Unknown' })}
          </div>
        </div>
      </Tooltip>
    </>
  );
};

// Custom edge component for clickable labels
interface CustomEdgeProps extends EdgeProps {
  data?: {
    onLabelClick?: () => void;
  };
}

const CustomEdge: React.FC<CustomEdgeProps> = ({
  data,
  id,
  label,
  labelBgPadding,
  labelBgStyle,
  labelShowBg,
  labelStyle,
  sourcePosition: _sourcePosition,
  sourceX,
  sourceY,
  style,
  targetPosition: _targetPosition,
  targetX,
  targetY,
}) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        className="react-flow__edge-path"
        d={edgePath}
        id={id}
        style={style}
      />
      <EdgeLabelRenderer>
        <div
          onClick={() => {
            if (data?.onLabelClick) {
              data.onLabelClick();
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `translate(-50%, -50%) translate(${labelX}px,${labelY}px) scale(1.2)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `translate(-50%, -50%) translate(${labelX}px,${labelY}px) scale(1)`;
          }}
          style={{
            cursor: 'pointer',
            pointerEvents: 'all',
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          {labelShowBg && (
            <div
              style={{
                background: labelBgStyle?.fill || '#fff',
                border: `${labelBgStyle?.strokeWidth || 0}px solid ${labelBgStyle?.stroke || '#000'}`,
                borderRadius: `${(labelBgStyle as { rx?: number })?.rx || 0}px`,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                left: '50%',
                opacity: labelBgStyle?.fillOpacity || 1,
                padding: labelBgPadding
                  ? `${labelBgPadding[0]}px ${labelBgPadding[1]}px`
                  : '8px 12px',
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
          <div
            style={{
              alignItems: 'center',
              color: labelStyle?.fill || '#000',
              display: 'flex',
              fontSize: labelStyle?.fontSize || 16,
              fontWeight: labelStyle?.fontWeight || 'bold',
              justifyContent: 'center',
              minHeight: 28,
              minWidth: 28,
              padding: '4px',
              position: 'relative',
            }}
          >
            {label}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

const CrimeGroupFlow: React.FC<Props> = ({ crimeGroup, onOffenderClick }) => {
  const classes = useStyles();
  const intl = useIntl();
  // Currency is used in formatting
  const currency = useAtomValue(currencyAtom);
  const darkTheme =
    useStoreState((state) => state.theme.currentTheme) === 'dark';

  // Memoize nodeTypes to prevent React Flow warnings
  const nodeTypes = useMemo(
    () => ({
      offender: OffenderNode,
    }),
    []
  );

  // Memoize edgeTypes for custom edges
  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );

  const [viewMode, setViewMode] = useState<'all' | 'high-impact' | 'overview'>(
    'overview'
  );
  const [maxNodes, setMaxNodes] = useState(50);
  const [layoutMode, setLayoutMode] = useState<'impact' | 'link-analysis'>(
    'link-analysis'
  );
  const [toolbarExpanded, setToolbarExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<null | string>(null);
  const [incidentModalData, setIncidentModalData] = useState<{
    incidents: Array<{
      business?: { id?: string; name?: null | string } | null;
      description?: null | string;
      id: string;
      incidentType?: null | string;
      location?: { address?: null | string } | null;
      occurredAt?: null | string;
      offenders?: Array<{ id: string; name?: null | string }> | null;
      reference?: null | string;
      subject?: null | string;
      totalValue?: null | number;
    }>;
    offender1: string;
    offender1Id: string;
    offender1Reference?: null | string;
    offender2: string;
    offender2Id: string;
    offender2Reference?: null | string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    } else {
      void containerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Calculate node positions and sizes based on selected layout mode
  const { initialEdges, initialNodes, stats } = useMemo(() => {
    const offenders = crimeGroup.offenders || [];
    const incidents = crimeGroup.incidents || [];

    // Build incident-to-offenders mapping
    // const incidentOffenderMap = new Map<string, Set<string>>();
    // for (const incident of incidents) {
    //   const offenderIds = new Set((incident.offenders || []).map((o) => o.id));
    //   incidentOffenderMap.set(incident.id, offenderIds);
    // }

    // Calculate both connection-based and impact-based scores
    const offendersWithScores = offenders.map((offender) => {
      // CONNECTION-BASED SCORING
      // Find all incidents this offender is involved in (within this crime group)
      const offenderIncidents = incidents.filter((incident) =>
        incident.offenders?.some((o) => o.id === offender.id)
      );

      // Calculate connections to other offenders through shared incidents
      // Only count connections to other crime group members
      const connections = new Map<string, number>();
      const crimeGroupMemberIds = new Set(offenders.map((o) => o.id));

      for (const incident of offenderIncidents) {
        const coOffenders = incident.offenders || [];
        for (const coOffender of coOffenders) {
          // Only count connections to other crime group members
          if (
            coOffender.id !== offender.id &&
            crimeGroupMemberIds.has(coOffender.id)
          ) {
            connections.set(
              coOffender.id,
              (connections.get(coOffender.id) || 0) + 1
            );
          }
        }
      }

      const totalSharedIncidents = [...connections.values()].reduce(
        (sum, count) => sum + count,
        0
      );
      const uniqueConnections = connections.size;
      const clusterScore = totalSharedIncidents + uniqueConnections * 2; // Weight unique connections higher

      // IMPACT-BASED SCORING - use crime group incident count
      const incidentScore = offenderIncidents.length; // Count only crime group incidents
      const valueScore = (offender.totalValue || 0) / 1000; // Normalize value
      const impactScore = incidentScore + valueScore;

      return {
        ...offender,
        clusterScore,
        connectionCount: uniqueConnections,
        impactScore,
        incidentIds: offenderIncidents.map((i) => i.id),
        sharedIncidentCount: totalSharedIncidents,
        totalIncidents: offenderIncidents.length, // Override with crime group incident count
      };
    });

    // Sort by the selected scoring method
    const sortedOffenders = offendersWithScores.sort((a, b) =>
      layoutMode === 'link-analysis'
        ? b.clusterScore - a.clusterScore
        : b.impactScore - a.impactScore
    );

    const maxScore =
      layoutMode === 'link-analysis'
        ? Math.max(...sortedOffenders.map((o) => o.clusterScore), 1)
        : Math.max(...sortedOffenders.map((o) => o.impactScore), 1);

    // Define levels and colors based on selected layout mode
    const levels =
      layoutMode === 'link-analysis'
        ? [
            { color: '#ff4d4f', name: 'Highly Connected', threshold: 0.7 },
            { color: '#faad14', name: 'Moderately Connected', threshold: 0.4 },
            { color: '#52c41a', name: 'Loosely Connected', threshold: 0 },
          ]
        : [
            { color: '#ff4d4f', name: 'High Impact', threshold: 0.7 },
            { color: '#faad14', name: 'Medium Impact', threshold: 0.4 },
            { color: '#52c41a', name: 'Low Impact', threshold: 0 },
          ];

    // Filter offenders based on view mode
    let displayOffenders = sortedOffenders;
    if (viewMode === 'high-impact') {
      const currentScore =
        layoutMode === 'link-analysis' ? 'clusterScore' : 'impactScore';
      displayOffenders = sortedOffenders.filter(
        (o) => o[currentScore] / maxScore >= 0.4
      );
    } else if (viewMode === 'overview') {
      displayOffenders = sortedOffenders.slice(
        0,
        Math.min(maxNodes, sortedOffenders.length)
      );
    }

    // Group offenders into tiers for analysis
    const getCurrentRatio = (offender: (typeof sortedOffenders)[0]) =>
      layoutMode === 'link-analysis'
        ? offender.clusterScore / maxScore
        : offender.impactScore / maxScore;

    const highTierOffenders = displayOffenders.filter(
      (o) => getCurrentRatio(o) >= 0.7
    );
    const mediumTierOffenders = displayOffenders.filter((o) => {
      const ratio = getCurrentRatio(o);
      return ratio >= 0.4 && ratio < 0.7;
    });
    const lowTierOffenders = displayOffenders.filter(
      (o) => getCurrentRatio(o) < 0.4
    );

    // Calculate layout dimensions
    const containerWidth = 1400;
    const containerHeight = 700;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Create spiral/radial layout based on impact
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const placedNodes: Array<{
      height: number;
      width: number;
      x: number;
      y: number;
    }> = [];

    // Helper function to check if two rectangles overlap
    const checkOverlap = (
      rect1: { height: number; width: number; x: number; y: number },
      rect2: { height: number; width: number; x: number; y: number }
    ) =>
      !(
        rect1.x + rect1.width < rect2.x ||
        rect2.x + rect2.width < rect1.x ||
        rect1.y + rect1.height < rect2.y ||
        rect2.y + rect2.height < rect1.y
      );

    // Helper function to find a non-overlapping position
    const findNonOverlappingPosition = (
      baseX: number,
      baseY: number,
      width: number,
      height: number,
      maxAttempts = 100
    ) => {
      const padding = 20; // Minimum spacing between nodes to prevent overlap

      // First try the exact position
      const candidate = {
        height: height + padding,
        width: width + padding,
        x: baseX,
        y: baseY,
      };

      if (!placedNodes.some((placed) => checkOverlap(candidate, placed))) {
        return { x: baseX, y: baseY };
      }

      // If that fails, try positions in expanding spirals
      for (let attempt = 1; attempt < maxAttempts; attempt++) {
        const spiralAngle = attempt * 0.618 * 2 * Math.PI; // Golden angle for even distribution
        const spiralRadius = Math.sqrt(attempt) * 25; // Increased spiral expansion to prevent overlap

        const x = baseX + spiralRadius * Math.cos(spiralAngle);
        const y = baseY + spiralRadius * Math.sin(spiralAngle);

        // Ensure within bounds
        const boundedX = Math.max(0, Math.min(containerWidth - width, x));
        const boundedY = Math.max(0, Math.min(containerHeight - height, y));

        const testCandidate = {
          height: height + padding,
          width: width + padding,
          x: boundedX,
          y: boundedY,
        };

        // Check if this position overlaps with any existing node
        const hasOverlap = placedNodes.some((placed) =>
          checkOverlap(testCandidate, placed)
        );

        if (!hasOverlap) {
          return { x: boundedX, y: boundedY };
        }
      }

      // If we can't find a non-overlapping position, place it at the edge
      return {
        x: Math.max(0, Math.min(containerWidth - width, baseX)),
        y: Math.max(0, Math.min(containerHeight - height, baseY)),
      };
    };

    // Sort offenders by current score for better placement priority
    const sortedForPlacement = [...displayOffenders].sort((a, b) =>
      layoutMode === 'link-analysis'
        ? b.clusterScore - a.clusterScore
        : b.impactScore - a.impactScore
    );

    // Calculate radial positions based on selected layout mode
    if (layoutMode === 'link-analysis') {
      // For link-analysis, we'll calculate positions after collecting connections
      // Just prepare node data for now
      for (const offender of sortedForPlacement) {
        const currentRatio = getCurrentRatio(offender);
        const level =
          levels.find((l) => currentRatio >= l.threshold) || levels.at(-1);
        const size = 40 + currentRatio * 60; // 40px to 100px

        nodes.push({
          data: {
            clusterScore: offender.clusterScore,
            color: level?.color ?? '#52c41a',
            connectionCount: offender.connectionCount,
            currentRatio,
            id: offender.id,
            images: offender.images,
            impactScore: offender.impactScore,
            isDimmed: false, // Will be updated after we build connections
            isSelected: selectedNodeId === offender.id,
            layoutMode,
            name: offender.name,
            reference: offender.reference,
            sharedIncidentCount: offender.sharedIncidentCount,
            size,
            totalIncidents: offender.totalIncidents,
            totalValue: offender.totalValue,
          },
          draggable: false,
          id: offender.id,
          position: { x: 0, y: 0 }, // Temporary position
          type: 'offender',
        });
      }
    } else {
      // Original layout logic for other modes
      for (const [, offender] of sortedForPlacement.entries()) {
        const currentRatio = getCurrentRatio(offender);
        const level =
          levels.find((l) => currentRatio >= l.threshold) || levels.at(-1);

        // Size based on current scoring method
        const size = 40 + currentRatio * 60; // 40px to 100px

        // Account for the name pill below the circle (approximately 30px total height with padding)
        const pillHeight = 30;
        const totalHeight = size + pillHeight;

        let radius: number;
        let angle: number;

        if (currentRatio >= 0.7) {
          // High tier: Close to center, in inner ring
          const highTierIndex = highTierOffenders.findIndex(
            (o) => o.id === offender.id
          );
          radius = 120 + (highTierIndex % 2) * 40; // 120-160px from center
          angle =
            (highTierIndex / Math.max(highTierOffenders.length, 1)) *
            2 *
            Math.PI;
        } else if (currentRatio >= 0.4) {
          // Medium tier: Middle ring
          const mediumTierIndex = mediumTierOffenders.findIndex(
            (o) => o.id === offender.id
          );
          radius = 220 + (mediumTierIndex % 3) * 30; // 220-280px from center
          angle =
            (mediumTierIndex / Math.max(mediumTierOffenders.length, 1)) *
            2 *
            Math.PI;
          // Offset angle to avoid overlap with high tier
          angle += Math.PI / Math.max(mediumTierOffenders.length, 1);
        } else {
          // Low tier: Outer ring with spiral pattern
          const lowTierIndex = lowTierOffenders.findIndex(
            (o) => o.id === offender.id
          );
          const spiralTurn = Math.floor(lowTierIndex / 12); // 12 per spiral
          radius = 320 + spiralTurn * 40; // Spiral outward
          angle = (lowTierIndex / 12) * 2 * Math.PI + spiralTurn * 0.5;
        }

        // Convert polar to cartesian coordinates
        const baseX = centerX + radius * Math.cos(angle) - size / 2;
        const baseY = centerY + radius * Math.sin(angle) - totalHeight / 2;

        // Find a non-overlapping position
        const { x: finalX, y: finalY } = findNonOverlappingPosition(
          baseX,
          baseY,
          size,
          totalHeight
        );

        placedNodes.push({
          height: totalHeight,
          width: size,
          x: finalX,
          y: finalY,
        });

        nodes.push({
          data: {
            clusterScore: offender.clusterScore,
            color: level?.color ?? '#52c41a',
            connectionCount: offender.connectionCount,
            currentRatio,
            id: offender.id,
            images: offender.images,
            impactScore: offender.impactScore,
            layoutMode,
            name: offender.name,
            reference: offender.reference,
            sharedIncidentCount: offender.sharedIncidentCount,
            size,
            totalIncidents: offender.totalIncidents,
            totalValue: offender.totalValue,
          },
          draggable: false,
          id: offender.id,
          position: { x: finalX, y: finalY },
          type: 'offender',
        });
      }
    }

    // Create edges for link-analysis mode
    if (layoutMode === 'link-analysis') {
      console.log('Creating edges for link-analysis mode');
      console.log('Display offenders:', displayOffenders.length);
      console.log('Incidents:', incidents.length);

      // Debug: Check incident structure
      console.log('Sample incident:', incidents[0]);
      console.log('Sample incident offenders:', incidents[0]?.offenders);
      console.log(
        'Crime group offenders:',
        crimeGroup.offenders?.map((o) => ({ id: o.id, name: o.name }))
      );
      console.log(
        'Display offenders:',
        displayOffenders.map((o) => ({ id: o.id, name: o.name }))
      );

      // First, collect ALL connections between offenders (bidirectional)
      const allConnections = new Map<string, number>();

      for (const incident of incidents) {
        console.log(`\nIncident ${incident.reference}:`);
        console.log(
          `  Total offenders in incident: ${incident.offenders?.length || 0}`
        );

        const incidentOffenders = (incident.offenders || []).filter((o) =>
          displayOffenders.some((displayO) => displayO.id === o.id)
        );

        console.log(`  Offenders in crime group: ${incidentOffenders.length}`);
        console.log(
          `  Filtered out: ${(incident.offenders?.length || 0) - incidentOffenders.length} offenders not in this crime group`
        );

        // For each pair of offenders in this incident
        for (let i = 0; i < incidentOffenders.length; i++) {
          for (let j = i + 1; j < incidentOffenders.length; j++) {
            const offender1 = incidentOffenders[i];
            const offender2 = incidentOffenders[j];

            // Create consistent edge ID
            const edgeId = [offender1.id, offender2.id].sort().join('-');

            // Increment the count for this edge
            allConnections.set(edgeId, (allConnections.get(edgeId) || 0) + 1);

            console.log(
              `  Connection: ${offender1.name || offender1.id} <-> ${offender2.name || offender2.id} (${allConnections.get(edgeId)} incidents)`
            );
          }
        }
      }

      console.log('Total unique connections found:', allConnections.size);

      // Force-directed layout calculation
      const forceIterations = 150;
      const nodePositions = new Map<
        string,
        { size: number; vx: number; vy: number; x: number; y: number }
      >();

      // Initialize positions in multiple concentric circles to better distribute nodes
      for (const [index, node] of nodes.entries()) {
        // Distribute nodes across multiple rings
        const ringsCount = Math.ceil(Math.sqrt(nodes.length / 8)); // Approximately 8 nodes per ring
        const ring = Math.floor(index / Math.ceil(nodes.length / ringsCount));
        const indexInRing = index % Math.ceil(nodes.length / ringsCount);
        const nodesInRing = Math.min(
          Math.ceil(nodes.length / ringsCount),
          nodes.length - ring * Math.ceil(nodes.length / ringsCount)
        );

        const angle =
          (indexInRing / nodesInRing) * 2 * Math.PI +
          (ring * Math.PI) / ringsCount; // Offset rings
        const baseRadius = Math.min(containerWidth, containerHeight) * 0.25;
        const ringRadius = baseRadius + ring * baseRadius * 0.5;

        // Add small random perturbation to avoid perfect symmetry
        const randomOffset = 10;
        const randomX = (Math.random() - 0.5) * randomOffset;
        const randomY = (Math.random() - 0.5) * randomOffset;

        nodePositions.set(node.id, {
          size: (node.data as OffenderNodeData).size,
          vx: 0,
          vy: 0,
          x: centerX + ringRadius * Math.cos(angle) + randomX,
          y: centerY + ringRadius * Math.sin(angle) + randomY,
        });
      }

      // Run force simulation
      for (let iteration = 0; iteration < forceIterations; iteration++) {
        const alpha = 1 - iteration / forceIterations; // Cooling factor

        // Apply repulsive forces between all nodes
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const node1 = nodes[i];
            const node2 = nodes[j];
            const pos1 = nodePositions.get(node1.id)!;
            const pos2 = nodePositions.get(node2.id)!;

            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const distance = Math.hypot(dx, dy) || 1;

            // Calculate minimum distance based on node sizes (with padding)
            const minDistance = (pos1.size + pos2.size) / 2 + 120; // 120px padding between nodes

            // Strong repulsive force, especially when nodes are close
            const repulsiveStrength = 15_000; // Increased base repulsion
            let repulsiveForce;

            if (distance < minDistance) {
              // Extra strong repulsion when overlapping
              repulsiveForce = repulsiveStrength * 10 * alpha; // Much stronger when overlapping
            } else if (distance < minDistance * 2) {
              // Strong repulsion when close but not overlapping
              repulsiveForce = ((repulsiveStrength * 3) / distance) * alpha;
            } else {
              // Normal repulsion based on distance
              repulsiveForce =
                (repulsiveStrength / (distance * distance)) * alpha; // Quadratic falloff
            }

            const fx = (dx / distance) * repulsiveForce;
            const fy = (dy / distance) * repulsiveForce;

            pos1.vx -= fx;
            pos1.vy -= fy;
            pos2.vx += fx;
            pos2.vy += fy;
          }
        }

        // Apply attractive forces for connected nodes
        for (const [edgeId, count] of allConnections.entries()) {
          const [sourceId, targetId] = edgeId.split('-');
          const pos1 = nodePositions.get(sourceId);
          const pos2 = nodePositions.get(targetId);

          if (pos1 && pos2) {
            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const distance = Math.hypot(dx, dy) || 1;

            // Calculate desired distance based on connection strength
            const desiredDistance = 300 - count * 15; // Slightly closer for more connections
            const minDistance = (pos1.size + pos2.size) / 2 + 120; // Minimum allowed distance
            const targetDistance = Math.max(desiredDistance, minDistance);

            // Spring-like attractive force (weaker to prevent clustering)
            const springStrength = 0.005 * count;
            const displacement = distance - targetDistance;
            const attractiveForce = springStrength * displacement * alpha;

            const fx = (dx / distance) * attractiveForce;
            const fy = (dy / distance) * attractiveForce;

            pos1.vx += fx;
            pos1.vy += fy;
            pos2.vx -= fx;
            pos2.vy -= fy;
          }
        }

        // Apply gentle gravity towards center
        for (const pos of nodePositions.values()) {
          const dx = centerX - pos.x;
          const dy = centerY - pos.y;
          const distance = Math.hypot(dx, dy) || 1;

          const gravityForce = 0.02 * alpha; // Reduced gravity
          pos.vx += (dx / distance) * gravityForce;
          pos.vy += (dy / distance) * gravityForce;
        }

        // Update positions with velocity damping
        for (const pos of nodePositions.values()) {
          // Apply velocity
          pos.x += pos.vx * 0.9;
          pos.y += pos.vy * 0.9;

          // Damping
          pos.vx *= 0.85;
          pos.vy *= 0.85;

          // Keep nodes within bounds with padding
          const padding = pos.size / 2 + 20;
          pos.x = Math.max(padding, Math.min(containerWidth - padding, pos.x));
          pos.y = Math.max(padding, Math.min(containerHeight - padding, pos.y));
        }
      }

      // Final collision resolution pass - more aggressive
      console.log('Starting collision resolution...');
      const minSpacing = 150; // Minimum spacing between node centers

      // First, detect clusters of nodes that are too close together
      const closenessClusters: string[][] = [];
      const processedNodes = new Set<string>();

      for (let i = 0; i < nodes.length; i++) {
        const nodeId = nodes[i].id;
        if (processedNodes.has(nodeId)) continue;

        const cluster: string[] = [nodeId];
        processedNodes.add(nodeId);

        // Find all nodes within 2x minSpacing of this node
        for (const [j, node] of nodes.entries()) {
          if (i === j) continue;
          const otherId = node.id;
          if (processedNodes.has(otherId)) continue;

          const pos1 = nodePositions.get(nodeId)!;
          const pos2 = nodePositions.get(otherId)!;
          const distance = Math.sqrt(
            Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
          );

          if (distance < minSpacing * 1.5) {
            cluster.push(otherId);
            processedNodes.add(otherId);
          }
        }

        if (cluster.length > 1) {
          closenessClusters.push(cluster);
        }
      }

      console.log(
        `Found ${closenessClusters.length} clusters of overlapping nodes`
      );

      // Spread out each cluster
      for (const [clusterIndex, cluster] of closenessClusters.entries()) {
        console.log(`Cluster ${clusterIndex}: ${cluster.length} nodes`);

        // Calculate center of mass for the cluster
        let centerX = 0,
          centerY = 0;
        for (const nodeId of cluster) {
          const pos = nodePositions.get(nodeId)!;
          centerX += pos.x;
          centerY += pos.y;
        }
        centerX /= cluster.length;
        centerY /= cluster.length;

        // Arrange nodes in a grid or circle pattern around the center
        if (cluster.length <= 8) {
          // Circle pattern for small clusters
          for (const [index, nodeId] of cluster.entries()) {
            const angle = (index / cluster.length) * 2 * Math.PI;
            const radius = minSpacing * 0.8;
            const pos = nodePositions.get(nodeId)!;
            pos.x = centerX + radius * Math.cos(angle);
            pos.y = centerY + radius * Math.sin(angle);
          }
        } else {
          // Grid pattern for larger clusters
          const cols = Math.ceil(Math.sqrt(cluster.length));
          const rows = Math.ceil(cluster.length / cols);

          for (const [index, nodeId] of cluster.entries()) {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const pos = nodePositions.get(nodeId)!;

            // Center the grid
            const gridWidth = (cols - 1) * minSpacing;
            const gridHeight = (rows - 1) * minSpacing;

            pos.x = centerX - gridWidth / 2 + col * minSpacing;
            pos.y = centerY - gridHeight / 2 + row * minSpacing;
          }
        }
      }

      // Now do fine-tuning collision resolution iterations
      for (
        let resolveIteration = 0;
        resolveIteration < 150;
        resolveIteration++
      ) {
        let hasCollision = false;
        let totalAdjustment = 0;

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const pos1 = nodePositions.get(nodes[i].id)!;
            const pos2 = nodePositions.get(nodes[j].id)!;

            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const distance = Math.hypot(dx, dy);

            // Required minimum distance
            const minDistance = minSpacing;

            if (distance < minDistance) {
              hasCollision = true;

              // If nodes are very close or at same position, add some randomness
              let pushX, pushY;
              if (distance < 1) {
                // Nodes are at same position, push in random direction
                const randomAngle = Math.random() * 2 * Math.PI;
                pushX = Math.cos(randomAngle) * minSpacing * 0.5;
                pushY = Math.sin(randomAngle) * minSpacing * 0.5;
              } else {
                // Push nodes apart
                const pushDistance = (minDistance - distance) / 2 + 10;
                pushX = (dx / distance) * pushDistance;
                pushY = (dy / distance) * pushDistance;
              }

              pos1.x -= pushX;
              pos1.y -= pushY;
              pos2.x += pushX;
              pos2.y += pushY;

              totalAdjustment +=
                Math.abs(pushX as number) + Math.abs(pushY as number);

              // Keep within bounds
              const padding = 60;
              pos1.x = Math.max(
                padding,
                Math.min(containerWidth - padding, pos1.x)
              );
              pos1.y = Math.max(
                padding,
                Math.min(containerHeight - padding, pos1.y)
              );
              pos2.x = Math.max(
                padding,
                Math.min(containerWidth - padding, pos2.x)
              );
              pos2.y = Math.max(
                padding,
                Math.min(containerHeight - padding, pos2.y)
              );
            }
          }
        }

        console.log(
          `Iteration ${resolveIteration}: hasCollision=${hasCollision}, adjustment=${totalAdjustment}`
        );
        if (!hasCollision || totalAdjustment < 1) break;
      }

      // Update node positions
      for (const node of nodes) {
        const pos = nodePositions.get(node.id)!;
        node.position = {
          x: pos.x - (node.data as OffenderNodeData).size / 2,
          y: pos.y - (node.data as OffenderNodeData).size / 2,
        };
      }

      // Debug: Check for nodes outside visible area and overlapping positions
      console.log('=== Node Position Debug ===');
      const positionMap = new Map<string, string[]>();
      const closeNodes: Array<{
        distance: number;
        node1: string;
        node2: string;
      }> = [];
      let outsideCount = 0;
      let overlappingCount = 0;

      for (const node of nodes) {
        const pos = node.position;
        const size = (node.data as OffenderNodeData).size;
        const isVisible =
          pos.x + size > 0 &&
          pos.x < containerWidth &&
          pos.y + size > 0 &&
          pos.y < containerHeight;

        if (!isVisible) {
          outsideCount += 1;
          console.warn(
            `Node ${(node.data as OffenderNodeData).name || intl.formatMessage({ defaultMessage: 'Unknown' })} #${(node.data as OffenderNodeData).reference || node.id} is outside visible area:`,
            {
              containerHeight,
              containerWidth,
              size,
              x: pos.x,
              y: pos.y,
            }
          );
        }

        // Check for nodes at exact same position
        const posKey = `${Math.round(pos.x)},${Math.round(pos.y)}`;
        if (!positionMap.has(posKey)) {
          positionMap.set(posKey, []);
        }
        positionMap
          .get(posKey)!
          .push(
            `${(node.data as OffenderNodeData).name || intl.formatMessage({ defaultMessage: 'Unknown' })} #${(node.data as OffenderNodeData).reference || node.id}`
          );
      }

      // Check for nodes that are very close to each other
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const pos1 = nodePositions.get(nodes[i].id)!;
          const pos2 = nodePositions.get(nodes[j].id)!;
          const distance = Math.sqrt(
            Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
          );

          if (distance < minSpacing) {
            closeNodes.push({
              distance: Math.round(distance),
              node1: `${(nodes[i].data as OffenderNodeData).name || intl.formatMessage({ defaultMessage: 'Unknown' })} #${(nodes[i].data as OffenderNodeData).reference || nodes[i].id}`,
              node2: `${(nodes[j].data as OffenderNodeData).name || intl.formatMessage({ defaultMessage: 'Unknown' })} #${(nodes[j].data as OffenderNodeData).reference || nodes[j].id}`,
            });
          }
        }
      }

      // Report overlapping positions
      for (const [position, nodesAtPos] of positionMap.entries()) {
        if (nodesAtPos.length > 1) {
          overlappingCount += nodesAtPos.length - 1;
          console.warn(`Nodes at same position ${position}:`, nodesAtPos);
        }
      }

      if (closeNodes.length > 0) {
        console.warn(
          `Found ${closeNodes.length} pairs of nodes that are too close:`,
          closeNodes
        );
      }

      console.log(
        `Total nodes: ${nodes.length}, Outside visible: ${outsideCount}, Overlapping: ${overlappingCount}`
      );
      console.log(`Container: ${containerWidth}x${containerHeight}`);
      console.log('Node distribution:', {
        maxX: Math.max(...nodes.map((n) => n.position.x)),
        maxY: Math.max(...nodes.map((n) => n.position.y)),
        minX: Math.min(...nodes.map((n) => n.position.x)),
        minY: Math.min(...nodes.map((n) => n.position.y)),
      });

      // Now create edges from the connections
      for (const [edgeId, count] of allConnections.entries()) {
        const [sourceId, targetId] = edgeId.split('-');

        // Note: Handle calculations removed as they're not currently used
        // The edge uses fixed handles: 'center' and 'center-target'

        // Fix handle IDs based on the actual handle definitions
        // These variables are computed but not used in the current implementation
        // let fixedSourceHandle = sourceHandle;
        // let fixedTargetHandle = targetHandle;

        // Source handles: top-source, bottom, left-source, right
        // if (sourceHandle === 'top' || sourceHandle === 'left') {
        //   fixedSourceHandle = sourceHandle + '-source';
        // }

        // Target handles: top, bottom-target, left, right-target
        // if (targetHandle === 'bottom' || targetHandle === 'right') {
        //   fixedTargetHandle = targetHandle + '-target';
        // }

        // Find the incidents shared between these two offenders
        const sharedIncidents = incidents.filter((incident) => {
          const hasSource = incident.offenders?.some((o) => o.id === sourceId);
          const hasTarget = incident.offenders?.some((o) => o.id === targetId);
          return hasSource && hasTarget;
        });

        // Get offender details for the modal
        const sourceOffender = displayOffenders.find((o) => o.id === sourceId);
        const targetOffender = displayOffenders.find((o) => o.id === targetId);

        const edge = {
          animated: false,
          data: {
            onLabelClick: () => {
              setIncidentModalData({
                incidents: sharedIncidents.map((inc) => ({
                  id: inc.id,
                  incidentType: inc.incidentType,
                  location: inc.location,
                  occurredAt: inc.occurredAt,
                  offenders: inc.offenders,
                  reference: inc.reference,
                  totalValue: inc.totalValue,
                })),
                offender1:
                  sourceOffender?.name ||
                  intl.formatMessage({ defaultMessage: 'Unknown' }),
                offender1Id: sourceId,
                offender1Reference: sourceOffender?.reference?.toString(),
                offender2:
                  targetOffender?.name ||
                  intl.formatMessage({ defaultMessage: 'Unknown' }),
                offender2Id: targetId,
                offender2Reference: targetOffender?.reference?.toString(),
              });
            },
          },
          id: edgeId,
          label: count.toString(),
          labelBgPadding: [8, 12],
          labelBgStyle: {
            fill: darkTheme ? '#1f1f1f' : '#ffffff',
            fillOpacity: 0.95,
            rx: 14,
            ry: 14,
            stroke: darkTheme ? '#666' : '#999',
            strokeWidth: 2,
          } as React.CSSProperties,
          labelShowBg: true,
          labelStyle: {
            fill: darkTheme ? '#ffffff' : '#000000',
            fontSize: 18,
            fontWeight: 'bold',
          } as React.CSSProperties,
          source: sourceId,
          sourceHandle: 'center',
          style: {
            stroke: darkTheme ? '#666' : '#999',
            strokeWidth: Math.min(count * 2, 8), // Thicker lines for more connections (max 8px)
          } as React.CSSProperties,
          target: targetId,
          targetHandle: 'center-target',
          type: 'custom',
        } as Edge;
        edges.push(edge);
      }

      console.log('Total edges created:', edges.length);
      console.log(
        'Edges with handles:',
        edges.map((e) => ({
          id: e.id,
          label: e.label,
          sourceHandle: e.sourceHandle,
          targetHandle: e.targetHandle,
        }))
      );
      console.log(
        'Nodes after force layout:',
        nodes.map((n) => ({ id: n.id, x: n.position.x, y: n.position.y }))
      );

      // Update node dimming based on selection
      if (selectedNodeId) {
        // Find connected nodes
        const connectedNodeIds = new Set<string>();
        connectedNodeIds.add(selectedNodeId); // Include the selected node itself

        for (const [edgeId] of allConnections.entries()) {
          const [sourceId, targetId] = edgeId.split('-');
          if (sourceId === selectedNodeId) {
            connectedNodeIds.add(targetId);
          } else if (targetId === selectedNodeId) {
            connectedNodeIds.add(sourceId);
          }
        }

        // Update node dimming state
        for (const node of nodes) {
          (node.data as OffenderNodeData).isDimmed = !connectedNodeIds.has(
            node.id
          );
        }

        // Update edge visibility
        for (const edge of edges) {
          const isConnectedEdge =
            edge.source === selectedNodeId || edge.target === selectedNodeId;
          edge.style = {
            ...edge.style,
            opacity: isConnectedEdge ? 1 : 0.2,
            stroke: isConnectedEdge ? '#1890ff' : darkTheme ? '#666' : '#999',
            strokeWidth: isConnectedEdge
              ? Math.min(Number(edge.label || 1) * 3, 10)
              : Math.min(Number(edge.label || 1) * 2, 8),
          };
          edge.animated = isConnectedEdge;
        }
      }
    }

    // Calculate statistics
    const stats = {
      displayed: displayOffenders.length,
      highImpact: highTierOffenders.length,
      lowImpact: lowTierOffenders.length,
      mediumImpact: mediumTierOffenders.length,
      total: sortedOffenders.length,
    };

    console.log('Layout mode:', layoutMode);
    console.log('Final nodes:', nodes.length);
    console.log('Final edges:', edges.length);
    console.log('Nodes:', nodes);
    console.log('Edges:', edges);

    return {
      initialEdges: edges,
      initialNodes: nodes,
      stats,
    };
  }, [
    crimeGroup,
    onOffenderClick,
    viewMode,
    maxNodes,
    layoutMode,
    darkTheme,
    selectedNodeId,
    setIncidentModalData,
  ]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (node.type === 'offender' && layoutMode === 'link-analysis') {
        // In link-analysis mode, toggle selection
        setSelectedNodeId((prevId) => (prevId === node.id ? null : node.id));
      }
    },
    [layoutMode]
  );

  return (
    <Card bodyStyle={{ padding: 0 }} loading={false}>
      <div className={classes.container} ref={containerRef}>
        {/* Floating Toolbar */}
        <div
          className={classes.floatingToolbar}
          style={{
            overflow: 'hidden',
            width: 'auto',
          }}
        >
          <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
            <button
              className={classes.toolbarButton}
              onClick={() => setToolbarExpanded(!toolbarExpanded)}
              style={{ alignItems: 'center', display: 'flex', gap: 4 }}
              title={intl.formatMessage({ defaultMessage: 'Toggle settings' })}
            >
              <FontAwesomeIcon icon={faGear} />
              <FontAwesomeIcon
                icon={toolbarExpanded ? faChevronDown : faChevronRight}
                style={{ fontSize: 10 }}
              />
            </button>

            <button
              className={classes.toolbarButton}
              onClick={toggleFullscreen}
              title={
                isFullscreen
                  ? intl.formatMessage({ defaultMessage: 'Exit fullscreen' })
                  : intl.formatMessage({ defaultMessage: 'Enter fullscreen' })
              }
            >
              <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
            </button>

            {!toolbarExpanded && (
              <div
                style={{
                  backgroundColor: darkTheme
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                  height: 20,
                  marginLeft: 4,
                  marginRight: 4,
                  width: 1,
                }}
              />
            )}

            {layoutMode === 'link-analysis' && selectedNodeId && (
              <>
                <div
                  style={{
                    backgroundColor: darkTheme
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                    height: 20,
                    marginLeft: 4,
                    marginRight: 4,
                    width: 1,
                  }}
                />
                <button
                  className={classes.toolbarButton}
                  onClick={() => setSelectedNodeId(null)}
                  style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(24, 144, 255, 0.1)',
                    border: '1px solid #1890ff',
                    borderRadius: 4,
                    display: 'flex',
                    gap: 8,
                    padding: '4px 12px',
                  }}
                  title={intl.formatMessage({
                    defaultMessage: 'Clear selection',
                  })}
                >
                  <span style={{ fontSize: 12 }}>
                    {intl.formatMessage({ defaultMessage: 'Clear Selection' })}
                  </span>
                </button>
              </>
            )}

            {toolbarExpanded && (
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                <div>
                  <label style={{ fontSize: 12, marginRight: 8, opacity: 0.8 }}>
                    {intl.formatMessage({ defaultMessage: 'Layout:' })}
                  </label>
                  <Tooltip
                    title={
                      layoutMode === 'impact'
                        ? intl.formatMessage({
                            defaultMessage:
                              'Groups offenders by individual impact - shows highest value/frequency offenders',
                          })
                        : intl.formatMessage({
                            defaultMessage:
                              'Shows connections between offenders with lines indicating number of shared incidents',
                          })
                    }
                  >
                    <Select
                      onChange={(value) => {
                        setLayoutMode(value);
                        setSelectedNodeId(null); // Clear selection when changing layout
                      }}
                      options={[
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Impact',
                          }),
                          value: 'impact',
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Link Analysis',
                          }),
                          value: 'link-analysis',
                        },
                      ]}
                      size="small"
                      style={{ width: 140 }}
                      value={layoutMode}
                    />
                  </Tooltip>
                </div>

                <div>
                  <label style={{ fontSize: 12, marginRight: 8, opacity: 0.8 }}>
                    {intl.formatMessage({ defaultMessage: 'View:' })}
                  </label>
                  <Select
                    onChange={setViewMode}
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Overview',
                        }),
                        value: 'overview',
                      },
                      {
                        label:
                          layoutMode === 'link-analysis'
                            ? intl.formatMessage({
                                defaultMessage: 'Connected',
                              })
                            : intl.formatMessage({
                                defaultMessage: 'High Impact',
                              }),
                        value: 'high-impact',
                      },
                      {
                        label: intl.formatMessage({ defaultMessage: 'All' }),
                        value: 'all',
                      },
                    ]}
                    size="small"
                    style={{ width: 140 }}
                    value={viewMode}
                  />
                </div>

                {viewMode === 'overview' && (
                  <div>
                    <label
                      style={{ fontSize: 12, marginRight: 8, opacity: 0.8 }}
                    >
                      {intl.formatMessage({ defaultMessage: 'Max:' })}
                    </label>
                    <Select
                      onChange={setMaxNodes}
                      options={[
                        { label: '25', value: 25 },
                        { label: '50', value: 50 },
                        { label: '100', value: 100 },
                        { label: '200', value: 200 },
                      ]}
                      size="small"
                      style={{ width: 80 }}
                      value={maxNodes}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Floating Stats Card */}
        <div className={classes.floatingStats}>
          <div className={classes.stats}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{stats.total}</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>
                {intl.formatMessage({ defaultMessage: 'Total' })}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                {stats.displayed}
              </div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>
                {intl.formatMessage({ defaultMessage: 'Shown' })}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ff4d4f', fontSize: 20, fontWeight: 600 }}>
                {stats.highImpact}
              </div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>
                {intl.formatMessage({ defaultMessage: 'High' })}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#faad14', fontSize: 20, fontWeight: 600 }}>
                {stats.mediumImpact}
              </div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>
                {intl.formatMessage({ defaultMessage: 'Med' })}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#52c41a', fontSize: 20, fontWeight: 600 }}>
                {stats.lowImpact}
              </div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>
                {intl.formatMessage({ defaultMessage: 'Low' })}
              </div>
            </div>
          </div>
        </div>

        <ReactFlow
          edgeTypes={edgeTypes}
          edges={initialEdges}
          edgesFocusable={false}
          elementsSelectable={false}
          fitView
          key={`${layoutMode}-${viewMode}-${maxNodes}`}
          maxZoom={2}
          minZoom={0.3}
          nodeTypes={nodeTypes}
          nodes={initialNodes}
          nodesConnectable={false}
          nodesDraggable={false}
          onNodeClick={onNodeClick}
          proOptions={{ hideAttribution: true }}
        >
          <Controls showInteractive={false} />
          <MiniMap
            nodeStrokeWidth={3}
            pannable
            style={{
              backgroundColor: darkTheme ? '#2b2b2b' : '#fff',
            }}
            zoomable
          />
          <Background color={darkTheme ? '#444' : '#99b3ec'} />
        </ReactFlow>
      </div>

      {/* Incident Details Modal */}
      <Modal
        bodyStyle={{
          backgroundColor: darkTheme ? '#1f1f1f' : '#fafafa',
          padding: 24,
        }}
        footer={null}
        onCancel={() => setIncidentModalData(null)}
        open={!!incidentModalData}
        title={
          <div>
            {intl.formatMessage({ defaultMessage: 'Shared Incidents' })}
            {incidentModalData && (
              <div>
                <div
                  style={{ fontSize: 16, fontWeight: 'normal', marginTop: 8 }}
                >
                  <strong>{incidentModalData.offender1}</strong>
                  {incidentModalData.offender1Reference &&
                    intl.formatMessage(
                      { defaultMessage: ' (#{reference})' },
                      { reference: incidentModalData.offender1Reference }
                    )}
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  <span>{' ↔ '}</span>
                  <strong>{incidentModalData.offender2}</strong>
                  {incidentModalData.offender2Reference &&
                    intl.formatMessage(
                      { defaultMessage: ' (#{reference})' },
                      { reference: incidentModalData.offender2Reference }
                    )}
                </div>
                <div
                  style={{
                    color: darkTheme ? '#8c8c8c' : '#595959',
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 4,
                  }}
                >
                  {intl.formatMessage(
                    { defaultMessage: '{count} shared incidents' },
                    { count: incidentModalData.incidents.length }
                  )}
                </div>
              </div>
            )}
          </div>
        }
        width={750}
      >
        {incidentModalData && (
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {incidentModalData.incidents.map((incident, index) => (
              <div
                key={incident.id}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1890ff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = darkTheme
                    ? '0 4px 16px rgba(0, 0, 0, 0.4)'
                    : '0 4px 16px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = darkTheme
                    ? '#434343'
                    : '#d9d9d9';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = darkTheme
                    ? '0 1px 4px rgba(0, 0, 0, 0.3)'
                    : '0 1px 4px rgba(0, 0, 0, 0.08)';
                }}
                style={{
                  backgroundColor: darkTheme ? '#262626' : '#ffffff',
                  border: `1px solid ${darkTheme ? '#434343' : '#d9d9d9'}`,
                  borderRadius: 8,
                  boxShadow: darkTheme
                    ? '0 1px 4px rgba(0, 0, 0, 0.3)'
                    : '0 1px 4px rgba(0, 0, 0, 0.08)',
                  marginBottom:
                    index < incidentModalData.incidents.length - 1 ? 20 : 0,
                  padding: 20,
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 12,
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{ alignItems: 'center', display: 'flex', gap: 12 }}
                    >
                      <strong
                        style={{
                          color: darkTheme ? '#fff' : '#000',
                          fontSize: 18,
                        }}
                      >
                        {intl.formatMessage({ defaultMessage: 'Incident' })}
                        {incident.reference && (
                          <>
                            {' '}
                            {'#'}
                            {incident.reference}
                          </>
                        )}
                      </strong>
                      {incident.incidentType && (
                        <span
                          style={{
                            backgroundColor: darkTheme
                              ? 'rgba(24, 144, 255, 0.2)'
                              : 'rgba(24, 144, 255, 0.1)',
                            border: `1px solid ${darkTheme ? 'rgba(24, 144, 255, 0.3)' : 'rgba(24, 144, 255, 0.2)'}`,
                            borderRadius: 20,
                            color: '#1890ff',
                            fontSize: 12,
                            fontWeight: 600,
                            padding: '4px 12px',
                          }}
                        >
                          {incident.incidentType}
                        </span>
                      )}
                    </div>
                    {incident.occurredAt && (
                      <div
                        style={{
                          alignItems: 'center',
                          color: darkTheme
                            ? 'rgba(255, 255, 255, 0.65)'
                            : 'rgba(0, 0, 0, 0.65)',
                          display: 'flex',
                          fontSize: 13,
                          gap: 6,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendar}
                          style={{ fontSize: 12 }}
                        />
                        {new Date(incident.occurredAt).toLocaleDateString(
                          undefined,
                          {
                            day: 'numeric',
                            month: 'short',
                            weekday: 'short',
                            year: 'numeric',
                          }
                        )}
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        <span>{' • '}</span>
                        {new Date(incident.occurredAt).toLocaleTimeString(
                          undefined,
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Row gutter={[16, 12]}>
                  {incident.subject && (
                    <Col span={12}>
                      <div
                        style={{
                          backgroundColor: darkTheme ? '#1f1f1f' : '#fafafa',
                          border: `1px solid ${darkTheme ? '#434343' : '#e8e8e8'}`,
                          borderRadius: 8,
                          padding: '12px 16px',
                        }}
                      >
                        <div
                          style={{
                            color: darkTheme ? '#8c8c8c' : '#595959',
                            fontSize: 11,
                            letterSpacing: '0.5px',
                            marginBottom: 4,
                            textTransform: 'uppercase',
                          }}
                        >
                          {intl.formatMessage({ defaultMessage: 'Type' })}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>
                          {incident.subject}
                        </div>
                      </div>
                    </Col>
                  )}

                  {incident.business && incident.business.name && (
                    <Col span={12}>
                      <div
                        style={{
                          backgroundColor: darkTheme ? '#1f1f1f' : '#fafafa',
                          border: `1px solid ${darkTheme ? '#434343' : '#e8e8e8'}`,
                          borderRadius: 8,
                          padding: '12px 16px',
                        }}
                      >
                        <div
                          style={{
                            color: darkTheme ? '#8c8c8c' : '#595959',
                            fontSize: 11,
                            letterSpacing: '0.5px',
                            marginBottom: 4,
                            textTransform: 'uppercase',
                          }}
                        >
                          {intl.formatMessage({ defaultMessage: 'Business' })}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>
                          {incident.business.name}
                        </div>
                      </div>
                    </Col>
                  )}

                  {incident.totalValue !== null &&
                    incident.totalValue !== undefined && (
                      <Col span={incident.subject ? 12 : 24}>
                        <div
                          style={{
                            backgroundColor:
                              incident.totalValue > 0
                                ? darkTheme
                                  ? 'rgba(255, 77, 79, 0.15)'
                                  : 'rgba(255, 77, 79, 0.08)'
                                : darkTheme
                                  ? '#1f1f1f'
                                  : '#fafafa',
                            border: `1px solid ${
                              incident.totalValue > 0
                                ? darkTheme
                                  ? 'rgba(255, 77, 79, 0.3)'
                                  : 'rgba(255, 77, 79, 0.2)'
                                : darkTheme
                                  ? '#434343'
                                  : '#e8e8e8'
                            }`,
                            borderRadius: 8,
                            padding: '12px 16px',
                          }}
                        >
                          <div
                            style={{
                              alignItems: 'center',
                              color: darkTheme ? '#8c8c8c' : '#595959',
                              display: 'flex',
                              fontSize: 11,
                              gap: 6,
                              letterSpacing: '0.5px',
                              marginBottom: 4,
                              textTransform: 'uppercase',
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faDollarSign}
                              style={{ fontSize: 10 }}
                            />
                            {intl.formatMessage({
                              defaultMessage: 'Total Value',
                            })}
                          </div>
                          <div
                            style={{
                              color:
                                incident.totalValue > 0 ? '#ff4d4f' : undefined,
                              fontSize: 18,
                              fontWeight: 600,
                            }}
                          >
                            {intl.formatNumber(incident.totalValue, {
                              currency,
                              style: 'currency',
                            })}
                          </div>
                        </div>
                      </Col>
                    )}

                  {incident.location?.address && (
                    <Col span={24}>
                      <div
                        style={{
                          alignItems: 'center',
                          backgroundColor: darkTheme ? '#1f1f1f' : '#fafafa',
                          border: `1px solid ${darkTheme ? '#434343' : '#e8e8e8'}`,
                          borderRadius: 8,
                          display: 'flex',
                          gap: 8,
                          padding: '12px 16px',
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          style={{ color: '#1890ff', fontSize: 14 }}
                        />
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: 14 }}>
                            {incident.location.address}
                          </span>
                        </div>
                      </div>
                    </Col>
                  )}

                  {incident.description && (
                    <Col span={24}>
                      <div
                        style={{
                          backgroundColor: darkTheme ? '#1f1f1f' : '#f8f8f8',
                          borderLeft: `3px solid ${darkTheme ? '#1890ff' : '#40a9ff'}`,
                          borderRadius: 8,
                          marginTop: 4,
                          padding: '14px 18px',
                        }}
                      >
                        <div
                          style={{
                            color: darkTheme
                              ? 'rgba(255, 255, 255, 0.45)'
                              : 'rgba(0, 0, 0, 0.45)',
                            fontSize: 11,
                            letterSpacing: '0.5px',
                            marginBottom: 6,
                            textTransform: 'uppercase',
                          }}
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Description',
                          })}
                        </div>
                        <div
                          style={{
                            color: darkTheme ? '#ffffff' : '#262626',
                            fontSize: 14,
                            lineHeight: 1.6,
                          }}
                        >
                          {incident.description}
                        </div>
                      </div>
                    </Col>
                  )}

                  {incident.offenders && incident.offenders.length > 2 && (
                    <Col span={24}>
                      <div
                        style={{
                          backgroundColor: darkTheme ? '#1f1f1f' : '#fafafa',
                          border: `1px solid ${darkTheme ? '#393939' : '#e8e8e8'}`,
                          borderRadius: 8,
                          marginTop: 4,
                          padding: '12px 16px',
                        }}
                      >
                        <div
                          style={{
                            color: darkTheme
                              ? 'rgba(255, 255, 255, 0.45)'
                              : 'rgba(0, 0, 0, 0.45)',
                            fontSize: 11,
                            letterSpacing: '0.5px',
                            marginBottom: 8,
                            textTransform: 'uppercase',
                          }}
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Other offenders involved',
                          })}
                        </div>
                        <div
                          style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
                        >
                          {incident.offenders
                            .filter(
                              (o) =>
                                o.id !== incidentModalData.offender1Id &&
                                o.id !== incidentModalData.offender2Id
                            )
                            .map((offender, _idx) => (
                              <span
                                key={offender.id}
                                style={{
                                  backgroundColor: darkTheme
                                    ? '#393939'
                                    : '#e8e8e8',
                                  border: `1px solid ${darkTheme ? '#434343' : '#d9d9d9'}`,
                                  borderRadius: 16,
                                  fontSize: 13,
                                  fontWeight: 500,
                                  padding: '4px 12px',
                                }}
                              >
                                {offender.name ||
                                  intl.formatMessage({
                                    defaultMessage: 'Unknown',
                                  })}
                              </span>
                            ))}
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default CrimeGroupFlow;
