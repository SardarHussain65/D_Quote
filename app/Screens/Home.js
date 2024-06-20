// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   Alert,
//   Image,
// } from 'react-native';
// import axios from 'axios';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Home = () => {
//   const [quote, setQuote] = useState('');
//   const [author, setAuthor] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [image, setImage] = useState(1); // Start with 1 instead of 0
//   const [favQuote, setFavQuote] = useState(false);
//   const [saveQ, setSaveQ] = useState([])

//   const getQuote = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://api.quotable.io/random');
//       setQuote(response.data.content);
//       setAuthor(response.data.author);

//       const picture = await axios.get(
//         `https://api.slingacademy.com/public/sample-photos/${image}.jpeg`,
//       );
//       setImage(image + 1); // Update image state after fetching quote

//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       Alert.alert(
//         'Error',
//         'Error fetching the quote. Please check your network connection.',
//       );
//       console.error('Error fetching the quote:', error);
//     }
//   };

//   const saveQuote =()=>{
//     setSaveQ([...saveQ, { quote, author }]);
//   }

//   useEffect(() => {
//     getQuote();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           <Image
//             source={{
//               uri: `https://api.slingacademy.com/public/sample-photos/${
//                 image - 1
//               }.jpeg`, // Use previous image URL here
//             }}
//             style={[styles.image, {opacity: 0.9}]}
//           />
//           <View style={styles.folder}>
//             <MaterialCommunityIcons name="folder-heart" size={30} color="red" onPress={() => saveQuote()}/>
//           </View>
//           <Text style={styles.heading}>
//             Quote <Text style={styles.subheading}>of the day</Text>
//           </Text>
//           <Text style={styles.quote}>{quote}</Text>
//           <Text style={styles.author}>- {author}</Text>

//           <View style={styles.icon}>
//             <FontAwesome
//               name={favQuote ? 'heart' : 'heart-o'}
//               size={60}
//               color="red"
//               onPress={() => setFavQuote(!favQuote)}
//             />
//             <Entypo
//               name="arrow-with-circle-right"
//               size={60}
//               color="blue"
//               onPress={() => getQuote()}
//             />
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   heading: {
//     fontFamily: 'Arial',
//     fontSize: 35,
//     fontWeight: '800',
//     color: 'black',
//     borderBottomWidth: 2,
//     borderBottomColor: 'red',
//     position: 'absolute',
//     top: 50,
//   },
//   folder: {
//     position: 'absolute',
//     top: 25,
//     right: 15,
//   },
//   subheading: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: 'black',
//   },
//   quote: {
//     fontSize: 24,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 20,
//     fontStyle: 'italic',
//     color: 'blue',
//   },
//   author: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: 'black',
//     fontWeight: '700',
//   },
//   image: {
//     width: '100%', // Adjust width and height as needed
//     height: '100%', // Set a specific height or adjust as needed
//     resizeMode: 'cover', // or 'cover' for different image resizing options
//     position: 'absolute',
//   },
//   icon: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     paddingTop: 50,
//   },
// });

// export default Home;
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({navigation}) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(1); // Start with 1 instead of 0
  const [favQuote, setFavQuote] = useState(false);
  const [saveQ, setSaveQ] = useState([]);

  const getQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);

      const picture = await axios.get(
        `https://api.slingacademy.com/public/sample-photos/${image}.jpeg`,
      );
      setImage(image + 1); // Update image state after fetching quote

      setLoading(false);
      setFavQuote(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Error',
        'Error fetching the quote. Please check your network connection.',
      );
      console.error('Error fetching the quote:', error);
    }
  };

  const saveQuote = () => {
    setSaveQ([...saveQ, {quote, author}]);
  };

  const handleFavQuotePress = () => {
    setFavQuote(!favQuote);
    saveQuote();
  };

  useEffect(() => {
    getQuote();

    const intervalId = setInterval(getQuote, 24 * 60 * 60 * 1000); // 24 hours
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Image
            source={{
              uri: `https://api.slingacademy.com/public/sample-photos/${
                image - 1
              }.jpeg`, // Use previous image URL here
            }}
            style={[styles.image, {opacity: 0.9}]}
          />
          <View style={styles.folder}>
            <MaterialCommunityIcons
              name="folder-heart"
              size={30}
              color="red"
              onPress={() =>
                navigation.navigate('Folder', {savedQuotes: saveQ})
              }
            />
          </View>
          <Text style={styles.heading}>
            Quote <Text style={styles.subheading}>of the day</Text>
          </Text>
          <Text style={styles.quote}>{quote}</Text>
          <Text style={styles.author}>- {author}</Text>

          <View style={styles.icon}>
            <FontAwesome
              name={favQuote ? 'heart' : 'heart-o'}
              size={60}
              color="red"
              onPress={handleFavQuotePress}
            />
            <Entypo
              name="arrow-with-circle-right"
              size={60}
              color="blue"
              onPress={() => getQuote()}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
  },
  folder: {
    position: 'absolute',
    top: 25,
    right: 15,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  quote: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    color: 'blue',
  },
  author: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
    fontWeight: '700',
  },
  image: {
    width: '100%', // Adjust width and height as needed
    height: '100%', // Set a specific height or adjust as needed
    resizeMode: 'cover', // or 'cover' for different image resizing options
    position: 'absolute',
  },
  icon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 50,
  },
});

export default Home;
