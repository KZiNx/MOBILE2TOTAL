import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";

function HomeScreen({ navigation }) {
  const [quantidadeLista, setQuantidadeLista] = useState(0);
  const [listas, setListas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState("");

  const addList = () => {
    if (quantidadeLista < 10) {
      const newListas = [
        ...listas,
        {
          name: `Lista ${quantidadeLista + 1}`,
          createdAt: new Date(),
          lastModified: new Date(),
        },
      ];
      setListas(newListas);
      setQuantidadeLista(quantidadeLista + 1);
    } else {
      alert("Você não pode mais adicionar listas");
    }
  };

  const deleteList = (index) => {
    if (quantidadeLista > 0) {
      const newListas = [...listas];
      newListas.splice(index, 1);
      setListas(newListas);
      setQuantidadeLista(quantidadeLista - 1);
    }
  };

  const editListName = (index) => {
    setEditingIndex(index);
    setEditedName(listas[index].name);
  };

  const saveEditedListName = () => {
    if (editingIndex !== null) {
      const newListas = [...listas];
      newListas[editingIndex] = {
        ...newListas[editingIndex],
        name: editedName,
        lastModified: new Date(),
      };
      setListas(newListas);
      setEditingIndex(null);
    }
  };

  const navigateToItemList = (listName) => {
    navigation.navigate('ItemList', { listName });
  };

 
  const sortedLists = listas.sort(
    (a, b) => b.lastModified.getTime() - a.lastModified.getTime()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aqui estão as suas listas</Text>

      <TouchableOpacity style={styles.button} onPress={addList}>
        <Text style={styles.buttonText}>Adicionar Lista</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Você tem {quantidadeLista}/10</Text>

      <FlatList
        data={sortedLists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItemContainer}>
            <TouchableOpacity
              onPress={() => navigateToItemList(item.name)}
              style={styles.button2}
            >
              {editingIndex === index ? (
                <TextInput
                  style={styles.input}
                  value={editedName}
                  onChangeText={(text) => setEditedName(text)}
                />
              ) : (
                <View style={styles.buttonContainer2}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.timestampText}>
                    Última modificação: {item.lastModified.toLocaleString()}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              {editingIndex === index ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={saveEditedListName}
                >
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => editListName(index)}
                  >
                    <Text style={styles.buttonText}>Editar Nome</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => deleteList(index)}
                  >
                    <Text style={styles.buttonText}>Remover Lista</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3c3c3c',
   
  },
  buttonText: {
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 16, 
    
  },
  button: {
    backgroundColor: '#3c3c3c',
    borderColor: '#ffffff',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  button2: {
    backgroundColor: '#3c3c3c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    margin: 10,
    alignItems: 'center',
  },
  input: {
    color: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',

   },
    listItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
  
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonContainer2: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  listItemContainer: {

    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timestampText: {
    color: "#ffffff",
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default HomeScreen;
