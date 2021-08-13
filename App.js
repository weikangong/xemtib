/**
 * 1. Create a unordered list using React that lists the top 5 exchanges by volume of currency type Bitcoin (BTC) in
 * descending order given the api endpoint:
 *   http://localhost:3334/volume
 *
 * 2. Add caching for 24h.
 *
 * 3. Bonus: Make the cache offline
 *
 * Work the way you are most comfortable and treat this as an everyday task. You are allowed to ask questions,
 * look up documentation and search for answers.
 */


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';

import Exchange from './components/Exchange';

import { fetchExchange } from './api';

export default function App() {
  const [exchanges, setExchanges] = useState([]);
  const [showBTC, setShowBTC] = useState(true);

  const getExchange = async () => {
    const exchanges = await fetchExchange();
    const filteredExchanges = exchanges
      .filter((exchange) => {
        if (showBTC) // BTC, ETH
          return exchange.currency === 'BTC'
        // return exchange.currency === 'ETH'
      });

    filteredExchanges
      .sort((a, b) => b.volume - a.volume)
      .splice(5);
    setExchanges(filteredExchanges);
  }

  const renderExchange = (exchange) => {
    return (<Exchange exchange={exchange} key={`${exchange.name}-${exchange.currency}`} />)
  }

  const toggleBTC = () => {
    setShowBTC(!showBTC);
  }

  // update top 5 vol exchanges
  useEffect(() => {
    getExchange();
  }, [showBTC]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Top 5 Exchanges by BTC Volume</Text>
      {exchanges.map(renderExchange)}
      <Button onPress={toggleBTC} title={`showBTC: ${showBTC}`} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    margin: 18,
  }
});
