import type { ReactNode } from 'react';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import useStyles from './CollapsibleSidebar.styles';

export interface SidebarSection {
  badge?: number | string;
  content: ReactNode;
  icon: ReactNode;
  id: string;
  label: string;
}

interface Props {
  defaultExpanded?: boolean;
  defaultSection?: string;
  onExpandedChange?: (expanded: boolean) => void;
  onSectionChange?: (sectionId: string) => void;
  sections: SidebarSection[];
}

const CollapsibleSidebar: React.FC<Props> = ({
  defaultExpanded = false,
  defaultSection,
  onExpandedChange,
  onSectionChange,
  sections,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const [activeSection, setActiveSection] = useState<string>(
    defaultSection || sections[0]?.id || ''
  );
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setExpanded(true);
    onSectionChange?.(sectionId);
    onExpandedChange?.(true);
  };

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  const activeSectionData = sections.find((s) => s.id === activeSection);

  return (
    <div className={classes.sidebar}>
      {/* Toggle Button */}
      <div className={classes.sidebarToggle} onClick={handleToggle}>
        <FontAwesomeIcon icon={expanded ? faChevronRight : faChevronLeft} />
      </div>

      {/* Collapsed Menu */}
      <div className={classes.sidebarMenu}>
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <Tooltip placement="left" title={section.label}>
              <div
                className={`${classes.sidebarMenuItem} ${
                  expanded && activeSection === section.id
                    ? classes.sidebarMenuItemActive
                    : ''
                }`}
                onClick={() => handleSectionClick(section.id)}
              >
                <div className={classes.sidebarMenuIcon}>{section.icon}</div>
                <span className={classes.sidebarMenuLabel}>
                  {section.label}
                </span>
                {section.badge && (
                  <div className={classes.sidebarMenuBadge}>
                    {section.badge}
                  </div>
                )}
              </div>
            </Tooltip>
            {index < sections.length - 1 && (
              <div className={classes.sidebarMenuDivider} />
            )}
          </React.Fragment>
        ))}

        <div className={classes.sidebarMenuDivider} />

        {/* Collapse/Expand Toggle in Menu */}
        <div className={classes.sidebarMenuItem} onClick={handleToggle}>
          <FontAwesomeIcon icon={expanded ? faChevronRight : faChevronLeft} />
          <Tooltip
            placement="left"
            title={
              expanded
                ? intl.formatMessage({ defaultMessage: 'Collapse' })
                : intl.formatMessage({ defaultMessage: 'Expand' })
            }
          >
            <span className={classes.sidebarMenuLabel}>
              {expanded
                ? intl.formatMessage({ defaultMessage: 'Collapse' })
                : intl.formatMessage({ defaultMessage: 'Expand' })}
            </span>
          </Tooltip>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && activeSectionData && (
        <div className={classes.sidebarContent}>
          {activeSectionData.content}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSidebar;
