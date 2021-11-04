import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

import { Header, HeaderText, HeaderSubText } from "../../../../global/forms";
import { EmptyText } from "../../../../global/typography";
import ExclusionsImage from "../../../../../images/Ban";
import AddExclusions from "../AddExclusion/AddExclusion";
import { ItemHeader } from "../../../../global/typography";
import EditExclusion from "../EditExclusion/EditExclusion";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const Empty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const EmptyActions = styled.div`
  display: flex;
  justify-content: center;
`;
const ExclusionDate = styled(Typography)`
  margin-top: 5px;
`;
const Svg = styled.svg`
  height: 24px;
  width: 24px;
`;
const Icon = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 3px;
`;
const FieldText = styled(Typography)`
  margin-top: 5px;
  ${({ noWrap }) => noWrap && "white-space: nowrap;"};
`;
const List = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const ListItem = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Item = styled.div`
  margin-left: 30px;
  ${({ marginTop }) => marginTop && "margin-top: 28px;"} ${({ grow }) =>
    grow && "flex: 1;"};
`;
const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

class Exclusions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      edit: false,
    };
  }

  handleEdit = (exclusion) => {
    this.props.setEditingExclusion(exclusion);
    this.setState({ edit: true });
  };

  render() {
    const {
      exclusions,
      addExclusion,
      removeExclusion,
      editingExclusion,
      editExclusion,
    } = this.props;
    const { add, edit } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Exclusions</HeaderText>
          <HeaderSubText>
            Create exclusions for this offender to exclusion them from areas or premises.
          </HeaderSubText>
        </Header>
        {exclusions.length > 0 ? (
          <List>
            {exclusions.map(
              ({ id, startDate, endDate, description, location }) => (
                <ListItem>
                  <Item>
                    <ItemHeader>Duration</ItemHeader>
                    <ExclusionDate variant="body1">
                      {moment(startDate).format("DD/MM/YYYY")}
                    </ExclusionDate>
                  </Item>
                  <Item marginTop>
                    <Svg viewBox="0 0 24 24">
                      <path
                        fill="#EF5350"
                        d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z"
                      />
                    </Svg>
                  </Item>
                  <Item marginTop>
                    <ExclusionDate variant="body1">
                      {moment(endDate).format("DD/MM/YYYY")}
                    </ExclusionDate>
                  </Item>
                  {location !== "" && (
                    <Item grow={description === ""}>
                      <ItemHeader>Location</ItemHeader>
                      <FieldText variant="body1" noWrap>
                        {location}
                      </FieldText>
                    </Item>
                  )}
                  {description !== "" && (
                    <Item grow>
                      <ItemHeader>Description</ItemHeader>
                      <FieldText variant="body1">{description}</FieldText>
                    </Item>
                  )}
                  <Row>
                    <div>
                      <Button
                        color="primary"
                        onClick={() =>
                          this.handleEdit({
                            id,
                            startDate,
                            endDate,
                            location,
                            description,
                          })
                        }
                      >
                        <Icon viewBox="0 0 24 24">
                          <path
                            fill="#E57373"
                            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                          />
                        </Icon>
                        Edit
                      </Button>
                    </div>
                    <div>
                      <Button
                        color="primary"
                        onClick={() => removeExclusion(id)}
                      >
                        <Icon viewBox="0 0 24 24">
                          <path
                            fill="#E57373"
                            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                          />
                        </Icon>
                        Delete
                      </Button>
                    </div>
                  </Row>
                </ListItem>
              )
            )}
            <Actions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({ add: true })}
              >
                Add New Exclusion
              </Button>
            </Actions>
          </List>
        ) : (
          <Empty>
            <ExclusionsImage width="100px" height="100px" />
            <EmptyText>You have not added any exclusions yet</EmptyText>
            <EmptyActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({ add: true })}
              >
                Add Exclusion
              </Button>
            </EmptyActions>
          </Empty>
        )}
        <AddExclusions
          open={add}
          close={() => this.setState({ add: false })}
          addExclusion={addExclusion}
        />
        <EditExclusion
          open={edit}
          close={() => this.setState({ edit: false })}
          editingExclusion={editingExclusion}
          editExclusion={editExclusion}
        />
      </Page>
    );
  }
}

export default Exclusions;
