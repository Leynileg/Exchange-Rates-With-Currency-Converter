import { style, media, classes } from 'typestyle'
import { colors } from './vars'

export const Preloader = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

export const Container = style(
  {
    background: colors.lightGray,
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  media({ maxWidth: 768 }, { width: 'auto', minHeight: '100%' }),
)

export const Row = style(
  {
    width: '100%',
    padding: '0 8vw',
    display: 'flex',
    flexDirection: 'row',
  },
  media({ maxWidth: 768 }, { flexDirection: 'column' }),
)

export const Col = style(
  {
    display: 'flex',
    width: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  media({ maxWidth: 768 }, { width: '100%' }),
)

export const Col3 = classes(Col, style({ width: '33%', margin: '0 auto' }))
