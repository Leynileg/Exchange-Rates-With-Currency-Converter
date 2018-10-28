import { style, media } from 'typestyle';
import { colors } from './vars';

export const CurrenciesList = style({
  background: colors.white,
  boxShadow: colors.boxShadow,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderRadius: 4,

  $nest: {
    ul: {
      padding: 0,
      margin: 0,
      width: '100%',
      overflowX: 'hidden',
      overflowY: 'scroll',
      textAlign: 'center',
      fontSize: 20,
      height: 300,

      $nest: {
        li: {
          padding: '10px 0',
          cursor: 'pointer',
          transition: 'all 0.2s linear',
          transitionProperty: 'background-color, color',
          textTransform: 'uppercase',

          $nest: {
            '&:hover': {
              background: colors.blue,
              color: colors.white
            }
          }
        }
      }
    }
  }
});

export const SelectedCurrency = style({
  background: colors.blue,
  color: colors.white
});

export const DisplayedCurrency = style(
  {
    fontSize: 40
  },
  media({maxWidth: 568}, {fontSize: 30}),
  media({ maxWidth: 768 }, { padding: `30px 0 50px`, textAlign: 'center' })
);
