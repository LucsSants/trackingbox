import React from 'react';
import { VStack, useTheme } from 'native-base';
import { CheckCircle, CurrencyDollar, Headlights, HourglassMedium, Money, Package, Question, Truck } from 'phosphor-react-native';

type Props = {
  description: string;
}

export function Icon({description}: Props) {
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
    "Objeto em transferência - por favor aguarde": <HourglassMedium weight='fill' size={42} color={colors.red[400]}/>,
   
  };
  return (
    <>
       {ENUM_STATES[description.trim()] ? ENUM_STATES[description.trim()] : <Question weight='fill' size={42} color="#CB9905"/>}
    </>
  );
}