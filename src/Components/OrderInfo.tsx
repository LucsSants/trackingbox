import React from 'react';
import { HStack, Text, VStack, useTheme } from 'native-base';
import {CheckCircle, Headlights, Package, Truck, CurrencyDollar, Money, Question} from 'phosphor-react-native'
import { formatHour } from '../utils/formatData';


export function OrderInfo(data: any) {
  const {colors} = useTheme()

  const ENUM_STATES : any = {
    "Objeto entregue ao destinatário": <CheckCircle weight='fill' size={42} color={colors.green[500]} />,
    "Objeto postado": <Headlights weight='fill' size={42} color={colors.orange[800]}/>,
    "Objeto saiu para entrega ao destinatário": <Package weight='fill' size={42} color={colors.blue[900]}/>,
    "Objeto em trânsito - por favor aguarde": <Truck weight='fill' size={42} color={colors.yellow[600]}/>,
    "Pagamento confirmado": <Money weight='fill' size={42} color={colors.green[300]}/>,
    "Aguardando pagamento": <CurrencyDollar weight='fill' size={42} color={colors.red[500]}/>,
    "Encaminhado para fiscalização aduaneira": <Truck weight='fill' size={42} color={colors.yellow[600]}/>,
    "Objeto recebido pelos Correios do Brasil": <Truck weight='fill' size={42} color={colors.yellow[600]}/>,
    "Fiscalização aduaneira finalizada": <Truck weight='fill' size={42} color={colors.yellow[600]}/>,
   
  };

  return (
    <VStack flexDir={'row'} alignItems={"center"} minH={22} >
      <HStack borderLeftColor={"gray.300"} borderLeftWidth={3} h={"full"} position={'absolute'} left={"6.2%"}></HStack>
      <HStack background="white" mr={3} borderRadius={20} p={"3px"}>
        {ENUM_STATES[data.data.Status.trim()] ? ENUM_STATES[data.data.Status.trim()] : <Question weight='fill' size={42} color="#CB9905"/>}
      </HStack>
      
      <HStack flexDir={'column'}>
        <Text color='green.500' fontWeight="bold" flexWrap="wrap" fontSize={16} width="99%" lineHeight={'sm'}>
          {data.data.Status.trim()}
        </Text>
          {data.data.Local ?
           <Text color='gray.300'>
              {data.data.Local.trim()} 
           </Text> 
          : 
          <>
          <Text color='gray.300'>
            Origem: {data.data.Origem.trim()}
          </Text> 
          <Text color='gray.300'>
            Destino: {data.data.Destino.trim()}
          </Text> 
          </>
         }
       
        <Text color='gray.700'>
       {data.data.Data.trim()} {formatHour(data.data.Hora.trim())}
        </Text>

      </HStack>
    </VStack>
  );
}