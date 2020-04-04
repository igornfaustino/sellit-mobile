import React from 'react';
import { Item } from '../common/types';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface ItemsProps extends Item {
  onPress: () => void;
}

const ItemList: React.FC<ItemsProps> = (props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <View>
        <Text style={styles.bold}>Proprietário</Text>
        <Text>{props.user?.name}</Text>
        <Text style={styles.bold}>Item</Text>
        <Text>{props.name}</Text>
        <Text style={styles.bold}>Valor</Text>
        <Text>R$ {props.value?.toFixed(2)}</Text>
      </View>
      <View>
        <Feather name="arrow-right" size={14} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 4,
  },
});

export default ItemList;
