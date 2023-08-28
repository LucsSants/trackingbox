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

const inputString = '[{"tagName":"aaa","tagColor":{"hex":"#24A6D9"}}]';
const formattedString = removeQuotesAroundKeys(inputString);
  
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
    const {Data, Hora, Local ,Status} : any = await getLastStatus("LB568216445HKa")
    const tagsFormated = removeQuotesAroundKeys(JSON.stringify(tags))
    console.log(tagsFormated)
    CreateOrderTwo(orderCode, orderTitle, Data, Hora, Status, tagsFormated)

    setIsLoading(false)
    navigation.navigate('home')
    
  }
  
  return (
    <VStack flex={1} flexDir={'column'} justifyContent={'space-between'}>
      <VStack p={5}>
      <Header title='Nova Encomenda' />
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

      <HStack alignItems="center" justifyContent="center" p={5}>
      <Button title="Adicionar Encomenda" w="full" onPress={handleCreateOrder} isLoading={isLoading}/>
      </HStack>

      

    </VStack>
  );
}