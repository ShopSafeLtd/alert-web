import type { OffenderData } from '#/components/form-components/offender/AddExistingOffender/AddExistingOffender.container';
import type { ViewOffendersCompareQuery } from 'graphql/offenders/queries/__generated__/compare-offenders.generated';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useMergeOffendersMutation } from 'graphql/offenders/mutations/__generated__/merge-offenders.generated';
import { useViewOffendersCompareLazyQuery } from 'graphql/offenders/queries/__generated__/compare-offenders.generated';
import { Age, Build, Gender, Race } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

type Offenders = Exclude<
  ViewOffendersCompareQuery['offenders'],
  null | undefined
>;

type Offender = Offenders[number];

export type OffenderField =
  | 'age'
  | 'build'
  | 'dateOfBirth'
  | 'dateSource'
  | 'gender'
  | 'hair'
  | 'name'
  | 'peculiarities'
  | 'race';

export interface Selected {
  age: null | string;
  build: null | string;
  dateOfBirth: null | string;
  dateSource: null | string;
  gender: null | string;
  hair: null | string;
  name: null | string;
  race: null | string;
}

interface Return {
  addOffender: boolean;
  addOffenders: (value: OffenderData) => void;
  mode: 'column' | 'grid';
  offenders: Offender[];
  onMerge: () => void;
  onSubmitImages: () => void;
  preview: Offender;
  removeOffender: (offender: Offender) => void;
  selected: Selected;
  selectedImages: string[];
  setMode: (value: 'column' | 'grid') => void;
  toggleAddOffender: () => void;
  toggleSelected: (offender: Offender, field: OffenderField) => void;
  toggleSelectedImages: (value: string) => void;
}

const compareIncident = (): Return => {
  const { id: offenderId } = useParams();
  const query = useQuery();
  const navigate = useNavigate();
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const [mode, setMode] = useState<'column' | 'grid'>('column');
  const [addOffender, setAddOffender] = useState(false);
  const [offenders, setOffenders] = useState<Offender[]>([]);
  const [preview, setPreview] = useState<Offender>({
    age: Age.Unknown,
    build: Build.Unknown,
    gender: Gender.Unknown,
    hair: 'None',
    id: '',
    images: [],
    name: '',
    peculiarities: 'None',
    race: Race.Unknown,
    tags: [],
    updatedAt: new Date(),
  });
  const [selected, setSelected] = useState<Selected>({
    age: null,
    build: null,
    dateOfBirth: null,
    dateSource: null,
    gender: null,
    hair: null,
    name: null,
    race: null,
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
          groups: {
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
          id: {
            in: ids,
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
          dateOfBirth: primaryOffender.id || null,
          dateSource: primaryOffender.id || null,
          gender: primaryOffender.id || null,
          hair: primaryOffender.id || null,
          name: primaryOffender.id || null,
          race: primaryOffender.id || null,
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
      ...offenders,
      {
        age: value.age,
        build: value.build,
        dateOfBirth: value.dateOfBirth,
        dateSource: value.dateSource,
        gender: value.gender,
        hair: value.hair,
        id: value.id,
        images: value.images || [],
        lastActive: {
          dayTime: value.lastActive?.dayTime || '',
          id: value.lastActive?.id || '',
        },
        name: value.name,
        peculiarities: value.peculiarities,
        race: value.race,
        tags: value.tags,
        updatedAt: value.updatedAt,
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
      peculiarities: value.peculiarities
        ? getPeculiarities()
        : preview.peculiarities,
      tags: value.tags ? [...preview.tags, ...value.tags] : preview.tags,
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
      dateOfBirth: dateSelected ? first?.id || '' : selected.dateOfBirth,
      dateSource: dateSourceSelected ? first?.id || '' : selected.dateSource,
      gender: genderSelected ? first?.id || '' : selected.gender,
      hair: hairSelected ? first?.id || '' : selected.hair,
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
          age: preview.age,
          build: preview.build,
          dateOfBirth: preview.dateOfBirth,
          gender: preview.gender,
          hair: preview.hair,
          imageIds: preview.images.map(({ id }) => id),
          mainOffenderId: offenderId || '',
          name: preview.name,
          offenderIds: offenders
            .map(({ id }) => id)
            .filter((id) => id !== preview.id),
          peculiarities: preview.peculiarities,
          race: preview.race,
          tags: preview.tags.map(({ id }) => id),
        },
      },
    });
  };

  return {
    addOffender,
    addOffenders,
    mode,
    offenders,
    onMerge,
    onSubmitImages,
    preview,
    removeOffender,
    selected,
    selectedImages,
    setMode,
    toggleAddOffender,
    toggleSelected,
    toggleSelectedImages,
  };
};

export default compareIncident;
