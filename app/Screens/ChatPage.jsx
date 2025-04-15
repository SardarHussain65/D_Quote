// import React, {useState, useEffect} from 'react';
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Client} from '@twilio/conversations';
// import Feather from 'react-native-vector-icons/Feather';

// const ChatScreen = ({route, navigation}) => {
//   const {token, currentUser, selectedUser} = route.params;
//   const [client, setClient] = useState(null);
//   const [conversation, setConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');

//   // Unique convo name for one-to-one chat (e.g., "You-Ali")
//   const convoName = [currentUser, selectedUser].sort().join('-');

//   useEffect(() => {
//     const initializeChat = async () => {
//       try {
//         const twilioClient = new Client(token);
//         setClient(twilioClient);

//         twilioClient.on('stateChanged', async state => {
//           if (state === 'initialized') {
//             let convo;
//             try {
//               convo = await twilioClient.getConversationByUniqueName(convoName);
//             } catch (error) {
//               if (error.status === 404) {
//                 convo = await twilioClient.createConversation({
//                   uniqueName: convoName,
//                   friendlyName: `${currentUser} and ${selectedUser}`,
//                 });
//                 await convo.join();
//               } else {
//                 console.error('Error getting convo:', error);
//                 return;
//               }
//             }
//             setConversation(convo);

//             const msgs = await convo.getMessages();
//             setMessages(
//               msgs.items.map(msg => ({
//                 id: msg.sid,
//                 text: msg.body,
//                 author: msg.author,
//               })),
//             );

//             convo.on('messageAdded', msg => {
//               setMessages(prev => [
//                 ...prev,
//                 {id: msg.sid, text: msg.body, author: msg.author},
//               ]);
//             });
//           }
//         });
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//       }
//     };

//     initializeChat();

//     return () => {
//       if (client) client.shutdown();
//     };
//   }, [token, convoName]);

//   const sendMessage = async () => {
//     if (message.trim() && conversation) {
//       await conversation.sendMessage(message);
//       setMessage('');
//     }
//   };

//   const renderMessage = ({item}) => (
//     <View
//       style={[
//         styles.messageBubble,
//         item.author === currentUser ? styles.myMessage : styles.theirMessage,
//       ]}>
//       <Text style={styles.messageText}>{item.text}</Text>
//       <Text style={styles.messageAuthor}>{item.author}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={item => item.id}
//         style={styles.messageList}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type a message"
//           placeholderTextColor="gray"
//         />
//         <TouchableOpacity onPress={sendMessage}>
//           <Feather name="send" size={24} color="#044EE3" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   messageList: {
//     flex: 1,
//     padding: 10,
//   },
//   messageBubble: {
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     maxWidth: '70%',
//   },
//   myMessage: {
//     backgroundColor: '#044EE3',
//     alignSelf: 'flex-end',
//   },
//   theirMessage: {
//     backgroundColor: '#e0e0e0',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     color: '#fff',
//   },
//   messageAuthor: {
//     fontSize: 10,
//     color: '#fff',
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//     marginRight: 10,
//     color: '#000',
//   },
// });

// import React, {useState, useEffect} from 'react';
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Client} from '@twilio/conversations';
// import Feather from 'react-native-vector-icons/Feather';

// const ChatScreen = ({route, navigation}) => {
//   const {token, currentUser, selectedUser, selectedUserName} = route.params;
//   const [client, setClient] = useState(null);
//   const [conversation, setConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');

//   // Unique convo name for one-to-one chat (e.g., "uid1-uid2")
//   const convoName = [currentUser, selectedUser].sort().join('-');

//   useEffect(() => {
//     const initializeChat = async () => {
//       if (!token) {
//         console.error('No token provided');
//         return;
//       }

//       try {
//         const twilioClient = new Client(token);
//         setClient(twilioClient);

//         twilioClient.on('stateChanged', async state => {
//           if (state === 'initialized') {
//             let convo;
//             try {
//               convo = await twilioClient.getConversationByUniqueName(convoName);
//             } catch (error) {
//               if (error.status === 404) {
//                 convo = await twilioClient.createConversation({
//                   uniqueName: convoName,
//                   friendlyName: `${currentUser} and ${selectedUser}`,
//                 });
//                 await convo.join();
//               } else {
//                 console.error('Error getting convo:', error);
//                 return;
//               }
//             }
//             setConversation(convo);

//             const msgs = await convo.getMessages();
//             setMessages(
//               msgs.items.map(msg => ({
//                 id: msg.sid,
//                 text: msg.body,
//                 author: msg.author,
//               })),
//             );

//             convo.on('messageAdded', msg => {
//               setMessages(prev => [
//                 ...prev,
//                 {id: msg.sid, text: msg.body, author: msg.author},
//               ]);
//             });
//           }
//         });
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//       }
//     };

//     initializeChat();

//     return () => {
//       if (client) client.shutdown();
//     };
//   }, [token, convoName]);

//   const sendMessage = async () => {
//     if (message.trim() && conversation) {
//       await conversation.sendMessage(message);
//       setMessage('');
//     }
//   };

//   const renderMessage = ({item}) => (
//     <View
//       style={[
//         styles.messageBubble,
//         item.author === currentUser ? styles.myMessage : styles.theirMessage,
//       ]}>
//       <Text style={styles.messageText}>{item.text}</Text>
//       <Text style={styles.messageAuthor}>
//         {item.author === currentUser ? 'Me' : selectedUserName}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={item => item.id}
//         style={styles.messageList}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type a message"
//           placeholderTextColor="gray"
//         />
//         <TouchableOpacity onPress={sendMessage}>
//           <Feather name="send" size={24} color="#044EE3" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   messageList: {
//     flex: 1,
//     padding: 10,
//   },
//   messageBubble: {
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     maxWidth: '70%',
//   },
//   myMessage: {
//     backgroundColor: '#044EE3',
//     alignSelf: 'flex-end',
//   },
//   theirMessage: {
//     backgroundColor: '#e0e0e0',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     color: '#fff',
//   },
//   messageAuthor: {
//     fontSize: 10,
//     color: '#fff',
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//     marginRight: 10,
//     color: '#000',
//   },
// });

// import React, {useState, useEffect} from 'react';
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Client} from '@twilio/conversations';
// import Feather from 'react-native-vector-icons/Feather';

// const ChatScreen = ({route, navigation}) => {
//   const {token, currentUser, selectedUser, selectedUserName} = route.params;
//   const [client, setClient] = useState(null);
//   const [conversation, setConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');

//   // Unique convo name for one-to-one chat (e.g., "uid1-uid2")
//   const convoName = [currentUser, selectedUser].sort().join('-');

//   useEffect(() => {
//     const initializeChat = async () => {
//       if (!token) {
//         console.error('No token provided');
//         return;
//       }

//       console.log(
//         'Initializing Twilio client with token:',
//         token.slice(0, 10),
//         '...',
//       );
//       try {
//         const twilioClient = new Client(token);
//         setClient(twilioClient);

//         twilioClient.on('stateChanged', async state => {
//           console.log('Twilio client state:', state);
//           if (state === 'initialized') {
//             let convo;
//             try {
//               console.log('Attempting to get conversation:', convoName);
//               convo = await twilioClient.getConversationByUniqueName(convoName);
//               console.log('Conversation found:', convo.sid);
//             } catch (error) {
//               if (error.status === 404) {
//                 console.log('Conversation not found, creating:', convoName);
//                 try {
//                   convo = await twilioClient.createConversation({
//                     uniqueName: convoName,
//                     friendlyName: `${currentUser} and ${selectedUser}`,
//                   });
//                   console.log('Conversation created:', convo.sid);
//                 } catch (createError) {
//                   console.error('Error creating conversation:', createError);
//                   return;
//                 }
//               } else {
//                 console.error('Error getting conversation:', error);
//                 return;
//               }
//             }

//             // Ensure current user joins
//             try {
//               await convo.join();
//               console.log('Joined conversation as:', currentUser);
//             } catch (joinError) {
//               console.error('Error joining conversation:', joinError);
//             }

//             // Add selected user as participant
//             try {
//               const participants = await convo.getParticipants();
//               const participantIds = participants.map(p => p.identity);
//               if (!participantIds.includes(selectedUser)) {
//                 console.log('Adding participant:', selectedUser);
//                 await convo.add(selectedUser);
//                 console.log('Successfully added participant:', selectedUser);
//               } else {
//                 console.log('Participant already added:', selectedUser);
//               }
//             } catch (addError) {
//               console.error('Error adding participant:', addError);
//             }

//             setConversation(convo);

//             // Load messages
//             try {
//               const msgs = await convo.getMessages();
//               setMessages(
//                 msgs.items.map(msg => ({
//                   id: msg.sid,
//                   text: msg.body,
//                   author: msg.author,
//                 })),
//               );
//               console.log('Messages loaded:', msgs.items.length);
//             } catch (msgError) {
//               console.error('Error loading messages:', msgError);
//             }

//             // Listen for new messages
//             convo.on('messageAdded', msg => {
//               console.log('New message:', msg.body, 'from:', msg.author);
//               setMessages(prev => [
//                 ...prev,
//                 {id: msg.sid, text: msg.body, author: msg.author},
//               ]);
//             });

//             // Log participants
//             try {
//               const participants = await convo.getParticipants();
//               console.log(
//                 'Participants:',
//                 participants.map(p => p.identity),
//               );
//             } catch (partError) {
//               console.error('Error getting participants:', partError);
//             }
//           }
//         });
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//       }
//     };

//     initializeChat();

//     return () => {
//       if (client) {
//         console.log('Shutting down Twilio client');
//         client.shutdown();
//       }
//     };
//   }, [token, convoName, selectedUser]);

//   const sendMessage = async () => {
//     if (message.trim() && conversation) {
//       try {
//         await conversation.sendMessage(message);
//         console.log('Message sent:', message);
//         setMessage('');
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     }
//   };

//   const renderMessage = ({item}) => (
//     <View
//       style={[
//         styles.messageBubble,
//         item.author === currentUser ? styles.myMessage : styles.theirMessage,
//       ]}>
//       <Text style={styles.messageText}>{item.text}</Text>
//       <Text style={styles.messageAuthor}>
//         {item.author === currentUser ? 'Me' : selectedUserName}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={item => item.id}
//         style={styles.messageList}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type a message"
//           placeholderTextColor="gray"
//         />
//         <TouchableOpacity onPress={sendMessage}>
//           <Feather name="send" size={24} color="#044EE3" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   messageList: {
//     flex: 1,
//     padding: 10,
//   },
//   messageBubble: {
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     maxWidth: '70%',
//   },
//   myMessage: {
//     backgroundColor: '#044EE3',
//     alignSelf: 'flex-end',
//   },
//   theirMessage: {
//     backgroundColor: '#e0e0e0',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     color: '#fff',
//   },
//   messageAuthor: {
//     fontSize: 10,
//     color: '#fff',
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//     marginRight: 10,
//     color: '#000',
//   },
// });

// import React, {useState, useEffect, useRef} from 'react';
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Client} from '@twilio/conversations';
// import Feather from 'react-native-vector-icons/Feather';
// import {getFirestore, doc, setDoc} from '@react-native-firebase/firestore';

// const ChatScreen = ({route, navigation}) => {
//   const {token, currentUser, selectedUser, selectedUserName} = route.params;
//   const [client, setClient] = useState(null);
//   const [conversation, setConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const flatListRef = useRef(null);
//   const db = getFirestore();

//   // Unique convo name for one-to-one chat (e.g., "uid1-uid2")
//   const convoName = [currentUser, selectedUser].sort().join('-');

//   useEffect(() => {
//     const initializeChat = async () => {
//       if (!token) {
//         console.error('No token provided');
//         return;
//       }

//       console.log(
//         'Initializing Twilio client with token:',
//         token.slice(0, 10),
//         '...',
//       );
//       try {
//         const twilioClient = new Client(token);
//         setClient(twilioClient);

//         twilioClient.on('stateChanged', async state => {
//           console.log('Twilio client state:', state);
//           if (state === 'initialized') {
//             let convo;
//             try {
//               console.log('Attempting to get conversation:', convoName);
//               convo = await twilioClient.getConversationByUniqueName(convoName);
//               console.log('Conversation found:', convo.sid);
//             } catch (error) {
//               if (error.status === 404) {
//                 console.log('Conversation not found, creating:', convoName);
//                 try {
//                   convo = await twilioClient.createConversation({
//                     uniqueName: convoName,
//                     friendlyName: `${currentUser} and ${selectedUser}`,
//                   });
//                   console.log('Conversation created:', convo.sid);
//                 } catch (createError) {
//                   console.error('Error creating conversation:', createError);
//                   return;
//                 }
//               } else {
//                 console.error('Error getting conversation:', error);
//                 return;
//               }
//             }

//             // Check if current user is already a participant
//             try {
//               const participants = await convo.getParticipants();
//               const participantIds = participants.map(p => p.identity);
//               if (!participantIds.includes(currentUser)) {
//                 console.log('Joining conversation as:', currentUser);
//                 await convo.join();
//                 console.log('Successfully joined conversation');
//               } else {
//                 console.log('Already joined conversation as:', currentUser);
//               }
//             } catch (joinError) {
//               console.error('Error joining conversation:', joinError);
//             }

//             // Add selected user as participant
//             try {
//               const participants = await convo.getParticipants();
//               const participantIds = participants.map(p => p.identity);
//               if (!participantIds.includes(selectedUser)) {
//                 console.log('Adding participant:', selectedUser);
//                 await convo.add(selectedUser);
//                 console.log('Successfully added participant:', selectedUser);
//               } else {
//                 console.log('Participant already added:', selectedUser);
//               }
//             } catch (addError) {
//               console.error('Error adding participant:', addError);
//             }

//             setConversation(convo);

//             // Load messages
//             try {
//               const msgs = await convo.getMessages();
//               const uniqueMessages = [
//                 ...new Map(
//                   msgs.items.map(msg => [
//                     msg.sid,
//                     {id: msg.sid, text: msg.body, author: msg.author},
//                   ]),
//                 ).values(),
//               ];
//               setMessages(uniqueMessages);
//               console.log('Messages loaded:', uniqueMessages.length);
//             } catch (msgError) {
//               console.error('Error loading messages:', msgError);
//             } finally {
//               setLoading(false);
//             }

//             // Listen for new messages (ensure only one listener)
//             const messageAddedHandler = msg => {
//               setMessages(prev => {
//                 // Avoid duplicates by checking if msg.sid already exists
//                 if (prev.some(m => m.id === msg.sid)) {
//                   return prev;
//                 }
//                 const newMessage = {
//                   id: msg.sid,
//                   text: msg.body,
//                   author: msg.author,
//                 };
//                 console.log('New message:', msg.body, 'from:', msg.author);
//                 return [...prev, newMessage];
//               });
//             };
//             convo.on('messageAdded', messageAddedHandler);

//             // Log participants
//             try {
//               const participants = await convo.getParticipants();
//               console.log(
//                 'Participants:',
//                 participants.map(p => p.identity),
//               );
//             } catch (partError) {
//               console.error('Error getting participants:', partError);
//             }

//             // Cleanup listener on unmount
//             return () => {
//               convo.off('messageAdded', messageAddedHandler);
//             };
//           }
//         });
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//       }
//     };

//     initializeChat();

//     return () => {
//       if (client) {
//         console.log('Shutting down Twilio client');
//         client.shutdown();
//       }
//     };
//   }, [token, convoName, selectedUser]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (messages.length > 0) {
//       flatListRef.current?.scrollToEnd({animated: true});
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     if (message.trim() && conversation) {
//       try {
//         await conversation.sendMessage(message);
//         console.log('Message sent:', message);
//         // Update last message timestamp in Firestore
//         await setDoc(
//           doc(db, 'conversations', convoName),
//           {lastMessageDate: new Date()},
//           {merge: true},
//         );
//         setMessage('');
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     }
//   };

//   const renderMessage = ({item}) => (
//     <View
//       style={[
//         styles.messageBubble,
//         item.author === currentUser ? styles.myMessage : styles.theirMessage,
//       ]}>
//       <Text style={styles.messageText}>{item.text}</Text>
//       <Text style={styles.messageAuthor}>
//         {item.author === currentUser ? 'Me' : selectedUserName}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>Loading messages...</Text>
//         </View>
//       ) : (
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={item => item.id}
//           style={styles.messageList}
//         />
//       )}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type a message"
//           placeholderTextColor="gray"
//         />
//         <TouchableOpacity onPress={sendMessage}>
//           <Feather name="send" size={24} color="#044EE3" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   messageList: {
//     flex: 1,
//     padding: 10,
//   },
//   messageBubble: {
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     maxWidth: '70%',
//   },
//   myMessage: {
//     backgroundColor: '#044EE3',
//     alignSelf: 'flex-end',
//   },
//   theirMessage: {
//     backgroundColor: '#e0e0e0',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     color: '#000',
//   },
//   messageAuthor: {
//     fontSize: 10,
//     color: '#666',
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//     marginRight: 10,
//     color: '#000',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#000',
//   },
// });

// export default ChatScreen;

// import React, {useState, useEffect, useRef} from 'react';
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Client} from '@twilio/conversations';
// import Feather from 'react-native-vector-icons/Feather';
// import {getFirestore, doc, setDoc} from '@react-native-firebase/firestore';

// const ChatScreen = ({route, navigation}) => {
//   const {token, currentUser, selectedUser, selectedUserName} = route.params;
//   const [client, setClient] = useState(null);
//   const [conversation, setConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const flatListRef = useRef(null);
//   const db = getFirestore();

//   // Unique convo name for one-to-one chat (e.g., "uid1-uid2")
//   const convoName = [currentUser, selectedUser].sort().join('-');

//   useEffect(() => {
//     const initializeChat = async () => {
//       if (!token) {
//         console.error('No token provided');
//         return;
//       }

//       console.log(
//         'Initializing Twilio client with token:',
//         token.slice(0, 10),
//         '...',
//       );
//       try {
//         const twilioClient = new Client(token);
//         setClient(twilioClient);

//         twilioClient.on('stateChanged', async state => {
//           console.log('Twilio client state:', state);
//           if (state === 'initialized') {
//             let convo;
//             try {
//               console.log('Attempting to get conversation:', convoName);
//               convo = await twilioClient.getConversationByUniqueName(convoName);
//               console.log('Conversation found:', convo.sid);
//             } catch (error) {
//               if (error.status === 404) {
//                 console.log('Conversation not found, creating:', convoName);
//                 try {
//                   convo = await twilioClient.createConversation({
//                     uniqueName: convoName,
//                     friendlyName: `${currentUser} and ${selectedUser}`,
//                   });
//                   console.log('Conversation created:', convo.sid);
//                 } catch (createError) {
//                   console.error('Error creating conversation:', createError);
//                   return;
//                 }
//               } else {
//                 console.error('Error getting conversation:', error);
//                 return;
//               }
//             }

//             // Check if current user is already a participant
//             try {
//               const participants = await convo.getParticipants();
//               const participantIds = participants.map(p => p.identity);
//               if (!participantIds.includes(currentUser)) {
//                 console.log('Joining conversation as:', currentUser);
//                 await convo.join();
//                 console.log('Successfully joined conversation');
//               } else {
//                 console.log('Already joined conversation as:', currentUser);
//               }
//             } catch (joinError) {
//               console.error('Error joining conversation:', joinError);
//             }

//             // Add selected user as participant
//             try {
//               const participants = await convo.getParticipants();
//               const participantIds = participants.map(p => p.identity);
//               if (!participantIds.includes(selectedUser)) {
//                 console.log('Adding participant:', selectedUser);
//                 await convo.add(selectedUser);
//                 console.log('Successfully added participant:', selectedUser);
//               } else {
//                 console.log('Participant already added:', selectedUser);
//               }
//             } catch (addError) {
//               console.error('Error adding participant:', addError);
//             }

//             setConversation(convo);

//             // Load messages
//             try {
//               const msgs = await convo.getMessages();
//               const uniqueMessages = [
//                 ...new Map(
//                   msgs.items.map(msg => [
//                     msg.sid,
//                     {id: msg.sid, text: msg.body, author: msg.author},
//                   ]),
//                 ).values(),
//               ];
//               setMessages(uniqueMessages);
//               console.log('Messages loaded:', uniqueMessages.length);
//             } catch (msgError) {
//               console.error('Error loading messages:', msgError);
//             } finally {
//               setLoading(false);
//             }

//             // Listen for new messages (ensure only one listener)
//             const messageAddedHandler = msg => {
//               setMessages(prev => {
//                 // Avoid duplicates by checking if msg.sid already exists
//                 if (prev.some(m => m.id === msg.sid)) {
//                   return prev;
//                 }
//                 const newMessage = {
//                   id: msg.sid,
//                   text: msg.body,
//                   author: msg.author,
//                 };
//                 console.log('New message:', msg.body, 'from:', msg.author);
//                 return [...prev, newMessage];
//               });
//             };
//             convo.on('messageAdded', messageAddedHandler);

//             // Log participants
//             try {
//               const participants = await convo.getParticipants();
//               console.log(
//                 'Participants:',
//                 participants.map(p => p.identity),
//               );
//             } catch (partError) {
//               console.error('Error getting participants:', partError);
//             }

//             // Cleanup listener on unmount
//             return () => {
//               convo.off('messageAdded', messageAddedHandler);
//             };
//           }
//         });
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//       }
//     };

//     initializeChat();

//     return () => {
//       if (client) {
//         console.log('Shutting down Twilio client');
//         client.shutdown();
//       }
//     };
//   }, [token, convoName, selectedUser]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (messages.length > 0) {
//       flatListRef.current?.scrollToEnd({animated: true});
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     if (message.trim() && conversation) {
//       try {
//         await conversation.sendMessage(message);
//         console.log('Message sent:', message);
//         // Update last message timestamp in Firestore
//         await setDoc(
//           doc(db, 'conversations', convoName),
//           {lastMessageDate: new Date()},
//           {merge: true},
//         );
//         setMessage('');
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     }
//   };

//   const renderMessage = ({item}) => (
//     <View
//       style={[
//         styles.messageBubble,
//         item.author === currentUser ? styles.myMessage : styles.theirMessage,
//       ]}>
//       <Text style={styles.messageText}>{item.text}</Text>
//       <Text style={styles.messageAuthor}>
//         {item.author === currentUser ? 'Me' : selectedUserName}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>Loading messages...</Text>
//         </View>
//       ) : (
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={item => item.id}
//           style={styles.messageList}
//         />
//       )}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type a message"
//           placeholderTextColor="gray"
//         />
//         <TouchableOpacity onPress={sendMessage}>
//           <Feather name="send" size={24} color="#044EE3" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'orange',
//   },
//   messageList: {
//     flex: 1,
//     padding: 10,
//   },
//   messageBubble: {
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//     maxWidth: '70%',
//   },
//   myMessage: {
//     backgroundColor: 'aqua',
//     alignSelf: 'flex-end',
//   },
//   theirMessage: {
//     backgroundColor: '#e0e0e0',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     color: '#000',
//   },
//   messageAuthor: {
//     fontSize: 10,
//     color: '#666',
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 20,
//     marginRight: 10,
//     color: '#fff',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 16,
//     color: '#000',
//   },
// });

// export default ChatScreen;
import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Client} from '@twilio/conversations';
import Feather from 'react-native-vector-icons/Feather';
import {getFirestore, doc, setDoc} from '@react-native-firebase/firestore';

const ChatScreen = ({route, navigation}) => {
  const {token, currentUser, selectedUser, selectedUserName} = route.params;
  const [client, setClient] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const flatListRef = useRef(null);
  const db = getFirestore();

  // Unique convo name for one-to-one chat (e.g., "uid1-uid2")
  const convoName = [currentUser, selectedUser].sort().join('-');

  useEffect(() => {
    const initializeChat = async () => {
      if (!token) {
        console.error('No token provided');
        setError('No token provided. Please try again.');
        setLoading(false);
        return;
      }

      console.log(
        'Initializing Twilio client with token:',
        token.slice(0, 10),
        '...',
      );
      try {
        const twilioClient = new Client(token);
        setClient(twilioClient);

        twilioClient.on('stateChanged', async state => {
          console.log('Twilio client state:', state);
          if (state === 'initialized') {
            let convo;
            try {
              // Get all conversations the user is subscribed to
              console.log(
                'Fetching subscribed conversations for:',
                currentUser,
              );
              const subscribedConversations =
                await twilioClient.getSubscribedConversations();
              const conversationsList = subscribedConversations.items;

              // Look for the conversation with the matching unique name
              convo = conversationsList.find(c => c.uniqueName === convoName);

              if (!convo) {
                console.log('Conversation not found, creating:', convoName);
                try {
                  convo = await twilioClient.createConversation({
                    uniqueName: convoName,
                    friendlyName: `${currentUser} and ${selectedUser}`,
                  });
                  console.log('Conversation created:', convo.sid);

                  // Join the conversation
                  await convo.join();
                  console.log(
                    'Successfully joined conversation as:',
                    currentUser,
                  );

                  // Add the selected user as a participant
                  await convo.add(selectedUser);
                  console.log('Successfully added participant:', selectedUser);
                } catch (createError) {
                  console.error('Error creating conversation:', createError);
                  setError('Failed to create conversation. Please try again.');
                  setLoading(false);
                  return;
                }
              } else {
                console.log('Conversation found:', convo.sid);
                // Ensure the user is joined
                if (convo.status !== 'joined') {
                  console.log('Joining conversation as:', currentUser);
                  await convo.join();
                  console.log('Successfully joined conversation');
                } else {
                  console.log('Already joined conversation as:', currentUser);
                }

                // Ensure the selected user is a participant
                const participants = await convo.getParticipants();
                const participantIds = participants.map(p => p.identity);
                if (!participantIds.includes(selectedUser)) {
                  console.log('Adding participant:', selectedUser);
                  await convo.add(selectedUser);
                  console.log('Successfully added participant:', selectedUser);
                } else {
                  console.log('Participant already added:', selectedUser);
                }
              }
            } catch (error) {
              console.error('Error accessing conversation:', error);
              if (error.message.includes('Forbidden')) {
                setError(
                  'You do not have permission to access this conversation.',
                );
              } else {
                setError('Failed to access conversation. Please try again.');
              }
              setLoading(false);
              return;
            }

            setConversation(convo);

            // Load messages
            try {
              const msgs = await convo.getMessages();
              const uniqueMessages = [
                ...new Map(
                  msgs.items.map(msg => [
                    msg.sid,
                    {id: msg.sid, text: msg.body, author: msg.author},
                  ]),
                ).values(),
              ];
              setMessages(uniqueMessages);
              console.log('Messages loaded:', uniqueMessages.length);
            } catch (msgError) {
              console.error('Error loading messages:', msgError);
              setError('Failed to load messages. Please try again.');
              setLoading(false);
              return;
            } finally {
              setLoading(false);
            }

            // Listen for new messages
            const messageAddedHandler = msg => {
              setMessages(prev => {
                if (prev.some(m => m.id === msg.sid)) {
                  return prev;
                }
                const newMessage = {
                  id: msg.sid,
                  text: msg.body,
                  author: msg.author,
                };
                console.log('New message:', msg.body, 'from:', msg.author);
                return [...prev, newMessage];
              });
            };
            convo.on('messageAdded', messageAddedHandler);

            // Log participants
            try {
              const participants = await convo.getParticipants();
              console.log(
                'Participants:',
                participants.map(p => p.identity),
              );
            } catch (partError) {
              console.error('Error getting participants:', partError);
              setError('Failed to load participants. Please try again.');
              return;
            }

            // Cleanup listener on unmount
            return () => {
              convo.off('messageAdded', messageAddedHandler);
            };
          }
        });
      } catch (error) {
        console.error('Error initializing chat:', error);
        setError('Failed to initialize chat. Please try again.');
        setLoading(false);
      }
    };

    initializeChat();

    return () => {
      if (client) {
        console.log('Shutting down Twilio client');
        client.shutdown();
      }
    };
  }, [token, convoName, selectedUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({animated: true});
    }
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() && conversation) {
      try {
        await conversation.sendMessage(message);
        console.log('Message sent:', message);
        await setDoc(
          doc(db, 'conversations', convoName),
          {lastMessageDate: new Date()},
          {merge: true},
        );
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        Alert.alert('Error', 'Failed to send message. Please try again.');
      }
    }
  };

  const renderMessage = ({item}) => (
    <View
      style={[
        styles.messageBubble,
        item.author === currentUser ? styles.myMessage : styles.theirMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageAuthor}>
        {item.author === currentUser ? 'Me' : selectedUserName}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading messages...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              setLoading(true);
              initializeChat();
            }}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.messageList}
        />
      )}
      {!error && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
            placeholderTextColor="gray"
          />
          <TouchableOpacity onPress={sendMessage}>
            <Feather name="send" size={24} color="#044EE3" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: 'aqua',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000',
  },
  messageAuthor: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 20,
    marginRight: 10,
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#044EE3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
