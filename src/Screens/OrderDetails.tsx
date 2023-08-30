import React, { useState, useEffect } from 'react';
import { Center, FlatList, HStack, Text, VStack, View} from 'native-base';
import { Header } from '../Components/Header';
import { useNavigation, useRoute } from '@react-navigation/native'
import Map from '../assets/map.svg'
import { OrderInfo } from '../Components/OrderInfo';
import { getAllStatus, getLastStatus } from '../api/api';
import { Loading } from '../Components/Loading';
import MapView from 'react-native-maps';
import axios from 'axios';


import { OPENW_API_KEY } from '@env'
import { extractCity } from '../utils/formatData';

type RouteParams = {
  orderCode:string;
  orderTitle:string;
}

export function OrderDetails() {
  const [infos, setInfos] = useState<any[]>([]);
  const [lastStatus, setLastStatus] = useState<any>({});
  const [localInfo, setLocalInfo] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true);
  


  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setLastStatus(await getLastStatus(orderCode))
      setInfos(await getAllStatus("string"));

      await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${ lastStatus.Local ? extractCity(lastStatus.Local) : extractCity(lastStatus.Origem)}&limit=1&appid=${OPENW_API_KEY}`)
      .then((response: any)=> setLocalInfo(response.data[0]))
      .catch((error: any) => console.error(error))
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
      
       <MapView style={{width:"100%", height:"30%"}} 
       
       initialRegion={{
        latitude: localInfo.lat,
        longitude: localInfo.lon,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0321, 
       }} />
      
      
      <FlatList
      data={infos}
      keyExtractor={(item : any) => item.Hora}
      renderItem={({item}) => <OrderInfo data={item}/>}
     
      px={5}
      mt={2}
      
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