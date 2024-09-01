import { createStackNavigator } from "@react-navigation/stack";
import Map from "../components/Map";
import Splash from '../screens/splash/Splash'
import CheckInOutScreen from "../screens/splash/CheckInScreen";
import Attendance from "../screens/splash/Attendance";
import Dashboard from "../screens/splash/Dashoard";
import Login from "../screens/splash/Login";
const Stack = createStackNavigator();
export default function RootNavigation() {
    return (
      <Stack.Navigator screenOptions={{headerShown:false,}} initialRouteName="Splash">
        <Stack.Screen name="CheckInOutScreen" component={CheckInOutScreen} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login" component={Login} />
        
        {/* <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Attendence" component={Attendence} />
        <Stack.Screen name="DealerLocation" component={DealerLocation} />
        <Stack.Screen name="LocationTracking" component={LocationTracking} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CheckIn" component={CheckIn} /> */}
        
      </Stack.Navigator>
    );
  }
  