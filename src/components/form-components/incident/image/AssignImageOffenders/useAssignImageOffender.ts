import type { UploadFile } from 'antd/lib/upload/interface';
import type { OffenderData } from 'types/DataType';

import { useEffect, useState } from 'react';

// interface OffenderData {
//   id: string;
//   name?: string | null;
//   age?: Age | null;
//   gender?: Gender | null;
//   race?: Race | null;
//   build?: Build | null;
//   dateOfBirth?: Date | null;
//   hair?: string | null;
//   dateSource?: string | null;
//   peculiarities?: string | null;
//   approved?: boolean | null;
//   groups?:
//     | {
//         id: string;
//         name: string;
//       }[]
//     | undefined;
//   images?: {
//     id: string;
//     optimised?: string | null;
//     url?: string | null;
//     fileName?: string | null;
//     type?: string | null;
//     new?: boolean;
//   }[];
//   imageUid?: string[] | undefined;
// }

// interface OffenderDataPayload extends OffenderData {
//   new: boolean;
//   existing: boolean;
//   edited: boolean;
// }

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: null | string | undefined;
  }[];
}

interface Props {
  image: Image | undefined;
  offenderData: OffenderData[];
  onSubmit: (data: { image: Image; offenders: OffenderData[] }) => void;
}

interface Return {
  addExistingOffender: boolean;
  addOffender: boolean;
  offendersData: OffenderData[];
  onAddOffender: (value: OffenderData, existing: boolean) => void;
  selected: string[];
  submitImage: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddOffender: () => void;
  toggleOffender: (id: string) => void;
}

const useAssignImageOffender = ({
  image,
  offenderData,
  onSubmit,
}: Props): Return => {
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [addOffender, setAddOffender] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (image?.offenders) setSelected(image.offenders.map(({ id }) => id));
  }, [image]);

  useEffect(() => {
    setOffendersData(offenderData);
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

  const onAddOffender = (data: OffenderData, existing: boolean) => {
    setOffendersData([
      ...offendersData,
      {
        ...data,
        edited: false,
        existing,
        new: !existing,
      },
    ]);
    toggleOffender(data.id);
  };

  const isOffenderData = (
    item: OffenderData | undefined
  ): item is OffenderData => !!item;

  const submitImage = () => {
    setSelected([]);
    if (image)
      onSubmit({
        image: {
          ...image,
          offenders: selected
            .map((id) => offendersData.find((offender) => offender.id === id))
            .filter(isOffenderData),
        },
        offenders: selected
          .map((id) => offendersData.find((offender) => offender.id === id))
          .filter(isOffenderData)
          .map((offender) => {
            let images: OffenderData['images'] = [];
            if (offender.images) images = offender.images;

            return {
              ...offender,
              images: [
                ...images,
                {
                  fileName: image.fileName,
                  id: image.uid,
                  new: true,
                  optimised: image.url,
                  type: image.type,
                  url: image.url,
                },
              ],
            };
          }),
      });
  };

  return {
    addExistingOffender,
    addOffender,
    offendersData,
    onAddOffender,
    selected,
    submitImage,
    toggleAddExistingOffender,
    toggleAddOffender,
    toggleOffender,
  };
};

export default useAssignImageOffender;
