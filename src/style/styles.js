export const formStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  titleField: {
    marginTop: 20,
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
    color: 'white',
    backgroundColor: 'coral',
  },
  buttonPost: {
    color: 'grey()',
    backgroundColor: 'lightblue',
  },
  buttonSave: {
    color: 'white',
    backgroundColor: 'green',
  },
  buttonCancel: {
    color: 'white',
    backgroundColor: 'red',
  },
});

export const styles = theme => ({
  paper: {
    maxWidth: '500px',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 16,
    marginTop: theme.spacing.unit * 3,
  },
  typographyTitle: {
    marginLeft: theme.spacing.unit * 3,
  },
});

