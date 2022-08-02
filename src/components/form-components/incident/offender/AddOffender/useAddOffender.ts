import { useState } from 'react';
import {
  useSchemeGroupsQuery,
  Role,
  Age,
  Gender,
  Race,
  Build,
} from 'graphql/generated';
import { useStoreActions, useStoreState } from 'state';

interface FormData {
  name: string;
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  hair: string;
  peculiarities: string;
  dateSource: string;
  dateOfBirth: Date;
  groups: string[];
}
interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  // images?: {
  //   id: string;
  //   optimised?: string | null;
  // }[];
}
interface Props {
  onClose: () => void;
  update: (value: OffenderData[] | undefined) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
}

const useAddOffender = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const [saving, setSaving] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);

  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
    skip: role !== Role.SchemeAdmin,
    onCompleted: (result) => {
      setOffendersState({
        pagination,
        variables: {
          ...variables,
          groups: result.groups.map((group) => group.id),
        },
        order,
      });
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    update([
      {
        id: Math.floor(Math.random() * 1000).toString(),
        name: data.name || 'Unidentified Offender' || null,
        gender: data.gender || null,
        race: data.race || null,
        build: data.build || null,
        hair: data.hair || null,
        peculiarities: data.peculiarities || null,
        age: ageCheck ? null : data.age || null,
        dateSource: ageCheck ? data.dateSource || null : null,
        dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
        groups:
          data.groups && data.groups.length > 0
            ? groups.map((group) => ({ id: group.id, name: group.name }))
            : undefined,
      },
    ]);

    // createOffender({
    //   variables: {
    //     data: {
    //       name: data.name || null,
    //       gender: data.gender || null,
    //       race: data.race || null,
    //       build: data.build || null,
    //       hair: data.hair || null,
    //       peculiarities: data.peculiarities || null,
    //       age: ageCheck ? null : data.age || null,
    //       dateSource: ageCheck ? data.dateSource || null : null,
    //       dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
    //       groups:
    //         data.groups.length > 0
    //           ? { connect: data.groups.map((id) => ({ id })) }
    //           : undefined,
    //       scheme: schemeId,
    //     },
    //   },
    // });
    onClose();
    setSaving(false);
  };

  return {
    onSubmit,
    saving,
    groups:
      role === Role.SchemeAdmin
        ? groupData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups
            .filter((group) => group.id === schemeId)
            .map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    ageCheck,
    setAgeCheck,
  };
};

export default useAddOffender;
