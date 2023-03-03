export interface Theme {
  componentBackground: string;
  itemHoverBackground: string;
  itemSelectedBackground: string;
  bodyBackground: string;
  borderColor: string;
  imageBackgroundColor: string;
}

const theme = {
  dark: {
    componentBackground: '#283142',
    itemHoverBackground: 'rgb(60, 67, 84)',
    itemSelectedBackground: 'rgb(60, 67, 84)',
    bodyBackground: '#1b2531',
    borderColor: '#4d5b75',
    imageBackgroundColor: 'rgb(59, 73, 98)',
  },
  light: {
    componentBackground: '#FFF',
    itemHoverBackground: '#fafafb',
    itemSelectedBackground: '#fafafb',
    bodyBackground: '#fafafb',
    borderColor: 'rgb(237, 242, 249)',
    imageBackgroundColor: '#ECEFF1',
  },
};

export default theme;
