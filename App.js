
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function App() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [countries, setCountries] = useState([]);
  const [euro, setEuro] = useState('')
  useEffect(() => {
    const url = 'http://api.exchangeratesapi.io/v1/latest?access_key="YOUR API KEY"&format=1'
    fetch(url)
      .then(response => response.json())
      .then(data => setCountries(Object.keys(data.rates)))
      .catch((error) => alert(error))
  }, []
  )

  useEffect(() => {
    const url = 'http://api.exchangeratesapi.io/v1/latest?access_key="YOUR API KEY"&format=1&symbols=' + selectedLanguage;
    fetch(url)
      .then(response => response.json())
      .then(data => setRate(Object.values(data.rates)[0]))
      .catch((error) => alert(error))
  }, [selectedLanguage])



  const convert = () => {
    /*  console.log("amount"+amount, ">>>rate" + rate) */
    const result = (amount / parseFloat(rate)).toFixed(2)
    setEuro(result)
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to use Euro Converter!</Text>
      <Text>You can get {euro}  euros</Text>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={(text) => setAmount(parseFloat(text))}
          placeholder='Enter money amount'
          keyboardType='number-pad'
        />
        <Picker
          style={styles.picker}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          {countries.map((item) => <Picker.Item label={item} value={item} />)}

        </Picker>
      </View>
      <Button style={styles.button} onPress={convert} title='Convert' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container:{
    flexDirection: 'row',
    margin:100,
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:100
  },
  input: {
    width: 100,
    height: 50,
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
  },
  picker: {
    height: 10,
    width: 100,

  }
});
