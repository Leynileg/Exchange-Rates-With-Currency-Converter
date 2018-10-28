import { style, media } from 'typestyle';
// import { colors } from './vars';

export const ConverterSection = style(
  {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 'calc(100vh - 125px)',
    padding: `80px 0`
  },
  media({ maxWidth: 768 }, { width: 'auto', minHeight: '100%' })
);

export const ConvertToBox = style({
  margin: "30px auto"
})

export const ConvertToSelect = style({
  width: 300
},
media({ maxWidth: 480 }, { width: "80vw" })
)

export const ConverterResult = style({
  fontSize: 25
})