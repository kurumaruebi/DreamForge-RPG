import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Sparkles, Wand2, Image as ImageIcon, Music } from 'lucide-react-native';

export default function ForgeScreen() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Anime');

  const styles_options = [
    { id: 'Anime', name: 'Anime (HD)', icon: <ImageIcon size={20} color="#fff" /> },
    { id: 'Dreamcore', name: 'Dreamcore', icon: <Sparkles size={20} color="#fff" /> },
    { id: 'VHS', name: 'VHS 90s', icon: <Wand2 size={20} color="#fff" /> },
  ];

  const handleForge = () => {
    console.log('Forging with prompt:', prompt, 'style:', style);
    // TODO: Backend integration
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Forge Your Dream</Text>
          <Text style={styles.headerSubtitle}>Create a new RPG stage in seconds.</Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>What is your dream about?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. A convenience store at 3 AM..."
            placeholderTextColor="#888"
            value={prompt}
            onChangeText={setPrompt}
            multiline
          />
        </View>

        <View style={styles.styleSection}>
          <Text style={styles.label}>Select Aesthetic Style</Text>
          <View style={styles.styleGrid}>
            {styles_options.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={[styles.styleCard, style === opt.id && styles.activeStyleCard]}
                onPress={() => setStyle(opt.id)}
              >
                {opt.icon}
                <Text style={styles.styleName}>{opt.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.aiBrief}>
          <BlurView intensity={20} style={styles.briefBox}>
            <View style={styles.briefHeader}>
              <Wand2 size={16} color="#4A90E2" />
              <Text style={styles.briefTitle}>AI Pipeline Preview</Text>
            </View>
            <View style={styles.step}>
              <ImageIcon size={14} color="#888" />
              <Text style={styles.stepText}>Gemini + Nano Banana: Generating Stage 1 Visuals</Text>
            </View>
            <View style={styles.step}>
              <Music size={14} color="#888" />
              <Text style={styles.stepText}>Foley-Vision: Auto-mapping ambient soundscapes</Text>
            </View>
          </BlurView>
        </View>

        <TouchableOpacity 
          style={[styles.forgeButton, !prompt && styles.disabledButton]} 
          onPress={handleForge}
          disabled={!prompt}
        >
          <Text style={styles.forgeButtonText}>FORGE DREAM</Text>
          <Sparkles size={20} color="#fff" fill="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 80,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  inputSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    color: '#fff',
    fontSize: 18,
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  styleSection: {
    marginBottom: 40,
  },
  styleGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  styleCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeStyleCard: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderColor: '#4A90E2',
  },
  styleName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  aiBrief: {
    marginBottom: 40,
  },
  briefBox: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  briefHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  briefTitle: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  stepText: {
    color: '#888',
    fontSize: 13,
  },
  forgeButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 18,
    borderRadius: 32,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#333',
    shadowOpacity: 0,
  },
  forgeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
