import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { FullWidthButton, BackButton } from '../../../global/actions';
import { PopOver, PopOverContainer } from '../../../global/layout';

const Options = styled.div`
  border-top: 1px solid #eeeeee;
`;
const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 20px;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;
const OptionText = styled(Typography)`
  margin-left: 10px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 10px;
`;
const Grow = styled.div`
  flex: 1;
`;

const OptionItem = ({ children, selected, onClick }) => (
  <Option onClick={onClick}>
    <Svg onClick={onClick} viewBox="0 0 24 24">
      <path
        fill={selected ? '#1E88E5' : '#E0E0E0'}
        d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
      />
    </Svg>
    <OptionText onClick={onClick} variant="body2">
      {children}
    </OptionText>
  </Option>
);

class AlertFilter extends PureComponent {
  render() {
    const {
      handleClose,
      open,
      order,
      setOrder,
      filter,
      setFilter,
      setQueryVariables,
      crimeTypes,
      groups,
    } = this.props;

    return (
      <PopOver
        noPadding
        open={open}
        handleClose={handleClose}
        width={700}
        title="Incident Filters"
        actions={[
          <BackButton key={0} onClick={handleClose}>
            Close
          </BackButton>,
          <Button
            key={1}
            onClick={() => {
              setQueryVariables({
                order: order ? order : { createdAt: 'desc' },
                crimeTypes:
                  filter.crimeTypes.length > 0 ? filter.crimeTypes : undefined,
                groups: filter.groups.length > 0 ? filter.groups : undefined,
                approved: filter.approved.approved
                  ? true
                  : filter.approved.awaitingApproval
                  ? false
                  : undefined,
              });
              handleClose();
            }}
            color="primary"
            variant="contained"
          >
            Apply Filter
          </Button>,
        ]}
        mobileAction={[
          <FullWidthButton key={0} text="Apply Filter" onClick={this.submit} />,
        ]}
      >
        <PopOverContainer>
          <div>
            <Row>
              <Typography variant="subtitle1">Order</Typography>
            </Row>
            <Options>
              <OptionItem
                selected={order?.createdAt === 'desc'}
                onClick={() => setOrder({ createdAt: 'desc' })}
              >
                Latest First
              </OptionItem>
              <OptionItem
                selected={order?.createdAt === 'asc'}
                onClick={() => setOrder({ createdAt: 'asc' })}
              >
                Oldest First
              </OptionItem>
            </Options>
          </div>
          <div>
            <Row>
              <Typography variant="subtitle1">Groups</Typography>
              <Grow />
              <Button
                color="primary"
                size="small"
                onClick={() =>
                  setFilter({
                    ...filter,
                    groups: [],
                  })
                }
              >
                Clear All
              </Button>
            </Row>
            <Options>
              {groups?.map(({ id, name }) => (
                <OptionItem
                  key={id}
                  selected={filter.groups.includes(id)}
                  onClick={() => {
                    const isSelected = filter.groups.find((el) => el === id);
                    setFilter({
                      ...filter,
                      groups: isSelected
                        ? filter.groups.filter((el) => el !== id)
                        : [...filter.groups, id],
                    });
                  }}
                >
                  {name}
                </OptionItem>
              ))}
            </Options>
          </div>
          <div>
            <Row>
              <Typography variant="subtitle1">Crime Types</Typography>
              <Grow />
              <Button
                color="primary"
                size="small"
                onClick={() =>
                  setFilter({
                    ...filter,
                    crimeTypes: [],
                  })
                }
              >
                Clear All
              </Button>
            </Row>
            <Options>
              {crimeTypes?.map(({ id, name }) => (
                <OptionItem
                  key={id}
                  selected={filter.crimeTypes.includes(id)}
                  onClick={() => {
                    const isSelected = filter.crimeTypes.find(
                      (el) => el === id
                    );
                    setFilter({
                      ...filter,
                      crimeTypes: isSelected
                        ? filter.crimeTypes.filter((el) => el !== id)
                        : [...filter.crimeTypes, id],
                    });
                  }}
                >
                  {name}
                </OptionItem>
              ))}
            </Options>
          </div>
          <div>
            <Row>
              <Typography variant="subtitle1">Approved</Typography>
              <Grow />
              <Button
                color="primary"
                size="small"
                onClick={() =>
                  setFilter({
                    ...filter,
                    approved: {
                      approved: undefined,
                      awaitingApproval: undefined,
                    },
                  })
                }
              >
                Clear All
              </Button>
            </Row>
            <Options>
              <OptionItem
                selected={filter.approved.approved}
                onClick={() =>
                  setFilter({
                    ...filter,
                    approved: {
                      ...filter.approved,
                      approved: filter.approved.approved ? undefined : true,
                    },
                  })
                }
              >
                Approved
              </OptionItem>
              <OptionItem
                selected={filter.approved.awaitingApproval}
                onClick={() =>
                  setFilter({
                    ...filter,
                    approved: {
                      ...filter.approved,
                      awaitingApproval: filter.approved.awaitingApproval
                        ? undefined
                        : true,
                    },
                  })
                }
              >
                Awaiting Approval
              </OptionItem>
            </Options>
          </div>
        </PopOverContainer>
      </PopOver>
    );
  }
}

export default AlertFilter;
