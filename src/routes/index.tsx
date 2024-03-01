import React, {useEffect, useState} from 'react';
import { VStack } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { Loading } from '../Components/Loading';
import { SignInRoutes } from './signin.routes';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppRoutes } from './app.routes';

export function Routes() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>()

  useEffect(() => {
    const subscriber = auth()
    .onAuthStateChanged(response=> {
      setUser(response);
      setLoading(false)
    })

  return subscriber;
  },[])

  if(loading) {
    return(
      <Loading/>
    )
  }

  return(
    <VStack flex={1} bg="gray.200" _dark={{bg:"black"}}>
      <NavigationContainer>
        {user ? <AppRoutes/> : <SignInRoutes/>}
      </NavigationContainer>
    </VStack>
  )
 
}