import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import BarraSuperior from './components/ui/Barra';

const Stack = createStackNavigator();

// definir el tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774f2',
    accent: '#0655bf',
  },
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options={{title: 'Nuevo Cliente'}}
          />
          <Stack.Screen
            name="DetallesCliente"
            component={DetallesCliente}
            options={{title: 'Detalles Cliente'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

/*
 options={({navigation, route}) => ({
              headerRight: () => (
                <BarraSuperior route={route} navigation={navigation} />
              ),
            })}
*/
export default App;
