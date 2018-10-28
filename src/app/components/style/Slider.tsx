import { style, keyframes, media } from 'typestyle';
import { colors } from '../../style/vars';
const list: any = new Array(32).fill(0);

const AnimationSpeed = '120s';
const Scroll = keyframes({
  '0%': { transform: `translateX(0)` },
  '100%': { transform: `translateX(calc(-300px * ${list.length / 2}))` }
});

export const Slider = style(
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: colors.darkerBlue,
    height: 100,
    margin: 'auto auto 100px',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',

    $nest: {
      '&::before, &::after': {
        background: `linear-gradient(to right, ${colors.darkerBlue} 0%, rgba(38, 59, 96, 0) 100%)`,
        content: '""',
        height: 100,
        position: 'absolute',
        width: 200,
        zIndex: 2
      },

      '&::before': {
        left: 0,
        top: 0
      },

      '&::after': {
        right: 0,
        top: 0,
        transform: 'rotateZ(180deg)'
      },

      '.content': {
        animation: `${Scroll} ${AnimationSpeed} linear infinite`,
        display: `flex`
      },

      '.item': {
        height: 100,
        width: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.white
      }
    }
  },
  media(
    {
      maxWidth: 576
    },
    {
      $nest: {
        '&::before, &::after': {
          width: 80
        }
      }
    }
  ),
  media(
    {
      minWidth: 576,
      maxWidth: 768
    },
    {
      $nest: {
        '&::before, &::after': {
          width: 100
        }
      }
    }
  )
);
