import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import CardView from 'react-native-cardview'
import { TextInput } from 'react-native-gesture-handler'

const Credit = () => {
  return (
    <View style={{paddingHorizontal:10}}>
           <CardView
      cardElevation={5}
      cardMaxElevation={2}
      cornerRadius={12}
      style={styles.cardViewe1}>
      <View
        android_ripple={{color: 'black', borderless: true}}
        // onPress={props.MoveForward}
        >
        <View>
            <Text >22233</Text>
        </View>
      </View>
    </CardView>
    <TextInput
        placeholder="Enter Phone Number"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
    </View>
  )
}

export default Credit

const styles = StyleSheet.create({
    cardViewe1: {
        width:'100%',
        height: 180,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
      },
})