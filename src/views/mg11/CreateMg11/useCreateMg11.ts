import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import { useCreateMg11Mutation } from 'graphql/generated';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreState } from 'state';

const { useForm } = Form;

export interface FormData {
  statement?: string;
  address?: string;
  postcode?: string;
  homeTel?: string;
  workTel?: string;
  mobileTel?: string;
  email?: string;
  name?: string;
  age?: string;
  urn?: string;
  occupation?: string;
  visualRecording?: string;
  prefContact?: string;
  gender?: string;
  dobPlace?: string;
  formerName?: string;
  height?: string;
  ethnicity?: string;
  availability?: string;
  likelyToAttend?: string;
  likelyToAttendReason?: string;
  specialMeasures?: string;
  careNeeds?: string;
  careNeedsDetails?: string;
  station?: string;
  statementWhereWhen?: string;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  form: FormInstance<FormData>;
}

const useCreateMg11 = (): Return => {
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const { id: incidentId } = useParams();

  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const [createMg11] = useCreateMg11Mutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Created!',
        description:
          'The Mg11 has been created and sent to the witness to sign!',
        placement: 'bottomRight',
      });
      navigate(`/app/incidents/view/${incidentId || ''}`);
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    createMg11({
      variables: {
        schemeId,
        data: {
          ...data,
          likelyToAttend: data.likelyToAttend === 'true',
          specialMeasures: data.specialMeasures === 'true',
          careNeeds: data.careNeeds === 'true',
          visualRecording: data.visualRecording === 'true',
          incident: {
            connect: {
              id: incidentId,
            },
          },
          createdBy: {
            connect: {
              id: userId,
            },
          },
        },
      },
    }).finally(() => {
      setSaving(false);
    });
  };

  return {
    onSubmit,
    saving,
    form,
  };
};

export default useCreateMg11;
