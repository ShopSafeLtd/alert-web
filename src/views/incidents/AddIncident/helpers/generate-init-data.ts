import type { IncidentDraftDetailsQuery } from '#/views/incidents/AddIncident/graphql/queries/__generated__/edit-incident-draft.generated';
import type { FormData } from '#/views/incidents/AddIncident/types/formData';

const generateInitData = (draftData: IncidentDraftDetailsQuery): FormData => {
  const { incident } = draftData;
  const {
    answers,
    business,
    cctvRecords,
    crimeTypes,
    date,
    description: subject,
    evidence,
    groups,
    images,
    impactTags,
    incidentItems,
    involvedTags,
    offenders,
    vehicles,
  } = incident;

  const answersJson = answers?.reduce(
    (acc, { answer, tagQuestion }) => ({
      ...acc,
      [tagQuestion?.question?.id || '']: answer,
    }),
    {}
  );
  return {
    business: business
      ? {
          label: business.name,
          value: business.id,
        }
      : undefined,
    cctvAvailable: false,
    documents:
      evidence && evidence.length > 0
        ? {
            fileList: evidence?.map((doc) => ({
              name: doc.name,
              uid: doc.id,
              url: doc.url,
            })),
          }
        : undefined,
    subject,
    ...answersJson,
    cctv: cctvRecords?.map((item) => ({
      aheadBehind: item.aheadBehind ?? '',
      cameraNumber: item.cameraNumber ?? undefined,
      correctTime: item.correctTime ?? false,
      description: item.description ?? '',
      endTime: item.endTime ?? undefined,
      id: item.id,
      incorrectBy: item.incorrectBy ?? undefined,
      showFace: item.showFace ?? undefined,
      showIncident: item.showIncident ?? undefined,
      startTime: item.startTime ?? undefined,
    })),
    date: new Date(date),
    description: subject,
    fellingTags: impactTags?.map((tag) => tag.id),
    goods: incidentItems?.map((item) => ({
      description: item.name || '',
      goodsType: item.goodsType?.id,
      name: item.name || '',
      quantity: item.quantity || 0,
      recoveredQuantity: item.recoveredQuantity || 0,
      recoveredValue: item.recoveredValue || 0,
      sku: item.sku || '',
      stockItem: item.stockItem?.id,
      value: item.value || 0,
    })),
    groups: groups?.map((group) => group.id) || [],
    hasVictims: false,
    images: images?.map((image) => ({
      id: image.id,
      isExisting: true,
      name: image.id,
      policeImage: !!image.policeImage,
      position: image.position || 'CenterCenter',
      rotation: image.rotation || 0,
      thumbUrl: image.url || '',
      uid: image.id,
      url: image.url || '',
    })),
    involvedTags: involvedTags?.map((tag) => tag.id) || [],
    offenders: offenders?.map((offender) => ({
      age: offender.age,
      blank: false,
      build: offender.build,
      confirmedInIncident: true,
      edited: false,
      existing: true,
      gender: offender.gender,
      height: offender.height,
      id: offender.id,
      imageConfirmed: true,
      images: offender.images?.map((image) => ({
        id: image.id,
        isExisting: true,
        name: image.id,
        optimised: image.url || '',
        policeImage: !!image.policeImage,
        position: image.position || 'CenterCenter',
        thumbUrl: image.url || '',
        uid: image.id,
        url: image.url || '',
      })),
      name: offender.name,
      new: false,
      race: offender.race,
    })),
    policeMG11: false,
    policeReported: false,
    reportToPolice: false,
    tags: crimeTypes?.map((tag) => tag.id),
    vehicles: vehicles?.map((vehicle) => ({
      blank: false,
      colour: vehicle.colour,
      edited: false,
      existing: true,
      id: vehicle.id,
      images: vehicle.images?.map((image) => ({
        id: image.id,
        isExisting: true,
        name: image.id,
        optimised: image.url || '',
        policeImage: !!image.policeImage,
        position: image.position || 'CenterCenter',
        thumbUrl: image.url || '',
        uid: image.id,
        url: image.url || '',
      })),
      make: vehicle.make,
      model: vehicle.model,
      new: false,
      registration: vehicle.registration,
    })),
    witnessesInvolved: false,
  };
};

export default generateInitData;
