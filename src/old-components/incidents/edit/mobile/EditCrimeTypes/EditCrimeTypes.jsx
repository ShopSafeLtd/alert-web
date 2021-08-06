import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FullWidthButton } from '../../../../global/actions';
import CrimeTypeList from '../../../global/CrimeTypeList/CrimeTypeList';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { ErrorText } from '../../../../global/typography';
import { useStoreActions } from '../../../../../state';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 30px;
`;

const EditCrimeTypes = ({
  basePath,
  crimeTypes,
  setCrimeTypes,
  crimeTypesList,
  validateCrimeTypes,
  history,
  loading
}) => {
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);

  const [error, setError] = useState('');

  useEffect(() => {
    setBackLinkTo(basePath);
    // eslint-disable-next-line
  }, []);

  const toggleCrimeTypes = crimeType =>
    crimeTypes.map(({ id }) => id).includes(crimeType)
      ? setCrimeTypes(crimeTypes.filter(({ id }) => crimeType !== id))
      : setCrimeTypes([
          ...crimeTypes,
          crimeTypesList.find(({ id }) => id === crimeType)
        ]);

  const handleSave = () => {
    validateCrimeTypes()
      .then(() => {
        handleSave();
        history.push(basePath);
      })
      .catch(() => setError('Please select at least one crime type.'));
  };

  return (
    <Page>
      <Header>
        <HeaderText>Crime Catagories</HeaderText>
        <HeaderSubText>
          Update the crime catagories for this incident.
        </HeaderSubText>
      </Header>
      {error && <ErrorText>Please select at least one crime type</ErrorText>}
      <Form>
        <CrimeTypeList
          selected={crimeTypes.map(({ id }) => id)}
          toggleSelected={toggleCrimeTypes}
          disabled={loading}
          crimeTypes={crimeTypesList}
        />
      </Form>
      <FullWidthButton
        text="Save Crime Types"
        onClick={handleSave}
        disabled={loading}
      />
    </Page>
  );
};

export default EditCrimeTypes;
