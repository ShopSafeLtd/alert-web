/* eslint-disable formatjs/no-literal-string-in-jsx */
import SignatureInput from '#/components/SignBox';
import SigSeal from '#/components/onboarding/Onboarding/SchemeTerms/SigSeal';
import FONT_FAMILIES from '#/components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Space, Tabs, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

interface Props {
  name: string;
  onChange?: (value: string) => void;
}

const MG11Sign = ({ name, onChange }: Props) => {
  const [tab, setTab] = useState('draw');
  const [file, setFile] = useState<{
    file: string;
    name: string;
  } | null>(null);
  const [sign, setSign] = useState('');
  const [selectedFont] = useState(FONT_FAMILIES[0]);

  useEffect(() => {
    if (onChange) onChange(sign);
  }, [sign]);
  const update = (value: string) => {
    setSign(value);
  };
  return (
    <>
      <Space
        direction="vertical"
        size={1}
        style={{ fontSize: 14, marginBottom: 15 }}
      >
        This statement is true to the best of my knowledge and belief and I make
        it knowing that, if it is tendered in evidence, I shall be liable to
        prosecution if I have wilfully stated in it anything which I know to be
        false or do not believe to be true.
      </Space>
      <Tabs
        activeKey={tab}
        destroyInactiveTabPane
        onChange={(tabKey) => {
          setTab(tabKey);
          if (tabKey === 'upload' && file?.file) {
            setSign('');

            update(
              ReactDOMServer.renderToString(
                <img
                  alt="file"
                  height={100}
                  src={`data:application/pdf;base64,${file?.file}`}
                  width={300}
                />
              )
            );
          }
          if (tabKey === 'generate') {
            setSign('');
            update(
              ReactDOMServer.renderToString(
                <SigSeal
                  font={selectedFont}
                  height={100}
                  key={selectedFont}
                  name={name}
                  width={300}
                />
              )
            );
          }
          if (tabKey === 'draw') {
            update('');
          }
        }}
        style={{ height: 250, width: 500 }}
        type="card"
      >
        {/* <Tabs.TabPane tab="Generate" key="generate">*/}
        {/*  <Select*/}
        {/*    style={{*/}
        {/*      fontFamily: selectedFont,*/}
        {/*      marginBottom: 20,*/}
        {/*    }}*/}
        {/*    defaultValue={selectedFont}*/}
        {/*    onChange={(value) => {*/}
        {/*      setSelectedFont(value);*/}
        {/*      update(*/}
        {/*        ReactDOMServer.renderToString(*/}
        {/*          <SigSeal*/}
        {/*            key={selectedFont}*/}
        {/*            name={name}*/}
        {/*            font={selectedFont}*/}
        {/*            height={100}*/}
        {/*            width={300}*/}
        {/*          />*/}
        {/*        )*/}
        {/*      );*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {FONT_FAMILIES.map((font) => (*/}
        {/*      <Select.Option*/}
        {/*        key={font}*/}
        {/*        value={font}*/}
        {/*        style={{*/}
        {/*          fontFamily: font,*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {name}*/}
        {/*      </Select.Option>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*  <SigSeal*/}
        {/*    key={selectedFont}*/}
        {/*    name={name}*/}
        {/*    font={selectedFont}*/}
        {/*    height={100}*/}
        {/*    width={300}*/}
        {/*  />*/}
        {/* </Tabs.TabPane>*/}
        <Tabs.TabPane key="draw" tab="Draw">
          <SignatureInput
            hidden={false}
            onChange={(val: string) => {
              setSign(val);
            }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="upload" tab="Upload">
          <>
            <Upload
              beforeUpload={(f) => {
                const reader = new FileReader();
                reader.addEventListener('load', (e) => {
                  if (e.target) {
                    const base64File = e.target.result;
                    if (typeof base64File === 'string') {
                      const base64result = base64File.split(',')[1];

                      setFile({
                        file: base64result,
                        name: f.name,
                      });
                      update(
                        ReactDOMServer.renderToString(
                          <img
                            alt="file"
                            height={100}
                            src={`data:application/pdf;base64,${base64result}`}
                            width={300}
                          />
                        )
                      );
                    }
                  }
                });
                reader.readAsDataURL(f);
                // Prevent upload
                return false;
              }}
              showUploadList={false}
            >
              <Button key="uploadButton" type="primary">
                <FontAwesomeIcon
                  icon={faFileUpload}
                  style={{ fontSize: 16, marginRight: '10px' }}
                />
                Upload
              </Button>
            </Upload>
            {file && (
              <div style={{ paddingLeft: 10, paddingTop: 10 }}>
                <img
                  alt="file"
                  height={100}
                  src={`data:application/pdf;base64,${file.file}`}
                  width={300}
                />
              </div>
            )}
          </>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default MG11Sign;
