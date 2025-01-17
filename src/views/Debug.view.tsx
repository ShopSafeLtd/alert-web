/* eslint-disable @typescript-eslint/no-unsafe-member-access,formatjs/no-literal-string-in-jsx */
import { useAuth } from '@clerk/clerk-react';
import { Badge, Card, Descriptions, Spin } from 'antd';
import axios from 'axios';
import { usePostHog } from 'posthog-js/react';
import React, { useEffect, useState } from 'react';

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_URL;

const DebugView = () => {
  const [apiStatus, setApiStatus] = useState<
    'blocked' | 'error' | 'loading' | 'success'
  >('loading');
  const [graphqlStatus, setGraphqlStatus] = useState<
    'blocked' | 'error' | 'loading' | 'success'
  >('loading');
  const posthog = usePostHog();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await axios.get('https://app.shopsafe.io/api/health');
        if (response.status === 200) {
          setApiStatus('success');
        } else {
          setApiStatus('error');
        }
      } catch (error) {
        console.error('API Health Check Error:', error);
        // @ts-expect-error - error is not typed
        if (error.response) {
          setApiStatus('error');
          // @ts-expect-error - error is not typed
        } else if (error.message === 'Network Error') {
          setApiStatus('blocked');
        } else {
          setApiStatus('error');
        }
      }
    };

    const checkGraphqlHealth = async () => {
      try {
        const response = await axios.post(
          GRAPHQL_ENDPOINT,
          {
            query: `
              query Health {
                health
              }
            `,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data?.data?.health === true) {
          setGraphqlStatus('success');
        } else {
          setGraphqlStatus('error');
        }
      } catch (error) {
        console.error('GraphQL Health Check Error:', error);

        // @ts-expect-error - error is not typed
        if (error.response) {
          setGraphqlStatus('error');
          // @ts-expect-error - error is not typed
        } else if (error.message === 'Network Error') {
          setGraphqlStatus('blocked');
        } else {
          setGraphqlStatus('error');
        }
      }
    };

    void checkApiHealth();
    void checkGraphqlHealth();
  }, []);

  return (
    <Card
      style={{
        margin: 40,
      }}
      title="Debug View"
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Session ID">
          {posthog?.get_session_id() || 'No session available'}
        </Descriptions.Item>
        <Descriptions.Item label="API Status">
          {apiStatus === 'loading' ? (
            <Spin />
          ) : apiStatus === 'success' ? (
            <Badge status="success" text="Success" />
          ) : apiStatus === 'error' ? (
            <Badge status="error" text="Failed" />
          ) : (
            <Badge status="warning" text="Blocked / Could Not Send Request" />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="GraphQL Status">
          {graphqlStatus === 'loading' ? (
            <Spin />
          ) : graphqlStatus === 'success' ? (
            <Badge status="success" text="Success" />
          ) : graphqlStatus === 'error' ? (
            <Badge status="error" text="Failed - GraphQL" />
          ) : (
            <Badge status="warning" text="Blocked / Could Not Send Request" />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Signed In">
          <Badge
            status={isSignedIn ? 'success' : 'error'}
            text={isSignedIn ? 'Yes' : 'No'}
          />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DebugView;
