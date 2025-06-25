import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function ItemList({ item, markItem, unmarkItem, removeItem }) {
  return (
    <View style={styles.itemList}>
      <Text style={item?.bought ? styles.itemBought : styles.itemToBuy}>{item.name}</Text>

      {!item?.bought ?  (
        <TouchableOpacity style={[styles.actionIcon, {backgroundColor: 'darkgreen'}]} onPress={() =>markItem(item.id)}>
        <Ionicons name='bag-check-outline' size={24} color='#fff' />
      </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.actionIcon, {backgroundColor: 'darkgreen'}]} onPress={() =>unmarkItem(item.id)}>
        <Ionicons name='bag-remove-outline' size={24} color='#fff' />
      </TouchableOpacity>
      )}

      
      <TouchableOpacity style={[styles.actionIcon, {backgroundColor: 'darkred'}]} onPress={() => removeItem(item.id)}>
        <Ionicons name='trash-bin-outline' size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  itemList: {
    flex: 1,
    backgroundColor: '#000000c0',
    padding: 15,
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemToBuy: {
    flex: 1,
    color: 'white',
    fontSize: 24,
    textDecorationLine: 'none'
  },
  itemBought: {
    flex: 1,
    color: 'white',
    fontSize: 24,
    textDecorationLine: 'line-through'
  },
  actionIcon: {
    marginHorizontal: 10,
    borderRadius: '50%',
    padding: 10,
    justifyContent: 'center'
  }
})