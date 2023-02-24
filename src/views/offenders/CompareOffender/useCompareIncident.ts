import {
  Age,
  Build,
  Gender,
  Race,
  useViewOffenderCompareLazyQuery,
  ViewOffenderCompareQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OffenderData } from 'components/form-components/incident/offender/AddExistingOffender/AddExistingOffender.container';

type Offender = Exclude<ViewOffenderCompareQuery['offender'], undefined | null>;
export type OffenderField =
  | 'name'
  | 'age'
  | 'build'
  | 'gender'
  | 'name'
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
}

const compareIncident = (): Return => {
  const { id: offenderId } = useParams();
  const navigate = useNavigate();

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

  const [queryOffender, { data }] = useViewOffenderCompareLazyQuery();

  useEffect(() => {
    queryOffender({
      variables: {
        where: {
          id: offenderId,
        },
      },
    });
  }, [offenderId]);

  useEffect(() => {
    if (offenders.length === 0 && data?.offender) {
      setPreview(data?.offender);
      setSelected({
        age: data?.offender.id || null,
        build: data?.offender.id || null,
        gender: data?.offender.id || null,
        hair: data?.offender.id || null,
        name: data?.offender.id || null,
        race: data?.offender.id || null,
        dateOfBirth: data?.offender.id || null,
        dateSource: data?.offender.id || null,
      });
    }
    const offenderIds = offenders.map(({ id }) => id);
    if (data?.offender && !offenderIds.includes(data?.offender.id)) {
      setOffenders([...offenders, data.offender]);
    }
  }, [data]);

  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };

  const addOffenders = (value: OffenderData) => {
    setOffenders([
      ...offenders,
      {
        id: value.id,
        images: value.images || [],
        tags: value.tags,
        updatedAt: value.updatedAt,
        age: value.age,
        build: value.build,
        dateOfBirth: value.dateOfBirth,
        dateSource: value.dateSource,
        gender: value.gender,
        hair: value.hair,
        lastActive: value.lastActive,
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

  const removeOffender = (offender: Offender) => {
    setOffenders(offenders.filter((item) => item.id !== offender.id));
    const first = offenders.filter((item) => item.id !== offender.id)[0];
    const ageSelected = selected.age === offender.id;
    const buildSelected = selected.build === offender.id;
    const hairSelected = selected.hair === offender.id;
    const dateSelected = selected.dateOfBirth === offender.id;
    const dateSourceSelected = selected.dateSource === offender.id;
    const genderSelected = selected.gender === offender.id;
    const nameSelected = selected.name === offender.id;
    const raceSelected = selected.race === offender.id;

    setSelected({
      age: ageSelected ? first.id : selected.age,
      build: buildSelected ? first.id : selected.build,
      gender: genderSelected ? first.id : selected.gender,
      hair: hairSelected ? first.id : selected.hair,
      dateOfBirth: dateSelected ? first.id : selected.dateOfBirth,
      dateSource: dateSourceSelected ? first.id : selected.dateSource,
      name: nameSelected ? first.id : selected.name,
      race: raceSelected ? first.id : selected.race,
    });

    const imageIds = offender.images?.map(({ id }) => id);
    const tagIds = offender.tags?.map(({ id }) => id);
    setPreview({
      ...preview,
      age: ageSelected ? first.age : preview.age,
      build: buildSelected ? first.build : preview.build,
      dateOfBirth: dateSelected ? first.dateOfBirth : preview.dateOfBirth,
      dateSource: dateSourceSelected ? first.dateSource : preview.dateSource,
      gender: genderSelected ? first.gender : preview.gender,
      hair: hairSelected ? first.hair : preview.hair,
      images: preview.images.filter(({ id }) => !imageIds.includes(id)),
      name: nameSelected ? first.name : preview.name,
      peculiarities: offenders
        .filter((item) => item.id !== offender.id)
        .map(({ peculiarities }) => peculiarities)
        .toString(),
      race: raceSelected ? first.race : preview.race,
      tags: preview.tags.filter(({ id }) => !tagIds.includes(id)),
    });
  };

  const onMerge = () => {
    navigate('/app/offenders');
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
  };
};

export default compareIncident;
