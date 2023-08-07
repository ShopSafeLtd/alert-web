import React, { useState } from 'react';
import { Button, Col, Row, Typography, Tooltip } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle as faCheckedCircle,
  faCircleXmark,
} from '@fortawesome/pro-solid-svg-icons';
import CropFaceImage from '../../../../images/CropFaceImage';
import useStyles from '../Profiles.styles';
import type {
  FacesOpenData,
  FaceData,
  StateOffenderData,
} from './useOffenders';
import { Build, Height, Race } from '../../../../../graphql/generated';
import {
  getClosestAgeRange,
  getGenderFromFace,
  getPeculiaritiesFromFace,
} from '../../ImageSection/useImageSection';

const { Paragraph, Title } = Typography;

export interface FacesOpenSubmitData {
  selectedFace: FaceData;
  includedOffenders: StateOffenderData[];
  offenderId: string;
  imageId: string;
}

interface Props {
  facesOpen: FacesOpenData;
  onSubmit: (data: FacesOpenSubmitData) => void;
  onClose: () => void;
}

const FacesColumn = ({ facesOpen, onSubmit, onClose }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [selected, setSelected] = useState<FaceData | null>(null);
  const [addOffenders, setAddOffenders] = useState<FaceData[]>([]);

  const toggleSelected = (face: FaceData) => {
    if (selected === null) {
      setSelected(face);
    } else if (addOffenders.some(({ id }) => id === face.id)) {
      setAddOffenders(addOffenders?.filter(({ id }) => id !== face.id));
    } else {
      setAddOffenders([...addOffenders, face]);
    }
  };

  const handleSubmit = () => {
    if (selected)
      onSubmit({
        selectedFace: selected,
        includedOffenders: addOffenders.map((face) => ({
          id: Math.floor(Math.random() * 1000).toString(),
          name: 'Unidentified Offender',
          confirmedInIncident: true,
          gender: getGenderFromFace(face.gender),
          age: getClosestAgeRange(face.age.high, face.age.low),
          race: Race.Unknown,
          height: Height.Unknown,
          build: Build.Unknown,
          peculiarities: getPeculiaritiesFromFace(face.beard, face.mustache),
          images: [
            {
              id: facesOpen.id,
              optimised: facesOpen.url,
              url: facesOpen.url,
              new: true,
              boundingBox: {
                height: face.boundingBox.height,
                left: face.boundingBox.left,
                top: face.boundingBox.top,
                width: face.boundingBox.width,
              },
            },
          ],
          new: true,
          existing: false,
          edited: false,
          blank: true,
          imageConfirmed: true,
        })),
        offenderId: facesOpen.offenderId,
        imageId: facesOpen.id,
      });
  };

  return (
    <div className={classes.modalRow}>
      <div className={classes.faceColumn}>
        <div>
          <Row wrap={false} gutter={16}>
            <Col>
              <div className={classes.facesHeaderContainer}>
                <Title level={4}>
                  <FormattedMessage
                    defaultMessage="Select the offender's face from the image"
                    id="S5DNX2"
                  />
                </Title>
                <Paragraph className={classes.facesHeader}>
                  <FormattedMessage
                    defaultMessage="Select the face for this offender from the list below of people extracted from the image, if the offenders face is not shown skip this step using the button."
                    id="libd1x"
                  />
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
        <Row className={classes.facesRow} wrap={false}>
          {selected && facesOpen.faces.length > 1 && (
            <Col>
              <div className={classes.selectedFace}>
                <Paragraph className={classes.selectedFaceTitle}>
                  <FormattedMessage
                    defaultMessage="Selected Face"
                    id="wOhlzD"
                  />
                </Paragraph>
                <div className={classes.selectedFaceCard}>
                  <div className={classes.overlay} />
                  <FontAwesomeIcon
                    onClick={() => setSelected(null)}
                    icon={faCircleXmark}
                    className={classes.clearIcon}
                    size="2x"
                  />
                  <CropFaceImage
                    url={facesOpen.url || ''}
                    boundingBox={selected.boundingBox}
                    height={150}
                    width={150}
                  />
                </div>
              </div>
            </Col>
          )}
          <Col>
            <div className={classes.faces}>
              {selected !== null && facesOpen.faces.length > 1 && (
                <Paragraph className={classes.selectedFaceTitle} type="danger">
                  <FormattedMessage
                    defaultMessage="Select any additional people from this image to include in the incident."
                    id="LwsW2y"
                  />
                </Paragraph>
              )}
              <Row gutter={[8, 8]}>
                {facesOpen?.faces
                  .filter(
                    ({ id }) =>
                      id !== selected?.id || facesOpen.faces.length === 1
                  )
                  .map((face) => (
                    <Col key={face.id} onClick={() => toggleSelected(face)}>
                      <div className={classes.faceCard}>
                        <div className={classes.overlay} />
                        <FontAwesomeIcon
                          icon={faCheckedCircle}
                          className={
                            selected?.id === face.id ||
                            addOffenders.some(({ id }) => id === face.id)
                              ? classes.selectedIcon
                              : classes.selectIcon
                          }
                          size="2x"
                        />
                        <CropFaceImage
                          url={facesOpen.url || ''}
                          boundingBox={face.boundingBox}
                          height={150}
                          width={150}
                        />
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>
        </Row>
        <Row className={classes.buttonRow} justify="end" gutter={8}>
          <Col>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage:
                  'Skip if the offender face is not shown in this image',
                id: 'H+5CzB',
              })}
            >
              <Button onClick={onClose}>
                <FormattedMessage
                  id="MGMrNl"
                  defaultMessage="Offender's Face Not Shown"
                />
              </Button>
            </Tooltip>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={selected === null}
            >
              <FormattedMessage id="krQhSS" defaultMessage="Save Faces" />
            </Button>
          </Col>
        </Row>
      </div>
      {/* <div style={{ flex: 1 }} /> */}
      {/* <div className={classes.faceImageColumn}> */}
      {/*  <div className={classes.modalImage}> */}
      {/*    <WatermarkImage url={facesOpen?.url} /> */}
      {/*  </div> */}
      {/* </div> */}
    </div>
  );
};

export default FacesColumn;

// <div className={classes.facesContainer}>
//   {facesOpen?.faces.map((face) => (
//     <div
//       className={
//         selected?.id === face.id ||
//         addOffenders.some(({ id }) => id === face.id)
//           ? classes.selectedFaceRow
//           : classes.faceRow
//       }
//     >
//       <Row style={{ height: 100 }} wrap={false}>
//         <Col style={{ height: 100 }}>
//           <div>
//             <CropFaceImage
//               url={facesOpen.url || ''}
//               boundingBox={face.boundingBox}
//               height={100}
//               width={100}
//             />
//           </div>
//         </Col>
//         <Col flex={1} className={classes.faceActions}>
//           {selected?.id === face.id && (
//             <Tooltip
//               title={intl.formatMessage({
//                 defaultMessage: 'De-select this face.',
//                 id: '8dtmE7',
//               })}
//             >
//               <Button
//                 type="ghost"
//                 danger
//                 onClick={() => toggleSelected(face)}
//               >
//                 <FontAwesomeIcon
//                   icon={faCheckCircle}
//                   style={{ marginRight: 5 }}
//                   size="lg"
//                 />
//                 <FormattedMessage
//                   defaultMessage="Selected"
//                   id="byP6IC"
//                 />
//               </Button>
//             </Tooltip>
//           )}
//           {selected === null && selected !== face.id && (
//             <Button onClick={() => toggleSelected(face)}>
//               {selected !== face.id && (
//                 <FormattedMessage
//                   defaultMessage="Select Face"
//                   id="4CuSnj"
//                 />
//               )}
//             </Button>
//           )}
//           {selected !== null &&
//             selected?.id !== face.id &&
//             !addOffenders.some(({ id }) => id === face.id) && (
//               <div>
//                 <Paragraph>
//                   <FormattedMessage
//                     defaultMessage="Include this person in the incident?"
//                     id="UBUry0"
//                   />
//                 </Paragraph>
//                 <Row justify="end">
//                   <Col>
//                     <Tooltip
//                       title={intl.formatMessage({
//                         defaultMessage:
//                           'Include this person from the incident.',
//                         id: '1yi1kN',
//                       })}
//                     >
//                       <Button onClick={() => toggleAddOffender(face)}>
//                         <FormattedMessage
//                           defaultMessage="Add To Incident"
//                           id="KL0XEa"
//                         />
//                       </Button>
//                     </Tooltip>
//                   </Col>
//                 </Row>
//               </div>
//             )}
//           {selected !== null &&
//             addOffenders.some(({ id }) => id === face.id) && (
//               <div>
//                 <Row justify="end">
//                   <Col>
//                     <Tooltip
//                       title={intl.formatMessage({
//                         defaultMessage:
//                           "Don't include this person from the incident.",
//                         id: '/tvVBq',
//                       })}
//                     >
//                       <Button
//                         type="ghost"
//                         danger
//                         onClick={() => toggleAddOffender(face)}
//                       >
//                         <FontAwesomeIcon
//                           icon={faCheckCircle}
//                           style={{ marginRight: 5 }}
//                           size="lg"
//                         />
//                         <FormattedMessage
//                           defaultMessage="Included in Incident"
//                           id="31C4Gu"
//                         />
//                       </Button>
//                     </Tooltip>
//                   </Col>
//                 </Row>
//               </div>
//             )}
//         </Col>
//       </Row>
//     </div>
//   ))}
// </div>
