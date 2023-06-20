import React from 'react';
import { HStack, Pressable, ScrollView, Text, VStack, useTheme } from 'native-base';
import {CheckCircle, Key, Tag} from 'phosphor-react-native'
import { OrderTag } from './OrderTag';

export function Order() {
  const {colors} = useTheme()
  const data = [1,2,3,4,5]
  
  return (
    
    
    <Pressable onPress={() => console.log("I'm Pressed")} mb={15} _pressed={{opacity: 0.7}}>
    <HStack w="full" backgroundColor="white" rounded="2xl" py={3} px={6} flexDirection="row">
      <VStack alignItems="center" justifyContent="center" width="15%">
        <VStack backgroundColor="gray.300" h="55" w="55" rounded="full" alignItems="center" justifyContent="center">
          <CheckCircle weight='fill' size={32} color={colors.green[200]}/>
        </VStack>
        <Text color="green.700" fontWeight="black">13/abr</Text>
        <Text color="gray.500" fontSize="12">08:00</Text>
      </VStack>
      <VStack ml={6} alignItems="flex-start" justifyContent="center">
        <Text fontSize="lg" color="green.700" fontWeight="bold">Capa do celular</Text>
        <Text fontSize="16" color="gray.400" >Entrega Efetuada</Text>
        
      
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
              {data.map(a => <OrderTag title='Shopee' color={colors.secondary[700]} key={a}/>)}
              
              </VStack>
              
              
          </ScrollView>
        </VStack>
          
      </VStack>
    </HStack>

    </Pressable>
 
   
  );
}