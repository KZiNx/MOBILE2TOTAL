import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import EditTela from '.';

const EditTela = ({ navigation, route }) => {
  const [listName, setListName] = useState('');
  const isEditing = route.params && route.params.list;

  useEffect(() => {
    if (isEditing) {
      // Se você está editando uma lista existente, preencha o nome da lista
      setListName(route.params.list.name);
    }
  }, [isEditing]);

  const handleSaveList = () => {
    if (isEditing) {
      // Implemente a lógica para atualizar a lista existente com o novo nome
      // e quaisquer outras informações relevantes.
    } else {
      // Implemente a lógica para adicionar uma nova lista com o nome fornecido.
    }

    // Navegue de volta para a tela HomeScreen ou para onde desejar.
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? 'Editar Lista' : 'Adicionar Lista'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Lista"
        value={listName}
        onChangeText={(text) => setListName(text)}
      />
      <Button title="Salvar" onPress={handleSaveList} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default EditTela;
