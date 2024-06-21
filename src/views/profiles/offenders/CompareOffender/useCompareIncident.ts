import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { OffenderData } from 'components/form-components/offender/offender/AddExistingOffender/AddExistingOffender.container';
import { useStoreState } from 'state';
import type { ViewOffendersCompareQuery } from 'graphql/offenders/queries/compare-offenders.generated';
import { useViewOffendersCompareLazyQuery } from 'graphql/offenders/queries/compare-offenders.generated';
import { Age, Build, Gender, Race, Role } from 'graphql/types';
import { useMergeOffendersMutation } from 'graphql/offenders/mutations/merge-offenders.generated';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

type Offenders = Exclude<
  ViewOffendersCompareQuery['offenders'],
  undefined | null
>;

type Offender = Offenders[number];

export type OffenderField =
  | 'name'
  | 'age'
  | 'build'
  | 'gender'
  | 'race'
  | 'hair'
  | 'peculiarities'
  | 'dateOfBirth'
  | 'dateSource';

export interface Selected {
  age: null | string;
  build: null | string;
  gender: null | string;
  name: null | string;
  race: null | string;
  hair: null | string;
  dateOfBirth: null | string;
  dateSource: null | string;
}

interface Return {
  offenders: Offender[];
  preview: Offender;
  addOffender: boolean;
  toggleAddOffender: () => void;
  addOffenders: (value: OffenderData) => void;
  toggleSelected: (offender: Offender, field: OffenderField) => void;
  selected: Selected;
  removeOffender: (offender: Offender) => void;
  onMerge: () => void;
  mode: 'column' | 'grid';
  setMode: (value: 'column' | 'grid') => void;
  toggleSelectedImages: (value: string) => void;
  selectedImages: string[];
  onSubmitImages: () => void;
}

const compareIncident = (): Return => {
  const { id: offenderId } = useParams();
  const query = useQuery();
  const navigate = useNavigate();
  const { role, id: userId } = useStoreState((state) => state.user);
  const [mode, setMode] = useState<'grid' | 'column'>('column');
  const [addOffender, setAddOffender] = useState(false);
  const [offenders, setOffenders] = useState<Offender[]>([]);
  const [preview, setPreview] = useState<Offender>({
    id: '',
    images: [],
    age: Age.Unknown,
    tags: [],
    updatedAt: new Date(),
    build: Build.Unknown,
    gender: Gender.Unknown,
    name: '',
    race: Race.Unknown,
    hair: 'None',
    peculiarities: 'None',
  });
  const [selected, setSelected] = useState<Selected>({
    age: null,
    build: null,
    gender: null,
    name: null,
    race: null,
    hair: null,
    dateOfBirth: null,
    dateSource: null,
  });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  // const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [queryOffenders, { data }] = useViewOffendersCompareLazyQuery();

  useEffect(() => {}, []);

  useEffect(() => {
    const urlOffender = query.get('offenders');
    const similarOffenders = query.get('similarOffenders')?.split(',');
    let ids: string[] = [];
    if (offenderId) ids = [...ids, offenderId];
    if (urlOffender) ids = [...ids, urlOffender];
    if (similarOffenders) ids = [...ids, ...similarOffenders];
    void queryOffenders({
      fetchPolicy: 'cache-and-network',
      variables: {
        where: {
          id: {
            in: ids,
          },
          groups:
            role === Role.ContentAdmin
              ? undefined
              : {
                  some: {
                    users: {
                      some: {
                        id: {
                          equals: userId,
                        },
                      },
                    },
                  },
                },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (offenders.length === 0 && data?.offenders) {
      const primaryOffender = data?.offenders.find(
        ({ id }) => id === offenderId
      );
      if (primaryOffender) {
        setPreview(primaryOffender);
        setSelected({
          age: primaryOffender.id || null,
          build: primaryOffender.id || null,
          gender: primaryOffender.id || null,
          hair: primaryOffender.id || null,
          name: primaryOffender.id || null,
          race: primaryOffender.id || null,
          dateOfBirth: primaryOffender.id || null,
          dateSource: primaryOffender.id || null,
        });
      }
    }
    if (data?.offenders) {
      setOffenders(data.offenders);
      // const offenderIds = new Set(offenders.map(({ id }) => id));
      // if (query.get('similarOffenders')) {
      //   setOffenders(data.offenders);
      // } else {
      //   // ????
      //   setOffenders([
      //     ...offenders,
      //     ...data.offenders.filter(({ id }) => !offenderIds.has(id)),
      //   ]);
      // }
    }
  }, [data]);
  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };

  const addOffenders = (value: OffenderData) => {
    console.log(value);
    setOffenders([
      // @ts-expect-error Date or null
      ...offenders,
      {
        id: value.id,
        images: value.images || [],
        tags: value.tags,
        // @ts-expect-error Date or null
        updatedAt: value.updatedAt,
        age: value.age,
        build: value.build,
        dateOfBirth: value.dateOfBirth,
        dateSource: value.dateSource,
        gender: value.gender,
        hair: value.hair,
        lastActive: {
          id: value.lastActive?.id || '',
          dayTime: value.lastActive?.dayTime || '',
        },
        name: value.name,
        peculiarities: value.peculiarities,
        race: value.race,
      },
    ]);

    const getPeculiarities = () => {
      if (value.peculiarities) {
        if (!preview.peculiarities) return value.peculiarities;
        return `${preview.peculiarities} ${value.peculiarities}`;
      }

      return preview.peculiarities;
    };

    setPreview({
      ...preview,
      images: value.images
        ? [...preview.images, ...value.images]
        : preview.images,
      tags: value.tags ? [...preview.tags, ...value.tags] : preview.tags,
      peculiarities: value.peculiarities
        ? getPeculiarities()
        : preview.peculiarities,
    });
  };

  const toggleSelected = (offender: Offender, field: OffenderField) => {
    setSelected({
      ...selected,
      [field]: offender.id,
    });
    setPreview({
      ...preview,
      [field]: offender[field],
    });
  };

  const toggleSelectedImages = (offender: string) => {
    if (selectedImages.includes(offender)) {
      setSelectedImages(selectedImages.filter((item) => item !== offender));
    } else {
      setSelectedImages([...selectedImages, offender]);
    }
  };

  const removeOffender = (offender: Offender) => {
    setOffenders(offenders.filter((item) => item.id !== offender.id));
    const first = offenders.find((item) => item.id !== offender.id);
    const ageSelected = selected.age === offender.id;
    const buildSelected = selected.build === offender.id;
    const hairSelected = selected.hair === offender.id;
    const dateSelected = selected.dateOfBirth === offender.id;
    const dateSourceSelected = selected.dateSource === offender.id;
    const genderSelected = selected.gender === offender.id;
    const nameSelected = selected.name === offender.id;
    const raceSelected = selected.race === offender.id;

    setSelected({
      age: ageSelected ? first?.id || '' : selected.age,
      build: buildSelected ? first?.id || '' : selected.build,
      gender: genderSelected ? first?.id || '' : selected.gender,
      hair: hairSelected ? first?.id || '' : selected.hair,
      dateOfBirth: dateSelected ? first?.id || '' : selected.dateOfBirth,
      dateSource: dateSourceSelected ? first?.id || '' : selected.dateSource,
      name: nameSelected ? first?.id || '' : selected.name,
      race: raceSelected ? first?.id || '' : selected.race,
    });

    const imageIds = offender.images?.map(({ id }) => id);
    const tagIds = offender.tags?.map(({ id }) => id);
    setPreview({
      ...preview,
      age: ageSelected ? first?.age : preview.age,
      build: buildSelected ? first?.build : preview.build,
      dateOfBirth: dateSelected ? first?.dateOfBirth : preview.dateOfBirth,
      dateSource: dateSourceSelected ? first?.dateSource : preview.dateSource,
      gender: genderSelected ? first?.gender : preview.gender,
      hair: hairSelected ? first?.hair : preview.hair,
      images: preview.images.filter(({ id }) => !imageIds.includes(id)),
      name: nameSelected ? first?.name : preview.name,
      peculiarities: offenders
        .filter((item) => item.id !== offender.id)
        .map(({ peculiarities }) => peculiarities)
        .toString(),
      race: raceSelected ? first?.race : preview.race,
      tags: preview.tags.filter(({ id }) => !tagIds.includes(id)),
    });
  };

  const onSubmitImages = () => {
    const newOffenders = offenders.filter(({ id }) =>
      selectedImages.includes(id)
    );
    setOffenders(newOffenders);

    if (newOffenders.length > 0)
      setPreview({
        ...newOffenders[0],
        images: newOffenders.flatMap((offender) => offender.images),
      });

    setMode('column');
    setSelectedImages([]);
  };

  const [mergeOffenders] = useMergeOffendersMutation({
    onCompleted: () => {
      navigate('/app/offenders');
    },
  });

  const onMerge = () => {
    // const mainOffender = {
    //   ...preview,
    //   images: preview.images.map(({ id }) => ({ id })),
    //   tags: preview.tags.map(({ id }) => ({ id })),
    // };
    // const otherOffenders = offenders.filter(({ id }) => id !== preview.id);

    void mergeOffenders({
      variables: {
        data: {
          name: preview.name,
          peculiarities: preview.peculiarities,
          race: preview.race,
          tags: preview.tags.map(({ id }) => id),
          age: preview.age,
          build: preview.build,
          dateOfBirth: preview.dateOfBirth,
          gender: preview.gender,
          hair: preview.hair,
          mainOffenderId: offenderId || '',
          offenderIds: offenders
            .map(({ id }) => id)
            .filter((id) => id !== preview.id),
          imageIds: preview.images.map(({ id }) => id),
        },
      },
    });
  };

  return {
    offenders,
    preview,
    addOffender,
    toggleAddOffender,
    addOffenders,
    toggleSelected,
    selected,
    removeOffender,
    onMerge,
    mode,
    setMode,
    toggleSelectedImages,
    selectedImages,
    onSubmitImages,
  };
};

export default compareIncident;
