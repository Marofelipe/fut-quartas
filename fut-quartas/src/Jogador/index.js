import * as React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";


const styles =  StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        padding: 10,
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderWidth: 1,
    }
})

export default function Jogador({jogador}) {
    const [player, setJogador] = React.useState(jogador);
    
    return (
        <View>
            <TextInput 
                style={styles.input}
                value={player.nome}
                onChangeText={(text) => setJogador({...Jogador, nome: text})}
            />
        </View>
    );
}


