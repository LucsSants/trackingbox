import {NativeBaseProvider, StatusBar} from 'native-base'
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {Pacifico_400Regular} from '@expo-google-fonts/pacifico'
import { THEME } from './src/styles/theme';
import { Loading } from './src/Components/Loading';
import { Routes } from './src/routes';




export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular,Roboto_700Bold,Pacifico_400Regular})
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Routes/> : <Loading/>}
    </NativeBaseProvider>
  );
}

