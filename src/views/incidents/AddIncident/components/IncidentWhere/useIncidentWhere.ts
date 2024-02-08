import type React from 'react';
import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import {
  QueryMode,
  Role,
  SearchBusinessesDocument,
  useBusinessBrandsLazyQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { useIntl } from 'react-intl';

interface Props {
  showSiteNumber: boolean;
  brands: string[];
  setBrands: (value: string[]) => void;
}
interface Return {
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  hideField: boolean;
  onSelectedBusiness: (value: string) => void;
}

const useIncidentWhere = ({
  showSiteNumber,
  brands: _,
  setBrands,
}: Props): Return => {
  const client = useApolloClient();
  const intl = useIntl();
  const { id: schemeId } = useStoreState((state) => state.scheme);
  const { role, businesses, reportToAllBusinesses } = useStoreState(
    (state) => state.user
  );
  const [hideField, setHideField] = useState(true);

  useEffect(() => {
    if (role !== Role.User || businesses.length > 1 || reportToAllBusinesses) {
      setHideField(false);
    } else {
      setHideField(true);
    }
  }, [role, businesses]);

  // const variables =

  const onSearchBusiness = async (value: string) =>
    client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          where: {
            OR: [
              {
                siteNumber: showSiteNumber
                  ? {
                      equals: value,
                      mode: QueryMode.Insensitive,
                    }
                  : {
                      contains: value,
                      mode: QueryMode.Insensitive,
                    },
              },
              {
                name: showSiteNumber
                  ? undefined
                  : {
                      contains: value,
                      mode: QueryMode.Insensitive,
                    },
              },
            ],
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
              siteNumber: item?.siteNumber || '',
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

  const [getBrands] = useBusinessBrandsLazyQuery();

  const onSelectedBusiness = async (value: string) => {
    const businessData = await getBrands({
      variables: {
        where: {
          id: value,
        },
      },
    });
    if (businessData.data?.business?.brands) {
      setBrands(businessData.data?.business?.brands || []);
    }
  };

  return {
    onSearchBusiness,
    hideField,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSelectedBusiness,
  };
};

export default useIncidentWhere;
