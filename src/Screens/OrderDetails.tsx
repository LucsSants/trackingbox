import React, { useState, useEffect } from 'react';
import { Center, FlatList, HStack, Text, VStack, View} from 'native-base';
import { Header } from '../Components/Header';
import { useNavigation, useRoute } from '@react-navigation/native'
import Map from '../assets/map.svg'
import { OrderInfo } from '../Components/OrderInfo';
import { getAllStatus } from '../api/api';
import { Loading } from '../Components/Loading';

type RouteParams = {
  orderCode:string;
  orderTitle:string;
}

export function OrderDetails() {
  const data =[`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`]
  const [infos, setInfos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setInfos(await getAllStatus("string"));
      setIsLoading(false)
    })();
    
  },[])

  const route = useRoute()
  const { orderCode, orderTitle } = route.params as RouteParams;
  return (
    <VStack flex={1}>
      <VStack>
      <Header title={orderTitle} subtitle={orderCode} background="white"/>
      </VStack>
      {isLoading ? <Loading/> :
      <>
      <HStack  w="full">
        <Map/>
      </HStack>
      
      <FlatList
      data={infos}
      keyExtractor={(item : any) => item.Hora}
      renderItem={({item}) => <OrderInfo />}
      ItemSeparatorComponent={() => <View style={{height: 8}} />}
      px={5}
      mt={2}
      contentContainerStyle={{
        paddingBottom : 10
      }}
      ListEmptyComponent={() => (
        <Center>
            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
              Tudo vazio aqui por enquanto...
            </Text>
        </Center>
      )}
      />
    </>
  }
    </VStack>
    
    );
}