import { useInvestigationFlowDataQuery } from 'graphql/investigations/queries/__generated__/investigation-flow-data.generated';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

import ReactFlowView from './Flow.view';
import useFlow from './hooks/useFlow';
import { WebRtcProviderContextProvider } from './hooks/useWebRtcProvidor';

const ReactFlowPro = () => {
  const { id: investigationId } = useParams();

  const {
    data: importData,
    error: queryError,
    loading: queryLoading,
  } = useInvestigationFlowDataQuery({
    skip: !investigationId,
    variables: {
      where: {
        id: investigationId || '',
      },
    },
  });

  const {
    clientCount,
    // reactFlowInstance,
    downloadImage,
    edges,
    flowScreen,
    isFullScreen,
    isSynced,
    loading,
    loadingError,
    loadingPhase,
    nodes,
    onConnect,
    onDragOver,
    onDrop,
    onEdgesChange,
    onNodeClick,
    onNodesChange,
    onSave,
    savedWhen,
    // handlePointMove,
    // users,
    // provider,
    saving,
    setFullScreen,
    setReactFlowInstance,
    wrapperRef,
  } = useFlow({
    importData,
    investigationId: investigationId || '',
  });
  return (
    <ReactFlowView
      clientCount={clientCount}
      downloadImage={downloadImage}
      edges={edges}
      flowScreen={flowScreen}
      // reactFlowInstance={reactFlowInstance}
      // provider={provider}
      // users={users}
      isFullScreen={isFullScreen}
      isSynced={isSynced}
      loading={loading || queryLoading}
      loadingError={loadingError}
      loadingPhase={loadingPhase}
      nodes={nodes}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onNodesChange={onNodesChange}
      onSave={onSave}
      queryError={queryError}
      savedWhen={savedWhen}
      // handlePointMove={handlePointMove}
      saving={saving}
      setFullScreen={setFullScreen}
      setReactFlowInstance={setReactFlowInstance}
      wrapperRef={wrapperRef}
    />
  );
};

const Flow = () => (
  <ReactFlowProvider>
    <WebRtcProviderContextProvider>
      <ReactFlowPro />
    </WebRtcProviderContextProvider>
  </ReactFlowProvider>
);
export default Flow;
