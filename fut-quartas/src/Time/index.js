import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Jogador from "../Jogador";

const coresDosTimes = ["blue", "red", "green", "yellow", "purple", "gray", "pink", "orange"]


export default function Time({time}) {
    const [_time, setTime] = React.useState(time)

    return (
        <View style={styles.container} >
            <View id="header" style={[styles.container, getRandomColor(time.numero), styles.titulo]}>
                <Text>{time.nome}</Text>
            </View>
            
            {_time.jogadores 
                &&_time.jogadores.map((jogador) => (
                    <View key={jogador.numero} style={styles.jogador}>
                        <Jogador jogador={jogador}/>
                        <View>
                            <Button title="Remover"/>
                        </View>
                    </View>  
                ))}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    titulo: {
        height: 30,
        opacity: 0.7,
    },
    jogador: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});


const getRandomColor = (index) => {
    return {
        backgroundColor: coresDosTimes[index]
    }
}

