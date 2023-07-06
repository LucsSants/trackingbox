import React, {useState} from 'react';
import {Keyboard} from 'react-native'
import { VStack, Icon, useTheme, Text, Heading, Pressable, useToast, keyboardDismissHandlerManager } from 'native-base';
import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'
import { Input } from '../Components/Input';
import {Envelope, Key} from 'phosphor-react-native'
import Logo from '../assets/logo.svg'


import { Button } from '../Components/Button';


export function SignIn() {
  const {colors} = useTheme()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigation = useNavigation()

  function handleGoToCreateAccount() {
    navigation.navigate('signup')
  }

  function handleSignIn() {
    Keyboard.dismiss()
    if (!email || !password) {
      return toast.show({description: 'Preencha E-mail e Senha'})
    }

    setIsLoading(true)
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
      
      if (error.code === "auth/invalid-email") {
        return toast.show({description: 'E-mail com formato inválido.'})
      }
      if (error.code === "auth/wrong-password") {
        return toast.show({description: 'E-mail ou senha incorretos.'})
      }
      if (error.code === "auth/invalid-email") {
        return toast.show({description: 'E-mail ou senha incorretos.'})
      }

      return toast.show({description: 'Não foi possível acessar'})
    })
    
  }
 

  return (
    <VStack flex={1}  bg="gray.200" px={8} pt={24} alignItems="center">
      <VStack ml="5" mb="1">
      <Logo />
      </VStack>
        <Text fontSize={35} fontFamily="title" >Trackin'Box</Text>
        <Heading color="gray.400" fontSize="lg" mt={1} mb={6}>
          Acesse sua conta
        </Heading>
      
      <Input
        placeholder='E-mail'
        mb={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[400]}/>} ml={4}/>}
        onChangeText={setEmail}
      />
      <Input
        placeholder='Senha'
        mb={4}
        InputLeftElement={<Icon as={<Key color={colors.gray[400]}/>} ml={4}/>}
        type='password'
        onChangeText={setPassword}
      />
      <Button
        title="Entrar"
        w="full"
        isLoading={isLoading}
        onPress={handleSignIn}
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