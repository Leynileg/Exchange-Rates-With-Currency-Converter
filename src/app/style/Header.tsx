import { style, media } from 'typestyle'
import { colors } from './vars'

export const Nav = style(
  {
    padding: '20px 8vw',
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9999,
    background: colors.blue,
  },
  media(
    { maxWidth: 568 },
    { flexDirection: 'column', paddingBottom: 40, textAlign: 'center' },
  ),
)

export const NavTitle = style({
  color: colors.white,
  fontWeight: 300,
  fontSize: 30,
})

export const NavLink = style({
  margin: 'auto 15px',
  transition: 'color 0.25s linear',
  color: colors.white,
  fontSize: 14,
  fontWeight: 400,

  $nest: {
    '&:hover': {
      color: colors.darkBlue,
    },

    '&:first-of-type': {
      marginLeft: 0,
    },

    '&:last-of-type': {
      marginRight: 0,
    },
  },
})
