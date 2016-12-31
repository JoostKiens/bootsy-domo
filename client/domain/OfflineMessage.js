import Snackbar from 'material-ui/Snackbar'
import { PropTypes } from 'react'

OfflineMessage.propTypes = {
  open: PropTypes.bool.isRequired
}

export default function OfflineMessage ({ open }) {
  return <Snackbar message='You are offline' open={open} />
}
