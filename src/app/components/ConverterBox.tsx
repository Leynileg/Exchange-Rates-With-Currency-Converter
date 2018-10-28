import * as React from 'react';
import * as styles from './style';
import Select from 'react-select';
import { CurrencyProps } from '../App';

type ConverterBoxProps = {
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  list: Array<CurrencyProps>;
  onSelectChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  onButtonClick: React.MouseEventHandler;
  firstBox: boolean;
  defaultValue: CurrencyProps
};

export const ConverterBox: React.StatelessComponent<ConverterBoxProps> = (props) => (
  <li className={styles.ConverterBox}>
    <input type="number" className={styles.ConverterBoxInput} onChange={props.onInputChange} />
    <Select
      defaultValue={props.defaultValue}
      className={styles.ConverterBoxSelect}
      options={props.list}
      onChange={props.onSelectChange}
    />
    <div className={styles.ConverterBoxButton} onClick={props.onButtonClick}>
      {props.firstBox ? 'Add' : 'Remove'}{' '}
    </div>
  </li>
);
