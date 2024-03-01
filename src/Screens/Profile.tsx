import React, {useState} from 'react';
import { VStack, Text, Switch, useColorMode, Icon, useToast} from 'native-base';
import { Header } from '../Components/Header';
import auth from '@react-native-firebase/auth'
import { ArrowLineLeft } from 'phosphor-react-native';
import { Button } from '../Components/Button';

type UserType = {
  email: string
}

export function Profile() {
const [fircheckst, setCheck] = useState(false);

const currentUser : UserType = auth().currentUser as UserType
const { colorMode, toggleColorMode } = useColorMode();

const toast = useToast()


function handleLogout() {
  auth()
  .signOut()
  .catch((error)=> {
    console.log(error)
    toast.show({description: 'Não foi possivel sair'})
  })
}

  return (
    <VStack flex={1}  _dark={{bg:"black"}} justifyContent="space-between">
      <VStack>
      <Header title='Perfil'/>
      <VStack px={7} py={3}  flexDirection="row" justifyContent="space-between" alignContent="center">
        <Text color="gray.400" _dark={{color:"gray.200"}} fontWeight="bold" fontSize={'lg'}>
          Email:
        </Text>
        <Text fontSize={'md'}>
          {currentUser.email}
        </Text>
      </VStack>

      <VStack px={7} py={3}  flexDirection="row" justifyContent="space-between">
        <Text color="gray.400" _dark={{color:"gray.200"}} fontWeight="bold" fontSize={'lg'}>
          Modo Escuro:
        </Text>
      <Switch colorScheme="primary" onToggle={toggleColorMode} onTrackColor="green.500" isChecked={ colorMode === "dark" ? true : false }/>
      </VStack>
      </VStack>

      <VStack alignItems="center" pb="8">
        <Button title='Sair' w="full" width="50%" rounded="full" onPress={handleLogout} leftIcon={<Icon as={<ArrowLineLeft color="white"/>}/>} />
      </VStack>

    </VStack>
  );
}