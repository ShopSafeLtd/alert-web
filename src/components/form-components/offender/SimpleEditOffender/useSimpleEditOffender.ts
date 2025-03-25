/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import type { AddOffenderData } from '#/components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type {
  AddressData,
  BlurFaceData,
  OffenderSettingsType,
} from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';
import type { Age, Build, Gender, Height, IdSource, Race } from 'graphql/types';

import {
  currentSchemeAtom,
  currentSchemeBusinessesAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { Form } from 'antd';
import { useBusinessOffenderSettingsQuery } from 'graphql/businesses/queries/__generated__/business-offender-settings.generated';
import { useUpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';
import { ImagePosition } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

import type { StateImageData } from '../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageValue } from '../../ImageSelect/ImageSelect.view';

interface OffenderImage {
  blurFaces?: BlurFaceData[];
  id: string;
  optimised?: null | string | undefined;
  url?: null | string | undefined;
}

export interface OffenderData {
  address?: AddressData;
  age?: Age | null;
  alias?: null | string[];
  build?: Build | null;
  comment?: null | string;
  dateOfBirth?: Date | null;
  dateSource?: null | string;
  gender?: Gender | null;
  hair?: null | string;
  height?: Height | null;
  id: string;
  idSource?: IdSource | null;
  idVerified?: boolean;
  images?: OffenderImage[] | null;
  infoSource?: null | string;
  justification?: null | string;
  knowAddress?: boolean;
  knownFor?: null | string[];
  name?: null | string;
  peculiarities?: null | string;
  race?: Race | null;
  targetedGoods?: null | string[];
}

interface Props {
  data: OffenderData;
  facialDet?: boolean;
  incidentBusinessId?: string;
  onClose: () => void;
  onCompleted?: () => void;
  onEditOffender?: (value: AddOffenderData) => void;
  onImagesUploaded?: (value: StateImageData[]) => void;
  update?: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
}

export interface FormData {
  addressAlias?: string;
  age: Age;
  ageCheck: boolean;
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
  infoSource: string;
  justification: string;
  knowAddress?: boolean;
  knownFor: string[];
  name: string;
  peculiarities: string;
  postcode?: string;
  race: Race;
  street?: string;
  targetedGoods: string[];
  townCity?: string;
}

interface Return {
  ageCheck: boolean | undefined;
  form: FormInstance<FormData>;
  idVerified: boolean | undefined;
  knowAddress: boolean | undefined;
  loading: boolean;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType | undefined;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setUploading: (value: boolean) => void;
  uploading: boolean;
}

const useEditOffender = ({
  data,
  incidentBusinessId,
  onClose,
  onCompleted,
  onEditOffender,
  onImagesUploaded,
  update,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);
  const knowAddress = Form.useWatch('knowAddress', form);
  const userBusinessId = useAtomValue(currentSchemeBusinessesAtom)?.at(0)?.id;
  const businessId = incidentBusinessId || userBusinessId;
  const needJustification =
    useAtomValue(currentSchemeAtom)?.needJustification ?? false;

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
      blurFaces:
        item.blurFaces && item.blurFaces.length > 0
          ? item.blurFaces
          : undefined,
      fileName: item.fileName,
      id: item.id || '',
      isFace: item.isFace || false,
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
        address: value.knowAddress
          ? {
              alias: value.addressAlias,
              building: value.building,
              county: value.county,
              postcode: value.postcode || '',
              street: value.street || '',
              townCity: value.townCity || '',
            }
          : undefined,
        age: ageCheck ? null : value.age || null,
        alias,
        build: value.build || null,
        comment: value.comment || null,
        dateOfBirth: ageCheck ? value.dateOfBirth || null : null,
        dateSource: ageCheck ? value.dateSource || null : null,
        gender: value.gender || null,
        hair: value.hair || null,
        height: value.height || null,
        idSource: value.idSource || undefined,
        idVerified: value.idVerified,
        images: imageData,
        infoSource: value.infoSource || null,
        justification: value.justification || null,
        knowAddress: value.knowAddress,
        knownFor: value.knownFor,
        name: value.name || 'Unidentified Offender',
        peculiarities: value.peculiarities || null,
        race: value.race || null,
        targetedGoods: value.targetedGoods,
      });
    } else {
      void updateOffender({
        variables: {
          data: {
            age: { set: value.age || null },
            alias: { set: alias },
            build: { set: value.build || null },
            dateOfBirth: { set: value.dateOfBirth || null },
            dateSource: { set: value.dateSource || null },
            gender: { set: value.gender || null },
            hair: { set: value.hair || 'Unknown' },
            height: { set: value.height || null },
            //   : undefined,
            images:
              value.images && value.images.length > 0
                ? {
                    connect: imageData
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
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
                : {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                  },
            infoSource: { set: value.infoSource || null },
            justification: { set: value.justification || null },
            knownFor: { set: value.knownFor },
            name: { set: value.name },
            peculiarities: { set: value.peculiarities || '' },
            race: { set: value.race || null },
            // addresses: value.knowAddress
            //   ? {
            //       upsert: [
            //         {
            //           update: {
            //             alias: {
            //               set: value.addressAlias,
            //             },
            //             building: { set: value.building },
            //             street: { set: value.street },
            //             townCity: { set: value.townCity },
            //             county: { set: value.county },
            //             postcode: { set: value.postcode },
            //           },
            //           create: {
            //             alias: value.addressAlias,
            //             building: value.building,
            //             street: value.street,
            //             townCity: value.townCity,
            //             county: value.county,
            //             postcode: value.postcode,
            //           },
            //         },
            //       ],
            //     }
            targetedGoods: { set: value.targetedGoods },
          },
          where: {
            id: data.id,
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
    needJustification,
    offenderSettings: businessData?.business.offenderSettings,
    onSubmit,
    saving,
    setUploading,
    uploading,
  };
};

export default useEditOffender;
