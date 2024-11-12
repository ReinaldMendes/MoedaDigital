import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatBot from './ChatBot';
import { MaterialIcons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');
  const [showBalance, setShowBalance] = useState(true);

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    const response = await fetch(`https://moedadigital.onrender.com/balance/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (response.ok) {
      setBalance(data.balance);
      setUserName(data.userId.name);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const formattedBalance = typeof balance === 'number' && !isNaN(balance) ? balance.toFixed(2) : '0.00';

  return (
    <View style={styles.container}>
      {/* Cabeçalho com saudação e avatar */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Olá, {userName} Paula !</Text>
          <Text style={styles.welcomeText}>Bem-vindo ao seu dashboard</Text>
        </View>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.avatar} />
      </View>

      {/* Área de saldo com ícone para ocultar/mostrar */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo disponível</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balance}>{showBalance ? `R$ ${formattedBalance}` : '*****'}</Text>
          <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
            <MaterialIcons name={showBalance ? 'visibility' : 'visibility-off'} size={24} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botões de navegação */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Transfer')}>
          <Text style={styles.buttonText}>Transferir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonText}>Histórico de Transações</Text>
        </TouchableOpacity>
      </View>

      {/* Chatbox com rolagem e estilo aprimorado */}
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>Dúvidas Frequentes</Text>
        <ScrollView style={styles.chatMessages}>
          <ChatBot />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f4f4f4' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  userInfo: {
    flexDirection: 'column',
  },
  greeting: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  welcomeText: {
    fontSize: 14,
    color: '#777'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc'
  },
  balanceContainer: { 
    backgroundColor: '#ffffff', 
    borderRadius: 15, 
    padding: 25, 
    marginBottom: 30, 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 5 
  },
  balanceLabel: { 
    fontSize: 18, 
    color: '#555', 
    marginBottom: 5 
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  balance: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#2e7d32' 
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 20 
  },
  button: { 
    backgroundColor: '#2e7d32', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    flex: 1, 
    alignItems: 'center', 
    marginHorizontal: 5 
  },
  buttonText: { 
    fontSize: 16, 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
    textAlign: 'center'
  },
  chatMessages: {
    flex: 1,
    maxHeight: 300,
  },
});
