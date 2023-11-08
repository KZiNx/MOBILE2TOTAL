import React, { useState } from "react";
import { Button, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";

function ItemList({ route, navigation }) {
  const [lista, setLista] = useState({ name: route.params.listName, items: [] });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState("");

  const addItem = () => {
    if (lista.items.length < 10) {
      const newItem = `Item ${lista.items.length + 1}`;
      lista.items.push(newItem);
      setLista({ ...lista });
    } else {
      alert("Você não pode mais adicionar itens a esta lista");
    }
  }

  const deleteItem = (index) => {
    if (lista.items.length > 0) {
      lista.items.splice(index, 1);
      setLista({ ...lista });
    }
  }

  const editItemName = (index) => {
    setEditingIndex(index);
    setEditedName(lista.items[index]);
  }

  const saveEditedItemName = () => {
    if (editingIndex !== null) {
      lista.items[editingIndex] = editedName;
      setLista({ ...lista });
      setEditingIndex(null);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Itens da Lista: {lista.name}</Text>

      <Button
        title="Adicionar Item"
        onPress={addItem}
      />

      <FlatList
        data={lista.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity>
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
                onPress={saveEditedItemName}
              />
            ) : (
              <>
                <Button
                  title="Editar Nome"
                  onPress={() => editItemName(index)}
                />
                <Button
                  title="Remover Item"
                  onPress={() => deleteItem(index)}
                />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

export default ItemList;
