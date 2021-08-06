import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import Offender from '../../../../../images/Offender';
import Offenders from '../../../../../images/Offenders';

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const Option = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  margin: 10px 10px;
  padding: 10px 20px;
  cursor: pointer;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 5px;
  }
`;

const OptionText = styled(Typography)`
  text-align: center;
  margin: 0 10px;
`;

class AddOffenderMenu extends PureComponent {
  render() {
    const { changePage } = this.props;
    return (
      <Row>
        <Option onClick={() => changePage('ADD')}>
          <Offender width="50px" height="50px" />
          <OptionText variant="subtitle1">Add New Offender</OptionText>
        </Option>
        <Option onClick={() => changePage('EXIST')}>
          <Offenders width="50px" height="50px" />
          <OptionText variant="subtitle1">Add Existing Offender</OptionText>
        </Option>
      </Row>
    );
  }
}

export default AddOffenderMenu;
