import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Start = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      myFunction();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const myFunction = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>WellCome To</Text>
      <Text style={styles.greeting2}>Daily Quote</Text>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 25,
    color: '#4567b7',
  },
  greeting2: {
    fontSize: 35,
    color: '#ff9900',
  },
});
