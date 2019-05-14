import { style, classes, media } from 'typestyle'
import { colors } from '../../style/vars'

export const flexCentered = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const ConverterBox = classes(
  flexCentered,
  style(
    {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: 550,
      marginBottom: 20,
    },
    media({ maxWidth: 568 }, { flexDirection: 'column', width: '100%' }),
    media({ minWidth: 568, maxWidth: 768 }, { width: 520 }),
  ),
)

export const ConverterBoxInput = style({
  width: 200,
  height: 38,
  borderRadius: 3,
  border: `1px solid ${colors.gray}`,
  transition: '0.25s ease-out',
  fontSize: 16,

  $nest: {
    '&:focus': {
      border: `1px solid ${colors.blue}`,
    },
  },
})

export const ConverterBoxSelect = style(
  {
    width: 200,
  },
  media({ maxWidth: 568 }, { margin: '10px auto', width: '100%' }),
)

export const ConverterBoxButton = classes(
  flexCentered,
  style({
    width: 75,
    height: 36,
    background: colors.white,
    border: `1px solid ${colors.blue}`,
    cursor: 'pointer',
    transition: '0.25s ease-out',
    borderRadius: 3,

    $nest: {
      '&:hover': {
        background: colors.blue,
        color: colors.white,
        fontWeight: 'bold',
      },
    },
  }),
)
