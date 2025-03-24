import type { EditFeedImage, ImageCardData } from '#/types/DataType';
import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { ImageUpdateWhereDataWithoutIncidentInput } from 'graphql/types';

import ImagesList from '#/components/ViewPage/ImagesList';
import EditImageList from '#/components/images/EditImageList';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from '#/types/enums/profile-update-type';
import errorNotification from '#/types/mutation_notifications/error_notification';
import successNotification from '#/types/mutation_notifications/success_notification';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import { Drawer } from 'antd';
import { useUpdateIncidentImagesMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-images.generated';
import { useAtomValue } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: ViewIncidentQuery | undefined;
  editImages: boolean;
  editRights: boolean;
  incidentId: string;
  loading: boolean;
  saving: boolean;
  setSaving: (value: boolean) => void;
  toggleEditImages: () => void;
}

const Images = ({
  data,
  editImages,
  editRights,
  incidentId,
  loading,
  saving,
  setSaving,
  toggleEditImages,
}: Props) => {
  const intl = useIntl();
  const facialDetection =
    useAtomValue(currentSchemeAtom)?.facialDetection ?? true;

  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const [editImageData, setEditImageData] = useState<EditFeedImage | null>(
    null
  );

  const [updateIncidentImages] = useUpdateIncidentImagesMutation({
    onError: () => {
      errorNotification();
    },
  });

  useEffect(() => {
    setLightboxElements(
      data?.incident?.images.map((image) => ({
        src: image.optimised || '',
      })) || []
    );
  }, [data]);

  const openLightbox = (index: number) => {
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
  };

  const onEditImage = (value: EditFeedImage) => {
    setSaving(true);
    if (value) {
      const findPrimaryId = data?.incident?.images.find(
        ({ primary }) => primary
      )?.id;

      const updateImages: ImageUpdateWhereDataWithoutIncidentInput[] = [
        {
          data: {
            policeImage: { set: value.policeImage || false },
            position: { set: value.position },
            primary: { set: value.primary || false },
            rotation: { set: value.rotation || 0 },
          },
          where: {
            id: value.id,
          },
        },
      ];

      if (findPrimaryId && value.primary && findPrimaryId !== value.id) {
        updateImages.push({
          data: {
            primary: { set: false },
          },
          where: {
            id: findPrimaryId,
          },
        });
      }

      void updateIncidentImages({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Image,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          id: incidentId,
          images: {
            update: updateImages,
          },
        },
      }).finally(() => {
        setEditImageData(null);
        setSaving(false);
      });
    }
  };
  const onDeleteImage = (value: string) => {
    setSaving(false);
    void updateIncidentImages({
      onCompleted: () => {
        successNotification(
          ProfileUpdatedModel.Image,
          ProfileUpdatedModel.Incident,
          ProfileUpdatedType.deleted
        );
      },
      update: (store, { data: res }) => {
        if (res?.updateIncident === null || res?.updateIncident === undefined)
          return;
        const existingData = store.readQuery<ViewIncidentQuery>({
          query: ViewIncidentDocument,
          variables: {
            where: {
              id: incidentId,
            },
          },
        });

        if (!existingData?.incident) return;
        store.writeQuery<ViewIncidentQuery>({
          data: {
            __typename: 'Query',
            incident: {
              ...existingData.incident,
              images: existingData.incident.images.filter(
                ({ id }) => id !== value
              ),
            },
          },
          query: ViewIncidentDocument,
          variables: {
            where: {
              id: incidentId,
            },
          },
        });
      },
      variables: {
        id: incidentId,
        images: {
          disconnect: [{ id: value }],
        },
      },
    });
  };

  const onUpdateImages = (value: ImageCardData[]) => {
    setSaving(true);
    const disconnect = value
      .filter(({ deleted }) => deleted)
      .map(({ id }) => ({ id }));
    const newImages = value.filter((el) => el.new);
    const editedImages = value.filter(({ edited }) => edited);

    void updateIncidentImages({
      onCompleted: () => {
        successNotification(
          ProfileUpdatedModel.Images,
          ProfileUpdatedModel.Incident,
          ProfileUpdatedType.updated
        );
      },
      variables: {
        id: incidentId,
        images: {
          disconnect:
            disconnect && disconnect.length > 0 ? disconnect : undefined,
          update:
            editedImages && editedImages.length > 0
              ? editedImages.map((item) => ({
                  data: {
                    policeImage: { set: item.policeImage },
                    position: { set: item.position },
                    primary: { set: item.primary },
                    rotation: { set: item.rotation },
                    totalFaces: { set: item.totalFaces },
                  },
                  where: {
                    id: item.id,
                  },
                }))
              : undefined,
          upload:
            newImages && newImages.length > 0
              ? newImages
                  .map((item) => ({
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
                  .filter((obj) => obj.url !== undefined)
              : undefined,
        },
      },
    }).finally(() => {
      toggleEditImages();
      setSaving(false);
    });
  };

  return (
    <>
      <ImagesList
        editImageData={editImageData}
        editRights={editRights}
        hasImages={
          !!(data?.incident?.images && data?.incident?.images.length > 0)
        }
        imagesData={data?.incident?.images}
        lightBoxOpen={lightBoxOpen}
        lightboxElements={lightboxElements}
        loading={loading}
        onDeleteImage={onDeleteImage}
        onEditImage={onEditImage}
        openLightbox={openLightbox}
        saving={saving}
        setEditImageData={setEditImageData}
      />
      <Drawer
        onClose={toggleEditImages}
        open={editImages}
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Images',
        })}
        width="800"
        zIndex={999}
      >
        {editImages ? (
          <EditImageList
            facialDet={facialDetection}
            images={data?.incident?.images}
            onClose={toggleEditImages}
            saving={saving}
            title={intl.formatMessage({
              defaultMessage: 'Incident',
            })}
            update={onUpdateImages}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default Images;
