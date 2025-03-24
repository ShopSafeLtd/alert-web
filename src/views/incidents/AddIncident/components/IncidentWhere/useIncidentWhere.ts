import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import type React from 'react';

import {
  currentSchemeBusinessesAtom,
  currentSchemeIdAtom,
  isAdminAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useApolloClient } from '@apollo/client';
import { SearchBusinessesDocument } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import { QueryMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
// TODO use businesses select

interface Props {
  showSiteNumber: boolean;
}
interface Return {
  hideField: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const useIncidentWhere = ({ showSiteNumber }: Props): Return => {
  const client = useApolloClient();
  const intl = useIntl();

  const isAdmin = useAtomValue(isAdminAtom);

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const businesses = useAtomValue(currentSchemeBusinessesAtom);
  const reportToAllBusinesses =
    useAtomValue(currentUserAtom)?.reportToAllBusinesses;
  const [hideField, setHideField] = useState(true);
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

  useEffect(() => {
    if (isAdmin || businesses.length > 1 || reportToAllBusinesses) {
      setHideField(false);
    } else {
      setHideField(true);
    }
  }, [isAdmin, businesses]);

  // const variables =

  return {
    hideField,
    onSearchBusiness,
  };
};

export default useIncidentWhere;
