import React, { PureComponent } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

import {
  HeaderText,
  HeaderSubText,
  Field,
  FieldHeader,
} from "../../../../global/forms";

const Page = styled.div`
  width: 100%;
  padding: 0px 0px 60px;
  overflow: auto;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const Header = styled.div`
  @media (min-width: 1024px) {
    padding: 0px 0px 10px;
  }
`;

class Details extends PureComponent {
  componentDidMount() {
    // this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo("/admin/chat-groups");
    this.props.setActiveStep(0);
  }

  render() {
    const { handleChange, name, nameError, description } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Chat Name</HeaderText>
          <HeaderSubText>Give the new chat group a name.</HeaderSubText>
        </Header>
        <Field>
          <FieldHeader required>Chat Name</FieldHeader>
          <TextField
            value={name}
            onChange={handleChange("name")}
            error={nameError !== ""}
            helperText={nameError}
            fullWidth
          />
        </Field>
        <Field>
          <FieldHeader>Description</FieldHeader>
          <TextField
            value={description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            rows="6"
          />
        </Field>
      </Page>
    );
  }

  componentWillUnmount() {
    // this.props.setNavbarAction('');
    this.props.setBackLinkTo("");
  }
}

export default Details;
