import React, { useState, useEffect } from 'react';
import { Button, Center, FlatList, FormControl, HStack, Modal, Text, VStack, View} from 'native-base';
import { Header } from '../Components/Header';
import { useNavigation, useRoute } from '@react-navigation/native'
import Map from '../assets/map.svg'
import { OrderInfo } from '../Components/OrderInfo';
import { getAllStatus, getLastStatus } from '../api/api';
import { Loading } from '../Components/Loading';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';


import { OPENW_API_KEY } from '@env'
import { extractCity, isEmpty } from '../utils/formatData';
import { deleteOrder, updateLastStatus } from '../api/querries';
import { Input } from '../Components/Input';
import { Platform } from 'react-native';

type RouteParams = {
  orderCode:string;
  orderTitle:string;
  orderID:string;
  orderLastStatusId: string;
}

export function OrderDetails() {
  const navigation = useNavigation()
  const [infos, setInfos] = useState<any[]>([]);
  const [lastStatus, setLastStatus] = useState<any>({});
  const [localInfo, setLocalInfo] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);


  const route = useRoute()
  const { orderCode, orderTitle, orderID, orderLastStatusId } = route.params as RouteParams;
  
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const data : any = await getLastStatus(orderCode.trim())
      setLastStatus(data)
      console.log(data)
      setInfos(await getAllStatus(orderCode));
      if(!isEmpty(data)) {
        
        await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${data.Local ? extractCity(data.Local.trim()) : extractCity(data.Origem.trim())}&limit=1&appid=${OPENW_API_KEY}`)
        .then(async (response: any)=> {
          console.log(response.data[0])
          setLocalInfo(response.data[0])
          await updateLastStatus(orderID, orderLastStatusId, data.Data, data.Hora, data.Status)
        })
        .catch((error: any) => {
          console.log(error)
        })
      }
      setIsLoading(false)
    })();
    
  },[])
  
  
  return (
    <>
   <Center>
      <Modal  isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="500px"  borderWidth={"1"}>
          <Modal.Header bg={"gray.100"} _dark={{bg:"black"}} >Certeza que deseja excluir?</Modal.Header >
          <Modal.Footer bg={"gray.100"} _dark={{bg:"black"}}>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="warmGray" onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button bg="red.500" onPress={async () => {
        
                await deleteOrder(orderID)
                navigation.goBack()
            }}>
                Excluir
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>

    <VStack flex={1}  _dark={{bg:"black"}}>
      <VStack>
      <Header title={orderTitle} subtitle={orderCode} orderID={orderID} deleteFunc={() => setShowModal(true)}/>
      </VStack>
        
      {isLoading ? <Loading/> :
        <>
        {
          localInfo.lat ? 
          <MapView
          provider={PROVIDER_GOOGLE}
          style={{width:"100%", height:"30%"}} 
          initialRegion={{
            latitude: localInfo.lat,
            longitude: localInfo.lon,
            latitudeDelta: 0.2000,
            longitudeDelta: 0.0725
          }}/> 
          
          :
          <MapView 
          provider={PROVIDER_GOOGLE}
          style={{width:"100%", height:"30%"}} 
          />
          
        }
          <FlatList
          data={infos}
          keyExtractor={(item : any) => item.Hora + Math.random()}
          renderItem={({item}) => <OrderInfo data={item}/>}
          _dark={{bg:"black"}}
          px={5}
          mt={2}
          
          ListEmptyComponent={() => (
            <Center>
                <Text color="gray.300"  _dark={{color:"gray.100"}} fontSize="xl" mt={6} textAlign="center" >
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
      </>
    );
}