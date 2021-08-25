import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import Image from "@material-ui/icons/AddPhotoAlternate";
import { useQuery, useMutation } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import {
  Field,
  FieldHeader,
  Header,
  HeaderText,
  HeaderSubText,
} from "../global/forms";
import { FullWidthButton, BackButton } from "../global/actions";
import { EmptyText } from "../global/typography";
import WebAddImages from "../global/images/WebAddImages/WebAddImages";
import { Scheme } from "graphql-src/schemes/queries";
import { UpdateScheme } from "graphql-src/schemes/mutations";
import { UploadImage } from "graphql-src/images/mutations";
// import UpdateSchemeDetails from '../../graphql/admin/mutations/UpdateSchemeDetails';
// import UploadImage from '../../graphql/images/mutations/uploadImages';
import { PageHeader } from "../global/typography";
import { Row, Section } from "../global/layout";
// import query from "../../graphql/admin/queries/SchemeDetails";
import { useStoreActions, useStoreState } from "../../state";

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  @media (min-width: 1024px) {
    background-color: none;
    padding: 0px 10px 20px;
  }
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 20px;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const EmptyLogo = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ImageIcon = styled(Image)`
  font-size: 54px;
  color: #ef5350;
`;
const LogoContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  text-align: center;
`;
const LogoImage = styled.img`
  max-height: 120px;
`;
const Clear = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const SchemeName = ({ history }) => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );
  const platform = useStoreState((state) => state.theme.platform);
  const schemeId = useStoreState((state) => state.scheme.id);

  // state
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState("");
  const [deleteLogo, setDeleteLogo] = useState(false);

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle("Scheme Details");
    // setNavbarAction("backLink");
    setBackLinkTo(`${APP_PREFIX_PATH}/scheme-settings`);
    return () => {
      setBottomNav(true);
      setTitle("");
      // setNavbarAction("default");
      setBackLinkTo("");
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { data, loading } = useQuery(Scheme, {
    variables: {
      where: {
        id: schemeId,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ scheme: { name, logo } }) => {
      setName(name);
      !!logo && setImage({ id: logo.id, url: logo.url });
    },
  });

  // mutations
  const [updateScheme] = useMutation(UpdateScheme);
  // const [uploadImage] = useMutation(UploadImage, {
  //   onCompleted: ({ uploadImage: { id, url } }) => {
  //     setImage({ id, url });
  //     setUploading(false);
  //   },
  // });

  // functions
  const handleChange = (value) => setName(value);

  const validate = () =>
    new Promise((resolve, reject) => {
      setNameError(!!name ? "" : "This field is required.");
      !!name ? resolve(true) : resolve(false);
    });

  const handleSave = async () => {
    const valid = await validate();
    if (!valid) return;

    updateScheme({
      variables: {
        where: {
          id: window.localStorage.getItem("currentScheme"),
        },
        data: {
          name: { set: name },
          logo: {
            // connect: !!image
            //   ? !!data.scheme.logo
            //     ? image.id !== data.scheme.logo.id
            //       ? { id: image.id }
            //       : undefined
            //     : { id: image.id }
            //   : undefined,
            ...(image && !deleteLogo ? { upload: { file: image } } : {}),
            ...(deleteLogo ? { delete: deleteLogo } : {}),
          },
        },
      },
    });

    history.push("/");
  };

  // const mobileUpload = async (data) => {
  //   setUploading(true);
  //   window.resolveLocalFileSystemURL(data, (fileEntry) => {
  //     fileEntry.file(function (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = async function (e) {
  //         await uploadImage({
  //           variables: {
  //             file: new Blob([this.result], { type: "image/jpeg" }),
  //             scheme: localStorage.getItem("currentScheme"),
  //           },
  //         });
  //         setUploading(false);
  //       };
  //       reader.readAsArrayBuffer(file);
  //     });
  //   });
  // };

  const handleUpload = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    // setUploading(true);
    validity.valid && setImage(file);
    // uploadImage({
    //   variables: {
    //     file,
    //     scheme: window.localStorage.getItem("currentScheme"),
    //     incident: { id: undefined },
    //   },
    // });
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {(matches) => (
        <Page>
          {matches ? (
            <Section width="100%" elevation={1}>
              <PageHeader>Scheme Details</PageHeader>
              <HeaderSubText>
                Changed the scheme name and upload a logo.
              </HeaderSubText>
            </Section>
          ) : (
            <Header>
              <HeaderText>Scheme Details</HeaderText>
              <HeaderSubText>
                Changed the scheme name and upload a logo.
              </HeaderSubText>
            </Header>
          )}
          <Section noPadding width="100%" elevation={1} grow>
            <Form>
              <Field>
                <FieldHeader>Scheme Name</FieldHeader>
                <TextField
                  id="name-input"
                  value={name}
                  onChange={(e) => handleChange(e.target.value)}
                  fullWidth
                  disabled={loading}
                  error={!!nameError}
                  helperText={nameError}
                />
              </Field>
              <Field>
                <FieldHeader>Scheme Logo</FieldHeader>
                {uploading ? (
                  <EmptyLogo>
                    <CircularProgress />
                    <EmptyText>Uploading Image...</EmptyText>
                  </EmptyLogo>
                ) : !!image ? (
                  <LogoContainer>
                    <LogoImage
                      src={
                        image.url ||
                        (image && !image.url
                          ? URL.createObjectURL(image)
                          : undefined)
                      }
                      alt="scheme logo"
                    />
                    <Clear>
                      <Button
                        onClick={() => {
                          setImage(null);
                          setDeleteLogo(true);
                        }}
                      >
                        Clear Image
                      </Button>
                    </Clear>
                  </LogoContainer>
                ) : (
                  <EmptyLogo>
                    <ImageIcon />
                    <EmptyText>No logo added yet.</EmptyText>
                    {platform === "" ? (
                      <WebAddImages
                        upload={handleUpload}
                        disabled={loading || uploading}
                      />
                    ) : (
                      <Button
                        onClick={() => {
                          !loading &&
                            !uploading &&
                            global.navigator.camera.getPicture(
                              (data) => null, // mobileUpload(data),
                              {
                                quality: 50,
                                destinationType:
                                  global.Camera.DestinationType.FILE_URI,
                                sourceType:
                                  global.Camera.PictureSourceType.PHOTOLIBRARY,
                                encodingType: global.Camera.EncodingType.JPEG,
                                mediaType: global.Camera.MediaType.PICTURE,
                                allowEdit: true,
                                correctOrientation: true,
                              }
                            );
                        }}
                        disabled={loading || uploading}
                        variant="contained"
                        color="primary"
                      >
                        Upload Logo
                      </Button>
                    )}
                  </EmptyLogo>
                )}
              </Field>
            </Form>
          </Section>
          {matches ? (
            <Section width="100%" elevation={1}>
              <Row row right>
                <BackButton
                  component={Link}
                  to={`${APP_PREFIX_PATH}/scheme-settings`}
                  disabled={loading || uploading}
                >
                  Cancel
                </BackButton>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={loading || uploading}
                >
                  Save Scheme
                </Button>
              </Row>
            </Section>
          ) : (
            <FullWidthButton
              text="Save Scheme"
              onClick={handleSave}
              disabled={loading || uploading}
            />
          )}
        </Page>
      )}
    </MediaQuery>
  );
};

export default SchemeName;
