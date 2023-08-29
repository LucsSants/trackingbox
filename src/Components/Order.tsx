import React from 'react';
import { HStack, IPressableProps, Pressable, ScrollView, Text, VStack, useTheme } from 'native-base';
import {CheckCircle, Key, Tag} from 'phosphor-react-native'
import { OrderTag } from './OrderTag';
import { formatDate, formatHour } from '../utils/formatData';
import { useNavigation } from '@react-navigation/native';

type TagData = {
  id: string;
  tagColor: {
    hex: string;
  };
  tagTitle: string;
}

export type OrderProps ={
  id: string;
  orderCode: string;
  orderTitle: string;
  orderLastStatus : {
    statuses:string;
    statusTime:string;
    statusDate:string;
  }
  orderTags: [TagData];
}

type Props = IPressableProps & {
  data : OrderProps
}

export function Order({data, ...rest} : Props) {
  const navigation = useNavigation()

  const {colors} = useTheme()

  function handleOpenDetails( orderCode: string, orderTitle: string) {
    navigation.navigate('details', {orderCode, orderTitle})
  }
  
  return (
    <Pressable onPress={() => handleOpenDetails (data.orderCode, data.orderTitle)} mb={15} _pressed={{opacity: 0.7}}>
        
    <HStack w="full" backgroundColor="white" rounded="2xl" py={3} px={6} flexDirection="row">
      <VStack alignItems="center" justifyContent="center" width="15%">
        <VStack backgroundColor="gray.100" h="55" w="55" rounded="full" alignItems="center" justifyContent="center">
          <CheckCircle weight='fill' size={32} color={colors.green[200]}/>
        </VStack>
        <Text color="green.700" fontWeight="black" >{formatDate(data.orderLastStatus.statusDate) === "undefined/undefined" ? "??" : formatDate(data.orderLastStatus.statusDate)}</Text>
        <Text color="gray.500" fontSize="12">{data.orderLastStatus.statusTime === "undefined" ? "??" : data.orderLastStatus.statusTime}</Text>
      </VStack>
      <VStack ml={6} alignItems="flex-start" justifyContent="center">
        <Text fontSize="lg" color="green.700" fontWeight="bold">{data.orderTitle}</Text>
        <Text fontSize="14" color="gray.400">{data.orderLastStatus.statuses === "undefined" ? "Sem informações" : data.orderLastStatus.statuses}</Text>
        
      
        <VStack w="240" flexDirection="row" alignItems="center" mt="2">
          <Tag size={20}/>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            zIndex={99}
            // backgroundColor="gray.700"
            ml={1}
            >
              <VStack flexDirection="row" onStartShouldSetResponder={() => true} mx={1}>
               {data.orderTags.map((tag: TagData) => <OrderTag title={tag.tagTitle} color={tag.tagColor.hex} key={tag.id}/>)}
              </VStack>
          </ScrollView>
        </VStack>
          
      </VStack>
    </HStack>

    </Pressable>
 
   
  );
}