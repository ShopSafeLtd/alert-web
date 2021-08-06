import React, { PureComponent } from 'react';
import MediaQuery from 'react-responsive';
import moment from 'moment';
import styled from 'styled-components';
import AddSvg from '@material-ui/icons/Add';
import MoreSvg from '@material-ui/icons/MoreHoriz';
import EditSvg from '@material-ui/icons/Edit';
import DeleteSvg from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Row, Section, Grow, SectionLoading } from '../../../../global/layout';
import { SubHeader, EmptyText } from '../../../../global/typography';
import { EmptySection } from '../../../../global/emptyStates';
import ExclusionImage from '../../../../../images/Exclusion';
import { MenuButton } from '../../../../global/actions';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';

const AddIcon = styled(AddSvg)`
  margin-right: 5px;
`;
const MoreIcon = styled(MoreSvg)`
  margin-right: 5px;
`;
const DeleteIcon = styled(DeleteSvg)`
  margin-right: 10px;
  color: #e57373;
`;
const EditIcon = styled(EditSvg)`
  margin-right: 10px;
  color: #e57373;
`;
const ItemHeader = styled(Typography)``;
const Column = styled.div`
  margin: 0 5px 0 10px;
  ${({ grow }) => grow && 'flex: 1;'};
`;
const Exclusion = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
`;
const ExclusionText = styled(Typography)`
  font-size: 14px;
  flex: 1;
`;
const ExclusionDate = styled(Typography)`
  margin: 0 5px;
  font-size: 14px;
`;

class EditExclusion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      deleteId: ''
    };
  }

  render() {
    const {
      exclusions,
      openAddExclusion,
      openEditExclusion,
      removeExclusion,
      loading
    } = this.props;
    const { confirmDelete, deleteId } = this.state;

    return (
      <MediaQuery minDeviceWidth={1024}>
        {matches => (
          <Section Section width={matches ? '50%' : '100%'} elevation={1}>
            {loading && <SectionLoading />}
            <Row row>
              <SubHeader>Bans</SubHeader>
              <Grow />
              {exclusions.length > 0 && (
                <Button color="primary" onClick={openAddExclusion}>
                  <AddIcon />
                  add
                </Button>
              )}
            </Row>
            {!!exclusions && exclusions.length > 0 ? (
              <div>
                {exclusions.map(exclusion => {
                  return (
                    <Exclusion key={exclusion.id}>
                      <Column>
                        <ItemHeader variant="caption">Duration</ItemHeader>
                        <Row row>
                          <ExclusionDate>
                            {moment(exclusion.startDate).format('DD/MM/YY')}
                          </ExclusionDate>
                          <svg
                            style={{ width: '24px', height: '24px' }}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#616161"
                              d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                            />
                          </svg>
                          <ExclusionDate>
                            {moment(exclusion.endDate).format('DD/MM/YY')}
                          </ExclusionDate>
                        </Row>
                      </Column>
                      <Column grow>
                        <ItemHeader variant="caption">Location</ItemHeader>
                        <ExclusionText>{exclusion.location}</ExclusionText>
                      </Column>
                      <MenuButton
                        id="menu-button-2"
                        icon
                        menuItems={[
                          {
                            key: 2,
                            primaryText: 'Edit Ban',
                            onClick: () => openEditExclusion(exclusion),
                            leftIcon: <EditIcon />
                          },
                          {
                            key: 3,
                            primaryText: 'Delete Ban',
                            onClick: () =>
                              this.setState({
                                confirmDelete: true,
                                deleteId: exclusion.id
                              }),
                            leftIcon: <DeleteIcon />
                          }
                        ]}
                      >
                        <MoreIcon />
                      </MenuButton>
                    </Exclusion>
                  );
                })}
                <ConfirmDialog
                  open={confirmDelete}
                  handleClose={() => this.setState({ confirmDelete: false })}
                  title="Are you sure?"
                  description="Are you sure you want to remove this ban from this offender, this will be permanent and cannot be undone."
                  actions={[
                    <Button
                      onClick={() => this.setState({ confirmDelete: false })}
                    >
                      Cancel
                    </Button>,
                    <Button
                      color="primary"
                      onClick={() => {
                        this.setState({ confirmDelete: false });
                        removeExclusion(deleteId);
                      }}
                    >
                      Remove Ban
                    </Button>
                  ]}
                />
              </div>
            ) : (
              <EmptySection>
                <ExclusionImage width="80px" height="80px" />
                <EmptyText>There are no bans for this offender</EmptyText>
                <Button color="primary" onClick={openAddExclusion}>
                  <AddIcon />
                  Add Ban
                </Button>
              </EmptySection>
            )}
          </Section>
        )}
      </MediaQuery>
    );
  }
}

export default EditExclusion;
