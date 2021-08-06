import React, { PureComponent } from 'react';
import styled from 'styled-components';

import OffenderItem from '../../../global/OffenderItem/OffenderItem';
import OffendersImage from '../../../../../images/Offenders';
import { FullWidthButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const Offenders = styled.div`
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
`;
const OffendersList = styled.div`
  height: 100%;
  width: 100%;
`;
const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 80px);
`;
const EmptyText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #757575;
`;

class AssignOffenders extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      addOffender: [],
      removeOffender: []
    };
  }

  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo('/incidents/add/images');
    this.setState({
      selected: this.props.currentImage.offendersIds
    });
  }

  toggleSelectedOffenders = id => {
    const { selected, removeOffender } = this.state;
    if (!selected.includes(id)) {
      this.setState({
        selected: [...selected, id],
        removeOffender: removeOffender.filter(offender => offender === id)
      });
    } else {
      this.setState({
        selected: selected.filter(offender => offender !== id),
        removeOffender: [...removeOffender, id]
      });
    }
  };

  submit = () => {
    const { selected, removeOffender } = this.state;
    const { assignOffendersToImages, currentImage } = this.props;
    assignOffendersToImages(currentImage, selected, removeOffender);
  };

  render() {
    const { offenders, history } = this.props;
    const { selected } = this.state;

    return (
      <Page>
        <Header>
          <HeaderText>Assign Offenders</HeaderText>
          <HeaderSubText>
            Assign any offenders shown in this image.
          </HeaderSubText>
        </Header>
        {offenders.length > 0 ? (
          <div>
            <Offenders>
              <OffendersList>
                {offenders.map(offender => {
                  return (
                    <OffenderItem
                      key={offender.id}
                      offender={offender}
                      onClick={() => this.toggleSelectedOffenders(offender.id)}
                      select
                      selected={selected.includes(offender.id)}
                    />
                  );
                })}
              </OffendersList>
            </Offenders>
            <FullWidthButton
              text="Assign Offenders"
              onClick={() => {
                this.submit();
                history.push('/incidents/add/images');
              }}
            />
          </div>
        ) : (
          <Empty>
            <OffendersImage width="100px" height="100px" />
            <EmptyText>All offenders have been assigned</EmptyText>
          </Empty>
        )}
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default AssignOffenders;
