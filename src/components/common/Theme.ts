import { createTheme } from '@mui/material';
import { blueGrey, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    secondary: {
      main: blueGrey['500']
    },
    error: {
      main: red.A200
    }
  }
});
