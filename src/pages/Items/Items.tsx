import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const Items = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Sell It</Text>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>O casos</Text>
        </Text>
      </View>
      <Text>Incidents</Text>
    </View>
  );
};

export default Items;
