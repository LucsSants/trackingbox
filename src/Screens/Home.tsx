import React, { useEffect, useState } from 'react';
import { Center, HStack, Icon, IconButton,ScrollView, Text, VStack, useTheme, useToast } from 'native-base';
import MiniLogo from '../assets/mini-logo.svg'
import { Order } from '../Components/Order';
import { Button } from '../Components/Button';
import { PlusCircle, UserCircle} from 'phosphor-react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export function Home() {
  const {colors} = useTheme()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])

  function handleLogout() {
    auth()
    .signOut()
    .catch((error) => {
      console.log(error)
      toast.show({description: 'Não foi possível sair'})
    })
  }
 
    return (
    <VStack flex={1}> 
      <VStack w={'full'} alignItems="center" justifyContent="space-between" flexDirection="row" h={120} background='white' px={5} pt={5}>
        <HStack width="36px"/>
        <HStack alignItems="center" justifyContent="center">
          <MiniLogo/>
          <Text fontFamily="title" fontSize={29} mt={5}>Trackin'Box</Text>
        </HStack>
          <IconButton
            icon={<Icon as={<UserCircle size={36} weight='fill' color={colors.green[700]}/>}/>}
            _pressed={{
              color: "green.400",
              bg:"gray.100",
            }}
            rounded="full"
            mt={5}
            onPress={handleLogout}
          />
      </VStack>
      
      <ScrollView px={4} py={6}>      
        <Order/>
        <Order/>
        <Order/>
        <Order/>
        <Order/>

    </ScrollView>
    
    <HStack h={20} alignItems="center" justifyContent="center" px="4" py="5">

    <Button title='Nova Encomenda' w="full" rounded="full" leftIcon={<Icon as={<PlusCircle color="white"/>}/>} />
     
    </HStack>
    </VStack>
  );
}