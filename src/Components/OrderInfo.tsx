import React from 'react';
import { HStack, Text, VStack, useTheme } from 'native-base';
import {CheckCircle, Headlights, Package, Truck, CurrencyDollar, Money, Question} from 'phosphor-react-native'
import { formatHour } from '../utils/formatData';
import { Icon } from './Icon';




export function OrderInfo(data: any) {


  
  return (
    <VStack flexDir={'row'} alignItems={"center"} minH={24} w="100%" _dark={{bg:"black"}}>
      <HStack borderLeftColor={"gray.300"} borderLeftWidth={3} h={"full"} position={'absolute'} left={"6.2%"}></HStack>
      <HStack background="white" mr={3} borderRadius={20} p={"3px"}>
        <Icon description={data.data.Status.trim()}/>
      </HStack>
      
      <HStack flexDir={'column'} width="94%">
        <Text color='green.500' fontWeight="bold"  fontSize={16} width="94%" lineHeight={'sm'} textBreakStrategy='balanced'>
        {data.data.Status.trim()}
        </Text>
          {data.data.Local ?
           <Text color='gray.300'  _dark={{color:"gray.100"}} >
              {data.data.Local.trim()} 
           </Text> 
          : 
          <>
          <Text color='gray.300' _dark={{color:"gray.100"}} w="94%" textBreakStrategy='balanced'>
            Origem: {data.data.Origem.trim()}
          </Text> 
          <Text color='gray.300' _dark={{color:"gray.100"}} w="94%">
            Destino: {data.data.Destino.trim()}
          </Text> 
          </>
         }
       
        <Text color='gray.700'  _dark={{color:"gray.250"}}>
       {data.data.Data.trim()} {formatHour(data.data.Hora.trim())}
        </Text>

      </HStack>
    </VStack>
  );
}