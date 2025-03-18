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

}else{
  router.navigate("/AuthScreen")

}

}
useEffect(()=>{
  handleRedirections()
},[])



  return (

<></>

  );
}
