import type { CctvRecordData } from 'types/DataType';

interface Props {
  update: (value: Omit<CctvRecordData, 'id'>) => void;
}

interface Return {
  onSubmit: (value: Omit<CctvRecordData, 'id'>) => void;
}

const useAddCctvRecord = ({ update }: Props): Return => {
  const onSubmit = (value: Omit<CctvRecordData, 'id'>) => {
    update({
      cameraNumber: value.cameraNumber,
      description: value.description,
      endTime: value.endTime,
      showFace: !!value.showFace,
      showIncident: !!value.showIncident,
      startTime: value.startTime,
    });
  };

  return {
    onSubmit,
  };
};

export default useAddCctvRecord;
