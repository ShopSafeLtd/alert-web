import React from 'react';
import { Typography } from 'antd';
import { CrimeGroupQuery } from 'graphql/generated';
import useStyles from './ViewCrimeGroup.styles';

const { Title } = Typography;

interface Props {
  data: CrimeGroupQuery | undefined;
}

const ViewCrimeGroup = ({ data }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Title level={3}>{data?.crimeGroup?.reference}</Title>
    </div>
  );
};

export default ViewCrimeGroup;
