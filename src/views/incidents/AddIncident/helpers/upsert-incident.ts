import type { StateOffenderData } from '#/components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { CustomQuestion } from '#/types/DataType';
import type { IncidentDraftDetailsQuery } from '#/views/incidents/AddIncident/graphql/queries/__generated__/edit-incident-draft.generated';
import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { IncidentImageUpdate, UpsertIncidentData } from 'graphql/types';

const upsertIncident = (
  formData: FormData,
  schemeId: string,
  goodsTypesData: ListGoodsTypesQuery | undefined,
  customQuestions: CustomQuestion[],
  fallbackBusinessId?: string,
  initData?: IncidentDraftDetailsQuery,
  groups?: { label: string; value: string }[],
  facialRecognition?: boolean,
  primaryImage?: string,
  sessionId?: string
): UpsertIncidentData => {
  const { incident: initIncident } = initData || {};

  const {
    business,
    crimeTypes,
    evidence,
    images: initImages,
    offenders: initOffenders,
    vehicles,
  } = initIncident || {};

  const {
    cctv,
    fellingTags,
    groups: dataGroups,
    involvedTags,
    offenders,
    tags,
  } = formData;

  const incidentImages = formData.images?.map((image) => ({
    ...image,
    create: !!image.originFileObj?.uid && image.url,
    fileId: image.originFileObj?.uid,
    id: image.id || image.originFileObj?.uid,
    isExisting: !!image.isExisting,
    url: image.url,
  }));

  const offenderMapping = (offender: StateOffenderData) => {
    const initOffender = initOffenders?.find(
      (initO) => initO.id === offender.id
    );

    const images = offender?.images;

    const originalImages = initOffender?.images || [];

    const offenderImageIds = new Set(
      (images ?? [])
        .map((img) => img.originFileObj?.uid ?? img.id)
        .filter(Boolean)
    );

    // Now intersect with incidentImages, then subtract originals
    const imagesFromIncident = incidentImages
      ?.filter((image) => !!image.fileId)
      ?.filter((image) => offenderImageIds.has(<string>image.fileId))
      ?.filter((image) => !originalImages.some((orig) => orig.id === image.id));

    const newImagesFromIncident = imagesFromIncident?.filter(
      (image) => !image.isExisting
    );

    const newImages = images
      ?.filter((offenderImage) => offenderImage.new)
      ?.filter(
        (offenderImage) =>
          !imagesFromIncident?.some((image) => image.url === offenderImage.url)
      );

    const removedImages = originalImages?.filter(
      (offenderImage) => !images?.some((image) => image.id === offenderImage.id)
    );
    const offenderImages = images || [];
    const totalImages = [
      ...(imagesFromIncident || []),
      ...(newImages || []),
    ].filter(Boolean);

    const imagesFormatted = {
      connect:
        imagesFromIncident
          ?.filter((image) => image.isExisting)
          .map((image) => image.id || '')
          ?.filter((image) => image !== undefined) || [],
      createConnect:
        newImagesFromIncident
          ?.map((image) => image.id || '')
          ?.filter((image) => image !== undefined) || [],
      new: newImages
        ?.map((image, _index) => {
          const isPrimary: boolean =
            offenderImages.length === 1 && totalImages.length === 1;

          return {
            filename: image.fileName || '',
            fromIncident: newImagesFromIncident?.some(
              (newImage) => newImage.id === image.id
            ),
            id: image.id || image?.originFileObj?.uid || '',
            indexFaces: facialRecognition,
            mimetype: image.type || '',
            primary: isPrimary,
            url: image.url || image.optimised || '',
          };
        })
        ?.filter((image) => image.url),
      removed: removedImages?.map((image) => image.id),
    };
    const groupsToConnect =
      groups && groups.length === 1
        ? groups.map(({ value }) => ({ id: value }))
        : dataGroups?.map((value) => ({ id: value }));
    return {
      address:
        offender?.address?.street &&
        offender?.address?.townCity &&
        offender?.address?.postcode
          ? {
              alias: offender?.address?.alias,
              building: offender?.address?.building,
              county: offender?.address?.county,
              postcode: offender?.address?.postcode,
              street: offender?.address?.street,
              townCity: offender?.address?.townCity,
            }
          : undefined,
      age: offender.age || null,
      alias: offender.alias ?? undefined,
      build: offender.build || null,
      comment: offender.comment || null,
      dateOfBirth: offender.dateOfBirth || null,
      dateSource: offender.dateSource || null,
      gender: offender.gender || null,
      groups: {
        connect: groupsToConnect || [],
      },
      hair: offender.hair || null,
      height: offender.height || null,
      id: offender.id,
      idSource: offender.idSource,
      idVerified: offender.idVerified === null ? false : offender.idVerified,
      images: imagesFormatted,
      name: offender.name,
      peculiarities: offender.peculiarities || null,
      race: offender.race || null,
    };
  };

  const offendersFormatted: UpsertIncidentData['offenders'] = {
    connect: offenders
      ?.filter((offender) => !offender.new)
      ?.filter(
        (offender) =>
          !initOffenders?.some(
            (initOffender) => initOffender.id === offender.id
          )
      )
      ?.map(({ id: oId }) => oId),
    new: offenders
      ?.filter((offender) => offender.new)
      .map((offender) => offenderMapping(offender)),
    removed: initOffenders
      ?.filter(
        (offender) =>
          !offenders?.some((newOffender) => newOffender.id === offender.id)
      )
      .map(({ id: oId }) => oId),
    update: offenders
      ?.filter((offender) => !offender.new)
      .filter((offender) => offender.edited)
      .map((offender) => offenderMapping(offender)),
  };

  const updatedImages = initImages
    ?.map((image) => {
      const incidentImage = incidentImages?.find(
        (incidentI) => incidentI.id === image.id
      );
      const fieldsToCheck = [
        'position',
        'rotation',
        'policeImage',
        'totalFaces',
      ];

      const changedFields: string[] = [];
      const changes: Record<string, unknown> = {
        changedFields: [] as string[],
        id: image.id,
        updated: true,
      };

      for (const field of fieldsToCheck) {
        if (incidentImage && image[field] !== incidentImage[field]) {
          changedFields.push(field);
          changes[field] = incidentImage[field] as unknown;
        }
      }

      if (changedFields.length > 0) {
        changes.changedFields = changedFields as unknown;
        return changes;
      }

      return null;
    })
    ?.filter((image) => image !== null);
  const imagesFormatted: UpsertIncidentData['images'] = {
    create: incidentImages
      ?.filter((image) => !image.isExisting && image.create)
      ?.map((image) => ({
        filename: image.fileName || '',
        id: image.id || image.uid,
        mimetype: image.type || '',
        policeImage: image.policeImage,
        position: image.position,
        primary: image.uid === primaryImage,
        rotation: image.rotation || 0,
        totalFaces: image.totalFaces || 0,
        url: image.url || '',
      }))
      ?.filter((image) => image.url),
    remove: initImages
      ?.filter(
        (image) =>
          !incidentImages?.some(
            (incidentImage) => incidentImage.id === image.id
          )
      )
      ?.map(({ id: removeId }) => removeId),
    update: updatedImages as IncidentImageUpdate[],
  };

  const involved = involvedTags?.map((id) => ({ id })) || [];
  const impact = fellingTags?.map((id) => ({ id })) || [];
  const formTags = tags?.map((id) => ({ id })) || [];
  const tagsCombined = [...involved, ...impact, ...formTags];
  const initTags = crimeTypes || [];

  const tagsFormatted = {
    connect:
      tagsCombined
        ?.filter((tag) => !initTags?.some((initTag) => initTag.id === tag.id))
        ?.map(({ id: oId }) => oId) || [],
    remove:
      initTags
        ?.filter((tag) => !tagsCombined?.some((newTag) => newTag.id === tag.id))
        ?.map(({ id: removeId }) => removeId) || [],
  };

  const businessId =
    (formData.business?.value || fallbackBusinessId) ?? undefined;
  const originalBusinessId = business?.id || null;
  const isNewBusiness = businessId !== originalBusinessId;
  const businessFormatted = isNewBusiness ? businessId : null;

  const items = formData.goods
    ?.filter((item) => item.goodsType !== undefined || item.sku !== undefined)
    .map((item) => ({
      damagedQuantity: item.damagedQuantity,
      description: item.description,
      goodsType: item.goodsType
        ? {
            id: item.goodsType,
          }
        : undefined,
      name:
        item.name ??
        goodsTypesData?.listGoodsTypes.goodsTypes.find(
          ({ id: goodsId }) => goodsId === item.goodsType
        )?.name ??
        '',
      quantity: item.quantity,
      recoveredQuantity: item.recoveredQuantity,
      recoveredValue: item.recoveredValue || 0,
      sku: item.sku,
      stockItem: item.stockItem
        ? {
            id: item.stockItem,
          }
        : undefined,
      value: item.value || 0,
    }));

  const newDocuments = formData.documents?.filter((doc) => !!doc.originFileObj);

  const removedDocuments = evidence?.filter(
    (doc) => !formData.documents?.some((newDoc) => newDoc.uid === doc.id)
  );

  const documentsFormatted = {
    create: newDocuments?.map((file) => ({
      fileType: file.type || '',
      name: file.name || '',
      origFileName: file.fileName || '',
      url: file.url || '',
    })),
    remove: removedDocuments?.map((doc) => doc.id) || [],
  };
  const newVehicles = formData.vehicles?.filter((item) => item.new) || [];
  const existingVehicles =
    formData.vehicles?.filter((item) => item.existing) || [];
  const editedVehicles = formData.vehicles?.filter((item) => item.edited) || [];

  const removedVehicles = vehicles
    ?.filter(
      (doc) => !formData.vehicles?.some((newDoc) => newDoc.id === doc.id)
    )
    .map(({ id }) => id);

  const vehicleToConnectSet = new Set([
    ...(existingVehicles.length > 0
      ? existingVehicles.map(({ id }) => ({ id }))
      : []),
    ...(editedVehicles.length > 0
      ? editedVehicles.map(({ id }) => ({ id }))
      : []),
  ]);

  const toConnectVehicles = [...vehicleToConnectSet].map(({ id }) => id);

  const createVehicles =
    newVehicles.length > 0
      ? newVehicles.map((vehicle) => ({
          colour: vehicle.colour,
          localId: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          registration: vehicle.registration,
        }))
      : [];

  const updateVehicles =
    editedVehicles.length > 0
      ? editedVehicles.map((vehicle) => ({
          colour: vehicle.colour,
          localId: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          registration: vehicle.registration,
        }))
      : [];
  const vehiclesFormatted: UpsertIncidentData['vehicles'] = {
    connect: toConnectVehicles,
    new: createVehicles,
    removed: removedVehicles,
    updated: updateVehicles,
  };

  return {
    answers: customQuestions.map((question) => ({
      answer:
        (formData[question.questionId] as null | string | undefined) || '',
      tagQuestionId: question.tagQuestionId,
      type: question.answerType,
    })),
    business: businessFormatted,
    cctvRecords: {
      createUpdate: cctv?.map((item) => ({
        aheadBehind: item.aheadBehind,
        cameraNumber: item.cameraNumber,
        correctTime: item.correctTime,
        description: item.description,
        endTime: item.endTime,
        id: item.id,
        incorrectBy: item.incorrectBy,
        showFace: item.showFace,
        showIncident: item.showIncident,
        startTime: item.startTime,
      })),
      remove: initIncident?.cctvRecords
        ?.filter((item) => !cctv?.some((newItem) => newItem.id === item.id))
        ?.map(({ id: removeId }) => removeId),
    },
    crimeTypes: tagsFormatted,
    date: formData.date || new Date(),
    description: formData.description || ' ',
    documents: documentsFormatted,
    groups: {
      connect:
        groups
          ?.filter(
            (group) =>
              !initIncident?.groups?.some(
                (initGroup) => initGroup.id === group.value
              )
          )
          ?.map(({ value }) => value) || [],
      remove:
        initIncident?.groups
          ?.filter(
            (group) => !groups?.some((newGroup) => newGroup.value === group.id)
          )
          ?.map(({ id: removeId }) => removeId) || [],
    },
    images: imagesFormatted,
    items,
    offenders: offendersFormatted,
    // TODO: Uncomment when backend schema is updated with these fields
    // policeAdditionalEvidence: formData.policeAdditionalEvidence,
    policeCCTVEmail: formData.policeCCTVEmail,
    // policeCCTVReviewed: formData.policeCCTVReviewed,
    policeDay: formData.policeDay,
    policeDistanceFromIncident: formData.policeDistanceFromIncident,
    policeIncidentDuration: formData.policeIncidentDuration,
    policeInvolved: formData.policeInvolved,
    policeItemsLocation: formData.policeItemsLocation,
    policeItemsMO: formData.policeItemsMO,
    policeKnownBefore: formData.policeKnownBefore !== 'NOT_KNOWN',
    policeMG11: formData.policeMG11,
    policeNo: formData.policeNo,
    policeObstructions: formData.policeObstructions,
    policeObstructionsDetails: formData.policeObstructionsDetails,
    policeReasonRemember: formData.policeReasonRemember,
    policeRef: formData.policeRef,
    policeReported: formData.policeReported,
    policeResponse: formData.policeResponse,
    policeSign: formData.policeSign,
    policeStatement: formData.policeStatement,
    policeWillingCourt: formData.policeWillingCourt,
    policeWitnessAddress: formData.policeWitnessAddress,
    policeWitnessAtTime: formData.policeWitnessAtTime,
    policeWitnessEmail: formData.policeWitnessEmail,
    policeWitnessEthnicity: formData.policeWitnessEthnicity,
    policeWitnessGender: formData.policeWitnessGender,
    policeWitnessLength: formData.policeWitnessLength,
    policeWitnessMobileNo: formData.policeWitnessMobileNo,
    policeWitnessName: formData.policeWitnessName,
    policeWitnessPlaceOfBirth: formData.policeWitnessGender,
    policeWitnessPostcode: formData.policeWitnessPostcode,
    policeWitnessWorkNo: formData.policeWitnessWorkNo,
    sessionId,
    subject: formData.subject,
    vehicles: vehiclesFormatted,
  };
};

export default upsertIncident;
