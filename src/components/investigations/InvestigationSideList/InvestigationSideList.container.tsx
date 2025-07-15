import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InvestigationSideListView from './InvestigationSideList.view';
import useInvestigationSideList from './useInvestigationSideList';

interface Props {
  forceCollapsed?: boolean;
  onCreateNew?: () => void;
  onExpandRequest?: () => void;
}

const InvestigationSideListContainer: React.FC<Props> = ({
  forceCollapsed,
  onCreateNew,
  onExpandRequest,
}) => {
  const { id: currentInvestigationId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  // Fetch investigations using custom hook
  const { handleLoadMore, hasMore, investigations, loading, totalCount } =
    useInvestigationSideList({
      searchQuery,
    });

  const handleCreateNew = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      navigate('/app/investigations/create');
    }
  };

  const handleToggleCollapse = () => {
    if (!forceCollapsed) {
      if (collapsed && onExpandRequest) {
        // If expanding the side list, close the right sidebar
        onExpandRequest();
      }
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <InvestigationSideListView
      collapsed={forceCollapsed || collapsed}
      currentInvestigationId={currentInvestigationId}
      handleLoadMore={() => {
        void handleLoadMore();
      }}
      hasMore={hasMore}
      investigations={investigations}
      loading={loading}
      onCreateNew={handleCreateNew}
      onToggleCollapse={handleToggleCollapse}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      totalCount={totalCount}
    />
  );
};

export default InvestigationSideListContainer;
