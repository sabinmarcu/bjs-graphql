import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  props: {
    MuiFormControl: {
      fullWidth: true,
    },
  },
  overrides: {
    MuiCard: {
      root: {
        marginTop: 25,
      },
    },
  },
});
