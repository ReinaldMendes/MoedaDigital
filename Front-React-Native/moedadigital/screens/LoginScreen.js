import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Enviar email e senha para o servidor
      const response = await fetch('https://moedadigital.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o token no AsyncStorage
        await AsyncStorage.setItem('token', data.token);

        Alert.alert('Login realizado com sucesso!');
        navigation.navigate('Dashboard'); // Redireciona para a tela da carteira
      } else {
        Alert.alert('Erro de Login', data.error || 'Email ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível se conectar ao servidor.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://networdagro.com.br/blog/wp-content/uploads/2021/01/agro-5-0.jpg' }} // Imagem de fundo
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#4CAF50" style={styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#4CAF50" style={styles.icon} />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajuste a imagem de fundo para cobrir a tela
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    padding: 20, // Adiciona um padding geral
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Alinha o conteúdo no centro horizontalmente
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay escuro para melhorar a legibilidade
    borderRadius: 10, // Bordas arredondadas
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    padding: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
