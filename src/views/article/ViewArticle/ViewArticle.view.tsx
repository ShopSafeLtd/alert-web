import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';

import {
  faBuilding,
  faChartBar,
  faClock,
  faEdit,
  faEllipsisV,
  faExternalLink,
  faFile,
  faFileExcel,
  faFileImage,
  faFilePdf,
  faFileWord,
  faPrint,
  faShieldCheck,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Dropdown, Menu, Row, Tag, Typography } from 'antd';
import InlineWatermarkProcessor from 'components/images/InlineWatermarkProcessor';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import React from 'react';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom'; // Import useIntl hook
import type { Theme } from 'configs/ThemeConfig';

import hasRolePermission from '#/utils/has-role-permission';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { createUseStyles } from 'react-jss';
import { Link, useNavigate } from 'react-router-dom';

import type { ReturnProps as Props } from './types/ViewArticle';

import IncidentCard from '../../../components/incidents/IncidentCard';
import OffenderGrid from '../../../components/offenders/OffenderGrid';

const { Text, Title } = Typography;

const useStyles = createUseStyles((theme: Theme) => ({
  articleContent: {
    '& .article-content': {
      '& img': {
        height: 'auto',
        maxWidth: '100%',
      },
      marginTop: 20,
      width: '100%',
    },
    '@media print': {
      '& .watermark-overlay': {
        '-webkit-print-color-adjust': 'exact',
        opacity: '0.3 !important',
        'print-color-adjust': 'exact',
      },
    },
  },
  content: {
    height: '100vh',
    width: '100%',
  },
  detailsContainer: {
    height: '100%',
  },
  documentCard: {
    '&:hover': {
      borderColor: theme.primary,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    cursor: 'pointer',
    height: '100%',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  documentIcon: {
    color: theme.primary,
    marginBottom: 8,
    opacity: 0.8,
  },
  documentOpenIcon: {
    color: theme.secondaryText,
  },
  documentOpenText: {
    color: theme.secondaryText,
    fontSize: 14,
  },
  documentTitle: {
    color: theme.headerColor,
    textAlign: 'center',
    width: '100%',
  },
  viewArticle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '15px',
    width: '100%',
  },
}));

const ViewArticleView = ({
  componentRef,
  data,
  editArticle,
  handlePrint,
  lightBoxOpen,
  lightboxElements,
  loading,
  onDeleteArticle,
  openLightbox,
}: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();

  // Image click handling is now managed by InlineWatermarkProcessor

  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faPrint} />,
      key: 'print',
      label: intl.formatMessage({ defaultMessage: 'Print' }),
      onClick: handlePrint,
      permission: {
        method: PermissionMethod.Edit,
        model: PermissionModel.Articles,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faChartBar} />,
      key: 'analytics',
      label: intl.formatMessage({ defaultMessage: 'View Analytics' }),
      onClick: () =>
        navigate(`/app/reports/bulletin-engagement/${data?.article?.id || ''}`),
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Reports,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faEdit} />,
      key: 'edit',
      label: intl.formatMessage({ defaultMessage: 'Edit Bulletin' }),
      onClick: editArticle,
      permission: {
        method: PermissionMethod.Edit,
        model: PermissionModel.Articles,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faTrash} />,
      key: 'delete',
      label: intl.formatMessage({ defaultMessage: 'Delete Bulletin' }),
      onClick: onDeleteArticle,
      permission: {
        method: PermissionMethod.Delete,
        model: PermissionModel.Articles,
      },
    },
  ].filter((item) => hasRolePermission({ permission: item.permission }));

  return (
    <>
      <div className={classes.viewArticle}>
        <Row className={classes.content}>
          <Col className={classes.detailsContainer} span={24}>
            <Card
              loading={loading}
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 10,
              }}
            >
              <Row align="middle" justify="space-between">
                <Col>
                  <Title level={2} style={{ margin: 0 }}>
                    {data?.article?.title}
                  </Title>
                </Col>
                {menuItems.length > 0 && (
                  <Col>
                    <Dropdown
                      arrow={{ pointAtCenter: true }}
                      overlay={<Menu items={menuItems} />}
                      placement="bottomRight"
                      trigger={['click']}
                    >
                      <Button
                        icon={<FontAwesomeIcon icon={faEllipsisV} size="lg" />}
                        type="text"
                      />
                    </Dropdown>
                  </Col>
                )}
              </Row>
              <Row gutter={30} style={{ marginBottom: 10, marginTop: 20 }}>
                <Col span={8}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: '#72849a', marginRight: 8 }}
                  />
                  <Text style={{ color: '#72849a', marginRight: 5 }}>
                    {intl.formatMessage({ defaultMessage: 'Author:' })}
                  </Text>
                  <Text strong>{data?.article?.createdBy?.fullName}</Text>
                </Col>
                {data?.article?.completedAt && (
                  <Col span={8}>
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ color: '#72849a', marginRight: 8 }}
                    />
                    <Text style={{ color: '#72849a', marginRight: 5 }}>
                      {intl.formatMessage({ defaultMessage: 'Published:' })}
                    </Text>
                    <Text strong>
                      {FormatCalendar(data?.article?.completedAt, intl)}
                    </Text>
                  </Col>
                )}
                <Col span={8}>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ color: '#72849a', marginRight: 8 }}
                  />
                  <Text style={{ color: '#72849a', marginRight: 5 }}>
                    {intl.formatMessage({ defaultMessage: 'Updated:' })}
                  </Text>
                  {data?.article?.updatedAt && (
                    <Text strong>
                      {FormatCalendar(data.article.updatedAt, intl)}
                    </Text>
                  )}
                </Col>
              </Row>
              <Row gutter={30} style={{ marginBottom: 10 }}>
                {data?.article.business && (
                  <Col span={8}>
                    <FontAwesomeIcon
                      icon={faBuilding}
                      style={{ color: '#72849a', marginRight: 8 }}
                    />
                    <Text style={{ color: '#72849a', marginRight: 5 }}>
                      {intl.formatMessage({ defaultMessage: 'Business:' })}
                    </Text>
                    {/* <Text strong>{data?.article.business?.name}</Text> */}
                    <Link
                      to={`/app/businesses/view/${
                        data?.article?.business?.id || ''
                      }`}
                    >
                      {data?.article.business?.name}
                    </Link>
                  </Col>
                )}

                <Col span={16} style={{ overflow: 'auto', paddingBottom: 8 }}>
                  <FontAwesomeIcon
                    icon={faShieldCheck}
                    style={{ color: '#72849a', marginRight: 8 }}
                  />

                  <Text style={{ color: '#72849a', marginRight: 5 }}>
                    {intl.formatMessage({ defaultMessage: 'Roles:' })}
                  </Text>

                  {data?.article.roles.map((role) => (
                    <Tag key={role.id} style={{ marginBottom: 3 }}>
                      {role.name}
                    </Tag>
                  ))}
                </Col>
              </Row>
              <Row gutter={60} style={{ marginBottom: 5 }}>
                <Col className={classes.articleContent}>
                  <div ref={componentRef}>
                    <InlineWatermarkProcessor
                      className="article-content"
                      htmlContent={data?.article?.rows[0].columns[0].text || ''}
                      onImageClick={(src, index) => {
                        const container = componentRef.current;
                        if (!container) return;

                        const imageNodes = container.querySelectorAll('img');
                        const allImageUrls = [...imageNodes].map(
                          (img) => img.src
                        );

                        openLightbox(
                          allImageUrls.map((url) => ({ src: url })),
                          index
                        );
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
            {data?.article?.rows[0].columns[0].incidents &&
              data?.article?.rows[0].columns[0].incidents.length > 0 && (
                <Card
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  <Typography.Title level={2}>
                    {intl.formatMessage({
                      defaultMessage: 'Incidents',
                    })}
                  </Typography.Title>
                  <Row>
                    {data?.article?.rows[0].columns[0].incidents.map((el) => (
                      <Col key={el?.id} lg={12} md={12} sm={24} xl={8} xxl={6}>
                        <IncidentCard
                          incident={{
                            ...el,
                            totalImages: el?.images?.length,
                          }}
                          openLightbox={openLightbox}
                        />
                      </Col>
                    ))}
                  </Row>
                </Card>
              )}
            {data?.article?.rows[0].columns[0].offenders &&
              data?.article?.rows[0].columns[0].offenders.length > 0 && (
                <Card
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  <Typography.Title level={2}>
                    {intl.formatMessage({
                      defaultMessage: 'Offenders',
                    })}
                  </Typography.Title>
                  <OffenderGrid
                    offenders={data?.article?.rows[0].columns[0].offenders.map(
                      (el) => ({
                        ...el,
                        latestIncident: el?.latestIncident
                          ? {
                              date: new Date(
                                el.latestIncident.date ||
                                  el.latestIncident.dayTime
                              ),
                              id: el.latestIncident.id,
                            }
                          : null,
                        totalIncidents: el?.totalIncidents || 0,
                        totalValue: el?.totalValue || 0,
                      })
                    )}
                  />
                </Card>
              )}
            {data?.article?.documents &&
              data?.article?.documents.length > 0 && (
                <Card
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                  }}
                >
                  <Typography.Title level={2}>
                    {intl.formatMessage({
                      defaultMessage: 'Documents',
                    })}
                  </Typography.Title>
                  <Row gutter={[16, 16]}>
                    {data?.article?.documents.map((item) => {
                      const getFileIcon = () => {
                        const fileName = item.name.toLowerCase();
                        if (fileName.endsWith('.pdf')) return faFilePdf;
                        if (
                          fileName.endsWith('.doc') ||
                          fileName.endsWith('.docx')
                        )
                          return faFileWord;
                        if (
                          fileName.endsWith('.xls') ||
                          fileName.endsWith('.xlsx')
                        )
                          return faFileExcel;
                        if (
                          fileName.endsWith('.jpg') ||
                          fileName.endsWith('.jpeg') ||
                          fileName.endsWith('.png') ||
                          fileName.endsWith('.gif')
                        )
                          return faFileImage;
                        return faFile;
                      };

                      return (
                        <Col key={item.id} lg={6} md={8} sm={12} xs={24}>
                          <a
                            href={item.url}
                            rel="noreferrer"
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                          >
                            <Card
                              bodyStyle={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12,
                                padding: '24px 16px',
                              }}
                              className={classes.documentCard}
                              hoverable
                            >
                              <FontAwesomeIcon
                                className={classes.documentIcon}
                                icon={getFileIcon()}
                                size="3x"
                              />
                              <Typography.Text
                                className={classes.documentTitle}
                                ellipsis={{ tooltip: item.name }}
                                strong
                              >
                                {item.name}
                              </Typography.Text>
                              <Row
                                align="middle"
                                style={{ gap: 4, marginTop: 'auto' }}
                              >
                                <Typography.Text
                                  className={classes.documentOpenText}
                                >
                                  {intl.formatMessage({
                                    defaultMessage: 'Open',
                                  })}
                                </Typography.Text>
                                <FontAwesomeIcon
                                  className={classes.documentOpenIcon}
                                  icon={faExternalLink}
                                />
                              </Row>
                            </Card>
                          </a>
                        </Col>
                      );
                    })}
                  </Row>
                </Card>
              )}
          </Col>
        </Row>
      </div>
      <Lightbox
        close={() => openLightbox([], 0)}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={lightBoxOpen.index}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
        slides={lightboxElements}
      />
    </>
  );
};

export default ViewArticleView;
