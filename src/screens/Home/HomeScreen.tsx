import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { Play } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const MOCK_DATA = [
  {
    id: '1',
    title: '真夜中のコンビニ',
    creator: 'user123',
    style: 'Anime / VHS',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800', // Mock image
  },
  {
    id: '2',
    title: '放課後の夕暮れ廊下',
    creator: 'dreamer_luna',
    style: 'Dreamcore',
    image: 'https://images.unsplash.com/photo-1516062423079-7c1bd0a55fff?auto=format&fit=crop&q=80&w=800', // Mock image
  },
];

const DreamCard = ({ item }: { item: any }) => (
  <View style={styles.card}>
    <ImageBackground source={{ uri: item.image }} style={styles.background} resizeMode="cover">
      <BlurView intensity={20} style={StyleSheet.absoluteFill} />
      <View style={styles.overlay}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.creator}>Created by @{item.creator}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.style}</Text>
          </View>
        </View>
        <View style={styles.playButtonContainer}>
          <View style={styles.playButton}>
            <Play color="#fff" size={32} fill="#fff" />
          </View>
          <Text style={styles.playText}>PLAY</Text>
        </View>
      </View>
    </ImageBackground>
  </View>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_DATA}
        renderItem={({ item }) => <DreamCard item={item} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  card: {
    width: width,
    height: height,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 20,
    paddingBottom: 100, // Account for tab bar
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  creator: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 4,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  playButtonContainer: {
    alignItems: 'center',
    marginLeft: 20,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  playText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
