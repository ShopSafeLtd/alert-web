import React from 'react';
import { Menu as AntMenu, Typography } from 'antd';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { IoBanOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  actions: {
    addExclusion: (id: string) => void;
    deleteOffender: (id: string) => void;
  };
}

/**
 *@param id - offender id.
 *@param actions - handler functions for the menu items.
 * @returns JSX.Element containing menu component to pass to CardLayout as the menu prop.
 */
const Menu: React.FC<Props> = ({ id, actions }) => {
  return (
    <div
      style={{
        marginRight: '3px',
        borderRadius: '5px',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      <AntMenu>
        <AntMenu.Item key="0">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IoBanOutline color="#757575" size={20} />
            <div style={{ marginLeft: '8px' }} />
            <Typography.Text
              onClick={() => actions.addExclusion(id)}
              style={{ color: '#757575', fontSize: '14px' }}
            >
              Add Exclusion
            </Typography.Text>
          </div>
        </AntMenu.Item>
        <AntMenu.Divider />
        <AntMenu.Item key="1">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IoMdCreate color="#757575" size={20} />
            <div style={{ marginLeft: '8px' }} />
            <Link to={`/app/offenders/edit/${id}`}>
              <Typography.Text style={{ color: '#757575', fontSize: '14px' }}>
                Edit Offender
              </Typography.Text>
            </Link>
          </div>
        </AntMenu.Item>
        <AntMenu.Item key="2">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IoMdTrash color="#EF5350" size={20} />
            <div style={{ marginLeft: '8px' }} />
            <Typography.Text
              onClick={() => actions.deleteOffender(id)}
              style={{ color: '#EF5350', fontSize: '14px' }}
            >
              Delete Offender
            </Typography.Text>
          </div>
        </AntMenu.Item>
      </AntMenu>
    </div>
  );
};

export default Menu;
