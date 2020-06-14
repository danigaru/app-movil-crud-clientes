/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesCliente = ({navigation, route}) => {
  const {nombre, correo, telefono, empresa, id} = route.params.item;
  const {setConsultarApi} = route.params;

  const mostrarConfirmacion = () => {
    Alert.alert(
      '¿Desea eliminar el cliente?',
      'No podrá revertir esta acción',
      [
        {text: 'Si, eliminar', onPress: () => eliminarCliente(id)},
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  const eliminarCliente = async (idCliente) => {
    try {
      const response = await axios.delete(
        `http://10.0.2.2:3000/clientes/${idCliente}`,
      );
      if (response && response.status === 200) {
        navigation.navigate('Inicio');
        setConsultarApi(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa:
        <Subheading> {empresa} </Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo:
        <Subheading> {correo} </Subheading>
      </Text>
      <Text style={styles.texto}>
        Telefóno:
        <Subheading> {telefono} </Subheading>
      </Text>

      <Button
        style={styles.boton}
        mode="contained"
        icon="cancel"
        onPress={() => mostrarConfirmacion()}>
        Eliminar Cliente
      </Button>

      <FAB icon="pencil" style={globalStyles.fab} onPress={() => navigation.navigate('NuevoCliente', {cliente: route.params.item, setConsultarApi})} />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 20,
  },
  boton: {
    marginTop: 20,
    backgroundColor: 'red',
  },
});

export default DetallesCliente;
