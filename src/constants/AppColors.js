import {COLORS} from './Colors';

const commonColor = {
  colors: {
    commonWhite: '#FFFFFF',
    commonBlack: '#000000',
  },
};

const light = {
  colors: {
    themeColor: '#FFFFFF',
    white: '#000000',
    sky: '#DE5E69',
    gray: 'gray',
    // ...commonColor.colors,
    ...COLORS,
  },
};

const dark = {
  colors: {
    themeColor: '#000000',
    white: '#FFFFFF',
    sky: '#831a23',
    gray: 'white',
    // ...commonColor.colors,
    ...COLORS,
  },
};

export default {light, dark};
