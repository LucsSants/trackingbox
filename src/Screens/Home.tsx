import React, { useEffect, useState} from 'react';
import { Center, HStack, Icon, IconButton,ScrollView, Text, VStack, useTheme, useToast, FlatList, useColorMode, StatusBar} from 'native-base';
import MiniLogo from '../assets/mini-logo.svg'
import { Order, OrderProps } from '../Components/Order';
import { Button } from '../Components/Button';
import { PlusCircle, UserCircle} from 'phosphor-react-native';
import { Loading } from '../Components/Loading';
import { useNavigation, useIsFocused, } from '@react-navigation/native';
import { useQuery } from '@apollo/client'
import auth from '@react-native-firebase/auth'


import { GET_ALL_ORDERS, getAllOrders } from '../api/querries';


export function Home() {
  const isFocused = useIsFocused();
  const { colorMode, toggleColorMode } = useColorMode();
  const [refreshing, setRefreshing] = useState(false);
  const currentUser = auth().currentUser?.uid 


  const {loading,error, data,refetch } = useQuery(getAllOrders(currentUser));
  const {colors} = useTheme()
  const toast = useToast()
  const navigation = useNavigation()

  async function handleNewOrder() {
    navigation.navigate('new')
  }

  async function handleProfile() {
    navigation.navigate('profile')
  }

  async function handleRreshing() {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  

  useEffect(() => {
    (async () => {
      console.log(isFocused)
      await refetch()

    })();
    
  },[])

    return (
      <>
      <StatusBar barStyle={colorMode === "light" ? "dark-content" : "light-content"} backgroundColor="transparent" translucent />

    <VStack flex={1}>
      <VStack _light={{bg:"white"}} _dark={{bg: `black`}} w={'full'} alignItems="center" justifyContent="space-between" flexDirection="row" h={120} px={5} pt={5}>
        <HStack width="36px"/>
        <HStack alignItems="center" justifyContent="center">
          <MiniLogo/>
          <Text fontFamily="title" fontSize={29} mt={5}>Trackin'Box</Text>
        </HStack>
          <IconButton
            icon={<Icon as={<UserCircle size={36} weight='fill' color={colors.green[700]}/>}/>}
            _pressed={{
              color: "green.400",
              bg:"gray",
              _dark: {bg: "gray.500"}
            }}
            rounded="full"
            mt={5}
            onPress={handleProfile}
            />
      </VStack>

      { loading ? <Loading/> : 
      <FlatList
      _dark={{bg: `black`}}
      data={data.firebaseUser ? data.firebaseUser.orders : []}
      keyExtractor={(item : OrderProps) => item.id}
      renderItem={({item}) => <Order data={item} />}
      px={4} 
      py={6}
      refreshing={refreshing}
      onRefresh={handleRreshing}
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
     
    <HStack h={20} alignItems="center" justifyContent="center" px="4" py="5"  _dark={{bg: `black`}}>

    <Button title='Nova Encomenda' w="full" rounded="full" onPress={handleNewOrder} leftIcon={<Icon as={<PlusCircle color="white"/>}/>} />
     
    </HStack>
    </VStack>
    </>
  );
}