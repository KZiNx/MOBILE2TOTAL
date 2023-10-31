import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [lists, setLists] = useState([]);
  
    useEffect(() => {
    
      const mockLists = [
        { id: '1', name: 'Lista de Compras', lastModified: new Date() },
        { id: '2', name: 'Tarefas de Hoje', lastModified: new Date() },
      ];
      setLists(mockLists);
    }, []);
  
    const handleEditList = (list) => {

      navigation.navigate('EditList', { list });
    };
  
    const handleDeleteList = (listId) => {
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Suas Listas</Text>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TouchableOpacity
                onPress={() => navigation.navigate('List', { list: item })}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
              <Button title="Editar" onPress={() => handleEditList(item)} />
              <Button
                title="Excluir"
                onPress={() => handleDeleteList(item.id)}
              />
            </View>
          )}
        />
        <Button
          title="Adicionar Lista"
          onPress={() => {
          
            navigation.navigate('EditList', { list: null });
          }}
        />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
