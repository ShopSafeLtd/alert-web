import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const Page = styled.div`
  width: 100%;
  flex: 1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const pulseRing = keyframes`
  0% {
    transform: scale(.8);
  }
  80%, 100% {
    opacity: 0;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  &:before {
    content: '';
    position: relative;
    display: block;
    width: 150%;
    height: 150%;
    box-sizing: border-box;
    border-radius: 100%;
    margin-top: -25%;
    margin-left: -25%;
    background-color: #ffcdd2;
    animation: ${pulseRing} 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 100%;
    background-color: #fff;
  }
`;

const Img = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

class LoggingIn extends Component {
  render() {
    return (
      <Page>
        <ImgContainer>
          <Img
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1122.52 1122.52"
            height="1122.52"
            width="1122.52"
            id="svg2"
            version="1.1"
          >
            <defs id="defs6">
              <clippath id="clipPath18" clipPathUnits="userSpaceOnUse">
                <path id="path16" d="M 0,841.89 H 841.89 V 0 H 0 Z" />
              </clippath>
            </defs>
            <g transform="matrix(1.3333333,0,0,-1.3333333,0,1122.52)" id="g10">
              <g id="g12">
                <g clip-path="url(#clipPath18)" id="g14">
                  <g transform="translate(817.6133,420.9453)" id="g20">
                    <path
                      id="path22"
                      style={{
                        fill: 'none',
                        stroke: '#e6292a',
                        strokeWidth: 22,
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        strokeDasharray: 'none',
                        strokeOpacity: 1
                      }}
                      d="m 0,0 c 0,-219.076 -177.596,-396.671 -396.67,-396.671 -219.076,0 -396.672,177.595 -396.672,396.671 0,219.074 177.596,396.67 396.672,396.67 C -177.596,396.67 0,219.074 0,0 Z"
                    />
                  </g>
                  <g transform="translate(591.4453,671.8604)" id="g24">
                    <path
                      id="path26"
                      style={{
                        fill: '#e6292a',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none'
                      }}
                      d="m 0,0 c 0,0 -90,17 -163,-43 -66.371,-54.553 -73,-138 -73,-210 0,-72 -9,-87 -30,-108 -21,-21 -75,-15 -75,-15 v -92 c 0,0 77.686,-3.457 116,45 34,43 38,101 38,173 0,72 13.555,144.57 42,182 38,50 69,64 145,68"
                    />
                  </g>
                  <g transform="translate(250.4414,170.0303)" id="g28">
                    <path
                      id="path30"
                      style={{
                        fill: '#e6292a',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none'
                      }}
                      d="m 0,0 c 0,0 90,-17 163,43 66.371,54.551 73,138 73,210 0,72 9,87 30,108 21,21 75,15 75,15 v 92 c 0,0 -77.686,3.455 -116,-45 C 191,380 187,322 187,250 187,178 173.445,105.428 145,68 107,18 76,4 0,0"
                    />
                  </g>
                </g>
              </g>
            </g>
          </Img>
        </ImgContainer>
      </Page>
    );
  }
}

export default LoggingIn;
