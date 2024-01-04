import { useStoreState } from 'state';
import { useState } from 'react';
import type { ListOffendersAllSchemesQuery } from 'graphql/generated';
import { useListOffendersAllSchemesQuery } from 'graphql/generated';

interface Return {
  loading: boolean;
  data:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        undefined | null
      >
    | null
    | undefined;

  offenderId: string;
  setOffenderId: (id: string) => void;
}

const useDataAudit = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);
  // const pagination = useStoreState((state) => state.data.offenders.pagination);
  // const filterVariables = useStoreState(
  //   (state) => state.data.offenders.variables
  // );
  // const order = useStoreState((state) => state.data.offenders.order);
  // const setOffendersState = useStoreActions(
  //   (actions) => actions.data.setOffenders
  // );

  // const { search, groups, peculiarities, hair, ethnicity, age, build, sex } =
  //   filterVariables;
  const [offenderId, setOffenderId] = useState<string>('');

  const variables = {
    // order: {
    //   updatedAt:
    //     order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    // },
    where: {
      schemeId: {
        in: [currentScheme],
      },
      incidents: {
        none: {},
      },

      // groups:
      //   groups.length > 0
      //     ? {
      //         some: {
      //           id: {
      //             in: groups,
      //           },
      //         },
      //       }
      //     : undefined,
      // gender:
      //   sex.length > 0
      //     ? {
      //         in: sex,
      //       }
      //     : undefined,
      // age:
      //   age.length > 0
      //     ? {
      //         in: age,
      //       }
      //     : undefined,
      // build:
      //   build.length > 0
      //     ? {
      //         in: build,
      //       }
      //     : undefined,
      // race:
      //   ethnicity.length > 0
      //     ? {
      //         in: ethnicity,
      //       }
      //     : undefined,
      // hair: hair
      //   ? {
      //       contains: hair,
      //       mode: QueryMode.Insensitive,
      //     }
      //   : undefined,
      // peculiarities: peculiarities
      //   ? {
      //       mode: QueryMode.Insensitive,
      //       contains: peculiarities,
      //     }
      //   : undefined,
      // OR: [
      //   {
      //     name: {
      //       contains: search,
      //       mode: QueryMode.Insensitive,
      //     },
      //   },
      //   {
      //     alias: {
      //       hasSome: [search],
      //     },
      //   },
      //   {
      //     referenceStr: {
      //       contains: search,
      //     },
      //   },
      // ],
    },
  };
  const { data, loading } = useListOffendersAllSchemesQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.listOffendersAllSchemes,
    loading,

    offenderId,
    setOffenderId,
  };
};

export default useDataAudit;
