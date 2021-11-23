import React from 'react';
import { Typography } from 'antd';
import { FeedSearchFilter } from 'components/shared-components';

type OrderType = Record<string, 'asc' | 'desc' | undefined>;
interface TagType {
  id: string;
  name: string;
  description: string;
}
interface GroupType {
  id: string;
  name: string;
  description: string;
}

interface QueryVariables {
  order: OrderType;
  groups: string[] | undefined | null;
  sex: string[] | undefined | null;
  ethnicity: string[] | undefined | null;
  tags: string[] | undefined | null;
  approved: boolean | undefined | null;
}

interface Props {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  queryVariables: QueryVariables;
  openFilter: () => void;
  tags: TagType[];
  groups: GroupType[];
}

/**
 *
 * @param props - {@link Props}
 * @param props.searchInput - search input state managed by the parent
 * @param props.setSearchInput - function to set search input state managed by the parent
 * @param props.openFilter - function to open the filter modal/drawer
 * @param props.queryVariables - {@link QueryVariables} the config used by the parent component to query the database based on the search and filter input. Used to display the currently applied search and filter options to the user.
 * @param props.tags - {@link TagType}[ ] a list of tags. Used to find the names of the tags where the ids belong to the query variables
 * @param props.tags - {@link GroupType}[ ] a list of groups. Used to find the names of the groups where the ids belong to the query variables
 * @returns JSX.Element
 *
 * @description Provides data specific to the OffenderFeed to configure the FeedSearchFilter component {@link FeedSearchFilter}.
 */
const SearchFilter: React.FC<Props> = ({
  searchInput,
  setSearchInput,
  queryVariables,
  openFilter,
  tags,
  groups,
}) => {
  return (
    <FeedSearchFilter
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      openFilter={openFilter}
    >
      <Typography.Text>
        {`Order: ${
          queryVariables.order.createdAt === 'desc'
            ? 'Most recent first'
            : 'Oldest first'
        }`}
      </Typography.Text>
      {queryVariables.groups && (
        <div>
          {`Groups: `}
          {queryVariables.groups?.map((el) => (
            <Typography.Text>
              {`[ ${groups.find((e) => e.id === el)?.name} ] `}
            </Typography.Text>
          ))}
        </div>
      )}
      {queryVariables.tags && (
        <div>
          {`Tags: `}
          {queryVariables.tags?.map((el) => (
            <Typography.Text>
              {`[ ${tags.find((e) => e.id === el)?.name} ] `}
            </Typography.Text>
          ))}
        </div>
      )}
      {queryVariables.ethnicity && (
        <div>
          {`Ethnicity: `}
          {queryVariables.ethnicity?.map((el) => (
            <Typography.Text>{`[ ${el} ] `}</Typography.Text>
          ))}
        </div>
      )}
      {queryVariables.sex && (
        <div>
          {`Sex: `}
          {queryVariables.sex?.map((el) => (
            <Typography.Text>{`[ ${el[0]}${el
              .toLowerCase()
              .slice(1)} ] `}</Typography.Text>
          ))}
        </div>
      )}
      {queryVariables.approved !== undefined && (
        <Typography.Text>
          {queryVariables.approved ? 'Approved only' : 'Awaiting approval only'}
        </Typography.Text>
      )}
    </FeedSearchFilter>
  );
};

export default SearchFilter;
