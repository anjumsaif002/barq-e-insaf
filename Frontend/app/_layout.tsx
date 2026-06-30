import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="SplashScreen"     options={{ headerShown: false }} />
        <Stack.Screen name="RoleSelectScreen" options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen"      options={{ headerShown: false }} />
        <Stack.Screen name="AdminHome"        options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)"           options={{ headerShown: false }} />
        <Stack.Screen name="modal"            options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}