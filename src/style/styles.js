import globalTheme from './globalTheme';

export const formStyle = theme => ({
  fieldContainer: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    margin: `0 -${theme.spacing.unit * 3}px`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  field: {
    flex: 1,
    margin: `0 ${theme.spacing.unit * 3}px`,
    minWidth: 200,
    flexGrow: 1,
    flexBasis: 0,
    marginBottom: theme.spacing.unit * 3,
  },
  formRoot: {
    padding: theme.spacing.unit * 3,
  },
  sliderHeader: {
    marginBottom: theme.spacing.unit * 2,
  },
  buttonContainer: {
    marginTop: theme.spacing.unit,
    marginLeft: -theme.spacing.unit * 3,
    marginBottom: -theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  checkbox: {
    marginLeft: -11,
  },
});

export const dialogStyles = theme => ({
  dialogButton: {
    flexGrow: 1,
    margin: `0 ${theme.spacing.unit}px`,
  },
  dialogContentContainer: {
    padding: theme.spacing.unit * 3,
    paddingTop: 0,
  },
  dialogActions: {
    margin: `0 -${theme.spacing.unit}px`,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 2 * theme.spacing.unit,
  },
});

export const styles = theme => ({
  paper: {
    maxWidth: '500px',
    minWidth: '400px',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 16,
    marginTop: theme.spacing.unit * 3,
  },
  invisiblePaper: {
    margin: 'auto',
    maxWidth: '500px',
    minWidth: '400px',
    paddingTop: '16px',
  },
  typographyTitle: {
    marginLeft: theme.spacing.unit * 3,
  },
  flexContainer: {
    display: 'flex',
  },
  masterPaper: {
    height: '100%',
    maxWidth: 1080,
    margin: 'auto',
    backgroundColor: 'whitesmoke',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  loginScreenRoot: {
    background: 'white',
    height: '100vh',
    padding: theme.spacing.unit * 3,
  },
  main: {
    height: 'calc(100% - 48px)',
  },
  progress: {
    marginTop: '32px',
  },
  typographyEmptyList: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  invisible: {
    visibility: 'hidden',
  },
  iconStyle: {
    color: 'white',
  },
  backButton: {
    marginRight: theme.spacing.unit,
    marginTop: '-20px',
    marginBottom: '-20px',
  },
  postDetailDialog: {
    minWidth: '300px',
  },
  dialogContent: {
    paddingTop: '0px',
  },
  sideSection: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  flexCenter: {
    alignItems: 'center',
  },
  flexJustifyContentCenter: {
    justifyContent: 'center',
  },
  participantsSubheader: {
    lineHeight: 1,
    marginBottom: theme.spacing.unit,
  },
  spaceAbove: {
    marginTop: theme.spacing.unit,
  },
  spaceLeft: {
    paddingLeft: 3 * theme.spacing.unit,
  },
});

export const menuBarStyles = theme => ({
  root: {
    backgroundColor: globalTheme.palette.primary.main,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexItemLeft: {
    flexGrow: 0.6,
  },
  menuBar: {
    color: globalTheme.palette.common.white,
    flexGrow: 2,
  },
  flexLogout: {
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: theme.spacing.unit,
  },
  logoutButton: {
    color: 'white',
    borderColor: globalTheme.palette.common.white,
  },
});

export const homeStyles = theme => ({
  homeRoot: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  mapRoot: {
    flex: '1 1',
    display: 'flex',
    minHeight: '150px',
  },
  map: {
    flex: 1,
    position: 'relative',
  },
  editRoot: {
  },
  matchesButton: {
    background: globalTheme.palette.primary.main,
    color: globalTheme.palette.common.white,
    marginBottom: 5,
  },
  popup: {
    textAlign: 'center',
  },
  popupDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexContainer: {
    display: 'flex',
  },
  spaceAbove: {
    marginTop: theme.spacing.unit,
  },
  PostButton: {
    background: globalTheme.palette.secondary.main,
    color: globalTheme.palette.common.white,
    marginBottom: 5,
  },
  spaceUnder: {
    marginBottom: 3 * theme.spacing.unit,
  },
  flexChild: {
    flexGrow: 1,
    flexBasis: 0,
  },
});

