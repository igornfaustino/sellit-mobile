import React, { useCallback } from 'react';
import { View, Text, Linking, Button } from 'react-native';
import {
  useRoute,
  useNavigation,
  RouteProp,
  ParamListBase,
} from '@react-navigation/native';

import styles from './styles';
import { Item } from '../../common/types';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface routeParams extends RouteProp<ParamListBase, string> {
  params: {
    item: Item;
  };
}

const Details: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<routeParams>();

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const sendOnWhatsApp = useCallback(() => {
    let msg = `Ola! tenho interesse no produto ${route.params.item.name}, vamos negociar?`;
    let mobile = route.params.item.user.whatsapp;
    let url = 'whatsapp://send?text=' + msg + '&phone=55' + mobile;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  }, []);

  const sendOnEmail = useCallback(() => {
    let msg = `Ola! tenho interesse no produto ${route.params.item.name}, vamos negociar?`;
    let email = route.params.item.user.email;
    let url = `mailto:${email}?subject=Sellit&body=${msg}`;
    Linking.openURL(url)
      .then((data) => {
        console.log('mail Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Sell It</Text>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.headerText}>back</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.bold}>Proprietário</Text>
        <Text>{route.params.item.user?.name}</Text>
        <Text style={styles.bold}>Item</Text>
        <Text>{route.params.item.name}</Text>
        <Text style={styles.bold}>Descrição</Text>
        <Text>{route.params.item.description}</Text>
        <Text style={styles.bold}>Valor</Text>
        <Text>R$ {route.params.item.value?.toFixed(2)}</Text>
        <Text />
        <Button onPress={sendOnWhatsApp} title="Whatsapp" />
        <Text />
        <Button onPress={sendOnEmail} title="Email" />
      </View>
    </View>
  );
};

export default Details;
