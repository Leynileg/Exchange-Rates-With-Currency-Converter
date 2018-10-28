import * as React from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Converter from './Converter';
import * as styles from './style';
import PreloaderIcon from 'react-preloader-icon';
import Oval from 'react-preloader-icon/loaders/Oval';
import { colors } from './style/vars';
import { Container, Subscribe } from 'unstated';


export type CurrencyProps = {
  label: string;
  value: number;
  amount?: number;
};

export type AppContainerState = {
  selectedCurrency: CurrencyProps;
  list: CurrencyProps[];
  convertFrom: CurrencyProps[],
  convertTo: CurrencyProps,
};


export class AppContainer extends Container<AppContainerState> {
  state = {
    selectedCurrency: undefined,
    list: undefined,
    convertFrom: undefined,
    convertTo: undefined,
    converted: undefined,
  };

  getCurrencies = async () => {
    await fetch('https://api.exchangeratesapi.io/latest')
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        const array: CurrencyProps[] = Object.keys(obj.rates).map((el, i) => {
          return {
            label: el,
            value: obj.rates[el],
            amount: 0
          };
        }).concat({label: "EUR", amount: 0, value: 1 })
        this.setState({ list: array, convertFrom: [array[0]] });
      })
      .catch((err) => console.log(err));
  };
}

class App extends React.Component<RouteComponentProps<any, any>> {
  render() {
    return (
      <Subscribe to={[AppContainer]}>
        {(AppOps: AppContainer) => {
          if (!AppOps.state.list) {
            AppOps.getCurrencies();
            return (
              <PreloaderIcon
                loader={Oval}
                size={80}
                strokeWidth={8}
                strokeColor={colors.blue}
                duration={800}
                className={styles.Preloader}
              />
            );
          }

          return (
            <div className={styles.Container}>
              <Header />
              <Switch>
                <Route component={Home} exact path="/" />
                <Route component={Converter} exact path="/convert" />
              </Switch>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
export default withRouter(App);
