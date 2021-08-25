import React, { PureComponent } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import ImageMenuItem from "../../../../global/ImageMenuItem/ImageMenuItem";
import { FileButton } from "../../../../global/actions";
import AddOutline from "../../../../../images/AddOutline";
import ImageGallery from "../../../../../images/ImageGallery";
import { Header, HeaderText, HeaderSubText } from "../../../../global/forms";
import { EmptyText } from "../../../../global/typography";
import { useStoreActions } from "../../../../../state";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: auto;
  align-content: flex-start;
`;
const GridItem = styled.div`
  border: 1px solid #eeeeee;
  position: relative;
  transition: all 0.2s ease;
  ${({ selected }) =>
    selected
      ? `
    height: 215px;
    width: 98%;
    margin: 12.5px 12.5px;
    @media (min-width: 1024px) {
      width: calc(25% - 25px);
      height: 215px;
    }
  `
      : `
    height: 220px;
    width: 100%;
    margin: 10px 10px;
    @media (min-width: 1024px) {
      height: 220px;
      width: calc(25% - 20px);
    }
  `};
`;
const LoadingItem = styled.div`
  border: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;
  height: 220px;
  width: 100%;
  margin: 10px 10px;
  @media (min-width: 1024px) {
    height: 220px;
    width: calc(25% - 20px);
  }
`;
const Image = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${({ url }) => `background-image: url(${url});`} position: relative;
`;
const ImageMenu = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  padding: 5px 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  justify-content: flex-end;
`;
const AddItem = styled.div`
  width: 100%;
  height: 100%;
`;
const AddItemButton = styled.label`
  background: #fff;
  border: none;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;
const AddItemText = styled(Typography)`
  margin: 10px 0 0;
  color: ${({ disabled }) => (disabled ? "#BDBDBD" : "#EF5350")};
`;
const Empty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const EmptyActions = styled.div`
  display: flex;
  justify-content: center;
`;

class Images extends PureComponent {
  constructor(props) {
    super(props);
    this.addImageButton = React.createRef();
  }

  render() {
    const { images, removeImages, uploadImage, uploading, toggleLightbox } =
      this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Images</HeaderText>
          <HeaderSubText>
            Upload images that you have of this offender to help others identify
            them.
          </HeaderSubText>
        </Header>
        {images.length > 0 ? (
          <ImageGrid>
            {images.map(({ id, url, offendersIds }, i) => {
              return id === "UPLOADING" ? (
                <LoadingItem>
                  <CircularProgress />
                  <Typography>Uploading Image</Typography>
                </LoadingItem>
              ) : (
                <GridItem key={id}>
                  <Image url={url}>
                    <ImageMenu>
                      <ImageMenuItem
                        onClick={() => {
                          toggleLightbox({
                            images: images.map(({ url }) => url),
                            index: i,
                          });
                        }}
                        tooltipLabel="Full Size"
                        tooltipPosition="bottom"
                      >
                        <path
                          fill="#FFF"
                          d="M9.5,13.09L10.91,14.5L6.41,19H10V21H3V14H5V17.59L9.5,13.09M10.91,9.5L9.5,10.91L5,6.41V10H3V3H10V5H6.41L10.91,9.5M14.5,13.09L19,17.59V14H21V21H14V19H17.59L13.09,14.5L14.5,13.09M13.09,9.5L17.59,5H14V3H21V10H19V6.41L14.5,10.91L13.09,9.5Z"
                        />
                      </ImageMenuItem>
                      <ImageMenuItem
                        onClick={() => {
                          removeImages([id]);
                        }}
                        tooltipLabel="Remove Image"
                        tooltipPosition="bottom"
                      >
                        <path
                          fill="#FFF"
                          d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                        />
                      </ImageMenuItem>
                    </ImageMenu>
                  </Image>
                </GridItem>
              );
            })}
            <GridItem>
              <AddItem onChange={(value) => uploadImage(value)}>
                <FileButton
                  id="file-2"
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  ref={(ref) => (this.addImageButton = ref)}
                />
                <AddItemButton
                  component="label"
                  variant="contained"
                  color="primary"
                  disabled={uploading}
                  htmlFor="file-2"
                >
                  <AddOutline disabled={uploading} width="55px" height="55px" />
                  <AddItemText variant="subtitle1" disabled={uploading}>
                    Add Image
                  </AddItemText>
                </AddItemButton>
              </AddItem>
            </GridItem>
          </ImageGrid>
        ) : (
          <Empty>
            <ImageGallery width="100px" height="100px" />
            <EmptyText>You have not added any images yet</EmptyText>
            <EmptyActions>
              <div onChange={(value) => uploadImage(value)}>
                <FileButton
                  id="file-2"
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  ref={(ref) => (this.addImageButton = ref)}
                />
                <Button
                  component="label"
                  variant="contained"
                  color="primary"
                  disabled={uploading}
                  htmlFor="file-2"
                >
                  Add Image
                </Button>
              </div>
            </EmptyActions>
          </Empty>
        )}
      </Page>
    );
  }
}

const Wrapper = (props) => {
  const toggleLightbox = useStoreActions(
    (actions) => actions.theme.toggleLightBox
  );

  return <Images toggleLightbox={toggleLightbox} {...props} />;
};

export default Wrapper;
