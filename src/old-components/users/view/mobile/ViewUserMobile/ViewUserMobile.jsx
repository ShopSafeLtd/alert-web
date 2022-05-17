import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import EditIcon from '@material-ui/icons/Edit';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import Block from '@material-ui/icons/Block';
import Delete from '@material-ui/icons/Delete';
import Send from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';

import UserDetails from '../UserDetails/UserDetails';
import UserGroups from '../UserGroups/UserGroups';
import UserActivity from '../UserActivity/UserActivity';
import UserChats from '../UserChats/UserChats';
import SendInvite from '../../../../../graphql/users/mutations/SendInvite';
import ToggleUser from '../../../../../graphql/users/mutations/ToggleUser';
import DeleteUser from '../../../../../graphql/users/mutations/DeleteUser';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';
import AllUsers from '../../../../../graphql/users/queries/AllUsersQuery';

const Page = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
`;
const TabContainer = styled(AppBar)`
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12) !important;
  background-color: #fff !important;
`;
const StyledFab = styled(Fab)`
  position: fixed !important;
  bottom: 70px !important;
  right: 10px !important;
`;
const SendIcon = styled(Send)`
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.54);
`;
const BlockIcon = styled(Block)`
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.54);
`;
const DeleteIcon = styled(Delete)`
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.54);
`;

const ViewUserMobile = ({
  user,
  userLoading,
  auth0User,
  actions,
  actionsLoading,
  loadMoreActions,
  toggleNotificationBar,
  setMultiAppBar,
  setTitle,
  setBackLinkTo,
  setNavbarAction,
  setActions,
  isCurrent
}) => {
  const navigate = useNavigate()
  // state
  const [tab, setTab] = useState(0);
  const [anchorEl, setAncorEl] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [remove, setRemove] = useState(false);
  const [invite, setInvite] = useState(false);

  const transitionDuration = {
    enter: 225,
    exit: 195
  };
  const fabs = [
    {
      index: 0,
      icon: <EditIcon />,
      to: `/admin/users/edit/${user.id}`
    },
    {
      index: 1,
      icon: <EditIcon />,
      to: `/admin/users/groups/${user.id}`
    },
    {
      index: 2,
      icon: <EditIcon />,
      to: `/admin/users/chat-groups/${user.id}`
    }
  ];

  // effects
  useEffect(() => {
    setMultiAppBar(true);
    setTitle('View User');
    setBackLinkTo('/admin/users');
    setNavbarAction('backLink');
    setActions([
      <IconButton key={0} onClick={handleClick}>
        <SettingsIcon />
      </IconButton>
    ]);
    return () => {
      setMultiAppBar(false);
      setTitle('');
      setBackLinkTo('');
      setNavbarAction('');
      setActions([]);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(
    () => {
      setTitle(user.fullName);
    },
    // eslint-disable-next-line
    [user]
  );

  // mutations
  const [sendInvite] = useMutation(SendInvite, {
    onCompleted: () =>
      toggleNotificationBar(true, 'Invite successfully sent to user.', false)
  });
  const [toggleUser] = useMutation(ToggleUser, {
    onCompleted: data =>
      toggleNotificationBar(
        true,
        `User ${data.toggleUser.disabled ? 'Disabled' : 'Enabled'}`,
        false
      )
  });
  const [deleteUser] = useMutation(DeleteUser, {
    onCompleted: data => toggleNotificationBar(true, `User Deleted`, false),
    update: (store, { data: { deleteUser } }) => {
      let data = store.readQuery({
        query: AllUsers,
        variables: {
          search: '',
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
      data.users = data.users.filter(({ id }) => deleteUser.id !== id);
      store.writeQuery({
        query: AllUsers,
        data,
        variables: {
          search: '',
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
    }
  });

  // functions
  const handleClick = event => {
    setAncorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAncorEl(null);
  };

  return (
    <Page>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!user.newUser && (
          <MenuItem
            disabled={userLoading || isCurrent}
            onClick={() => {
              handleClose();
              setInvite(true);
            }}
          >
            <SendIcon />
            Re-Send Invite
          </MenuItem>
        )}
        <MenuItem
          disabled={userLoading || isCurrent}
          onClick={() => {
            handleClose();
            setToggle(true);
          }}
        >
          <BlockIcon />
          {user.disabled ? 'Enable User' : 'Disable User'}
        </MenuItem>
        <MenuItem
          disabled={userLoading || isCurrent}
          onClick={() => {
            handleClose();
            setRemove(true);
          }}
        >
          <DeleteIcon />
          Delete User
        </MenuItem>
      </Menu>
      <TabContainer position="static" color="default">
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Details" />
          <Tab label="Groups" />
          <Tab label="Chats" />
          <Tab label="Activity" />
        </Tabs>
      </TabContainer>
      <SwipeableViews index={tab} onChangeIndex={e => setTab(e)}>
        <UserDetails user={user} userLoading={userLoading} />
        <UserGroups user={user} userLoading={userLoading} />
        <UserChats user={user} loading={userLoading} />
        <UserActivity
          auth0User={auth0User}
          actions={actions}
          loading={actionsLoading}
          loadMore={loadMoreActions}
        />
      </SwipeableViews>
      {fabs.map(({ index, icon, to }) => (
        <Zoom
          key={index}
          in={tab === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${tab === index ? transitionDuration.exit : 0}ms`
          }}
        >
          <StyledFab
            color="primary"
            disabled={userLoading}
            component={Link}
            to={to}
          >
            {icon}
          </StyledFab>
        </Zoom>
      ))}
      <ConfirmDialog
        open={toggle}
        handleClose={() => setToggle(false)}
        title="Are you sure?"
        description={
          user.disabled
            ? 'Enabling the user will allow them to sign back into alert.'
            : 'Disbaling the user will prevent them from signing into alert but will retain all content that they have have created.'
        }
        actions={[
          <Button onClick={() => setToggle(false)}>Cancel</Button>,
          <Button
            color="primary"
            onClick={() => {
              setToggle(false);
              toggleUser({
                variables: {
                  id: user.id
                }
              });
            }}
          >
            {user.disabled ? 'Enable User' : 'Disable User'}
          </Button>
        ]}
      />
      <ConfirmDialog
        open={remove}
        handleClose={() => setRemove(false)}
        title="Are you sure?"
        description="Deleting this user will remove them from the scheme and any groups, it will not remove any content that they have submitted. This action can not be undone."
        actions={[
          <Button onClick={() => setRemove(false)}>Cancel</Button>,
          <Button
            color="primary"
            onClick={() => {
              setRemove(false);
              deleteUser({
                variables: {
                  id: user.id,
                  scheme: window.localStorage.getItem('currentScheme')
                },
                optimisticResponse: {
                  deleteUser: {
                    id: user.id,
                    __typename: 'User'
                  }
                }
              });
              navigate('/admin/users');
            }}
          >
            Delete User
          </Button>
        ]}
      />
      <ConfirmDialog
        open={invite}
        handleClose={() => setRemove(false)}
        title="Are you sure?"
        setInvite
        description="Resending the invite will reset the users password and send them an new invite containing the new password."
        actions={[
          <Button onClick={() => setInvite(false)}>Cancel</Button>,
          <Button
            color="primary"
            onClick={() => {
              setInvite(false);
              sendInvite({
                variables: {
                  user: user.id
                },
                optimisticResponse: {
                  sendInvite: {
                    id: user.id,
                    __typename: 'User'
                  }
                }
              });
            }}
          >
            Send Invite
          </Button>
        ]}
      />
    </Page>
  );
};

export default ViewUserMobile;
