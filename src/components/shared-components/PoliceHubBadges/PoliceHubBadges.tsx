import { Avatar, Popover, Space, Tag } from 'antd';
import { useThemeLanguage } from 'hooks/useThemeLanguage';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface Scheme {
  hubForce?: null | string;
  id: string;
  logo?: {
    optimised?: null | string;
    url?: null | string;
  } | null;
  name: string;
}

interface Props {
  currentSchemeId?: string;
  maxDisplay?: number;
  schemes: Scheme[];
}

const formatPoliceForceName = (name: string): string =>
  // Convert from enum format (e.g., AVON_AND_SOMERSET) to readable format
  name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
const PoliceHubBadges = ({
  currentSchemeId,
  maxDisplay = 5,
  schemes,
}: Props): JSX.Element | null => {
  const intl = useIntl();
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  const { theme } = useThemeLanguage();
  const isDark = theme === 'dark';

  // Filter out the current scheme and schemes without hubForce
  const filteredSchemes = schemes.filter(
    (scheme) => scheme.id !== currentSchemeId && scheme.hubForce
  );

  if (filteredSchemes.length === 0) {
    return null;
  }

  const visibleSchemes = filteredSchemes.slice(0, maxDisplay);
  const hiddenSchemes = filteredSchemes.slice(maxDisplay);
  const hiddenCount = hiddenSchemes.length;

  const renderSchemeBadge = (scheme: Scheme, isLarge = true) => {
    const logoUrl = scheme.logo?.optimised || scheme.logo?.url;
    const policeForceName = scheme.hubForce
      ? formatPoliceForceName(scheme.hubForce)
      : scheme.name;
    const initials = policeForceName
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <Tag
        key={scheme.id}
        style={{
          alignItems: 'center',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f0f2f5',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.15)'
            : '1px solid #d9d9d9',
          borderRadius: 20,
          color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
          display: 'inline-flex',
          fontSize: isLarge ? 14 : 12,
          gap: 8,
          lineHeight: '1.5',
          padding: isLarge ? '6px 14px 6px 6px' : '4px 10px 4px 4px',
        }}
      >
        <Avatar
          size={isLarge ? 28 : 24}
          src={logoUrl}
          style={{
            backgroundColor: logoUrl
              ? isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : '#f0f0f0'
              : '#1890ff',
          }}
        >
          {!logoUrl && initials}
        </Avatar>
        <span style={{ fontWeight: 500 }}>{policeForceName}</span>
      </Tag>
    );
  };

  const hiddenContent = (
    <div style={{ maxWidth: 300 }}>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {hiddenSchemes.map((scheme) => renderSchemeBadge(scheme, false))}
      </Space>
    </div>
  );

  return (
    <Space size="small" wrap>
      {visibleSchemes.map((scheme) => renderSchemeBadge(scheme))}
      {hiddenCount > 0 && (
        <Popover
          content={hiddenContent}
          onOpenChange={setIsHoverOpen}
          open={isHoverOpen}
          overlayInnerStyle={{
            backgroundColor: isDark ? '#283142' : '#fff',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.15)'
              : '1px solid #d9d9d9',
          }}
          placement="bottomRight"
          trigger="hover"
        >
          <Tag
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : '#fafafa';
            }}
            style={{
              alignItems: 'center',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#fafafa',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.12)'
                : '1px solid #d9d9d9',
              borderRadius: 20,
              color: isDark ? 'rgba(255, 255, 255, 0.65)' : '#595959',
              cursor: 'pointer',
              display: 'inline-flex',
              fontSize: 14,
              fontWeight: 500,
              padding: '6px 14px',
              transition: 'all 0.2s ease',
            }}
          >
            {intl.formatMessage(
              { defaultMessage: '+{count} more' },
              { count: hiddenCount }
            )}
          </Tag>
        </Popover>
      )}
    </Space>
  );
};

export default PoliceHubBadges;
