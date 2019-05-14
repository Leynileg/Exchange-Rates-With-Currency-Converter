import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Select from 'react-select'
import { Subscribe } from 'unstated'

import * as styles from './style'
import { ConverterBox } from './components'
import AppContainer from './containers'

class Converter extends React.PureComponent<RouteComponentProps<any, any>> {
  render() {
    return (
      <Subscribe to={[AppContainer]}>
        {(AppOps: AppContainer) => {
          const { currencyList, convertFrom, convertTo } = AppOps.state
          let converted: number = null
          if (convertFrom.find(e => e.amount) && !!convertTo) {
            convertFrom.forEach(({ value, amount }) => {
              converted =
                converted + +((convertTo.value / value) * amount).toFixed(4)
            })
          }

          return (
            <section className={styles.ConverterSection}>
              <ul>
                {convertFrom.map(({ label }, index) => (
                  <ConverterBox
                    defaultValue={currencyList[index]}
                    key={`${label}_${index}`}
                    firstBox={index === 0}
                    onInputChange={input =>
                      AppOps.onInputChange({ input, index })
                    }
                    list={currencyList}
                    onSelectChange={selected =>
                      AppOps.onSelectChange({ selected, index })
                    }
                    onButtonClick={(): void => {
                      if (index === 0) {
                        const hasLeftCurrencies: boolean =
                          currencyList.length > convertFrom.length + 1
                        hasLeftCurrencies && AppOps.addNewConverFrom()
                      } else {
                        AppOps.removeConvertFromItem({ label })
                      }
                    }}
                  />
                ))}
              </ul>
              <div className={styles.ConvertToBox}>
                Convert to:{' '}
                <Select
                  className={styles.ConvertToSelect}
                  options={currencyList}
                  onChange={value => AppOps.setState({ convertTo: value })}
                />
              </div>
              {!!convertTo && (
                <h2>
                  {converted} {convertTo.label}
                </h2>
              )}
            </section>
          )
        }}
      </Subscribe>
    )
  }
}
export default withRouter(Converter)
