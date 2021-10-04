import { createTheme } from '@mui/material';
import { blue, blueGrey, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: blue['700']
    },
    secondary: {
      main: blueGrey['900']
    },
    error: {
      main: red.A200
    },
    action: {
      selectedOpacity: 0.09
    }
  }
});
