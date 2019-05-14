import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'

class Root extends React.Component<any,any> {
  render() {
    return (
      <Router>
        <div id="routing">
          <Switch>
            <Route component={App} path="/" />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default Root