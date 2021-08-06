import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { CardNoImage } from '../../../global/cards';
import ImageCarousel from '../../../global/ImageCarousel/ImageCarousel';
import { isEqual } from 'lodash-es';
import Typography from '@material-ui/core/Typography';

import { PopOver, Item } from '../../../global/layout';
import { BackButton } from '../../../global/actions';
import { ItemHeader, ItemText } from '../../../global/typography';
import { ageValues, buildValues, genderValues, raceValues } from 'graphql-src/offenders/enums';
import { useStoreActions } from '../../../../state';

const MultiImagesContainer = styled.div`
  position: relative;
  height: 320px;
  width: 100%;
`;
const SingleImageContainer = styled.div`
  height: 320px;
  width: 100%;
`;
const Image = styled.div`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Column = styled(Item)`
  flex: 1;
  ${({ halfWidth }) => halfWidth && 'min-width: 50%;'};
`;
const Container = styled.div`
  padding: 20px 30px;
`;

class ViewOffenderPopOver extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.visible !== nextProps.visible) return true;
    if (!isEqual(this.state.offender, nextState.offender)) return true;
    return false;
  }

  render() {
    const {
      visible,
      offender: { name, age, race, gender, build, hair, peculiarities, images },
      toggleLightbox,
      close
    } = this.props;

    const buildValue = buildValues.find(obj => obj.value === build);
    const ageValue = ageValues.find(obj => obj.value === age);
    const raceValue = raceValues.find(obj => obj.value === race);
    const genderValue = genderValues.find(obj => obj.value === gender);

    return (
      <MediaQuery minDeviceWidth={1024}>
        {matches => {
          let actions = [];
          matches &&
            actions.push(
              <BackButton color="primary" variant="contained" onClick={close}>
                Close
              </BackButton>
            );

          return (
            <PopOver
              noPadding
              open={visible}
              handleClose={close}
              width={matches ? 700 : window.innerWidth - 15}
              title="View Details"
              actions={actions}
            >
              {images !== undefined && images.length > 0 ? (
                images.length > 1 ? (
                  <MultiImagesContainer>
                    <ImageCarousel
                      images={images}
                      height="280px"
                      toggleLightBox={index =>
                        toggleLightbox({
                          images: images.map(({ url }) => url),
                          index
                        })
                      }
                    />
                  </MultiImagesContainer>
                ) : (
                  <SingleImageContainer>
                    {images.map(image => (
                      <div
                        key={image.id}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <Image
                          alt="Offender Image"
                          style={{ backgroundImage: `url(${image.url})` }}
                          onClick={() =>
                            toggleLightbox({
                              images: images.map(({ url }) => url),
                              index: 0
                            })
                          }
                        />
                      </div>
                    ))}
                  </SingleImageContainer>
                )
              ) : (
                <CardNoImage height="280px" />
              )}
              <Container>
                <Typography variant="h6">{name}</Typography>
                <Row>
                  <Column>
                    <ItemHeader>Age</ItemHeader>
                    <ItemText>{!!age && ageValue.label}</ItemText>
                  </Column>
                  <Column>
                    <ItemHeader>Build</ItemHeader>
                    <ItemText>{!!build && buildValue.label}</ItemText>
                  </Column>
                  <Column>
                    <ItemHeader>Race</ItemHeader>
                    <ItemText>{!!race && raceValue.label}</ItemText>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <ItemHeader>Gender</ItemHeader>
                    <ItemText>{!!gender && genderValue.label}</ItemText>
                  </Column>
                  <Column>
                    <ItemHeader>Hair</ItemHeader>
                    <ItemText>{!!hair ? hair : 'Unknown'}</ItemText>
                  </Column>
                </Row>
                <Row>
                  {!!peculiarities && (
                    <Column halfWidth>
                      <ItemHeader>Peculiarities</ItemHeader>
                      <ItemText>{peculiarities}</ItemText>
                    </Column>
                  )}
                </Row>
              </Container>
            </PopOver>
          );
        }}
      </MediaQuery>
    );
  }
}

const Wrapper = props => {
  const toggleLightbox = useStoreActions(
    actions => actions.theme.toggleLightBox
  );

  return <ViewOffenderPopOver toggleLightbox={toggleLightbox} {...props} />;
};

export default Wrapper;
