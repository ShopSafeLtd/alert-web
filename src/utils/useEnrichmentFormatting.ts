import {
  AiImpactAssessmentCategory,
  AiRiskAssessmentSafetyRisk,
  AiRiskAssessmentThreatLevel,
} from 'graphql/types';
import { useIntl } from 'react-intl';

const mediumStyle = {
  background: 'linear-gradient(to right,#eea849,#f46b45)',
};
const highStyle = {
  background: 'linear-gradient(to right,#cb2d3e,#ef473a)',
};
const lowStyle = {
  background: 'linear-gradient(to right,#536976,#292E49)',
};

const getThreatLevelStyle = (category?: AiRiskAssessmentThreatLevel | null) => {
  switch (category) {
    case AiRiskAssessmentThreatLevel.Medium: {
      return mediumStyle;
    }
    case AiRiskAssessmentThreatLevel.High: {
      return highStyle;
    }
    default: {
      return lowStyle;
    }
  }
};
const getStaffRiskStyle = (category?: AiRiskAssessmentSafetyRisk | null) => {
  switch (category) {
    case AiRiskAssessmentSafetyRisk.Moderate: {
      return mediumStyle;
    }
    case AiRiskAssessmentSafetyRisk.High: {
      return highStyle;
    }
    default: {
      return lowStyle;
    }
  }
};
const getCategoryStyle = (category?: AiImpactAssessmentCategory | null) => {
  switch (category) {
    case AiImpactAssessmentCategory.Medium: {
      return mediumStyle;
    }
    case AiImpactAssessmentCategory.High: {
      return highStyle;
    }
    default: {
      return lowStyle;
    }
  }
};

const useEnrichmentFormatting = () => {
  const intl = useIntl();

  const formatImpactCategory = (
    category?: AiImpactAssessmentCategory | null
  ) => {
    switch (category) {
      case AiImpactAssessmentCategory.Low: {
        return intl.formatMessage({ defaultMessage: 'Low' });
      }
      case AiImpactAssessmentCategory.Medium: {
        return intl.formatMessage({ defaultMessage: 'Medium' });
      }
      case AiImpactAssessmentCategory.High: {
        return intl.formatMessage({ defaultMessage: 'High' });
      }
      default: {
        return intl.formatMessage({ defaultMessage: 'Unknown' });
      }
    }
  };

  const formatThreatLevel = (category?: AiRiskAssessmentThreatLevel | null) => {
    switch (category) {
      case AiRiskAssessmentThreatLevel.Low: {
        return intl.formatMessage({ defaultMessage: 'Low' });
      }
      case AiRiskAssessmentThreatLevel.Medium: {
        return intl.formatMessage({ defaultMessage: 'Medium' });
      }
      case AiRiskAssessmentThreatLevel.High: {
        return intl.formatMessage({ defaultMessage: 'High' });
      }
      default: {
        return intl.formatMessage({ defaultMessage: 'Unknown' });
      }
    }
  };

  // AiRiskAssessmentSafetyRisk
  const formatStaffRisk = (category?: AiRiskAssessmentSafetyRisk | null) => {
    switch (category) {
      case AiRiskAssessmentSafetyRisk.Low: {
        return intl.formatMessage({ defaultMessage: 'Low' });
      }
      case AiRiskAssessmentSafetyRisk.Moderate: {
        return intl.formatMessage({ defaultMessage: 'Medium' });
      }
      case AiRiskAssessmentSafetyRisk.High: {
        return intl.formatMessage({ defaultMessage: 'High' });
      }
      default: {
        return intl.formatMessage({ defaultMessage: 'Unknown' });
      }
    }
  };

  return {
    formatImpactCategory,
    formatStaffRisk,
    formatThreatLevel,
    getCategoryStyle,
    getStaffRiskStyle,
    getThreatLevelStyle,
  };
};

export default useEnrichmentFormatting;
