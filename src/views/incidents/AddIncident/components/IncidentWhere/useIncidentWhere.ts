import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import type React from 'react';

import { useApolloClient } from '@apollo/client';
import { useBusinessBrandsLazyQuery } from 'graphql/businesses/queries/__generated__/business-brands.generated';
import { SearchBusinessesDocument } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import { QueryMode, Role } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
// TODO use businesses select

interface Props {
  brands: string[];
  setBrands: (value: string[]) => void;
  showSiteNumber: boolean;
}
interface Return {
  hideField: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSelectedBusiness: (value: string) => void;
}

const useIncidentWhere = ({
  brands: _,
  setBrands,
  showSiteNumber,
}: Props): Return => {
  const client = useApolloClient();
  const intl = useIntl();
  const { id: schemeId } = useStoreState((state) => state.scheme);
  const { businesses, reportToAllBusinesses, role } = useStoreState(
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
          take: 100,
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
              location: item?.locations[0].full || '',
              siteNumber: item?.siteNumber || '',
              value: item?.id || '',
            }))
          : [
              {
                disabled: true,
                label: intl.formatMessage({
                  defaultMessage: 'No results found',
                }),
                value: '',
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
    hideField,
    onSearchBusiness,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSelectedBusiness,
  };
};

export default useIncidentWhere;
