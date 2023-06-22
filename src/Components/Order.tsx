import React, {useEffect, useState} from 'react';
import { HStack, IPressableProps, Pressable, ScrollView, Text, VStack, useTheme } from 'native-base';
import {CheckCircle, Key, Tag} from 'phosphor-react-native'
import { OrderTag } from './OrderTag';
import firestore from '@react-native-firebase/firestore'
import { getLastStatus } from '../api/api';
import { formatDate, formatHour } from '../utils/formatData';
import { Loading } from './Loading';

export type OrderProps ={
  id: string;
  orderCode: string;
  orderTitle: string;
  userID: string;
}

type TagData = {
  id: string;
  tagColor: string;
  tagName: string;
}

type StatusData ={
  Status : string;
  Data : string;
  Local : string;
  Hora : string;

}

type Props = IPressableProps & {
  data : OrderProps
}

export function Order({data, ...rest} : Props) {
  const {colors} = useTheme()
  const [tags, setTags] = useState<TagData[]>([])
  const [status, setSatus] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    setIsLoading(true)
    const subscriber = firestore()
    .collection('Tags')
    .where('orderId', '==', data.id)
    .onSnapshot( async snapshot => {
     
      const tagData = snapshot.docs.map(doc=> {
        const {tagColor, tagName} = doc.data()
        return {id: doc.id, tagColor, tagName}
        
      })
      const lastSatus = await getLastStatus("LB568216445HK")
      setSatus(lastSatus)
      setTags(tagData);
      setIsLoading(false)
    })
  return subscriber
  
    
  }, [])
  

  
  return (

    <Pressable onPress={() => console.log("I'm Pressed")} mb={15} _pressed={{opacity: 0.7}}>
          { isLoading ? <Loading/> : 
    <HStack w="full" backgroundColor="white" rounded="2xl" py={3} px={6} flexDirection="row">
      <VStack alignItems="center" justifyContent="center" width="15%">
        <VStack backgroundColor="gray.300" h="55" w="55" rounded="full" alignItems="center" justifyContent="center">
          <CheckCircle weight='fill' size={32} color={colors.green[200]}/>
        </VStack>
        <Text color="green.700" fontWeight="black" >{formatDate(status.Data)}</Text>
        <Text color="gray.500" fontSize="12">{formatHour(status.Hora)}</Text>
      </VStack>
      <VStack ml={6} alignItems="flex-start" justifyContent="center">
        <Text fontSize="lg" color="green.700" fontWeight="bold">{data.orderTitle}</Text>
        <Text fontSize="14" color="gray.400">{status.Status}</Text>
        
      
        <VStack w="240" flexDirection="row" alignItems="center" mt="2">
          <Tag size={20}/>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            zIndex={9999999999999999999999999999999}
            // backgroundColor="gray.700"
            ml={1}
            >
              <VStack flexDirection="row" onStartShouldSetResponder={() => true} mx={1}>
              {tags.map((tag : TagData) => <OrderTag title={tag.tagName} color={tag.tagColor} key={tag.id}/>)}
              
              </VStack>
          </ScrollView>
        </VStack>
          
      </VStack>
    </HStack>

}
    </Pressable>
 
   
  );
}