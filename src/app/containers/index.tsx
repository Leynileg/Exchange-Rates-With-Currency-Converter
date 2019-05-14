import { Container } from 'unstated'
import { CurrencyProps } from '../App'

export type AppContainerState = {
  selectedCurrency: CurrencyProps
  currencyList: CurrencyProps[]
  convertFrom: CurrencyProps[]
  convertTo: CurrencyProps
}

class AppContainer extends Container<AppContainerState> {
  state = {
    selectedCurrency: undefined,
    currencyList: undefined,
    convertFrom: undefined,
    convertTo: undefined,
  }

  getCurrencies = async (): Promise<void> => {
    await fetch('https://api.exchangeratesapi.io/latest')
      .then(res => res.json())
      .then(({ rates }) => {
        const array: CurrencyProps[] = Object.keys(rates)
          .map(elem => {
            return {
              label: elem,
              value: rates[elem],
              amount: 0,
            }
          })
          .concat({ label: 'EUR', amount: 0, value: 1 })
        this.setState({ currencyList: array, convertFrom: [array[0]] })
      })
      .catch(err => console.log(err))
  }

  addNewConverFrom = (): Promise<void> =>
    this.setState((prevState: AppContainerState) => ({
      convertFrom: prevState.convertFrom.concat({
        label: this.state.currencyList[prevState.convertFrom.length].label,
        value: this.state.currencyList[prevState.convertFrom.length].value,
        amount: 0,
      }),
    }))

  removeConvertFromItem = (label): Promise<void> =>
    this.setState(prevState => ({
      convertFrom: prevState.convertFrom.filter(
        listItem => listItem.label !== label,
      ),
    }))

  onInputChange = ({ index, input }): Promise<void> =>
    this.setState({
      convertFrom: this.state.convertFrom.map(
        (currency, fromIndex) =>
          fromIndex === index
            ? {
                ...currency,
                amount: +input.currentTarget.value,
              }
            : currency,
      ),
    })

  onSelectChange = ({ selected, index }): Promise<void> =>
    this.setState({
      convertFrom: this.state.convertFrom.map(
        (currency, prevItemIndex) =>
          prevItemIndex === index
            ? { ...selected, amount: currency.amount }
            : currency,
      ),
    })
}

export default AppContainer
