import React from 'react';
import { Input as NativeBaseInput, IInputProps, VStack, Text, } from 'native-base';
import { Button } from './Button';

type Props = IInputProps & {
  title?:string;
  buttonTitle? : string;
  buttonColor? : string;
  buttonFunc?: any;
}

export function Input({title ,buttonTitle,buttonColor, buttonFunc, ...rest}: Props) {
  return (
    <VStack width="full">
    {title ?<Text ml="2" mb={2} mt={2}>{title}:</Text> : ''}

    <VStack flexDir={buttonTitle ? "row":"column"} w="full" alignItems="center" justifyContent="space-between">
      <NativeBaseInput
        width={buttonTitle ? "70%" : "full"}
        _dark={{bg:"dark.100", 
           color:"gray.100",
         _focus: {
          bg: "dark.100"
        }}}
        bg="white"
        h={14}
        size="md" 
        borderWidth={0}
        fontSize="md"
        fontFamily="body"
        color="gray.700"
        placeholderTextColor="gray.300"

        _focus={{
          borderWidth:1,
          borderColor: "green.500",
          bg: "white"
        }}
        {...rest}
        />
         {buttonTitle ? <Button title={buttonTitle} onPress={()=> buttonFunc()} backgroundColor={buttonColor ? buttonColor : ""}/>: ''}   

        </VStack>

      </VStack>
  );
}