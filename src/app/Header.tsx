import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import * as styles from './style';

class AppContainer extends React.PureComponent<RouteComponentProps<any, any>> {
  render() {
    const {
      location: { pathname }
    } = this.props;

    let title: string = pathname === '/' ? 'Exchange Rates' : 'Currency Conventer';

    return (
      <header>
        <nav>
          <ul className={styles.Nav}>
            <li>
              <h1 className={styles.NavTitle}>{title}</h1>
            </li>
            <li>
              <Link className={styles.NavLink} to="/">
                CURRENCIES
              </Link>
              <Link className={styles.NavLink} to="/convert">
                CONVERTER
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
export default withRouter(AppContainer);
