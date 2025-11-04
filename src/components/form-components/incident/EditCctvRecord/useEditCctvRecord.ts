import type { CctvRecordData } from 'types/DataType';

interface Props {
  data: CctvRecordData;
  update: (value: CctvRecordData) => void;
}

interface Return {
  onSubmit: (value: CctvRecordData) => void;
}

const useEditCctvRecord = ({ data, update }: Props): Return => {
  const onSubmit = (value: CctvRecordData) => {
    update({
      ...data,
      description: value.description,
      endTime: value.endTime,
      showFace: value.showFace,
      showIncident: value.showIncident,
      startTime: value.startTime,
    });
  };

  return {
    onSubmit,
  };
};

export default useEditCctvRecord;
