import { persistor, store } from "@/redux/store";
import { Stack } from "expo-router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Stack >
        <Stack.Screen name="AuthScreen" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>
  </PersistGate>
 </Provider>


  )
}
