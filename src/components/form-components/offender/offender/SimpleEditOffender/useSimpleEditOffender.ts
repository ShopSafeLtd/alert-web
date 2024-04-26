/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import type {
  Age,
  Build,
  Gender,
  Race,
  Height,
  IdSource,
  UpdateSimpleOffenderMutation,
} from 'graphql/generated';
import {
  useBusinessOffenderSettingsQuery,
  useUpdateSimpleOffenderMutation,
  ImagePosition,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { AddOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import { useStoreState } from '#/state';
import type { OffenderSettingsType } from '#/types/DataType';
import { useState } from 'react';
import type { ImageValue } from '../../../ImageSelect/ImageSelect.view';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';

interface OffenderImage {
  id: string;
  url?: string | null | undefined;
  optimised?: string | null | undefined;
}

export interface OffenderData {
  id: string;
  name?: string | null;
  alias?: string[] | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  height?: Height | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  comment?: string | null;
  idVerified?: boolean;
  idSource?: IdSource | null;
  images?: OffenderImage[] | null;
  knownFor?: string[] | null;
  targetedGoods?: string[] | null;
  infoSource?: string | null;
  justification?: string | null;
}

interface Props {
  onClose: () => void;
  data: OffenderData;
  onCompleted?: () => void;
  update?: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  onEditOffender?: (value: AddOffenderData) => void;
  onImagesUploaded?: (value: StateImageData[]) => void;
  incidentBusinessId?: string;
}

export interface FormData {
  name: string;
  alias?: string[];
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  height: Height;
  hair: string;
  ageCheck: boolean;
  peculiarities: string;
  comment: string;
  dateSource: string;
  dateOfBirth: Date;
  groups: string[];
  idVerified?: boolean;
  idSource?: IdSource;
  images: ImageValue[];
  knownFor: string[];
  targetedGoods: string[];
  justification: string;
  infoSource: string;
  knowAddress?: boolean;
  addressAlias?: string;
  building?: string;
  street?: string;
  townCity?: string;
  county?: string;
  postcode?: string;
}

interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
  offenderSettings: OffenderSettingsType | undefined;
  loading: boolean;
  saving: boolean;
  needJustification: boolean;
  uploading: boolean;
  setUploading: (value: boolean) => void;
  knowAddress: boolean | undefined;
}

const useEditOffender = ({
  data,
  onClose,
  onEditOffender,
  update,
  onImagesUploaded,
  onCompleted,
  incidentBusinessId,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);
  const knowAddress = Form.useWatch('knowAddress', form);
  const userBusinessId = useStoreState((state) => state.user.businesses[0].id);
  const businessId = incidentBusinessId || userBusinessId;
  const needJustification = useStoreState(
    (state) => state.scheme.needJustification
  );

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data: businessData, loading } = useBusinessOffenderSettingsQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        id: businessId,
      },
    },
  });
  const [updateOffender] = useUpdateSimpleOffenderMutation({
    onCompleted,
    onError: () => {
      errorNotification();
    },
    update,
  });
  const onSubmit = (value: FormData) => {
    setSaving(true);

    const imageData = value.images.map((item) => ({
      id: item.id || '',
      url: item.url,
      optimised: item.optimised,
      // fileName: ,
      // type: item.file?.response && item.file.response[0].mimetype,
      // fileName: item.file
      //   ? item.file?.response && item.file.response[0].blobName
      //   : item.fileName,
      // type: item.file
      //   ? item.file?.response && item.file.response[0].mimetype
      //   : item.type,
      fileName: item.fileName,
      type: item.type,
      position: item.position,
      primary: item.primary || false,
      policeImage: item.policeImage || false,
      rotation: item.rotation,
      new: !!item.file || item.new,
      isFace: item.isFace || false,
    }));

    const existingImageIds = data?.images?.map(({ id }) => id);
    const deleteIds = existingImageIds?.filter(
      (id) => !imageData?.map((el) => el.id).includes(id)
    );
    const alias =
      value.alias && value.alias.length > 0
        ? [...new Set(value.alias?.map((el) => el.trim().toLowerCase()))]
        : [];
    if (onEditOffender) {
      onEditOffender({
        ...data,
        name: value.name || 'Unidentified Offender',
        alias,
        gender: value.gender || null,
        race: value.race || null,
        build: value.build || null,
        hair: value.hair || null,
        height: value.height || null,
        peculiarities: value.peculiarities || null,
        comment: value.comment || null,
        age: ageCheck ? null : value.age || null,
        dateSource: ageCheck ? value.dateSource || null : null,
        dateOfBirth: ageCheck ? value.dateOfBirth || null : null,
        idVerified: value.idVerified,
        idSource: value.idSource || undefined,
        images: imageData,
        justification: value.justification || null,
        infoSource: value.infoSource || null,
        knownFor: value.knownFor,
        targetedGoods: value.targetedGoods,
        address: value.knowAddress
          ? {
              alias: value.addressAlias,
              building: value.building,
              street: value.street || '',
              townCity: value.townCity || '',
              county: value.county,
              postcode: value.postcode || '',
            }
          : undefined,
      });
    } else {
      void updateOffender({
        variables: {
          where: {
            id: data.id,
          },
          data: {
            name: { set: value.name },
            gender: { set: value.gender || null },
            race: { set: value.race || null },
            build: { set: value.build || null },
            height: { set: value.height || null },
            hair: { set: value.hair || 'Unknown' },
            peculiarities: { set: value.peculiarities || '' },
            age: { set: value.age || null },
            dateSource: { set: value.dateSource || null },
            dateOfBirth: { set: value.dateOfBirth || null },
            justification: { set: value.justification || null },
            infoSource: { set: value.infoSource || null },
            knownFor: { set: value.knownFor },
            targetedGoods: { set: value.targetedGoods },
            alias: { set: alias },
            addresses: {
              upsert: [
                {
                  update: {
                    alias: {
                      set: value.addressAlias,
                    },
                    building: { set: value.building },
                    street: { set: value.street },
                    townCity: { set: value.townCity },
                    county: { set: value.county },
                    postcode: { set: value.postcode },
                  },
                  create: {
                    alias: value.addressAlias,
                    building: value.building,
                    street: value.street,
                    townCity: value.townCity,
                    county: value.county,
                    postcode: value.postcode,
                  },
                },
              ],
            },
            images:
              value.images && value.images.length > 0
                ? {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                    connect: imageData
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: imageData
                      ?.filter((image) => image.new)
                      .map((item) => ({
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                        position: item.position,
                        primary: item.primary,
                        policeImage: item.policeImage,
                        rotation: item.rotation || 0,
                        isFace: item.isFace,
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                  },
          },
        },
      });
    }
    onClose();
    setSaving(false);

    const uploadedImages = value.images?.filter((image) => image.file) || [];
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
              isFace: image.isFace || false,
              rotation: 0,
              position: ImagePosition.CenterCenter,
            } as StateImageData)
        )
      );
    }
  };

  return {
    onSubmit,
    form,
    ageCheck,
    idVerified,
    offenderSettings: businessData?.business.offenderSettings,
    loading,
    saving,
    needJustification,
    uploading,
    setUploading,
    knowAddress,
  };
};

export default useEditOffender;
