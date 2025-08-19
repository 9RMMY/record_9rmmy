import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home_band from './Home_band';
import Detail from './Detail';
import RecordingOptions from './NewTicket/RecordingOptions';
import WriteReview from './NewTicket/WriteReview';
import AIImageGeneration from './NewTicket/AIImageGeneration'; // 추가
import { enableScreens } from 'react-native-screens';

export type RootStackParamList = {
  Home: undefined;
  Details: { ticketId: number };
  RecordingOptions: undefined;
  WriteReview: undefined;
  AIImageGeneration: { review: string };
};

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home_band} />
        <Stack.Screen
          name="Details"
          component={Detail}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
        />
        <Stack.Screen name="RecordingOptions" component={RecordingOptions} />
        <Stack.Screen name="WriteReview" component={WriteReview} />
        <Stack.Screen name="AIImageGeneration" component={AIImageGeneration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
