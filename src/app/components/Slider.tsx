import * as React from 'react';
import * as styles from './style';
import { SliderBox } from './SliderBox';
import { CurrencyProps } from '../App';

type SliderProps = {
  list: CurrencyProps[];
};

export const Slider: React.StatelessComponent<SliderProps> = (props) => (
  <div className={styles.Slider}>
  <div className="content">
    {props.list.map((el, i) => <SliderBox label={el.label} value={el.value} key={i} />)}
  </div>
</div>
)
