import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const tasks = useSelector((state:any) => state.tasks);
const handleRedirections =async()=>{
  const storedToken = await AsyncStorage.getItem('userToken');
if(storedToken){
  router.navigate("/(tabs)/Home")

}

}
useEffect(()=>{
  handleRedirections()
},[])

  return (

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <Text style={{fontSize:18,color:"#000"}}>Task Management App --Task</Text> */}
      <TouchableOpacity onPress={() => router.push('/AuthScreen')} style={{backgroundColor:"green",paddingHorizontal:10}}>
        
  <Text>Go to Tabs</Text>
</TouchableOpacity>
        </View>

  );
}
