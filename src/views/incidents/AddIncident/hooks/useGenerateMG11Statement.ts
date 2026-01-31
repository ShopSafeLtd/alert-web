import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import { useListGoodsTypesQuery } from '#/graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
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
import { useAtomValue } from 'jotai/index';
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

  // Get current scheme ID
  const schemeId = useAtomValue(currentSchemeIdAtom);

  // Get goods types for mapping IDs to names (filtered by current scheme)
  const { data: goodsTypesData } = useListGoodsTypesQuery({
    variables: {
      where: {
        schemes: {
          id: { equals: schemeId },
        },
      },
    },
  });

  // Watch form fields that affect statement generation
  const business = Form.useWatch('business', form);
  const date = Form.useWatch('date', form);
  const tags = Form.useWatch('tags', form);
  const cctv = Form.useWatch('cctv', form);
  const cctvAvailable = Form.useWatch('cctvAvailable', form);
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
  const policeKnownBefore = Form.useWatch('policeKnownBefore', form);
  const policeReasonRemember = Form.useWatch('policeReasonRemember', form);
  const policeCCTVReviewDateTime = Form.useWatch(
    'policeCCTVReviewDateTime',
    form
  );
  const policeCCTVTimeCorrect = Form.useWatch('policeCCTVTimeCorrect', form);
  const policeCCTVAheadBehind = Form.useWatch('policeCCTVAheadBehind', form);
  const policeCCTVIncorrectBy = Form.useWatch('policeCCTVIncorrectBy', form);
  const policeScreenshotDateTime = Form.useWatch(
    'policeScreenshotDateTime',
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

      // Get CCTV details from CCTV section or police fields
      // Prefer CCTV section data if available, otherwise use police fields
      let cctvReviewTime: string | undefined;
      let cctvReviewDate: string | undefined;
      let cctvTimeCorrect: boolean | undefined;
      let cctvIncorrectBy: number | undefined;
      let cctvAheadBehind: 'ahead' | 'behind' | undefined;

      if (cctvAvailable && cctv?.[0]) {
        // Use CCTV section data
        const firstCCTV = cctv[0];
        cctvReviewTime = formatTime(firstCCTV.startTime);
        cctvReviewDate = formatDate(firstCCTV.startTime);
        cctvTimeCorrect = firstCCTV.correctTime;
        cctvIncorrectBy = firstCCTV.incorrectBy;
        cctvAheadBehind = firstCCTV.aheadBehind?.toLowerCase() as
          | 'ahead'
          | 'behind'
          | undefined;
      } else if (!cctvAvailable && policeWitnessAtTime === false) {
        // Use police fields when CCTV section is not available
        cctvReviewTime = policeCCTVReviewDateTime
          ? formatTime(policeCCTVReviewDateTime)
          : undefined;
        cctvReviewDate = policeCCTVReviewDateTime
          ? formatDate(policeCCTVReviewDateTime)
          : undefined;
        cctvTimeCorrect = policeCCTVTimeCorrect;
        cctvIncorrectBy = policeCCTVIncorrectBy;
        cctvAheadBehind = policeCCTVAheadBehind?.toLowerCase() as
          | 'ahead'
          | 'behind'
          | undefined;
      }

      // Get offender details
      const firstOffender = offenders?.[0];
      let offenderName = 'unknown to me';

      // Determine offender identification based on policeKnownBefore field
      if (policeKnownBefore && policeKnownBefore !== 'NOT_KNOWN') {
        // Witness knows the offender
        offenderName =
          firstOffender &&
          firstOffender.name &&
          firstOffender.name !== 'Unidentified Offender'
            ? `known to me as ${firstOffender.name}`
            : 'known to me';
      } else {
        // Witness doesn't know the offender
        offenderName = 'unknown to me';
      }
      // Use comment field as description (description field doesn't exist on offender type)
      const offenderDescription: string | undefined =
        firstOffender?.comment ?? undefined;

      // Get screenshot details from manual entry
      const screenshotTime = policeScreenshotDateTime
        ? formatTime(policeScreenshotDateTime)
        : undefined;
      const screenshotDate = policeScreenshotDateTime
        ? formatDate(policeScreenshotDateTime)
        : undefined;

      // Get author initials from witness name
      const witnessName = userContactData?.userContact?.user?.fullName || '';
      const authorInitials = witnessName
        .split(' ')
        .filter((part) => part.length > 0) // Remove empty strings
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 3); // Limit to 3 characters max

      // Build array of exhibit references for all images
      const exhibitRefs =
        images?.map((image, index) => {
          const position = image.position?.toString() || (index + 1).toString();
          return authorInitials ? `${authorInitials}-${position}` : position;
        }) || [];

      // Get witness observation details (in-person only)
      const incidentDuration = policeIncidentDuration;
      const distanceFromIncident = policeDistanceFromIncident;

      let viewObstructed = 'unobstructed';
      if (policeObstructions === 'false') {
        viewObstructed = policeObstructionsDetails
          ? `obstructed by ${policeObstructionsDetails}`
          : 'obstructed';
      }

      // Create goods type ID to name mapping
      const goodsTypeMap = new Map<string, string>();
      if (goodsTypesData?.listGoodsTypes?.goodsTypes) {
        for (const goodsType of goodsTypesData.listGoodsTypes.goodsTypes) {
          goodsTypeMap.set(goodsType.id, goodsType.name);
        }
      }

      // Map goods to items and filter out items with no value
      const items = (goods || [])
        .filter((item) => item.value && item.value > 0) // Only include items with a value
        .map((item) => {
          let itemName = 'Unknown item';

          // Get goods type name from ID
          const goodsTypeName = item.goodsType
            ? goodsTypeMap.get(item.goodsType)
            : undefined;

          // Build name from goodsType name and/or description
          if (goodsTypeName && item.description) {
            itemName = `${goodsTypeName} - ${item.description}`;
          } else if (goodsTypeName) {
            itemName = goodsTypeName;
          } else if (item.description) {
            itemName = item.description;
          } else if (item.name) {
            itemName = item.name;
          }

          return {
            loss: item.value || 0, // Loss is same as value for individual items
            name: itemName,
            value: item.value || 0,
          };
        });

      return {
        businessAddress,
        businessName,
        cctvAheadBehind,
        cctvIncorrectBy,
        cctvReviewDate,
        cctvReviewTime,
        cctvTimeCorrect,
        distanceFromIncident,
        imageRefs: exhibitRefs,
        incidentDate,
        incidentDuration,
        incidentTime,
        incidentType,
        items,
        jobTitle,
        offenderDescription,
        offenderName,
        policeKnownBefore,
        policeReasonRemember,
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
      goodsTypesData,
      tags,
      date,
      cctv,
      cctvAvailable,
      offenders,
      images,
      goods,
      policeWitnessAtTime,
      policeIncidentDuration,
      policeDistanceFromIncident,
      policeObstructions,
      policeObstructionsDetails,
      policeKnownBefore,
      policeReasonRemember,
      policeCCTVReviewDateTime,
      policeCCTVTimeCorrect,
      policeCCTVAheadBehind,
      policeCCTVIncorrectBy,
      policeScreenshotDateTime,
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
    cctvAvailable,
    offenders,
    goods,
    images,
    description,
    policeIncidentDuration,
    policeDistanceFromIncident,
    policeObstructions,
    policeObstructionsDetails,
    policeKnownBefore,
    policeReasonRemember,
    policeCCTVReviewDateTime,
    policeCCTVTimeCorrect,
    policeCCTVAheadBehind,
    policeCCTVIncorrectBy,
    policeScreenshotDateTime,
    debouncedGenerateStatement,
  ]);

  return {
    generating,
  };
};
