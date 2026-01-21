import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  actionsButtons: {
    display: 'flex',
    gap: 8,
  },
  actionsSection: {
    alignItems: 'center',
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  cascadeOptionsRow: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  contextBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 4,
    bottom: 8,
    color: '#fff',
    fontSize: 12,
    left: 8,
    padding: '4px 8px',
    position: 'absolute',
    right: 8,
    textAlign: 'center',
    zIndex: 10,
  },
  emptyState: {
    alignItems: 'center',
    color: '#8c8c8c',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 200,
  },
  loadingOverlay: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 200,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16,
  },
  resultsGrid: {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
    marginBottom: 16,
  },
  resultsHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  resultsSection: {
    flex: 1,
    marginBottom: 16,
    overflow: 'auto',
  },
  searchAndFiltersRow: {
    alignItems: 'center',
    display: 'flex',
    gap: 12,
    marginBottom: 16,
  },
  selectedSection: {
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    border: '1px solid #91d5ff',
    borderRadius: 8,
    display: 'flex',
    gap: 12,
    marginBottom: 16,
    minHeight: 52,
    padding: 12,
  },
  selectedTagsWrapper: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedTitle: {
    '&.ant-typography': {
      marginBottom: 0,
    },
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
});

export default useStyles;
