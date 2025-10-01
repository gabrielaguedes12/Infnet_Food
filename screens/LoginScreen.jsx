import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha o e-mail e a senha.');
      return;
    }

    
    if (!email.includes('@') || !email.includes('.')) {
      setError('Insira um e-mail válido.');
      return;
    }

   
    console.log(`Tentativa de Login com Email: ${email}`);
   
   if (onLogin) {
        onLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso ao Aplicativo</Text>
      
     
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

     
      <TextInput
        style={styles.input}
        placeholder="E-mail Válido"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

     
      <Text style={styles.label}>Digite sua senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

     
      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 40,
    textAlign: 'left',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 15,
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#FFEEEE',
    borderRadius: 5,
  }
});
