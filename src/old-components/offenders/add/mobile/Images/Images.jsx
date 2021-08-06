import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import ImageGallery from '../../../../../images/ImageGallery';
import { FullWidthButton } from '../../../../global/actions';
import { EmptyText } from '../../../../global/typography';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { AddImage, AddImagesFab, ImageGrid } from '../../../../global/images';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const Empty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;
const EmptyActions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 11%;
`;

class Images extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      confirmRemove: false,
      removeId: ''
    };
  }

  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo('/offenders/add');
  }

  submit = () => {
    this.props.submit();
    this.props.history.push('/offenders');
  };

  handleNext = () => {
    return this.props.admin
      ? this.props.history.push('/offenders/add/warning-labels')
      : this.props.warnings.length > 0
        ? this.props.history.push('/offenders/add/warning-labels')
        : this.props.groups.length > 1
          ? this.props.history.push('/offenders/add/groups')
          : this.submit();
  };

  render() {
    const {
      disabled,
      uploadImage,
      images,
      removeImage,
      uploadMobileImage,
      admin,
      warnings,
      groups
    } = this.props;
    const { confirmRemove, removeId } = this.state;
    const actions = [
      {
        onClick: id =>
          this.setState({
            confirmRemove: true,
            removeId: id
          }),
        tooltipLabel: 'Remove Image',
        icon: (
          <path
            fill="#FFF"
            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
          />
        )
      }
    ];

    return (
      <Page>
        <Header>
          <HeaderText>Images</HeaderText>
          <HeaderSubText>
            Upload images that you have of this offender to help others identify
            them.
          </HeaderSubText>
        </Header>
        {images.length > 0 ? (
          <ImageGrid actions={actions} images={images} />
        ) : (
          <Empty>
            <ImageGallery width="100px" height="100px" />
            <EmptyText>You have not added any images yet</EmptyText>
            <EmptyActions>
              <AddImage
                upload={uploadImage}
                mobileUpload={uploadMobileImage}
                disabled={disabled}
              />
            </EmptyActions>
          </Empty>
        )}
        {images.length > 0 && (
          <AddImagesFab
            upload={uploadImage}
            mobileUpload={uploadMobileImage}
            disabled={disabled}
          />
        )}
        <FullWidthButton
          disabled={disabled}
          text={
            !admin && warnings.length === 0 && groups.length < 2
              ? 'Submit Offender'
              : images.length > 0
                ? 'Next'
                : 'Skip Images'
          }
          onClick={this.handleNext}
        />
        <ConfirmDialog
          open={confirmRemove}
          handleClose={() => this.setState({ confirmRemove: false })}
          title="Are you sure?"
          description="Are you sure you want to remove this image?"
          actions={[
            <Button onClick={() => this.setState({ confirmRemove: false })}>
              Cancel
            </Button>,
            <Button
              color="primary"
              onClick={() => {
                this.setState({ confirmRemove: false });
                removeImage(removeId);
              }}
            >
              Remove Image
            </Button>
          ]}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default Images;
