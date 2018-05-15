import { createMuiTheme } from 'material-ui/styles/index';

const globalTheme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#f16254',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      main: '#fbb03b',
    },
  },
});

export default globalTheme;

