import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

// URL da imagem de fundo
const backgroundImage = { uri: 'https://networdagro.com.br/blog/wp-content/uploads/2021/01/agro-5-0.jpg' }; // Substitua pelo seu link real

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('https://moedadigital.onrender.com/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazenando o token no AsyncStorage
        await AsyncStorage.setItem('authCode', data.authCode);

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login'); // Redireciona para a tela de login
      } else {
        // Exibindo a mensagem de erro vinda do backend
        Alert.alert('Erro', data.message || 'Erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.error('Erro durante o cadastro:', error);
      Alert.alert('Erro', 'Não foi possível completar o cadastro. Tente novamente mais tarde.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.imageBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#4CAF50" style={styles.icon} />
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        </View>

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

        <View style={styles.inputContainer}>
          <Icon name="user-secret" size={20} color="#4CAF50" style={styles.icon} />
          <TextInput
            placeholder="Função"
            value={role}
            onChangeText={setRole}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Cor escura com transparência
    borderRadius: 10,
    marginHorizontal: 20,
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
