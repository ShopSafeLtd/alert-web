import { useEffect, useState } from 'react';
import type { Age, Build, Gender, Race } from 'graphql/generated';
import type { UploadFile } from 'antd/lib/upload/interface';

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

interface OffenderDataPayload extends OffenderData {
  new: boolean;
  existing: boolean;
  edited: boolean;
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
}

interface Props {
  offenderData: OffenderDataPayload[];
  image: Image | undefined;
  onSubmit: (data: { image: Image; offenders: OffenderDataPayload[] }) => void;
}

interface Return {
  offendersData: OffenderDataPayload[];
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  onAddOffender: (value: OffenderData, existing: boolean) => void;
  toggleOffender: (id: string) => void;
  selected: string[];
  submitImage: () => void;
}

const useAssignImageOffender = ({
  offenderData,
  image,
  onSubmit,
}: Props): Return => {
  const [offendersData, setOffendersData] = useState<OffenderDataPayload[]>([]);
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
    item: OffenderDataPayload | undefined
  ): item is OffenderDataPayload => !!item;

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
  };

  return {
    offendersData,
    addExistingOffender,
    toggleAddExistingOffender,
    addOffender,
    toggleAddOffender,
    onAddOffender,
    toggleOffender,
    selected,
    submitImage,
  };
};

export default useAssignImageOffender;
