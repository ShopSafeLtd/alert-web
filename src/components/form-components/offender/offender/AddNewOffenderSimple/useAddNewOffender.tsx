/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import type {
  Age,
  Build,
  CreateSimpleOffenderMutation,
  Gender,
  Height,
  IdSource,
  Race,
} from 'graphql/generated';
import {
  ImagePosition,
  useCreateSimpleOffenderMutation,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useStoreState } from 'state';
import type { AddOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageValue } from '../../../ImageSelect/ImageSelect.view';

// export interface AddOffenderData {
//   id: string;
//   reference?: number | null;
//   alias?: string[] | null;
//   name?: string | null;
//   age?: Age | null;
//   gender?: Gender | null;
//   race?: Race | null;
//   build?: Build | null;
//   height?: Height | null;
//   dateOfBirth?: Date | null;
//   hair?: string | null;
//   dateSource?: string | null;
//   peculiarities?: string | null;
//   comment?: string | null;
//   idVerified?: boolean;
//   idSource?: IdSource;
//   images?: {
//     id: string;
//     url?: string | null | undefined;
//     optimised?: string | null | undefined;
//     boundingBox?: {
//       height: string;
//       left: string;
//       top: string;
//       width: string;
//     };
//   }[];
// }

export interface FormData {
  name: string;
  alias?: string[];
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  height: Height;
  hair: string;
  peculiarities: string;
  comment: string;
  dateSource: string;
  dateOfBirth: Date;
  groups: string[];
  idVerified?: boolean;
  ageCheck?: boolean;
  idSource?: IdSource;
  images: ImageValue[];
  addressAlias?: string;
  building?: string;
  street?: string;
  townCity?: string;
  county?: string;
  postcode?: string;
}

interface Props {
  onClose: () => void;
  onCompleted?: () => void;
  update?: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  onAddOffender?: (value: AddOffenderData) => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
  incidentId?: string;
  investigationId?: string;
  vehicleId?: string;
  groupsIds?: string[];
}
interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
  form: FormInstance<FormData>;
  uploading: boolean;
  setUploading: (value: boolean) => void;
}

const useAddNewOffender = ({
  onClose,
  update: updateOffender,
  onAddOffender,
  onCompleted,
  onImagesUploaded,
  incidentId,
  investigationId,
  vehicleId,
  groupsIds,
}: Props): Return => {
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);
  const [createOffender] = useCreateSimpleOffenderMutation({
    onCompleted,
    onError: () => {
      errorNotification();
    },
    update: updateOffender,
  });
  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (onAddOffender) {
      onAddOffender({
        id: Math.floor(Math.random() * 1000).toString(),
        name: data.name || 'Unidentified Offender',
        alias:
          data.alias && data.alias.length > 0
            ? [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))]
            : [],
        gender: data.gender || null,
        race: data.race || null,
        build: data.build || null,
        hair: data.hair || null,
        height: data.height || null,
        peculiarities: data.peculiarities || null,
        comment: data.comment || null,
        age: ageCheck ? null : data.age || null,
        dateSource: ageCheck ? data.dateSource || null : null,
        dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
        idVerified: data.idVerified,
        idSource: data.idSource,
        images: data.images.map((item) => ({
          id: item.id || `${Math.random()}`,
          fileName: item.file?.response && item.file.response[0].blobName,
          type: item.file?.response && item.file.response[0].mimetype,
          url: item.url || '',
          position: item.position,
          primary: false,
          policeImage: item.policeImage || false,
          rotation: item.rotation,
          new: !!item.file,
        })),
        address:
          data.street && data.townCity && data.postcode
            ? {
                alias: data.addressAlias,
                building: data.building,
                street: data.street,
                townCity: data.townCity,
                county: data.county,
                postcode: data.postcode,
              }
            : undefined,
        // groupIds: data.groups || [],
      });
    } else {
      void createOffender({
        variables: {
          data: {
            name: data.name,
            alias:
              data.alias && data.alias.length > 0
                ? [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))]
                : [],
            idSource: data.idSource,
            idVerified: data.idVerified,
            gender: data.gender || null,
            race: data.race || null,
            build: data.build || null,
            height: data.height || null,
            hair: data.hair || null,
            peculiarities: data.peculiarities || null,
            comment: data.comment || null,
            age: data.age || null,
            dateSource: data.dateSource || null,
            dateOfBirth: data.dateOfBirth || null,
            groups: {
              connect:
                data.groups && data.groups.length > 0
                  ? data.groups.map((id) => ({ id }))
                  : groupsIds?.map((id) => ({ id })) || [],
            },
            scheme: schemeId,
            incidentId: incidentId || null,
            investigationId: investigationId || null,
            vehicles: vehicleId ? { connect: [{ id: vehicleId }] } : undefined,
            address:
              data.street && data.townCity && data.postcode
                ? {
                    alias: data.addressAlias,
                    building: data.building,
                    street: data.street,
                    townCity: data.townCity,
                    county: data.county,
                    postcode: data.postcode,
                  }
                : undefined,
            image:
              data.images && data.images.length > 0
                ? {
                    connect: data.images
                      ?.filter((image) => !image.file)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: data.images
                      ?.filter((image) => !!image.file)
                      .map((item) => ({
                        url: {
                          filename:
                            (item.file?.response &&
                              item.file.response[0].blobName) ||
                            '',
                          mimetype:
                            (item.file?.response &&
                              item.file.response[0].mimetype) ||
                            '',
                          url: item.url || '',
                        },
                        position: item.position,
                        primary: false,
                        policeImage: item.policeImage || false,
                        rotation: item.rotation || 0,
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {},
          },
        },
      });
    }
    setSaving(false);
    onClose();
    const uploadedImages = data.images?.filter((image) => image.file) || [];
    if (uploadedImages.length > 0 && onImagesUploaded) {
      onImagesUploaded(
        uploadedImages.map(
          (image) =>
            ({
              ...image.file,
              url: image.file?.response && image.file.response[0].url,
              fileName: image.file?.response && image.file.response[0].blobName,
              type: image.file?.response && image.file.response[0].mimetype,
              policeImage: false,
              primary: false,
              rotation: 0,
              position: ImagePosition.CenterCenter,
            } as StateImageData)
        )
      );
    }
  };

  return {
    onSubmit,
    saving,
    ageCheck,
    idVerified,
    form,
    uploading,
    setUploading,
  };
};

export default useAddNewOffender;
