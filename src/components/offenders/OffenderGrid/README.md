# OffenderGrid Component

The OffenderGrid component displays a grid of offender cards with optional sorting functionality.

## Usage Example

```tsx
import OffenderGrid, {
  OffenderSortSelect,
  useOffenderSort,
} from 'components/offenders/OffenderGrid';

// In your component:
const MyComponent = () => {
  const { sortBy, setSortBy } = useOffenderSort('name');

  return (
    <Card>
      <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
        <Col flex={1}>
          <Title level={4}>Offenders</Title>
        </Col>
        <Col>
          <OffenderSortSelect value={sortBy} onChange={setSortBy} />
        </Col>
        <Col>
          <Button>Add Offenders</Button>
        </Col>
      </Row>

      <OffenderGrid
        offenders={data?.offenders}
        sortBy={sortBy}
        deleteRights={editRights}
        editRights={editRights}
        onDeleteOffender={handleDelete}
        setEditOffenderData={setEditData}
      />
    </Card>
  );
};
```

## Props

### OffenderGrid

- `offenders`: Array of offender objects
- `sortBy`: Sort key (default: 'name')
- `deleteRights`: Boolean for delete permissions
- `editRights`: Boolean for edit permissions
- `onDeleteOffender`: Function to handle deletion
- `setEditOffenderData`: Function to set edit data

### OffenderSortSelect

- `value`: Current sort value
- `onChange`: Function to handle sort change
- `style`: Optional CSS styles

## Sort Options

- `name`: Name (A-Z)
- `nameDesc`: Name (Z-A)
- `incidents`: Most Incidents
- `incidentsAsc`: Least Incidents
- `value`: Highest Value
- `valueAsc`: Lowest Value
- `lastSeen`: Recently Seen
- `lastSeenAsc`: Oldest Activity
