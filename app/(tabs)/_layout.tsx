import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
      }}
      
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="CreateTask"
        options={{
          title: 'CreateTask',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-outline'} color={color} size={24}/>
          ),
          headerShown: false
        }}
      />
            <Tabs.Screen
        name="LogOut"
        options={{
          title: 'Logout',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'log-out' : 'log-out-outline'} color={color} size={24}/>
          ),
          headerShown: false
        }}
      />
      
    </Tabs>
  );
}
