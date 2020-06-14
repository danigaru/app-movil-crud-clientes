/* eslint-disable prettier/prettier */
import React from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-paper';
import {} from '@react-navigation/native';
// any js module
import * as RootNavigation from '../../RootNavigation';

const Barra = ({route, navigation}) => {
  const handlePress = () => {
    // RootNavigation.navigate('NuevoCliente');
    navigation.navigate('NuevoCliente');
  };

  return (
    <Button onPress={() => handlePress()} color="#fff" icon="plus-circle">
      <Text>Cliente</Text>
    </Button>
  );
};

export default Barra;
