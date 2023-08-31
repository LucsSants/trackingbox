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
import { extractCity, isEmpty } from '../utils/formatData';

type RouteParams = {
  orderCode:string;
  orderTitle:string;
}

export function OrderDetails() {
  const [infos, setInfos] = useState<any[]>([]);
  const [lastStatus, setLastStatus] = useState<any>({});
  const [localInfo, setLocalInfo] = useState<any>({
    
  })
  const [isLoading, setIsLoading] = useState(true);
  
  

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const data : any = await getLastStatus(orderCode.trim())
      setLastStatus(data)
      setInfos(await getAllStatus(orderCode));
      console.log();
      if(!isEmpty(data)) {
        await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${data.Local ? extractCity(data.Local.trim()) : extractCity(data.Origem.trim())}&limit=1&appid=${OPENW_API_KEY}`)
        .then((response: any)=> setLocalInfo(response.data[0]))
        .catch((error: any) => console.error(error))
      }
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

        {
          localInfo.lat ? 
          <MapView style={{width:"100%", height:"30%"}} 
          initialRegion={{
            latitude: localInfo.lat,
            longitude: localInfo.lon,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0321, 
          }} /> 
          :
          <MapView style={{width:"100%", height:"30%"}} />
        }
          
          
          
          
          <FlatList
          data={infos}
          keyExtractor={(item : any) => item.Hora}
          renderItem={({item}) => <OrderInfo data={item}/>}
          
          px={5}
          mt={2}
          
          ListEmptyComponent={() => (
            <Center>
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center" >
                  Sem informações...
                </Text>
                <Text color="gray.300" fontSize="sm" mt={6} textAlign="center" >
                  Ainda não temos informações sobre seu pacote, confira se o código de rastreio está correto, se estiver, saiba que pode demorar um pouco após a compra para obtermos as informações sobre o rastreamento.
                </Text>
            </Center>
          )}
          />
          </>
      }
    </VStack>
    
    );
}