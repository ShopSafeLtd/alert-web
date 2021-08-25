import React, { PureComponent } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import { HelpButton } from "../../../../global/actions";
import { Header, HeaderText, HeaderSubText } from "../../../../global/forms";
import AddLabel from "../AddLabel/AddLabel";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const List = styled.div`
  flex: 1;
  width: 100%;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 0 20px;
`;
const ItemText = styled(Typography)`
  margin: 0;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;
const AddItemText = styled(ItemText)`
  font-weight: 500;
`;

class Labels extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
    };
  }

  render() {
    const {
      offenderLabels,
      toggleSelectedLabels,
      selectedLabels,
      addLabel,
      createdById,
    } = this.props;
    const { add } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Warning Labels</HeaderText>
          <HeaderSubText>
            Please select any warning labels that are relevant to this offender
            or add your own.
          </HeaderSubText>
        </Header>
        <List>
          {offenderLabels?.map((label) => (
            <ListItem key={label?.id}>
              <Svg
                onClick={() => toggleSelectedLabels(label)}
                viewBox="0 0 24 24"
              >
                <path
                  fill={
                    selectedLabels.map(({ id }) => id).includes(label?.id)
                      ? "#1E88E5"
                      : "#E0E0E0"
                  }
                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                />
              </Svg>
              <ItemText onClick={() => toggleSelectedLabels(label)}>
                {label?.name}
              </ItemText>
              <HelpButton title={label?.name} helpText={label?.description} />
            </ListItem>
          ))}
          <ListItem
            onClick={() =>
              this.setState({
                add: true,
              })
            }
          >
            <Svg viewBox="0 0 24 24">
              <path
                fill="#EF5350"
                d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
              />
            </Svg>
            <AddItemText>Add New Label</AddItemText>
          </ListItem>
        </List>
        <AddLabel
          open={add}
          addLabel={addLabel}
          createdById={createdById}
          close={() =>
            this.setState({
              add: false,
            })
          }
        />
      </Page>
    );
  }
}

export default Labels;
