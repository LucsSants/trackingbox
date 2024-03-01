import React, { useState } from 'react';
import { VStack, Text, Pressable, FlatList, useToast } from 'native-base';
import { Header } from '../Components/Header';
import { Input } from '../Components/Input';
import { Keyboard } from 'react-native';
import { OrderTag } from '../Components/OrderTag';
import { Button } from '../Components/Button';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { CreateOrderTwo } from '../api/querries';
import { getLastStatus } from '../api/api';

export type tagType = {
  tagTitle: string;
  tagColor: {
    hex: string;
  };
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

  function removeQuotesAroundKeys(inputString: string): string {
    try {
        const modifiedString = inputString.replace(/"([^"]+)":/g, '$1:');
        return modifiedString;
    } catch (error) {
        return "Erro: A string JSON fornecida é inválida.";
    }
}
  
  function handleAddTags() {
    Keyboard.dismiss()
    setTagName('')
    if (!tagName) {
      return toast.show({description: 'Insira o nome da tag'})
    }
    if (tags.length >= 5) {
      return toast.show({description: 'Adicione até 5 Tags'})
    } 
    setTags( current =>[...current, {tagTitle: tagName, tagColor: {hex: color}}])
  }

  async function  handleCreateOrder() {
    if (!orderTitle || !orderCode ) {
      return toast.show({description: 'Preencha os campos!'})
    }
    if (tags.length == 0) {
      return toast.show({description: 'Adicione pelo menos 1 Tag'})
    }
    setIsLoading(true)
    const userID = auth().currentUser?.uid
    const {Data, Hora, Local ,Status} : any = await getLastStatus(orderCode)
    const tagsFormated = removeQuotesAroundKeys(JSON.stringify(tags))
    console.log(tagsFormated)
    CreateOrderTwo(orderCode, orderTitle, Data, Hora, Status, tagsFormated, userID)

    setIsLoading(false)
    navigation.goBack()
    
  }
  
  return (
    <VStack flex={1} flexDir={'column'} >
      <Header title='Nova Encomenda'/>
      <VStack px={5}  _dark={{bg: `black`}}>
      <Input title='Código de rastreamento' placeholder='#1234ACASDDF2C' onChangeText={setOrderCode}/>
      <Input title='Nome' placeholder='Roupa...' onChangeText={setOrderTitle}/>
      <Input title='Tags' placeholder='Loja...' buttonTitle='Adicionar' value={tagName} buttonColor={color} onChangeText={setTagName} buttonFunc={handleAddTags} maxLength={15}/>
      
      <VStack  flexDirection="row" justifyContent="space-between" mt="6">
        
      {tagColors.map(color=> {
        return(
          <Pressable key={color} backgroundColor={color} h="8" w="8" rounded="lg" onPress={()=> setColor(color)}/>
          )
      })}

      </VStack>
        <FlatList
         _dark={{bg: `black`}}
        mt={5}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tags}
        renderItem={({item}) => <OrderTag color={item.tagColor.hex} title={item.tagTitle}/>}
        />
        
        {tags.length > 0 ?
          <Pressable alignItems="center" justifyContent="center" mt={3} onPress={()=> setTags([])}>
            <Text color="green.700" fontWeight="bold" fontSize={16}>Limpar Tags</Text>
          </Pressable> 
          : ""  
        }
      </VStack>

      <VStack alignItems="center" justifyContent="flex-end" p={5} flex={1} _dark={{bg: `black`}}>
      <Button title="Adicionar Encomenda" w="full" onPress={handleCreateOrder} isLoading={isLoading}/>
      </VStack>
    </VStack>
  );
}