import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { FullWidthButton } from '../../../../global/actions';
import CrimeTypeList from '../../../global/CrimeTypeList/CrimeTypeList';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { ErrorText, EmptyText } from '../../../../global/typography';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 30px;
`;
const Empty = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CrimeIcon = styled.svg`
  width: 58px;
  height: 58px;
  color: #ef5350;
`;

const AddCrimeTypes = ({
  selected,
  toggleSelected,
  error,
  crimeTypesList,
  loading,
  setNavbarAction,
  setBackLinkTo,
  validateCrimeTypes,
  history
}) => {
  useEffect(() => {
    setNavbarAction('backLink');
    setBackLinkTo('/incidents/add');
    return () => {
      setNavbarAction('default');
      setBackLinkTo('');
    };
    // eslint-disable-next-line
  }, []);

  const handleNext = () => {
    validateCrimeTypes().then(() => history.push('/incidents/add/location'));
  };

  return (
    <Page>
      <Header>
        <HeaderText>Crime Catagories</HeaderText>
        <HeaderSubText>
          Select any relevant crime catagories for this incident.
        </HeaderSubText>
      </Header>
      <ErrorText>{error}</ErrorText>
      <Form>
        {crimeTypesList.length > 0 ? (
          <CrimeTypeList
            selected={selected}
            toggleSelected={toggleSelected}
            crimeTypes={crimeTypesList}
            loading={loading}
          />
        ) : (
          <Empty>
            <CrimeIcon viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z"
              />
            </CrimeIcon>
            <EmptyText>
              There are currently no crime types in this scheme.
            </EmptyText>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to="/admin/crime-types"
            >
              Manage Crime Types
            </Button>
          </Empty>
        )}
      </Form>
      <FullWidthButton text="Next" onClick={handleNext} />
    </Page>
  );
};

export default AddCrimeTypes;
