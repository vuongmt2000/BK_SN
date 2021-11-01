import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([])
  const [data_room, setData_room] = useState([])
  useEffect(() => {
    axios.get('https://severforappmess.herokuapp.com/api/user')
      .then(function (response) {
        // handle success
        console.log(response.data.message);
        setData(response.data.message)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      axios.get('https://severforappmess.herokuapp.com/api/room/get_room')
      .then(function (response) {
        // handle success
        console.log(response.data.message);
        setData_room(response.data.message)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [])

  const createRoom = (item) =>{
    navigation.navigate("chat", {user: item})
    axios.post('https://severforappmess.herokuapp.com/api/room/create', {
      avatar: item.item.avatar,
      friend: item.item.username,
      name_room: item.item.username
    })
    .then(function (response) {
      console.log( "hello", response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const intoRoom = (item) =>{
    navigation.navigate("chat", {user: item})
    axios.post('https://severforappmess.herokuapp.com/api/room/update_room', {
      avatar: item.item.avatar,
      friend: item.item.username,
      name_room: item.item.username,
      createAt : item.item.createAt,
      messages_room: item.item.messages_room
    })
    .then(function (response) {
      console.log( "hello", response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  const ItemAvatar = (item) => {
    // console.log(`item`, item)
    return (
      <TouchableOpacity style={{ height: 60, width: 60, padding: 4 }} onPress = {() => {createRoom(item)}}>
        <Image source={{ uri: item.item.avatar }} style={{ height: 48, width: 48, borderRadius: 50 }} />
        <Text numberOfLines={1}>{item.item.username}</Text>
      </TouchableOpacity>
    )
  }
  const ItemMess = (item) => {
    console.log(`item`, item)
    return (
      <TouchableOpacity onPress ={() => {intoRoom(item)} }
      style={{ flexDirection: "row",  alignItems: "center" , paddingHorizontal: 16, paddingVertical: 8}}>
        <Image source={{ uri: item.item.avatar_room }} style={{ height: 48, width: 48, borderRadius: 50 }} />
        <View style = {{marginLeft: 8}}>
          <Text numberOfLines={1}>{item.item.name_room}</Text>
          <Text numberOfLines={1}>{item.item.name_room}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.iconAvatar} horizontal snapToEnd={true} showsHorizontalScrollIndicator = {false}>
        {data.map(item => (
          <ItemAvatar item={item} />
        ))}
      </ScrollView>
     <ScrollView style = {styles.item_mess}>
     {data_room?.map((item) =>(
        <ItemMess item = {item} />
      ))}
     </ScrollView>
      <View>

      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconAvatar: {
    flexDirection: "row", 
    padding: 16,
    height: 100,
    flexGrow: 0
  },
  item_mess: {
    flexGrow: 1,
  }
});
