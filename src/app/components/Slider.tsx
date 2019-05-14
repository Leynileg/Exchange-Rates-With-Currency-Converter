import * as React from 'react'

import { CurrencyProps } from '../App'
import * as styles from './style'
import SliderBox from './SliderBox'

type SliderProps = {
  list: CurrencyProps[]
}

const Slider: React.StatelessComponent<SliderProps> = ({ list }) => (
  <div className={styles.Slider}>
    <div className="content">
      {list.map(({ label, value }, index) => (
        <SliderBox {...{ label, value }} key={`slider_${label}_${index}`} />
      ))}
    </div>
  </div>
)

export default Slider
