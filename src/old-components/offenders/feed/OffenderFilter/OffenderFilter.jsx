import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import isEqual from 'lodash/isEqual';
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
  constructor(props) {
    super(props);
    this.state = {
      order: '',
      type: ''
    };
  }

  componentDidMount() {
    const { order, filter } = this.props;
    this.setState({
      order,
      filter
    });
  }

  componentDidUpdate(prevProps) {
    !isEqual(this.props.filter, prevProps.filter) &&
      this.setState({ filter: this.props.filter });
    !isEqual(this.props.order, prevProps.order) &&
      this.setState({ order: this.props.order });
  }

  submit = () => {
    this.props.setOrder(this.state.order);
    this.props.setFilter(this.state.filter);
    this.props.handleClose();
  };

  render() {
    const { handleClose, open } = this.props;
    const { order, filter } = this.state;

    return (
      <PopOver
        noPadding
        open={open}
        handleClose={handleClose}
        width={700}
        title="Offender Filters"
        actions={[
          <BackButton key={0} onClick={handleClose}>
            Close
          </BackButton>,
          <Button
            key={1}
            onClick={this.submit}
            color="primary"
            variant="contained"
          >
            Apply Filter
          </Button>
        ]}
        mobileAction={[
          <FullWidthButton key={0} text="Apply Filter" onClick={this.submit} />
        ]}
      >
        <PopOverContainer>
          <div>
            <Row>
              <Typography variant="subtitle1">Order</Typography>
            </Row>
            <Options>
              <OptionItem
                selected={order === 'desc'}
                onClick={() => this.setState({ order: 'desc' })}
              >
                Latest First
              </OptionItem>
              <OptionItem
                selected={order === 'asc'}
                onClick={() => this.setState({ order: 'asc' })}
              >
                Oldest First
              </OptionItem>
            </Options>
          </div>
          <div>
            <Row>
              <Typography variant="subtitle1">Offender Types</Typography>
            </Row>
            <Options>
              <OptionItem
                selected={filter === 'ALL'}
                onClick={() => this.setState({ filter: 'ALL' })}
              >
                All Offenders
              </OptionItem>
              <OptionItem
                selected={filter === 'ACTIVE'}
                onClick={() => this.setState({ filter: 'ACTIVE' })}
              >
                Active Offenders
              </OptionItem>
              <OptionItem
                selected={filter === 'BANNED'}
                onClick={() => this.setState({ filter: 'BANNED' })}
              >
                Banned Offenders
              </OptionItem>
              <OptionItem
                selected={filter === 'UNIDENTIFIED'}
                onClick={() => this.setState({ filter: 'UNIDENTIFIED' })}
              >
                Unidentified Offenders
              </OptionItem>
            </Options>
          </div>
        </PopOverContainer>
      </PopOver>
    );
  }
}

export default AlertFilter;
