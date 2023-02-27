import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import React from 'react';
import useFlow from './hooks/useFlow';
import ReactFlowView from './Flow.view';

const ReactFlowPro = () => {
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
    offenders,
    loading,
    setSelected,
    saving,
  } = useFlow({
    investigationId: investigationId || '',
  });
  return (
    <ReactFlowView
      saving={saving}
      setSelected={setSelected}
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
      offenders={offenders}
    />
  );
};

export default function Flow() {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}
