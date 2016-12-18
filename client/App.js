import { Component, PropTypes } from 'react'
import styles from 'App.css'
import postJSON from 'machinery/postJSON'


export default class App extends Component {
  render () {
    return (
      <div className={styles.app}>
        <h1>Hello world</h1>
        <button onClick={() => this.toggle(false)}>Off</button>
        <button onClick={() => this.toggle(true)}>On</button>
      </div>
    )
  }

  toggle (state) {
    postJSON('/switch', { state })
    .then(res => { console.log(res) })
    .catch(res => { console.log(res) })
  }
}
