import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Start = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      myFunction();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const myFunction = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('MainScreen')}>
      <Text style={styles.greeting}>WellCome To</Text>
      <Text style={styles.greeting2}>Schat</Text>
    </TouchableOpacity>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 25,
    color: 'white',
    fontWeight: '700',
  },
  greeting2: {
    fontSize: 40,
    color: '#ff9900',
    fontWeight: '800',
  },
});
