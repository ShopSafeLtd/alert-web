import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AddSvg from "@material-ui/icons/Add";
import MediaQuery from "react-responsive";

import { SubHeader, EmptyText } from "../../typography";
import { EmptySection } from "../../emptyStates";
import Images from "../../../../images/Images";
import { Row, Section, Grow, SectionLoading } from "../../layout/";
import { FileButton } from "../../../global/actions";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import { useStoreActions } from "../../../../state";

const AddIcon = styled(AddSvg)`
  margin-right: 5px;
`;
const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
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
      width: calc(50% - 25px);
      height: 215px;
    }
  `
      : `
    height: 220px;
    width: 100%;
    margin: 10px 10px;
    @media (min-width: 1024px) {
      height: 220px;
      width: calc(50% - 20px);
    }
  `};
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
const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;
const ImageMenuItem = styled(Svg)`
  margin-left: 20px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  @media (min-width: 1024px) {
    margin-left: 10px;
  }
`;
const ImageButton = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const EditImages = ({
  images,
  removeImage,
  addImage,
  uploading,
  openAssignOffenders,
  offenders,
  loading,
}) => {
  const toggleLightbox = useStoreActions((state) => state.theme.toggleLightBox);

  const [removeId, setRemoveId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <MediaQuery minDeviceWidth={1024}>
      {(matches) => (
        <Section width={matches ? "50%" : "100%"} elevation={1}>
          {!!loading && <SectionLoading />}
          <Row right row>
            <SubHeader>Images</SubHeader>
            <Grow />
            {images.length > 0 && (
              <div onChange={addImage}>
                <FileButton
                  id="file"
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                />
                <Button
                  component="label"
                  color="primary"
                  disabled={uploading}
                  htmlFor="file"
                >
                  <AddIcon />
                  Add
                </Button>
              </div>
            )}
          </Row>
          {images.length > 0 ? (
            <ImageGrid>
              {images.map(({ id, url }, i) => {
                return (
                  <GridItem key={id}>
                    <Image url={url}>
                      <ImageButton
                        onClick={() =>
                          toggleLightbox({
                            images: images.map(({ url }) => url),
                            index: i,
                          })
                        }
                      />
                      <ImageMenu>
                        {offenders !== undefined && offenders.length > 0 && (
                          <ImageMenuItem
                            viewBox="0 0 24 24"
                            onClick={() => {
                              openAssignOffenders(id);
                            }}
                          >
                            <path
                              fill="#FFF"
                              d="M13,13C11,13 7,14 7,16V18H19V16C19,14 15,13 13,13M19.62,13.16C20.45,13.88 21,14.82 21,16V18H24V16C24,14.46 21.63,13.5 19.62,13.16M13,11A3,3 0 0,0 16,8A3,3 0 0,0 13,5A3,3 0 0,0 10,8A3,3 0 0,0 13,11M18,11A3,3 0 0,0 21,8A3,3 0 0,0 18,5C17.68,5 17.37,5.05 17.08,5.14C17.65,5.95 18,6.94 18,8C18,9.06 17.65,10.04 17.08,10.85C17.37,10.95 17.68,11 18,11M8,10H5V7H3V10H0V12H3V15H5V12H8V10Z"
                            />
                          </ImageMenuItem>
                        )}
                        <ImageMenuItem
                          viewBox="0 0 24 24"
                          onClick={() => {
                            setConfirmDelete(true);
                            setRemoveId(id);
                          }}
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
              <ConfirmDialog
                open={confirmDelete}
                handleClose={() => setConfirmDelete(false)}
                title="Are you sure?"
                description="Are you sure you want to remove this image from the incident? This will be permanent and connot be undone"
                actions={[
                  <Button key={0} onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </Button>,
                  <Button
                    key={1}
                    color="primary"
                    onClick={() => {
                      setConfirmDelete(false);
                      removeImage(removeId);
                    }}
                  >
                    Remove Image
                  </Button>,
                ]}
              />
            </ImageGrid>
          ) : (
            <EmptySection>
              <Images width="100px" height="100px" />
              <EmptyText>There are no images on this incident</EmptyText>
              <div onChange={addImage}>
                <FileButton
                  id="file"
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                />
                <Button
                  component="label"
                  color="primary"
                  disabled={uploading}
                  htmlFor="file"
                >
                  <AddIcon />
                  Add Image
                </Button>
              </div>
            </EmptySection>
          )}
        </Section>
      )}
    </MediaQuery>
  );
};

export default EditImages;
