import { StatusBar } from 'expo-status-bar';
import { Button, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useContext, useState } from 'react';
import Jogador from '../Jogador';
import { PartidaContext } from '../Context';

export default function ListaDeJogadores({}) {
    const { jogadores, adicionaJogadorNaLista, removeJogadorNaLista, sortearJogadoresNosTimes } = useContext(PartidaContext);
    return (
        <SafeAreaView style={styles.container}>
            <Text>Jogadores Ativos</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => adicionaJogadorNaLista("joaozinho")} style={[styles.button, styles.jogadoresButton]}>
                    <Text style={styles.buttonText}>Jogadores</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => sortearJogadoresNosTimes()} style={[styles.button, styles.partidaButton]}>
                    <Text style={styles.buttonText}>Sortear</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollVew} showsVerticalScrollIndicator={false}>
                {jogadores && jogadores.map(jogador => (
                    <View key={jogador.numero} style={styles.jogador}>
                        <Jogador jogador={jogador}/>
                        <TouchableOpacity onPress={() => removeJogadorNaLista(jogador.numero)} style={[styles.button, styles.remove]}>
                            <Text style={styles.buttonText}>X</Text>
                        </TouchableOpacity>
                    </View>  
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '10%',
      width: '80%',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
  
      backgroundColor: '#fff',
    },
  
    scrollVew: {
      flex: 1,
      marginTop: '10%',
      width: '100%',
    },
  
    buttonsContainer: {
      width: '100%',
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      borderRadius: 10,
      height: 40,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },

    remove: {
        borderRadius: 5,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
  
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: `600`
    },
  
    jogadoresButton: {
      backgroundColor: 'blue'
    },
    
    partidaButton: {
      backgroundColor: 'green'
    },

    titulo: {
        height: 30,
        opacity: 0.7,
    },

    jogador: {
        flex: 1,
        width: '100%',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
  });