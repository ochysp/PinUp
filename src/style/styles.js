import globalTheme from './globalTheme';

export const formStyle = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  titleField: {
    marginTop: 20,
    width: 200,
  },
  descriptionField: {
    width: 200,
  },
  categoryField: {
    marginBottom: 20,
    width: 200,
  },
  menu: {
    width: 200,
  },
  slider: {
    width: 200,
  },
  grid: {
    marginLeft: theme.spacing.unit + 10,
    marginRight: theme.spacing.unit + 10,
  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonPin: {
    width: '60%',
    background: globalTheme.palette.primary.main,
    color: 'white',
  },
  buttonPost: {
    width: '60%',
    background: globalTheme.palette.secondary.main,
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
  mapRoot: {
    height: '100%',
  },
  map: {
    height: '100%',
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
  menuBar: {
    backgroundColor: globalTheme.palette.primary.main,
    color: globalTheme.palette.common.white,
  },
  logoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 5,
  },
  logoutButton: {
    color: 'white',
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
  popup: {
    textAlign: 'center',
  },
  popupDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  matchesButton: {
    background: globalTheme.palette.primary.main,
    color: globalTheme.palette.common.white,
    marginBottom: 5,
  },
  editButton: {

  },
  deleteButton: {

  },
  PostButton: {
    background: globalTheme.palette.secondary.main,
    color: globalTheme.palette.common.white,
    marginBottom: 5,
  },
  spaceAbove: {
    marginTop: theme.spacing.unit,
  },
  spaceLeft: {
    paddingLeft: 3 * theme.spacing.unit,
  },
  spaceUnder: {
    marginBottom: 3 * theme.spacing.unit,
  },
});
