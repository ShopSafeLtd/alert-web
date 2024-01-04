import type React from 'react';
import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import { QueryMode, Role, SearchBusinessesDocument } from 'graphql/generated';
import { useStoreState } from 'state';
import { useIntl } from 'react-intl';

interface Return {
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  hideField: boolean;
}

const useIncidentWhere = (): Return => {
  const client = useApolloClient();
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const role = useStoreState((state) => state.user.role);
  const businesses = useStoreState((state) => state.user.businesses);
  const reportToAllBusinesses = useStoreState(
    (state) => state.user.reportToAllBusinesses
  );
  const [hideField, setHideField] = useState(true);

  useEffect(() => {
    if (role !== Role.User || businesses.length > 1 || reportToAllBusinesses) {
      setHideField(false);
    } else {
      setHideField(true);
    }
  }, [role, businesses]);

  const onSearchBusiness = async (value: string) =>
    client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          where: {
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
            },
            schemes: {
              some: {
                id: {
                  equals: schemeId,
                },
              },
            },
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length > 0
          ? response.data.listBusinesses.businesses.map((item) => ({
              label: item?.name || '',
              value: item?.id || '',
              location: item?.locations[0].full || '',
            }))
          : [
              {
                label: intl.formatMessage({
                  defaultMessage: 'No results found',
                  id: 'hX5PAb',
                }),
                value: '',
                disabled: true,
              },
            ]
      );

  return {
    onSearchBusiness,
    hideField,
  };
};

export default useIncidentWhere;
