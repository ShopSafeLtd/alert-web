import React from 'react';
import { useIntl } from 'react-intl';

const onDragStart = (
  event: React.DragEvent<HTMLDivElement>,
  nodeType: string
) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  // eslint-disable-next-line no-param-reassign
  event.dataTransfer.effectAllowed = 'move';
};
const SideBar = () => {
  const intl = useIntl();

  return (
    <aside>
      <div className="description">
        {intl.formatMessage({
          defaultMessage: 'You can drag these nodes to the pane on the right.',
          id: 'TToxGs',
        })}
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      >
        {intl.formatMessage({
          defaultMessage: 'Input Node',
          id: 'FUnyfx',
        })}
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
      >
        {intl.formatMessage({
          defaultMessage: 'Default Node',
          id: 'qV4R14',
        })}
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      >
        {intl.formatMessage({
          defaultMessage: 'Output Node',
          id: '9MnnCm',
        })}
      </div>
    </aside>
  );
};
export default SideBar;
