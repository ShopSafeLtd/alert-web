import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import React from 'react';
import useFlow from './hooks/useFlow';
import ReactFlowView from './Flow.view';
import type { ViewInvestigationQuery } from '../../../../../graphql/generated';

interface Props {
  importData: ViewInvestigationQuery | undefined;
}

const ReactFlowPro = ({ importData }: Props) => {
  const { id: investigationId } = useParams();
  const {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    clientCount,
    isSynced,
    setReactFlowInstance,
    savedWhen,
    onSave,
    onNodeClick,
    onDrop,
    onDragOver,
    wrapperRef,
    loading,
    saving,
    // handlePointMove,
    // users,
    // provider,
    // reactFlowInstance,
    downloadImage,
    flowScreen,
    isFullScreen,
    setFullScreen,
  } = useFlow({
    investigationId: investigationId || '',
    importData,
  });
  return (
    <ReactFlowView
      flowScreen={flowScreen}
      isFullScreen={isFullScreen}
      setFullScreen={setFullScreen}
      downloadImage={downloadImage}
      // reactFlowInstance={reactFlowInstance}
      // provider={provider}
      // users={users}
      // handlePointMove={handlePointMove}
      saving={saving}
      loading={loading}
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      clientCount={clientCount}
      isSynced={isSynced}
      setReactFlowInstance={setReactFlowInstance}
      savedWhen={savedWhen}
      onSave={onSave}
      onNodeClick={onNodeClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      wrapperRef={wrapperRef}
    />
  );
};

const Flow = ({ importData }: Props) => (
  <ReactFlowProvider>
    <ReactFlowPro importData={importData} />
  </ReactFlowProvider>
);
export default Flow;
