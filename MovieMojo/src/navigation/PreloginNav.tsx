import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamLoginList } from "./RootStackParamList";
import LoginScreen from "../screens/Login";
import PreloginScreen from "../screens/Prelogin";

export const Tab = createBottomTabNavigator<RootStackParamLoginList>();

function PreloginNav() {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
        name="Prelogin"
        component={PreloginScreen}
      />
      <Tab.Screen
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
        name="Login"
        component={LoginScreen}
      />
      
    </Tab.Navigator>
  );
}

export default PreloginNav;
