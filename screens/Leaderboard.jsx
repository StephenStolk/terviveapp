import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

const Leaderboard = () => {
  const [section, setSection] = useState('Global');
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data based on the selected section
    fetchLeaderboardData(section);
  }, [section]);

  const fetchLeaderboardData = async (section) => {
    setLoading(true);
    try {
      // Simulate different data based on the section
      const data = section === 'Global' ? 
        [
          { id: '1', country: 'USA', name: 'Alice', points: 1200 },
          { id: '2', country: 'Canada', name: 'Bob', points: 1100 },
        ] :
        [
          { id: '1', state: 'California', city: 'San Francisco', name: 'Charlie', points: 950 },
          { id: '2', state: 'New York', city: 'New York City', name: 'David', points: 900 },
        ];
      setLeaderboardData(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{section === 'Global' ? item.country : `${item.state}, ${item.city}`}</Text>
      <Text style={styles.itemText}>{item.points} Points</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionSelector}>
        <TouchableOpacity
          style={[styles.sectionButton, section === 'Global' && styles.activeSection]}
          onPress={() => setSection('Global')}
        >
          <Text style={styles.sectionText}>Global</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, section === 'Regional' && styles.activeSection]}
          onPress={() => setSection('Regional')}
        >
          <Text style={styles.sectionText}>Regional</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6600" />
      ) : (
        <FlatList
          data={leaderboardData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  sectionButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeSection: {
    backgroundColor: '#ff6600',
    borderColor: '#ff6600',
  },
  sectionText: {
    fontSize: 18,
    color: '#666',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default Leaderboard;
