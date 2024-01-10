import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';


export default function App() {
  return (
      <GestureHandlerRootView className='w-full h-full flex flex-col justify-center'>
        <Provider store={store}>
        <RootNavigator />
        </Provider>
      </GestureHandlerRootView>
  );
}