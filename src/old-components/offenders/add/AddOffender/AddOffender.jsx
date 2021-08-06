import React, { PureComponent } from 'react';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';

import MobileForm from '../mobile/MobileForm/MobileForm';
import OffenderWizard from '../desktop/OffenderWizard/OffenderWizard';

class AddOffender extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      name: '',
      gender: '',
      race: '',
      build: '',
      age: '',
      dateOfBirth: null,
      dateSource: '',
      hair: '',
      peculiarities: '',
      disabled: false,
      images: [],
      selectedLabels: [],
      exclusions: [],
      editingExclusion: {},
      selectedGroups: []
    };
  }

  handleChange = (value, field) => {
    if (field === 'age') {
      this.setState({
        [field]: value,
        dateOfBirth: '',
        dateSource: '',
        pristine: false
      });
    } else if (field === 'dateOfBirth') {
      this.setState({
        [field]: value,
        age: '',
        pristine: false
      });
    } else {
      this.setState({
        [field]: value,
        pristine: false
      });
    }
  };

  addImage = ({ target: { files } }) => {
    const filesArray = [...files];
    this.setState({
      images: [
        ...this.state.images,
        ...filesArray.map(file => ({
          id: this.state.images.length,
          url: URL.createObjectURL(file),
          file: file
        }))
      ]
    });
  };

  addImageMobile = data => {
    window.resolveLocalFileSystemURL(data, fileEntry => {
      const update = file => {
        this.setState({
          images: [
            ...this.state.images,
            {
              id: this.state.images.length,
              url: window.URL.createObjectURL(
                new Blob([new Uint8Array(file)], {
                  type: 'image/jpeg'
                })
              ),
              file: new Blob([file], { type: 'image/jpeg' })
            }
          ]
        });
      };
      fileEntry.file(function(file) {
        const reader = new FileReader();
        reader.onloadend = async function(e) {
          update(this.result);
        };
        reader.readAsArrayBuffer(file);
      });
    });
  };

  removeImage = image => {
    this.setState({
      images: this.state.images.filter(({ id }) => image !== id),
      pristine: false
    });
  };

  toggleSelectedLabels = label => {
    const { selectedLabels } = this.state;
    const flatLabels = selectedLabels.map(({ id }) => id);
    if (flatLabels.indexOf(label.id) === -1) {
      this.setState({
        selectedLabels: [...selectedLabels, label]
      });
    } else {
      let newSelectedLabels = selectedLabels.filter(item => {
        return item.id !== label.id;
      });
      this.setState({
        selectedLabels: newSelectedLabels
      });
    }
  };

  addLabel = label => {
    this.setState({
      selectedLabels: [
        ...this.state.selectedLabels,
        {
          ...label,
          id: this.state.selectedLabels.length,
          new: true,
          __typename: 'OffenderLabel'
        }
      ]
    });
  };

  addExclusion = exclusion =>
    this.setState({
      exclusions: [
        ...this.state.exclusions,
        {
          ...exclusion,
          id: this.state.exclusions.length
        }
      ]
    });

  removeExclusion = exclusion =>
    this.setState({
      exclusions: this.state.exclusions.filter(({ id }) => id !== exclusion)
    });

  setEditingExclusion = exclusion =>
    this.setState({
      editingExclusion: exclusion
    });

  editExclusion = exclusion => {
    let index = this.state.exclusions.map(({ id }) => id).indexOf(exclusion.id);
    let exclusions = this.state.exclusions.filter(({ id }) => {
      return id !== exclusion.id;
    });
    this.setState({
      exclusions: [
        ...exclusions.slice(0, index),
        exclusion,
        ...exclusions.slice(index)
      ]
    });
  };

  toggleSelectedGroups = group => {
    const { selectedGroups } = this.state;
    if (selectedGroups.indexOf(group) === -1) {
      this.setState({
        selectedGroups: [...selectedGroups, group]
      });
    } else {
      let newSelectedGroups = selectedGroups.filter(item => {
        return item !== group;
      });
      this.setState({
        selectedGroups: newSelectedGroups
      });
    }
  };

  handlePost = async () => {
    this.props.setStatus({
      status: 'info',
      text: 'Uploading your new offender...'
    });
    this.setState({ disabled: true });
    const {
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      hair,
      peculiarities,
      images,
      selectedLabels,
      exclusions,
      selectedGroups
    } = this.state;
    const { createdById, role } = this.props;

    let newExclusions = [];
    exclusions.forEach(({ description, endDate, location, startDate }) => {
      newExclusions = [
        ...newExclusions,
        {
          description,
          endDate,
          location,
          startDate,
          schemeId: window.localStorage.getItem('currentScheme'),
          createdById
        }
      ];
    });

    let linkOffenderLabels = selectedLabels
      .filter(({ new: newLabel }) => !newLabel)
      .map(({ id }) => id);

    await this.props.createOffender({
      variables: {
        role,
        age: age !== '' ? age : 'UNKNOWN',
        bans:
          newExclusions.length > 0
            ? newExclusions.map(
                ({
                  description,
                  endDate,
                  location,
                  startDate,
                  schemeId,
                  createdById
                }) => ({
                  description,
                  endDate,
                  location,
                  startDate,
                  scheme: {
                    connect: { id: schemeId }
                  },
                  createdBy: {
                    connect: { id: createdById }
                  }
                })
              )
            : undefined,
        build: build !== '' ? build : 'UNKNOWN',
        dateOfBirth,
        dateSource,
        gender: gender !== '' ? gender : 'UNKNOWN',
        groups: {
          connect:
            this.props.groups.length > 1
              ? selectedGroups.map(id => ({ id }))
              : this.props.groups.map(({ id }) => ({ id }))
        },
        hair,
        images: {
          upload:
            images.length > 0
              ? images.map(({ file }) => ({
                  file
                }))
              : undefined
        },
        name: name !== '' ? name : 'Unidentified Offender',
        tags: {
          connect:
            linkOffenderLabels.length > 0
              ? linkOffenderLabels.map(id => ({ id }))
              : undefined
        },
        peculiarities,
        race: race !== '' ? race : 'UNKNOWN',
        scheme: window.localStorage.getItem('currentScheme'),
        schemeId: window.localStorage.getItem('currentScheme'),
        userId: createdById
      }
    });
    this.setState({ disabled: false });
    this.props.setStatusBar(false, '');
    this.props.toggleFetchOffenders(false);
  };

  render() {
    const {
      setBottomNav,
      setTitle,
      setNavbarAction,
      setBackLinkTo,
      groups,
      groupsLoading,
      admin,
      labelsLoading,
      allOffenderLabels,
      createdById
    } = this.props;
    const {
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      hair,
      peculiarities,
      disabled,
      images,
      selectedLabels,
      exclusions,
      editingExclusion,
      pristine,
      selectedGroups
    } = this.state;

    return (
      <MediaQuery minDeviceWidth={1024}>
        {matches =>
          matches ? (
            <OffenderWizard
              handleChange={this.handleChange}
              name={name}
              gender={gender}
              race={race}
              build={build}
              age={age}
              dateOfBirth={dateOfBirth}
              dateSource={dateSource}
              hair={hair}
              peculiarities={peculiarities}
              images={images}
              disabled={disabled}
              uploadImage={this.addImage}
              removeImage={this.removeImage}
              offenderLabels={allOffenderLabels}
              selectedLabels={selectedLabels}
              toggleSelectedLabels={this.toggleSelectedLabels}
              addLabel={this.addLabel}
              exclusions={exclusions}
              addExclusion={this.addExclusion}
              removeExclusion={this.removeExclusion}
              editingExclusion={editingExclusion}
              setEditingExclusion={this.setEditingExclusion}
              editExclusion={this.editExclusion}
              handlePost={this.handlePost}
              groups={groups}
              groupsLoading={groupsLoading}
              toggleSelectedGroups={this.toggleSelectedGroups}
              selectedGroups={selectedGroups}
              admin={admin}
              createdById={createdById}
            />
          ) : (
            <MobileForm
              createdById={createdById}
              pristine={pristine}
              setBottomNav={setBottomNav}
              setNavbarAction={setNavbarAction}
              setTitle={setTitle}
              setBackLinkTo={setBackLinkTo}
              handleChange={this.handleChange}
              name={name}
              gender={gender}
              race={race}
              build={build}
              age={age}
              dateOfBirth={dateOfBirth}
              dateSource={dateSource}
              hair={hair}
              peculiarities={peculiarities}
              uploadImage={this.addImage}
              uploadMobileImage={this.addImageMobile}
              disabled={disabled}
              images={images}
              removeImage={this.removeImage}
              offenderLabels={allOffenderLabels}
              selectedLabels={selectedLabels}
              toggleSelectedLabels={this.toggleSelectedLabels}
              addLabel={this.addLabel}
              exclusions={exclusions}
              addExclusion={this.addExclusion}
              removeExclusion={this.removeExclusion}
              editingExclusion={editingExclusion}
              setEditingExclusion={this.setEditingExclusion}
              editExclusion={this.editExclusion}
              selectedGroups={selectedGroups}
              toggleSelectedGroups={this.toggleSelectedGroups}
              handlePost={this.handlePost}
              groups={groups}
              groupsLoading={groupsLoading}
              admin={admin}
              labelsLoading={labelsLoading}
            />
          )
        }
      </MediaQuery>
    );
  }
}

export default withRouter(AddOffender);
