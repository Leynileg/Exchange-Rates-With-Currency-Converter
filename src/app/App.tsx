import * as React from 'react'
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom'
import PreloaderIcon from 'react-preloader-icon'
import Oval from 'react-preloader-icon/loaders/Oval'
import { Subscribe } from 'unstated'

import Home from './Home'
import Header from './Header'
import Converter from './Converter'
import * as styles from './style'
import { colors } from './style/vars'
import AppContainer from './containers'

export type CurrencyProps = {
  label: string,
  value: number
  amount?: number
}

class App extends React.Component<RouteComponentProps<any, any>> {
  render() {
    return (
      <Subscribe to={[AppContainer]}>
        {(AppOps: AppContainer) => {
          if (!AppOps.state.currencyList) {
            AppOps.getCurrencies()
            return (
              <PreloaderIcon
                loader={Oval}
                size={80}
                strokeWidth={8}
                strokeColor={colors.blue}
                duration={800}
                className={styles.Preloader}
              />
            )
          }

          return (
            <div className={styles.Container}>
              <Header />
              <Switch>
                <Route component={Home} exact path="/" />
                <Route component={Converter} exact path="/convert" />
              </Switch>
            </div>
          )
        }}
      </Subscribe>
    )
  }
}
export default withRouter(App)
