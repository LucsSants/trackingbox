import React, {useState} from 'react';
import { VStack, Icon, useTheme, Text, Heading, Pressable, KeyboardAvoidingView, useToast} from 'native-base';
import {useNavigation} from '@react-navigation/native'
import { Input } from '../Components/Input';
import {Envelope, Key, User } from 'phosphor-react-native'
import Logo from '../assets/logo.svg'
import { Button } from '../Components/Button';
import { Keyboard, Platform } from 'react-native';
import auth from '@react-native-firebase/auth'
import { createProfile } from '../api/querries';


export function SignUp() {
  const {colors} = useTheme()
  const toast = useToast()


  const [isLoading, setIsLoading] = useState(false)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigation = useNavigation()

  function handleSignUp() {
    Keyboard.dismiss()
    if (!email || !password) {
      return toast.show({description: 'Preencha E-mail e Senha'})
    }

    setIsLoading(true)
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      createProfile(response.user.uid)
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
      
      if (error.code === "auth/invalid-email") {
        return toast.show({description: 'E-mail com formato inválido.'})
      }
      if (error.code === "auth/email-already-in-use") {
        return toast.show({description: 'E-mail já em uso!'})
      }

      return toast.show({description: 'Não foi possível acessar'})
    })
    
  }
  return (

  <KeyboardAvoidingView  bg="gray.200" behavior={Platform.OS === "ios" ? "padding" : "height"} flex={1} >

    <VStack flex={1} alignItems="center" bg="gray.200" px={8} pt={24} _dark={{bg:"black"}}>
      <VStack ml="5" mb="1">
        <Logo />
      </VStack>
        <Text fontSize={35} fontFamily="title" >Trackin'Box</Text>
        <Heading color="gray.400" fontSize="lg" mt={1} mb={6} _dark={{color:"gray.250"}}>
          Crie sua conta
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
        title="Criar conta"
        w="full"
        isLoading={isLoading}
        onPress={handleSignUp}
        />

      <VStack flexDirection="row" mt="4">
        <Text fontSize="md">Já possui uma conta?</Text>
        <Pressable onPress={navigation.goBack}  >
          <Text fontWeight="bold"color="green.800" fontSize="md" > Fazer login</Text>
        </Pressable>
      </VStack >
    </VStack>
  </KeyboardAvoidingView>
  );
}