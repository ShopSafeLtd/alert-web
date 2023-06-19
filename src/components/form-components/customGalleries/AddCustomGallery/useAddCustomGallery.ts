import type { CustomGalleryData } from 'types/DataType';

interface FormData {
  name: string;
  description: string;
}

interface Props {
  update: (value: CustomGalleryData) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
}

const useAddOffenderWarning = ({ update }: Props): Return => {
  const onSubmit = (data: FormData) => {
    update({
      id: Math.floor(Math.random() * 1000).toString(),
      name: data.name,
      description: data.description || '',
    });
  };

  return {
    onSubmit,
  };
};
export default useAddOffenderWarning;
