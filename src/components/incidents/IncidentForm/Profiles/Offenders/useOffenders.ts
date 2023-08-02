import { useState, useEffect } from 'react';
import { Age, Build, Gender, Height, Race } from 'graphql/generated';
import type { IdSource } from 'graphql/generated';
import update from 'immutability-helper';

export interface AddOffenderData {
  id: string;
  reference?: number | null;
  alias?: string[] | null;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  height?: Height | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  comment?: string | null;
  idVerified?: boolean;
  idSource?: IdSource;
  images?: {
    id: string;
    url?: string | null | undefined;
    optimised?: string | null | undefined;
    boundingBox?: {
      height: string;
      left: string;
      top: string;
      width: string;
    };
  }[];
}

export interface StateOffenderData extends AddOffenderData {
  new: boolean;
  existing: boolean;
  edited: boolean;
  blank: boolean;
  confirmedInIncident: boolean;
}

interface Props {
  value?: StateOffenderData[];
  onChange?: (value: StateOffenderData[]) => void;
}

interface Return {
  offenders: StateOffenderData[];
  onAddOffenders: (values: AddOffenderData[], existing: boolean) => void;
  onUpdateOffender: (value: AddOffenderData) => void;
  onRemoveOffender: (id: string) => void;
  onConfirmOffender: (id: string) => void;
  toggleNoOffenders: () => void;
  setMatchExistingOpen: (value: StateOffenderData | null) => void;
  setUpdateOpen: (value: StateOffenderData | null) => void;
  onAddBlankOffenders: (count: number) => void;
  onMatchOffender: (value: AddOffenderData) => void;
  noOffenders: boolean;
  matchExistingOpen: StateOffenderData | null;
  updateOpen: StateOffenderData | null;
  mergeActive: string | null;
  toggleMerge: (value: string | null) => void;
  toggleMergeSelected: (value: string) => void;
  mergeSelected: string | null;
  onMerge: () => void;
}

const useOffenders = ({ value, onChange }: Props): Return => {
  const [pristine, setPristine] = useState(true);
  const [offenders, setOffenders] = useState<StateOffenderData[]>([]);

  const [matchExistingOpen, setMatchExistingOpen] =
    useState<StateOffenderData | null>(null);
  const [updateOpen, setUpdateOpen] = useState<StateOffenderData | null>(null);
  const [noOffenders, setNoOffenders] = useState(false);
  const [mergeActive, toggleMerge] = useState<string | null>(null);
  const [mergeSelected, setMergeSelected] = useState<string | null>(null);

  useEffect(() => {
    if (value && value.length !== offenders.length) {
      setOffenders(value);
      setPristine(false);
    }
  }, [value]);

  useEffect(() => {
    if (onChange && !pristine) onChange(offenders);
  }, [offenders]);

  const onAddOffenders = (
    values: AddOffenderData[],
    existing: boolean,
    blank = false
  ) => {
    const formattedOffenders: StateOffenderData[] = values.map(
      (offender): StateOffenderData => ({
        ...offender,
        images: offender.images || [],
        edited: false,
        confirmedInIncident: !blank,
        new: !existing,
        existing,
        blank,
      })
    );

    setOffenders([...offenders, ...formattedOffenders]);
    setPristine(false);
  };

  const onUpdateOffender = (newData: AddOffenderData) => {
    const currentData = offenders.find(({ id }) => id === newData.id);
    if (currentData)
      setOffenders(
        update<StateOffenderData[]>(offenders, {
          [offenders.findIndex((offender) => offender.id === newData.id)]: {
            $set: {
              ...currentData,
              height: newData.height,
              alias: newData.alias,
              comment: newData.comment,
              age: newData.age,
              build: newData.build,
              hair: newData.hair,
              dateOfBirth: newData.dateOfBirth,
              gender: newData.gender,
              race: newData.race,
              peculiarities: newData.peculiarities,
              dateSource: newData.dateSource,
              name: newData.name,
              images: newData.images,
              idSource: newData.idSource,
              idVerified: newData.idVerified,
              edited: !currentData.new,
              blank: false,
            },
          },
        })
      );
  };

  const onConfirmOffender = (id: string) => {
    setOffenders(
      update<StateOffenderData[]>(offenders, {
        [offenders.findIndex((offender) => offender.id === id)]: {
          confirmedInIncident: {
            $set: true,
          },
          blank: {
            $set: true,
          },
        },
      })
    );
  };

  const onRemoveOffender = (id: string) => {
    setOffenders(offenders.filter((offender) => offender.id !== id));
  };

  const toggleNoOffenders = () => {
    if (!noOffenders) setNoOffenders(true);
    if (onChange) onChange([]);
  };
  const onAddBlankOffenders = (count: number) => {
    const data: AddOffenderData[] = Array.from({ length: count }, () => ({
      id: Math.floor(Math.random() * 1000).toString(),
      name: 'Unidentified Offender',
      confirmedInIncident: true,
      gender: Gender.Unknown,
      age: Age.Unknown,
      race: Race.Unknown,
      height: Height.Unknown,
      build: Build.Unknown,
      images: [],
    }));
    setNoOffenders(false);
    onAddOffenders(data, false);
  };

  const onMatchOffender = (data: AddOffenderData) => {
    if (matchExistingOpen) {
      const ageUpdated =
        data.age === Age.Unknown &&
        !!matchExistingOpen.age &&
        matchExistingOpen.age !== Age.Unknown;
      const buildUpdated =
        data.build === Build.Unknown &&
        !!matchExistingOpen.build &&
        matchExistingOpen.build !== Build.Unknown;
      const hairUpdated = !data.hair && !!matchExistingOpen.hair;
      const dateOfBirthUpdated =
        data.dateOfBirth && !!matchExistingOpen.dateOfBirth;
      const genderUpdated =
        data.gender === Gender.Unknown &&
        !!matchExistingOpen.gender &&
        matchExistingOpen.gender !== Gender.Unknown;
      const raceUpdated =
        data.race === Race.Unknown &&
        !!matchExistingOpen.race &&
        matchExistingOpen.race !== Race.Unknown;
      const peculiaritiesUpdated =
        !data.peculiarities && !!matchExistingOpen.peculiarities;
      const dateSourceUpdated =
        !data.dateSource && !!matchExistingOpen.dateSource;
      const nameUpdated =
        data.name === 'Unidentified Offender' && !!matchExistingOpen.name;

      const newImages = matchExistingOpen.images || [];
      const existingImages = data.images || [];

      setOffenders(
        update<StateOffenderData[]>(offenders, {
          [offenders.findIndex(
            (offender) => offender.id === matchExistingOpen.id
          )]: {
            $set: {
              ...matchExistingOpen,
              id: data.id,
              age: ageUpdated ? matchExistingOpen.age : data.age,
              build: buildUpdated ? matchExistingOpen.build : data.build,
              hair: hairUpdated ? matchExistingOpen.build : data.hair,
              dateOfBirth: dateOfBirthUpdated
                ? matchExistingOpen.dateOfBirth
                : data.dateOfBirth,
              gender: genderUpdated ? matchExistingOpen.gender : data.gender,
              race: raceUpdated ? matchExistingOpen.race : data.race,
              peculiarities: peculiaritiesUpdated
                ? matchExistingOpen.peculiarities
                : data.peculiarities,
              dateSource: dateSourceUpdated
                ? matchExistingOpen.dateSource
                : data.dateSource,
              name: nameUpdated ? matchExistingOpen.name : data.name,
              images: [...newImages, ...existingImages],
              new: false,
              existing: true,
              blank: false,
              edited:
                ageUpdated ||
                buildUpdated ||
                hairUpdated ||
                dateOfBirthUpdated ||
                raceUpdated ||
                peculiaritiesUpdated ||
                dateSourceUpdated ||
                nameUpdated,
            },
          },
        })
      );
    }
  };

  const toggleMergeSelected = (id: string) => {
    if (mergeSelected === id) {
      setMergeSelected(null);
    } else {
      setMergeSelected(id);
    }
  };

  const onMerge = () => {
    const offenderOne = offenders.find(({ id }) => id === mergeSelected);
    const offenderTwo = offenders.find(({ id }) => id === mergeActive);

    if (offenderOne && offenderTwo) {
      const offenderOneImages = offenderOne.images || [];
      const offenderTwoImages = offenderTwo.images || [];
      setMergeSelected(null);
      toggleMerge(null);
      setOffenders(
        update<StateOffenderData[]>(offenders, {
          [offenders.findIndex(({ id }) => id === mergeSelected)]: {
            $set: {
              id: offenderOne.id,
              age:
                offenderOne.age && offenderOne.age !== Age.Unknown
                  ? offenderOne.age
                  : offenderTwo.age,
              build: offenderOne.build,
              images: [...offenderOneImages, ...offenderTwoImages],
              existing: offenderOne.existing,
              blank: offenderOne.blank,
              confirmedInIncident: offenderOne.confirmedInIncident,
              name: offenderOne.name,
              idVerified: offenderOne.idVerified,
              idSource: offenderOne.idSource,
              dateSource: offenderOne.dateSource,
              race: offenderOne.race,
              peculiarities:
                offenderOne.peculiarities || offenderTwo.peculiarities,
              gender:
                offenderOne.gender && offenderOne.gender !== Gender.Unknown
                  ? offenderOne.gender
                  : offenderTwo.gender,
              dateOfBirth: offenderOne.dateOfBirth,
              hair: offenderOne.hair,
              comment: offenderOne.comment,
              alias: offenderOne.alias,
              height: offenderOne.height,
              new: offenderOne.new,
              edited: offenderOne.edited,
              reference: offenderOne.reference,
            },
          },
        }).filter(({ id }) => id !== offenderTwo.id)
      );
    }
  };

  return {
    offenders,
    onAddOffenders,
    onUpdateOffender,
    onRemoveOffender,
    setMatchExistingOpen,
    setUpdateOpen,
    onAddBlankOffenders,
    toggleNoOffenders,
    noOffenders,
    onMatchOffender,
    matchExistingOpen,
    updateOpen,
    onConfirmOffender,
    mergeActive,
    toggleMerge,
    toggleMergeSelected,
    mergeSelected,
    onMerge,
  };
};

export default useOffenders;
