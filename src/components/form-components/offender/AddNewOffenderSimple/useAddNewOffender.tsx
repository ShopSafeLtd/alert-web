/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import type { AddOffenderData } from '#/components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { OffenderSettingsType } from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { Age, Build, Gender, Height, IdSource, Race } from 'graphql/types';

import { useStoreState } from '#/state';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { Form } from 'antd';
import { useBusinessOffenderSettingsQuery } from 'graphql/businesses/queries/__generated__/business-offender-settings.generated';
import { useCreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import { ImagePosition } from 'graphql/types';
import { useState } from 'react';

import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageValue } from '../../ImageSelect/ImageSelect.view';

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
  addressAlias?: string;
  age: Age;
  ageCheck?: boolean;
  alias?: string[];
  build: Build;
  building?: string;
  comment: string;
  county?: string;
  dateOfBirth: Date;
  dateSource: string;
  gender: Gender;
  groups: string[];
  hair: string;
  height: Height;
  idSource?: IdSource;
  idVerified?: boolean;
  images: ImageValue[];
  knowAddress?: boolean;
  name: string;
  peculiarities: string;
  postcode?: string;
  race: Race;
  street?: string;
  townCity?: string;
}

interface Props {
  crimeGroupId?: string;
  groupsIds?: string[];
  incidentBusinessId?: string;
  incidentId?: string;
  investigationId?: string;
  onAddOffender?: (value: AddOffenderData) => void;
  onClose: () => void;
  onCompleted?: () => void;
  onImagesUploaded?: (values: StateImageData[]) => void;
  update?: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  vehicleId?: string;
}
interface Return {
  ageCheck: boolean | undefined;
  form: FormInstance<FormData>;
  idVerified: boolean | undefined;
  knowAddress: boolean | undefined;
  loading: boolean;
  offenderSettings: OffenderSettingsType | undefined;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setUploading: (value: boolean) => void;
  uploading: boolean;
}

const useAddNewOffender = ({
  crimeGroupId,
  groupsIds,
  incidentBusinessId,
  incidentId,
  investigationId,
  onAddOffender,
  onClose,
  onCompleted,
  onImagesUploaded,
  update: updateOffender,
  vehicleId,
}: Props): Return => {
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userBusinessId = useStoreState((state) => state.user.businesses[0].id);
  const businessId = incidentBusinessId || userBusinessId;
  const [saving, setSaving] = useState(false);

  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);
  const knowAddress = Form.useWatch('knowAddress', form);

  const { data: businessData, loading } = useBusinessOffenderSettingsQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        id: businessId,
      },
    },
  });
  const [createOffender] = useCreateSimpleOffenderMutation({
    onCompleted,
    onError: () => {
      errorNotification();
    },
    update: updateOffender,
  });
  const onSubmit = (data: FormData) => {
    setSaving(true);

    const imageData = data.images.map((item) => ({
      blurFaces:
        item.blurFaces && item.blurFaces.length > 0
          ? item.blurFaces
          : undefined,
      // type: item.file?.response && item.file.response[0].mimetype,
      fileName: item.fileName,
      id: item.id || '',
      isFace: item.isFace || false,
      // fileName: item.file?.response && item.file.response[0].blobName,
      new: !!item.file || item.new,
      optimised: item.optimised,
      policeImage: item.policeImage || false,
      position: item.position,
      primary: item.primary || false,
      rotation: item.rotation,
      totalFaces: item.totalFaces,
      type: item.type,
      url: item.url,
    }));

    if (onAddOffender) {
      onAddOffender({
        address: data.knowAddress
          ? {
              alias: data.addressAlias,
              building: data.building,
              county: data.county,
              postcode: data.postcode || '',
              street: data.street || '',
              townCity: data.townCity || '',
            }
          : undefined,
        age: ageCheck ? null : data.age || null,
        alias:
          data.alias && data.alias.length > 0
            ? [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))]
            : [],
        build: data.build || null,
        comment: data.comment || null,
        dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
        dateSource: ageCheck ? data.dateSource || null : null,
        gender: data.gender || null,
        hair: data.hair || null,
        height: data.height || null,
        id: Math.floor(Math.random() * 1000).toString(),
        idSource: data.idSource,
        idVerified: data.idVerified,
        images: imageData,
        knowAddress: data.knowAddress,
        name: data.name || 'Unidentified Offender',
        peculiarities: data.peculiarities || null,
        race: data.race || null,
        // groupIds: data.groups || [],
      });
    } else {
      void createOffender({
        variables: {
          data: {
            address: data.knowAddress
              ? {
                  alias: data.addressAlias,
                  building: data.building,
                  county: data.county,
                  postcode: data.postcode,
                  street: data.street,
                  townCity: data.townCity,
                }
              : undefined,
            age: data.age || null,
            alias:
              data.alias && data.alias.length > 0
                ? [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))]
                : [],
            build: data.build || null,
            comment: data.comment || null,
            crimeGroups: crimeGroupId
              ? { connect: [{ id: crimeGroupId }] }
              : undefined,
            dateOfBirth: data.dateOfBirth || null,
            dateSource: data.dateSource || null,
            gender: data.gender || null,
            groups: {
              connect:
                data.groups && data.groups.length > 0
                  ? data.groups.map((id) => ({ id }))
                  : groupsIds?.map((id) => ({ id })) || [],
            },
            hair: data.hair || null,
            height: data.height || null,
            idSource: data.idSource,
            idVerified: data.idVerified,
            image:
              data.images && data.images.length > 0
                ? {
                    connect: imageData
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: imageData
                      ?.filter((image) => image.new)
                      .map((item) => ({
                        blurFaces: item.blurFaces,
                        isFace: item.isFace,
                        policeImage: item.policeImage,
                        position: item.position,
                        primary: item.primary,
                        rotation: item.rotation || 0,
                        totalFaces: item.totalFaces || 0,
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {},
            incidentId: incidentId || null,
            investigationId: investigationId || null,
            name: data.name,
            peculiarities: data.peculiarities || null,
            race: data.race || null,
            scheme: schemeId,
            vehicles: vehicleId ? { connect: [{ id: vehicleId }] } : undefined,
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
              blurFaces:
                image.blurFaces && image.blurFaces.length > 0
                  ? image.blurFaces
                  : undefined,
              fileName: image.file?.response?.[0].blobName,
              isFace: image.isFace || false,
              policeImage: false,
              position: ImagePosition.CenterCenter,
              primary: false,
              rotation: 0,
              totalFaces: image.totalFaces || 0,
              type: image.file?.response?.[0].mimetype,
              url: image.file?.response?.[0].url,
            }) as StateImageData
        )
      );
    }
  };

  return {
    ageCheck,
    form,
    idVerified,

    knowAddress,
    loading,
    offenderSettings: businessData?.business.offenderSettings,
    onSubmit,
    saving,

    setUploading,
    uploading,
  };
};

export default useAddNewOffender;
