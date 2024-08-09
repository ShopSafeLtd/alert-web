/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import type { AddOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';
import type { Age, Build, Gender, Height, IdSource, Race } from 'graphql/types';

import { Form } from 'antd';
import { useUpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';
import { ImagePosition } from 'graphql/types';
import { useState } from 'react';
import errorNotification from 'types/mutation_notifications/error_notification';

import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { ImageValue } from '../../../ImageSelect/ImageSelect.view';

interface OffenderImage {
  id: string;
  optimised?: null | string | undefined;
  url?: null | string | undefined;
}

export interface OffenderData {
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
  knownFor?: null | string[];
  name?: null | string;
  peculiarities?: null | string;
  race?: Race | null;
  targetedGoods?: null | string[];
}

interface Props {
  data: OffenderData;
  onClose: () => void;
  onCompleted?: () => void;
  onEditOffender?: (value: AddOffenderData) => void;
  onImagesUploaded?: (value: StateImageData[]) => void;
  update?: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
}

export interface FormData {
  age: Age;
  ageCheck: boolean;
  alias?: string[];
  build: Build;
  comment: string;
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
  knownFor: string[];
  name: string;
  peculiarities: string;
  race: Race;
  targetedGoods: string[];
  // addressAlias?: string;
  // building?: string;
  // street?: string;
  // townCity?: string;
  // county?: string;
  // postcode?: string;
}

interface Return {
  ageCheck: boolean | undefined;
  form: FormInstance<FormData>;
  idVerified: boolean | undefined;
  onSubmit: (value: FormData) => void;
  setUploading: (value: boolean) => void;
  uploading: boolean;
}

const useEditOffender = ({
  data,
  onClose,
  onCompleted,
  onEditOffender,
  onImagesUploaded,
  update,
}: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const [uploading, setUploading] = useState(false);
  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);
  const [updateOffender] = useUpdateSimpleOffenderMutation({
    onCompleted,
    onError: () => {
      errorNotification();
    },
    update,
  });
  const onSubmit = (value: FormData) => {
    // update({
    //   ...data,
    //   name: value.name || 'Unidentified Offender',
    //   alias: value.alias || [],
    //   knownFor: value.knownFor || [],
    //   targetedGoods: value.targetedGoods || [],
    //   gender: value.gender || null,
    //   race: value.race || null,
    //   build: value.build || null,
    //   hair: value.hair || null,
    //   peculiarities: value.peculiarities || null,
    //   age: ageCheck ? null : value.age || null,
    //   dateSource: ageCheck ? value.dateSource || null : null,
    //   dateOfBirth: ageCheck ? value.dateOfBirth || null : null,
    //   idVerified: value.idVerified,
    //   idSource: value.idSource,
    //   images: value.images.map((item) => ({
    //     id: item.id || '',
    //     url: item.url,
    //     optimised: item.optimised,
    //     fileName: item.file?.response && item.file.response[0].blobName,
    //     type: item.file?.response && item.file.response[0].mimetype,
    //     position: item.position,
    //     primary: false,
    //     policeImage: item.policeImage || false,
    //     rotation: item.rotation,
    //     new: !!item.file,
    //   })),
    // });

    const imageData = value.images.map((item) => ({
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
            // },
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
                        isFace: item.isFace,
                        policeImage: item.policeImage,
                        position: item.position,
                        primary: item.primary,
                        rotation: item.rotation || 0,
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
            // addresses: {
            //   update: [
            //     {
            //       where: {
            //         id: data.,
            //       },
            //       data: {
            //         postcode: { set: value.postcode },
            //         street: { set: value.street },
            //         townCity: { set: value.townCity },
            //         alias: { set: value.addressAlias || '' },
            //         building: { set: value.building },
            //         county: { set: value.county },
            //       },
            //     },
            //   ],
            targetedGoods: { set: value.targetedGoods },
          },
          where: {
            id: data.id,
          },
        },
      });
    }
    onClose();
    const uploadedImages = value.images?.filter((image) => image.file) || [];
    if (uploadedImages.length > 0 && onImagesUploaded) {
      onImagesUploaded(
        uploadedImages.map(
          (image) =>
            ({
              ...image.file,
              fileName: image.file?.response?.[0].blobName,
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
    onSubmit,
    setUploading,
    uploading,
  };
};

export default useEditOffender;
