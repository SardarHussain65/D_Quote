// import {
//   FlatList,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import Feather from 'react-native-vector-icons/Feather';

// const MainScreen = () => {
//   const [user, setUser] = useState('');
//   const inputRef = useRef(null); // Step 1: Create ref

//   const DATA = [
//     {id: '1', name: 'Sardar Hussain'},
//     {id: '2', name: 'Ali'},
//     {id: '3', name: 'Ayesha'},
//     {id: '4', name: 'Ahmed'},
//   ];

//   const renderItem = ({item}) => (
//     <TouchableOpacity style={styles.userField}>
//       <View style={styles.userInfo}>
//         <Image
//           source={require('../assests/profile.jpg')}
//           style={styles.proImage}
//         />
//         <Text style={styles.profileNmae}>{item.name}</Text>
//       </View>
//       <Text style={styles.msgDate}>3:20 PM</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.containner}>
//       <View style={styles.mainHheader}>
//         <View style={styles.header}>
//           <Text style={styles.logo}>Schat</Text>
//           <Feather
//             name="settings"
//             size={22}
//             color="#fff"
//             onPress={console.log('Setting button is pressed')}
//           />
//         </View>
//         <View style={styles.input}>
//           <Feather
//             name="search"
//             size={20}
//             color="gray"
//             onPress={() => {
//               console.log('Search icon pressed');
//               inputRef.current?.focus(); // Step 3: Focus input
//             }}
//           />
//           <TextInput
//             ref={inputRef} // Step 2: Attach ref
//             placeholder="Search User"
//             style={{flex: 1}}
//             value={user}
//             onChangeText={setUser}
//             placeholderTextColor="gray"
//           />
//         </View>
//       </View>
//       <FlatList
//         data={DATA}
//         style={styles.userContainner}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default MainScreen;

// const styles = StyleSheet.create({
//   containner: {
//     flex: 1,
//     backgroundColor: '#044EE3',
//   },
//   mainHheader: {
//     backgroundColor: '#0000e5',
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     padding: 5,
//     paddingBottom: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//   },
//   logo: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: '900',
//   },
//   input: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     gap: 10,
//     borderColor: '#fff',
//     borderRadius: 25,
//     color: 'black',
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//     margin: 12,
//   },
//   userContainner: {
//     padding: 20,
//   },
//   proImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   userField: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   profileNmae: {
//     color: '#fff',
//   },
//   msgDate: {
//     color: '#fff',
//   },
// });

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   FlatList,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import axios from 'axios';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// const MainScreen = ({navigation}) => {
//   const [user, setUser] = useState('');
//   const [token, setToken] = useState(null);
//   const inputRef = useRef(null);

//   // Hardcoded logged-in user (in real app, use auth)
//   const currentUser = 'You';

//   // Fetch token for current user
//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await axios.get(
//           `http://192.168.1.14:3000/token?identity=${currentUser}`,
//         );
//         setToken(response.data.token);
//       } catch (error) {
//         console.error('Error fetching token:', error);
//       }
//     };
//     fetchToken();
//     getAllStudentNamesAsObject();
//   }, []);
//   async function getAllStudentNamesAsObject(setUsersObject) {
//     try {
//       // Go to the "Users" classroom and get all desks
//       const usersSnapshot = await firestore().collection('users').get();

//       // Create an object to store user info
//       const usersObject = {};

//       // Look at each desk’s notebook
//       usersSnapshot.forEach(desk => {
//         const studentData = desk.data();
//         const studentId = desk.id;
//         usersObject[studentId] = {
//           name: studentData.name || 'No Name',
//           uid: studentData.uid || studentId,
//           photo: studentData.photo || 'No Photo',
//         };
//       });

//       // Update the display board
//       setUsersObject(usersObject);
//       console.log('All user info:', usersObject);
//       return usersObject;
//     } catch (error) {
//       console.log('Error getting user info:', error.message);
//     }
//   }
//   const DATA = [
//     {id: '1', name: 'Sardar Hussain'},
//     {id: '2', name: 'Ali'},
//     {id: '3', name: 'Ayesha'},
//     {id: '4', name: 'Ahmed'},
//   ];

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.userField}
//       onPress={() =>
//         navigation.navigate('Chat', {
//           token,
//           currentUser,
//           selectedUser: item.name,
//         })
//       }>
//       <View style={styles.userInfo}>
//         <Image
//           source={require('../assests/profile.jpg')}
//           style={styles.proImage}
//         />
//         <Text style={styles.profileNmae}>{item.name}</Text>
//       </View>
//       <Text style={styles.msgDate}>3:20 PM</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.containner}>
//       <View style={styles.mainHheader}>
//         <View style={styles.header}>
//           <Text style={styles.logo}>Schat</Text>
//           <Feather
//             name="settings"
//             size={22}
//             color="#fff"
//             onPress={() => handleLogout()}
//           />
//         </View>
//         <View style={styles.input}>
//           <Feather
//             name="search"
//             size={20}
//             color="gray"
//             onPress={() => inputRef.current?.focus()}
//           />
//           <TextInput
//             ref={inputRef}
//             placeholder="Search User"
//             style={{flex: 1}}
//             value={user}
//             onChangeText={setUser}
//             placeholderTextColor="gray"
//           />
//         </View>
//       </View>
//       <FlatList
//         data={DATA}
//         style={styles.userContainner}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default MainScreen;

// // Styles remain the same
// const styles = StyleSheet.create({
//   containner: {
//     flex: 1,
//     backgroundColor: '#044EE3',
//   },
//   mainHheader: {
//     backgroundColor: '#0000e5',
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     padding: 5,
//     paddingBottom: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//   },
//   logo: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: '900',
//   },
//   input: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     gap: 10,
//     borderColor: '#fff',
//     borderRadius: 25,
//     color: 'black',
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//     margin: 12,
//   },
//   userContainner: {
//     padding: 20,
//   },
//   proImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   userField: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   profileNmae: {
//     color: '#fff',
//   },
//   msgDate: {
//     color: '#fff',
//   },
// });

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';

// // Import modular Firebase APIs
// import {auth} from '../firebaseconfig'; // Import auth from firebaseConfig.js
// import {getAuth, signOut} from '@react-native-firebase/auth';
// import {
//   getFirestore,
//   collection,
//   getDocs,
// } from '@react-native-firebase/firestore';

// const MainScreen = ({navigation}) => {
//   const [user, setUser] = useState(''); // For search input
//   const [users, setUsers] = useState([]); // Firestore users data
//   const inputRef = useRef(null);
//   const db = getFirestore();
//   const authInstance = getAuth();

//   // Fetch all users from Firestore
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersSnapshot = await getDocs(collection(db, 'users'));
//         const usersList = usersSnapshot.docs
//           .map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter(user => user.uid !== authInstance.currentUser?.uid); // Exclude current user
//         setUsers(usersList);
//         console.log('Fetched users:', usersList);
//       } catch (error) {
//         console.error('Error fetching users:', error.message);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log('User signed out successfully');
//       // Navigation handled by App.js onAuthStateChanged
//     } catch (error) {
//       console.error('Sign out error:', error);
//     }
//   };

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.userField}
//       onPress={() =>
//         navigation.navigate('Chat', {
//           currentUser: authInstance.currentUser?.displayName || 'You',
//           selectedUser: item.name,
//           selectedUserId: item.uid,
//         })
//       }>
//       <View style={styles.userInfo}>
//         {item.photo ? (
//           <Image source={{uri: item.photo}} style={styles.proImage} />
//         ) : (
//           <Image
//             source={require('../assests/profile.jpg')}
//             style={styles.proImage}
//           />
//         )}
//         <Text style={styles.profileName}>{item.name}</Text>
//       </View>
//       <Text style={styles.msgDate}>
//         {item.createdAt
//           ? new Date(item.createdAt.toDate()).toLocaleTimeString()
//           : 'N/A'}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainHeader}>
//         <View style={styles.header}>
//           <Text style={styles.logo}>Schat</Text>
//           <Feather
//             name="settings"
//             size={22}
//             color="#fff"
//             onPress={handleLogout}
//           />
//         </View>
//         <View style={styles.input}>
//           <Feather
//             name="search"
//             size={20}
//             color="gray"
//             onPress={() => inputRef.current?.focus()}
//           />
//           <TextInput
//             ref={inputRef}
//             placeholder="Search User"
//             style={{flex: 1}}
//             value={user}
//             onChangeText={setUser}
//             placeholderTextColor="gray"
//           />
//         </View>
//       </View>
//       <FlatList
//         data={users}
//         style={styles.userContainer}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#044EE3',
//   },
//   mainHeader: {
//     backgroundColor: '#0000e5',
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     padding: 5,
//     paddingBottom: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//   },
//   logo: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: '900',
//   },
//   input: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     gap: 10,
//     borderColor: '#fff',
//     borderRadius: 25,
//     color: 'black',
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//     margin: 12,
//   },
//   userContainer: {
//     padding: 20,
//   },
//   proImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   userField: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   profileName: {
//     color: '#fff',
//   },
//   msgDate: {
//     color: '#fff',
//   },
// });

// export default MainScreen;

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import axios from 'axios'; // Add axios for fetching token
// import {auth} from '../firebaseconfig';
// import {getAuth, signOut} from '@react-native-firebase/auth';
// import {
//   getFirestore,
//   collection,
//   getDocs,
// } from '@react-native-firebase/firestore';

// const MainScreen = ({navigation}) => {
//   const [user, setUser] = useState(''); // For search input
//   const [users, setUsers] = useState([]); // Firestore users data
//   const [token, setToken] = useState(null); // Store Twilio token
//   const inputRef = useRef(null);
//   const db = getFirestore();
//   const authInstance = getAuth();

//   // Fetch token for current user
//   useEffect(() => {
//     const fetchToken = async () => {
//       if (authInstance.currentUser) {
//         try {
//           const response = await axios.get(
//             `http://192.168.1.14:3000/token?identity=${authInstance.currentUser.uid}`,
//           );
//           setToken(response.data.token);
//           console.log('Token fetched:', response.data.token);
//         } catch (error) {
//           console.error('Error fetching token:', error.message);
//         }
//       }
//     };
//     fetchToken();
//   }, [authInstance.currentUser]);

//   // Fetch all users from Firestore
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersSnapshot = await getDocs(collection(db, 'users'));
//         const usersList = usersSnapshot.docs
//           .map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter(user => user.uid !== authInstance.currentUser?.uid); // Exclude current user
//         setUsers(usersList);
//         console.log('Fetched users:', usersList);
//       } catch (error) {
//         console.error('Error fetching users:', error.message);
//       }
//     };
//     if (authInstance.currentUser) {
//       fetchUsers();
//     }
//   }, [authInstance.currentUser]);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log('User signed out successfully');
//     } catch (error) {
//       console.error('Sign out error:', error);
//     }
//   };

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.userField}
//       onPress={() => {
//         if (token) {
//           navigation.navigate('Chat', {
//             token, // Pass the token
//             currentUser: authInstance.currentUser.uid, // Use UID for Twilio identity
//             selectedUser: item.uid, // Use UID for selected user
//             selectedUserName: item.name, // For display
//           });
//         } else {
//           console.warn('Token not ready yet');
//         }
//       }}>
//       <View style={styles.userInfo}>
//         {item.photo ? (
//           <Image source={{uri: item.photo}} style={styles.proImage} />
//         ) : (
//           <Image
//             source={require('../assests/profile.jpg')}
//             style={styles.proImage}
//           />
//         )}
//         <Text style={styles.profileName}>{item.name}</Text>
//       </View>
//       <Text style={styles.msgDate}>
//         {item.createdAt
//           ? new Date(item.createdAt.toDate()).toLocaleTimeString()
//           : 'N/A'}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainHeader}>
//         <View style={styles.header}>
//           <Text style={styles.logo}>Schat</Text>
//           <Feather
//             name="settings"
//             size={22}
//             color="#fff"
//             onPress={handleLogout}
//           />
//         </View>
//         <View style={styles.input}>
//           <Feather
//             name="search"
//             size={20}
//             color="gray"
//             onPress={() => inputRef.current?.focus()}
//           />
//           <TextInput
//             ref={inputRef}
//             placeholder="Search User"
//             style={{flex: 1}}
//             value={user}
//             onChangeText={setUser}
//             placeholderTextColor="gray"
//           />
//         </View>
//       </View>
//       {/* <FlatList
//         data={users}
//         style={styles.userContainer}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//       /> */}
//       <FlatList
//   data={filteredUsers}
//   style={styles.userContainer}
//   keyExtractor={item => item.id}
//   renderItem={renderItem}
// />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#044EE3',
//   },
//   mainHeader: {
//     backgroundColor: '#0000e5',
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     padding: 5,
//     paddingBottom: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//   },
//   logo: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: '900',
//   },
//   input: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     gap: 10,
//     borderColor: '#fff',
//     borderRadius: 25,
//     color: 'black',
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//     margin: 12,
//   },
//   userContainer: {
//     padding: 20,
//   },
//   proImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },
//   userField: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   profileName: {
//     color: '#fff',
//   },
//   msgDate: {
//     color: '#fff',
//   },
// });

// export default MainScreen;

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import axios from 'axios';
// import {getAuth, signOut} from '@react-native-firebase/auth';
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   onSnapshot,
// } from '@react-native-firebase/firestore';

// const MainScreen = ({navigation}) => {
//   const [search, setSearch] = useState('');
//   const [users, setUsers] = useState([]);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const inputRef = useRef(null);
//   const usersRef = useRef(users); // Store latest users state in a ref
//   const db = getFirestore();
//   const authInstance = getAuth();

//   // Update usersRef whenever users changes
//   useEffect(() => {
//     usersRef.current = users;
//   }, [users]);

//   // Fetch token for current user
//   useEffect(() => {
//     const fetchToken = async () => {
//       if (authInstance.currentUser) {
//         try {
//           const response = await axios.get(
//             `http://192.168.1.14:3000/token?identity=${authInstance.currentUser.uid}`,
//           );
//           setToken(response.data.token);
//           console.log(
//             'Token fetched:',
//             response.data.token.slice(0, 10),
//             '...',
//           );
//         } catch (error) {
//           console.error('Error fetching token:', error.message);
//         }
//       }
//     };
//     fetchToken();
//   }, [authInstance.currentUser]);

//   // Fetch users (run once on mount or when user changes)
//   useEffect(() => {
//     if (!authInstance.currentUser) return;

//     const fetchUsers = async () => {
//       try {
//         const usersSnapshot = await getDocs(collection(db, 'users'));
//         const usersList = usersSnapshot.docs
//           .map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter(user => user.uid !== authInstance.currentUser?.uid);
//         setUsers(usersList);
//         console.log('Fetched users:', usersList);
//       } catch (error) {
//         console.error('Error fetching users:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [authInstance.currentUser]); // Only re-run if authInstance.currentUser changes

//   // Set up onSnapshot listener (run once on mount or when user changes)
//   useEffect(() => {
//     if (!authInstance.currentUser) return;

//     const q = query(
//       collection(db, 'conversations'),
//       orderBy('lastMessageDate', 'desc'),
//     );
//     const unsubscribe = onSnapshot(
//       q,
//       snapshot => {
//         const updatedUsers = usersRef.current.map(user => {
//           const convoDoc = snapshot.docs.find(
//             doc =>
//               doc.id ===
//               [authInstance.currentUser.uid, user.uid].sort().join('-'),
//           );
//           return {
//             ...user,
//             lastMessageDate:
//               convoDoc?.data()?.lastMessageDate?.toDate() || null,
//           };
//         });
//         setUsers(updatedUsers);
//       },
//       error => {
//         console.error('Error listening to conversations:', error.message);
//       },
//     );

//     return () => unsubscribe();
//   }, [authInstance.currentUser]); // Only re-run if authInstance.currentUser changes

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await signOut(authInstance);
//       console.log('User signed out successfully');
//       navigation.reset({
//         index: 0,
//         routes: [{name: 'Login'}],
//       });
//     } catch (error) {
//       console.error('Sign out error:', error.message);
//     }
//   };

//   // Filter users based on search input
//   const filteredUsers = [
//     ...new Map(users.map(user => [user.id, user])).values(),
//   ].filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.userField}
//       onPress={() => {
//         if (token) {
//           navigation.navigate('Chat', {
//             token,
//             currentUser: authInstance.currentUser.uid,
//             selectedUser: item.uid,
//             selectedUserName: item.name,
//           });
//         } else {
//           console.warn('Token not ready yet');
//         }
//       }}>
//       <View style={styles.userInfo}>
//         {item.photo ? (
//           <Image source={{uri: item.photo}} style={styles.proImage} />
//         ) : (
//           <Image
//             source={require('../assests/profile.jpg')}
//             style={styles.proImage}
//           />
//         )}
//         <Text style={styles.profileName}>{item.name}</Text>
//       </View>
//       <Text style={styles.msgDate}>
//         {item.lastMessageDate
//           ? new Date(item.lastMessageDate).toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//             })
//           : 'No messages'}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainHeader}>
//         <View style={styles.header}>
//           <Text style={styles.logo}>Schat</Text>
//           <Feather
//             name="log-out"
//             size={22}
//             color="#fff"
//             onPress={handleLogout}
//           />
//         </View>
//         <View style={styles.input}>
//           <Feather
//             name="search"
//             size={20}
//             color="gray"
//             onPress={() => inputRef.current?.focus()}
//           />
//           <TextInput
//             ref={inputRef}
//             placeholder="Search User"
//             style={styles.inputText}
//             value={search}
//             onChangeText={setSearch}
//             placeholderTextColor="gray"
//           />
//         </View>
//       </View>
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>Loading users...</Text>
//         </View>
//       ) : filteredUsers.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>
//             {search ? 'No users found' : 'No contacts available'}
//           </Text>
//         </View>
//       ) : (
//         <FlatList
//           data={filteredUsers}
//           style={styles.userContainer}
//           keyExtractor={item => item.id}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#044EE3',
//   },
//   mainHeader: {
//     backgroundColor: '#0000e5',
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     padding: 5,
//     paddingBottom: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   logo: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: '900',
//   },
//   input: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#fff',
//     borderRadius: 25,
//     backgroundColor: '#fff',
//     margin: 12,
//     paddingHorizontal: 15,
//     gap: 10,
//   },
//   inputText: {
//     flex: 1,
//     color: '#000',
//     fontSize: 16,
//   },
//   userContainer: {
//     padding: 20,
//   },
//   proImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   userField: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   profileName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   msgDate: {
//     color: '#ccc',
//     fontSize: 12,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default MainScreen;

import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {getAuth, signOut} from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from '@react-native-firebase/firestore';

const MainScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const inputRef = useRef(null);
  const usersRef = useRef(users);
  const db = getFirestore();
  const authInstance = getAuth();

  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  useEffect(() => {
    const fetchToken = async () => {
      if (authInstance.currentUser) {
        try {
          const response = await axios.get(
            `http://192.168.1.14:3000/token?identity=${authInstance.currentUser.uid}`,
          );
          setToken(response.data.token);
          console.log(
            'Token fetched:',
            response.data.token.slice(0, 10),
            '...',
          );
        } catch (error) {
          console.error('Error fetching token:', error.message);
          Alert.alert(
            'Network Error',
            'Unable to connect to the server. Please check your network and try again.',
          );
        }
      }
    };
    fetchToken();
  }, [authInstance.currentUser]);

  useEffect(() => {
    if (!authInstance.currentUser) return;
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersList = usersSnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(user => user.uid !== authInstance.currentUser?.uid);
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authInstance.currentUser]);

  useEffect(() => {
    if (!authInstance.currentUser) return;
    const q = query(
      collection(db, 'conversations'),
      orderBy('lastMessageDate', 'desc'),
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      const updatedUsers = usersRef.current.map(user => {
        const convoDoc = snapshot.docs.find(
          doc =>
            doc.id ===
            [authInstance.currentUser.uid, user.uid].sort().join('-'),
        );
        return {
          ...user,
          lastMessageDate: convoDoc?.data()?.lastMessageDate?.toDate() || null,
        };
      });
      setUsers(updatedUsers);
    });
    return () => unsubscribe();
  }, [authInstance.currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(authInstance);
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  const filteredUsers = [
    ...new Map(users.map(user => [user.id, user])).values(),
  ].filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.userField}
      onPress={() => {
        if (token) {
          navigation.navigate('Chat', {
            token,
            currentUser: authInstance.currentUser.uid,
            selectedUser: item.uid,
            selectedUserName: item.name,
          });
        } else {
          console.warn('Token not ready yet');
        }
      }}>
      <View style={styles.userInfo}>
        {item.photo ? (
          <Image source={{uri: item.photo}} style={styles.proImage} />
        ) : (
          <Ionicons name="person-circle-sharp" size={60} color="white" />
        )}
        <Text style={styles.profileName}>{item.name}</Text>
      </View>
      <Text style={styles.msgDate}>
        {item.lastMessageDate
          ? new Date(item.lastMessageDate).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : 'No messages'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={{alignSelf: 'flex-start', top: -15, left: -15}}>
              <AntDesign
                name="close"
                size={22}
                color="red"
                onPress={() => setVisible(false)}
              />
            </View>
            {authInstance.currentUser.photoURL ? (
              <Image
                source={{uri: authInstance.currentUser.photoURL}}
                style={styles.MainProImage}
              />
            ) : (
              <Ionicons name="person-circle-sharp" size={90} color="black" />
            )}
            <Text style={{marginVertical: 10, color: 'black'}}>
              {authInstance.currentUser?.displayName}
            </Text>

            <Button title="logout" onPress={handleLogout} />
          </View>
        </View>
      </Modal>

      <View style={styles.mainHeader}>
        <View style={styles.header}>
          <Text style={styles.logo}>Schat</Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            {authInstance.currentUser.photoURL ? (
              <Image
                source={{uri: authInstance.currentUser.photoURL}}
                style={styles.proImage}
              />
            ) : (
              <Ionicons name="person-circle-sharp" size={50} color="white" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <Feather
            name="search"
            size={20}
            color="gray"
            onPress={() => inputRef.current?.focus()}
          />
          <TextInput
            ref={inputRef}
            placeholder="Search User"
            style={styles.inputText}
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="gray"
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      ) : filteredUsers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {search ? 'No users found' : 'No contacts available'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          style={styles.userContainer}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#044EE3',
  },
  mainHeader: {
    backgroundColor: '#0000e5',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 5,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  logo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    backgroundColor: '#fff',
    margin: 12,
    paddingHorizontal: 15,
    gap: 10,
  },
  inputText: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  userContainer: {
    padding: 20,
  },
  proImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  MainProImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  msgDate: {
    color: '#ccc',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default MainScreen;
