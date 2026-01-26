import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import { useUserContactQuery } from '#/views/incidents/AddIncident/components/IncidentPolice/graphql/queries/__generated__/get-contact.generated';
import { useBusinessDetailsLazyQuery } from '#/views/incidents/AddIncident/graphql/queries/__generated__/business-details.generated';
import {
  type MG11TemplateData,
  formatDate,
  formatTime,
  generateCCTVReviewStatement,
  generateInPersonWitnessStatement,
} from '#/views/incidents/AddIncident/helpers/mg11-templates';
import { Form } from 'antd';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  businessId?: string;
  form: FormInstance<FormData>;
  policeReporting: boolean;
}

interface Return {
  generating: boolean;
}

/**
 * Custom hook to generate MG11 witness statements from form data
 * Watches form fields and automatically updates the policeStatement field
 */
export const useGenerateMG11Statement = ({
  businessId,
  form,
  policeReporting,
}: Props): Return => {
  const [generating, setGenerating] = useState(false);

  // Lazy query to fetch business details
  const [fetchBusinessDetails] = useBusinessDetailsLazyQuery();

  // Get witness occupation from user contact query
  const { data: userContactData } = useUserContactQuery();

  // Watch form fields that affect statement generation
  const business = Form.useWatch('business', form);
  const date = Form.useWatch('date', form);
  const tags = Form.useWatch('tags', form);
  const cctv = Form.useWatch('cctv', form);
  const offenders = Form.useWatch('offenders', form);
  const goods = Form.useWatch('goods', form);
  const images = Form.useWatch('images', form);
  const policeWitnessAtTime = Form.useWatch('policeWitnessAtTime', form);
  const description = Form.useWatch('description', form);
  const policeIncidentDuration = Form.useWatch('policeIncidentDuration', form);
  const policeDistanceFromIncident = Form.useWatch(
    'policeDistanceFromIncident',
    form
  );
  const policeObstructions = Form.useWatch('policeObstructions', form);
  const policeObstructionsDetails = Form.useWatch(
    'policeObstructionsDetails',
    form
  );

  /**
   * Map form data to template data structure
   */
  const mapFormDataToTemplateData =
    useCallback(async (): Promise<MG11TemplateData | null> => {
      // Get business details
      const targetBusinessId = businessId || business?.value;
      console.log('[MG11] Mapping form data', {
        businessId,
        businessValue: business?.value,
        targetBusinessId,
      });

      if (!targetBusinessId) {
        console.log('[MG11] No business ID available');
        return null;
      }

      // Fetch business details
      const { data: businessData } = await fetchBusinessDetails({
        variables: {
          where: { id: targetBusinessId },
        },
      });

      if (!businessData?.business) {
        console.log('[MG11] No business data found');
        return null;
      }

      console.log('[MG11] Found business:', businessData.business.name);

      const businessName = businessData.business.name || '';

      // Build address from first location
      const firstLocation = businessData.business.locations?.[0];
      const businessAddress = firstLocation
        ? [
            firstLocation.building,
            firstLocation.street,
            firstLocation.townCity,
            firstLocation.county,
            firstLocation.postcode,
          ]
            .filter(Boolean)
            .join(', ')
        : '';

      // Get job title from user contact
      const jobTitle = userContactData?.userContact?.occupation || '';

      // Get incident type from first tag
      const incidentType = tags?.[0] ? 'theft' : ''; // Will need to look up tag name

      // Format incident date and time
      const incidentDate = formatDate(date);
      const incidentTime = formatTime(date);

      // Get CCTV details from first CCTV record
      const firstCCTV = cctv?.[0];
      const cctvReviewTime = firstCCTV
        ? formatTime(firstCCTV.startTime)
        : undefined;
      const cctvReviewDate = firstCCTV
        ? formatDate(firstCCTV.startTime)
        : undefined;
      const cctvTimeCorrect = firstCCTV?.correctTime;
      const cctvIncorrectBy = firstCCTV?.incorrectBy;
      const cctvAheadBehind = firstCCTV?.aheadBehind?.toLowerCase() as
        | 'ahead'
        | 'behind'
        | undefined;

      // Get offender details
      const firstOffender = offenders?.[0];
      let offenderName = 'unknown to me';
      if (
        firstOffender &&
        firstOffender.name &&
        firstOffender.name !== 'Unidentified Offender'
      ) {
        offenderName = `known to me as ${firstOffender.name}`;
      }
      // Use comment field as description (description field doesn't exist on offender type)
      const offenderDescription: string | undefined =
        firstOffender?.comment ?? undefined;

      // Get screenshot details from first image
      const firstImage = images?.[0];
      // Note: timestamp field might not exist on StateImageData, handle safely
      const timestamp = (firstImage as { timestamp?: Date | string })
        ?.timestamp;
      const screenshotTime = timestamp ? formatTime(timestamp) : undefined;
      const screenshotDate = timestamp ? formatDate(timestamp) : undefined;
      const imageRef = firstImage?.position?.toString() || '1';

      // Get witness observation details (in-person only)
      const incidentDuration = policeIncidentDuration;
      const distanceFromIncident = policeDistanceFromIncident;

      let viewObstructed = 'unobstructed';
      if (policeObstructions === 'false' || policeObstructions === false) {
        viewObstructed = policeObstructionsDetails
          ? `obstructed by ${policeObstructionsDetails}`
          : 'obstructed';
      }

      // Map goods to items
      const items = (goods || []).map((item) => ({
        loss: item.value || 0, // Loss is same as value for individual items
        name: item.name || item.description || 'Unknown item',
        value: item.value || 0,
      }));

      return {
        businessAddress,
        businessName,
        cctvAheadBehind,
        cctvIncorrectBy,
        cctvReviewDate,
        cctvReviewTime,
        cctvTimeCorrect,
        distanceFromIncident,
        imageRef,
        incidentDate,
        incidentDuration,
        incidentTime,
        incidentType,
        items,
        jobTitle,
        offenderDescription,
        offenderName,
        policeWitnessAtTime: policeWitnessAtTime || false,
        screenshotDate,
        screenshotTime,
        viewObstructed,
      };
    }, [
      fetchBusinessDetails,
      businessId,
      business,
      userContactData,
      tags,
      date,
      cctv,
      offenders,
      images,
      goods,
      policeWitnessAtTime,
      policeIncidentDuration,
      policeDistanceFromIncident,
      policeObstructions,
      policeObstructionsDetails,
    ]);

  /**
   * Generate statement and update form
   */
  const generateStatement = useCallback(async () => {
    console.log('[MG11] Attempting to generate statement', {
      policeReporting,
      policeWitnessAtTime,
    });

    if (!policeReporting || policeWitnessAtTime === undefined) {
      console.log('[MG11] Skipping generation - conditions not met', {
        policeReporting,
        policeWitnessAtTime,
      });
      return;
    }

    const formData = form.getFieldsValue();
    if (!formData.description) {
      console.log('[MG11] Skipping generation - no description');
      return;
    }

    setGenerating(true);
    console.log('[MG11] Starting statement generation');

    try {
      const templateData = await mapFormDataToTemplateData();
      if (!templateData) {
        console.log('[MG11] Failed to map form data - no business found');
        setGenerating(false);
        return;
      }

      console.log('[MG11] Template data:', templateData);

      // Generate statement based on witness type
      const statement = policeWitnessAtTime
        ? generateInPersonWitnessStatement(templateData)
        : generateCCTVReviewStatement(templateData);

      console.log('[MG11] Generated statement:', statement);

      // Update form field
      form.setFieldValue('policeStatement', statement);
      console.log('[MG11] Statement updated in form');
    } catch (error: unknown) {
      console.error('[MG11] Error generating MG11 statement:', error);
    } finally {
      setGenerating(false);
    }
  }, [policeReporting, policeWitnessAtTime, form, mapFormDataToTemplateData]);

  /**
   * Debounced version of generateStatement (1000ms delay)
   */
  const debouncedGenerateStatement = useMemo(
    () =>
      debounce(() => {
        void generateStatement();
      }, 1000),
    [generateStatement]
  );

  /**
   * Trigger statement generation when watched fields change
   */
  useEffect(() => {
    void debouncedGenerateStatement();
    return () => debouncedGenerateStatement.cancel();
  }, [
    policeReporting,
    policeWitnessAtTime,
    business,
    date,
    tags,
    cctv,
    offenders,
    goods,
    images,
    description,
    policeIncidentDuration,
    policeDistanceFromIncident,
    policeObstructions,
    policeObstructionsDetails,
    debouncedGenerateStatement,
  ]);

  return {
    generating,
  };
};
