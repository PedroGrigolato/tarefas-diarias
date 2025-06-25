import React, { useState, useEffect } from 'react';
import { Alert, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemList from '../components/itemList.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [items, setItem] = useState([]);
  useEffect(() => {
    getItemsFromDevice()
  }, [])

  useEffect(() => {
    saveItemsToDevice();
  }, [items])

  const getItemsFromDevice = async () => {
    try {
      const itemsMemory = await AsyncStorage.getItem('escola-todo-app');
      if (itemsMemory != null)
        setItem(JSON.parse(itemsMemory))
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }

  const saveItemsToDevice = async () => {
    try {
      const itemsJson = JSON.stringify(items);
      await AsyncStorage.setItem('escola-todo-app', itemsJson);
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }

  const addItem = () => {
    if (textInput == '') {
      Alert.alert(
        'Ocorreu um problema :(',
        'Por favor, informe o nome da tarefa'
      );
    } else {
      const newItem = {
        id: Date.now().toString(),
        name: textInput,
        bought: false
      }
      setItem([...items, newItem]);
      setTextInput('');
    }
  } 

  const markItemBought = itemId => {
    const newItems = items.map((item) => {
      if (item.id == itemId) {
        return {...item, bought: true}
      }
      return item;
    });
    setItem(newItems);
  }

  const unmarkItemBought = itemId => {
    const newItems = items.map((item) => {
      if (item.id == itemId) {
        return {...item, bought: false}
      }
      return item;
    });
    setItem(newItems);
  }

  const removeItem = itemId => {
    Alert.alert(
      'Excluir tarefa?', 'Confirmar a exclusão da tarefa?',
      [
        {text: 'sim', onPress: () => {
          const newItems = items.filter(item => item.id != itemId);
          setItem(newItems);
        }
      },
      {
        text: 'cancelar', style: 'cancel'
      }
     ]
    );
  }

  const removeAll = () => {
    Alert.alert(
      'Limpar?', 'Confirmar a exclusão de todas as tarefas?',
      [
        {
          text: 'Sim',
          onPress: () => { setItem([])}
        },
        {
          text: 'Cancelar', style: 'cancel'
        }
      ]
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={{ flex: 1, justifyContent: 'flex-start'}}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Tarefas</Text>
          <Ionicons name="trash" size={32} color="red" onPress={removeAll}/>
        </View>

        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 100, color: '#fff' }}
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => 
            <ItemList
              item={item}
              markItem={markItemBought}
              unmarkItem={unmarkItemBought}
              removeItem={removeItem} />
          }
        />

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput 
              color="#fff"
              fontSize={18}
              placeholderTextColor="#aeaeae"
              placeholder='Digite a tarefa...'
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
            />
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={addItem}>
            <Ionicons name="add" size={36} color="#fff" />
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff'
  },
  footer: {
    backgroundColor: '#000000c0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#000",
    height: 50,
    marginVertical: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
})