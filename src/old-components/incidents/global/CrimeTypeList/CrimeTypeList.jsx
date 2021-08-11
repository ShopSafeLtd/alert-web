import React, { PureComponent, Fragment } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import { HelpButton } from "../../../global/actions";
import { SkeletonText } from "../../../global/skeletons";

const List = styled.div`
  flex: 1;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
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

const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;

class CrimeTypeList extends PureComponent {
  render() {
    const { selected, toggleSelected, disabled, crimeTypes, loading } =
      this.props;

    return (
      <List>
        {loading ? (
          <Fragment>
            <ListItem>
              <Svg viewBox="0 0 24 24">
                <path
                  fill={"#E0E0E0"}
                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                />
              </Svg>
              <SkeletonText />
            </ListItem>
            <ListItem>
              <Svg viewBox="0 0 24 24">
                <path
                  fill={"#E0E0E0"}
                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                />
              </Svg>
              <SkeletonText />
            </ListItem>
          </Fragment>
        ) : (
          crimeTypes.map(({ id, name, description }) => {
            return (
              <ListItem key={id}>
                <Svg
                  onClick={() => !disabled && toggleSelected(id)}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill={selected.includes(id) ? "#1E88E5" : "#E0E0E0"}
                    d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                  />
                </Svg>
                <ItemText onClick={() => !disabled && toggleSelected(id)}>
                  {name}
                </ItemText>
                <HelpButton helpText={description} />
              </ListItem>
            );
          })
        )}
      </List>
    );
  }
}

export default CrimeTypeList;
