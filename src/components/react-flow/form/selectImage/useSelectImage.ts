import { useViewInvestigationQuery } from 'graphql/generated';

interface Props {
  onClose: () => void;
  onSelect: (value: string) => void;
  investigationId: string;
}

export interface ImagesData {
  offenders: {
    name: string;
    images: {
      url: string;
      optimisedPersisted?: string;
    }[];
  }[];
}

interface Return {
  data: ImagesData | undefined;
  loading: boolean;
  onSubmit: (item: { key: string }) => void;
}

const useSelectImage = ({
  onClose,
  onSelect,
  investigationId,
}: Props): Return => {
  const { data: ImportData, loading } = useViewInvestigationQuery({
    variables: {
      where: {
        id: investigationId,
      },
    },
  });

  const data = ImportData?.investigation?.offenders
    ? {
        offenders: ImportData?.investigation?.offenders.map((offender) => ({
          name: offender.name || '',
          images: offender.images.map((image) => ({
            url: image.optimisedPersisted || '',
          })),
        })),
      }
    : undefined;

  const onSubmit = (item: { key: string }) => {
    onSelect(item.key);
    onClose();
  };

  return {
    onSubmit,
    data,
    loading,
  };
};

export default useSelectImage;
