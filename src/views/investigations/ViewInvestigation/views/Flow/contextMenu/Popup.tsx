import React from 'react';
import '../styles.css';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';

interface Props {
  record: string;
  visible: boolean;
  x: number;
  y: number;
}

const PopupMenu = ({ record, visible, x, y }: Props) =>
  visible ? (
    <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      <li>
        <UserOutlined />
        {record} `${x}px`, top: `${y}px`
      </li>
      <li>
        <HeartOutlined />
        Like it
      </li>
    </ul>
  ) : (
    <></>
  );

export default PopupMenu;
