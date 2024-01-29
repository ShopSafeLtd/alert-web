/* eslint-disable formatjs/no-literal-string-in-jsx */
import React, { useEffect, useRef, useState } from 'react';
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
import { useReactToPrint } from 'react-to-print';
import type { ActiveChecklistSection } from '../active-checklist/useActiveChecklist';

interface QuestionWeight {
  maxWeight: number;
  weight: number;
  na: boolean;
  section: number;
  subsection: number;
  additionalInfo: string;
  flagged: boolean;
  question: string;
  answer: string;
  id: string;
  type: string;
  images: {
    url: string;
    name: string;
  }[];
}
const flaggedArray = new Set(['FAIL', 'NO', 'FALSE']);
const successArray = new Set(['PASS', 'YES', 'TRUE']);
const indexToLetter = (num: number) => (num + 10).toString(36).toUpperCase();

const CompletedChecklistView = ({
  checklistSections,
  title,
  additionalInfo,
  signature,
  completedByUser,
  completedAt,
  theme = 'dark',
  onBack = () => {},
  generating = false,
}: {
  checklistSections: ActiveChecklistSection[];
  title: string;
  additionalInfo: string;
  signature: string;
  completedByUser: string;
  completedAt: string;
  theme?: 'dark' | 'light';
  onBack?: () => void;
  generating?: boolean;
}) => {
  const questions: QuestionWeight[] = [];
  const images: {
    url: string;
    name: string;
    qId: string;
  }[] = [];

  let total = 0;
  let maxTotal = 0;
  const sectionTotals: {
    section: number;
    total: number;
    maxTotal: number;
    flaggedNos: number;
    title: string;
  }[] = [];
  const subsectionTotals: {
    section: number;
    subsection: number;
    total: number;
    maxTotal: number;
    flaggedNos: number;
    title: string;
  }[] = [];

  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line @typescript-eslint/no-loop-func
  for (const section of checklistSections)
    section.subsections.flatMap((subsection) =>
      subsection.questions.flatMap((question) => {
        const questionImages =
          question.images
            ?.map((image) => image.url)
            .map((image, index) => ({
              url: image || '',
              name: `Photo ${index + 1}`,
              qId: question.id,
            })) || [];
        images.push(...questionImages);
        const questionFormatted = {
          question: `${indexToLetter(question.order - 1)}) ${
            question.question.en
          }`,
          images: [...questionImages],
          additionalInfo: question.additionalComments || '',
          section: section.section,
          subsection: subsection.subsection || 0,
          maxWeight:
            question.weights.sort((a, b) => b.weight - a.weight)[0]?.weight ||
            0,
          weight:
            question.weights.find((weight) => weight.answer === question.answer)
              ?.weight || 0,
          na: question.answer === 'N/A',
          flagged: question.answer === 'FAIL',
          answer: question.answer || '',
          id: question.id,
          type: question.type,
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
              section: section.section,
              total: questionFormatted.weight,
              maxTotal: questionFormatted.maxWeight,
              flaggedNos: question.answer === 'FAIL' ? 1 : 0,
              title: section.titleLocaled || '',
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
              section: section.section,
              subsection: subsection.subsection || 0,
              total: questionFormatted.weight,
              maxTotal: questionFormatted.maxWeight,
              flaggedNos: question.answer === 'FAIL' ? 1 : 0,
              title: subsection.titleLocaled || '',
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

  const flagged = questions.filter((question) => question.flagged);
  const imagesFormatted = images.map((image, index) => ({
    url: image.url,
    name: `Photo ${index + 1}`,
    qId: image.qId,
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
    pageStyle:
      '@page { size: A4; margin:10mm !important; } @media print { body { -webkit-print-color-adjust: exact; } }',
    onBeforeGetContent: () =>
      new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again

      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  if (generating)
    return (
      <div ref={componentRef} className="page">
        <Typography.Title level={2}>{title}</Typography.Title>
        <Row
          style={{
            backgroundColor:
              theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
            padding: 10,
            paddingLeft: 5,
            marginBottom: 10,
            alignItems: 'center',
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
              {total}/{maxTotal} ({Math.round((total / maxTotal) * 100)}%)
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
                backgroundColor:
                  theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                padding: 10,
                paddingLeft: 5,
                marginBottom: 10,
                alignItems: 'center',
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
                      color: 'white',
                      backgroundColor: 'red',
                      textAlign: 'center',
                      padding: 5,
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
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                              style={{
                                objectFit: 'contain',
                              }}
                              height={150}
                              width={150}
                              src={image.url}
                              alt={image.name}
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
                backgroundColor:
                  theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                padding: 10,
                paddingLeft: 5,
                marginBottom: 10,
                alignItems: 'center',
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
                                    color:
                                      flaggedArray.has(question.answer) ||
                                      successArray.has(question.answer) ||
                                      question.answer === 'N/A'
                                        ? 'white'
                                        : 'black',
                                    backgroundColor: flaggedArray.has(
                                      question.answer
                                    )
                                      ? 'red'
                                      : successArray.has(question.answer)
                                      ? 'green'
                                      : question.answer === 'N/A'
                                      ? 'lightBlue'
                                      : undefined,
                                    textAlign: 'center',
                                    padding: 5,
                                  }}
                                >
                                  {question.type === 'TEXT' ? (
                                    <Typography.Text type="secondary">
                                      {question.answer}
                                    </Typography.Text>
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
                                      display: 'flex',
                                      flexDirection: 'row',
                                      flexWrap: 'wrap',
                                      justifyContent: 'center',
                                      alignItems: 'center',
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
                                            style={{ objectFit: 'contain' }}
                                            height={150}
                                            width={150}
                                            src={image.url}
                                            alt={image.name}
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
              backgroundColor:
                theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
              padding: 10,
              paddingLeft: 5,
              marginBottom: 10,
              alignItems: 'center',
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
              <div dangerouslySetInnerHTML={{ __html: signature }} />
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
    <div style={{ marginTop: 30, marginLeft: 50, marginRight: 50 }}>
      <Row gutter={[8, 8]} style={{ marginBottom: 10 }}>
        <PageHeader
          onBack={onBack}
          title="Checklists"
          style={{ paddingLeft: 0, paddingRight: 0, width: '100%' }}
          extra={[
            <>
              <Col flex={1} />
              <Button type="primary" onClick={() => handlePrint()}>
                Print
              </Button>
            </>,
          ]}
        />
      </Row>

      <Card>
        <div ref={componentRef}>
          <Typography.Title level={2}>{title}</Typography.Title>
          <Row
            style={{
              backgroundColor:
                theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
              padding: 10,
              paddingLeft: 5,
              marginBottom: 10,
              alignItems: 'center',
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
                {total}/{maxTotal} ({Math.round((total / maxTotal) * 100)}%)
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
                  backgroundColor:
                    theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                  padding: 10,
                  paddingLeft: 5,
                  marginBottom: 10,
                  alignItems: 'center',
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
                        color: 'white',
                        backgroundColor: 'red',
                        textAlign: 'center',
                        padding: 5,
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
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          alignItems: 'center',
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
                                style={{
                                  objectFit: 'contain',
                                }}
                                height={150}
                                width={150}
                                src={image.url}
                                alt={image.name}
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
                  backgroundColor:
                    theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                  padding: 10,
                  paddingLeft: 5,
                  marginBottom: 10,
                  alignItems: 'center',
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
                                      color:
                                        flaggedArray.has(question.answer) ||
                                        successArray.has(question.answer) ||
                                        question.answer === 'N/A'
                                          ? 'white'
                                          : 'black',
                                      backgroundColor: flaggedArray.has(
                                        question.answer
                                      )
                                        ? 'red'
                                        : successArray.has(question.answer)
                                        ? 'green'
                                        : question.answer === 'N/A'
                                        ? 'lightBlue'
                                        : undefined,
                                      textAlign: 'center',
                                      padding: 5,
                                    }}
                                  >
                                    {question.type === 'TEXT' ? (
                                      <Typography.Text type="secondary">
                                        {question.answer}
                                      </Typography.Text>
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
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        alignItems: 'center',
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
                                              style={{ objectFit: 'contain' }}
                                              height={150}
                                              width={150}
                                              src={image.url}
                                              alt={image.name}
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
                backgroundColor:
                  theme === 'light' || isPrinting ? '#f0f0f0' : '#303030',
                padding: 10,
                paddingLeft: 5,
                marginBottom: 10,
                alignItems: 'center',
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
                <div dangerouslySetInnerHTML={{ __html: signature }} />
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
