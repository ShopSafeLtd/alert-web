import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { isEqual } from "lodash-es";
import MediaQuery from "react-responsive";

import { PopOver, PopOverContainer } from "../../../../global/layout";
import OffenderStacked from "../OffenderStacked/OffenderStacked";
import { BackButton } from "../../../../global/actions";
import OffenderStack from "../OffenderStack/OffenderStack";

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

class AssignOffenderPopOver extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      add: [],
      remove: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.image, prevProps.image)) {
      if (!!this.props.image) {
        this.setState({
          selected: this.props.image?.offenders?.map(({ id }) => id) || [],
        });
      }
    }
  }

  toggleAssignOffenders = (id) => {
    const { selected, add, remove } = this.state;
    if (!selected?.includes(id)) {
      this.setState({
        selected: [...selected, id],
        add: [...add, id],
        remove: remove?.filter((offender) => id !== offender),
      });
    } else {
      this.setState({
        selected: selected?.filter((offender) => offender !== id),
        add: add?.filter((offender) => offender !== id),
        remove: [...remove, id],
      });
    }
  };

  handleClose = () => {
    this.setState({
      selected: [],
      add: [],
      remove: [],
    });
    this.props.close();
  };

  render() {
    const { open, offenders, assign, image } = this.props;
    const { selected, add, remove } = this.state;
    return (
      <MediaQuery minDeviceWidth={1024}>
        {(matches) => (
          <PopOver
            noPadding
            open={open}
            width={matches ? 500 : window.innerWidth - 15}
            handleClose={this.handleClose}
            title={"Assign Offender To Images"}
            actions={[
              <BackButton key={0} onClick={this.handleClose}>
                Cancel
              </BackButton>,
              <Button
                key={1}
                variant="contained"
                color="primary"
                onClick={() => {
                  assign(image, add, remove);
                  this.handleClose();
                }}
              >
                Assign
              </Button>,
            ]}
          >
            <Grow>
              <PopOverContainer>
                <OffenderStack>
                  {offenders.map(({ id, name, images }) => {
                    return (
                      <OffenderStacked
                        key={id}
                        id={id}
                        name={name}
                        images={images}
                        selected={selected?.includes(id)}
                        toggleSelected={() => this.toggleAssignOffenders(id)}
                      />
                    );
                  })}
                </OffenderStack>
              </PopOverContainer>
            </Grow>
          </PopOver>
        )}
      </MediaQuery>
    );
  }
}

export default AssignOffenderPopOver;
