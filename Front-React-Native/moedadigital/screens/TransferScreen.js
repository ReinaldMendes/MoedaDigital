import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TransferScreen = () => {
  const [recipientWallet, setRecipientWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation(); // Para navegação, se necessário após a transação

  const handleTransfer = async () => {
    if (!recipientWallet || !amount) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      setIsLoading(true);

      // Verificar se o token está presente no AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Você precisa estar logado para fazer uma transferência.');
        return;
      }

      // Verificar se o valor da quantidade é válido
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        Alert.alert('Erro', 'Por favor, insira uma quantidade válida para a transferência.');
        return;
      }

      // Realizar a requisição à API para realizar a transferência
      const response = await fetch('https://moedadigital.onrender.com/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          walletFrom: 'seu-wallet-id',  // Aqui deve estar o ID da carteira do usuário logado
          walletTo: recipientWallet,
          amount: parsedAmount,
          typeTransition: 'transfer',
        }),
      });

      // Verificar a resposta da API
      if (response.ok) {
        const data = await response.json();
        Alert.alert('Sucesso', 'Transferência realizada com sucesso!');
        navigation.goBack();  // Voltar à tela anterior após a transação
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.error || 'Erro desconhecido na transferência.');
      }
    } catch (error) {
      console.error('Erro ao transferir:', error);
      Alert.alert('Erro', 'Algo deu errado, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transferência de Moeda</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Carteira do Destinatário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o ID da carteira"
          value={recipientWallet}
          onChangeText={setRecipientWallet}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <Button 
        title={isLoading ? "Processando..." : "Transferir"} 
        onPress={handleTransfer} 
        disabled={isLoading} 
        color="#4CAF50"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f4f4f9' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 24, 
    textAlign: 'center', 
    color: '#333'
  },
  formContainer: {
    marginBottom: 20,
  },
  label: { 
    fontSize: 18, 
    marginBottom: 8, 
    color: '#666'
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
});

export default TransferScreen;
