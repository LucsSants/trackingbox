import React from 'react';
import { StyledProps, Text, VStack } from 'native-base';

type Props = StyledProps & {
  title: string;
  color: string;
}

export function OrderTag({color, title }: Props) {
  return (
    <VStack backgroundColor={color}justifyContent="center" alignItems="center" px={2} rounded="full" mr="1">
      <Text color="white"p={1} fontSize={12}>{title}</Text>
    </VStack>
    
  );
}