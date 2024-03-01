import React from 'react';
import { HStack, Heading, IconButton, StyledProps, Text, VStack, useTheme, useColorMode } from 'native-base';
import { CaretLeft, Trash } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { deleteOrder } from '../api/querries';

type Props = StyledProps & {
  title: string;
  subtitle?: string;
  orderID?:string;
  deleteFunc?: (props: any) => void;
}

export function Header({title,subtitle, orderID, deleteFunc,...rest}: Props) {
  const {colorMode} = useColorMode()
  const {colors} = useTheme()
  const navigation = useNavigation()
  

  function deleteOrderA(id:string) {
    navigation.goBack()
  }

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      h={"100px"}
      pb={3}
      pt={10}
      px={5}
      
      _dark={{bg:"black"}}
      {...rest}
    >
       <IconButton 
        icon={<CaretLeft color={ colorMode === "light" ? colors.gray[700] : colors.gray[100] } size={24}/>}
        onPress={navigation.goBack}
        zIndex={999}
      />
      <VStack flexDirection='column' justifyContent='center' alignItems="center">
        <Heading _light={{color:"gray.700"}} _dark={{color:"gray.100"}}  fontSize="lg" >
          {title}
        </Heading>
        {subtitle ? 
         <Text _light={{color:"gray.700"}} _dark={{color:"gray.100"}} textAlign="center" fontSize="md">
         {subtitle}
       </Text>
        :null}
         
         </VStack>
      
        {
          orderID ? 
          <IconButton 
          icon={<Trash color={ colorMode === "light" ? colors.gray[700] : colors.gray[100] } size={24}/>}
          onPress={
            deleteFunc
           
          }
          zIndex={999}
        />
           : 
         <VStack h="6" w="6">

         </VStack>
        }
    


    </HStack>
  );
}