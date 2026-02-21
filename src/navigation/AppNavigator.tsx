import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, PlusCircle, Play, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

import HomeScreen from '../screens/Home/HomeScreen';
import ForgeScreen from '../screens/Forge/ForgeScreen';
import PlayScreen from '../screens/Play/PlayScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#888',
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent;
          if (route.name === 'Home') IconComponent = Home;
          else if (route.name === 'Forge') IconComponent = PlusCircle;
          else if (route.name === 'Play') IconComponent = Play;
          else if (route.name === 'Profile') IconComponent = User;

          return (
            <View style={focused ? styles.activeIcon : null}>
              {IconComponent && <IconComponent size={focused ? 28 : 24} color={color} fill={focused ? color : 'transparent'} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Explore' }} />
      <Tab.Screen name="Forge" component={ForgeScreen} options={{ title: 'Forge' }} />
      <Tab.Screen name="Play" component={PlayScreen} options={{ title: 'Adventure' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Vault' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    height: 90,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 8,
  },
  activeIcon: {
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  }
});
