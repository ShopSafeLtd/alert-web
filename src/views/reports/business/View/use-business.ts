import type { BusinessReportQuery } from 'graphql/businesses/queries/__generated__/business-report.generated';
import type { Moment } from 'moment';

import { useBusinessReportQuery } from 'graphql/businesses/queries/__generated__/business-report.generated';
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Return {
  data: BusinessReportQuery | undefined;
  dateRange: Moment[];
  loading: boolean;
  selectedBusiness: string | undefined;
  setDateRange: (values: Moment[]) => void;
}

const useBusiness = (): Return => {
  const { id: selectedBusiness } = useParams();
  const [dateRange, setDateRange] = useState([moment('01/01/2022'), moment()]);

  const { data } = useBusinessReportQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      endDate: dateRange[1]?.toDate(),
      startDate: dateRange[0]?.toDate(),
      where: {
        id: selectedBusiness,
      },
    },
  });

  return {
    data,
    dateRange,
    loading: !data,
    selectedBusiness,
    setDateRange,
  };
};

export default useBusiness;
