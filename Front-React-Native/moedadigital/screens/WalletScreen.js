import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para acessar o token
import Icon from 'react-native-vector-icons/FontAwesome'; // Para ícones

const WalletScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('BRL'); // Exemplo de moeda
  const [authToken, setAuthToken] = useState('');

  // Carregar token ao abrir a tela
  useEffect(() => {
    const fetchAuthToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        fetchWalletInfo(token);
      } else {
        Alert.alert('Erro', 'Usuário não autenticado. Por favor, faça login novamente.');
      }
    };
    fetchAuthToken();
  }, []);

  const fetchWalletInfo = async (token) => {
    try {
      const response = await fetch('https://moedadigital.onrender.com/user/carteira', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Usar o token JWT
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
        setCurrency(data.currency);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar a carteira.');
      }
    } catch (error) {
      console.error('Erro ao buscar informações da carteira:', error);
      Alert.alert('Erro', 'Erro ao conectar-se à API.');
    }
  };

  const createWallet = async () => {
    if (!authToken) {
      Alert.alert('Erro', 'Usuário não autenticado. Por favor, faça login novamente.');
      return;
    }

    try {
      const response = await fetch('https://moedadigital.onrender.com/user/carteira', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Usar o token JWT
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: currency,
          balance: 0, // Saldo inicial
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Carteira criada com sucesso!');
        fetchWalletInfo(authToken); // Atualiza o saldo
      } else {
        Alert.alert('Erro', 'Não foi possível criar a carteira.');
      }
    } catch (error) {
      console.error('Erro ao criar a carteira:', error);
      Alert.alert('Erro', 'Erro ao conectar-se à API.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações da Carteira</Text>
      
      <View style={styles.card}>
        <Text style={styles.balance}>Saldo: {balance} {currency}</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateWallet')}>
          <Text style={styles.buttonText}>Cadastrar Carteira</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Transfer')}>
          <Text style={styles.buttonText}>Transferir Moeda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TransactionHistory')}>
          <Text style={styles.buttonText}>Ver Histórico de Transações</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => { /* Função de logout */ }}>
        <Icon name="sign-out" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#121212', 
  },
  title: { 
    fontSize: 24, 
    color: '#fff', 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
  },
  card: { 
    backgroundColor: '#333', 
    borderRadius: 10, 
    padding: 20, 
    marginBottom: 20, 
    alignItems: 'center',
  },
  balance: { 
    fontSize: 18, 
    color: '#fff', 
    marginBottom: 20, 
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});

export default WalletScreen;
