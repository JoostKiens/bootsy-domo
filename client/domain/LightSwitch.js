import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import postJSON from 'machinery/postJSON'
import styles from './LightSwitch.css'
import { PropTypes, Component } from 'react'

export default class LightSwitch extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }

  state = {
    error: false,
    success: false
  }

  render () {
    const { id, label } = this.props
    const { error, success } = this.state
    const autoHideDuration =  3000

    const message = success === true
      ? `Toggled ${label} light`
      : 'Something went wrong'

    return (
      <div className={styles.main}>
        <h2 className={styles.label}>{label}</h2>
        <RaisedButton onTouchTap={() => this.toggle(id, false)} secondary={true} label='Off' className={styles.offButton} />
        <RaisedButton onTouchTap={() => this.toggle(id, true)} primary={true} label='On' />
        <Snackbar open={success || error} message={message} autoHideDuration={autoHideDuration} onRequestClose={() => {this.setState({ error: false, success: false }) }} />
      </div>
    )
  }

  toggle = (index, state) => {
    postJSON('/switch', { index, state })
      .then(this.handleResult)
      .catch(res => { console.log('error'); this.setState({ error: true, success: false }) })
  }

  handleResult = (result) => {
    this.setState({ error: !result.ok, success: result.ok })
  }
}
