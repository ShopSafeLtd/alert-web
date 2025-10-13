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
        })}
      </div>
      <div
        className="dndnode input"
        draggable
        onDragStart={(event) => onDragStart(event, 'input')}
      >
        {intl.formatMessage({
          defaultMessage: 'Input Node',
        })}
      </div>
      <div
        className="dndnode"
        draggable
        onDragStart={(event) => onDragStart(event, 'default')}
      >
        {intl.formatMessage({
          defaultMessage: 'Default Node',
        })}
      </div>
      <div
        className="dndnode output"
        draggable
        onDragStart={(event) => onDragStart(event, 'output')}
      >
        {intl.formatMessage({
          defaultMessage: 'Output Node',
        })}
      </div>
    </aside>
  );
};
export default SideBar;
