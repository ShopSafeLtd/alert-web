import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { isEqual } from 'lodash-es';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/icons/Label';
import Button from '@material-ui/core/Button';

import { FullWidthButton, HelpButton } from '../../../../global/actions';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { EmptyText } from '../../../../global/typography';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 120px;
`;
const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
const FAB = styled(Fab)`
  position: fixed !important;
  bottom: 70px;
  right: 10px;
`;
const Add = styled.svg`
  height: 24px;
  width: 24px;
`;
const Empty = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const LabelIcon = styled(Icon)`
  color: #ef5350;
  font-size: 60px;
`;

const initialState = {
  error: '',
  id: '',
  selectedLabels: [],
  newLabels: [],
  removeLabels: []
};

class WarningList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.setBackLinkTo(this.props.basePath);
    if (!isEqual(this.props.offender, {})) {
      const {
        offender: { id, tags }
      } = this.props;
      this.setState({
        id,
        selectedLabels: tags.map(({ id }) => id)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.offender, {}) && isEqual(prevState, initialState)) {
      const {
        offender: { id, tags }
      } = this.props;
      this.setState({
        id,
        selectedLabels: tags.map(({ id }) => id)
      });
    }
    if (
      prevProps.offender.tags !== undefined &&
      !isEqual(prevProps.offender.tags, this.props.offender.tags)
    ) {
      const {
        offender: { id, tags }
      } = this.props;
      this.setState({
        id,
        selectedLabels: tags.map(({ id }) => id)
      });
    }
  }

  toggleOffenderLabels = id => {
    const { selectedLabels, newLabels, removeLabels } = this.state;
    if (selectedLabels.indexOf(id) === -1) {
      this.setState({
        selectedLabels: [...selectedLabels, id],
        newLabels: [...newLabels, id],
        removeLabels: removeLabels.filter(label => id !== label)
      });
    } else {
      this.setState({
        selectedLabels: selectedLabels.filter(label => id !== label),
        newLabels: newLabels.filter(label => id !== label),
        removeLabels: [...removeLabels, id]
      });
    }
  };

  save = () => {
    const { id, selectedLabels, newLabels, removeLabels } = this.state;
    this.props.editOffender({
      variables: {
        id,
        existingOffenderWarnings:
          newLabels.length > 0 ? newLabels.map(id => ({ id })) : undefined,
        removeOffenderWarnings:
          removeLabels.length > 0 ? removeLabels.map(id => ({ id })) : undefined
      },
      optimisticResponse: {
        updateOffender: {
          ...this.props.offender,
          tags: this.props.offenderWarnings.filter(({ id }) =>
            selectedLabels.includes(id)
          )
        }
      }
    });
  };

  handleSave = () => {
    this.save();
    this.props.history.push(this.props.basePath);
  };

  render() {
    const { selectedLabels } = this.state;
    const { offenderWarnings: tags, loading, basePath } = this.props;

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
          {tags.length === 0 ? (
            <Empty>
              <LabelIcon />
              <EmptyText>There are no offender warnings.</EmptyText>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                disabled={loading}
                to={`${basePath}/warnings/add`}
              >
                Add Warning
              </Button>
            </Empty>
          ) : (
            tags.map(label => (
              <ListItem key={label.id}>
                <Svg
                  onClick={() => this.toggleOffenderLabels(label.id)}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill={
                      selectedLabels.includes(label.id) ? '#1E88E5' : '#E0E0E0'
                    }
                    d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                  />
                </Svg>
                <ItemText onClick={() => this.toggleOffenderLabels(label.id)}>
                  {label.name}
                </ItemText>
                <HelpButton title={label.name} helpText={label.description} />
              </ListItem>
            ))
          )}
        </List>
        <FAB
          color="primary"
          aria-label="Add"
          disabled={loading}
          component={Link}
          to={`${basePath}/warnings/add`}
        >
          <Add viewBox="0 0 24 24">
            <path
              fill="#FFFFFF"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </Add>
        </FAB>
        <FullWidthButton
          text="Save Warning Labels"
          disabled={loading}
          onClick={this.handleSave}
        />
      </Page>
    );
  }
}

export default WarningList;
