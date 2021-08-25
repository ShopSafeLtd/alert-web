import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Container = styled.div`
  position: relative;
`;
const StyledButton = styled(IconButton)`
  color: #ef9a9a;
`;
const Svg = styled.svg`
  width: 26px;
  height: 26px;
`;

class HelpButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const { helpText, title } = this.props;
    const { visible } = this.state;
    return (
      <Container>
        <StyledButton onClick={this.toggleVisible}>
          <Svg>
            <path
              fill="#BDBDBD"
              d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z"
            />
          </Svg>
        </StyledButton>
        <Dialog open={visible} onClose={this.toggleVisible}>
          <DialogContent>
            <DialogTitle>{title}</DialogTitle>
            <DialogContentText>{helpText}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleVisible} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

export default HelpButton;
