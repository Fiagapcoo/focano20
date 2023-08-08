import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
const AdicionarRecurso = ({ navigation }) => {

    const [selectedItem, setSelectedItem] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const dropdownItems = ['Option 1', 'Option 2', 'Option 3'];

    const onSelectItem = (item) => {
        setSelectedItem(item);
      };

    return (
        <View>
            <Text>Adicionar Recurso</Text>
            <TextInput
                placeholder="Titulo"
                onChangeText={title => setTitle(title)}
                defaultValue={title}
            />
            <TextInput
                multiline={true}
                placeholder="Descrição"
                numberOfLines={4}
                onChangeText={text => setDescription(text)}
                value={description} />

<SelectDropdown
        placeholder="Selecione uma disciplina"
        data={dropdownItems}
        onSelect={(selectedItem) => onSelectItem(selectedItem)}
        buttonTextAfterSelection={(selectedItem) => {
          // text to display after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          // text to display for each item in the dropdown
          return item;
        }}
      />

     
        </View>
    )
};

export default AdicionarRecurso;
