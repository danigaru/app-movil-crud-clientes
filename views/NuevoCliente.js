/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import Axios from 'axios';

const NuevoCliente = ({navigation, route}) => {
  const {setConsultarApi} = route.params;

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [alerta, setAlerta] = useState(false);
  const [editarCliente, setEditarCliente] = useState(false);

  useEffect(() => {
    if (route.params.cliente) {
      const {nombre, telefono, correo, empresa, id} = route.params.cliente;
      setNombre(nombre);
      setEmpresa(empresa);
      setTelefono(telefono);
      setCorreo(correo);
      setEditarCliente(true);
    } else {
      setEditarCliente(false);
    }
  }, []);

  const guardarCliente = async () => {
    if (
      nombre.trim() === '' ||
      telefono.trim() === '' ||
      correo.trim() === '' ||
      empresa.trim() === ''
    ) {
      setAlerta(true);
      return;
    }

    let cliente = {nombre, telefono, empresa, correo};
    let url = '';

    if (!editarCliente) {
      Platform.OS === 'ios'
        ? (url = 'http://localhost:3000/cliente')
        : (url = 'http://10.0.2.2:3000/clientes');

      try {
        const response = await Axios.post(url, cliente);
        if (response && response.status === 201) {
          limpiarRedireccionar();
        }
      } catch (error) {
        console.log(error);
      }
    } else {

      const id = route.params.cliente.id;
      cliente = {
        ...cliente,
        id,
      };

      try {
        const response = await Axios.put(`http://10.0.2.2:3000/clientes/${id}`, cliente);
        if (response && response.status === 200) {
          limpiarRedireccionar();
        }
      } catch (error) {
        console.log(error);
      }
    }

  };

  const limpiarRedireccionar = () => {
    navigation.navigate('Inicio');
    setNombre('');
    setEmpresa('');
    setTelefono('');
    setCorreo('');
    console.log(route.params);
    setConsultarApi(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Crear Nuevo Cliente</Headline>
      <ScrollView>
        <TextInput
          onChangeText={(texto) => setNombre(texto)}
          style={styles.input}
          label="Nombre"
          value={nombre}
          placeholder="Juan Carlos"
        />
        <TextInput
          onChangeText={(texto) => setTelefono(texto)}
          style={styles.input}
          label="Teléfono"
          value={telefono}
          placeholder="33409423"
        />
        <TextInput
          onChangeText={(texto) => setCorreo(texto)}
          style={styles.input}
          label="Correo"
          value={correo}
          placeholder="correo@correo.com"
        />
        <TextInput
          onChangeText={(texto) => setEmpresa(texto)}
          style={styles.input}
          label="Empresa"
          value={empresa}
          placeholder="Mi empresa"
        />

        <Button
          icon="pencil-circle"
          mode="contained"
          onPress={() => guardarCliente()}>
          {editarCliente ? 'Editar cliente' : 'Guardar cliente'}
        </Button>

        <Portal>
          <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Todos los campos son obligatorios</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setAlerta(false)}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
