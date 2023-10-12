import type { CustomGalleryData } from 'types/DataType';

export interface FormData {
  name: string;
  description: string;
}

interface Props {
  update: (value: CustomGalleryData) => void;
  data?: CustomGalleryData;
}

interface Return {
  onSubmit: (value: FormData) => void;
}

const useAddCustomGallery = ({ update, data }: Props): Return => {
  const onSubmit = (value: FormData) => {
    update({
      id: data?.id || Math.floor(Math.random() * 1000).toString(),
      name: value.name,
      description: value.description || '',
    });
  };

  return {
    onSubmit,
  };
};
export default useAddCustomGallery;
