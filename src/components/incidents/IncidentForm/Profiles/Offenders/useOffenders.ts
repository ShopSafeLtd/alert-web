import { useState, useEffect } from 'react';
import {
  Age,
  Build,
  Gender,
  Height,
  ImagePosition,
  Race,
} from 'graphql/generated';
import type { IdSource } from 'graphql/generated';
import update from 'immutability-helper';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useStoreState } from 'state';
import type { FormData } from 'views/incidents/AddIncident/useAddIncident';
import type { StateImageData } from '../../ImageSection/useImageSection';
import type { FacesOpenSubmitData } from './FacesColumn.view';
import {
  getClosestAgeRange,
  getGenderFromFace,
  getPeculiaritiesFromFace,
} from '../../ImageSection/useImageSection';

export interface FaceData {
  id: string;
  gender: 'Male' | 'Female';
  age: {
    high: number;
    low: number;
  };
  beard: boolean;
  mustache: boolean;
  boundingBox: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
}

export interface FacesOpenData {
  offenderId: string;
  id: string;
  url?: string | null | undefined;
  optimised?: string | null | undefined;
  faces: FaceData[];
}

interface ImageType {
  id: string;
  url?: string | null | undefined;
  optimised?: string | null | undefined;
  boundingBox?: {
    height: string;
    left: string;
    top: string;
    width: string;
  };
}

export interface AddOffenderData {
  id: string;
  reference?: number | null;
  alias?: string[] | null;
  name?: string | null;
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
  idSource?: IdSource;
  images?: ImageType[] | null;
}

export interface StateOffenderData extends AddOffenderData {
  new: boolean;
  existing: boolean;
  edited: boolean;
  blank: boolean;
  confirmedInIncident: boolean;
  imageConfirmed: boolean;
}

interface Props {
  value?: StateOffenderData[];
  onChange?: (value: StateOffenderData[]) => void;
  form: FormInstance<FormData>;
}

interface Return {
  offenders: StateOffenderData[];
  onAddOffenders: (
    values: AddOffenderData[],
    existing: boolean,
    blank: boolean
  ) => void;
  onUpdateOffender: (value: AddOffenderData) => void;
  onRemoveOffender: (id: string) => void;
  onConfirmOffender: (id: string) => void;
  toggleNoOffenders: () => void;
  setMatchExistingOpen: (value: StateOffenderData | null) => void;
  setUpdateOpen: (value: StateOffenderData | null) => void;
  onAddBlankOffenders: (count: number) => void;
  onMatchOffender: (value: AddOffenderData) => void;
  noOffenders: boolean;
  matchExistingOpen: StateOffenderData | null;
  updateOpen: StateOffenderData | null;
  mergeActive: string | null;
  toggleMerge: (value: string | null) => void;
  toggleMergeSelected: (value: string) => void;
  mergeSelected: string | null;
  onMerge: () => void;
  onChangeOffenderImage: (
    info: UploadChangeParam<StateImageData>,
    offenderId: string
  ) => void;
  uploading: boolean;
  onNoImages: (id: string) => void;
  onImagesUploadedInForm: (values: StateImageData[]) => void;
  facesOpen: FacesOpenData | null;
  setFacesOpen: (data: FacesOpenData | null) => void;
  onSubmitImageFaces: (data: FacesOpenSubmitData) => void;
}

const useOffenders = ({ value, onChange, form }: Props): Return => {
  const images = Form.useWatch('images', form);
  const facialRecognition = useStoreState(
    (state) => state.scheme.facialRecognition
  );
  const imagesRequiredOnOffenders = useStoreState(
    (state) => state.scheme.imagesRequiredOnOffenders
  );

  const [pristine, setPristine] = useState(true);
  const [offenders, setOffenders] = useState<StateOffenderData[]>([]);
  const [matchExistingOpen, setMatchExistingOpen] =
    useState<StateOffenderData | null>(null);
  const [updateOpen, setUpdateOpen] = useState<StateOffenderData | null>(null);
  const [noOffenders, setNoOffenders] = useState(false);
  const [mergeActive, toggleMerge] = useState<string | null>(null);
  const [mergeSelected, setMergeSelected] = useState<string | null>(null);
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
        images: offender.images || [],
        edited: false,
        confirmedInIncident: true,
        new: !existing,
        existing,
        blank,
        imageConfirmed: imagesRequiredOnOffenders ? !blank : true,
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
              height: newData.height,
              alias: newData.alias,
              comment: newData.comment,
              age: newData.age,
              build: newData.build,
              hair: newData.hair,
              dateOfBirth: newData.dateOfBirth,
              gender: newData.gender,
              race: newData.race,
              peculiarities: newData.peculiarities,
              dateSource: newData.dateSource,
              name: newData.name,
              images: newData.images,
              idSource: newData.idSource,
              idVerified: newData.idVerified,
              edited: !currentData.new,
              blank: false,
            },
          },
        })
      );
  };

  const onConfirmOffender = (id: string) => {
    setOffenders(
      update<StateOffenderData[]>(offenders, {
        [offenders.findIndex((offender) => offender.id === id)]: {
          confirmedInIncident: {
            $set: true,
          },
          blank: {
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
      id: Math.floor(Math.random() * 1000).toString(),
      name: 'Unidentified Offender',
      confirmedInIncident: true,
      gender: Gender.Unknown,
      age: Age.Unknown,
      race: Race.Unknown,
      height: Height.Unknown,
      build: Build.Unknown,
      images: [],
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
              id: data.id,
              age: ageUpdated ? matchExistingOpen.age : data.age,
              build: buildUpdated ? matchExistingOpen.build : data.build,
              hair: hairUpdated ? matchExistingOpen.build : data.hair,
              dateOfBirth: dateOfBirthUpdated
                ? matchExistingOpen.dateOfBirth
                : data.dateOfBirth,
              gender: genderUpdated ? matchExistingOpen.gender : data.gender,
              race: raceUpdated ? matchExistingOpen.race : data.race,
              peculiarities: peculiaritiesUpdated
                ? matchExistingOpen.peculiarities
                : data.peculiarities,
              dateSource: dateSourceUpdated
                ? matchExistingOpen.dateSource
                : data.dateSource,
              name: nameUpdated ? matchExistingOpen.name : data.name,
              images: [...newImages, ...existingImages],
              new: false,
              existing: true,
              blank: false,
              edited:
                ageUpdated ||
                buildUpdated ||
                hairUpdated ||
                dateOfBirthUpdated ||
                raceUpdated ||
                peculiaritiesUpdated ||
                dateSourceUpdated ||
                nameUpdated,
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
              id: offenderOne.id,
              age:
                offenderOne.age && offenderOne.age !== Age.Unknown
                  ? offenderOne.age
                  : offenderTwo.age,
              build: offenderOne.build,
              images: [...offenderOneImages, ...offenderTwoImages],
              existing: offenderOne.existing,
              blank: offenderOne.blank,
              confirmedInIncident: offenderOne.confirmedInIncident,
              name: offenderOne.name,
              idVerified: offenderOne.idVerified,
              idSource: offenderOne.idSource,
              dateSource: offenderOne.dateSource,
              race: offenderOne.race,
              peculiarities:
                offenderOne.peculiarities || offenderTwo.peculiarities,
              gender:
                offenderOne.gender && offenderOne.gender !== Gender.Unknown
                  ? offenderOne.gender
                  : offenderTwo.gender,
              dateOfBirth: offenderOne.dateOfBirth,
              hair: offenderOne.hair,
              comment: offenderOne.comment,
              alias: offenderOne.alias,
              height: offenderOne.height,
              new: offenderOne.new,
              edited: offenderOne.edited,
              reference: offenderOne.reference,
              imageConfirmed: offenderOne.imageConfirmed,
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
        if (info.file.response && info.file.response[0]) {
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
                      url: info.file.response[0].url,
                      optimised: info.file.response[0].url,
                    },
                  ],
                },
              },
            })
          );
          setUploading(false);

          // if there are faces and facialRec is enabled open modal
          if (
            facialRecognition &&
            info.file.response[0].faces &&
            info.file.response[0].faces.length > 0
          ) {
            setFacesOpen({
              faces: info.file.response[0].faces.map((face) => ({
                id: Math.floor(Math.random() * 1000).toString(),
                boundingBox: {
                  height: face.BoundingBox.Height,
                  left: face.BoundingBox.Left,
                  top: face.BoundingBox.Top,
                  width: face.BoundingBox.Width,
                },
                age: {
                  high: face.AgeRange.High,
                  low: face.AgeRange.Low,
                },
                gender: face.Gender.Value,
                beard: face.Beard.Value,
                mustache: face.Beard.Value,
              })),
              url: info.file.response[0].url,
              id: info.file.uid,
              offenderId,
              optimised: info.file.response[0].url,
            });
          }
        }

        // add the new image to the images form state
        form.setFieldsValue({
          images: update<StateImageData[]>(images, {
            [images.findIndex(({ uid }) => uid === info.file.uid)]: {
              $set:
                info.file.response && info.file.response[0]
                  ? {
                      ...info.file,
                      url: info.file.response[0].url,
                      fileName: info.file.response[0].blobName,
                      type: info.file.response[0].mimetype,
                      policeImage: false,
                      primary: false,
                      rotation: 0,
                      position: ImagePosition.CenterCenter,
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
            [offenders.findIndex(({ id }) => id === data.offenderId)]: {
              images: {
                $set: offenderImages,
              },
              age: {
                $set: getClosestAgeRange(
                  data.selectedFace.age.high,
                  data.selectedFace.age.low
                ),
              },
              gender: {
                $set: getGenderFromFace(data.selectedFace.gender),
              },
              peculiarities: {
                $set: getPeculiaritiesFromFace(
                  data.selectedFace.beard,
                  data.selectedFace.mustache
                ),
              },
            },
            $push: data.includedOffenders,
          }
        )
      );
    }
  };

  return {
    offenders,
    onAddOffenders,
    onUpdateOffender,
    onRemoveOffender,
    setMatchExistingOpen,
    setUpdateOpen,
    onAddBlankOffenders,
    toggleNoOffenders,
    noOffenders,
    onMatchOffender,
    matchExistingOpen,
    updateOpen,
    onConfirmOffender,
    mergeActive,
    toggleMerge,
    toggleMergeSelected,
    mergeSelected,
    onMerge,
    onChangeOffenderImage,
    uploading,
    onNoImages,
    onImagesUploadedInForm,
    facesOpen,
    setFacesOpen,
    onSubmitImageFaces,
  };
};

export default useOffenders;
