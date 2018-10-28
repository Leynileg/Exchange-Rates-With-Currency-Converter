import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as styles from './style';
import { Subscribe } from 'unstated';
import { AppContainer } from './App';
import { ConverterBox } from './components';
import Select from 'react-select';

class Converter extends React.PureComponent<RouteComponentProps<any, any>> {
  render() {
    return (
      <Subscribe to={[AppContainer]}>
        {(AppOps: AppContainer) => {
          const { list, convertFrom, convertTo } = AppOps.state;
          let converted: number = null;
          if (convertFrom.find((e) => e.amount) && convertTo) {
            convertFrom.forEach((el) => {
              converted = converted + +((convertTo.value / el.value) * el.amount).toFixed(4);
            });
          }
          return (
            <section className={styles.ConverterSection}>
              <ul>
                {convertFrom.map((el, i) => (
                  <ConverterBox
                    defaultValue={list[i]}
                    key={i}
                    firstBox={i === 0 ? true : false}
                    onInputChange={(input) => {
                      AppOps.setState({
                        convertFrom: convertFrom.map(
                          (obj, ind) =>
                            ind === i ? { ...obj, amount: +input.currentTarget.value } : obj
                        )
                      });
                    }}
                    list={list}
                    onSelectChange={(selected) => {
                      AppOps.setState({
                        convertFrom: convertFrom.map(
                          (obj, ind) => (ind === i ? { ...selected, amount: obj.amount } : obj)
                        )
                      });
                    }}
                    onButtonClick={() =>
                      AppOps.setState((prevState) => {
                        return {
                          convertFrom:
                            i === 0
                              ? prevState.convertFrom.concat({
                                  label: list[i].label,
                                  value: list[i].value,
                                  amount: 0
                                })
                              : prevState.convertFrom.filter((obj, objIndex) => objIndex !== i)
                        };
                      })
                    }
                  />
                ))}
              </ul>
              <div className={styles.ConvertToBox}>
                Convert to:{' '}
                <Select
                  className={styles.ConvertToSelect}
                  options={list}
                  onChange={(e) => AppOps.setState({ convertTo: e })}
                />
              </div>
              {convertTo && (
                <h2>
                  {converted} {convertTo.label}
                </h2>
              )}
            </section>
          );
        }}
      </Subscribe>
    );
  }
}
export default withRouter(Converter);
