import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemList = ({ route, navigation }) => {
  const [lista, setLista] = useState({
    name: route.params.listName,
    items: [],
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const loadList = async () => {
      try {
        const storedList = await AsyncStorage.getItem(`Lista-${lista.name}`);
        if (storedList) {
          setLista({
            name: lista.name,
            items: JSON.parse(storedList),
          });
        }
      } catch (error) {
        console.error("Erro ao carregar lista do AsyncStorage:", error);
      }
    };

    loadList();
  }, [lista.name]);

  useEffect(() => {
    const saveList = async () => {
      try {
        await AsyncStorage.setItem(
          `Lista-${lista.name}`,
          JSON.stringify(lista.items)
        );
      } catch (error) {
        console.error("Erro ao salvar lista no AsyncStorage:", error);
      }
    };

    if (lista.items.length) {
      saveList();
    }
  }, [lista]);

  const addItem = () => {
    if (lista.items.length < 10) {
      const newItem = {
        nome: `Item ${lista.items.length + 1}`,
        dataAlteracao: new Date(),
      };
      setLista((prevList) => ({
        ...prevList,
        items: [...prevList.items, newItem],
      }));
    } else {
      alert("Você não pode mais adicionar itens a esta lista");
    }
  };

  const deleteItem = (index) => {
    if (lista.items.length > 0) {
      const updatedItems = [...lista.items];
      updatedItems.splice(index, 1);
      setLista((prevList) => ({ ...prevList, items: updatedItems }));
    }
  };

  const editItemName = (index) => {
    setEditingIndex(index);
    setEditedName(lista.items[index].nome);
  };

  const saveEditedItemName = () => {
    if (editingIndex !== null) {
      const updatedItems = [...lista.items];
      updatedItems[editingIndex] = {
        nome: editedName,
        dataAlteracao: new Date(),
      };
      setLista((prevList) => ({ ...prevList, items: updatedItems }));
      setEditingIndex(null);
    }

    Keyboard.dismiss();
  };

  const sortedItems = lista.items.sort(
    (a, b) => b.dataAlteracao - a.dataAlteracao
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Itens da Lista: {lista.name}</Text>

      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>Adicionar Item</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <FlatList
          data={sortedItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity>
                {editingIndex === index ? (
                  <TextInput
                    style={styles.editInput}
                    value={editedName}
                    onChangeText={(text) => setEditedName(text)}
                    editable={true}
                  />
                ) : (
                  <Text style={styles.text}>{item.nome}</Text>
                )}
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                {editingIndex === index ? (
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={saveEditedItemName}
                  >
                    <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => editItemName(index)}
                    >
                      <Text style={styles.buttonText}>Editar Nome</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => deleteItem(index)}
                    >
                      <Text style={styles.buttonText}>Remover Item</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3c3c3c",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#3c3c3c",
    borderColor: "#ffffff",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    backgroundColor: "#3c3c3c",
    borderColor: "#ffffff",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom : 200,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    margin: 10,
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  editInput: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  keyboardAvoidingContainer: {
    flex: 1,
   
    width: "100%",
    
  },
});

export default ItemList;
