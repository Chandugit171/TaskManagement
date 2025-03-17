import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const TaskList = () => {
    const tasks = useSelector((state:any) => state.tasks);

    const renderItem = ({ item }:any) => (
        <View style={{ marginHorizontal: 10 ,justifyContent:"center",borderBottomWidth:1,alignItems:"center",borderBottomColor:"#ccc"}}>
            <Text style={{ fontSize:24, color: 'green' }}>{item.title}</Text>
            <Text>{item.description}</Text>
        </View>
    );



    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    No tasks available.
                </Text>
            }
        />
    );
};


export default function Home() {
  return (
    <View>
        <View style={{justifyContent:"center",flexDirection:"row",gap:10,alignItems:"center"}}>
        <Text style={{fontSize:24,textAlign:"center",color:"#000"}}>List of the Tasks</Text>
        <Ionicons name={ 'home-sharp'} color={"green"} size={24} />

        
        </View>
      <TaskList />

    </View>
  )
}