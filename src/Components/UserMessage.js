import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const UserMessage = ({msg, open, handleClose}) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
        <Alert onClose={handleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    )
}

export default UserMessage