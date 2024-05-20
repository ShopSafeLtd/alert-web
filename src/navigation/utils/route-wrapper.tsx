import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * RouteWrapper
 * @param children - The children to render
 * @param title - The title of the page
 *
 * @description This component is a wrapper for the routes in the application.
 * Title will be formatted as "Alert | {title}"
 * It will add the title to the page. If used inside a component that is already wrapped, will override the title. Can be used anywhere despite the naming being RouteWrapper.
 * @return JSX.Element
 *
 */
const RouteWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => (
  <>
    {title ? (
      <Helmet>
        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
        <title>Alert | {title}</title>
      </Helmet>
    ) : (
      <Helmet>
        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
        <title>Alert</title>
      </Helmet>
    )}
    {children}
  </>
);

export default RouteWrapper;
