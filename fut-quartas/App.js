import { StatusBar } from 'expo-status-bar';
import { Button, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Time from './src/Time';
import { useCallback, useState } from 'react';
import ListaDeJogadores from './src/ListaDeJogadores';
import { PartidaProvider } from './src/Context';
import Dashboard from './src/Dashboard';

export default function App() {
  const [configuracaoPartida, setConfiguracaoPartida] = useState({
    numeroDeJogadoresPorTime: 5,
    tempo: 8,
    maximoDeGols: 2,
    casoEmpate: 'SORTEIO'
  });

  const [jogadores, setJogadores] = useState();
  
  const [times, setTimes] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimes([]);
    setTimeout(() => {
      setRefreshing(false);
      sortearJogadoresNosTimes(jogadores, configuracaoPartida.numeroDeJogadoresPorTime);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <PartidaProvider>
        <Dashboard jogadores={jogadores}/>
      </PartidaProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',
  },
});
