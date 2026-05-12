import type { RemoteTrack } from 'livekit-client';
import type { DraggableData, DraggableEvent } from 'react-draggable';

type ResizeCallbackData = { size: { height: number; width: number } };

import { CloseOutlined, ExpandOutlined } from '@ant-design/icons';
import { Button, Spin, Typography } from 'antd';
import { Room, RoomEvent, Track } from 'livekit-client';
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useIntl } from 'react-intl';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

import type { StreamState } from '../useLiveStream';

const onResizeStart = () => {
  document.body.style.userSelect = 'none';
};

const onResizeStop = () => {
  document.body.style.userSelect = '';
};

const INITIAL_WIDTH = 480;
const INITIAL_HEIGHT = 300;
const MIN_WIDTH = 280;
const MIN_HEIGHT = 180;
const HANDLE_HEIGHT = 36;

interface LiveVideoProps {
  livekitToken: string;
  livekitUrl: string;
}

const LiveVideo = ({ livekitToken, livekitUrl }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const room = new Room();

    const attachTrack = (track: RemoteTrack) => {
      if (track.kind === Track.Kind.Video && videoRef.current) {
        track.attach(videoRef.current);
      }
    };

    room.on(RoomEvent.TrackSubscribed, attachTrack);
    void room.connect(livekitUrl, livekitToken);

    return () => {
      room.off(RoomEvent.TrackSubscribed, attachTrack);
      void room.disconnect();
    };
  }, [livekitUrl, livekitToken]);

  return (
    <video
      autoPlay
      playsInline
      ref={videoRef}
      style={{
        background: '#000',
        display: 'block',
        height: '100%',
        objectFit: 'contain',
        width: '100%',
      }}
    />
  );
};

interface Props {
  onEndStream: () => void;
  streamState: StreamState;
}

const LiveStreamPanel = ({ onEndStream, streamState }: Props) => {
  const intl = useIntl();
  const [size, setSize] = useState({
    height: INITIAL_HEIGHT,
    width: INITIAL_WIDTH,
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const isOpen =
    streamState.status === 'waiting' ||
    streamState.status === 'streaming' ||
    streamState.status === 'error';

  if (!isOpen) return null;

  const onResize = (_e: React.SyntheticEvent, data: ResizeCallbackData) => {
    setSize({ height: data.size.height, width: data.size.width });
  };

  const onDrag = (_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const videoHeight = size.height - HANDLE_HEIGHT;

  return (
    <Draggable
      handle=".stream-drag-handle"
      nodeRef={nodeRef}
      onDrag={onDrag}
      position={position}
    >
      <div
        ref={nodeRef}
        style={{
          bottom: 24,
          position: 'fixed',
          right: 24,
          zIndex: 1050,
        }}
      >
        <ResizableBox
          height={size.height}
          maxConstraints={[900, 600]}
          minConstraints={[MIN_WIDTH, MIN_HEIGHT + HANDLE_HEIGHT]}
          onResize={onResize}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeStop}
          resizeHandles={['se', 'sw', 'ne', 'nw', 's', 'e', 'w', 'n']}
          width={size.width}
        >
          <div
            style={{
              background: '#000',
              borderRadius: 6,
              boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
              display: 'flex',
              flexDirection: 'column',
              height: size.height,
              overflow: 'hidden',
              width: size.width,
            }}
          >
            {/* Drag handle / title bar */}
            <div
              className="stream-drag-handle"
              style={{
                alignItems: 'center',
                background: 'rgba(0,0,0,0.75)',
                cursor: 'grab',
                display: 'flex',
                flexShrink: 0,
                gap: 8,
                height: HANDLE_HEIGHT,
                padding: '0 10px',
                userSelect: 'none',
              }}
            >
              <ExpandOutlined
                style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}
              />
              <Typography.Text
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  flex: 1,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Live Stream' })}
              </Typography.Text>
              {streamState.status === 'streaming' && (
                <span
                  style={{
                    background: '#ff4d4f',
                    borderRadius: 3,
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 0.8,
                    padding: '1px 5px',
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'LIVE' })}
                </span>
              )}
              {streamState.status === 'waiting' && (
                <Typography.Text
                  style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                >
                  {intl.formatMessage({ defaultMessage: 'Connecting…' })}
                </Typography.Text>
              )}
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={onEndStream}
                size="small"
                style={{
                  border: 'none',
                  color: 'rgba(255,255,255,0.65)',
                  flexShrink: 0,
                }}
                type="text"
              />
            </div>

            {/* Content area */}
            <div style={{ flex: 1, height: videoHeight, position: 'relative' }}>
              {streamState.status === 'error' && (
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    padding: 16,
                  }}
                >
                  <Typography.Text
                    style={{ color: '#ff4d4f', textAlign: 'center' }}
                  >
                    {streamState.error ??
                      intl.formatMessage({ defaultMessage: 'Stream failed' })}
                  </Typography.Text>
                </div>
              )}

              {streamState.status === 'waiting' && (
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    height: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Spin size="large" />
                  <Typography.Text
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Waiting for stream…',
                    })}
                  </Typography.Text>
                </div>
              )}

              {streamState.status === 'streaming' &&
                streamState.livekitUrl &&
                streamState.livekitToken && (
                  <LiveVideo
                    livekitToken={streamState.livekitToken}
                    livekitUrl={streamState.livekitUrl}
                  />
                )}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default LiveStreamPanel;
