import { useParams } from 'react-router-dom';
import { useBusinessReportQuery, BusinessReportQuery } from 'graphql/generated';
import moment, { Moment } from 'moment';
import { useState } from 'react';

interface Return {
  data: BusinessReportQuery | undefined;
  loading: boolean;
  selectedBusiness: string | undefined;
  dateRange: Moment[];
  setDateRange: (values: Moment[]) => void;
}

const useBusiness = (): Return => {
  const { id: selectedBusiness } = useParams();
  const [dateRange, setDateRange] = useState([moment('01/01/2022'), moment()]);

  const { data } = useBusinessReportQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: selectedBusiness,
      },
      startDate: dateRange[0]?.toDate(),
      endDate: dateRange[1]?.toDate(),
    },
  });

  return {
    data,
    loading: !data,
    selectedBusiness,
    dateRange,
    setDateRange,
  };
};

export default useBusiness;
