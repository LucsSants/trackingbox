import React from 'react';
import { HStack, Heading, IconButton, StyledProps, Text, VStack, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
  title: string;
  subtitle?: string;
}

export function Header({title,subtitle, ...rest}: Props) {
  const {colors} = useTheme()
  const navigation = useNavigation()
  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      pb={6}
      pt={7}
      
      {...rest}
    >
       <IconButton 
        icon={<CaretLeft color={colors.gray[700]} size={24}/>}
       
        onPress={navigation.goBack}
        zIndex={999}
      />
      <VStack flexDirection='column' justifyContent='center' alignItems="center" ml={-5}>
        <Heading color="gray.700" textAlign="center" fontSize="lg" flex={1} >
          {title}
        </Heading>
        {subtitle ? 
         <Text>
         {subtitle}
       </Text>
        :''}
         
      </VStack>

      <VStack>

      </VStack>

    </HStack>
  );
}