import React, { useState } from 'react';
import { VStack, Text, Center, Pressable, FlatList, useToast, ScrollView, HStack} from 'native-base';
import { Header } from '../Components/Header';
import { Input } from '../Components/Input';
import { Keyboard } from 'react-native';
import { OrderTag } from '../Components/OrderTag';
import { Button } from '../Components/Button';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';

type tagType = {
  tagName: string;
  tagColor: string;
}

export function NewOrder() {
  const tagColors = ["#5CD859", "#24A6D9", "#595BD9", "#802D9C", "#D159D8", "#D88559"]
  const [isLoading, setIsLoading] = useState(false)

  const [color, setColor] = useState(tagColors[0]) 
  const [orderCode, setOrderCode] = useState('') 
  const [orderTitle, setOrderTitle] = useState('')
  const [tagName,setTagName] = useState('') 
  const [tags, setTags] = useState<tagType[]>([])

  const toast = useToast()
  const navigation = useNavigation()

  
  function handleAddTags() {
    Keyboard.dismiss()
    setTagName('')
    if (!tagName) {
      return toast.show({description: 'Insira o nome da tag'})
    }
    if (tags.length >= 5) {
      return toast.show({description: 'Adicione até 5 Tags'})
    } 
    setTags( current =>[...current, {tagName: tagName, tagColor: color}])
  }

  function handleCreateOrder() {
    if (!orderTitle || !orderCode ) {
      return toast.show({description: 'Preencha os campos!'})
    }
    if (tags.length == 0) {
      return toast.show({description: 'Adicione pelo menos 1 Tag'})
    }
    setIsLoading(true)
    const userID = auth().currentUser?.uid

    firestore()
    .collection('Order')
    .add({
      orderCode,
      orderTitle,
      userID
    })
    .then( async function (docRef) {
      const orderId = docRef.id
      await tags.forEach(tag=> {
        firestore()
        .collection('Tags')
        .add({
          orderId,
          tagColor: tag.tagColor,
          tagName: tag.tagName
        })
      })
      toast.show({description: 'Adicionado!'})
      navigation.goBack()
    }
    ).catch((error) =>  {
      setIsLoading(false)
      console.log(error)
    })
    
  }
  
  return (
    <VStack flex={1} flexDir={'column'} justifyContent={'space-between'}>
      <VStack p={5}>
      <Header title='Nova Encomenda' />
      <Input title='Código de rastreamento' placeholder='#1234ACASDDF2C' onChangeText={setOrderCode}/>
      <Input title='Nome' placeholder='Roupa...' onChangeText={setOrderTitle}/>
      <Input title='Tags' placeholder='Loja...' buttonTitle='Adicionar' value={tagName} buttonColor={color} onChangeText={setTagName} buttonFunc={handleAddTags} maxLength={10}/>
      
      <VStack  flexDirection="row" justifyContent="space-between" mt="6">
        
      {tagColors.map(color=> {
        return(
          <Pressable key={color} backgroundColor={color} h="8" w="8" rounded="lg" onPress={()=> setColor(color)}/>
          )
      })}

      </VStack>
        <FlatList
        mt={5}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tags}
        renderItem={({item}) => <OrderTag color={item.tagColor} title={item.tagName}/>}
        />
        
        {tags.length > 0 ?
          <Pressable alignItems="center" justifyContent="center" mt={3} onPress={()=> setTags([])}>
            <Text color="green.700" fontWeight="bold" fontSize={16}>Limpar Tags</Text>
          </Pressable> 
          : ""  
        }
      </VStack>

      <HStack alignItems="center" justifyContent="center" p={5}>
      <Button title="Adicionar Encomenda" w="full" onPress={handleCreateOrder} isLoading={isLoading}/>
      </HStack>

      

    </VStack>
  );
}