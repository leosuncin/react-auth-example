import { DefaultTheme, theme, ColorHues } from '@chakra-ui/core';

interface CustomTheme extends DefaultTheme {
  colors: DefaultTheme['colors'] & { brand: ColorHues };
}

export const customTheme: CustomTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    // Go to https://smart-swatch.netlify.com/ to easily generate a new color
    // palette.
    brand: {
      50: '#e0f4ff',
      100: '#b8dcfa',
      200: '#8ec4f1',
      300: '#63ace8',
      400: '#3994e0',
      500: '#1f7bc6',
      600: '#135f9b',
      700: '#084470',
      800: '#002946',
      900: '#000f1d',
    },
  },
};
