import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import client from './client'; // Import your Apollo Client instance
import { ApolloProvider } from '@apollo/client';



export default function App() {
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