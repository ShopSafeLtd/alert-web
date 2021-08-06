import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import MediaQuery from 'react-responsive';
import { isEqual } from 'lodash-es';
import onClickOutside from 'react-onclickoutside';

import { PopOver, PopOverContainer } from '../../../global/layout/';
import { BackButton } from '../../../global/actions';
import CrimeTypeList from '../CrimeTypeList/CrimeTypeList';

const Grow = styled.div`
  flex: 1;
`;

class CrimeTypePopOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      pristine: true
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.selected !== nextState.selected) return true;
    if (this.props.open !== nextProps.open) return true;
    if (this.props.selected !== nextProps.selected) return true;
    if (!isEqual(this.props.crimeTypes !== nextProps.crimeTypes)) return true;
    return false;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      if (!isEqual(this.props.crimeTypes, this.state.selected)) {
        this.setState({
          selected: [...this.props.crimeTypes]
        });
      }
    }
  }

  handleClickOutside = evt => {
    if (this.props.open) {
      this.props.close();
    }
  };

  toggleSelected = id => {
    const { selected } = this.state;
    !selected.includes(id)
      ? this.setState({
          selected: [...selected, id]
        })
      : this.setState({
          selected: selected.filter(crimeType => crimeType !== id)
        });
  };

  render() {
    const { selected } = this.state;
    const { open, close, setCrimeTypes, crimeTypesList } = this.props;

    const submit = () => {
      this.setState({
        pristine: true
      });
      setCrimeTypes(selected);
      close();
    };

    return (
      <MediaQuery minDeviceWidth={1024}>
        {matches => (
          <PopOver
            open={open}
            noPadding
            width={matches ? 400 : window.innerWidth - 15}
            handleClose={close}
            title={'Crime Types'}
            actions={[
              <BackButton
                key={0}
                onClick={() => {
                  this.setState({
                    pristine: true
                  });
                  close();
                }}
              >
                Close
              </BackButton>,
              <Button
                key={1}
                variant="contained"
                color="primary"
                onClick={submit}
              >
                Save
              </Button>
            ]}
          >
            <Grow>
              <PopOverContainer>
                <CrimeTypeList
                  selected={selected}
                  toggleSelected={this.toggleSelected}
                  crimeTypes={crimeTypesList}
                />
              </PopOverContainer>
            </Grow>
          </PopOver>
        )}
      </MediaQuery>
    );
  }
}

export default onClickOutside(CrimeTypePopOver);
