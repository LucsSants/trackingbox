import React, {useState} from 'react';
import { VStack } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { Loading } from '../Components/Loading';
import { SignInRoutes } from './signin.routes';

export function Routes() {
  const [loading, setLoading] = useState(false)
  if(loading) {
    return(
      <Loading/>
    )
  }

  return(
    <VStack flex={1} bg="gray.200">
      <NavigationContainer>
        {<SignInRoutes/>}
      </NavigationContainer>
    </VStack>
  )
 
}