import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const AdicionarDisciplinas = ({ navigation }) => {
    const [disciplina, setDisciplina] = useState("");

    const handleAddDisciplina = () => {

        fetch('https://62cc-89-114-75-214.ngrok-free.app/adicionardisciplina', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: disciplina }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("Disciplina adicionada com sucesso!");
                    setDisciplina('');
                }
            })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Disciplinas</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor="#666666" // Gray placeholder color
                selectionColor="#000000" // Black cursor color
                placeholder="Nome da Disciplina"
                value={disciplina}
                onChangeText={(text) => setDisciplina(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddDisciplina}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color : '#000000',
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
    addButton: {
        backgroundColor: "blue",
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default AdicionarDisciplinas;
