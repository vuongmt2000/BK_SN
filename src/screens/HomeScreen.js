import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([])
  const [data_room, setData_room] = useState([])
  console.log(`data`, data)
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
      axios.get('http://localhost:5000/api/room/get_room')
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
  const ItemAvatar = (item) => {
    // console.log(`item`, item)
    return (
      <View style={{ height: 60, width: 60, padding: 4 }}>
        <Image source={{ uri: item.item.avatar }} style={{ height: 48, width: 48, borderRadius: 50 }} />
        <Text numberOfLines={1}>{item.item.username}</Text>
      </View>
    )
  }
  const ItemMess = (item) => {
    console.log(`item`, item)
    return (
      <View style={{ flexDirection: "row",  alignItems: "center" }}>
        <Image source={{ uri: item.item.avatar_room }} style={{ height: 48, width: 48, borderRadius: 50 }} />
        <View style = {{marginLeft: 8}}>
          <Text>{item.item.name_room}</Text>
          <Text>{item.item.name_room}</Text>
        </View>
      </View>
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
     <View style = {styles.item_mess}>
     {data_room?.map((item) =>(
        <ItemMess item = {item} />
      ))}
     </View>
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
