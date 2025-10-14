import type { CustomGalleryData } from 'types/DataType';

export interface FormData {
  description: string;
  name: string;
}

interface Props {
  data?: CustomGalleryData;
  update: (value: CustomGalleryData) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
}

const useAddCustomGallery = ({ data, update }: Props): Return => {
  const onSubmit = (value: FormData) => {
    update({
      description: value.description || '',
      id: data?.id || Math.floor(Math.random() * 1000).toString(),
      name: value.name,
    });
  };

  return {
    onSubmit,
  };
};
export default useAddCustomGallery;
