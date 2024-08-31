import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscriber.onSnapshot(querysnapshot => {
      const allmessages = querysnapshot.docs.map(item => {
        return { ...item._data, createdAt: item._data.createdAt };
      });
      setMessageList(allmessages);
    });
    return () => subscriber();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessageList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10, marginBottom: 10 }}>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
        // renderInputToolbar={(props) => {
        //   return (
        //     <InputToolbar
        //       {...props}
        //       containerStyle={{ borderTopLeftRadius: 30, borderBottomLeftRadius: 30, borderColor: '#EEEEEF', borderWidth: 0, width: '100%' }}
        //     />
        //   )
        // }}
      />
      <TouchableOpacity style={{
        height: 45, width: 35, borderColor: '#EEEEEF', borderWidth: 0, backgroundColor: 'white', alignSelf: 'flex-end', justifyContent
          : 'center', alignItems: 'center'
      }} 
      onPress={()=>navigation.navigate('Credit')}>
        <Text style={{ color: 'black' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
