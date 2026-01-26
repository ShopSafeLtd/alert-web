import { format } from 'date-fns';

/**
 * Data structure for MG11 statement template variables
 */
export interface MG11TemplateData {
  businessAddress: string;
  businessName: string;
  cctvAheadBehind?: 'ahead' | 'behind';
  cctvIncorrectBy?: number;
  cctvReviewDate?: string;
  cctvReviewTime?: string;
  cctvTimeCorrect?: boolean;
  distanceFromIncident?: string;
  imageRef?: string;
  incidentDate: string;
  incidentDuration?: string;
  incidentTime: string;
  incidentType: string;
  items: Array<{
    loss: number;
    name: string;
    value: number;
  }>;
  jobTitle: string;
  offenderDescription?: string;
  offenderName: string;
  policeWitnessAtTime: boolean;
  screenshotDate?: string;
  screenshotTime?: string;
  viewObstructed?: string;
}

/**
 * Format date as "22/01/2026"
 */
export const formatDate = (date: Date | null | string | undefined): string => {
  if (!date) return '';
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'dd/MM/yyyy');
  } catch {
    return '';
  }
};

/**
 * Format time as "14:30"
 */
export const formatTime = (date: Date | null | string | undefined): string => {
  if (!date) return '';
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'HH:mm');
  } catch {
    return '';
  }
};

/**
 * Format currency as "£123.45"
 */
export const formatCurrency = (amount: null | number | undefined): string => {
  if (amount === null || amount === undefined) return '£0.00';
  return `£${amount.toFixed(2)}`;
};

/**
 * Generate CCTV time correction sentence
 */
const generateCCTVTimeCorrection = (
  cctvTimeCorrect?: boolean,
  incorrectBy?: number,
  aheadBehind?: 'ahead' | 'behind'
): string => {
  if (cctvTimeCorrect === true) {
    return ' I can also confirm the CCTV system displays the correct time and date.';
  }
  if (cctvTimeCorrect === false && incorrectBy && aheadBehind) {
    return ` The CCTV system time is incorrect, running ${incorrectBy} minutes ${aheadBehind} actual time.`;
  }
  return '';
};

/**
 * Generate items list section
 */
const generateItemsList = (items: MG11TemplateData['items']): string => {
  if (!items || items.length === 0) {
    return '';
  }

  const itemLines = items
    .map(
      (item) =>
        `    - ${item.name}: valued at ${formatCurrency(item.value)} (total loss of ${formatCurrency(item.loss)})`
    )
    .join('\n');

  return `\n\nThe items taken by the suspect are as follows:\n${itemLines}`;
};

/**
 * Generate CCTV review paragraph (used in both templates)
 */
const generateCCTVReviewParagraph = (data: MG11TemplateData): string => {
  if (!data.cctvReviewTime || !data.cctvReviewDate) {
    return '';
  }

  const timeCorrection = generateCCTVTimeCorrection(
    data.cctvTimeCorrect,
    data.cctvIncorrectBy,
    data.cctvAheadBehind
  );

  return `\n\nAt ${data.cctvReviewTime} hours on the ${data.cctvReviewDate} I reviewed the in-store CCTV of the incident and confirm it shows the offender entering the store, selecting items from within and leaving the store without offering any payment for the items.${timeCorrection}`;
};

/**
 * Generate screenshot paragraph
 */
const generateScreenshotParagraph = (data: MG11TemplateData): string => {
  if (!data.screenshotTime || !data.screenshotDate || !data.imageRef) {
    return '';
  }

  return `\n\nAt ${data.screenshotTime} hours on ${data.screenshotDate} I took a screenshot from the CCTV of the suspect that I refer to as police exhibit ${data.imageRef}.`;
};

/**
 * Generate CCTV Review Statement (policeWitnessAtTime: false)
 */
export const generateCCTVReviewStatement = (data: MG11TemplateData): string => {
  const parts: string[] = [];

  // Introduction
  parts.push(
    `I am the above-named person employed at ${data.businessName} ${data.businessAddress} as ${data.jobTitle}.`,
    `\n\nThis statement relates to an incident of ${data.incidentType} which occurred at the above at ${data.incidentTime} hours on ${data.incidentDate}.`
  );

  // CCTV review paragraph
  const cctvParagraph = generateCCTVReviewParagraph(data);
  if (cctvParagraph) {
    parts.push(cctvParagraph);
  }

  // Offender identification
  parts.push(`\n\nThe Suspect is ${data.offenderName}.`);

  // Screenshot paragraph
  const screenshotParagraph = generateScreenshotParagraph(data);
  if (screenshotParagraph) {
    parts.push(screenshotParagraph);
  }

  // Items list
  const itemsList = generateItemsList(data.items);
  if (itemsList) {
    parts.push(itemsList);
  }

  // Authorization statement
  parts.push(
    `\n\nI am authorised to act on behalf of ${data.businessName} and that no person has the right to remove items from our store without making payment.`
  );

  return parts.join('');
};

/**
 * Generate In-Person Witness Statement (policeWitnessAtTime: true)
 */
export const generateInPersonWitnessStatement = (
  data: MG11TemplateData
): string => {
  const parts: string[] = [];

  // Introduction
  parts.push(
    `I am the above-named person employed at ${data.businessName} ${data.businessAddress} as ${data.jobTitle}.`,
    `\n\nThis statement relates to an incident of ${data.incidentType} which occurred at the above at ${data.incidentTime} hours on ${data.incidentDate}.`
  );

  // Witness details
  if (
    data.incidentDuration &&
    data.distanceFromIncident &&
    data.viewObstructed
  ) {
    parts.push(
      `\n\nI witnessed this incident in person, over ${data.incidentDuration} from a distance of ${data.distanceFromIncident} my view of the incident was ${data.viewObstructed}.`
    );
  }

  // Offender identification with description
  let offenderLine = `\n\nThe Suspect is ${data.offenderName}`;
  if (data.offenderDescription) {
    offenderLine += `, How I would describe them as ${data.offenderDescription}`;
  }
  parts.push(offenderLine);

  // CCTV review paragraph
  const cctvParagraph = generateCCTVReviewParagraph(data);
  if (cctvParagraph) {
    parts.push(cctvParagraph);
  }

  // Screenshot paragraph
  const screenshotParagraph = generateScreenshotParagraph(data);
  if (screenshotParagraph) {
    parts.push(screenshotParagraph);
  }

  // Items list
  const itemsList = generateItemsList(data.items);
  if (itemsList) {
    parts.push(itemsList);
  }

  // Authorization statement
  parts.push(
    `\n\nI am authorised to act on behalf of ${data.businessName} and that no person has the right to remove items from our store without making payment.`
  );

  return parts.join('');
};
