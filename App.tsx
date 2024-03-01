import {NativeBaseProvider, StatusBar, useColorMode} from 'native-base'
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {Pacifico_400Regular} from '@expo-google-fonts/pacifico'
import { THEME } from './src/styles/theme';
import { Loading } from './src/Components/Loading';
import { Routes } from './src/routes';
import {ApolloProvider} from '@apollo/client'
import client from './src/api/client';
import { colorModeManager } from './src/utils/colorManagerMode';




export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular,Roboto_700Bold,Pacifico_400Regular})
  const {colorMode} = useColorMode()
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider theme={THEME} colorModeManager={colorModeManager}>
      <StatusBar barStyle={colorMode === "light" ? "dark-content" : "light-content"} backgroundColor="transparent" translucent />

        {fontsLoaded ? <Routes/> : <Loading/>}
      </NativeBaseProvider>
      </ApolloProvider>
  );
}

