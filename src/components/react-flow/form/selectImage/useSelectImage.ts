import { useViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';

interface Props {
  investigationId: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}

export interface ImagesData {
  offenders: {
    images: {
      optimisedPersisted?: string;
      url: string;
    }[];
    name: string;
  }[];
}

interface Return {
  data: ImagesData | undefined;
  loading: boolean;
  onSubmit: (item: { key: string }) => void;
}

const useSelectImage = ({
  investigationId,
  onClose,
  onSelect,
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
          images: offender.images.map((image) => ({
            url: image.optimisedPersisted || '',
          })),
          name: offender.name || '',
        })),
      }
    : undefined;

  const onSubmit = (item: { key: string }) => {
    onSelect(item.key);
    onClose();
  };

  return {
    data,
    loading,
    onSubmit,
  };
};

export default useSelectImage;
