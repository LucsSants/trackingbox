import React, { useEffect, useState} from 'react';
import { Center, HStack, Icon, IconButton,ScrollView, Text, VStack, useTheme, useToast, FlatList} from 'native-base';
import MiniLogo from '../assets/mini-logo.svg'
import { Order, OrderProps } from '../Components/Order';
import { Button } from '../Components/Button';
import { PlusCircle, UserCircle} from 'phosphor-react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Loading } from '../Components/Loading';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client'
import { GET_ALL_ORDERS } from '../api/querries';

export function Home() {
  const {loading,error, data,refetch } = useQuery(GET_ALL_ORDERS)
  const {colors} = useTheme()
  const toast = useToast()

  const navigation = useNavigation()

  async function handleNewOrder() {
    navigation.navigate('new')
  }

  function handleLogout() {
    auth()
    .signOut()
    .catch((error) => {
      console.log(error)
      toast.show({description: 'Não foi possível sair'})
    })
  }

  useEffect(() => {
    refetch()
  },[])

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


      { loading ? <Loading/> : 
      <FlatList
      data={data.firebaseUser.orders}
      keyExtractor={(item : OrderProps) => item.id}
      renderItem={({item}) => <Order data={item} />}
      px={4} 
       py={6}
       contentContainerStyle={{
         paddingBottom : 50
        }}
        ListEmptyComponent={() => (
          <Center>
            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
              Tudo vazio aqui por enquanto...
            </Text>
        </Center>
      )}
      />
    }
      
     
    <HStack h={20} alignItems="center" justifyContent="center" px="4" py="5">

    <Button title='Nova Encomenda' w="full" rounded="full" onPress={handleNewOrder} leftIcon={<Icon as={<PlusCircle color="white"/>}/>} />
     
    </HStack>
    </VStack>
  );
}