import { useState } from 'react';
import { Age, Gender, Race, Build } from 'graphql/generated';

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
}
interface Props {
  onClose: () => void;
  update: (value: OffenderData[] | undefined) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
}

const useAddOffender = ({ onClose, update }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);

  const onSubmit = (data: FormData) => {
    setSaving(true);
    update([
      {
        id: Math.floor(Math.random() * 1000).toString(),
        name: data.name || 'Unidentified Offender',
        gender: data.gender || null,
        race: data.race || null,
        build: data.build || null,
        hair: data.hair || null,
        peculiarities: data.peculiarities || null,
        age: ageCheck ? null : data.age || null,
        dateSource: ageCheck ? data.dateSource || null : null,
        dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
      },
    ]);

    onClose();
    setSaving(false);
  };

  return {
    onSubmit,
    saving,
    ageCheck,
    setAgeCheck,
  };
};

export default useAddOffender;
