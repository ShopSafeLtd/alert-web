import { useEffect, useState } from 'react';

import type {
  Age,
  Build,
  Gender,
  ImagePosition,
  ListOffendersAllSchemesQuery,
  Race,
} from 'graphql/generated';
import {
  useListOffendersAllSchemesQuery,
  QueryMode,
  SortOrder,
} from 'graphql/generated';
import { useStoreState } from 'state';

export interface OffenderData {
  id: string;
  reference?: number | null;
  updatedAt?: Date;
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
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
    position: ImagePosition;
    rotation: number;
  }[];
  imageUid?: string[] | undefined;
  tags: {
    id: string;
    name: string;
  }[];
  lastActive:
    | { id: string; dayTime?: string | null | undefined }
    | null
    | undefined;
}

interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
  offenderIds: string[] | undefined;
  takeAllSchemes?: boolean;
}

interface Return {
  onSubmit: (value: string | undefined) => void;
  saving: boolean;
  data: ListOffendersAllSchemesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  pagination: { page: number; pageSize: number };
  onPaginationChange: (page: number, pageSize: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedOffender:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  ethnicity: Race[];
  setEthnicity: (value: Race[]) => void;
  age: Age[];
  setAge: (value: Age[]) => void;
  build: Build[];
  setBuild: (value: Build[]) => void;
  sex: Gender[];
  setSex: (value: Gender[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  hair: string;
  peculiarities: string;
  clearFilters: () => void;
}

const useAddExistingOffender = ({
  onClose,
  update,
  offenderIds,
  takeAllSchemes,
}: Props): Return => {
  const userSchemeIds = useStoreState((state) => state.user.schemes).map(
    (el) => el.scheme.id
  );
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [ethnicity, setEthnicity] = useState<Race[]>([]);
  const [age, setAge] = useState<Age[]>([]);
  const [build, setBuild] = useState<Build[]>([]);
  const [sex, setSex] = useState<Gender[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 24,
  });
  const [search, setSearch] = useState('');
  const [hair, setHair] = useState('');
  const [peculiarities, setPeculiarities] = useState('');

  const [selectedOffender, setSelectedOffender] = useState<
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined
  >(undefined);
  const schemeId = useStoreState((state) => state.scheme.id);

  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const { data, loading } = useListOffendersAllSchemesQuery({
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
        schemeId: {
          in: takeAllSchemes ? userSchemeIds : [schemeId],
        },
        id:
          offenderIds && offenderIds?.length > 0
            ? {
                notIn: offenderIds,
              }
            : undefined,
        OR: [
          {
            name: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            alias: {
              hasSome: [search],
            },
          },
          {
            referenceStr: {
              contains: search,
            },
          },
        ],
        gender:
          sex.length > 0
            ? {
                in: sex,
              }
            : undefined,
        age:
          age.length > 0
            ? {
                in: age,
              }
            : undefined,
        build:
          build.length > 0
            ? {
                in: build,
              }
            : undefined,
        race:
          ethnicity.length > 0
            ? {
                in: ethnicity,
              }
            : undefined,
        hair: hair
          ? {
              contains: hair,
              mode: QueryMode.Insensitive,
            }
          : undefined,
        peculiarities: peculiarities
          ? {
              mode: QueryMode.Insensitive,
              contains: peculiarities,
            }
          : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const clearFilters = () => {
    setAge([]);
    setBuild([]);
    setEthnicity([]);
    setSex([]);
    setHair('');
    setPeculiarities('');
  };

  const onPaginationChange = (page: number) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  const onSubmit = () => {
    setSaving(true);
    if (
      data?.listOffendersAllSchemes?.offenders &&
      data.listOffendersAllSchemes.offenders.length > 0 &&
      selectedOffender
    ) {
      update({
        id: selectedOffender.id,
        reference: selectedOffender.reference,
        name: selectedOffender.name,
        age: selectedOffender.age || null,
        gender: selectedOffender.gender || null,
        race: selectedOffender.race || null,
        build: selectedOffender.build || null,
        dateOfBirth: selectedOffender.dateOfBirth || null,
        hair: selectedOffender.hair,
        peculiarities: selectedOffender.peculiarities,
        tags: selectedOffender.tags,
        lastActive: selectedOffender.lastActive || null,
        images:
          selectedOffender.images.map(
            ({ id, optimised, position, rotation }) => ({
              id,
              optimised,
              position,
              // ???
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              rotation,
            })
          ) || null,
      });
    }
    setSaving(false);
    onClose();
  };

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };

  useEffect(() => {
    if (currentId) {
      setSelectedOffender(
        data?.listOffendersAllSchemes?.offenders.find(
          (offender) => offender.id === currentId
        )
      );
    } else {
      setSelectedOffender(null);
    }
  }, [currentId]);
  return {
    onSubmit,
    saving,
    data,
    loading: data?.listOffendersAllSchemes ? false : loading,
    search,
    setSearch,
    onPaginationChange,
    setCurrentId,
    openLightbox,
    lightBoxOpen,
    selectedOffender,
    age,
    build,
    ethnicity,
    setAge,
    setBuild,
    setEthnicity,
    setSex,
    sex,
    pagination,
    hair,
    peculiarities,
    setHair,
    setPeculiarities,
    clearFilters,
  };
};

export default useAddExistingOffender;
