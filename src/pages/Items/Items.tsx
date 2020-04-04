import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import styles from './styles';
import { Items as ItemsType, Item } from '../../common/types';
import ItemList from '../../components/ItemList';

const GET_ITEMS = gql`
  query items($offset: Int!, $limit: Int!) {
    items(offset: $offset, limit: $limit) {
      count
      items {
        id
        name
        value
        description
        user {
          name
          email
          whatsapp
        }
      }
    }
  }
`;

const LIMIT = 5;

interface Query {
  items: ItemsType;
}

const Items = () => {
  const { loading, error, data, refetch } = useQuery<Query>(GET_ITEMS, {
    variables: {
      limit: LIMIT,
      offset: 0,
    },
  });
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const refresh = useCallback(
    () =>
      refetch({ limit: LIMIT, offset: 0 }).then((value) => {
        setOffset(0);
        const items = value.data?.items.items;
        if (items) {
          setItems(items);
          setCount(value.data.items.count);
        }
      }),
    []
  );

  const onEndReached = useCallback(() => {
    if (count <= items.length) return;
    refetch({
      limit: LIMIT,
      offset: offset + LIMIT,
    }).then((value) => {
      setOffset(offset + LIMIT);
      const fetchItems = value.data?.items.items;
      if (fetchItems) setItems([...items, ...fetchItems]);
    });
  }, [offset, items, count]);

  const renderItems = useCallback(
    ({ item }) => (
      <ItemList
        key={item.id}
        {...item}
        onPress={() => {
          navigation.navigate('details', {
            item,
          });
        }}
      />
    ),
    []
  );

  useEffect(() => {
    refetch().then(({ data }) => {
      if (data?.items) {
        setItems(data.items.items);
        setCount(data.items.count);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Sell It</Text>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{count} casos</Text>
        </Text>
      </View>
      <Text></Text>
      <FlatList
        data={items}
        renderItem={renderItems}
        onRefresh={refresh}
        refreshing={loading}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
      />
    </View>
  );
};

export default Items;
