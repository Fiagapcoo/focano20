import React, { useState, useEffect } from "react";
import { View, Text, DrawerLayoutAndroid, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const VerDisciplinas = ({ route }) => {
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        fetch('https://62cc-89-114-75-214.ngrok-free.app/verdisciplinas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                setDisciplinas(data);
            }
        });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.row}>
          <Text style={styles.column}>{item.name}</Text>
          {/* Add more columns for other data fields as needed */}
        </View>
      );
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Disciplinas</Text>
          <FlatList
            data={disciplinas}
            renderItem={renderItem}
            color="#666666"
          />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color : '#000000',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      column: {
        flex: 1,
        fontSize: 16,
        color: '#000000', // Set the text color to black
      },
    });

export default VerDisciplinas;
