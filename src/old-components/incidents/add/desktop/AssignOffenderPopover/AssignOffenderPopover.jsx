import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import OffendersImage from '../../../../../images/Offenders';
import { PopOver, PopOverContainer } from '../../../../global/layout';
import { BackButton } from '../../../../global/actions';
import OffenderItem from '../OffenderItem/OffenderItem';

const EmptyText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #757575;
`;
const Offenders = styled.div`
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
`;
const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 80px);
`;
const OffendersList = styled.div`
  height: 100%;
  width: 100%;
`;
const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

const AssignOffenderPopover = ({
  open,
  close,
  offenders,
  image,
  assignImageToOffenders,
}) => {
  // state
  const [selected, setSelected] = useState([]);
  const [assign, setAssign] = useState([]);
  const [remove, setRemove] = useState([]);

  // effects
  useEffect(() => {
    !!image && setSelected(image.offendersIds || []);
  }, [image]);

  // functions
  const toggleOffenders = (id) => {
    if (selected?.includes(id)) {
      setSelected(selected.filter((offender) => offender !== id));
      setAssign(assign.filter((offender) => offender !== id));
      setRemove([...remove, id]);
    } else {
      setSelected([...selected, id]);
      setAssign([...assign, id]);
      setRemove(remove.filter((offender) => offender !== id));
    }
  };
  const handleClose = () => {
    setSelected([]);
    close();
  };

  let actions = [];
  actions.push(
    <BackButton
      variant={offenders.length === 0 ? 'contained' : 'text'}
      color={offenders.length === 0 ? 'primary' : 'default'}
      onClick={handleClose}
    >
      {offenders.length > 0 ? 'Cancel' : 'Close'}
    </BackButton>
  );
  actions.push(
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        assignImageToOffenders(image, assign, remove);
        handleClose();
      }}
    >
      Save Offenders
    </Button>
  );

  return (
    <PopOver
      noPadding
      open={open}
      width={400}
      handleClose={handleClose}
      title={'Assigned offenders'}
      actions={actions}
    >
      <Grow>
        <PopOverContainer>
          {offenders.length > 0 ? (
            <Offenders>
              <OffendersList>
                {offenders.map(({ id, name, images }) => {
                  return (
                    <OffenderItem
                      key={id}
                      id={id}
                      name={name}
                      images={images}
                      toggle={() => toggleOffenders(id)}
                      selected={selected?.includes(id)}
                    />
                  );
                })}
              </OffendersList>
            </Offenders>
          ) : (
            <Empty>
              <OffendersImage width="100px" height="100px" />
              <EmptyText>There are no offenders to assign</EmptyText>
            </Empty>
          )}
        </PopOverContainer>
      </Grow>
    </PopOver>
  );
};

export default AssignOffenderPopover;
