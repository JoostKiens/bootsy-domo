import 'global.css'
import App from './App'
import PromisePolyfill from 'promise-polyfill'
import Router from 'react-router/BrowserRouter'
import config from 'config'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

renderApp(App)

function renderApp (MaybeApp) {
  const app = (
    <AppContainer>
      <Router>
        <App />
      </Router>
    </AppContainer>
  )
  render(app, document.querySelector('#domo-app'))
}

if (module.hot) {
  module.hot.accept('./App', () => renderApp(require('./App')))
}
