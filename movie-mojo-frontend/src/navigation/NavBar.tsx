import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import WatchList from '../screens/WatchList';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import React from 'react';
import MoviePage from '../screens/MoviePage';
import { RootStackParamList } from './RootStackParamList';

const Tab = createBottomTabNavigator<RootStackParamList>();

export function NavBar() {
  return (
    <Tab.Navigator initialRouteName='Search' backBehavior='history' screenOptions={{ headerShown: false, tabBarLabelStyle: {
        display: "none"
      }, tabBarStyle: {
        paddingTop: 20,
        borderTopColor: "#D4AF37",
        borderTopWidth: 1,
        height: 78,
        backgroundColor: '#000000'
      }
}}
        >
      <Tab.Screen name="HomeScreen" component={Home}
      options={{
        tabBarIcon: (tabInfo) => { 
            return ( 
              <Ionicons 
                name="md-home"
                size={tabInfo.focused ? 28 : 24} 
                color={tabInfo.focused ? "#D4AF37" : "#8e8e93"} 
              /> 
            ); 
        }
      }}
      />
      <Tab.Screen name="Search" component={Search}
        options={{
            tabBarIcon: (tabInfo) => { 
                return ( 
                    <Ionicons 
                    name="search"
                    size={tabInfo.focused ? 28 : 24} 
                    color={tabInfo.focused ? "#D4AF37" : "#8e8e93"} 
                    /> 
                ); 
            }
            }} />
      <Tab.Screen name="WatchList" component={WatchList} 
        options={{
        tabBarIcon: (tabInfo) => { 
            return ( 
                <Ionicons 
                name="tv"
                size={tabInfo.focused ? 28 : 24} 
                color={tabInfo.focused ? "#D4AF37" : "#8e8e93"} 
                /> 
            ); 
        }
        }}
      />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
        tabBarIcon: (tabInfo) => { 
            return ( 
                <Ionicons 
                name="person"
                size={tabInfo.focused ? 28 : 24} 
                color={tabInfo.focused ? "#D4AF37" : "#8e8e93"} 
                /> 
            ); 
        }
        }}
      />
      <Tab.Screen name="MoviePage" component={MoviePage}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: (props) => null, //this is additional if you want to hide the tab element from the bottom nav
          tabBarIcon: (tabInfo) => { 
            return ( 
                <Ionicons 
                name="square"
                size={tabInfo.focused ? 28 : 24} 
                color={tabInfo.focused ? "#D4AF37" : "#8e8e93"} 
                /> 
            ); 
        }
        }}
      />
    </Tab.Navigator>
  );
}