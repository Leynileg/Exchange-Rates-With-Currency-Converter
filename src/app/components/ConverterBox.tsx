import * as React from 'react'
import Select from 'react-select'

import * as styles from './style'
import { CurrencyProps } from '../App'

type ConverterBoxProps = {
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void
  list: Array<CurrencyProps>
  onSelectChange: (e: React.FormEvent<HTMLSelectElement>) => void
  onButtonClick: React.MouseEventHandler
  firstBox: boolean
  defaultValue: CurrencyProps
}

const ConverterBox: React.StatelessComponent<ConverterBoxProps> = ({
  onInputChange,
  defaultValue,
  list,
  onSelectChange,
  onButtonClick,
  firstBox,
}) => (
  <li className={styles.ConverterBox}>
    <input
      type="number"
      className={styles.ConverterBoxInput}
      onChange={onInputChange}
    />
    <Select
      defaultValue={defaultValue}
      className={styles.ConverterBoxSelect}
      options={list}
      onChange={onSelectChange}
    />
    <div className={styles.ConverterBoxButton} onClick={onButtonClick}>
      {firstBox ? 'Add' : 'Remove'}
    </div>
  </li>
)

export default ConverterBox
