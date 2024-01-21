import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import client from './client'; // Import your Apollo Client instance
import { ApolloProvider } from '@apollo/client';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useState, useEffect } from 'react';

// Function to load fonts
async function loadResourcesAsync() {
  await Font.loadAsync({
    'Bebas Neue': require('./src/public/fonts/BebasNeue-Regular.ttf'), 
  });
}

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while fetching resources
        SplashScreen.preventAutoHideAsync();
        // Load fonts
        await loadResourcesAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen when resources are loaded
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <GestureHandlerRootView className='w-full h-full flex flex-col justify-center'>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
