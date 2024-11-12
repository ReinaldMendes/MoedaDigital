import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionHistoryScreen = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://moedadigital.onrender.com/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setTransactions(data);
      } else {
        console.error("Erro ao buscar transações:", data.error || "Erro desconhecido");
        setDefaultTransactions();  // Define histórico padrão caso a API não retorne dados
      }
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      setDefaultTransactions();  // Define histórico padrão em caso de erro
    }
  };

  const setDefaultTransactions = () => {
    const defaultTransactions = [
      {
        _id: '1',
        typeTransition: 'deposit',
        amount: 100.00,
        currency: 'BRL',
        status: 'completed',
        createdAt: new Date().toISOString(),
        details: 'Depósito inicial',
      },
      {
        _id: '2',
        typeTransition: 'withdrawal',
        amount: 50.00,
        currency: 'BRL',
        status: 'pending',
        createdAt: new Date().toISOString(),
        details: 'Saque em processamento',
      },
      {
        _id: '3',
        typeTransition: 'transfer',
        amount: 200.00,
        currency: 'BRL',
        status: 'failed',
        createdAt: new Date().toISOString(),
        details: 'Falha na transferência',
      },
    ];
    setTransactions(defaultTransactions);
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transaction}>
      <Text style={styles.type}>{item.typeTransition === 'transfer' ? 'Transferência' : item.typeTransition === 'deposit' ? 'Depósito' : 'Saque'}</Text>
      <Text style={styles.amount}>R$ {item.amount.toFixed(2)} {item.currency}</Text>
      <Text style={styles.status}>{item.status === 'completed' ? 'Concluído' : item.status === 'pending' ? 'Pendente' : 'Falhou'}</Text>
      <Text style={styles.date}>Data: {new Date(item.createdAt).toLocaleDateString()}</Text>
      {item.details && <Text style={styles.details}>Detalhes: {item.details}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Transações</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={renderTransaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
    textAlign: 'center',
  },
  transaction: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  type: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  amount: {
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  details: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
});

export default TransactionHistoryScreen;
