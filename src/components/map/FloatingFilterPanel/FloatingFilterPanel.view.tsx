import type { BrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { IndustriesQuery } from 'graphql/industry/__generated__/industries.generated';

import IncidentTypesSelect from '#/components/form-components/IncidentTypesSelect/IncidentTypesSelect.view';
import PoliceAreaSelect from '#/components/form-components/PoliceAreaSelect/PoliceAreaSelect.view';
import DatePicker from '#/components/util-components/DatePicker';
import { usePresetDateRanges } from '#/views/data-management/export-activities/useExportActivities';
import {
  faChevronDown,
  faChevronUp,
  faGripVertical,
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Select, Slider, Switch, Typography } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStoreState } from 'state';

import useStyles from './FloatingFilterPanel.styles';

const { Text } = Typography;

interface Position {
  x: number;
  y: number;
}

interface Props {
  brandsData: BrandsQuery | undefined;
  brandsLoading: boolean;
  cluster: boolean;
  containerRef?: React.RefObject<HTMLElement>;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  heatmapIntensity: number;
  industriesData: IndustriesQuery | undefined;
  industriesLoading: boolean;
  multiColour: 'multi' | 'single';
  onChangeBrands: (value: string[]) => void;
  onChangeDateRange: (value: { endDate: Date; startDate: Date }) => void;
  onChangeGroups: (value: string[]) => void;
  onChangeHeatmapIntensity: (value: number) => void;
  onChangeIncidentTypes: (value: string | string[]) => void;
  onChangeIndustries: (value: string[]) => void;
  onChangePoliceAreas: (value: string | string[]) => void;
  onChangeSchemes: (value: string[]) => void;
  // Panel control
  onClose?: () => void;

  onToggleBCRP: () => void;
  onToggleBusinesses: () => void;
  onToggleCameras: () => void;
  onToggleCluster: () => void;
  onToggleHeatmap: () => void;
  onToggleMarkers: () => void;

  onTogglePolice: () => void;
  onToggleRetailParks: () => void;
  onToggleViewMode: () => void;
  // Filter data and handlers
  schemes: { scheme: { id: string; name: string } }[];
  selectedBrands: string[];

  selectedGroups: string[];
  selectedIncidentTypes: string[];
  selectedIndustries: string[];
  selectedPoliceAreas: string[];
  selectedSchemes: string[];
  setMultiColour: (value: 'multi' | 'single') => void;

  setShowLondonPolice: () => void;

  setUseBcu: () => void;
  // Display toggles
  showBCRP: boolean;
  showBusinesses: boolean;
  showCameras: boolean;
  showHeatmap: boolean;
  showLondonPolice: boolean;
  showMarkers: boolean;
  showPolice: boolean;
  showRetailParks: boolean;
  useBcu: boolean;
  viewMode: 'popup' | 'sidebar';
}

const STORAGE_KEY = 'incidentMap.floatingPanel';

const FloatingFilterPanel: React.FC<Props> = ({
  brandsData,
  brandsLoading,
  cluster,
  containerRef,
  groupsData,
  groupsLoading,
  heatmapIntensity,
  industriesData,
  industriesLoading,
  multiColour,
  onChangeBrands,
  onChangeDateRange,
  onChangeGroups,
  onChangeHeatmapIntensity,
  onChangeIncidentTypes,
  onChangeIndustries,
  onChangePoliceAreas,
  onChangeSchemes,
  onClose,
  onToggleBCRP,
  onToggleBusinesses,
  onToggleCameras,
  onToggleCluster,
  onToggleHeatmap,
  onToggleMarkers,
  onTogglePolice,
  onToggleRetailParks,
  onToggleViewMode,
  schemes,
  selectedBrands,
  selectedGroups,
  selectedIncidentTypes,
  selectedIndustries,
  selectedPoliceAreas,
  selectedSchemes,
  setMultiColour,
  setShowLondonPolice,
  setUseBcu,
  showBCRP,
  showBusinesses,
  showCameras,
  showHeatmap,
  showLondonPolice,
  showMarkers,
  showPolice,
  showRetailParks,
  useBcu,
  viewMode,
}) => {
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const classes = useStyles({ colorScheme: currentTheme });
  const intl = useIntl();

  // Start with a default position in the top right
  const [position, setPosition] = useState<Position>({ x: 0, y: 20 });
  const [collapsed, setCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const panelRef = useRef<HTMLDivElement>(null);

  // Load position from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let hasStoredPosition = false;

    if (stored) {
      try {
        const { collapsed: storedCollapsed, position: storedPosition } =
          JSON.parse(stored) as { collapsed?: boolean; position?: Position };
        console.log(storedPosition);
        if (storedPosition) {
          // Elliot suggestion, felt weird it teleporting around when you open and close the panel
          setPosition({
            x: 38,
            y: 38,
          });
          hasStoredPosition = true;
        }
        if (typeof storedCollapsed === 'boolean') {
          setCollapsed(storedCollapsed);
        }
      } catch (error) {
        console.warn('Failed to parse stored panel state:', error);
      }
    }

    // If no stored position, calculate initial position in top right
    if (!hasStoredPosition) {
      // Use a timeout to ensure the panel is rendered and we can get its width
      setTimeout(() => {
        if (panelRef.current && containerRef?.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const panelRect = panelRef.current.getBoundingClientRect();
          setPosition({
            x: containerRect.width - panelRect.width - 20,
            y: 20,
          });
        }
      }, 0);
    }
  }, [containerRef]);

  // Save position to localStorage
  const saveState = useCallback(
    (newPosition: Position, newCollapsed: boolean) => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            collapsed: newCollapsed,
            position: newPosition,
          })
        );
      } catch (error) {
        console.warn('Failed to save panel state:', error);
      }
    },
    []
  );

  // Handle mouse down on drag handle
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!panelRef.current || !containerRef?.current) return;

      e.preventDefault();
      setIsDragging(true);

      const containerRect = containerRef.current.getBoundingClientRect();

      // Store the offset from mouse to panel position (accounting for container offset)
      setDragOffset({
        x: e.clientX - position.x - containerRect.left,
        y: e.clientY - position.y - containerRect.top,
      });
    },
    [position, containerRef]
  );

  // Handle mouse move during drag
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !panelRef.current || !containerRef?.current) return;

      e.preventDefault();

      const containerRect = containerRef.current.getBoundingClientRect();
      const panelRect = panelRef.current.getBoundingClientRect();

      // Calculate new position relative to viewport
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      // Convert to position relative to container
      newX -= containerRect.left;
      newY -= containerRect.top;

      // Constrain to container bounds
      const maxX = containerRect.width - panelRect.width;
      const maxY = containerRect.height - panelRect.height;

      newX = Math.max(0, Math.min(maxX, newX));
      newY = Math.max(0, Math.min(maxY, newY));

      setPosition({ x: newX, y: newY });
    },
    [isDragging, dragOffset, containerRef]
  );

  // Handle mouse up to end drag
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      saveState(position, collapsed);
    }
  }, [isDragging, position, collapsed, saveState]);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const toggleCollapsed = useCallback(() => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    saveState(position, newCollapsed);
  }, [collapsed, position, saveState]);

  const clearAllFilters = useCallback(() => {
    onChangeSchemes([]);
    onChangeGroups([]);
    onChangeBrands([]);
    onChangeIndustries([]);
    onChangeIncidentTypes([]);
    onChangePoliceAreas([]);
  }, [
    onChangeSchemes,
    onChangeGroups,
    onChangeBrands,
    onChangeIndustries,
    onChangeIncidentTypes,
    onChangePoliceAreas,
  ]);

  // Count active filters
  const activeFilterCount = [
    selectedSchemes.length,
    selectedGroups.length,
    selectedBrands.length,
    selectedIndustries.length,
    selectedIncidentTypes.length,
    selectedPoliceAreas.length,
  ].reduce((sum, count) => sum + (count > 0 ? 1 : 0), 0);
  const ranges = usePresetDateRanges();

  return (
    <div
      className={`${classes.floatingPanel} ${collapsed ? classes.collapsed : ''}`}
      ref={panelRef}
      style={{
        cursor: isDragging ? 'grabbing' : 'default',
        left: position.x,
        top: position.y,
      }}
    >
      {/* Drag Handle */}
      <div
        className={classes.dragHandle}
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            minWidth: 0,
          }}
        >
          <FontAwesomeIcon className={classes.gripIcon} icon={faGripVertical} />
          <Text
            className={`${classes.title} ${collapsed ? classes.collapsedTitle : ''}`}
          >
            <FormattedMessage defaultMessage="Map Filters" />
            {activeFilterCount > 0 && (
              <span className={classes.activeFiltersChip}>
                {activeFilterCount}
              </span>
            )}
          </Text>
        </div>

        <div className={classes.controls}>
          <button
            className={classes.controlButton}
            onClick={toggleCollapsed}
            type="button"
          >
            <FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp} />
          </button>
          {onClose && (
            <button
              className={classes.controlButton}
              onClick={onClose}
              type="button"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={collapsed ? classes.collapsedContent : classes.content}>
        {collapsed ? (
          <div>
            <Text style={{ color: '#666', fontSize: '11px' }}>
              {activeFilterCount > 0 ? (
                <FormattedMessage
                  defaultMessage="{count} active"
                  values={{ count: activeFilterCount }}
                />
              ) : (
                <FormattedMessage defaultMessage="Click to expand" />
              )}
            </Text>
          </div>
        ) : (
          <Form layout="vertical" size="small">
            {/* Display Options */}
            <div className={classes.filterSection}>
              <div className={classes.sectionTitle}>
                <FormattedMessage defaultMessage="Display Options" />
              </div>

              <div className={classes.switchRow}>
                <Text className={classes.switchLabel}>
                  <FormattedMessage defaultMessage="Show Incidents" />
                </Text>
                <Switch
                  checked={showMarkers}
                  onChange={onToggleMarkers}
                  size="small"
                />
              </div>

              <div className={classes.switchRow}>
                <Text className={classes.switchLabel}>
                  <FormattedMessage defaultMessage="Show Businesses" />
                </Text>
                <Switch
                  checked={showBusinesses}
                  onChange={onToggleBusinesses}
                  size="small"
                />
              </div>

              <div className={classes.switchRow}>
                <Text className={classes.switchLabel}>
                  <FormattedMessage defaultMessage="Show Heatmap" />
                </Text>
                <Switch
                  checked={showHeatmap}
                  onChange={onToggleHeatmap}
                  size="small"
                />
              </div>

              {showHeatmap && (
                <div
                  style={{
                    marginBottom: '16px',
                    marginTop: '12px',
                    paddingLeft: '4px',
                    paddingRight: '4px',
                  }}
                >
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <Text className={classes.switchLabel} style={{ margin: 0 }}>
                      <FormattedMessage defaultMessage="Heatmap Sensitivity" />
                    </Text>
                    <Text style={{ color: '#666', fontSize: '12px' }}>
                      <FormattedMessage
                        defaultMessage="{intensity}%"
                        values={{ intensity: heatmapIntensity }}
                      />
                    </Text>
                  </div>
                  <Slider
                    marks={{
                      0: { label: 'Low', style: { fontSize: '10px' } },
                      50: { label: 'Mid', style: { fontSize: '10px' } },
                      100: { label: 'High', style: { fontSize: '10px' } },
                    }}
                    max={100}
                    min={0}
                    onChange={onChangeHeatmapIntensity}
                    style={{ marginBottom: '4px' }}
                    tooltip={{
                      formatter: (value) => `${value}%`,
                      placement: 'bottom',
                    }}
                    value={heatmapIntensity}
                  />
                </div>
              )}

              <div className={classes.switchRow}>
                <Text className={classes.switchLabel}>
                  <FormattedMessage defaultMessage="Show Police Areas" />
                </Text>
                <Switch
                  checked={showPolice}
                  onChange={onTogglePolice}
                  size="small"
                />
              </div>

              <div className={classes.switchRow}>
                <Text className={classes.switchLabel}>
                  <FormattedMessage defaultMessage="Show Met BCU Areas" />
                </Text>
                <Switch
                  checked={showLondonPolice}
                  onChange={setShowLondonPolice}
                  size="small"
                />
              </div>

              {selectedSchemes.includes('cm9a19w1r00l58q01ss3wm0c1') && (
                <>
                  <div className={classes.switchRow}>
                    <Text className={classes.switchLabel}>
                      <FormattedMessage defaultMessage="Show ANPR Cameras" />
                    </Text>
                    <Switch
                      checked={showCameras}
                      onChange={onToggleCameras}
                      size="small"
                    />
                  </div>

                  <div className={classes.switchRow}>
                    <Text className={classes.switchLabel}>
                      <FormattedMessage defaultMessage="Show BCRP Partnerships" />
                    </Text>
                    <Switch
                      checked={showBCRP}
                      onChange={onToggleBCRP}
                      size="small"
                    />
                  </div>

                  <div className={classes.switchRow}>
                    <Text className={classes.switchLabel}>
                      <FormattedMessage defaultMessage="Show Shopping Centres" />
                    </Text>
                    <Switch
                      checked={showRetailParks}
                      onChange={onToggleRetailParks}
                      size="small"
                    />
                  </div>
                </>
              )}

              <div className={classes.switchRow}>
                <Text className={classes.switchLabel}>
                  <FormattedMessage defaultMessage="BCU-colour Areas" />
                </Text>
                <Switch checked={useBcu} onChange={setUseBcu} size="small" />
              </div>
              <div className={classes.switchRow}>
                <Text className={classes.switchLabel}>
                  <FormattedMessage defaultMessage="Multi-colour Areas" />
                </Text>
                <Switch
                  checked={multiColour === 'multi'}
                  onChange={() =>
                    setMultiColour(multiColour === 'multi' ? 'single' : 'multi')
                  }
                  size="small"
                />
              </div>

              <div className={classes.switchRow}>
                <Text className={classes.switchLabel}>
                  <FormattedMessage defaultMessage="Cluster Points" />
                </Text>
                <Switch
                  checked={cluster}
                  onChange={onToggleCluster}
                  size="small"
                />
              </div>

              <div className={classes.switchRow}>
                <Text className={classes.switchLabel}>
                  <FormattedMessage defaultMessage="View Mode" />
                </Text>
                <Button onClick={onToggleViewMode} size="small" type="default">
                  {viewMode === 'popup' ? (
                    <FormattedMessage defaultMessage="Sidebar" />
                  ) : (
                    <FormattedMessage defaultMessage="Popup" />
                  )}
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className={classes.filterSection}>
              <div className={classes.sectionTitle}>
                <FormattedMessage defaultMessage="Filters" />
              </div>

              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Date Range' })}
                style={{ marginBottom: '12px' }}
              >
                <DatePicker.RangePicker
                  onChange={(value) => {
                    if (value && value[0] && value[1])
                      onChangeDateRange({
                        endDate: new Date(value[1].valueOf()),
                        startDate: new Date(value[0].valueOf()),
                      });
                  }}
                  ranges={ranges}
                  size="small"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Schemes' })}
                style={{ marginBottom: '12px' }}
              >
                <Select
                  maxTagCount={2}
                  mode="multiple"
                  onChange={onChangeSchemes}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select schemes',
                  })}
                  size="small"
                  style={{ width: '100%' }}
                  value={selectedSchemes}
                >
                  {schemes.map((scheme) => (
                    <Select.Option
                      key={scheme.scheme.id}
                      value={scheme.scheme.id}
                    >
                      {scheme.scheme.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Groups' })}
                style={{ marginBottom: '12px' }}
              >
                <Select
                  loading={groupsLoading}
                  maxTagCount={2}
                  mode="multiple"
                  onChange={onChangeGroups}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select groups',
                  })}
                  size="small"
                  style={{ width: '100%' }}
                  value={selectedGroups}
                >
                  {groupsData?.groups.map((group) => (
                    <Select.Option key={group.id} value={group.id}>
                      {group.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Brands' })}
                style={{ marginBottom: '12px' }}
              >
                <Select
                  loading={brandsLoading}
                  maxTagCount={2}
                  mode="multiple"
                  onChange={onChangeBrands}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select brands',
                  })}
                  size="small"
                  style={{ width: '100%' }}
                  value={selectedBrands}
                >
                  {brandsData?.brands.edges.map(({ node: brand }) => (
                    <Select.Option key={brand.id} value={brand.id}>
                      {brand.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Industries' })}
                style={{ marginBottom: '12px' }}
              >
                <Select
                  loading={industriesLoading}
                  maxTagCount={2}
                  mode="multiple"
                  onChange={onChangeIndustries}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select industries',
                  })}
                  size="small"
                  style={{ width: '100%' }}
                  value={selectedIndustries}
                >
                  {industriesData?.industries.map((industry) => (
                    <Select.Option key={industry.id} value={industry.id}>
                      {industry.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Incident Types' })}
                style={{ marginBottom: '12px' }}
              >
                <IncidentTypesSelect
                  maxTagCount={2}
                  multiple
                  onChange={onChangeIncidentTypes}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select incident types',
                  })}
                  size="small"
                  style={{ width: '100%' }}
                  value={selectedIncidentTypes}
                />
              </Form.Item>

              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Police Areas' })}
                style={{ marginBottom: '12px' }}
              >
                <PoliceAreaSelect
                  maxTagCount={2}
                  multiple
                  onChange={onChangePoliceAreas}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select police areas',
                  })}
                  size="small"
                  style={{ width: '100%' }}
                  value={selectedPoliceAreas}
                />
              </Form.Item>

              {activeFilterCount > 0 && (
                <Button
                  className={classes.clearAllButton}
                  onClick={clearAllFilters}
                  size="small"
                  type="default"
                >
                  <FormattedMessage defaultMessage="Clear All Filters" />
                </Button>
              )}
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default FloatingFilterPanel;
