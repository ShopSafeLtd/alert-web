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
  const { loading } = useViewInvestigationQuery({
    variables: {
      where: {
        id: investigationId,
      },
    },
  });

  // Note: Investigation query doesn't fetch offenders field, only totalOffenders count
  // This component is currently unable to fetch offender images for investigations
  const data = undefined;

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
