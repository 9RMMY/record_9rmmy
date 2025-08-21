import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Detail from './src/pages/Detail';

export type RootStackParamList = {
  Home: undefined;
  Details: { ticketId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  console.log('App component rendered');
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Details', { ticketId: '123' })}
      >
        <Text style={styles.buttonText}>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Details" 
          component={Detail} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});