export interface Theme {
  componentBackground: string;
  itemHoverBackground: string;
  itemSelectedBackground: string;
  bodyBackground: string;
  borderColor: string;
  imageBackgroundColor: string;
  gradientBackground: string;
  logo: string;
  colorScheme: string;
}

const theme: {
  dark: Theme;
  light: Theme;
} = {
  dark: {
    componentBackground: '#283142',
    itemHoverBackground: 'rgb(60, 67, 84)',
    itemSelectedBackground: 'rgb(60, 67, 84)',
    bodyBackground: '#1b2531',
    borderColor: '#4d5b75',
    imageBackgroundColor: 'rgb(59, 73, 98)',
    gradientBackground: 'linear-gradient(90deg, #4c5c78 0%, #2b3a57 60%)',
    logo: 'url(/img/light-logo.svg)',
    colorScheme: 'dark',
  },
  light: {
    componentBackground: '#FFF',
    itemHoverBackground: '#fafafb',
    itemSelectedBackground: '#fafafb',
    bodyBackground: '#fafafb',
    borderColor: 'rgb(237, 242, 249)',
    imageBackgroundColor: '#ECEFF1',
    gradientBackground: 'linear-gradient(to right, #cb2d3e, #ef473a)',
    logo: 'url(/img/dark-logo.svg)',
    colorScheme: 'light',
  },
};

export default theme;
