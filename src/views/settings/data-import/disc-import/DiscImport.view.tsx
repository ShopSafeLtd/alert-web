/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import CSVReader from 'react-csv-reader';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
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
  Space,
  Steps,
  Table,
  Typography,
  Upload,
} from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/pro-light-svg-icons';
import type { SchemeGroupsQuery, TagsQuery } from 'graphql/generated';
import { TagType } from 'graphql/generated';
import type {
  CSVData,
  GenerateData,
  IDSought,
  Image,
  Incident,
  IncidentTags,
  KnownSubject,
  Member,
  NewBusiness,
  NewIncident,
  NewOffender,
  NewUser,
} from './DiscImport.types';
import NewUsersTable from './components/NewUsersTable';
import NewOffenderTable from './components/NewOffenderTable';
import NewBusinessTable from './components/NewBusinessTable';
import NewIncidentTable from './components/NewIncidentTable';

const { Title } = Typography;

const getTagText = (value: TagType) => {
  if (value === TagType.IncidentCrimeType) return 'Crime Type';
  if (value === TagType.IncidentImpact) return 'Impact';
  return 'Involved';
};

interface Props {
  knownSubjects: KnownSubject[];
  members: Member[];
  idSought: IDSought[];
  incidents: Incident[];
  images: Image[];
  newBusinesses: NewBusiness[];
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  onKnownSubjectFileLoaded: (data: CSVData) => void;
  onMembersFileLoaded: (data: CSVData) => void;
  onIDSoughtFileLoaded: (data: CSVData) => void;
  onIncidentFileLoaded: (data: CSVData) => void;
  onGenerateData: (data: GenerateData) => void;
  onDeleteNewBusiness: (id: string) => void;
  fileList: UploadFile[];
  handleFileListChange: UploadProps['onChange'];
  groupsData: SchemeGroupsQuery | undefined;
  memberModalOpen: boolean;
  knownSubjectModalOpen: boolean;
  idSoughtModalOpen: boolean;
  incidentModalOpen: boolean;
  imageModalOpen: boolean;
  toggleMemberModal: () => void;
  toggleKnownSubjectModal: () => void;
  toggleIdSoughtModal: () => void;
  toggleIncidentModal: () => void;
  toggleImageModal: () => void;
  generating: boolean;
  tagData: TagsQuery | undefined;
  newIncidents: NewIncident[];
  activeTags: IncidentTags;
  onSubmit: () => void;
  onUpdateOffender: (data: NewOffender) => void;
  onUpdateIncident: (data: NewIncident) => void;
  onUpdateBusiness: (data: NewBusiness) => void;
  onUpdateUser: (data: NewUser) => void;
  mappingForm: FormInstance<GenerateData>;
  areas: string[];
  galleries: string[];
  currentStep: number;
  onStepChange: (value: number) => void;
}

const DiscImport = ({
  knownSubjects,
  members,
  idSought,
  incidents,
  images,
  newBusinesses,
  newOffenders,
  newUsers,
  onKnownSubjectFileLoaded,
  onMembersFileLoaded,
  onIDSoughtFileLoaded,
  onIncidentFileLoaded,
  onGenerateData,
  fileList,
  handleFileListChange,
  groupsData,
  memberModalOpen,
  knownSubjectModalOpen,
  idSoughtModalOpen,
  incidentModalOpen,
  imageModalOpen,
  toggleMemberModal,
  toggleKnownSubjectModal,
  toggleIdSoughtModal,
  toggleIncidentModal,
  toggleImageModal,
  generating,
  onDeleteNewBusiness,
  tagData,
  newIncidents,
  activeTags,
  onSubmit,
  onUpdateOffender,
  onUpdateIncident,
  onUpdateBusiness,
  onUpdateUser,
  mappingForm,
  areas,
  galleries,
  currentStep,
  onStepChange,
}: Props) => (
  <div style={{ padding: 20 }}>
    <Steps
      current={currentStep}
      style={{ marginBottom: 20 }}
      onChange={onStepChange}
      items={[
        {
          title: 'DISC Data',
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
    />

    {currentStep === 0 && (
      <Card title="DISC Data">
        <Row gutter={16}>
          <Col>
            <Title level={5}>Members CSV</Title>
            <CSVReader onFileLoaded={onMembersFileLoaded} />
          </Col>
          <Col>
            <Title level={5}>Known Subjects CSV</Title>
            <CSVReader onFileLoaded={onKnownSubjectFileLoaded} />
          </Col>
          <Col>
            <Title level={5}>ID Sought CSV</Title>
            <CSVReader onFileLoaded={onIDSoughtFileLoaded} />
          </Col>
          <Col>
            <Title level={5}>Incidents CSV</Title>
            <CSVReader onFileLoaded={onIncidentFileLoaded} />
          </Col>
          <Col>
            <Title level={5}>Images ZIP</Title>
            <Upload
              action="http://localhost:4000/import-zip"
              fileList={fileList}
              onChange={handleFileListChange}
              accept=".zip"
            >
              <Button
                icon={
                  <FontAwesomeIcon
                    style={{ marginRight: 10 }}
                    icon={faUpload}
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
            title="DISC Members"
            onClick={toggleMemberModal}
            style={{ cursor: 'pointer', margin: 0 }}
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                style={{ marginLeft: 10 }}
                showZero
                count={members.length}
              />
            }
          />
        </Col>
        <Col>
          <Card
            title="DISC Known Subjects"
            style={{ cursor: 'pointer', margin: 0 }}
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                style={{ marginLeft: 10 }}
                showZero
                count={knownSubjects.length}
              />
            }
            onClick={toggleKnownSubjectModal}
          />
        </Col>
        <Col>
          <Card
            title="DISC ID Sought"
            style={{ cursor: 'pointer', margin: 0 }}
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                style={{ marginLeft: 10 }}
                showZero
                count={idSought.length}
              />
            }
            onClick={toggleIdSoughtModal}
          />
        </Col>
        <Col>
          <Card
            title="DISC Incidents"
            style={{ cursor: 'pointer', margin: 0 }}
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                style={{ marginLeft: 10 }}
                showZero
                count={incidents.length}
              />
            }
            onClick={toggleIncidentModal}
          />
        </Col>
        <Col>
          <Card
            title="DISC Images"
            style={{ cursor: 'pointer', margin: 0 }}
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                style={{ marginLeft: 10 }}
                showZero
                count={images.length}
              />
            }
            onClick={toggleImageModal}
          />
        </Col>
      </Row>
    )}

    {currentStep === 1 && (
      <Card title="Import Settings" style={{ marginTop: 20 }}>
        <Form
          form={mappingForm}
          onFinish={onGenerateData}
          initialValues={{ excludeDate: moment().add(-1, 'year') }}
        >
          <Row gutter={8}>
            <Col>
              <Form.Item
                name="excludeDate"
                label="Exclude data older than:"
                required
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4}>Tag Mapping</Title>
          <Row gutter={16}>
            {activeTags.assaultViolenceAffray && (
              <Col span={12}>
                <Form.Item
                  name="assaultViolenceAffray"
                  label="Assault/Violence/Affray"
                  rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    maxTagCount={2}
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.beggingPersistent && (
              <Col span={12}>
                <Form.Item
                  name="beggingPersistent"
                  label="Begging, persistent"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.begging && (
              <Col span={12}>
                <Form.Item
                  name="begging"
                  label="Begging"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.criminalDamageGraffitiVandalism && (
              <Col span={12}>
                <Form.Item
                  name="criminalDamageGraffitiVandalism"
                  label="Criminal Damage/Graffiti/Vandalism"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.possessionWithIntentToSupplyDrugs && (
              <Col span={12}>
                <Form.Item
                  name="possessionWithIntentToSupplyDrugs"
                  label="Possession with intent to supply drugs"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.harassmentThreateningBehaviour && (
              <Col span={12}>
                <Form.Item
                  name="harassmentThreateningBehaviour"
                  label="Harassment/Threatening Behaviour"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.joyRiding && (
              <Col span={12}>
                <Form.Item
                  name="joyRiding"
                  label="Joyriding"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.kerbCrawling && (
              <Col span={12}>
                <Form.Item
                  name="kerbCrawling"
                  label="Kerbcrawling"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.noiseNuisance && (
              <Col span={12}>
                <Form.Item
                  name="noiseNuisance"
                  label="Noise Nuisance"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.inappropriateSexualContact && (
              <Col span={12}>
                <Form.Item
                  name="inappropriateSexualContact"
                  label="Inappropriate sexual contact"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.racialAbuse && (
              <Col span={12}>
                <Form.Item
                  name="racialAbuse"
                  label="Racial Abuse"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.smokingUnderageOrInProhibitedArea && (
              <Col span={12}>
                <Form.Item
                  name="smokingUnderageOrInProhibitedArea"
                  label="Smoking, underage or in prohibited area"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.streetDrinking && (
              <Col span={12}>
                <Form.Item
                  name="streetDrinking"
                  label="Street drinking"
                  rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    maxTagCount={2}
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.possessionOfDrugs && (
              <Col span={12}>
                <Form.Item
                  name="possessionOfDrugs"
                  label="Possession of Drugs"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.theft && (
              <Col span={12}>
                <Form.Item
                  name="theft"
                  label="Theft"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.verbalAbuse && (
              <Col span={12}>
                <Form.Item
                  name="verbalAbuse"
                  label="Verbal Abuse"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.beingOnPremisesWhilstBanned && (
              <Col span={12}>
                <Form.Item
                  name="beingOnPremisesWhilstBanned"
                  label="Being On Premises Whilst Banned"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.breachOfSection35Order && (
              <Col span={12}>
                <Form.Item
                  name="breachOfSection35Order"
                  label="Breach of Section 35 (was 27) Order"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.other && (
              <Col span={12}>
                <Form.Item
                  name="other"
                  label="Other"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.unlicensedTaxiCab && (
              <Col span={12}>
                <Form.Item
                  name="unlicensedTaxiCab"
                  label="Unlicensed Taxi Cab"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.unlicensedStreetTrading && (
              <Col span={12}>
                <Form.Item
                  name="unlicensedStreetTrading"
                  label="Unlicensed Street Trading"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.misuseOfID && (
              <Col span={12}>
                <Form.Item
                  name="misuseOfID"
                  label="Misuse of ID"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.underageIntoxication && (
              <Col span={12}>
                <Form.Item
                  name="underageIntoxication"
                  label="Underage Intoxication"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.goingEquippedToSteal && (
              <Col span={12}>
                <Form.Item
                  name="goingEquippedToSteal"
                  label="Going equipped to steal"
                  rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.hateCrime && (
              <Col span={12}>
                <Form.Item
                  name="hateCrime"
                  label="Hate Crime"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.roughSleeping && (
              <Col span={12}>
                <Form.Item
                  name="roughSleeping"
                  label="Rough Sleeping"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.breachOfBan && (
              <Col span={12}>
                <Form.Item
                  name="breachOfBan"
                  label="Breach of an order/ban etc"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.drunkenDisorderlyBehaviour && (
              <Col span={12}>
                <Form.Item
                  name="drunkenDisorderlyBehaviour"
                  label="Drunken and disorderly behaviour"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.possessionOfAnOffensiveWeapon && (
              <Col span={12}>
                <Form.Item
                  name="possessionOfAnOffensiveWeapon"
                  label="Possession of an offensive weapon"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.attemptedTheft && (
              <Col span={12}>
                <Form.Item
                  name="attemptedTheft"
                  label="Attempted theft"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.illegalGambling && (
              <Col span={12}>
                <Form.Item
                  name="illegalGambling"
                  label="Illegal gambling"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.robbery && (
              <Col span={12}>
                <Form.Item
                  name="robbery"
                  label="Robbery"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.section35Issued && (
              <Col span={12}>
                <Form.Item
                  name="section35Issued"
                  label="Section 35 issued"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.breachPoliceBail && (
              <Col span={12}>
                <Form.Item
                  name="breachPoliceBail"
                  label="Breach of Police bail"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.otherAlcoholDrugRelated && (
              <Col span={12}>
                <Form.Item
                  name="otherAlcoholDrugRelated"
                  label="Other Alcohol/Drug-related"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.otherAntiSocialBehaviour && (
              <Col span={12}>
                <Form.Item
                  name="otherAntiSocialBehaviour"
                  label="Other Anti-Social Behaviour"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.otherTheftFraud && (
              <Col span={12}>
                <Form.Item
                  name="otherTheftFraud"
                  label="Other Theft/Fraud"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.otherViolentOffensiveBehaviour && (
              <Col span={12}>
                <Form.Item
                  name="otherViolentOffensiveBehaviour"
                  label="Other Violent or offensive behaviour"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.otherBreachBan && (
              <Col span={12}>
                <Form.Item
                  name="otherBreachBan"
                  label="Other Breach of an order/ban etc"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.fareEvasion && (
              <Col span={12}>
                <Form.Item
                  name="fareEvasion"
                  label="Fare evasion"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.covidRelated && (
              <Col span={12}>
                <Form.Item
                  name="covidRelated"
                  label="Covid-related"
                  rules={[{ required: true }]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      value: tag.id,
                      label: `${tag.name} (${getTagText(tag.type)})`,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          {areas.length === 0 && (
            <Form.Item name="defaultUserGroup" label="Default User Group">
              <Select
                mode="multiple"
                style={{ width: 200 }}
                options={groupsData?.groups.map((group) => ({
                  value: group.id,
                  label: group.name,
                }))}
              />
            </Form.Item>
          )}
          {areas.length > 0 && (
            <>
              <Title level={4}>Area To User Group Mapping</Title>
              <Form.List name="areas">
                {(fields) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...restField}
                          name={[name, 'area']}
                          rules={[{ required: true, message: 'Missing Area' }]}
                        >
                          <Input readOnly placeholder="" />
                        </Form.Item>
                        <Form.Item
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...restField}
                          name={[name, 'group']}
                          rules={[{ required: true, message: 'Missing group' }]}
                        >
                          <Select
                            mode="multiple"
                            style={{ width: 200 }}
                            options={groupsData?.groups.map((group) => ({
                              value: group.id,
                              label: group.name,
                            }))}
                          />
                        </Form.Item>
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </>
          )}

          {galleries.length === 0 && (
            <Form.Item
              name="defaultOffenderGroup"
              label="Default Offender Group"
            >
              <Select
                mode="multiple"
                style={{ width: 200 }}
                options={groupsData?.groups.map((group) => ({
                  value: group.id,
                  label: group.name,
                }))}
              />
            </Form.Item>
          )}
          {galleries.length > 0 && (
            <>
              <Title level={4}>Galleries To Offender Group Mapping</Title>
              <Form.List name="galleries">
                {(fields) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...restField}
                          name={[name, 'gallery']}
                          rules={[
                            { required: true, message: 'Missing Gallery' },
                          ]}
                        >
                          <Input readOnly placeholder="" />
                        </Form.Item>
                        <Form.Item
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...restField}
                          name={[name, 'group']}
                          rules={[{ required: true, message: 'Missing group' }]}
                        >
                          <Select
                            mode="multiple"
                            style={{ width: 200 }}
                            options={groupsData?.groups.map((group) => ({
                              value: group.id,
                              label: group.name,
                            }))}
                          />
                        </Form.Item>
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>
            </>
          )}

          <Form.Item>
            <Row gutter={8} style={{ width: '100%' }} justify="end">
              <Col>
                <Button onClick={() => onStepChange(currentStep - 1)}>
                  Back
                </Button>
              </Col>
              <Col>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={generating}
                  disabled={generating}
                >
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
        newBusinesses={newBusinesses}
        onAdd={() => {}}
        onDelete={onDeleteNewBusiness}
        onUpdateBusiness={onUpdateBusiness}
      />
    )}

    {currentStep === 3 && (
      <NewUsersTable
        groupsData={groupsData}
        newBusinesses={newBusinesses}
        newUsers={newUsers}
        onAdd={() => {}}
        onUpdateUser={onUpdateUser}
      />
    )}

    {currentStep === 4 && (
      <NewOffenderTable
        newOffenders={newOffenders}
        onAdd={() => {}}
        groupsData={groupsData}
        onUpdateOffender={onUpdateOffender}
      />
    )}

    {currentStep === 5 && (
      <NewIncidentTable
        newIncidents={newIncidents}
        onAdd={() => {}}
        groupsData={groupsData}
        tagsData={tagData}
        newOffenders={newOffenders}
        newBusinesses={newBusinesses}
        newUsers={newUsers}
        onUpdateIncident={onUpdateIncident}
      />
    )}

    <Row gutter={8} style={{ marginTop: 20 }} justify="end">
      {[2, 3, 4].includes(currentStep) && (
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
      open={memberModalOpen}
      onClose={toggleMemberModal}
      title="DISC Members"
      width="95vw"
    >
      {memberModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<Member>
            columns={[
              {
                key: 'id',
                dataIndex: 'id',
                title: 'ID',
              },
              {
                key: 'firstName',
                dataIndex: 'firstName',
                title: 'firstName',
              },
              {
                key: 'lastName',
                dataIndex: 'lastName',
                title: 'lastName',
              },
              {
                key: 'email',
                dataIndex: 'email',
                title: 'email',
              },
              {
                key: 'organisation',
                dataIndex: 'organisation',
                title: 'organisation',
              },
              {
                key: 'placeOfWork',
                dataIndex: 'placeOfWork',
                title: 'placeOfWork',
              },
              {
                key: 'premises',
                dataIndex: 'premises',
                title: 'premises',
              },
              {
                key: 'categories',
                dataIndex: 'categories',
                title: 'categories',
              },
              {
                key: 'lastSignedIn',
                dataIndex: 'lastSignedIn',
                title: 'lastSignedIn',
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
      open={knownSubjectModalOpen}
      onClose={toggleKnownSubjectModal}
      title="DISC Known Subject"
      width="95vw"
    >
      {knownSubjectModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<KnownSubject>
            columns={[
              {
                key: 'workspaceId',
                dataIndex: 'workspaceId',
                title: 'Workspace ID',
              },
              {
                key: 'workspaceName',
                dataIndex: 'workspaceName',
                title: 'Workspace Name',
              },
              {
                key: 'memberEmail',
                dataIndex: 'memberEmail',
                title: 'Email',
              },
              {
                key: 'id',
                dataIndex: 'id',
                title: 'ID',
              },
              {
                key: 'firstName',
                dataIndex: 'firstName',
                title: 'First Name',
              },
              {
                key: 'lastName',
                dataIndex: 'lastName',
                title: 'Last Name',
              },
              {
                key: 'nicknames',
                dataIndex: 'nicknames',
                title: 'Nicknames',
              },
              {
                key: 'gender',
                dataIndex: 'gender',
                title: 'Gender',
              },
              {
                key: 'dateOfBirth',
                dataIndex: 'dateOfBirth',
                title: 'DOB',
              },
              {
                key: 'prohibitions',
                dataIndex: 'prohibitions',
                title: 'Prohibitions',
              },
              {
                key: 'icCodes',
                dataIndex: 'icCodes',
                title: 'IC Codes',
              },
              {
                key: 'ageRange',
                dataIndex: 'ageRange',
                title: 'Age Range',
              },
              {
                key: 'height',
                dataIndex: 'height',
                title: 'Height',
              },
              {
                key: 'build',
                dataIndex: 'build',
                title: 'Build',
              },
              {
                key: 'distinguishingFeatures',
                dataIndex: 'distinguishingFeatures',
                title: 'Distinguishing Features',
              },
              {
                key: 'comments',
                dataIndex: 'comments',
                title: 'Comments',
              },
              {
                key: 'address',
                dataIndex: 'address',
                title: 'Address',
              },
              {
                key: 'postcode',
                dataIndex: 'postcode',
                title: 'Postcode',
              },
              {
                key: 'incidentCount',
                dataIndex: 'incidentCount',
                title: 'Incident Count',
              },
              {
                key: 'dateAdded',
                dataIndex: 'dateAdded',
                title: 'Date Added',
              },
              {
                key: 'databaseDeletionDate',
                dataIndex: 'databaseDeletionDate',
                title: 'Database Deletion Date',
              },
              {
                key: 'galleryStatus',
                dataIndex: 'galleryStatus',
                title: 'Gallery',
              },
            ]}
            dataSource={knownSubjects}
            pagination={false}
            size="small"
          />
        </div>
      )}
    </Drawer>
    <Drawer
      open={idSoughtModalOpen}
      onClose={toggleIdSoughtModal}
      title="DISC ID Sought"
      width="95vw"
    >
      {idSoughtModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<IDSought>
            columns={[
              {
                key: 'workspaceId',
                dataIndex: 'workspaceId',
                title: 'Workspace ID',
              },
              {
                key: 'workspaceName',
                dataIndex: 'workspaceName',
                title: 'Workspace Name',
              },
              {
                key: 'memberEmail',
                dataIndex: 'memberEmail',
                title: 'Email',
              },
              {
                key: 'id',
                dataIndex: 'id',
                title: 'ID',
              },
              {
                key: 'firstName',
                dataIndex: 'firstName',
                title: 'First Name',
              },
              {
                key: 'lastName',
                dataIndex: 'lastName',
                title: 'Last Name',
              },
              {
                key: 'nicknames',
                dataIndex: 'nicknames',
                title: 'Nicknames',
              },
              {
                key: 'gender',
                dataIndex: 'gender',
                title: 'Gender',
              },
              {
                key: 'dateOfBirth',
                dataIndex: 'dateOfBirth',
                title: 'DOB',
              },
              {
                key: 'prohibitions',
                dataIndex: 'prohibitions',
                title: 'Prohibitions',
              },
              {
                key: 'icCodes',
                dataIndex: 'icCodes',
                title: 'IC Codes',
              },
              {
                key: 'ageRange',
                dataIndex: 'ageRange',
                title: 'Age Range',
              },
              {
                key: 'height',
                dataIndex: 'height',
                title: 'Height',
              },
              {
                key: 'build',
                dataIndex: 'build',
                title: 'Build',
              },
              {
                key: 'distinguishingFeatures',
                dataIndex: 'distinguishingFeatures',
                title: 'Distinguishing Features',
              },
              {
                key: 'comments',
                dataIndex: 'comments',
                title: 'Comments',
              },
              {
                key: 'address',
                dataIndex: 'address',
                title: 'Address',
              },
              {
                key: 'postcode',
                dataIndex: 'postcode',
                title: 'Postcode',
              },
              {
                key: 'incidentCount',
                dataIndex: 'incidentCount',
                title: 'Incident Count',
              },
              {
                key: 'dateAdded',
                dataIndex: 'dateAdded',
                title: 'Date Added',
              },
              {
                key: 'databaseDeletionDate',
                dataIndex: 'databaseDeletionDate',
                title: 'Database Deletion Date',
              },
              {
                key: 'galleryStatus',
                dataIndex: 'galleryStatus',
                title: 'Gallery',
              },
            ]}
            dataSource={idSought}
            pagination={false}
            size="small"
          />
        </div>
      )}
    </Drawer>
    <Drawer
      open={incidentModalOpen}
      onClose={toggleIncidentModal}
      title="DISC Incidents"
      width="95vw"
    >
      {incidentModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<Incident>
            columns={[
              {
                key: 'workspaceName',
                dataIndex: 'workspaceName',
                title: 'Workspace Name',
              },
              {
                key: 'id',
                dataIndex: 'id',
                title: 'ID',
              },
              {
                key: 'date',
                dataIndex: 'date',
                title: 'Date',
              },
              {
                key: 'dateTime',
                dataIndex: 'dateTime',
                title: 'Date Time',
              },
              {
                key: 'summary',
                dataIndex: 'summary',
                title: 'Summary',
              },
              {
                key: 'description',
                dataIndex: 'description',
                title: 'Description',
              },
              {
                key: 'policeContacted',
                dataIndex: 'policeContacted',
                title: 'Police Contacted',
              },
              {
                key: 'sentToEmails',
                dataIndex: 'sentToEmails',
                title: 'Sent To Emails',
              },
              {
                key: 'crimeReportStatus',
                dataIndex: 'crimeReportStatus',
                title: 'Crime Report Status',
              },
              {
                key: 'internalReference',
                dataIndex: 'internalReference',
                title: 'Internal Reference',
              },
              {
                key: 'vehicleDescriptions',
                dataIndex: 'vehicleDescriptions',
                title: 'Vehicle Descriptions',
              },
              {
                key: 'vehicleRegistrations',
                dataIndex: 'vehicleRegistrations',
                title: 'Vehicle Registrations',
              },
              {
                key: 'fraudInvolved',
                dataIndex: 'fraudInvolved',
                title: 'Fraud Involved',
              },
              {
                key: 'outcome',
                dataIndex: 'outcome',
                title: 'Outcome',
              },
              {
                key: 'otherOutcome',
                dataIndex: 'otherOutcome',
                title: 'Other Outcome',
              },
              {
                key: 'drinkInvolved',
                dataIndex: 'drinkInvolved',
                title: 'Drink Involved',
              },
              {
                key: 'drugsInvolved',
                dataIndex: 'drugsInvolved',
                title: 'Drugs Involved',
              },
              {
                key: 'dealingInvolved',
                dataIndex: 'dealingInvolved',
                title: 'Dealing Involved',
              },
              {
                key: 'weaponInvolved',
                dataIndex: 'weaponInvolved',
                title: 'Weapon Involved',
              },
              {
                key: 'groupInvolved',
                dataIndex: 'groupInvolved',
                title: 'Group Involved',
              },
              {
                key: 'violenceInvolved',
                dataIndex: 'violenceInvolved',
                title: 'Violence Involved',
              },
              {
                key: 'verbalAbuseInvolved',
                dataIndex: 'verbalAbuseInvolved',
                title: 'Verbal Abuse Involved',
              },
              {
                key: 'lossValue',
                dataIndex: 'lossValue',
                title: 'Loss Value',
              },
              {
                key: 'lossRecovered',
                dataIndex: 'lossRecovered',
                title: 'Description',
              },
              {
                key: 'policeReference',
                dataIndex: 'policeReference',
                title: 'Police Reference',
              },
              {
                key: 'address',
                dataIndex: 'address',
                title: 'Address',
              },
              {
                key: 'postcode',
                dataIndex: 'postcode',
                title: 'Postcode',
              },
              {
                key: 'memberId',
                dataIndex: 'memberId',
                title: 'Member ID',
              },
              {
                key: 'memberName',
                dataIndex: 'memberName',
                title: 'Member Name',
              },
              {
                key: 'memberEmail',
                dataIndex: 'memberEmail',
                title: 'Member Email',
              },
              {
                key: 'locationName',
                dataIndex: 'locationName',
                title: 'Location Name',
              },
              {
                key: 'premises',
                dataIndex: 'premises',
                title: 'Premises',
              },
              {
                key: 'typeOfOffence',
                dataIndex: 'typeOfOffence',
                title: 'Type Of Offence',
              },
              {
                key: 'assaultViolenceAffray',
                dataIndex: 'assaultViolenceAffray',
                title: 'Assault Violence Affray',
              },
              {
                key: 'beggingPersistent',
                dataIndex: 'beggingPersistent',
                title: 'Begging Persistent',
              },
              {
                key: 'begging',
                dataIndex: 'begging',
                title: 'Begging',
              },
              {
                key: 'criminalDamageGraffitiVandalism',
                dataIndex: 'criminalDamageGraffitiVandalism',
                title: 'Description',
              },
              {
                key: 'possessionWithIntentToSupplyDrugs',
                dataIndex: 'possessionWithIntentToSupplyDrugs',
                title: 'Possession With Intent To Supply Drugs',
              },
              {
                key: 'harassmentThreateningBehaviour',
                dataIndex: 'harassmentThreateningBehaviour',
                title: 'Harassment Threatening Behaviour',
              },
              {
                key: 'joyRiding',
                dataIndex: 'joyRiding',
                title: 'Joy Riding',
              },
              {
                key: 'kerbCrawling',
                dataIndex: 'kerbCrawling',
                title: 'Kerb Crawling',
              },
              {
                key: 'noiseNuisance',
                dataIndex: 'noiseNuisance',
                title: 'Noise Nuisance',
              },
              {
                key: 'inappropriateSexualContact',
                dataIndex: 'inappropriateSexualContact',
                title: 'Inappropriate Sexual Contact',
              },
              {
                key: 'racialAbuse',
                dataIndex: 'racialAbuse',
                title: 'Racial Abuse',
              },
              {
                key: 'smokingUnderageOrInProhibitedArea',
                dataIndex: 'smokingUnderageOrInProhibitedArea',
                title: 'Smoking Underage Or In Prohibited Area',
              },
              {
                key: 'streetDrinking',
                dataIndex: 'streetDrinking',
                title: 'Street Drinking',
              },
              {
                key: 'possessionOfDrugs',
                dataIndex: 'possessionOfDrugs',
                title: 'Possession Of Drugs',
              },
              {
                key: 'theft',
                dataIndex: 'theft',
                title: 'Theft',
              },
              {
                key: 'verbalAbuse',
                dataIndex: 'verbalAbuse',
                title: 'Verbal Abuse',
              },
              {
                key: 'beingOnPremisesWhilstBanned',
                dataIndex: 'beingOnPremisesWhilstBanned',
                title: 'Being On Premises Whilst Banned',
              },
              {
                key: 'breachOfSection35Order',
                dataIndex: 'breachOfSection35Order',
                title: 'Breach Of Section 35 Order',
              },
              {
                key: 'other',
                dataIndex: 'other',
                title: 'Other',
              },
              {
                key: 'unlicensedTaxiCab',
                dataIndex: 'unlicensedTaxiCab',
                title: 'Unlicensed Taxi Cab',
              },
              {
                key: 'unlicensedStreetTrading',
                dataIndex: 'unlicensedStreetTrading',
                title: 'Unlicensed Street Trading',
              },
              {
                key: 'misuseOfID',
                dataIndex: 'misuseOfID',
                title: 'Misuse Of ID',
              },
              {
                key: 'underageIntoxication',
                dataIndex: 'underageIntoxication',
                title: 'Underage Intoxication',
              },
              {
                key: 'goingEquippedToSteal',
                dataIndex: 'goingEquippedToSteal',
                title: 'Going Equipped To Steal',
              },
              {
                key: 'hateCrime',
                dataIndex: 'hateCrime',
                title: 'Hate Crime',
              },
              {
                key: 'roughSleeping',
                dataIndex: 'roughSleeping',
                title: 'Rough Sleeping',
              },
              {
                key: 'breachOfBan',
                dataIndex: 'breachOfBan',
                title: 'Breach Of Ban',
              },
              {
                key: 'drunkenDisorderlyBehaviour',
                dataIndex: 'drunkenDisorderlyBehaviour',
                title: 'Drunken Disorderly Behaviour',
              },
              {
                key: 'possessionOfAnOffensiveWeapon',
                dataIndex: 'possessionOfAnOffensiveWeapon',
                title: 'Possession Of An Offensive Weapon',
              },
              {
                key: 'attemptedTheft',
                dataIndex: 'attemptedTheft',
                title: 'Attempted Theft',
              },
              {
                key: 'illegalGambling',
                dataIndex: 'illegalGambling',
                title: 'Illegal Gambling',
              },
              {
                key: 'robbery',
                dataIndex: 'robbery',
                title: 'Robbery',
              },
              {
                key: 'section35Issued',
                dataIndex: 'section35Issued',
                title: 'Section 35 Issued',
              },
              {
                key: 'breachPoliceBail',
                dataIndex: 'breachPoliceBail',
                title: 'Breach PoliceBail',
              },
              {
                key: 'otherAlcoholDrugRelated',
                dataIndex: 'otherAlcoholDrugRelated',
                title: 'Other Alcohol Drug Related',
              },
              {
                key: 'otherAntiSocialBehaviour',
                dataIndex: 'otherAntiSocialBehaviour',
                title: 'Other Anti Social Behaviour',
              },
              {
                key: 'otherTheftFraud',
                dataIndex: 'otherTheftFraud',
                title: 'Other Theft Fraud',
              },
              {
                key: 'otherViolentOffensiveBehaviour',
                dataIndex: 'otherViolentOffensiveBehaviour',
                title: 'Other Violent Offensive Behaviour',
              },
              {
                key: 'otherBreachBan',
                dataIndex: 'otherBreachBan',
                title: 'Other Breach Ban',
              },
              {
                key: 'fareEvasion',
                dataIndex: 'fareEvasion',
                title: 'Fare Evasion',
              },
              {
                key: 'covidRelated',
                dataIndex: 'covidRelated',
                title: 'COVID Related',
              },
              {
                key: 'subjectID',
                dataIndex: 'subjectID',
                title: 'Subject ID',
              },
              {
                key: 'subjectFirstName',
                dataIndex: 'subjectFirstName',
                title: 'Subject First Name',
              },
              {
                key: 'subjectLastName',
                dataIndex: 'subjectLastName',
                title: 'Subject Last Name',
              },
              {
                key: 'subjectDOB',
                dataIndex: 'subjectDOB',
                title: 'Subject DOB',
              },
              {
                key: 'subjectGender',
                dataIndex: 'subjectGender',
                title: 'Subject Gender',
              },
              {
                key: 'subjectProhibitions',
                dataIndex: 'subjectProhibitions',
                title: 'Subject Prohibitions',
              },
              {
                key: 'subjectDeletionDate',
                dataIndex: 'subjectDeletionDate',
                title: 'Subject Deletion Date',
              },
              {
                key: 'subjectID1',
                dataIndex: 'subjectID1',
                title: 'Subject 1 ID',
              },
              {
                key: 'subjectFirstName1',
                dataIndex: 'subjectFirstName1',
                title: 'Subject 1 FirstName',
              },
              {
                key: 'subjectLastName1',
                dataIndex: 'subjectLastName1',
                title: 'Subject 1 Last Name',
              },
              {
                key: 'subjectDOB1',
                dataIndex: 'subjectDOB1',
                title: 'Subject 1 DOB',
              },
              {
                key: 'subjectGender1',
                dataIndex: 'subjectGender1',
                title: 'Subject 1 Gender',
              },
              {
                key: 'subjectProhibitions1',
                dataIndex: 'subjectProhibitions1',
                title: 'Subject 1 Prohibitions',
              },
              {
                key: 'subjectDeletionDate1',
                dataIndex: 'subjectDeletionDate1',
                title: 'Subject 1 Deletion Date',
              },
              {
                key: 'subjectID2',
                dataIndex: 'subjectID2',
                title: 'Subject 2 ID',
              },
              {
                key: 'subjectFirstName2',
                dataIndex: 'subjectFirstName2',
                title: 'Subject 2 First Name',
              },
              {
                key: 'subjectLastName2',
                dataIndex: 'subjectLastName2',
                title: 'Subject 2 Last Name',
              },
              {
                key: 'subjectDOB2',
                dataIndex: 'subjectDOB2',
                title: 'Subject 2 DOB',
              },
              {
                key: 'subjectGender2',
                dataIndex: 'subjectGender2',
                title: 'Subject 2 Gender',
              },
              {
                key: 'subjectProhibitions2',
                dataIndex: 'subjectProhibitions2',
                title: 'Subject 2 Prohibitions',
              },
              {
                key: 'subjectDeletionDate2',
                dataIndex: 'subjectDeletionDate2',
                title: 'Subject 2 Deletion Date',
              },
              {
                key: 'subjectID3',
                dataIndex: 'subjectID3',
                title: 'Subject 3 ID',
              },
              {
                key: 'subjectFirstName3',
                dataIndex: 'subjectFirstName3',
                title: 'Subject 3 First Name',
              },
              {
                key: 'subjectLastName3',
                dataIndex: 'subjectLastName3',
                title: 'Subject 3 Last Name',
              },
              {
                key: 'subjectGender3',
                dataIndex: 'subjectGender3',
                title: 'Subject 3 Gender',
              },
              {
                key: 'subjectProhibitions3',
                dataIndex: 'subjectProhibitions3',
                title: 'Subject 3 Prohibitions',
              },
              {
                key: 'subjectDeletionDate3',
                dataIndex: 'subjectDeletionDate3',
                title: 'Subject 3 Deletion Date',
              },
              {
                key: 'subjectID4',
                dataIndex: 'subjectID4',
                title: 'Subject 4 ID',
              },
              {
                key: 'subjectFirstName4',
                dataIndex: 'subjectFirstName4',
                title: 'Subject 4 First Name',
              },
              {
                key: 'subjectLastName4',
                dataIndex: 'subjectLastName4',
                title: 'Subject 4 Last Name',
              },
              {
                key: 'subjectDOB4',
                dataIndex: 'subjectDOB4',
                title: 'Subject 4 DOB',
              },
              {
                key: 'subjectGender4',
                dataIndex: 'subjectGender4',
                title: 'Subject 4 Gender',
              },
              {
                key: 'subjectProhibitions4',
                dataIndex: 'subjectProhibitions4',
                title: 'Subject 4 Prohibitions',
              },
              {
                key: 'subjectDeletionDate4',
                dataIndex: 'subjectDeletionDate4',
                title: 'Subject 4 Deletion Date',
              },
              {
                key: 'subjectID5',
                dataIndex: 'subjectID5',
                title: 'Subject 5 ID',
              },
              {
                key: 'subjectFirstName5',
                dataIndex: 'subjectFirstName5',
                title: 'Subject 5 First Name',
              },
              {
                key: 'subjectLastName5',
                dataIndex: 'subjectLastName5',
                title: 'Subject 5 Last Name',
              },
              {
                key: 'subjectDOB5',
                dataIndex: 'subjectDOB5',
                title: 'Subject 5 DOB',
              },
              {
                key: 'subjectGender5',
                dataIndex: 'subjectGender5',
                title: 'Subject 5 Gender',
              },
              {
                key: 'subjectProhibitions5',
                dataIndex: 'subjectProhibitions5',
                title: 'Subject 5 Prohibitions',
              },
              {
                key: 'subjectDeletionDate5',
                dataIndex: 'subjectDeletionDate5',
                title: 'Subject 5 Deletion Date',
              },
              {
                key: 'subjectID6',
                dataIndex: 'subjectID6',
                title: 'Subject 6 ID',
              },
              {
                key: 'subjectFirstName6',
                dataIndex: 'subjectFirstName6',
                title: 'Subject 6 First Name',
              },
              {
                key: 'subjectLastName6',
                dataIndex: 'subjectLastName6',
                title: 'Subject 6 Last Name',
              },
              {
                key: 'subjectDOB6',
                dataIndex: 'subjectDOB6',
                title: 'Subject 6 DOB',
              },
              {
                key: 'subjectGender6',
                dataIndex: 'subjectGender6',
                title: 'Subject 6 Gender',
              },
              {
                key: 'subjectProhibitions6',
                dataIndex: 'subjectProhibitions6',
                title: 'Subject 6 Prohibitions',
              },
              {
                key: 'subjectDeletionDate6',
                dataIndex: 'subjectDeletionDate6',
                title: 'Subject 6 Deletion Date',
              },
              {
                key: 'incidentNotes',
                dataIndex: 'incidentNotes',
                title: 'Notes',
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
      open={imageModalOpen}
      onClose={toggleImageModal}
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
                    height: 200,
                    width: 170,
                    backgroundImage: `url(${image.url})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                    borderRadius: 10,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      justifyContent: 'center',
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
