import React from 'react';
import { HStack, Heading, IconButton, StyledProps, Text, VStack, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';

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
      h={"100px"}
      pb={3}
      pt={10}
      px={5}
      
      {...rest}
    >
       <IconButton 
        icon={<CaretLeft color={colors.gray[700]} size={24}/>}
        onPress={navigation.goBack}
        zIndex={999}
      />
      <VStack flexDirection='column' justifyContent='center' alignItems="center" ml={-5 }>
        <Heading color="gray.700" textAlign="center" fontSize="lg" >
          {title}
        </Heading>
        {subtitle ? 
         <Text color="gray.500" textAlign="center" fontSize="md">
         {subtitle}
       </Text>
        :null}
         
      </VStack>

      <VStack>

      </VStack>

    </HStack>
  );
}