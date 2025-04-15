// // screens/SignInScreen.js
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore'; // Import Firestore
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

// const SignIn = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId:
//         '482143778470-rpiblgpdeah03ub5arro5mev73kf7tf6.apps.googleusercontent.com',
//     });
//   }, []);

//   async function onGoogleButtonPress() {
//     try {
//       // Check if your device supports Google Play
//       await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//       // Get the user's ID token and info
//       const signInResult = await GoogleSignin.signIn();
//       const myInfo = signInResult.data.user; // User info from Google Sign-In
//       console.log('User Info:', myInfo);

//       // Get the ID token
//       let idToken = signInResult.data?.idToken;
//       if (!idToken) {
//         idToken = signInResult.idToken; // Fallback for older versions
//       }
//       if (!idToken) {
//         throw new Error('No ID token found');
//       }

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign in the user with Firebase Authentication
//       const userCredential = await auth().signInWithCredential(
//         googleCredential,
//       );
//       const firebaseUser = userCredential.user; // Firebase user object

//       console.log('jflsajflsjflsjflsjflsjflsjfls', firebaseUser);

//       // Save myInfo to Firestore under the user's UID
//       await firestore()
//         .collection('users')
//         .doc(firebaseUser.uid)
//         .set(
//           {
//             uid: firebaseUser.uid, // Firebase UID
//             email: myInfo.email || firebaseUser.email,
//             familyName: myInfo.familyName || '',
//             givenName: myInfo.givenName || '',
//             name: myInfo.name || firebaseUser.displayName || '',
//             photo: myInfo.photo || firebaseUser.photoURL || '',
//             googleId: myInfo.id || '', // Google-specific ID
//             createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp
//           },
//           {merge: true}, // Merge to update if exists, don’t overwrite
//         );

//       console.log('Signed in with Google and saved to Firestore!');
//       Alert.alert('Success', 'Logged in and profile saved!');

//       // Navigate to Home screen or wherever you want
//       navigation.navigate('Home');

//       return userCredential;
//     } catch (error) {
//       console.log('Google Sign-In Error:', error.message);
//       Alert.alert('Error', error.message);
//     }
//   }

//   const handleSignIn = async () => {
//     try {
//       await auth().signInWithEmailAndPassword(email, password);
//       console.log('User signed in successfully!');
//       navigation.navigate('Home');
//     } catch (error) {
//       Alert.alert('Sign In Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign In</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity
//         onPress={handleSignIn}
//         style={{
//           paddingHorizontal: 10,
//           paddingVertical: 8,
//           borderRadius: 5,
//           backgroundColor: 'gray',
//           marginTop: 5,
//           alignItems: 'center',
//           fontSize: 20,
//         }}>
//         <Text style={{color: 'white'}}>Sign In</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() =>
//           onGoogleButtonPress().then(() =>
//             console.log('Signed in with Google!'),
//           )
//         }
//         style={{
//           paddingHorizontal: 10,
//           paddingVertical: 8,
//           borderRadius: 5,
//           backgroundColor: 'blue',
//           marginTop: 5,
//           alignItems: 'center',
//           fontSize: 20,
//         }}>
//         <Text style={{color: 'white'}}>Google Sign-In</Text>
//       </TouchableOpacity>
//       <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
//         Don't have an account? Sign Up
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: 'orange',
//   },
//   title: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     marginBottom: 50,
//     textAlign: 'center',
//     color: 'blue',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     marginBottom: 15,
//     borderRadius: 5,
//     fontSize: 16,
//   },
//   link: {
//     marginTop: 20,
//     color: '#0066cc',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// export default SignIn;
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Import modular Firebase APIs
import {auth} from '../firebaseconfig'; // Import auth from firebaseConfig.js
import {
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Initialize Firestore
  const db = getFirestore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '482143778470-rpiblgpdeah03ub5arro5mev73kf7tf6.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the user's ID token and info
      const signInResult = await GoogleSignin.signIn();
      const myInfo = signInResult.data.user; // User info from Google Sign-In
      console.log('User Info:', myInfo);

      // Get the ID token
      let idToken = signInResult.data?.idToken;
      if (!idToken) {
        idToken = signInResult.idToken; // Fallback for older versions
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign in the user with Firebase Authentication
      const userCredential = await signInWithCredential(auth, googleCredential);
      const firebaseUser = userCredential.user; // Firebase user object
      console.log('Firebase User:', firebaseUser);

      // Save myInfo to Firestore under the user's UID
      await setDoc(
        doc(collection(db, 'users'), firebaseUser.uid),
        {
          uid: firebaseUser.uid, // Firebase UID
          email: myInfo.email || firebaseUser.email,
          familyName: myInfo.familyName || '',
          givenName: myInfo.givenName || '',
          name: myInfo.name || firebaseUser.displayName || '',
          photo: myInfo.photo || firebaseUser.photoURL || '',
          googleId: myInfo.id || '', // Google-specific ID
          createdAt: serverTimestamp(), // Timestamp
        },
        {merge: true}, // Merge to update if exists, don’t overwrite
      );

      console.log('Signed in with Google and saved to Firestore!');
      Alert.alert('Success', 'Logged in and profile saved!');

      // Navigate to Home screen
      navigation.navigate('Home');

      return userCredential;
    } catch (error) {
      console.log('Google Sign-In Error:', error.message);
      Alert.alert('Error', error.message);
    }
  }

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Sign In Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleSignIn}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 5,
          backgroundColor: 'gray',
          marginTop: 5,
          alignItems: 'center',
          fontSize: 20,
        }}>
        <Text style={{color: 'white'}}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
        style={{
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 5,
          backgroundColor: 'blue',
          marginTop: 5,
          alignItems: 'center',
          fontSize: 20,
        }}>
        <Text style={{color: 'white'}}>Google Sign-In</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'orange',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#0066cc',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SignIn;
