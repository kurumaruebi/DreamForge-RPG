import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function PlayScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Adventure Mode</Text>
      <Text style={styles.subtext}>Play your generated RPG stages here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtext: { color: '#888', marginTop: 10 }
});
