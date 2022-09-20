import { useEffect, useState } from 'react';
import { Age, Build, Gender, Race } from 'graphql/generated';
import { UploadFile } from 'antd/lib/upload/interface';

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
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
}

interface Props {
  offenderData: OffenderData[];
  image: Image | undefined;
  onSubmit: (data: { image: Image; offenders: OffenderData[] }) => void;
}

interface Return {
  offenders: OffenderData[];
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  updateOffenders: (data: OffenderData[] | undefined) => void;
  toggleOffender: (id: string) => void;
  selected: string[];
  submitImage: () => void;
}

const useAssignImageOffender = ({
  offenderData,
  image,
  onSubmit,
}: Props): Return => {
  const [offenders, setOffenders] = useState<OffenderData[]>([]);
  const [addOffender, setAddOffender] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (image?.offenders) setSelected(image.offenders.map(({ id }) => id));
  }, [image]);

  useEffect(() => {
    setOffenders(offenderData);
  }, [offenderData]);

  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };

  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };

  const toggleOffender = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((offender) => offender !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const updateOffenders = (data: OffenderData[] | undefined) => {
    if (data) {
      setOffenders([
        ...offenders,
        ...data.filter(
          ({ id }) => !offenders.map((offender) => offender.id).includes(id)
        ),
      ]);
      data.forEach(({ id }) => toggleOffender(id));
    }
  };

  const isOffenderData = (
    item: OffenderData | undefined
  ): item is OffenderData => !!item;

  const submitImage = () => {
    setSelected([]);
    if (image) {
      onSubmit({
        image: {
          ...image,
          offenders: selected
            .map((id) => offenders.find((offender) => offender.id === id))
            .filter(isOffenderData),
        },
        offenders: selected
          .map((id) => offenders.find((offender) => offender.id === id))
          .filter(isOffenderData)
          .map((offender) => {
            let images: OffenderData['images'] = [];
            if (offender.images) images = offender.images;
            return {
              ...offender,
              images: [
                ...images,
                {
                  id: image.uid,
                  new: true,
                  optimised: image.url,
                  url: image.url,
                  fileName: image.fileName,
                  type: image.type,
                },
              ],
            };
          }),
      });
    }
  };

  return {
    offenders,
    addExistingOffender,
    toggleAddExistingOffender,
    addOffender,
    toggleAddOffender,
    updateOffenders,
    toggleOffender,
    selected,
    submitImage,
  };
};

export default useAssignImageOffender;
