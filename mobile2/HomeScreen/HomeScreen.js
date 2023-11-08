import React, { useState } from "react";
import { Button, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";

function HomeScreen({ navigation }) {
  const [quantidadeLista, setQuantidadeLista] = useState(0);
  const [listas, setListas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState("");

  const addList = () => {
    if (quantidadeLista < 10) {
      const newListas = [...listas, `Lista ${quantidadeLista + 1}`];
      setListas(newListas);
      setQuantidadeLista(quantidadeLista + 1);
    } else {
      alert("Você não pode mais adicionar listas");
    }
  }

  const deleteList = (index) => {
    if (quantidadeLista > 0) {
      const newListas = [...listas];
      newListas.splice(index, 1);
      setListas(newListas);
      setQuantidadeLista(quantidadeLista - 1);
    }
  }

  const editListName = (index) => {
    setEditingIndex(index);
    setEditedName(listas[index]);
  }

  const saveEditedListName = () => {
    if (editingIndex !== null) {
      const newListas = [...listas];
      newListas[editingIndex] = editedName;
      setListas(newListas);
      setEditingIndex(null);
    }
  }

  const navigateToItemList = (listName) => {
    navigation.navigate('ItemList', { listName });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Aqui estão as suas listas</Text>

      <Button
        title="Adicionar Lista"
        onPress={addList}
      />

      <Text>Você tem {quantidadeLista}/10</Text>

      <FlatList
        data={listas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity onPress={() => navigateToItemList(item)}>
              {editingIndex === index ? (
                <TextInput
                  value={editedName}
                  onChangeText={(text) => setEditedName(text)}
                />
              ) : (
                <Text>{item}</Text>
              )}
            </TouchableOpacity>
            {editingIndex === index ? (
              <Button
                title="Salvar"
                onPress={saveEditedListName}
              />
            ) : (
              <>
                <Button
                  title="Editar Nome"
                  onPress={() => editListName(index)}
                />
                <Button
                  title="Remover Lista"
                  onPress={() => deleteList(index)}
                />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

export default HomeScreen;
