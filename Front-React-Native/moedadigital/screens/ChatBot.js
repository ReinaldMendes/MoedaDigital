// ChatBot.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function ChatBot() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (userMessage.trim() === '') return;

    const newMessage = { sender: 'user', text: userMessage };
    setChatHistory([...chatHistory, newMessage]);
    setUserMessage('');

    try {
      const response = await fetch('https://gptmoeda.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      if (response.ok && data.response) {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: 'bot', text: data.response },
        ]);
      } else {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: 'bot', text: 'Erro ao obter resposta da API.' },
        ]);
      }
    } catch (error) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'bot', text: 'Erro ao conectar à API.' },
      ]);
    }
  };

  return (
    <View style={styles.chatContainer}>
      <ScrollView style={styles.chatHistory}>
        {chatHistory.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem..."
        value={userMessage}
        onChangeText={setUserMessage}
      />
      <Button title="Enviar" onPress={handleSend} color="#2e7d32" />
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  chatHistory: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
  },
});
