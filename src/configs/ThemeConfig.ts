export interface Theme {
  primary: string;
  primaryLight: string;
  componentBackground: string;
  cardSubsectionBackground: string;
  itemHoverBackground: string;
  itemSelectedBackground: string;
  bodyBackground: string;
  borderColor: string;
  imageBackgroundColor: string;
  gradientBackground: string;
  logo: string;
  colorScheme: string;
  hoverBackground: string;
  headerColor: string;
  secondaryText: string;
}

const theme: {
  dark: Theme;
  light: Theme;
} = {
  dark: {
    primary: 'rgb(222, 68, 54)',
    primaryLight: '#ff6b72',
    componentBackground: '#283142',
    itemHoverBackground: 'rgb(60, 67, 84)',
    itemSelectedBackground: 'rgb(60, 67, 84)',
    bodyBackground: '#1b2531',
    borderColor: '#4d5b75',
    imageBackgroundColor: 'rgb(59, 73, 98)',
    gradientBackground: 'linear-gradient(90deg, #4c5c78 0%, #2b3a57 60%)',
    logo: 'url(/img/light-logo.svg)',
    colorScheme: 'dark',
    hoverBackground: 'rgb(92, 102, 123)',
    headerColor: '#FFF',
    secondaryText: 'rgb(114, 132, 154)',
    cardSubsectionBackground: 'rgb(37, 44, 57)',
  },
  light: {
    primary: 'rgb(222, 68, 54)',
    primaryLight: '#ff6b72',
    componentBackground: '#FFF',
    itemHoverBackground: '#fafafb',
    itemSelectedBackground: '#fafafb',
    bodyBackground: '#fafafb',
    borderColor: 'rgb(237, 242, 249)',
    imageBackgroundColor: '#ECEFF1',
    gradientBackground: 'linear-gradient(to right, #cb2d3e, #ef473a)',
    logo: 'url(/img/dark-logo.svg)',
    colorScheme: 'light',
    hoverBackground: 'rgba(0, 0, 0, 0.018)',
    headerColor: '#1a3353',
    secondaryText: 'rgb(114, 132, 154)',
    cardSubsectionBackground: '#f3f3f3',
  },
};

export default theme;
