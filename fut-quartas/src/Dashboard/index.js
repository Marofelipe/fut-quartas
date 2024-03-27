import { StatusBar } from 'expo-status-bar';
import { Button, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Time from '../Time';
import { useCallback, useContext, useState } from 'react';
import ListaDeJogadores from '../ListaDeJogadores';
import { PartidaContext } from '../Context';

export default function Dashboard() {
  const { times, configuracoes, sortearJogadoresNosTimes } = useContext(PartidaContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimes([]);
    setTimeout(() => {
      setRefreshing(false);
      sortearJogadoresNosTimes();
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {configuracoes.timesJaSorteados && 
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollVew} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          {times.map(time => <Time key={time.numero} time={time}/>)}
        </ScrollView>
      }
      {!configuracoes.timesJaSorteados &&
        <ListaDeJogadores/>
      }
    </SafeAreaView>
  );
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    borderRadius: 10,
    height: 60,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    
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
  }
});
