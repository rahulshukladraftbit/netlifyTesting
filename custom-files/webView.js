import React from 'react';
import { View, StyleSheet } from 'react-native';

export const WebViewComponent = ({ url }) => {
  return (
    <View style={styles.container}>
      <iframe
        src={url}
        style={styles.iframe}
        title="WebView"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iframe: {
    flex: 1,
    border: 'none',
  },
});
