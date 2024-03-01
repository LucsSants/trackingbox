import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  
  colors: {
    primary: {
      700: '#996DFF',
      600: '#996DFF' 
    },
    secondary: {
      700: '#FBA94C'
    },
    green: {
      700: '#00875F',
      500: '#00B37E',
      300: '#04D361',
      200: '#41A331'
    },
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#4D4D4D',
      250: '#7D7D7D',
      200: '#E4E4E4',
      100: '#E1E1E6'
    },
    white: '#FFFFFF',
    black : "#000",
    darkGrey: "#131313"
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
    title:'Pacifico_400Regular'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
    22 : 88
  },
});