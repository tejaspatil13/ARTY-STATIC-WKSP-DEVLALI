import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ navigation }) => {
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('MainScreen')}
      style={styles.headerButton}
    >
      <Ionicons name="home-outline" size={24} color="#2196F3" />
    </TouchableOpacity>
  );
};

const styles = {
  headerButton: {
    marginLeft: 15,
    padding: 5,
  }
};

export default CustomHeader;