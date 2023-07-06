import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../Screens/Home";
import { NewOrder } from "../Screens/NewOrder";

const {Navigator,Screen} = createNativeStackNavigator();
export function AppRoutes() {
  return(
    <Navigator screenOptions={{headerShown:false}}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={NewOrder} />
    </Navigator>
  )
}