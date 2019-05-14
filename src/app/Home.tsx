import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import * as styles from './style'
import { Slider } from './components'
import { Subscribe } from 'unstated'
import { CurrencyProps } from './App'
import AppContainer from './containers'

class Home extends React.PureComponent<RouteComponentProps<any, any>> {
  render() {
    return (
      <Subscribe to={[AppContainer]}>
        {(AppOps: AppContainer) => {
          const { currencyList, selectedCurrency } = AppOps.state
          return (
            <section>
              <Slider list={[...currencyList, ...currencyList]} />
              <div className={styles.Row}>
                <div className={styles.Col}>
                  <div className={styles.CurrenciesList}>
                    <h3>Select Currency</h3>
                    <ul>
                      {currencyList.map((currency: CurrencyProps) => (
                        <li
                          key={`select_${currency.label}`}
                          className={
                            AppOps.state.selectedCurrency === currency
                              ? styles.SelectedCurrency
                              : ''
                          }
                          onClick={() =>
                            AppOps.setState({ selectedCurrency: currency })
                          }
                        >
                          {currency.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={styles.Col}>
                  <h2 className={styles.DisplayedCurrency}>
                    {!!selectedCurrency
                      ? `${selectedCurrency.label}: ${selectedCurrency.value}`
                      : 'Select Currency'}
                  </h2>
                </div>
              </div>
            </section>
          )
        }}
      </Subscribe>
    )
  }
}
export default withRouter(Home)
