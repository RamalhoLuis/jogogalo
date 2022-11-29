import { StatusBar } from 'expo-status-bar';
import React, {useState}  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';


export default function App() {
  const [view, setView] = useState('menu');
  const [jogadorActual, setJogadorActual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [vencedor, setVencedor] = useState('');
  var [contadorX, setContadorX] = useState(0);
  var [contadorO, setContadorO] = useState(0);
  var [contadorJogos, setContadorJogos] = useState(0);
  var [winRate, setWinRate] = useState(0);





  function iniciarJogo(jogador){
    setJogadorActual(jogador);
    setJogadasRestantes(9);
    setTabuleiro([
      ['','',''],
      ['','',''],
      ['','','']
    ]);

    setView('jogo');
  }

  function jogar(linha, coluna){
    tabuleiro[linha][coluna] = jogadorActual;
    setTabuleiro([...tabuleiro]);

    setJogadorActual(jogadorActual === 'X' ? 'O' : 'X');
    verificarVencedor(tabuleiro, linha, coluna);
  }

  function verificarVencedor (tabuleiro, linha, coluna){
    
    //linhas
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0]);
    }
    //colunas
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }
    //diagonal 1
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0]);
    }
    //diagonal 2
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2]);
    }
    //empate
    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo('');
    }
    
    setJogadasRestantes((jogadasRestantes - 1));


  }

  function finalizarJogo(jogador){
    setVencedor(jogador);
      if(jogador === 'X'){
        setContadorX(contadorX+1);
        setContadorJogos(contadorJogos+1);

      }
      if(jogador === 'O'){
        setContadorO(contadorO+1);
        setContadorJogos(contadorJogos+1);

      }
    setView('vencedor');

  }

  function resetScore() {
    setContadorX((contadorX = 0));
    setContadorO((contadorO = 0));
    setContadorJogos(contadorJogos = 0);

  }



  switch(view){
    case 'menu':
      return getViewMenu();
    case 'jogo':
      return getViewJogo();
    case 'vencedor':
      return getViewVencedor(); 

  }

  function getViewMenu(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Text style={styles.titulo}></Text>
        <Text style={styles.titulo}>WELCOME TO DEATH TAC TOE!</Text>
        <Text style={styles.subtitulo}>Select your fighter:</Text>


        <View style={styles.inlineItems}>

          <TouchableOpacity style={styles.boxJogador}
          onPress={()=> iniciarJogo('X')}>

            <Text style={styles.jogadorX}>X</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.boxJogador}
          onPress={()=> iniciarJogo('O')}>

            <Text style={styles.jogadorO}>O</Text>

          </TouchableOpacity>

        </View>



        
      </View>
    );



  }

  function getViewJogo(){
    return (
      <View style={styles.container}>
        
        <StatusBar style="auto" />
        <Text style={styles.titulo2}>FIGHTERS GET READY!</Text>

        {
          tabuleiro.map((linha,numeroLinha) => {

            return(
              <View key ={numeroLinha} style={styles.inlineItems}>

                {
                  linha.map((coluna, numeroColuna) => {
                    return(
                      <TouchableOpacity 
                      key={numeroColuna}
                      style={styles.box}
                      onPress= {() => jogar(numeroLinha, numeroColuna)}
                      disabled = {coluna !== ''}>
                      
            
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
            
                      </TouchableOpacity>


                    )


                  })

                }

              </View>

            )

          })

        }

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => setView('menu')}>
            <Text style={styles.txtBtnMenu}>Exit to Menu</Text>
        </TouchableOpacity>


      </View>
    );



  }

  function getViewVencedor(){
    return (
      <View style={styles.container}>
      
        <StatusBar style="auto" />

        <Text style = {styles.titulo2}>We have a WINNER!</Text>
        <Text style = {styles.subtitulo2}>FLAWLESS VICTORY</Text>

        {
          vencedor === '' && 
          <Text style = {styles.vencedor}>TIE</Text>

        }
                {
          vencedor !== '' && 
          <>
            <Text style = {styles.vencedor}>FATALITY!</Text>
            <TouchableOpacity 
              style={styles.boxJogador}>                     
            
              <Text style={vencedor === 'X' ? styles.jogadorX : styles.jogadorO}>{vencedor}</Text>
            
            </TouchableOpacity></>


        }
        <Text style={styles.scoreboard}>Fighter X: {contadorX}        W/R: {Math.round((contadorX/contadorJogos)*100).toFixed(1)} %</Text>
        <Text style={styles.scoreboard}>Fighter O: {contadorO}        W/R: {Math.round((contadorO/contadorJogos)*100).toFixed(1)} %</Text>
        <Text style={styles.scoreboard}>Deaths Today: {contadorJogos}</Text>


        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => setView('menu')}>
            <Text style={styles.txtBtnMenu}>Exit to Menu</Text>
            
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnReset}
          onPress={() => resetScore()}>
          <Text style={styles.txtBtnReset}>Reset Score</Text>
        </TouchableOpacity>


      </View>
    );



  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
    
    
  },

  titulo:{
    fontSize: 55,
    marginTop:30,
    fontWeight: 'bold',
    color: "#45433E",
    textAlign: 'center',
    


  },

  subtitulo :{
    fontSize: 30,
    marginTop: 55,
    color: '#45433E',
    fontWeight:'bold',
    textAlign: 'center',

  },
  titulo2:{
    fontSize: 45,
    marginTop:40,
    fontWeight: 'bold',
    color: "#45433E",
    textAlign: 'center',


  },

  subtitulo2 :{
    fontSize: 30,
    marginTop: 25,
    color: '#1171BA',
    fontWeight:'bold',
    textAlign: 'center',

  },

  box:{
    width:80,
    height: 80,
    borderRadius:15,
    backgroundColor: "#ECECEC",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    

  },

  boxJogador:{
    width:80,
    height: 80,
    borderRadius:15,
    backgroundColor: "#ECECEC",
    alignItems: 'center',
    justifyContent: 'center',
    margin:15,
  
  },

  jogadorX:{
    fontSize: 40,
    fontWeight:'bold',
    color: '#FABA24'
  },

  jogadorO:{
    fontSize: 40,
    fontWeight:'bold',
    color: '#0066FF'
  },

  inlineItems:{
    flexDirection: 'row',

  },

  btnMenu:{
    marginTop: 20,

  },

  txtBtnMenu:{
    color:'#DCDCDC',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 20,
    backgroundColor: '#959794',
    borderRadius: 15.5,
    width: 140,
    textAlign: 'center',


  },

  txtBtnReset:{
    color:'#DCDCDC',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#959794',
    borderRadius: 15.5,
    marginTop: 10,
    width: 140,
    textAlign: 'center',



  },

  vencedor:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#BA1111',
    marginTop: 30,

  },
  scoreboard:{
    marginTop: 10,
    fontSize: 25,
    color: '#7D7D7D',
    fontWeight: 'bold',
      
  },

  





});
