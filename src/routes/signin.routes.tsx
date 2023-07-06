import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignIn } from "../Screens/SignIn"
import { SignUp } from "../Screens/SignUp"
import { Home } from "../Screens/Home";

const {Navigator,Screen} = createNativeStackNavigator();
export function SignInRoutes() {
  return(
    <Navigator screenOptions={{headerShown:false}}>
      <Screen name="signin" component={SignIn} />
      <Screen name="signup" component={SignUp} />
    </Navigator>
  )
}