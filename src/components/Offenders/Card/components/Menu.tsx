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
  const addExclusion = () => actions.addExclusion(id);
  const deleteOffender = () => actions.deleteOffender(id);
  return (
    <AntMenu className="expanded-menu">
      <AntMenu.Item key="0" onClick={addExclusion}>
        <div className="menu-item">
          <IoBanOutline color="#757575" size={20} />
          <Typography.Text>Add Exclusion</Typography.Text>
        </div>
      </AntMenu.Item>
      <AntMenu.Divider />
      <AntMenu.Item key="1">
        <div className="menu-item">
          <IoMdCreate color="#757575" size={20} />
          <Link to={`/app/offenders/edit/${id}`}>
            <Typography.Text>Edit Offender</Typography.Text>
          </Link>
        </div>
      </AntMenu.Item>
      <AntMenu.Item key="2" onClick={deleteOffender}>
        <div className="menu-item delete">
          <IoMdTrash color="#EF5350" size={20} />
          <Typography.Text>Delete Offender</Typography.Text>
        </div>
      </AntMenu.Item>
    </AntMenu>
  );
};

export default Menu;
