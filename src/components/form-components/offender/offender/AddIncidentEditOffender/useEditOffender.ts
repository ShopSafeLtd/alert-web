/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import type { Age, Build, Gender, Height, IdSource, Race } from 'graphql/types';
import { ImagePosition } from 'graphql/types';

import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { AddOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import { useState } from 'react';
import type { ImageValue } from '../../../ImageSelect/ImageSelect.view';
import type { StateImageData } from '../../../../incidents/IncidentForm/ImageSection/useImageSection';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/update-simple-offender.generated';
import { useUpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/update-simple-offender.generated';

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
}

interface Props {
  onClose: () => void;
  data: OffenderData;
  onCompleted?: () => void;
  update?: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  onEditOffender?: (value: AddOffenderData) => void;
  onImagesUploaded?: (value: StateImageData[]) => void;
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
  // addressAlias?: string;
  // building?: string;
  // street?: string;
  // townCity?: string;
  // county?: string;
  // postcode?: string;
}

interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
  uploading: boolean;
  setUploading: (value: boolean) => void;
}

const useEditOffender = ({
  data,
  onClose,
  onEditOffender,
  update,
  onImagesUploaded,
  onCompleted,
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
      id: item.id || '',
      url: item.url,
      optimised: item.optimised,
      // fileName: item.file?.response && item.file.response[0].blobName,
      // type: item.file?.response && item.file.response[0].mimetype,
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
            // },
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
    uploading,
    setUploading,
    idVerified,
  };
};

export default useEditOffender;
