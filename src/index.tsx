import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'unstated'

import Root from './app/Root'
import './index.css'

const renderFunc = (Component: React.ComponentType<any>) =>
  render(
    <AppContainer>
      <Provider>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )

renderFunc(Root)

if (module.hot) {
  module.hot.accept('./app/Root', () => {
    const NewRoot = require('./app/Root').default
    renderFunc(NewRoot)
  })
}
