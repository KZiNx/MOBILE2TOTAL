import { useState } from "react";
import { Button, Text, View } from "react-native";

function HomeScreen({ navigation }) {

  let [quantidadeLista, setQuantidadeLista] = useState("0")

    const addlist = () => {
      if (quantidadeLista <= 10) {
        setQuantidadeLista(quantidadeLista++)
      } else {
        alert("Você não pode mais adicionar listas")
      }
    }

    const deleteList = () => {
      if (quantidadeLista >= 0) {
        setQuantidadeLista(quantidadeLista--)
      }
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Aqui estão as suas listas</Text>

        <Button
                title="Adicionar Lista"
                onPress={() => navigation.navigate('Adicionar Lista')}
            />

            <Button
                title="add list"
                onPress={addlist}
            />

            <Button
                title="del list"
                onPress={deleteList}
            />

        <Text>Você tem {quantidadeLista}/10</Text>
      </View>
    );
  } 

  export default HomeScreen;