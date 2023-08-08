    import React, { useState, useEffect } from "react";
    import { Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";

    const EncontrarRecurso = ({ navigation }) => {
    const [allResources, setAllResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch('https://62cc-89-114-75-214.ngrok-free.app/encontrarrecurso', {
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
            setAllResources(data);
            setFilteredResources(data);
            }
        })
        .catch((error) => {
            console.error("Error fetching resources:", error);
            alert("Error fetching resources");
        });
    }, []);

    const handleSearch = () => {
        // Filter resources based on the search query
        const filtered = allResources
          ? allResources.filter((resource) => {
              const titleMatch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
              const nameMatch = resource.description.toLowerCase().includes(searchQuery.toLowerCase());
              return titleMatch || nameMatch;
            })
          : [];
        setFilteredResources(filtered);1
      };
      

    const handleResourceClick = (resource) => {
        // Navigate to another screen, passing the resource data
        navigation.navigate("VerRecurso", { resource });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.row} onPress={() => handleResourceClick(item)}>
          <Text style={styles.column}>{item.title} - {item.description}</Text>
        </TouchableOpacity>
      );
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Encontrar Recursos</Text>
          <TextInput
            name="search"
            style={styles.input}
            placeholder="Procurar..."
            placeholderTextColor="#666666" // Gray placeholder color
            selectionColor="#000000"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Procurar</Text>
          </TouchableOpacity>
          <FlatList
            data={filteredResources}
            renderItem={renderItem}
            color="#666666"
            keyExtractor={(item) => item.id.toString()}
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
            marginBottom: 16,
            color: '#000000', // Set the text color to black
          },
          input: {
            height: 40,
            borderColor: '#cccccc',
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 12,
            paddingLeft: 10,
            color: '#000000', // Black text color
          },
          resourceItem: {
            // Styles for your resource item
          },
          resourceName: {
            // Styles for your resource name
            color: '#000000', // Set the text color to black
          },
          searchButton: {
            backgroundColor: '#007BFF', // Replace this with your desired button background color
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          },
          buttonText: {
            color: 'white', // Replace this with your desired button text color
            fontSize: 16,
            fontWeight: 'bold',
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

    export default EncontrarRecurso;
