/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';

import DatePicker from '#/components/util-components/DatePicker';
import { faUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Button,
  Card,
  Col,
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
import dayjs from 'dayjs';
import { TagType } from 'graphql/types';
import React from 'react';

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

import CSVReader from '../../../../components/CSVReader/CSVReader';
import NewBusinessTable from './components/NewBusinessTable';
import NewIncidentTable from './components/NewIncidentTable';
import NewOffenderTable from './components/NewOffenderTable';
import NewUsersTable from './components/NewUsersTable';

const { Title } = Typography;

const getTagText = (value: TagType) => {
  if (value === TagType.IncidentCrimeType) return 'Incident Type';
  if (value === TagType.IncidentImpact) return 'Impact';
  return 'Involved';
};

interface Props {
  activeTags: IncidentTags;
  areas: string[];
  currentStep: number;
  fileList: UploadFile[];
  galleries: string[];
  generating: boolean;
  groupsData: SchemeGroupsQuery | undefined;
  handleFileListChange: UploadProps['onChange'];
  idSought: IDSought[];
  idSoughtModalOpen: boolean;
  imageModalOpen: boolean;
  images: Image[];
  incidentModalOpen: boolean;
  incidents: Incident[];
  knownSubjectModalOpen: boolean;
  knownSubjects: KnownSubject[];
  mappingForm: FormInstance<GenerateData>;
  memberModalOpen: boolean;
  members: Member[];
  newBusinesses: NewBusiness[];
  newIncidents: NewIncident[];
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  onDeleteNewBusiness: (id: string) => void;
  onGenerateData: (data: GenerateData) => void;
  onIDSoughtFileLoaded: (data: CSVData) => void;
  onIncidentFileLoaded: (data: CSVData) => void;
  onKnownSubjectFileLoaded: (data: CSVData) => void;
  onMembersFileLoaded: (data: CSVData) => void;
  onStepChange: (value: number) => void;
  onSubmit: () => void;
  onUpdateBusiness: (data: NewBusiness) => void;
  onUpdateIncident: (data: NewIncident) => void;
  onUpdateOffender: (data: NewOffender) => void;
  onUpdateUser: (data: NewUser) => void;
  tagData: TagsQuery | undefined;
  toggleIdSoughtModal: () => void;
  toggleImageModal: () => void;
  toggleIncidentModal: () => void;
  toggleKnownSubjectModal: () => void;
  toggleMemberModal: () => void;
}

const DiscImport = ({
  activeTags,
  areas,
  currentStep,
  fileList,
  galleries,
  groupsData,
  handleFileListChange,
  idSought,
  idSoughtModalOpen,
  imageModalOpen,
  images,
  incidentModalOpen,
  incidents,
  knownSubjectModalOpen,
  knownSubjects,
  mappingForm,
  memberModalOpen,
  members,
  newBusinesses,
  newIncidents,
  newOffenders,
  newUsers,
  onDeleteNewBusiness,
  onGenerateData,
  onIDSoughtFileLoaded,
  onIncidentFileLoaded,
  onKnownSubjectFileLoaded,
  onMembersFileLoaded,
  onStepChange,
  onSubmit,
  onUpdateBusiness,
  onUpdateIncident,
  onUpdateOffender,
  onUpdateUser,
  tagData,
  toggleIdSoughtModal,
  toggleImageModal,
  toggleIncidentModal,
  toggleKnownSubjectModal,
  toggleMemberModal,
}: Props) => (
  <div style={{ padding: 20 }}>
    <Steps
      current={currentStep}
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
      onChange={onStepChange}
      style={{ marginBottom: 20 }}
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
              accept=".zip"
              action="http://localhost:4000/import-zip"
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
            title="DISC Members"
          />
        </Col>
        <Col>
          <Card
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                count={knownSubjects.length}
                showZero
                style={{ marginLeft: 10 }}
              />
            }
            onClick={toggleKnownSubjectModal}
            style={{ cursor: 'pointer', margin: 0 }}
            title="DISC Known Subjects"
          />
        </Col>
        <Col>
          <Card
            bodyStyle={{ padding: 10 }}
            extra={
              <Badge
                count={idSought.length}
                showZero
                style={{ marginLeft: 10 }}
              />
            }
            onClick={toggleIdSoughtModal}
            style={{ cursor: 'pointer', margin: 0 }}
            title="DISC ID Sought"
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
            title="DISC Incidents"
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
            title="DISC Images"
          />
        </Col>
      </Row>
    )}

    {currentStep === 1 && (
      <Card style={{ marginTop: 20 }} title="Import Settings">
        <Form
          form={mappingForm}
          initialValues={{
            excludeIncidentDate: dayjs().add(-1, 'year'),
            excludeUserDate: dayjs().add(-3, 'month'),
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
            {activeTags.assaultViolenceAffray && (
              <Col span={12}>
                <Form.Item
                  label="Assault/Violence/Affray"
                  name="assaultViolenceAffray"
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
            )}
            {activeTags.beggingPersistent && (
              <Col span={12}>
                <Form.Item
                  label="Begging, persistent"
                  name="beggingPersistent"
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
            )}
            {activeTags.begging && (
              <Col span={12}>
                <Form.Item
                  label="Begging"
                  name="begging"
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
            )}
            {activeTags.criminalDamageGraffitiVandalism && (
              <Col span={12}>
                <Form.Item
                  label="Criminal Damage/Graffiti/Vandalism"
                  name="criminalDamageGraffitiVandalism"
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
            )}
            {activeTags.possessionWithIntentToSupplyDrugs && (
              <Col span={12}>
                <Form.Item
                  label="Possession with intent to supply drugs"
                  name="possessionWithIntentToSupplyDrugs"
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
            )}
            {activeTags.harassmentThreateningBehaviour && (
              <Col span={12}>
                <Form.Item
                  label="Harassment/Threatening Behaviour"
                  name="harassmentThreateningBehaviour"
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
            )}
            {activeTags.joyRiding && (
              <Col span={12}>
                <Form.Item
                  label="Joyriding"
                  name="joyRiding"
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
            )}
            {activeTags.kerbCrawling && (
              <Col span={12}>
                <Form.Item
                  label="Kerbcrawling"
                  name="kerbCrawling"
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
            )}
            {activeTags.noiseNuisance && (
              <Col span={12}>
                <Form.Item
                  label="Noise Nuisance"
                  name="noiseNuisance"
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
            )}
            {activeTags.inappropriateSexualContact && (
              <Col span={12}>
                <Form.Item
                  label="Inappropriate sexual contact"
                  name="inappropriateSexualContact"
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
            )}
            {activeTags.racialAbuse && (
              <Col span={12}>
                <Form.Item
                  label="Racial Abuse"
                  name="racialAbuse"
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
            )}
            {activeTags.smokingUnderageOrInProhibitedArea && (
              <Col span={12}>
                <Form.Item
                  label="Smoking, underage or in prohibited area"
                  name="smokingUnderageOrInProhibitedArea"
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
            )}
            {activeTags.streetDrinking && (
              <Col span={12}>
                <Form.Item
                  label="Street drinking"
                  name="streetDrinking"
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
            )}
            {activeTags.possessionOfDrugs && (
              <Col span={12}>
                <Form.Item
                  label="Possession of Drugs"
                  name="possessionOfDrugs"
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
            )}
            {activeTags.theft && (
              <Col span={12}>
                <Form.Item
                  label="Theft"
                  name="theft"
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
            )}
            {activeTags.verbalAbuse && (
              <Col span={12}>
                <Form.Item
                  label="Verbal Abuse"
                  name="verbalAbuse"
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
            )}
            {activeTags.beingOnPremisesWhilstBanned && (
              <Col span={12}>
                <Form.Item
                  label="Being On Premises Whilst Banned"
                  name="beingOnPremisesWhilstBanned"
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
            )}
            {activeTags.breachOfSection35Order && (
              <Col span={12}>
                <Form.Item
                  label="Breach of Section 35 (was 27) Order"
                  name="breachOfSection35Order"
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
            )}
            {activeTags.other && (
              <Col span={12}>
                <Form.Item
                  label="Other"
                  name="other"
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
            )}
            {activeTags.unlicensedTaxiCab && (
              <Col span={12}>
                <Form.Item
                  label="Unlicensed Taxi Cab"
                  name="unlicensedTaxiCab"
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
            )}
            {activeTags.unlicensedStreetTrading && (
              <Col span={12}>
                <Form.Item
                  label="Unlicensed Street Trading"
                  name="unlicensedStreetTrading"
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
            )}
            {activeTags.misuseOfID && (
              <Col span={12}>
                <Form.Item
                  label="Misuse of ID"
                  name="misuseOfID"
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
            )}
            {activeTags.underageIntoxication && (
              <Col span={12}>
                <Form.Item
                  label="Underage Intoxication"
                  name="underageIntoxication"
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
            )}
            {activeTags.goingEquippedToSteal && (
              <Col span={12}>
                <Form.Item
                  label="Going equipped to steal"
                  name="goingEquippedToSteal"
                  rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    options={tagData?.tags.map((tag) => ({
                      label: `${tag.name} (${getTagText(tag.type)})`,
                      value: tag.id,
                    }))}
                  />
                </Form.Item>
              </Col>
            )}
            {activeTags.hateCrime && (
              <Col span={12}>
                <Form.Item
                  label="Hate Crime"
                  name="hateCrime"
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
            )}
            {activeTags.roughSleeping && (
              <Col span={12}>
                <Form.Item
                  label="Rough Sleeping"
                  name="roughSleeping"
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
            )}
            {activeTags.breachOfBan && (
              <Col span={12}>
                <Form.Item
                  label="Breach of an order/ban etc"
                  name="breachOfBan"
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
            )}
            {activeTags.drunkenDisorderlyBehaviour && (
              <Col span={12}>
                <Form.Item
                  label="Drunken and disorderly behaviour"
                  name="drunkenDisorderlyBehaviour"
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
            )}
            {activeTags.possessionOfAnOffensiveWeapon && (
              <Col span={12}>
                <Form.Item
                  label="Possession of an offensive weapon"
                  name="possessionOfAnOffensiveWeapon"
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
            )}
            {activeTags.attemptedTheft && (
              <Col span={12}>
                <Form.Item
                  label="Attempted theft"
                  name="attemptedTheft"
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
            )}
            {activeTags.illegalGambling && (
              <Col span={12}>
                <Form.Item
                  label="Illegal gambling"
                  name="illegalGambling"
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
            )}
            {activeTags.robbery && (
              <Col span={12}>
                <Form.Item
                  label="Robbery"
                  name="robbery"
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
            )}
            {activeTags.section35Issued && (
              <Col span={12}>
                <Form.Item
                  label="Section 35 issued"
                  name="section35Issued"
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
            )}
            {activeTags.breachPoliceBail && (
              <Col span={12}>
                <Form.Item
                  label="Breach of Police bail"
                  name="breachPoliceBail"
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
            )}
            {activeTags.otherAlcoholDrugRelated && (
              <Col span={12}>
                <Form.Item
                  label="Other Alcohol/Drug-related"
                  name="otherAlcoholDrugRelated"
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
            )}
            {activeTags.otherAntiSocialBehaviour && (
              <Col span={12}>
                <Form.Item
                  label="Other Anti-Social Behaviour"
                  name="otherAntiSocialBehaviour"
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
            )}
            {activeTags.otherTheftFraud && (
              <Col span={12}>
                <Form.Item
                  label="Other Theft/Fraud"
                  name="otherTheftFraud"
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
            )}
            {activeTags.otherViolentOffensiveBehaviour && (
              <Col span={12}>
                <Form.Item
                  label="Other Violent or offensive behaviour"
                  name="otherViolentOffensiveBehaviour"
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
            )}
            {activeTags.otherBreachBan && (
              <Col span={12}>
                <Form.Item
                  label="Other Breach of an order/ban etc"
                  name="otherBreachBan"
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
            )}
            {activeTags.fareEvasion && (
              <Col span={12}>
                <Form.Item
                  label="Fare evasion"
                  name="fareEvasion"
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
            )}
            {activeTags.covidRelated && (
              <Col span={12}>
                <Form.Item
                  label="Covid-related"
                  name="covidRelated"
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
            )}
          </Row>

          {areas.length === 0 && (
            <Form.Item label="Default User Group" name="defaultUserGroup">
              <Select
                mode="multiple"
                options={groupsData?.groups.map((group) => ({
                  label: group.name,
                  value: group.id,
                }))}
                style={{ width: 200 }}
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
                        align="baseline"
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                      >
                        <Form.Item
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...restField}
                          name={[name, 'area']}
                          rules={[{ message: 'Missing Area', required: true }]}
                        >
                          <Input placeholder="" readOnly />
                        </Form.Item>
                        <Form.Item
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...restField}
                          name={[name, 'group']}
                        >
                          <Select
                            mode="multiple"
                            options={groupsData?.groups.map((group) => ({
                              label: group.name,
                              value: group.id,
                            }))}
                            style={{ width: 200 }}
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
              label="Default Offender Group"
              name="defaultOffenderGroup"
            >
              <Select
                mode="multiple"
                options={groupsData?.groups.map((group) => ({
                  label: group.name,
                  value: group.id,
                }))}
                style={{ width: 200 }}
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
                        align="baseline"
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                      >
                        <Form.Item
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...restField}
                          name={[name, 'gallery']}
                          rules={[
                            { message: 'Missing Gallery', required: true },
                          ]}
                        >
                          <Input placeholder="" readOnly />
                        </Form.Item>
                        <Form.Item
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...restField}
                          name={[name, 'group']}
                        >
                          <Select
                            mode="multiple"
                            options={groupsData?.groups.map((group) => ({
                              label: group.name,
                              value: group.id,
                            }))}
                            style={{ width: 200 }}
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
        groupsData={groupsData}
        newOffenders={newOffenders}
        onAdd={() => {}}
        onUpdateOffender={onUpdateOffender}
      />
    )}

    {currentStep === 5 && (
      <NewIncidentTable
        groupsData={groupsData}
        newBusinesses={newBusinesses}
        newIncidents={newIncidents}
        newOffenders={newOffenders}
        newUsers={newUsers}
        onAdd={() => {}}
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
                dataIndex: 'id',
                key: 'id',
                title: 'ID',
              },
              {
                dataIndex: 'firstName',
                key: 'firstName',
                title: 'firstName',
              },
              {
                dataIndex: 'lastName',
                key: 'lastName',
                title: 'lastName',
              },
              {
                dataIndex: 'email',
                key: 'email',
                title: 'email',
              },
              {
                dataIndex: 'organisation',
                key: 'organisation',
                title: 'organisation',
              },
              {
                dataIndex: 'placeOfWork',
                key: 'placeOfWork',
                title: 'placeOfWork',
              },
              {
                dataIndex: 'premises',
                key: 'premises',
                title: 'premises',
              },
              {
                dataIndex: 'categories',
                key: 'categories',
                title: 'categories',
              },
              {
                dataIndex: 'lastSignedIn',
                key: 'lastSignedIn',
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
      onClose={toggleKnownSubjectModal}
      open={knownSubjectModalOpen}
      title="DISC Known Subject"
      width="95vw"
    >
      {knownSubjectModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<KnownSubject>
            columns={[
              {
                dataIndex: 'workspaceId',
                key: 'workspaceId',
                title: 'Workspace ID',
              },
              {
                dataIndex: 'workspaceName',
                key: 'workspaceName',
                title: 'Workspace Name',
              },
              {
                dataIndex: 'memberEmail',
                key: 'memberEmail',
                title: 'Email',
              },
              {
                dataIndex: 'id',
                key: 'id',
                title: 'ID',
              },
              {
                dataIndex: 'firstName',
                key: 'firstName',
                title: 'First Name',
              },
              {
                dataIndex: 'lastName',
                key: 'lastName',
                title: 'Last Name',
              },
              {
                dataIndex: 'nicknames',
                key: 'nicknames',
                title: 'Nicknames',
              },
              {
                dataIndex: 'gender',
                key: 'gender',
                title: 'Gender',
              },
              {
                dataIndex: 'dateOfBirth',
                key: 'dateOfBirth',
                title: 'DOB',
              },
              {
                dataIndex: 'prohibitions',
                key: 'prohibitions',
                title: 'Prohibitions',
              },
              {
                dataIndex: 'icCodes',
                key: 'icCodes',
                title: 'IC Codes',
              },
              {
                dataIndex: 'ageRange',
                key: 'ageRange',
                title: 'Age Range',
              },
              {
                dataIndex: 'height',
                key: 'height',
                title: 'Height',
              },
              {
                dataIndex: 'build',
                key: 'build',
                title: 'Build',
              },
              {
                dataIndex: 'distinguishingFeatures',
                key: 'distinguishingFeatures',
                title: 'Distinguishing Features',
              },
              {
                dataIndex: 'comments',
                key: 'comments',
                title: 'Comments',
              },
              {
                dataIndex: 'address',
                key: 'address',
                title: 'Address',
              },
              {
                dataIndex: 'postcode',
                key: 'postcode',
                title: 'Postcode',
              },
              {
                dataIndex: 'incidentCount',
                key: 'incidentCount',
                title: 'Incident Count',
              },
              {
                dataIndex: 'dateAdded',
                key: 'dateAdded',
                title: 'Date Added',
              },
              {
                dataIndex: 'databaseDeletionDate',
                key: 'databaseDeletionDate',
                title: 'Database Deletion Date',
              },
              {
                dataIndex: 'galleryStatus',
                key: 'galleryStatus',
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
      onClose={toggleIdSoughtModal}
      open={idSoughtModalOpen}
      title="DISC ID Sought"
      width="95vw"
    >
      {idSoughtModalOpen && (
        <div style={{ overflowX: 'scroll' }}>
          <Table<IDSought>
            columns={[
              {
                dataIndex: 'workspaceId',
                key: 'workspaceId',
                title: 'Workspace ID',
              },
              {
                dataIndex: 'workspaceName',
                key: 'workspaceName',
                title: 'Workspace Name',
              },
              {
                dataIndex: 'memberEmail',
                key: 'memberEmail',
                title: 'Email',
              },
              {
                dataIndex: 'id',
                key: 'id',
                title: 'ID',
              },
              {
                dataIndex: 'firstName',
                key: 'firstName',
                title: 'First Name',
              },
              {
                dataIndex: 'lastName',
                key: 'lastName',
                title: 'Last Name',
              },
              {
                dataIndex: 'nicknames',
                key: 'nicknames',
                title: 'Nicknames',
              },
              {
                dataIndex: 'gender',
                key: 'gender',
                title: 'Gender',
              },
              {
                dataIndex: 'dateOfBirth',
                key: 'dateOfBirth',
                title: 'DOB',
              },
              {
                dataIndex: 'prohibitions',
                key: 'prohibitions',
                title: 'Prohibitions',
              },
              {
                dataIndex: 'icCodes',
                key: 'icCodes',
                title: 'IC Codes',
              },
              {
                dataIndex: 'ageRange',
                key: 'ageRange',
                title: 'Age Range',
              },
              {
                dataIndex: 'height',
                key: 'height',
                title: 'Height',
              },
              {
                dataIndex: 'build',
                key: 'build',
                title: 'Build',
              },
              {
                dataIndex: 'distinguishingFeatures',
                key: 'distinguishingFeatures',
                title: 'Distinguishing Features',
              },
              {
                dataIndex: 'comments',
                key: 'comments',
                title: 'Comments',
              },
              {
                dataIndex: 'address',
                key: 'address',
                title: 'Address',
              },
              {
                dataIndex: 'postcode',
                key: 'postcode',
                title: 'Postcode',
              },
              {
                dataIndex: 'incidentCount',
                key: 'incidentCount',
                title: 'Incident Count',
              },
              {
                dataIndex: 'dateAdded',
                key: 'dateAdded',
                title: 'Date Added',
              },
              {
                dataIndex: 'databaseDeletionDate',
                key: 'databaseDeletionDate',
                title: 'Database Deletion Date',
              },
              {
                dataIndex: 'galleryStatus',
                key: 'galleryStatus',
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
                dataIndex: 'workspaceName',
                key: 'workspaceName',
                title: 'Workspace Name',
              },
              {
                dataIndex: 'id',
                key: 'id',
                title: 'ID',
              },
              {
                dataIndex: 'date',
                key: 'date',
                title: 'Date',
              },
              {
                dataIndex: 'dateTime',
                key: 'dateTime',
                title: 'Date Time',
              },
              {
                dataIndex: 'summary',
                key: 'summary',
                title: 'Summary',
              },
              {
                dataIndex: 'description',
                key: 'description',
                title: 'Description',
              },
              {
                dataIndex: 'policeContacted',
                key: 'policeContacted',
                title: 'Police Contacted',
              },
              {
                dataIndex: 'sentToEmails',
                key: 'sentToEmails',
                title: 'Sent To Emails',
              },
              {
                dataIndex: 'crimeReportStatus',
                key: 'crimeReportStatus',
                title: 'Crime Report Status',
              },
              {
                dataIndex: 'internalReference',
                key: 'internalReference',
                title: 'Internal Reference',
              },
              {
                dataIndex: 'vehicleDescriptions',
                key: 'vehicleDescriptions',
                title: 'Vehicle Descriptions',
              },
              {
                dataIndex: 'vehicleRegistrations',
                key: 'vehicleRegistrations',
                title: 'Vehicle Registrations',
              },
              {
                dataIndex: 'fraudInvolved',
                key: 'fraudInvolved',
                title: 'Fraud Involved',
              },
              {
                dataIndex: 'outcome',
                key: 'outcome',
                title: 'Outcome',
              },
              {
                dataIndex: 'otherOutcome',
                key: 'otherOutcome',
                title: 'Other Outcome',
              },
              {
                dataIndex: 'drinkInvolved',
                key: 'drinkInvolved',
                title: 'Drink Involved',
              },
              {
                dataIndex: 'drugsInvolved',
                key: 'drugsInvolved',
                title: 'Drugs Involved',
              },
              {
                dataIndex: 'dealingInvolved',
                key: 'dealingInvolved',
                title: 'Dealing Involved',
              },
              {
                dataIndex: 'weaponInvolved',
                key: 'weaponInvolved',
                title: 'Weapon Involved',
              },
              {
                dataIndex: 'groupInvolved',
                key: 'groupInvolved',
                title: 'Group Involved',
              },
              {
                dataIndex: 'violenceInvolved',
                key: 'violenceInvolved',
                title: 'Violence Involved',
              },
              {
                dataIndex: 'verbalAbuseInvolved',
                key: 'verbalAbuseInvolved',
                title: 'Verbal Abuse Involved',
              },
              {
                dataIndex: 'lossValue',
                key: 'lossValue',
                title: 'Loss Value',
              },
              {
                dataIndex: 'lossRecovered',
                key: 'lossRecovered',
                title: 'Description',
              },
              {
                dataIndex: 'policeReference',
                key: 'policeReference',
                title: 'Police Reference',
              },
              {
                dataIndex: 'address',
                key: 'address',
                title: 'Address',
              },
              {
                dataIndex: 'postcode',
                key: 'postcode',
                title: 'Postcode',
              },
              {
                dataIndex: 'memberId',
                key: 'memberId',
                title: 'Member ID',
              },
              {
                dataIndex: 'memberName',
                key: 'memberName',
                title: 'Member Name',
              },
              {
                dataIndex: 'memberEmail',
                key: 'memberEmail',
                title: 'Member Email',
              },
              {
                dataIndex: 'locationName',
                key: 'locationName',
                title: 'Location Name',
              },
              {
                dataIndex: 'premises',
                key: 'premises',
                title: 'Premises',
              },
              {
                dataIndex: 'typeOfOffence',
                key: 'typeOfOffence',
                title: 'Type Of Offence',
              },
              {
                dataIndex: 'assaultViolenceAffray',
                key: 'assaultViolenceAffray',
                title: 'Assault Violence Affray',
              },
              {
                dataIndex: 'beggingPersistent',
                key: 'beggingPersistent',
                title: 'Begging Persistent',
              },
              {
                dataIndex: 'begging',
                key: 'begging',
                title: 'Begging',
              },
              {
                dataIndex: 'criminalDamageGraffitiVandalism',
                key: 'criminalDamageGraffitiVandalism',
                title: 'Description',
              },
              {
                dataIndex: 'possessionWithIntentToSupplyDrugs',
                key: 'possessionWithIntentToSupplyDrugs',
                title: 'Possession With Intent To Supply Drugs',
              },
              {
                dataIndex: 'harassmentThreateningBehaviour',
                key: 'harassmentThreateningBehaviour',
                title: 'Harassment Threatening Behaviour',
              },
              {
                dataIndex: 'joyRiding',
                key: 'joyRiding',
                title: 'Joy Riding',
              },
              {
                dataIndex: 'kerbCrawling',
                key: 'kerbCrawling',
                title: 'Kerb Crawling',
              },
              {
                dataIndex: 'noiseNuisance',
                key: 'noiseNuisance',
                title: 'Noise Nuisance',
              },
              {
                dataIndex: 'inappropriateSexualContact',
                key: 'inappropriateSexualContact',
                title: 'Inappropriate Sexual Contact',
              },
              {
                dataIndex: 'racialAbuse',
                key: 'racialAbuse',
                title: 'Racial Abuse',
              },
              {
                dataIndex: 'smokingUnderageOrInProhibitedArea',
                key: 'smokingUnderageOrInProhibitedArea',
                title: 'Smoking Underage Or In Prohibited Area',
              },
              {
                dataIndex: 'streetDrinking',
                key: 'streetDrinking',
                title: 'Street Drinking',
              },
              {
                dataIndex: 'possessionOfDrugs',
                key: 'possessionOfDrugs',
                title: 'Possession Of Drugs',
              },
              {
                dataIndex: 'theft',
                key: 'theft',
                title: 'Theft',
              },
              {
                dataIndex: 'verbalAbuse',
                key: 'verbalAbuse',
                title: 'Verbal Abuse',
              },
              {
                dataIndex: 'beingOnPremisesWhilstBanned',
                key: 'beingOnPremisesWhilstBanned',
                title: 'Being On Premises Whilst Banned',
              },
              {
                dataIndex: 'breachOfSection35Order',
                key: 'breachOfSection35Order',
                title: 'Breach Of Section 35 Order',
              },
              {
                dataIndex: 'other',
                key: 'other',
                title: 'Other',
              },
              {
                dataIndex: 'unlicensedTaxiCab',
                key: 'unlicensedTaxiCab',
                title: 'Unlicensed Taxi Cab',
              },
              {
                dataIndex: 'unlicensedStreetTrading',
                key: 'unlicensedStreetTrading',
                title: 'Unlicensed Street Trading',
              },
              {
                dataIndex: 'misuseOfID',
                key: 'misuseOfID',
                title: 'Misuse Of ID',
              },
              {
                dataIndex: 'underageIntoxication',
                key: 'underageIntoxication',
                title: 'Underage Intoxication',
              },
              {
                dataIndex: 'goingEquippedToSteal',
                key: 'goingEquippedToSteal',
                title: 'Going Equipped To Steal',
              },
              {
                dataIndex: 'hateCrime',
                key: 'hateCrime',
                title: 'Hate Crime',
              },
              {
                dataIndex: 'roughSleeping',
                key: 'roughSleeping',
                title: 'Rough Sleeping',
              },
              {
                dataIndex: 'breachOfBan',
                key: 'breachOfBan',
                title: 'Breach Of Ban',
              },
              {
                dataIndex: 'drunkenDisorderlyBehaviour',
                key: 'drunkenDisorderlyBehaviour',
                title: 'Drunken Disorderly Behaviour',
              },
              {
                dataIndex: 'possessionOfAnOffensiveWeapon',
                key: 'possessionOfAnOffensiveWeapon',
                title: 'Possession Of An Offensive Weapon',
              },
              {
                dataIndex: 'attemptedTheft',
                key: 'attemptedTheft',
                title: 'Attempted Theft',
              },
              {
                dataIndex: 'illegalGambling',
                key: 'illegalGambling',
                title: 'Illegal Gambling',
              },
              {
                dataIndex: 'robbery',
                key: 'robbery',
                title: 'Robbery',
              },
              {
                dataIndex: 'section35Issued',
                key: 'section35Issued',
                title: 'Section 35 Issued',
              },
              {
                dataIndex: 'breachPoliceBail',
                key: 'breachPoliceBail',
                title: 'Breach PoliceBail',
              },
              {
                dataIndex: 'otherAlcoholDrugRelated',
                key: 'otherAlcoholDrugRelated',
                title: 'Other Alcohol Drug Related',
              },
              {
                dataIndex: 'otherAntiSocialBehaviour',
                key: 'otherAntiSocialBehaviour',
                title: 'Other Anti Social Behaviour',
              },
              {
                dataIndex: 'otherTheftFraud',
                key: 'otherTheftFraud',
                title: 'Other Theft Fraud',
              },
              {
                dataIndex: 'otherViolentOffensiveBehaviour',
                key: 'otherViolentOffensiveBehaviour',
                title: 'Other Violent Offensive Behaviour',
              },
              {
                dataIndex: 'otherBreachBan',
                key: 'otherBreachBan',
                title: 'Other Breach Ban',
              },
              {
                dataIndex: 'fareEvasion',
                key: 'fareEvasion',
                title: 'Fare Evasion',
              },
              {
                dataIndex: 'covidRelated',
                key: 'covidRelated',
                title: 'COVID Related',
              },
              {
                dataIndex: 'subjectID',
                key: 'subjectID',
                title: 'Subject ID',
              },
              {
                dataIndex: 'subjectFirstName',
                key: 'subjectFirstName',
                title: 'Subject First Name',
              },
              {
                dataIndex: 'subjectLastName',
                key: 'subjectLastName',
                title: 'Subject Last Name',
              },
              {
                dataIndex: 'subjectDOB',
                key: 'subjectDOB',
                title: 'Subject DOB',
              },
              {
                dataIndex: 'subjectGender',
                key: 'subjectGender',
                title: 'Subject Gender',
              },
              {
                dataIndex: 'subjectProhibitions',
                key: 'subjectProhibitions',
                title: 'Subject Prohibitions',
              },
              {
                dataIndex: 'subjectDeletionDate',
                key: 'subjectDeletionDate',
                title: 'Subject Deletion Date',
              },
              {
                dataIndex: 'subjectID1',
                key: 'subjectID1',
                title: 'Subject 1 ID',
              },
              {
                dataIndex: 'subjectFirstName1',
                key: 'subjectFirstName1',
                title: 'Subject 1 FirstName',
              },
              {
                dataIndex: 'subjectLastName1',
                key: 'subjectLastName1',
                title: 'Subject 1 Last Name',
              },
              {
                dataIndex: 'subjectDOB1',
                key: 'subjectDOB1',
                title: 'Subject 1 DOB',
              },
              {
                dataIndex: 'subjectGender1',
                key: 'subjectGender1',
                title: 'Subject 1 Gender',
              },
              {
                dataIndex: 'subjectProhibitions1',
                key: 'subjectProhibitions1',
                title: 'Subject 1 Prohibitions',
              },
              {
                dataIndex: 'subjectDeletionDate1',
                key: 'subjectDeletionDate1',
                title: 'Subject 1 Deletion Date',
              },
              {
                dataIndex: 'subjectID2',
                key: 'subjectID2',
                title: 'Subject 2 ID',
              },
              {
                dataIndex: 'subjectFirstName2',
                key: 'subjectFirstName2',
                title: 'Subject 2 First Name',
              },
              {
                dataIndex: 'subjectLastName2',
                key: 'subjectLastName2',
                title: 'Subject 2 Last Name',
              },
              {
                dataIndex: 'subjectDOB2',
                key: 'subjectDOB2',
                title: 'Subject 2 DOB',
              },
              {
                dataIndex: 'subjectGender2',
                key: 'subjectGender2',
                title: 'Subject 2 Gender',
              },
              {
                dataIndex: 'subjectProhibitions2',
                key: 'subjectProhibitions2',
                title: 'Subject 2 Prohibitions',
              },
              {
                dataIndex: 'subjectDeletionDate2',
                key: 'subjectDeletionDate2',
                title: 'Subject 2 Deletion Date',
              },
              {
                dataIndex: 'subjectID3',
                key: 'subjectID3',
                title: 'Subject 3 ID',
              },
              {
                dataIndex: 'subjectFirstName3',
                key: 'subjectFirstName3',
                title: 'Subject 3 First Name',
              },
              {
                dataIndex: 'subjectLastName3',
                key: 'subjectLastName3',
                title: 'Subject 3 Last Name',
              },
              {
                dataIndex: 'subjectGender3',
                key: 'subjectGender3',
                title: 'Subject 3 Gender',
              },
              {
                dataIndex: 'subjectProhibitions3',
                key: 'subjectProhibitions3',
                title: 'Subject 3 Prohibitions',
              },
              {
                dataIndex: 'subjectDeletionDate3',
                key: 'subjectDeletionDate3',
                title: 'Subject 3 Deletion Date',
              },
              {
                dataIndex: 'subjectID4',
                key: 'subjectID4',
                title: 'Subject 4 ID',
              },
              {
                dataIndex: 'subjectFirstName4',
                key: 'subjectFirstName4',
                title: 'Subject 4 First Name',
              },
              {
                dataIndex: 'subjectLastName4',
                key: 'subjectLastName4',
                title: 'Subject 4 Last Name',
              },
              {
                dataIndex: 'subjectDOB4',
                key: 'subjectDOB4',
                title: 'Subject 4 DOB',
              },
              {
                dataIndex: 'subjectGender4',
                key: 'subjectGender4',
                title: 'Subject 4 Gender',
              },
              {
                dataIndex: 'subjectProhibitions4',
                key: 'subjectProhibitions4',
                title: 'Subject 4 Prohibitions',
              },
              {
                dataIndex: 'subjectDeletionDate4',
                key: 'subjectDeletionDate4',
                title: 'Subject 4 Deletion Date',
              },
              {
                dataIndex: 'subjectID5',
                key: 'subjectID5',
                title: 'Subject 5 ID',
              },
              {
                dataIndex: 'subjectFirstName5',
                key: 'subjectFirstName5',
                title: 'Subject 5 First Name',
              },
              {
                dataIndex: 'subjectLastName5',
                key: 'subjectLastName5',
                title: 'Subject 5 Last Name',
              },
              {
                dataIndex: 'subjectDOB5',
                key: 'subjectDOB5',
                title: 'Subject 5 DOB',
              },
              {
                dataIndex: 'subjectGender5',
                key: 'subjectGender5',
                title: 'Subject 5 Gender',
              },
              {
                dataIndex: 'subjectProhibitions5',
                key: 'subjectProhibitions5',
                title: 'Subject 5 Prohibitions',
              },
              {
                dataIndex: 'subjectDeletionDate5',
                key: 'subjectDeletionDate5',
                title: 'Subject 5 Deletion Date',
              },
              {
                dataIndex: 'subjectID6',
                key: 'subjectID6',
                title: 'Subject 6 ID',
              },
              {
                dataIndex: 'subjectFirstName6',
                key: 'subjectFirstName6',
                title: 'Subject 6 First Name',
              },
              {
                dataIndex: 'subjectLastName6',
                key: 'subjectLastName6',
                title: 'Subject 6 Last Name',
              },
              {
                dataIndex: 'subjectDOB6',
                key: 'subjectDOB6',
                title: 'Subject 6 DOB',
              },
              {
                dataIndex: 'subjectGender6',
                key: 'subjectGender6',
                title: 'Subject 6 Gender',
              },
              {
                dataIndex: 'subjectProhibitions6',
                key: 'subjectProhibitions6',
                title: 'Subject 6 Prohibitions',
              },
              {
                dataIndex: 'subjectDeletionDate6',
                key: 'subjectDeletionDate6',
                title: 'Subject 6 Deletion Date',
              },
              {
                dataIndex: 'incidentNotes',
                key: 'incidentNotes',
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
