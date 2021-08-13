import React from "react";
import Button from "@material-ui/core/Button";
import MediaQuery from "react-responsive";

import { PopOver, PopOverContainer } from "../../../global/layout";
import { FullWidthButton, BackButton } from "../../../global/actions";
import { EditExclusionForm } from "../../../forms";
// import EditMutation from '../../../../graphql/exclusions/mutations/EditExclusion';
// import ExclusionQuery from "../../../../graphql/exclusions/queries/Exclusion";
// import CreateHistory from "../../../../graphql/history/mutations/CreateHistory";
import { useStoreActions, useStoreState } from "../../../../state";

class EditExclusionPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      locationError: "",
      description: "",
      submitting: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible === false && this.props.visible === true) {
      this.setState({
        location: this.props.exclusion.location,
        description: this.props.exclusion.description,
      });
    }
  }

  handleChange = (value, field) => {
    this.setState({ [field]: value });
  };

  handleClose = () => {
    this.setState({
      location: "",
      description: "",
    });
    this.props.close();
  };

  validate = () =>
    new Promise((resolve, reject) => {
      const { location } = this.state;
      const locationValid = !!location;

      if (!locationValid) {
        this.setState({
          locationError: "This is a required field.",
        });
        reject();
      }
      resolve();
    });

  render() {
    const {
      visible,
      exclusion,
      setStatusBar,
      currentUserId,
      onSubmit,
      exclusion: { startDate, endDate },
    } = this.props;
    const { location, locationError, description, submitting } = this.state;

    const handleSubmit = async () => {
      this.validate()
        .then(() => {
          if (onSubmit !== undefined) {
            onSubmit({
              id: exclusion.id,
              location,
              description,
              startDate,
              endDate,
            });
          } else {
            setStatusBar(true, "Saving Ban...");
            this.setState({ submitting: true });
            // editExclusion({
            //   variables: {
            //     id: exclusion.id,
            //     location: location,
            //     description: description,
            //   },
            // });
            // createHistory({
            //   variables: {
            //     type: "EDITED",
            //     model: "EXCLUSION",
            //     byUserId: currentUserId,
            //     schemeId: window.localStorage.getItem("currentScheme"),
            //     exclusionId: exclusion.id,
            //   },
            // });
            setStatusBar(false, "");
            this.setState({ submitting: false });
          }
          this.handleClose();
        })
        .catch(() => {});
    };

    return (
      // <Mutation
      //   mutation={CreateHistory}
      //   refetchQueries={[
      //     {
      //       query: ExclusionQuery,
      //       variables: {
      //         id: exclusion.id,
      //       },
      //     },
      //   ]}
      // >
      //   {(createHistory) => (
      //     <Mutation mutation={EditMutation}>
      //       {(editExclusion) => {
      //         const handleSubmit = async () => {
      //           this.validate()
      //             .then(() => {
      //               if (onSubmit !== undefined) {
      //                 onSubmit({
      //                   id: exclusion.id,
      //                   location,
      //                   description,
      //                   startDate,
      //                   endDate,
      //                 });
      //               } else {
      //                 setStatusBar(true, "Saving Ban...");
      //                 this.setState({ submitting: true });
      //                 editExclusion({
      //                   variables: {
      //                     id: exclusion.id,
      //                     location: location,
      //                     description: description,
      //                   },
      //                 });
      //                 createHistory({
      //                   variables: {
      //                     type: "EDITED",
      //                     model: "EXCLUSION",
      //                     byUserId: currentUserId,
      //                     schemeId:
      //                       window.localStorage.getItem("currentScheme"),
      //                     exclusionId: exclusion.id,
      //                   },
      //                 });
      //                 setStatusBar(false, "");
      //                 this.setState({ submitting: false });
      //               }
      //               this.handleClose();
      //             })
      //             .catch(() => {});
      //         };
      //         return (

      <PopOver
        noPadding
        open={visible}
        width={500}
        handleClose={(close) => this.handleClose()}
        title={"Edit Ban"}
        actions={[
          <BackButton
            key={Math.random()}
            disabled={submitting}
            onClick={this.handleClose}
          >
            Cancel
          </BackButton>,
          <Button
            key={Math.random()}
            disabled={submitting}
            color="primary"
            variant="contained"
            onClick={() => handleSubmit()} //handleSubmit()}
          >
            Save Ban
          </Button>,
        ]}
        mobileAction={[
          <FullWidthButton
            key={Math.random()}
            text="Save"
            onClick={() => null} //handleSubmit}
            position="ABSOLUTE"
            disabled={submitting}
          />,
        ]}
      >
        <PopOverContainer>
          <EditExclusionForm
            data={{
              startDate,
              endDate,
              location,
              locationError,
              description,
            }}
            handleChange={this.handleChange}
          />
        </PopOverContainer>
      </PopOver>
    );
  }

  // }}
  //       </Mutation>
  //     )}
  //   </Mutation>
  // );
}

const Wrapper = (props) => {
  const currentUserId = useStoreState((state) => state.user.id);
  const setStatusBar = useStoreActions((actions) => actions.theme.setStatusBar);

  return (
    <EditExclusionPopover
      currentUserId={currentUserId}
      setStatusBar={setStatusBar}
      {...props}
    />
  );
};

export default Wrapper;
