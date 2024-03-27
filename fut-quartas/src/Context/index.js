import React, {createContext, useState, useEffect} from 'react';

export const PartidaContext = createContext();

export const PartidaProvider = ({children}) =>{
    const [configuracoes, SetConfiguracoes] = useState({
        timesJaSorteados: false,
        partidasIniciadas: false,
        numeroDeJogadoresPorTime: 5
    });
    const [times, SetTimes] = useState([]);
    const [jogadores, SetJogadores] = useState([
        { nome: "Alisson", numero: 1 },
        { nome: "Marcos", numero: 2 },
        { nome: "Fael", numero: 3 },
        { nome: "Elcio", numero: 4 },
        { nome: "Biro", numero: 5 },
        { nome: "João Vitor", numero: 6 },
        { nome: "Dudu", numero: 7 },
        { nome: "Vitor Farias", numero: 8 },
        { nome: "Vinicius Santos", numero: 9 },
        { nome: "Duarte", numero: 10 },
        { nome: "Didi", numero: 11 },
        { nome: "Raysson", numero: 12 },
        { nome: "Zuba", numero: 13 },
        { nome: "Estanis", numero: 14 },
        { nome: "João Pedro", numero: 15 },
        { nome: "Thiago Santos", numero: 16 },
        { nome: "Nathan", numero: 17 },
        { nome: "Alex", numero: 18 },
        { nome: "Matheus", numero: 19 },
        { nome: "Pablo", numero: 20 },
        { nome: "Ítalo", numero: 21 },
        { nome: "Tiago thg", numero: 22 },
        { nome: "Fábio", numero: 23 },
        { nome: "Daniel", numero: 24 },
        { nome: "Nogueira", numero: 25 },
        { nome: "Luck", numero: 26 },
        { nome: "Jonathan", numero: 27 }, // convidado de Luck
        { nome: "Eduardo", numero: 28 }, // convidado de Luck
        { nome: "Bruno", numero: 29 } // convidado de Luck
    ]);
    const [partidas, SetPartidas] = useState([]);


    const setConfiguracoes = (numeroDeJogadoresPorTime ,numeroDeGols, tempoDeJogo) => {
        if(numeroDeGols <= 0 || numeroDeGols > 3) return;

        SetConfiguracoes({
            numeroDeJogadoresPorTime: numeroDeJogadoresPorTime,
            tempo: tempoDeJogo,
            maximoDeGols: numeroDeGols,
            casoEmpate: 'SORTEIO'
        });
    }

    const adicionaJogadorNaLista = (nome) => {
        let jogador = novoJogador(nome);
        if(!jogador) return;

        SetJogadores([...jogadores, jogador]);
    }

    const removeJogadorNaLista = (numero) => {
        let lista = [...jogadores];
        let jogador = lista.find(x => x.numero == numero);
        let index = lista.indexOf(jogador);

        if(index == -1) return;
        lista.splice(index, 1);
        SetJogadores(lista);
    }

    const novoJogador = (nome) => {
        if(jogadores.find(item => item.nome === nome)) return;
        let jogador = { nome: nome, numero: (jogadores.length + 1) }

        SetJogadores([...jogadores, jogador]);
        return jogador;
    }

    const sortearJogadoresNosTimes = () => {
        const timesOld = [];
        let jogadoresRestantes = [...jogadores];
    
        // Sorteia os jogadores enquanto houver jogadores restantes
        while (jogadoresRestantes.length > 0) {
          // Cria um novo time
          const novoTime = {
            numero: times.length + 1,
            nome: `Time ${times.length + 1}`,
            jogadores: []
          };

          // Adiciona jogadores ao time até atingir o limite
          for (let i = 0; i < configuracoes.numeroDeJogadoresPorTime && jogadoresRestantes.length > 0; i++) {
            // Sorteia um jogador aleatório
            const jogadorIndex = Math.floor(Math.random() * jogadoresRestantes.length);
            const jogadorSorteado = jogadoresRestantes[jogadorIndex];
    
            // Remove o jogador sorteado da lista de jogadores restantes
            jogadoresRestantes.splice(jogadorIndex, 1);
    
            // Adiciona o jogador ao time
            novoTime.jogadores.push(jogadorSorteado);
          }
    
          // Adiciona o novo time à lista de times
          timesOld.push(novoTime);
        }
        
        SetTimes(timesOld);
        SetConfiguracoes({...configuracoes, timesJaSorteados: true})
    };

    const adicionaNovoJogador = (nome) => {
        let jogador = novoJogador(nome);
        let timesOld = times;
        let timesVazios = timesOld.find(x => x.jogadores.length != 5);
        if(!timesVazios) {
            SetTimes([...times, {
                numero: times.length + 1,
                nome: `Time ${times.length + 1}`,
                jogadores: [jogador]
            }]);
        } else {
            let index = timesOld.indexOf(timesVazios);
            timesOld[index].jogadores.push(jogador);
            SetTimes(timesOld);
        }
    }

    return(
        <PartidaContext.Provider value={{
            configuracoes,
            times,
            jogadores,
            setConfiguracoes,
            adicionaJogadorNaLista,
            removeJogadorNaLista,
            sortearJogadoresNosTimes,
            adicionaNovoJogador
        }}>
            {children}
        </PartidaContext.Provider>
    );
}