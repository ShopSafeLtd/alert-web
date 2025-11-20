/* eslint-disable formatjs/no-literal-string-in-jsx */
import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { faEdit } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Divider,
  PageHeader,
  Row,
  Space,
  Typography,
} from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useReactToPrint } from 'react-to-print';

import type { ActiveChecklistSection } from '../active-checklist/useActiveChecklist';

interface QuestionWeight {
  additionalInfo: string;
  answer: string;
  flagged: boolean;
  id: string;
  images: {
    name: string;
    url: string;
  }[];
  maxWeight: number;
  na: boolean;
  question: string;
  section: number;
  subsection: number;
  type: string;
  weight: number;
}
const flaggedArray = new Set(['FAIL', 'NO', 'FALSE']);
const successArray = new Set(['PASS', 'YES', 'TRUE']);
const indexToLetter = (num: number) => (num + 10).toString(36).toUpperCase();

const CompletedChecklistView = ({
  additionalInfo,
  checklistId,
  checklistSections,
  completedAt,
  completedByUser,
  generating = false,
  onBack = () => {},
  signature,
  theme = 'dark',
  title,
}: {
  additionalInfo: string;
  checklistId?: string;
  checklistSections: ActiveChecklistSection[];
  completedAt: string;
  completedByUser: string;
  generating?: boolean;
  onBack?: () => void;
  signature: string;
  theme?: 'dark' | 'light';
  title: string;
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const questions: QuestionWeight[] = [];
  const images: {
    name: string;
    qId: string;
    url: string;
  }[] = [];

  let total = 0;
  let maxTotal = 0;
  const sectionTotals: {
    flaggedNos: number;
    maxTotal: number;
    section: number;
    title: string;
    total: number;
  }[] = [];
  const subsectionTotals: {
    flaggedNos: number;
    maxTotal: number;
    section: number;
    subsection: number;
    title: string;
    total: number;
  }[] = [];

  for (const section of checklistSections.filter((s) => !s.sub)) {
    // Check if the section has a dependsOnWeight property
    if (section.dependsOnWeight) {
      // Find the dependent section
      const dependentSection = checklistSections.find(
        (s) =>
          s.section ===
          Number.parseInt(section.dependsOnWeight?.dependsOn || '0')
      );

      if (dependentSection) {
        // Calculate the total weight of the dependent section
        let dependentWeight = 0;
        for (const subsection of dependentSection.subsections) {
          for (const question of subsection.questions) {
            const weight =
              question.weights.find((w) => w.answer === question.answer)
                ?.weight || 0;
            dependentWeight += weight;
          }
        }

        // If the dependent weight is less than the required weight, skip this section and its subsections
        if (dependentWeight < Number.parseInt(section.dependsOnWeight.weight)) {
          continue;
        }
      }
    }

    // Process the section and its subsections
    section.subsections.flatMap((subsection) =>
      subsection.questions.flatMap((question) => {
        const questionImages =
          question.images
            ?.map((image) => image.url)
            .map((image, index) => ({
              name: `Photo ${index + 1}`,
              qId: question.id,
              url: image || '',
            })) || [];
        images.push(...questionImages);
        const questionFormatted = {
          additionalInfo: question.additionalComments || '',
          answer: question.answer || '',
          flagged: question.answer === 'FAIL',
          id: question.id,
          images: [...questionImages],
          maxWeight:
            question.weights.sort((a, b) => b.weight - a.weight)[0]?.weight ||
            0,
          na: question.answer === 'N/A',
          question: `${indexToLetter(question.order - 1)}) ${question.question.en}`,
          section: section.section,
          subsection: subsection.subsection || 0,
          type: question.type,
          weight:
            question.weights.find((weight) => weight.answer === question.answer)
              ?.weight || 0,
        };
        questions.push(questionFormatted);

        if (!questionFormatted.na) {
          total += questionFormatted.weight;
          maxTotal += questionFormatted.maxWeight;
          const sectionIndex = sectionTotals.findIndex(
            (sectionTotal) => sectionTotal.section === section.section
          );
          if (sectionIndex === -1)
            sectionTotals.push({
              flaggedNos: question.answer === 'FAIL' ? 1 : 0,
              maxTotal: questionFormatted.maxWeight,
              section: section.section,
              title: section.titleLocaled || '',
              total: questionFormatted.weight,
            });
          else {
            sectionTotals[sectionIndex].total += questionFormatted.weight;
            sectionTotals[sectionIndex].maxTotal += questionFormatted.maxWeight;
            if (question.answer === 'FAIL')
              sectionTotals[sectionIndex].flaggedNos += 1;
          }
          const subsectionIndex = subsectionTotals.findIndex(
            (subsectionTotal) =>
              subsectionTotal.section === section.section &&
              subsectionTotal.subsection === subsection.subsection
          );
          if (subsectionIndex === -1)
            subsectionTotals.push({
              flaggedNos: question.answer === 'FAIL' ? 1 : 0,
              maxTotal: questionFormatted.maxWeight,
              section: section.section,
              subsection: subsection.subsection || 0,
              title: subsection.titleLocaled || '',
              total: questionFormatted.weight,
            });
          else {
            subsectionTotals[subsectionIndex].total += questionFormatted.weight;
            subsectionTotals[subsectionIndex].maxTotal +=
              questionFormatted.maxWeight;
            if (question.answer === 'FAIL')
              subsectionTotals[subsectionIndex].flaggedNos += 1;
          }
        }
        return questionFormatted;
      })
    );
  }
  const flagged = questions.filter((question) => question.flagged);
  const imagesFormatted = images.map((image, index) => ({
    name: `Photo ${index + 1}`,
    qId: image.qId,
    url: image.url,
  }));

  const [isPrinting, setIsPrinting] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const promiseResolveRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again

      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
    onBeforeGetContent: () =>
      new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
    pageStyle:
      '@page { size: A4; margin:10mm !important; } @media print { body { -webkit-print-color-adjust: exact; } }',
  });

  const percentage = Math.round((total / maxTotal) * 100);

  if (generating)
    return (
      <div className="page" ref={componentRef}>
        <Typography.Title level={2}>{title}</Typography.Title>
        <Row
          style={{
            alignItems: 'center',
            backgroundColor:
              theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
            marginBottom: 10,
            padding: 10,
            paddingLeft: 5,
            textAlign: 'center',
          }}
        >
          <Space>
            <Typography.Title
              level={3}
              style={{
                margin: 0,
                textAlign: 'center',
              }}
            >
              Score:
            </Typography.Title>
            <Typography.Title
              level={3}
              style={{ margin: 0, textAlign: 'center' }}
            >
              {total}/{maxTotal} ({Number.isNaN(percentage) ? 0 : percentage}
              %)
            </Typography.Title>
          </Space>

          <Col flex={1} />
          <Space>
            <Typography.Title
              level={3}
              style={{
                margin: 0,
                textAlign: 'center',
              }}
            >
              Flagged Items:
            </Typography.Title>{' '}
            <Typography.Title
              level={3}
              style={{
                margin: 0,
                textAlign: 'center',
              }}
            >
              {flagged.length}
            </Typography.Title>
          </Space>
        </Row>
        {flagged.length > 0 && (
          <>
            <Row
              style={{
                alignItems: 'center',
                backgroundColor:
                  theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                marginBottom: 10,
                padding: 10,
                paddingLeft: 5,
                textAlign: 'center',
              }}
            >
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                Flagged Items:
              </Typography.Title>
              <Col flex={1} />
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {flagged.length} flagged
              </Typography.Title>
            </Row>
            <div>
              {flagged.map((question) => (
                <Row>
                  <Col span={24}>
                    <Typography.Text>
                      {
                        sectionTotals.find(
                          (sectionTotal) =>
                            sectionTotal.section === question.section
                        )?.title
                      }{' '}
                      / {question.subsection}.{' '}
                      {
                        subsectionTotals.find(
                          (subsectionTotal) =>
                            subsectionTotal.section === question.section &&
                            subsectionTotal.subsection === question.subsection
                        )?.title
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18} style={{ alignSelf: 'center' }}>
                    <Typography.Text strong>
                      {' '}
                      {question.question}
                    </Typography.Text>
                  </Col>
                  <Col
                    span={6}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: 5,
                      textAlign: 'center',
                    }}
                  >
                    {question.answer}
                  </Col>
                  <Space direction="vertical">
                    <Col span={24}>
                      <Typography.Text type="secondary">
                        {question.additionalInfo}
                      </Typography.Text>
                    </Col>
                    <Col
                      span={24}
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      }}
                    >
                      {imagesFormatted
                        .filter((image) => image.qId === question.id)
                        ?.map((image) => (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              padding: 5,
                            }}
                          >
                            <img
                              alt={image.name}
                              height={150}
                              src={image.url}
                              style={{
                                objectFit: 'contain',
                              }}
                              width={150}
                            />
                            <Typography.Text type="secondary">
                              {image.name}
                            </Typography.Text>
                          </div>
                        ))}
                    </Col>
                  </Space>
                  <Divider />
                </Row>
              ))}
            </div>
          </>
        )}
        {sectionTotals.map((sectionTotal) => (
          <div>
            <Row
              style={{
                alignItems: 'center',
                backgroundColor:
                  theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                marginBottom: 10,
                padding: 10,
                paddingLeft: 5,
                textAlign: 'center',
              }}
            >
              <Typography.Title
                level={3}
                style={{ margin: 0, textAlign: 'center' }}
              >
                {sectionTotal.title}
              </Typography.Title>
              <Col flex={1} />
              <div>
                <Space>
                  {' '}
                  {sectionTotal.flaggedNos > 0 && (
                    <Typography.Text strong type="danger">
                      ({sectionTotal.flaggedNos} Flagged)
                    </Typography.Text>
                  )}
                  <Typography.Text strong>
                    {sectionTotal.total}/{sectionTotal.maxTotal} (
                    {sectionTotal.maxTotal === 0 && sectionTotal.total === 0
                      ? '0'
                      : Math.round(
                          (sectionTotal.total / sectionTotal.maxTotal) * 100
                        )}
                    %)
                  </Typography.Text>
                </Space>
              </div>
            </Row>

            {subsectionTotals.some(
              (subsectionTotal) =>
                subsectionTotal.section === sectionTotal.section
            ) && (
              <div>
                {subsectionTotals
                  .filter(
                    (subsectionTotal) =>
                      subsectionTotal.section === sectionTotal.section
                  )
                  .map((subsectionTotal, index) => (
                    <div>
                      <Row
                        style={{
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <Typography.Title level={3}>
                          {index + 1}. {subsectionTotal.title}{' '}
                        </Typography.Title>
                        <Col flex={1} />
                        <div>
                          <Space>
                            {subsectionTotal.flaggedNos > 0 && (
                              <Typography.Text strong type="danger">
                                ({subsectionTotal.flaggedNos} Flagged)
                              </Typography.Text>
                            )}
                            <Typography.Text type="secondary">
                              {subsectionTotal.total}/{subsectionTotal.maxTotal}{' '}
                              (
                              {subsectionTotal.maxTotal === 0 &&
                              subsectionTotal.total === 0
                                ? '0'
                                : Math.round(
                                    (subsectionTotal.total /
                                      subsectionTotal.maxTotal) *
                                      100
                                  )}
                              %)
                            </Typography.Text>
                          </Space>
                        </div>
                      </Row>
                      <Divider style={{ margin: 12 }} />

                      {questions.some(
                        (question) =>
                          question.section === sectionTotal.section &&
                          question.subsection === subsectionTotal.subsection
                      ) && (
                        <div>
                          {questions
                            .filter(
                              (question) =>
                                question.section === sectionTotal.section &&
                                question.subsection ===
                                  subsectionTotal.subsection
                            )
                            .map((question) => (
                              <Row>
                                <Col span={18}>
                                  <Typography.Text strong>
                                    {question.question}
                                  </Typography.Text>
                                </Col>
                                <Col
                                  span={6}
                                  style={{
                                    backgroundColor: flaggedArray.has(
                                      question.answer
                                    )
                                      ? 'red'
                                      : successArray.has(question.answer)
                                        ? 'green'
                                        : question.answer === 'N/A'
                                          ? 'lightBlue'
                                          : undefined,
                                    color:
                                      flaggedArray.has(question.answer) ||
                                      successArray.has(question.answer) ||
                                      question.answer === 'N/A'
                                        ? 'white'
                                        : 'black',
                                    padding: 5,
                                    textAlign: 'center',
                                  }}
                                >
                                  {question.type === 'TEXT' ? (
                                    <Typography.Text type="secondary">
                                      {question.answer}
                                    </Typography.Text>
                                  ) : question.type === 'MEDIA' ? (
                                    <a
                                      href={question.answer}
                                      rel="noopener noreferrer"
                                      style={{
                                        color: 'red',
                                        display: 'inline-block',
                                        maxWidth: '100%',
                                        wordBreak: 'break-all',
                                      }}
                                      target="_blank"
                                    >
                                      {question.answer}
                                    </a>
                                  ) : (
                                    question.answer
                                  )}
                                </Col>
                                <Space direction="vertical">
                                  <Col span={24}>
                                    <Typography.Text type="secondary">
                                      {question.additionalInfo}
                                    </Typography.Text>
                                  </Col>
                                  <Col
                                    span={24}
                                    style={{
                                      alignItems: 'center',
                                      display: 'flex',
                                      flexDirection: 'row',
                                      flexWrap: 'wrap',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    {imagesFormatted
                                      .filter(
                                        (image) => image.qId === question.id
                                      )
                                      ?.map((image) => (
                                        <div
                                          style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: 5,
                                          }}
                                        >
                                          <img
                                            alt={image.name}
                                            height={150}
                                            src={image.url}
                                            style={{ objectFit: 'contain' }}
                                            width={150}
                                          />
                                          <Typography.Text type="secondary">
                                            {image.name}
                                          </Typography.Text>
                                        </div>
                                      ))}
                                  </Col>
                                </Space>
                                <Divider style={{ margin: 12 }} />
                              </Row>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
            <Divider />
          </div>
        ))}
        <div>
          <Row
            style={{
              alignItems: 'center',
              backgroundColor:
                theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
              marginBottom: 10,
              padding: 10,
              paddingLeft: 5,
              textAlign: 'center',
            }}
          >
            <Typography.Title
              level={3}
              style={{ margin: 0, textAlign: 'center' }}
            >
              Completion
            </Typography.Title>
            <Col flex={1} />
          </Row>
          <Row>
            <Col span={24}>
              <Typography.Text strong>Completed By </Typography.Text>
            </Col>
            <Col>
              {signature && signature.startsWith('data:image') ? (
                <img
                  alt="Completed By Signature"
                  src={signature}
                  style={{ maxHeight: 120, maxWidth: 400 }}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: signature }} />
              )}
            </Col>
            <Col>
              <Space direction="vertical">
                <Typography.Text type="secondary">
                  {completedByUser}
                </Typography.Text>{' '}
                <Typography.Text type="secondary">
                  {completedAt}
                </Typography.Text>
              </Space>
            </Col>
          </Row>
          <Divider style={{ margin: 12 }} />
          <Row>
            <Col span={24}>
              <Typography.Text strong>Additional Comments </Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Text type="secondary">
                {additionalInfo}
              </Typography.Text>
            </Col>
          </Row>
        </div>
      </div>
    );
  return (
    <div style={{ marginLeft: 50, marginRight: 50, marginTop: 30 }}>
      <Row gutter={[8, 8]} style={{ marginBottom: 10 }}>
        <PageHeader
          extra={[
            <>
              <Col flex={1} />
              {checklistId && (
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Edit,
                    model: PermissionModel.Checklist,
                  }}
                  unauthorizedElement={<div />}
                >
                  <Button
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    onClick={() =>
                      navigate(
                        `/app/checklists/active/${checklistId}?edit=true`
                      )
                    }
                    style={{ marginRight: 8 }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Edit',
                    })}
                  </Button>
                </PermissionCheckWrapper>
              )}
              <Button onClick={() => handlePrint()} type="primary">
                {intl.formatMessage({
                  defaultMessage: 'Print',
                })}
              </Button>
            </>,
          ]}
          onBack={onBack}
          style={{ paddingLeft: 0, paddingRight: 0, width: '100%' }}
          title={intl.formatMessage({
            defaultMessage: 'Checklists',
          })}
        />
      </Row>

      <Card>
        <div ref={componentRef}>
          <Typography.Title level={2}>{title}</Typography.Title>
          <Row
            style={{
              alignItems: 'center',
              backgroundColor:
                theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
              marginBottom: 10,
              padding: 10,
              paddingLeft: 5,
              textAlign: 'center',
            }}
          >
            <Space>
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                Score:
              </Typography.Title>
              <Typography.Title
                level={3}
                style={{ margin: 0, textAlign: 'center' }}
              >
                {total}/{maxTotal} ({Number.isNaN(percentage) ? 0 : percentage}
                %)
              </Typography.Title>
            </Space>

            <Col flex={1} />
            <Space>
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                Flagged Items:
              </Typography.Title>{' '}
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {flagged.length}
              </Typography.Title>
            </Space>
          </Row>
          {flagged.length > 0 && (
            <>
              <Row
                style={{
                  alignItems: 'center',
                  backgroundColor:
                    theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                  marginBottom: 10,
                  padding: 10,
                  paddingLeft: 5,
                  textAlign: 'center',
                }}
              >
                <Typography.Title
                  level={3}
                  style={{
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  Flagged Items:
                </Typography.Title>
                <Col flex={1} />
                <Typography.Title
                  level={3}
                  style={{
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {flagged.length} flagged
                </Typography.Title>
              </Row>
              <div>
                {flagged.map((question) => (
                  <Row>
                    <Col span={24}>
                      <Typography.Text>
                        {
                          sectionTotals.find(
                            (sectionTotal) =>
                              sectionTotal.section === question.section
                          )?.title
                        }{' '}
                        / {question.subsection}.{' '}
                        {
                          subsectionTotals.find(
                            (subsectionTotal) =>
                              subsectionTotal.section === question.section &&
                              subsectionTotal.subsection === question.subsection
                          )?.title
                        }
                      </Typography.Text>
                    </Col>
                    <Col span={18} style={{ alignSelf: 'center' }}>
                      <Typography.Text strong>
                        {' '}
                        {question.question}
                      </Typography.Text>
                    </Col>
                    <Col
                      span={6}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: 5,
                        textAlign: 'center',
                      }}
                    >
                      {question.type === 'MEDIA' ? (
                        <a
                          href={question.answer}
                          rel="noopener noreferrer"
                          style={{
                            color: 'red',
                            display: 'inline-block',
                            maxWidth: '100%',
                            wordBreak: 'break-all',
                          }}
                          target="_blank"
                        >
                          {question.answer}
                        </a>
                      ) : (
                        question.answer
                      )}
                    </Col>
                    <Space direction="vertical">
                      <Col span={24}>
                        <Typography.Text type="secondary">
                          {question.additionalInfo}
                        </Typography.Text>
                      </Col>
                      <Col
                        span={24}
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                        }}
                      >
                        {imagesFormatted
                          .filter((image) => image.qId === question.id)
                          ?.map((image) => (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 5,
                              }}
                            >
                              <img
                                alt={image.name}
                                height={150}
                                src={image.url}
                                style={{
                                  objectFit: 'contain',
                                }}
                                width={150}
                              />
                              <Typography.Text type="secondary">
                                {image.name}
                              </Typography.Text>
                            </div>
                          ))}
                      </Col>
                    </Space>
                    <Divider />
                  </Row>
                ))}
              </div>
            </>
          )}
          {sectionTotals.map((sectionTotal) => (
            <div>
              <Row
                style={{
                  alignItems: 'center',
                  backgroundColor:
                    theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                  marginBottom: 10,
                  padding: 10,
                  paddingLeft: 5,
                  textAlign: 'center',
                }}
              >
                <Typography.Title
                  level={3}
                  style={{ margin: 0, textAlign: 'center' }}
                >
                  {sectionTotal.title}
                </Typography.Title>
                <Col flex={1} />
                <div>
                  <Space>
                    {' '}
                    {sectionTotal.flaggedNos > 0 && (
                      <Typography.Text strong type="danger">
                        ({sectionTotal.flaggedNos} Flagged)
                      </Typography.Text>
                    )}
                    <Typography.Text strong>
                      {sectionTotal.total}/{sectionTotal.maxTotal} (
                      {sectionTotal.maxTotal === 0 && sectionTotal.total === 0
                        ? '0'
                        : Math.round(
                            (sectionTotal.total / sectionTotal.maxTotal) * 100
                          )}
                      %)
                    </Typography.Text>
                  </Space>
                </div>
              </Row>

              {subsectionTotals.some(
                (subsectionTotal) =>
                  subsectionTotal.section === sectionTotal.section
              ) && (
                <div>
                  {subsectionTotals
                    .filter(
                      (subsectionTotal) =>
                        subsectionTotal.section === sectionTotal.section
                    )
                    .map((subsectionTotal, index) => (
                      <div>
                        <Row
                          style={{
                            alignItems: 'center',
                            textAlign: 'center',
                          }}
                        >
                          <Typography.Title level={3}>
                            {index + 1}. {subsectionTotal.title}{' '}
                          </Typography.Title>
                          <Col flex={1} />
                          <div>
                            <Space>
                              {subsectionTotal.flaggedNos > 0 && (
                                <Typography.Text strong type="danger">
                                  ({subsectionTotal.flaggedNos} Flagged)
                                </Typography.Text>
                              )}
                              <Typography.Text type="secondary">
                                {subsectionTotal.total}/
                                {subsectionTotal.maxTotal} (
                                {subsectionTotal.maxTotal === 0 &&
                                subsectionTotal.total === 0
                                  ? '0'
                                  : Math.round(
                                      (subsectionTotal.total /
                                        subsectionTotal.maxTotal) *
                                        100
                                    )}
                                %)
                              </Typography.Text>
                            </Space>
                          </div>
                        </Row>
                        <Divider style={{ margin: 12 }} />

                        {questions.some(
                          (question) =>
                            question.section === sectionTotal.section &&
                            question.subsection === subsectionTotal.subsection
                        ) && (
                          <div>
                            {questions
                              .filter(
                                (question) =>
                                  question.section === sectionTotal.section &&
                                  question.subsection ===
                                    subsectionTotal.subsection
                              )
                              .map((question) => (
                                <Row>
                                  <Col span={18}>
                                    <Typography.Text strong>
                                      {question.question}
                                    </Typography.Text>
                                  </Col>
                                  <Col
                                    span={6}
                                    style={{
                                      backgroundColor: flaggedArray.has(
                                        question.answer
                                      )
                                        ? 'red'
                                        : successArray.has(question.answer)
                                          ? 'green'
                                          : question.answer === 'N/A'
                                            ? 'lightBlue'
                                            : undefined,
                                      color:
                                        flaggedArray.has(question.answer) ||
                                        successArray.has(question.answer) ||
                                        question.answer === 'N/A'
                                          ? 'white'
                                          : 'black',
                                      padding: 5,
                                      textAlign: 'center',
                                    }}
                                  >
                                    {question.type === 'TEXT' ? (
                                      <Typography.Text type="secondary">
                                        {question.answer}
                                      </Typography.Text>
                                    ) : question.type === 'MEDIA' ? (
                                      <a
                                        href={question.answer}
                                        rel="noopener noreferrer"
                                        style={{
                                          color: 'red',
                                          display: 'inline-block',
                                          maxWidth: '100%',
                                          wordBreak: 'break-all',
                                        }}
                                        target="_blank"
                                      >
                                        {question.answer}
                                      </a>
                                    ) : (
                                      question.answer
                                    )}
                                  </Col>
                                  <Space direction="vertical">
                                    <Col span={24}>
                                      <Typography.Text type="secondary">
                                        {question.additionalInfo}
                                      </Typography.Text>
                                    </Col>
                                    <Col
                                      span={24}
                                      style={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      {imagesFormatted
                                        .filter(
                                          (image) => image.qId === question.id
                                        )
                                        ?.map((image) => (
                                          <div
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'column',
                                              padding: 5,
                                            }}
                                          >
                                            <img
                                              alt={image.name}
                                              height={150}
                                              src={image.url}
                                              style={{ objectFit: 'contain' }}
                                              width={150}
                                            />
                                            <Typography.Text type="secondary">
                                              {image.name}
                                            </Typography.Text>
                                          </div>
                                        ))}
                                    </Col>
                                  </Space>
                                  <Divider style={{ margin: 12 }} />
                                </Row>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
              <Divider />
            </div>
          ))}
          <div>
            <Row
              style={{
                alignItems: 'center',
                backgroundColor:
                  theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                marginBottom: 10,
                padding: 10,
                paddingLeft: 5,
                textAlign: 'center',
              }}
            >
              <Typography.Title
                level={3}
                style={{ margin: 0, textAlign: 'center' }}
              >
                Completion
              </Typography.Title>
              <Col flex={1} />
            </Row>
            <Row>
              <Col span={24}>
                <Typography.Text strong>Completed By </Typography.Text>
              </Col>
              <Col>
                {signature && signature.startsWith('data:image') ? (
                  <img
                    alt="Completed By Signature"
                    src={signature}
                    style={{ maxHeight: 120, maxWidth: 400 }}
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: signature }} />
                )}
              </Col>
              <Col>
                <Space direction="vertical">
                  <Typography.Text type="secondary">
                    {completedByUser}
                  </Typography.Text>{' '}
                  <Typography.Text type="secondary">
                    {completedAt}
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
            <Divider style={{ margin: 12 }} />
            <Row>
              <Col span={24}>
                <Typography.Text strong>Additional Comments </Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text type="secondary">
                  {additionalInfo}
                </Typography.Text>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default CompletedChecklistView;
