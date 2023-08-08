import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "@react-navigation/native";
import RNFetchBlob from 'rn-fetch-blob';
const VerRecurso = ({ route }) => {
  const { resource } = route.params;
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    // Fetch the user token and fa_enabled from AsyncStorage when the component mounts
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userID');
        setUserID(token);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

console.log(userID)


  const [DisciplinaRecurso, setDisciplinaRecurso] = useState("");
  const [numLikes, setNumLikes] = useState("");
  const [userLiked, setUserLiked] = useState(false);
  useEffect(() => {
    fetch('https://62cc-89-114-75-214.ngrok-free.app/checkDisciplina', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        disciplina: resource.discipline_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setDisciplinaRecurso(data[0].name);
        }
      })
      .catch((error) => {
        console.error("Error fetching resource:", error);
        alert("Error fetching resource");
      });
  }, [resource.discipline_id]);

  useEffect(() => {
    fetch('https://62cc-89-114-75-214.ngrok-free.app/numLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: resource.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setNumLikes(data[0]["COUNT(id)"]);
        }
      })
      .catch((error) => {
        console.error("Error fetching resource:", error);
        alert("Error fetching resource");
      });
  }, [resource.id]);

  useEffect(() => {
    fetch('https://62cc-89-114-75-214.ngrok-free.app/userLiked', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userID,
        resource_id: resource.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setUserLiked(data.liked);
        }
      })
      .catch((error) => {
        console.error("Error fetching resource:", error);
        alert("Error fetching resource");
      });
  }, [userID, resource.id]);


  const handleDownload = () => {
   alert("A fazer download do ficheiro mas ainda não está implementado");
    };
  

  const handleLike = () => {
    fetch('https://62cc-89-114-75-214.ngrok-free.app/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userID,
        resource_id: resource.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setUserLiked(!userLiked);
          if (userLiked === false) {
            setNumLikes(numLikes + 1);
          } else {
            setNumLikes(numLikes - 1);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching resource:', error);
        alert('Error fetching resource');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{resource.title}</Text>
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.info}>{resource.description}</Text>
      <Text style={styles.label}>Disciplina:</Text>
      <Text style={[styles.info]}>{DisciplinaRecurso}</Text>
      <Text style={styles.label}>Data de Upload:</Text>
      <Text style={[styles.info]}>{resource.upload_date}</Text>
      <Text style={styles.label}>Numero de Likes:</Text>
      <Text style={[styles.info]}>{numLikes}</Text>
      <Text style={styles.label}>Ficheiro:</Text>
      <TouchableOpacity style={styles.button} onPress={handleDownload}>
        <Text style={[styles.buttonText]}>Descarregar o ficheiro</Text>
      </TouchableOpacity>
  
      {userLiked === false ? (
        <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={handleLike}>
          <Text style={[styles.buttonText]}>Gosto</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.dislikeButton]} onPress={handleLike}>
          <Text style={[styles.buttonText]}>Remover o Gosto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  
  
};

const styles = StyleSheet.create({
  info: {
    fontSize: 16,
    marginBottom: 16,
    color: "#000000",
  },

  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000000",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  info: {
    fontSize: 16,
    marginBottom: 16,
    color : "#000000",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "blue",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  likeButton: {
    backgroundColor: "green",
  },
  dislikeButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  Text: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});


export default VerRecurso;
