import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Folder = ({route}) => {
  const [savedQuotes, setSavedQuotes] = useState(route.params.savedQuotes);

  const removeQ = index => {
    const updatedQuotes = savedQuotes.filter((_, i) => i !== index);
    setSavedQuotes(updatedQuotes);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Favourite Quotes</Text>
      <View style={styles.quoteContainer}>
        {savedQuotes.length > 0 ? (
          savedQuotes.map((item, index) => (
            <View key={index} style={styles.quoteItem}>
              <View style={{alignSelf: 'flex-end'}}>
                <FontAwesome
                  name="remove"
                  size={20}
                  color="green"
                  onPress={() => removeQ(index)}
                />
              </View>
              <Text style={styles.quoteText}>{item.quote}</Text>
              <Text style={styles.quoteAuthor}>- {item.author}</Text>
            </View>
          ))
        ) : (
          <Text
            style={{
              flex: 1,
              fontSize: 30,
              textAlign: 'center',
              marginVertical: '30%',
              color: 'blue',
            }}>
            No saved quotes
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Folder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  heading: {
    fontFamily: 'Arial',
    fontSize: 35,
    fontWeight: '800',
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  quoteContainer: {
    marginTop: 120,
    width: '90%',
    alignSelf: 'center',
  },
  quoteItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'black',
  },
  quoteAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',
    marginTop: 5,
  },
});
