import React, {useState} from 'react';
import { VStack, Icon, useTheme, Text, Heading, Pressable } from 'native-base';
import {useNavigation} from '@react-navigation/native'
import { Input } from '../Components/Input';
import {Envelope, Key} from 'phosphor-react-native'
import Logo from '../assets/logo.svg'
import { Button } from '../Components/Button';
import { getAllStatus, getLastStatus } from '../api/api';


export function SignIn() {
  const {colors} = useTheme()

  const [isLoading, setIsLoading] = useState(false)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigation = useNavigation()

  function handleGoToCreateAccount() {
    navigation.navigate('signup')
  }
 

  return (
    <VStack flex={1} alignItems="center" bg="gray.200" px={8} pt={24}>
      <VStack ml="5" mb="1">
      <Logo />
      </VStack>
        <Text fontSize={35} fontFamily="title" >Trackin'Box</Text>
        <Heading color="gray.300" fontSize="lg" mt={1} mb={6}>
          Acesse sua conta
        </Heading>
      
      <Input
        placeholder='E-mail'
        mb={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>}
        onChangeText={setEmail}
      />
      <Input
        placeholder='Senha'
        mb={4}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
        type='password'
        onChangeText={setPassword}
      />
      <Button
        title="Entrar"
        w="full"
        isLoading={isLoading}
        onPress={getLastStatus}
      />

      <VStack flexDirection="row" mt="4">
        <Text fontSize="md">Não possui uma conta?</Text>
        <Pressable onPress={handleGoToCreateAccount}>
          <Text fontWeight="bold"color="green.800" fontSize="md" > Criar uma conta</Text>
        </Pressable>
      </VStack >
      
      
    </VStack>
  );
}