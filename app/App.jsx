import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from './Screens/Start';
import React, {useEffect, useState} from 'react';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import MainScreen from './Screens/MainScreen';
import ChatPage from './Screens/ChatPage';

// Import Firebase auth and modular API
import {auth} from './firebaseconfig'; // Import auth from separate config file
import {onAuthStateChanged} from '@react-native-firebase/auth';
import {StatusBar} from 'react-native';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [userAuth, setUserAuth] = useState(null); // Initialize as null for clarity

  // Handle auth state changes
  function handleAuthStateChanged(user) {
    setUserAuth(user);
    console.log('This is the user which is set in userAuth state', user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    // Subscribe to auth state changes using modular API
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => unsubscribe(); // Unsubscribe on unmount
  }, []);

  // Show nothing while initializing
  if (initializing) return null;

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="blue" barStyle="light-content" />

      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userAuth ? (
          <>
            {/* Authenticated routes */}
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="Chat" component={ChatPage} />
          </>
        ) : (
          <>
            {/* Unauthenticated routes */}
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
