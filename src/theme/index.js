import { CssBaseline } from '@mui/material';
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { grey, orange, red, blue, green, yellow } from '@mui/material/colors';

const PRIMARY = {
  lighter: blue[500],
  light: blue[600],
  main: blue[700],
  dark: blue[800],
  darker: blue[900],
  contrastText: '#FFF',
};
const SECONDARY = {
  lighter: orange[300],
  light: orange[400],
  main: orange[500],
  dark: orange[600],
  darker: orange[700],
  contrastText: '#000',
};
const SUCCESS = {
  lighter: green[300],
  light: green[400],
  main: green[500],
  dark: green[600],
  darker: green[700],
  contrastText: '#000',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      grey: GREY,
      text: {
        primary: GREY[800],
        secondary: SECONDARY['contrastText'],
        disabled: GREY[500],
      },
      background: {
        paper: alpha(GREY[500], 0.9),
        default: GREY[200],
        neutral: GREY[200],
      },
      action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    shape: { borderRadius: 8 },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 960,
        lg: 1390,
        xl: 1635,
      },
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
