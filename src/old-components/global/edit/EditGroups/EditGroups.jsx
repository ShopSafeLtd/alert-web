import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AddSvg from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { isEqual } from "lodash-es";

import { SubHeader, ErrorText } from "../../typography";
import { EmptySection } from "../../emptyStates";
import { Row, Section, SectionLoading } from "../../layout";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import OffendersImage from "../../../../images/Offenders";

const Grow = styled.div`
  flex: 1;
`;
const AddIcon = styled(AddSvg)`
  margin-right: 5px;
`;
const List = styled.div`
  border-top: 1px solid #eeeeee;
  flex: 1;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
`;
const ItemText = styled(Typography)`
  margin: 0;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const EmptyButton = styled(Button)`
  margin-top: 10px;
`;

class EditDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      deleteId: "",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.loading !== nextProps.loading) return true;
    if (this.state.confirmDelete !== nextState.confirmDelete) return true;
    if (this.state.deleteId !== nextState.deleteId) return true;
    if (!isEqual(this.props.groups, nextProps.groups)) return true;
    return false;
  }

  render() {
    const { loading, groups, addGroups, removeGroup } = this.props;
    const { confirmDelete, deleteId } = this.state;
    return (
      <Section width="50%" elevation={1}>
        {loading && <SectionLoading />}
        <Row>
          <SubHeader>Groups</SubHeader>
          <Grow />
          <Button color="primary" onClick={addGroups}>
            <AddSvg />
            Add Groups
          </Button>
        </Row>
        {loading ? (
          <EmptySection>
            <OffendersImage width="100px" height="100px" />
            <ErrorText>Please add at least one group to the incident</ErrorText>
            <EmptyButton color="primary" onClick={addGroups}>
              <AddIcon />
              Add Groups
            </EmptyButton>
          </EmptySection>
        ) : (
          <List>
            {!!groups &&
              groups.map(({ id, name }) => {
                return (
                  <ListItem key={id}>
                    <ItemText>{name}</ItemText>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        this.setState({
                          confirmDelete: true,
                          deleteId: id,
                        })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
          </List>
        )}
        <ConfirmDialog
          open={confirmDelete}
          handleClose={() =>
            this.setState({
              confirmDelete: true,
              deleteId: "",
            })
          }
          title="Are you sure?"
          description="Are you sure you want to remove this group from the incident?"
          actions={[
            <Button
              key={0}
              onClick={() =>
                this.setState({ confirmDelete: false, deleteId: "" })
              }
            >
              cancel
            </Button>,
            <Button
              key={1}
              color="primary"
              onClick={() => {
                this.setState({ confirmDelete: false, deleteId: "" });
                removeGroup(deleteId);
              }}
            >
              Remove Group
            </Button>,
          ]}
        />
      </Section>
    );
  }
}

export default EditDescription;
