import React, { useState } from 'react';
import {
  Button,
  Modal,
  Pressable,
  Text,
  View,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

import chatHtml from './chatHtml';

const App = () => {
  const [showChat, setShowChat] = useState(false);
  const { width } = useWindowDimensions();

  const title = 'zendesk-chat';
  const zendesk_chat_key = ''; // Add zendesk chat key
  const userToken = ``; // Add user token here

  const renderChat = () => {
    return (
      <Modal
        style={{ marginTop: '20px' }}
        visible={showChat}
        onRequestClose={(e) => console.log('e===>, e')}
      >
        <>
          <WebView
            useWebKit
            style={{ flex: 1, marginTop: 40 }}
            hideKeyboardAccessoryView
            source={{
              html: chatHtml(title, zendesk_chat_key, userToken),
              baseUrl: 'https://static.zdassets.com',
            }}
            showsVerticalScrollIndicator={false}
            applicationNameForUserAgent={'support-center'}
            onMessage={({ nativeEvent }) => {
              nativeEvent.data === 'close' && setShowChat(false);
              if (nativeEvent.data === 'log') {
                console.log('loggerSuccess', nativeEvent);
              } else {
                console.log(nativeEvent.data);
              }
            }}
            originWhitelist={['*']}
          />
          <View
            style={{
              zIndex: 1,
              position: 'absolute',
              marginTop: 40,
              paddingHorizontal: 30,
              width: width,
              height: 75,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Pressable onPress={() => setShowChat(false)}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'transparent',
                }}
              >
                X
              </Text>
            </Pressable>
          </View>
        </>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        title='Chat with support center'
        color='black'
        onPress={() => {
          if (zendesk_chat_key && userToken) setShowChat(true);
          else Alert.alert("missing keys");
        }}
      />
      {renderChat()}
    </View>
  );
};

export default App;
