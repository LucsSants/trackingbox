import React from 'react';
import { HStack, Text, VStack, useTheme } from 'native-base';
import {CheckCircle} from 'phosphor-react-native'


export function OrderInfo() {
  const {colors} = useTheme()

  return (
    <VStack flexDir={'row'} alignItems={"center"} >
      <HStack borderLeftColor={"black"} borderLeftWidth={2} h={20} position={'absolute'} left={23}></HStack>
      <HStack background="white" mr={5} borderRadius={20} p={"3px"}>
        <CheckCircle weight='fill' size={42} color={colors.green[500]}/>
      </HStack>
      
      <HStack flexDir={'column'} >
        <Text color='green.500' fontWeight="bold" fontSize={16}>
          Entrega Efetuada
        </Text>
        <Text  color='gray.300'>
          Unidade de Distribuição - LAGARTO/SE
        </Text>
        <Text color='gray.700'>
        20/03/2023 15:20
        </Text>

      </HStack>
    </VStack>
  );
}