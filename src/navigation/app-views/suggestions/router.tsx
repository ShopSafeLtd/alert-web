import RouteWrapper from '#/navigation/utils/route-wrapper';
import AiCentre from '#/views/ai/ai-centre/AiCentre.view';
import React from 'react';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router';

const Suggestions = (): JSX.Element => {
  const intl = useIntl();
  return (
    <RouteWrapper
      title={intl.formatMessage({
        defaultMessage: 'Incidents',
      })}
    >
      <Routes>
        <Route element={<AiCentre />} index />
      </Routes>
    </RouteWrapper>
  );
};

export default Suggestions;
