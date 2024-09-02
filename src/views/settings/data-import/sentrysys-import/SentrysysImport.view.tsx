/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { GoodsTypesQuery } from '#/views/settings/data-import/csv/data-import/graphql/queries/__generated__/goods-types.generated';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';

import { faUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Steps,
  Table,
  Typography,
  Upload,
} from 'antd';
import { TagType } from 'graphql/types';
import moment from 'moment';
import React from 'react';

import type {
  CSVData,
  GenerateData,
  Image,
  Incident,
  Member,
  NewBusiness,
  NewIncident,
  NewOffender,
  NewUser,
  Profile,
  Vehicle,
} from './SentrysysImport.types';

import CSVReader from '../../../../components/CSVReader/CSVReader';
import NewBusinessTable from './components/NewBusinessTable';
import NewIncidentTable from './components/NewIncidentTable';
import NewOffenderTable from './components/NewOffenderTable';
import NewUsersTable from './components/NewUsersTable';

const { Title } = Typography;

const getTagText = (value: TagType) => {
  if (value === TagType.IncidentCrimeType) return 'Crime Type';
  if (value === TagType.IncidentImpact) return 'Impact';
  return 'Involved';
};

interface Props {
  currentStep: number;
  fileList: UploadFile[];
  generating: boolean;
  goodsData: GoodsTypesQuery | undefined;
  groupsData: SchemeGroupsQuery | undefined;
  handleFileListChange: UploadProps['onChange'];
  imageModalOpen: boolean;
  images: Image[];
  incidentItems: string[];
  incidentModalOpen: boolean;
  incidentTypes: string[];
  incidents: Incident[];
  mappingForm: FormInstance<GenerateData>;
  memberModalOpen: boolean;
  members: Member[];
  newBusinesses: NewBusiness[];
  newIncidents: NewIncident[];
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  onDeleteNewBusiness: (id: string) => void;
  onGenerateData: (values: GenerateData) => void;
  onIncidentFileLoaded: (data: CSVData) => void;
  onMembersFileLoaded: (data: CSVData) => void;
  onProfileFileLoaded: (data: CSVData) => void;
  onStepChange: (value: number) => void;
  onSubmit: () => void;
  onUpdateBusiness: (data: NewBusiness) => void;
  onUpdateIncident: (data: NewIncident) => void;
  onUpdateOffender: (data: NewOffender) => void;
  onUpdateUser: (data: NewUser) => void;
  onVehicleFileLoaded: (data: CSVData) => void;
  profileModalOpen: boolean;
  profiles: Profile[];
  tagData: TagsQuery | undefined;
  toggleImageModal: () => void;
  toggleIncidentModal: () => void;
  toggleMemberModal: () => void;
  toggleProfileModal: () => void;
  toggleVehicleModal: () => void;
  vehicleModalOpen: boolean;
  vehicles: Vehicle[];
}

const DiscImport = ({
  currentStep,
  fileList,
  goodsData,
  groupsData,
  handleFileListChange,
  imageModalOpen,
  images,
  incidentItems,
  incidentModalOpen,
  incidentTypes,
  incidents,
  mappingForm,
  memberModalOpen,
  members,
  newBusinesses,
  newIncidents,
  newOffenders,
  newUsers,
  onDeleteNewBusiness,
  onGenerateData,
  onIncidentFileLoaded,
  onMembersFileLoaded,
  onProfileFileLoaded,
  onStepChange,
  onSubmit,
  onUpdateBusiness,
  onUpdateIncident,
  onUpdateOffender,
  onUpdateUser,
  onVehicleFileLoaded,
  profileModalOpen,
  profiles,
  tagData,
  toggleImageModal,
  toggleIncidentModal,
  toggleMemberModal,
  toggleProfileModal,
  toggleVehicleModal,
  vehicleModalOpen,
  vehicles,
}: Props) => (
  <div style={{ padding: 20 }}>
    <Steps
      current={currentStep}
      items={[
        {
          title: 'Data',
        },
        {
          title: 'Import Settings',
        },
        {
          title: 'Business',
        },
        {
          title: 'Users',
        },
        {
          title: 'Offenders',
        },
        {
          title: 'Incidents',
        },
      ]}
      onChange={onStepChange}
      style={{ marginBottom: 20 }}
    />

    {currentStep === 0 && (
      <Card title="Data">
        <Row gutter={16}>
          <Col>
            <Title level={5}>Members CSV</Title>
            <CSVReader onFileLoaded={onMembersFileLoaded} />
          </Col>
          <Col>
            <Title level={5}>Profiles CSV</Title>
            <CSVReader onFileLoaded={onProfileFileLoaded} />
          </Col>
          <Col>
            <Title level={5}>Vehciles CSV</Title>
            <CSVReader onFileLoaded={onVehicleFileLoaded} />
          </Col>
          <Col>
            <Title level={5}>Incidents CSV</Title>
            <CSVReader onFileLoaded={onIncidentFileLoaded} />
          </Col>
          <Col>
            <Title level={5}>Images ZIP</Title>
            <Upload
              accept=".zip"
              action="http://localhost:4000/import-sentrysys-zip"
              fileList={fileList}
              onChange={handleFileListChange}
            >
              <Button
                icon={
                  <FontAwesomeIcon
                    icon={faUpload}
                    style={{ marginRight: 10 }}
                  />
                }
              >
                Click to Upload
              </Button>
            </Upload>
          </Col>
        </Row>
      </Card>
    )}

    {currentStep === 0 && (
      <Row gutter={[16, 16]}>
        <Col>
          <Card
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                count={members.length}
                showZero
                style={{ marginLeft: 10 }}
              />
            }
            onClick={toggleMemberModal}
            style={{ cursor: 'pointer', margin: 0 }}
            title="Members"
          />
        </Col>
        <Col>
          <Card
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                count={profiles.length}
                showZero
                style={{ marginLeft: 10 }}
              />
            }
            onClick={toggleProfileModal}
            style={{ cursor: 'pointer', margin: 0 }}
            title="Profiles"
          />
        </Col>
        <Col>
          <Card
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                count={vehicles.length}
                showZero
                style={{ marginLeft: 10 }}
              />
            }
            onClick={toggleVehicleModal}
            style={{ cursor: 'pointer', margin: 0 }}
            title="Vehicles"
          />
        </Col>
        <Col>
          <Card
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                count={incidents.length}
                showZero
                style={{ marginLeft: 10 }}
              />
            }
            onClick={toggleIncidentModal}
            style={{ cursor: 'pointer', margin: 0 }}
            title="Incidents"
          />
        </Col>
        <Col>
          <Card
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                count={images.length}
                showZero
                style={{ marginLeft: 10 }}
              />
            }
            onClick={toggleImageModal}
            style={{ cursor: 'pointer', margin: 0 }}
            title="Images"
          />
        </Col>
      </Row>
    )}

    {currentStep === 1 && (
      <Card style={{ marginTop: 20 }} title="Import Settings">
        <Form
          form={mappingForm}
          initialValues={{
            'Aggressive Behaviour': ['clggflk080007pif8y8fne9h8'],
            Alcohol: ['clewopn4l0000pio83motlsfp'],
            'Anti-Social Behaviour': ['clggflk080007pif8y8fne9h8'],
            'Anti-Social Behaviour (Protest)': ['clggflk080007pif8y8fne9h8'],
            'Armed Robbery': ['clggfnkx8000bpif8u34zba7s'],
            Assault: ['clggfn3u9000apif8q9ctg92y'],
            'Attempt theft of pedal cycle': ['cliod0bje035fpia74we76u9f'],
            'Attempted Burglary': ['clggfke6x0001pif84t99h0g2'],
            'Attempted Theft': ['clggfl7ia0005pif8e8g6eip4'],
            'Attempted Violence': ['clggfn3u9000apif8q9ctg92y'],
            'Baby Items (Food/Milk)': ['clewopn4l0002pio84nnhvkdq'],
            Begging: ['cliod0bje035fpia74we76u9f'],
            'Books/Magazines': ['clewopn4l0006pio8uyf6f2j5'],
            'Breach CPN': ['clggfrvmu000ipif8s8559kzu'],
            'Breach CPW': ['clggfrvmu000ipif8s8559kzu'],
            'Breach Of Bail': ['clggfrvmu000ipif8s8559kzu'],
            'Breach of Court order': ['clggfrvmu000ipif8s8559kzu'],
            'Burglary/Housebreaking': ['clggfke6x0001pif84t99h0g2'],
            'Card Fraud': ['clggfpecc000epif8v1pdm5ts'],
            Cash: ['clewopn4m000apio8inue9d0a'],
            'Cash Distraction Scam Fraud': ['clggfpecc000epif8v1pdm5ts'],
            'Clothing Accessories': ['clewopn4m000ipio8o3hcrhn8'],
            'Clothing general': ['clewopn4m000ipio8o3hcrhn8'],
            'Commercial Burglary': ['clhajwccm0042y50vyd7grnky'],
            Computer: ['clewopn4m000kpio8j27cp685'],
            Cosmetics: ['clewopn4n000opio8lechqzwi'],
            'Criminal Attempt': ['cliod0bje035fpia74we76u9f'],
            'Criminal Damage': ['clggfpxjh000gpif8ci5xjzvv'],
            'Deception Fraud': ['clggfpecc000epif8v1pdm5ts'],
            'Direction to Leave': ['cliod0bje035fpia74we76u9f'],
            Drugs: ['clggfouc6000dpif84kawc6ab'],
            'Drunk & Disorderly': ['clggfr9tl000hpif8hxdv7yso'],
            'Ejected from Premises': ['cliod0bje035fpia74we76u9f'],
            Electrical: ['clewopn4n000qpio87i54rot4'],
            'Environmental Other': ['cliod0bje035fpia74we76u9f'],
            Fighting: ['clggfn3u9000apif8q9ctg92y'],
            'Food/Drink (Non Alcoholic)': ['clewopn4n000spio8miw51cpa'],
            Fragrance: ['clewopn4n000upio8rs8it7i1'],
            'Fraud/Forgery': ['clggfpecc000epif8v1pdm5ts'],
            'Go Equipped for Theft': ['clggfmj0m0008pif8n8qa5vf8'],
            Groceries: ['clewopn4n000wpio8bx5w0irq'],
            'Handbags & Luggage': ['clewopn4n000ypio8p48s5s6x'],
            Household: ['clewopn4o0010pio87bwskufw'],
            'Inappropriate Sexual Conduct': ['clggfodgm000cpif8qc27sakg'],
            'Indecent Exposure': ['clggfodgm000cpif8qc27sakg'],
            'Intimidation/Harassment': ['cliod05pz035epia74htgrlla'],
            'Jewellery & Watches': ['clewopn4o0012pio8jc1b6wzy'],
            'Mixed Goods': ['clewopn4q001spio8mzv0pdtp'],
            'Mobile Phone': ['clewopn4o0018pio888q5nh72'],
            'Motoring Offences': ['cliod0bje035fpia74we76u9f'],
            Other: ['cliod0bje035fpia74we76u9f'],
            'Other Fraud': ['clggfpecc000epif8v1pdm5ts'],
            'Payment Fraud (Other)': ['clggfpecc000epif8v1pdm5ts'],
            'Personal - Wallet/Purse': ['clewopn4p001apio8kmrf5wxu'],
            Pharmacy: ['clewopn4p001cpio80g5tqum1'],
            'Possess Offensive Weapon': ['clioczivh035cpia7t4eum8dq'],
            'Possession of Offensive Weapons': ['clioczivh035cpia7t4eum8dq'],
            'Public Nuisance': ['clggflk080007pif8y8fne9h8'],
            'Public Order': ['cliod0bje035fpia74we76u9f'],
            'Racial Abuse': ['clggfs5c3000jpif8gom4du3r'],
            'Racial Harassment': ['clggfs5c3000jpif8gom4du3r'],
            Razors: ['clewopn4p001epio8yxp4w87p'],
            'Refund Fraud': ['clggfpecc000epif8v1pdm5ts'],
            'Road Traffic Collision': ['cliod0bje035fpia74we76u9f'],
            Robbery: ['clggfnkx8000bpif8u34zba7s'],
            'Rogue Street Traders': ['clioczzud035dpia7xiim8won'],
            'Rough Sleeping': ['cliod0bje035fpia74we76u9f'],
            Sighting: ['cliod0bje035fpia74we76u9f'],
            Spectacles: ['clewopn4p001gpio8zrpdg1ub'],
            'Street Drinking': ['clggfr9tl000hpif8hxdv7yso'],
            'Suspicious Circumstances': ['clxbtqwdr04pjvxf3y7rjmd0l'],
            'Suspicious Vehicle': ['cliod0bje035fpia74we76u9f'],
            Terrorism: ['cliod0bje035fpia74we76u9f'],
            Theft: ['clggfke6x0001pif84t99h0g2'],
            'Theft From Motor Vehicle': ['cliod0bje035fpia74we76u9f'],
            'Theft Shop/Theft by Shoplifting': ['clggfke6x0001pif84t99h0g2'],
            'Theft from Person': ['clggfktzq0003pif8jq2t7lwo'],
            'Theft of Vehicle': ['cliod0bje035fpia74we76u9f'],
            'Threatening Behaviour': ['cliod05pz035epia74htgrlla'],
            Tobacco: ['clewopn4p001kpio8pi6xt2t6'],
            'Tools/Hardware': ['clewopn4q001opio8mr2eutdh'],
            Toys: ['clewopn4q001qpio8zayeoj1a'],
            Trespass: ['clxbw23s3064avxf38u4gy10w'],
            Unknown: ['clewopn4q001spio8mzv0pdtp'],
            'Uttering Forged Currency': ['clggfpecc000epif8v1pdm5ts'],
            'Verbal Abuse': [
              'clggft64s000rpif8ppva8ulb',
              'cliod05pz035epia74htgrlla',
            ],
            'Violent Crime': ['clggfn3u9000apif8q9ctg92y'],
            excludeIncidentDate: moment().add(-1, 'year'),
            excludeUserDate: moment().add(-3, 'month'),
            fallbackGroup: ['clt7471wg0agk8cp172ijr76w'],
            townCity: 'London',
          }}
          onFinish={onGenerateData}
        >
          <Row gutter={8}>
            <Col>
              <Form.Item
                label="Exclude data older than"
                name="excludeIncidentDate"
                required
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Exclude users that haven't logged in since"
                name="excludeUserDate"
                required
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Town City Override" name="townCity" required>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Fallback Group" name="fallbackGroup" required>
                <Select
                  mode="multiple"
                  options={groupsData?.groups.map((group) => ({
                    label: group.name,
                    value: group.id,
                  }))}
                  style={{ width: 200 }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4}>Tag Mapping</Title>
          <Row gutter={16}>
            {incidentTypes.map((item) => (
              <Col key={item} span={12}>
                <Form.Item
                  label={item}
                  name={item}
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      label: `${tag.name} (${getTagText(tag.type)})`,
                      value: tag.id,
                    }))}
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Title level={4}>Item Mapping</Title>
          <Row gutter={16}>
            {incidentItems.map((item) => (
              <Col key={item} span={12}>
                <Form.Item
                  label={item}
                  name={item}
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={goodsData?.goodsTypes.map((tag) => ({
                      label: tag.name,
                      value: tag.id,
                    }))}
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Form.Item>
            <Row gutter={8} justify="end" style={{ width: '100%' }}>
              <Col>
                <Button onClick={() => onStepChange(currentStep - 1)}>
                  Back
                </Button>
              </Col>
              <Col>
                <Button htmlType="submit" type="primary">
                  Generate Alert Data
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    )}

    {currentStep === 2 && (
      <NewBusinessTable
        groupsData={groupsData}
        newBusinesses={newBusinesses}
        onAdd={() => {}}
        onDelete={onDeleteNewBusiness}
        // TODO Fix
        // @ts-expect-error type mismatch
        onUpdateBusiness={onUpdateBusiness}
      />
    )}

    {currentStep === 3 && (
      <NewUsersTable
        groupsData={groupsData}
        newBusinesses={newBusinesses}
        newUsers={newUsers}
        onAdd={() => {}}
        // TODO Fix
        // @ts-expect-error type mismatch
        onUpdateUser={onUpdateUser}
      />
    )}

    {currentStep === 4 && (
      <NewOffenderTable
        groupsData={groupsData}
        // TODO Fix
        // @ts-expect-error type mismatch
        newOffenders={newOffenders}
        onAdd={() => {}}
        // TODO Fix
        // @ts-expect-error type mismatch
        onUpdateOffender={onUpdateOffender}
      />
    )}

    {currentStep === 5 && (
      <NewIncidentTable
        groupsData={groupsData}
        newBusinesses={newBusinesses}
        // TODO Fix
        // @ts-expect-error type mismatch
        newIncidents={newIncidents}
        // TODO Fix
        // @ts-expect-error type mismatch
        newOffenders={newOffenders}
        newUsers={newUsers}
        onAdd={() => {}}
        // TODO Fix
        // @ts-expect-error type mismatch
        onUpdateIncident={onUpdateIncident}
        tagsData={tagData}
      />
    )}

    <Row gutter={8} justify="end" style={{ marginTop: 20 }}>
      {[2, 3, 4, 5].includes(currentStep) && (
        <Col>
          <Button onClick={() => onStepChange(currentStep - 1)}>Back</Button>
        </Col>
      )}
      {[0, 2, 3, 4].includes(currentStep) && (
        <Col>
          <Button onClick={() => onStepChange(currentStep + 1)} type="primary">
            Next
          </Button>
        </Col>
      )}
      {currentStep === 5 && (
        <Col>
          <Button onClick={onSubmit}>Submit</Button>
        </Col>
      )}
    </Row>

    <Drawer
      onClose={toggleMemberModal}
      open={memberModalOpen}
      title="DISC Members"
      width="95vw"
    >
      {memberModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<Member>
            columns={[
              {
                dataIndex: 'memberUserID',
                key: 'memberUserID',
                title: 'memberUserID',
              },
              {
                dataIndex: 'dateCreated',
                key: 'dateCreated',
                title: 'dateCreated',
              },
              {
                dataIndex: 'forename',
                key: 'forename',
                title: 'forename',
              },
              {
                dataIndex: 'surname',
                key: 'surname',
                title: 'surname',
              },
              {
                dataIndex: 'email',
                key: 'email',
                title: 'email',
              },
              {
                dataIndex: 'jobRole',
                key: 'jobRole',
                title: 'jobRole',
              },
            ]}
            dataSource={members}
            pagination={false}
            size="small"
          />
        </div>
      )}
    </Drawer>
    <Drawer
      onClose={toggleProfileModal}
      open={profileModalOpen}
      title="Prfiles"
      width="95vw"
    >
      {profileModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<Profile>
            columns={[
              {
                dataIndex: 'profileID',
                key: 'profileID',
                title: 'profileID',
              },
              {
                dataIndex: 'dateCreated',
                key: 'dateCreated',
                title: 'dateCreated',
              },
              {
                dataIndex: 'forename',
                key: 'forename',
                title: 'forename',
              },
              {
                dataIndex: 'surname',
                key: 'surname',
                title: 'surname',
              },
              {
                dataIndex: 'gender',
                key: 'gender',
                title: 'gender',
              },
              {
                dataIndex: 'dateOfBirth',
                key: 'dateOfBirth',
                title: 'dateOfBirth',
              },
              {
                dataIndex: 'ethnicity',
                key: 'ethnicity',
                title: 'ethnicity',
              },
              {
                dataIndex: 'height',
                key: 'height',
                title: 'height',
              },
              {
                dataIndex: 'build',
                key: 'build',
                title: 'build',
              },
              {
                dataIndex: 'hairColour',
                key: 'hairColour',
                title: 'hairColour',
              },
              {
                dataIndex: 'eyeColour',
                key: 'eyeColour',
                title: 'eyeColour',
              },
              {
                dataIndex: 'aka',
                key: 'aka',
                title: 'aka',
              },
              {
                dataIndex: 'knownMarks',
                key: 'knownMarks',
                title: 'knownMarks',
              },
              {
                dataIndex: 'warning_Weapons',
                key: 'warning_Weapons',
                title: 'warning_Weapons',
              },
              {
                dataIndex: 'warning_GoingEquipped',
                key: 'warning_GoingEquipped',
                title: 'warning_GoingEquipped',
              },
              {
                dataIndex: 'warning_Violent',
                key: 'warning_Violent',
                title: 'warning_Violent',
              },
              {
                dataIndex: 'warning_Other',
                key: 'warning_Other',
                title: 'warning_Other',
              },
              {
                dataIndex: 'adminViewOnly',
                key: 'adminViewOnly',
                title: 'adminViewOnly',
              },
            ]}
            dataSource={profiles}
            pagination={false}
            size="small"
          />
        </div>
      )}
    </Drawer>
    <Drawer
      onClose={toggleVehicleModal}
      open={vehicleModalOpen}
      title="Vehicles"
      width="95vw"
    >
      {vehicleModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<Vehicle>
            columns={[
              {
                dataIndex: 'vehicleID',
                key: 'vehicleID',
                title: 'Vehicle ID',
              },
              {
                dataIndex: 'dateCreated',
                key: 'dateCreated',
                title: 'Date Created',
              },
              {
                dataIndex: 'registration',
                key: 'registration',
                title: 'Registration',
              },
              {
                dataIndex: 'make',
                key: 'make',
                title: 'Make',
              },
              {
                dataIndex: 'model',
                key: 'model',
                title: 'Model',
              },
              {
                dataIndex: 'colour',
                key: 'colour',
                title: 'Colour',
              },
            ]}
            dataSource={vehicles}
            pagination={false}
            size="small"
          />
        </div>
      )}
    </Drawer>
    <Drawer
      onClose={toggleIncidentModal}
      open={incidentModalOpen}
      title="DISC Incidents"
      width="95vw"
    >
      {incidentModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<Incident>
            columns={[
              {
                dataIndex: 'incidentID',
                key: 'incidentID',
                title: 'incidentID',
              },
              {
                dataIndex: 'dateCreated',
                key: 'dateCreated',
                title: 'dateCreated',
              },
              {
                dataIndex: 'memberUserID',
                key: 'memberUserID',
                title: 'memberUserID',
              },
              {
                dataIndex: 'incidentStatus',
                key: 'incidentStatus',
                title: 'incidentStatus',
              },
              {
                dataIndex: 'incidentDate',
                key: 'incidentDate',
                title: 'incidentDate',
              },
              {
                dataIndex: 'incidentType',
                key: 'incidentType',
                title: 'incidentType',
              },
              {
                dataIndex: 'internalDescription',
                key: 'internalDescription',
                title: 'internalDescription',
              },
              {
                dataIndex: 'adminViewOnly',
                key: 'adminViewOnly',
                title: 'adminViewOnly',
              },
              {
                dataIndex: 'incidentGoods',
                key: 'incidentGoods',
                title: 'incidentGoods',
              },
              {
                dataIndex: 'incidentProfiles',
                key: 'incidentProfiles',
                title: 'incidentProfiles',
              },
              {
                dataIndex: 'incidentVehicles',
                key: 'incidentVehicles',
                title: 'incidentVehicles',
              },
              {
                dataIndex: 'policeInvolvedAtScene',
                key: 'policeInvolvedAtScene',
                title: 'policeInvolvedAtScene',
              },
            ]}
            dataSource={incidents}
            pagination={{
              pageSize: 50,
            }}
            size="small"
          />
        </div>
      )}
    </Drawer>
    <Drawer
      onClose={toggleImageModal}
      open={imageModalOpen}
      title="DISC Images"
      width="95vw"
    >
      {imageModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Row gutter={[16, 16]}>
            {images.map((image) => (
              <Col key={image.fileName}>
                <div
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    borderRadius: 10,
                    height: 200,
                    overflow: 'hidden',
                    position: 'relative',
                    width: 170,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      bottom: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      left: 0,
                      right: 0,
                    }}
                  >
                    {image.originalName}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Drawer>
  </div>
);

export default DiscImport;
