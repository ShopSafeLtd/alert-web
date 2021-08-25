import React, { PureComponent } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

const Popover = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 5px;
  padding: ${({ noPadding }) => !noPadding && "40px"};
  z-index: 1200;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  ${({ width, open }) => `
    width: ${width}px;
    right: ${open ? 0 : `-${width + 5}px;`}
  `};
  height: 100%;
  overflow: auto;
`;
const Header = styled(AppBar)`
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
`;
const DialogContainer = styled.div`
  margin-top: 56px;
  margin-bottom: ${({ mobileAction }) => (mobileAction ? "60px" : "0px")};
`;
const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  padding: 15px 30px;
`;
const Grow = styled.div`
  flex: 1;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class PopOver extends PureComponent {
  render() {
    const {
      children,
      open,
      handleClose,
      title,
      actions,
      mobileAction,
      headerActions,
      toolbarActions,
      ...rest
    } = this.props;
    return (
      <MediaQuery minDeviceWidth={1024}>
        {(matches) =>
          matches ? (
            <Popover open={open} {...rest}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Grow>
                  <Typography variant="h6" color="inherit">
                    {title}
                  </Typography>
                </Grow>
                {toolbarActions}
              </Toolbar>
              {children}
              <Actions>{actions}</Actions>
            </Popover>
          ) : (
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <Header>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    onClick={handleClose}
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit">
                    {title}
                  </Typography>
                  <Grow />
                  {headerActions}
                </Toolbar>
              </Header>
              <DialogContainer mobileAction={mobileAction !== undefined}>
                {children}
              </DialogContainer>
              {mobileAction}
            </Dialog>
          )
        }
      </MediaQuery>
    );
  }
}

export default PopOver;
