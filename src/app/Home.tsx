import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as styles from './style';
import { Slider } from './components';
import { Subscribe } from 'unstated';
import { AppContainer } from './App';

class Home extends React.PureComponent<RouteComponentProps<any, any>> {
  render() {
    return (
      <Subscribe to={[AppContainer]}>
        {(AppOps: AppContainer) => {
          const { list, selectedCurrency } = AppOps.state;
          return (
            <section>
              <Slider list={[...list, ...list]} />
              <div className={styles.Row}>
                <div className={styles.Col}>
                  <div className={styles.CurrenciesList}>
                    <h3>Select Currency</h3>
                    <ul>
                      {list.map((el, i) => (
                        <li
                          key={i}
                          className={
                            AppOps.state.selectedCurrency === el ? styles.SelectedCurrency : ''
                          }
                          onClick={() => AppOps.setState({ selectedCurrency: el })}
                        >
                          {el.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={styles.Col}>
                  <h2 className={styles.DisplayedCurrency}>
                    {selectedCurrency
                      ? `${selectedCurrency.label}: ${selectedCurrency.value}`
                      : 'Select Currency'}
                  </h2>
                </div>
              </div>
            </section>
          );
        }}
      </Subscribe>
    );
  }
}
export default withRouter(Home);
