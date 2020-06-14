/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {List, Headline, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';

import axios from 'axios';

const Inicio = ({navigation}) => {
  const [clientes, setClientes] = useState([]);
  const [consultarApi, setConsultarApi] = useState(true);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/clientes');
        setClientes(response.data);
        setConsultarApi(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (consultarApi) {
      obtenerClientes();
    }
  }, [consultarApi]);

  return (
    <View style={globalStyles.contenedor}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('NuevoCliente', {setConsultarApi})}>
        Nuevo cliente
      </Button>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? 'Clientes' : 'No hay clientes'}
      </Headline>
      <FlatList
        data={clientes}
        keyExtractor={(cliente) => cliente.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() => navigation.navigate('DetallesCliente', {item, setConsultarApi})}
          />
        )}
      />
      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NuevoCliente', {setConsultarApi})}
      />
    </View>
  );
};

export default Inicio;
