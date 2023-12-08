import React, { useState } from 'react';
import { StatusBar, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [montoCuenta, setMontoCuenta] = useState('');
  const [porcentajePropina, setPorcentajePropina] = useState(15);
  const [numeroPersonas, setNumeroPersonas] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [propina, setPropina] = useState(0);
  const [totalConPropina, setTotalConPropina] = useState(0);
  const [montoPorPersona, setMontoPorPersona] = useState(0);

  const calcularPropina = () => {
    const cuenta = parseFloat(montoCuenta);
    const propinaCalculada = (cuenta * porcentajePropina) / 100;
    const totalConPropinaCalculado = cuenta + propinaCalculada;
    const montoPorPersonaCalculado = totalConPropinaCalculado / parseInt(numeroPersonas, 10);

    setPropina(propinaCalculada);
    setTotalConPropina(totalConPropinaCalculado);
    setMontoPorPersona(montoPorPersonaCalculado);

    setModalVisible(true);
  };

  const resetearValores = () => {
    setModalVisible(false);
    setMontoCuenta('');
    setPorcentajePropina(15);
    setNumeroPersonas('1');
    setPropina(0);
    setTotalConPropina(0);
    setMontoPorPersona(0);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#333" />
      <Text style={styles.title}>Calculadora de Propina</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Monto de la cuenta:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={montoCuenta}
          onChangeText={(texto) => setMontoCuenta(texto)}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setPorcentajePropina(10)}>
          <Text style={styles.buttonText}>10%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setPorcentajePropina(15)}>
          <Text style={styles.buttonText}>15%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setPorcentajePropina(20)}>
          <Text style={styles.buttonText}>20%</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de Personas:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={numeroPersonas}
          onChangeText={(texto) => setNumeroPersonas(texto)}
        />
      </View>

      <TouchableOpacity style={styles.calculateButton} onPress={calcularPropina}>
        <Text style={styles.calculateButtonText}>Calcular Propina</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={resetearValores}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Resultados:</Text>
          <Text style={styles.modalText}>Propina: {propina.toFixed(2)}</Text>
          <Text style={styles.modalText}>Monto Total: {totalConPropina.toFixed(2)}</Text>
          <Text style={styles.modalText}>Monto por Persona: {montoPorPersona.toFixed(2)}</Text>
          <Pressable
            style={[styles.button, styles.modalButton]}
            onPress={resetearValores}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    {/* Agrega más pestañas o pilas según sea necesario */}
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#555',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 12,
    fontSize: 16,
    color: '#fff',
  },
  modalButton: {
    marginTop: 16,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
