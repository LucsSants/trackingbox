import {Center, Spinner} from 'native-base'

export function Loading() {
  return (
    <Center flex={1} _light={{bg:"white"}} _dark={{bg: `black`}}>
      <Spinner color="green.500"/>
    </Center>
  )
}