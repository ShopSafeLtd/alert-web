import type { Dayjs } from 'dayjs';
import type { BusinessReportQuery } from 'graphql/businesses/queries/__generated__/business-report.generated';

import dayjs from 'dayjs';
import { useBusinessReportQuery } from 'graphql/businesses/queries/__generated__/business-report.generated';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Return {
  data: BusinessReportQuery | undefined;
  dateRange: Dayjs[];
  loading: boolean;
  selectedBusiness: string | undefined;
  setDateRange: (values: Dayjs[]) => void;
}

const useBusiness = (): Return => {
  const { id: selectedBusiness } = useParams();
  const [dateRange, setDateRange] = useState([dayjs('01/01/2022'), dayjs()]);

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
