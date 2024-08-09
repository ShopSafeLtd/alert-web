import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';

import React from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

import ReactFlowView from './Flow.view';
import useFlow from './hooks/useFlow';
import { WebRtcProviderContextProvider } from './hooks/useWebRtcProvidor';

interface Props {
  importData: ViewInvestigationQuery | undefined;
}

const ReactFlowPro = ({ importData }: Props) => {
  const { id: investigationId } = useParams();
  const {
    clientCount,
    // reactFlowInstance,
    downloadImage,
    edges,
    flowScreen,
    isFullScreen,
    isSynced,
    loading,
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
      loading={loading}
      nodes={nodes}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onNodesChange={onNodesChange}
      onSave={onSave}
      savedWhen={savedWhen}
      // handlePointMove={handlePointMove}
      saving={saving}
      setFullScreen={setFullScreen}
      setReactFlowInstance={setReactFlowInstance}
      wrapperRef={wrapperRef}
    />
  );
};

const Flow = ({ importData }: Props) => (
  <ReactFlowProvider>
    <WebRtcProviderContextProvider>
      <ReactFlowPro importData={importData} />
    </WebRtcProviderContextProvider>
  </ReactFlowProvider>
);
export default Flow;
