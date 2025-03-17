import { View, Text, Button, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { clearTask } from '@/redux/tasksSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

export default function LogOut() {
  const dispatch =useDispatch()
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  const handleLogout =useCallback(()=>{
    dispatch(clearTask())
    clearStorage()
                Alert.alert("Logout Successfully..")
    
    router.navigate("/AuthScreen")

  },[])
  return (
    <View style={{flex:1}}>
      <View style={{justifyContent:"center",alignItems:"center",flex:1,paddingBottom:10}}>
      <Button title='Logout' onPress={handleLogout} ></Button>
      </View>
    </View>
  )
}