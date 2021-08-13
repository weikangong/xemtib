
import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

const Exchange = ({ exchange }) => {
    // assuming name is uniq
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{exchange.name}</Text>
        <Text style={styles.title}>{exchange.volume}</Text>
        <Text style={styles.title}>{exchange.currency}</Text>
      </View>
    )
};

export default Exchange;