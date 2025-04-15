// // screens/SignUpScreen.js
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Alert,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const SignUp = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignUp = () => {
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         console.log('This is user userCredential', userCredential);
//         console.log('This is user userCredential.user', userCredential.user);

//         return userCredential.user.updateProfile({
//           displayName: name,
//         });
//       })
//       .then(() => {
//         console.log('User account created & profile updated!');
//         navigation.navigate('Home');
//       })
//       .catch(error => {
//         if (error.code === 'auth/email-already-in-use') {
//           Alert.alert('Error', 'That email address is already in use!');
//         } else if (error.code === 'auth/invalid-email') {
//           Alert.alert('Error', 'That email address is invalid!');
//         } else {
//           Alert.alert('Error', error.message);
//         }
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//         autoCapitalize="words"
//       />

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

//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity onPress={handleSignUp} style={styles.button}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
//         Already have an account? Sign In
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
//     marginBottom: 50,
//     textAlign: 'center',
//     color: 'blue',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   button: {
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     borderRadius: 5,
//     backgroundColor: 'gray',
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   link: {
//     marginTop: 20,
//     color: 'blue',
//     textAlign: 'center',
//   },
// });

// export default SignUp;
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {auth} from '../firebaseconfig';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const db = getFirestore();
  const isFormIncomplete = !name || !email || !password || !confirmPassword;

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, {displayName: name});
      await setDoc(
        doc(collection(db, 'users'), userCredential.user.uid),
        {
          uid: userCredential.user.uid,
          email,
          name,
          createdAt: serverTimestamp(),
        },
        {merge: true},
      );
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid!');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleSignUp}
        style={[
          styles.button,
          {backgroundColor: isFormIncomplete ? 'aqua' : 'blue'},
        ]}
        disabled={isFormIncomplete}>
        <Text
          style={[
            styles.buttonText,
            {color: isFormIncomplete ? 'black' : 'white'},
          ]}>
          Sign Up
        </Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
        Already have an account? Sign In
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
    marginBottom: 50,
    textAlign: 'center',
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default SignUp;
