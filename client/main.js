import 'global.css'
import App from './App'
import PromisePolyfill from 'promise-polyfill'
import Router from 'react-router/BrowserRouter'
import config from 'config'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

renderApp(App)
window.addEventListener('online', () => renderApp(App))
window.addEventListener('offline', () => renderApp(App))

function renderApp (MaybeApp) {
  const app = (
    <AppContainer>
      <Router>
        <App isOnline={navigator.onLine} />
      </Router>
    </AppContainer>
  )
  render(app, document.querySelector('#domo-app'))
}

if (module.hot) {
  module.hot.accept('./App', () => renderApp(require('./App')))
}
