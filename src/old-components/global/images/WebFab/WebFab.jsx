import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import { FileButton } from '../../actions';

const FAB = styled(Fab)`
  position: fixed !important;
  bottom: ${({ bottom }) => (bottom ? '15px' : '70px')};
  right: 10px;
`;
const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;

class WebFab extends PureComponent {
  constructor(props) {
    super(props);
    this.addImageButton = React.createRef();
  }

  render() {
    const { disabled, upload, bottom } = this.props;
    return (
      <div
        onChange={value => {
          upload(value);
          this.addImageButton.value = '';
        }}
      >
        <FileButton
          id="file-2"
          type="file"
          accept="image/*"
          multiple
          disabled={disabled}
          ref={ref => (this.addImageButton = ref)}
        />
        <FAB
          component="label"
          color="primary"
          aria-label="Add"
          disabled={disabled}
          htmlFor="file-2"
          bottom={bottom}
        >
          <Svg viewBox="0 0 24 24">
            <path
              fill="#FFFFFF"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </Svg>
        </FAB>
      </div>
    );
  }
}

export default WebFab;
