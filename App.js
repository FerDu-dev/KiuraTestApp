import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/routing/AppNavigation';

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
