import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';
import type { RcFile, UploadChangeParam } from 'antd/lib/upload';
import type { IdSource } from 'graphql/types';
import type { AddressData, BlurFaceData } from 'types/DataType';

import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Form } from 'antd';
import { Age, Build, Gender, Height, ImagePosition, Race } from 'graphql/types';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

import type { StateImageData } from '../../ImageSection/useImageSection';
import type { FacesOpenSubmitData } from './FacesColumn.view';

import {
  getClosestAgeRange,
  getGenderFromFace,
  getPeculiaritiesFromFace,
} from '../../ImageSection/useImageSection';

export interface FaceData {
  age: {
    high: number;
    low: number;
  };
  beard: boolean;
  boundingBox: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  gender: 'Female' | 'Male';
  id: string;
  mustache: boolean;
}

export interface FacesOpenData {
  faces: FaceData[];
  id: string;
  offenderId: string;
  optimised?: null | string | undefined;
  url?: null | string | undefined;
}

interface ImageType {
  blurFaces?: BlurFaceData[];
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
  fileName?: null | string;
  id: string;
  isExisting?: boolean;
  new?: boolean;
  optimised?: null | string | undefined;
  originFileObj?: RcFile;
  type?: null | string;
  url?: null | string | undefined;
}

export interface AddOffenderData {
  address?: AddressData;
  age?: Age | null;
  alias?: string[];
  build?: Build | null;
  comment?: null | string;
  dateOfBirth?: Date | null;
  dateSource?: null | string;
  gender?: Gender | null;
  hair?: null | string;
  height?: Height | null;
  id: string;
  idSource?: IdSource;
  idVerified?: boolean;
  images?: ImageType[];
  infoSource?: null | string;
  justification?: null | string;
  knowAddress?: boolean;
  knownFor?: string[];
  name?: null | string;
  peculiarities?: null | string;
  race?: Race | null;
  reference?: null | number;
  sourceDetails?: null | string;
  targetedGoods?: null | string[];
  wanted?: boolean;
  // groupIds?: string[];
}

export interface StateOffenderData extends AddOffenderData {
  blank: boolean;
  confirmedInIncident: boolean;
  edited: boolean;
  existing: boolean;
  getConfirmed?: boolean;
  imageConfirmed: boolean;
  new: boolean;
}

interface Props {
  form: FormInstance<FormData>;
  onChange?: (value: StateOffenderData[]) => void;
  value?: StateOffenderData[];
}

interface Return {
  facesOpen: FacesOpenData | null;
  matchExistingOpen: StateOffenderData | null;
  mergeActive: null | string;
  mergeSelected: null | string;
  noOffenders: boolean;
  offenders: StateOffenderData[];
  onAddBlankOffenders: (count: number) => void;
  onAddOffenders: (
    values: AddOffenderData[],
    existing: boolean,
    blank: boolean
  ) => void;
  onChangeOffenderImage: (
    info: UploadChangeParam<StateImageData>,
    offenderId: string
  ) => void;
  onConfirmOffender: (id: string) => void;
  onImagesUploadedInForm: (values: StateImageData[]) => void;
  onMatchOffender: (value: AddOffenderData) => void;
  onMerge: () => void;
  onNoImages: (id: string) => void;
  onRemoveOffender: (id: string) => void;
  onSubmitImageFaces: (data: FacesOpenSubmitData) => void;
  onUpdateOffender: (value: AddOffenderData) => void;
  setFacesOpen: (data: FacesOpenData | null) => void;
  setMatchExistingOpen: (value: StateOffenderData | null) => void;
  setUpdateOpen: (value: StateOffenderData | null) => void;
  toggleMerge: (value: null | string) => void;
  toggleMergeSelected: (value: string) => void;
  toggleNoOffenders: () => void;
  updateOpen: StateOffenderData | null;
  uploading: boolean;
}

const useOffenders = ({ form, onChange, value }: Props): Return => {
  const images = Form.useWatch('images', form);
  const facialDetection =
    useAtomValue(currentSchemeAtom)?.facialDetection ?? true;
  const imagesRequiredOnOffenders =
    useAtomValue(currentSchemeAtom)?.imagesRequiredOnOffenders ?? false;
  const dontPrefillOffenderName =
    useAtomValue(currentSchemeAtom)?.dontPrefillOffenderName ?? false;

  const [pristine, setPristine] = useState(true);
  const [offenders, setOffenders] = useState<StateOffenderData[]>([]);
  const [matchExistingOpen, setMatchExistingOpen] =
    useState<StateOffenderData | null>(null);
  const [updateOpen, setUpdateOpen] = useState<StateOffenderData | null>(null);
  const [noOffenders, setNoOffenders] = useState(false);
  const [mergeActive, toggleMerge] = useState<null | string>(null);
  const [mergeSelected, setMergeSelected] = useState<null | string>(null);
  const [uploading, setUploading] = useState(false);
  const [facesOpen, setFacesOpen] = useState<FacesOpenData | null>(null);

  useEffect(() => {
    if (value && value.length !== offenders.length) {
      setOffenders(value);
      setPristine(false);
    }
  }, [value]);

  useEffect(() => {
    if (onChange && !pristine) onChange(offenders);
  }, [offenders]);

  const onAddOffenders = (
    values: AddOffenderData[],
    existing: boolean,
    blank: boolean
  ) => {
    const formattedOffenders: StateOffenderData[] = values.map(
      (offender): StateOffenderData => ({
        ...offender,
        blank,
        confirmedInIncident: true,
        edited: false,
        existing,
        getConfirmed: true,
        imageConfirmed: imagesRequiredOnOffenders ? !blank : true,
        images: offender.images || [],
        new: !existing,
      })
    );

    setOffenders([...offenders, ...formattedOffenders]);
    setPristine(false);
  };

  const onUpdateOffender = (newData: AddOffenderData) => {
    const currentData = offenders.find(({ id }) => id === newData.id);

    if (currentData)
      setOffenders(
        update<StateOffenderData[]>(offenders, {
          [offenders.findIndex((offender) => offender.id === newData.id)]: {
            $set: {
              ...currentData,
              address: newData.address,
              age: newData.age,
              alias: newData.alias,
              blank: false,
              build: newData.build,
              comment: newData.comment,
              dateOfBirth: newData.dateOfBirth,
              dateSource: newData.dateSource,
              edited: !currentData.new,
              gender: newData.gender,
              hair: newData.hair,
              height: newData.height,
              idSource: newData.idSource,
              idVerified: newData.idVerified,
              images: newData.images,
              infoSource: newData.infoSource,
              justification: newData.justification,
              knowAddress: newData.knowAddress,
              knownFor: newData.knownFor,
              name: newData.name,
              peculiarities: newData.peculiarities,
              race: newData.race,
              targetedGoods: newData.targetedGoods,
              wanted: newData.wanted,
            },
          },
        })
      );
  };

  const onConfirmOffender = (id: string) => {
    setOffenders(
      update<StateOffenderData[]>(offenders, {
        [offenders.findIndex((offender) => offender.id === id)]: {
          blank: {
            $set: true,
          },
          confirmedInIncident: {
            $set: true,
          },
          getConfirmed: {
            $set: true,
          },
        },
      })
    );
  };

  const onRemoveOffender = (id: string) => {
    setOffenders(offenders.filter((offender) => offender.id !== id));
  };

  const toggleNoOffenders = () => {
    if (!noOffenders) setNoOffenders(true);
    if (onChange) onChange([]);
  };
  const onAddBlankOffenders = (count: number) => {
    const data: AddOffenderData[] = Array.from({ length: count }, () => ({
      age: Age.Unknown,
      build: Build.Unknown,
      confirmedInIncident: true,
      gender: Gender.Unknown,
      getConfirmed: false,
      height: Height.Unknown,
      id: Math.floor(Math.random() * 1000).toString(),
      images: [],
      name: dontPrefillOffenderName ? undefined : 'Unidentified Offender',
      race: Race.Unknown,
    }));
    setNoOffenders(false);
    onAddOffenders(data, false, true);
  };

  const onMatchOffender = (data: AddOffenderData) => {
    if (matchExistingOpen) {
      const ageUpdated =
        data.age === Age.Unknown &&
        !!matchExistingOpen.age &&
        matchExistingOpen.age !== Age.Unknown;
      const buildUpdated =
        data.build === Build.Unknown &&
        !!matchExistingOpen.build &&
        matchExistingOpen.build !== Build.Unknown;
      const hairUpdated = !data.hair && !!matchExistingOpen.hair;
      const dateOfBirthUpdated =
        data.dateOfBirth && !!matchExistingOpen.dateOfBirth;
      const genderUpdated =
        data.gender === Gender.Unknown &&
        !!matchExistingOpen.gender &&
        matchExistingOpen.gender !== Gender.Unknown;
      const raceUpdated =
        data.race === Race.Unknown &&
        !!matchExistingOpen.race &&
        matchExistingOpen.race !== Race.Unknown;
      const peculiaritiesUpdated =
        !data.peculiarities && !!matchExistingOpen.peculiarities;
      const dateSourceUpdated =
        !data.dateSource && !!matchExistingOpen.dateSource;
      const nameUpdated =
        data.name === 'Unidentified Offender' && !!matchExistingOpen.name;

      const newImages = matchExistingOpen.images || [];
      const existingImages = data.images || [];

      setOffenders(
        update<StateOffenderData[]>(offenders, {
          [offenders.findIndex(
            (offender) => offender.id === matchExistingOpen.id
          )]: {
            $set: {
              ...matchExistingOpen,
              age: ageUpdated ? matchExistingOpen.age : data.age,
              blank: false,
              build: buildUpdated ? matchExistingOpen.build : data.build,
              dateOfBirth: dateOfBirthUpdated
                ? matchExistingOpen.dateOfBirth
                : data.dateOfBirth,
              dateSource: dateSourceUpdated
                ? matchExistingOpen.dateSource
                : data.dateSource,
              edited:
                ageUpdated ||
                buildUpdated ||
                hairUpdated ||
                dateOfBirthUpdated ||
                raceUpdated ||
                peculiaritiesUpdated ||
                dateSourceUpdated ||
                nameUpdated,
              existing: true,
              gender: genderUpdated ? matchExistingOpen.gender : data.gender,
              hair: hairUpdated ? matchExistingOpen.hair : data.hair,
              id: data.id,
              images: [...newImages, ...existingImages],
              name: nameUpdated ? matchExistingOpen.name : data.name,
              new: false,
              peculiarities: peculiaritiesUpdated
                ? matchExistingOpen.peculiarities
                : data.peculiarities,
              race: raceUpdated ? matchExistingOpen.race : data.race,
            },
          },
        })
      );
    }
  };

  const toggleMergeSelected = (id: string) => {
    if (mergeSelected === id) {
      setMergeSelected(null);
    } else {
      setMergeSelected(id);
    }
  };

  const onMerge = () => {
    const offenderOne = offenders.find(({ id }) => id === mergeSelected);
    const offenderTwo = offenders.find(({ id }) => id === mergeActive);

    if (offenderOne && offenderTwo) {
      const offenderOneImages = offenderOne.images || [];
      const offenderTwoImages = offenderTwo.images || [];
      setMergeSelected(null);
      toggleMerge(null);
      setOffenders(
        update<StateOffenderData[]>(offenders, {
          [offenders.findIndex(({ id }) => id === mergeSelected)]: {
            $set: {
              age:
                offenderOne.age && offenderOne.age !== Age.Unknown
                  ? offenderOne.age
                  : offenderTwo.age,
              alias: offenderOne.alias,
              blank: offenderOne.blank,
              build: offenderOne.build,
              comment: offenderOne.comment,
              confirmedInIncident: offenderOne.confirmedInIncident,
              dateOfBirth: offenderOne.dateOfBirth,
              dateSource: offenderOne.dateSource,
              edited: offenderOne.edited,
              existing: offenderOne.existing,
              gender:
                offenderOne.gender && offenderOne.gender !== Gender.Unknown
                  ? offenderOne.gender
                  : offenderTwo.gender,
              getConfirmed: true,
              hair: offenderOne.hair,
              height: offenderOne.height,
              id: offenderOne.id,
              idSource: offenderOne.idSource,
              idVerified: offenderOne.idVerified,
              imageConfirmed: offenderOne.imageConfirmed,
              images: [...offenderOneImages, ...offenderTwoImages],
              name: offenderOne.name,
              new: offenderOne.new,
              peculiarities:
                offenderOne.peculiarities || offenderTwo.peculiarities,
              race: offenderOne.race,
              reference: offenderOne.reference,
              wanted: offenderOne.wanted,
            },
          },
        }).filter(({ id }) => id !== offenderTwo.id)
      );
    }
  };

  const onChangeOffenderImage = (
    info: UploadChangeParam<StateImageData>,
    offenderId: string
  ) => {
    if (info.file) {
      if (images?.some(({ uid }) => uid === info.file.uid)) {
        if (info.file.response?.[0]) {
          // add the image to the offender in state
          setOffenders(
            update<StateOffenderData[]>(offenders, {
              [offenders.findIndex(({ id }) => id === offenderId)]: {
                imageConfirmed: {
                  $set: true,
                },
                images: {
                  $push: [
                    {
                      id: info.file.uid,
                      optimised: info.file.response[0].url,
                      url: info.file.response[0].url,
                    },
                  ],
                },
              },
            })
          );
          setUploading(false);

          // if there are faces and facialRec is enabled open modal
          if (
            facialDetection &&
            info.file.response[0].faces &&
            info.file.response[0].faces.length > 0
          ) {
            setFacesOpen({
              faces: info.file.response[0].faces.map((face) => ({
                age: {
                  high: face.AgeRange.High,
                  low: face.AgeRange.Low,
                },
                beard: face.Beard,
                boundingBox: {
                  height: face.BoundingBox.Height,
                  left: face.BoundingBox.Left,
                  top: face.BoundingBox.Top,
                  width: face.BoundingBox.Width,
                },
                gender: face.Gender,
                id: Math.floor(Math.random() * 1000).toString(),
                mustache: face.Mustache,
              })),
              id: info.file.uid,
              offenderId,
              optimised: info.file.response[0].url,
              url: info.file.response[0].url,
            });
          }
        }

        // add the new image to the images form state
        form.setFieldsValue({
          images: update<StateImageData[]>(images, {
            [images.findIndex(({ uid }) => uid === info.file.uid)]: {
              $set: info.file.response?.[0]
                ? {
                    ...info.file,
                    fileName: info.file.response[0].blobName,
                    policeImage: false,
                    position: ImagePosition.CenterCenter,
                    primary: false,
                    rotation: 0,
                    type: info.file.response[0].mimetype,
                    url: info.file.response[0].url,
                  }
                : info.file,
            },
          }),
        });
      } else {
        // add the new image to the images form state
        setUploading(true);
        form.setFieldsValue({
          images: update<StateImageData[]>(images || [], {
            $push: [info.file],
          }),
        });
      }
    }
  };

  const onNoImages = (offenderId: string) => {
    setOffenders(
      update<StateOffenderData[]>(offenders, {
        [offenders.findIndex(({ id }) => id === offenderId)]: {
          imageConfirmed: {
            $set: true,
          },
        },
      })
    );
  };

  const onImagesUploadedInForm = (values: StateImageData[]) => {
    if (images)
      form.setFieldsValue({
        images: update<StateImageData[]>(images, {
          $push: values,
        }),
      });
  };

  const onSubmitImageFaces = (data: FacesOpenSubmitData) => {
    setFacesOpen(null);

    const offender = offenders.find(({ id }) => id === data.offenderId);
    if (offender?.images) {
      const offenderImages = update<ImageType[]>(offender.images, {
        [offender.images.findIndex(({ id }) => id === data.imageId)]: {
          boundingBox: {
            $set: data.selectedFace.boundingBox,
          },
        },
      });

      const offendersAwaitingImage = offenders.filter(
        ({ imageConfirmed }) => !imageConfirmed
      );
      const offendersToReplace = offendersAwaitingImage.splice(
        offendersAwaitingImage.length - data.includedOffenders.length,
        offendersAwaitingImage.length
      );

      setOffenders(
        update<StateOffenderData[]>(
          offenders.filter(
            ({ id }) => !offendersToReplace.some((item) => item.id === id)
          ),
          {
            $push: data.includedOffenders,
            [offenders.findIndex(({ id }) => id === data.offenderId)]: {
              age: {
                $set: getClosestAgeRange(
                  data.selectedFace.age.high,
                  data.selectedFace.age.low
                ),
              },
              gender: {
                $set: getGenderFromFace(data.selectedFace.gender),
              },
              images: {
                $set: offenderImages,
              },
              peculiarities: {
                $set: getPeculiaritiesFromFace(
                  data.selectedFace.beard,
                  data.selectedFace.mustache
                ),
              },
            },
          }
        )
      );
    }
  };

  return {
    facesOpen,
    matchExistingOpen,
    mergeActive,
    mergeSelected,
    noOffenders,
    offenders,
    onAddBlankOffenders,
    onAddOffenders,
    onChangeOffenderImage,
    onConfirmOffender,
    onImagesUploadedInForm,
    onMatchOffender,
    onMerge,
    onNoImages,
    onRemoveOffender,
    onSubmitImageFaces,
    onUpdateOffender,
    setFacesOpen,
    setMatchExistingOpen,
    setUpdateOpen,
    toggleMerge,
    toggleMergeSelected,
    toggleNoOffenders,
    updateOpen,
    uploading,
  };
};

export default useOffenders;
