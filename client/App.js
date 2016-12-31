import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import OffLineMessage from 'domain/OffLineMessage'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import styles from 'App.css'
import { Component, PropTypes } from 'react'
import { deepOrange500, limeA400 } from 'material-ui/styles/colors'
import LightSwitch from 'domain/LightSwitch'

export default class App extends Component {
  static propTypes = {
    isOnline: PropTypes.bool.isRequired
  }

  render () {
    const { isOnline } = this.props
    const muiTheme = getMuiTheme({
      palette: {
        accent1Color: deepOrange500,
        accent2Color: limeA400
      }
    })

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.main}>
          <AppBar title='Bootsy Domo' showMenuIconButton={false} />
          <Paper className={styles.paper}>
            <LightSwitch label='Kitchen' id={1} />
            <LightSwitch label='Dining Room' id={1} />
          </Paper>
          <OffLineMessage open={!isOnline} />
        </div>
      </MuiThemeProvider>
    )
  }
}
