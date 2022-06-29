import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const List = () => {
    const [textInput, setTextInput] = useState('')
    const [grocerys, setgrocery] = useState([]);

    useEffect(() => {
        getgroceryFromUserDevice();
    }, []);

    useEffect(() => {
        savegrocerysTouserDevice(grocerys);
    }, [grocerys]);


    const ListItem = ({ grocery }) => {
        return (
            <View style={styles.listItem}>
                <View>
                    <Text style={styles.txt}>{grocery?.task}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => deleteGrocery(grocery?.id)}>
                    <Image style={styles.dustbinIcon}
                        source={require('../assets/dustbin.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const getgroceryFromUserDevice = async () => {
        try {
            const grocerys = await AsyncStorage.getItem('grocerys');
            if (grocerys != null) {
                setgrocery(JSON.parse(grocerys));
            }
        } catch (error) {
            console.log(error)
        }
    };

    const addGrocery = () => {
        if (textInput == '') {
            Alert.alert('Error', 'Please add the Items')
        } else {
            const newGrocery = {
                id: Math.random(),
                task: textInput,
                completed: false,
            };
            setgrocery([...grocerys, newGrocery]);
            setTextInput('');
        }

    };

    const deleteGrocery = grocerysId => {
        const newGrocery = grocerys.filter(item => item.id != grocerysId);
        setgrocery(newGrocery);
    }

    const cleargrocery = () => {
        Alert.alert('confirm', 'Clear Grocery?', [
            {
                text: 'Yes',
                onPress: () => setgrocery([]),
            },
            {
                text: 'No'
            }
        ]);

    };

    const savegrocerysTouserDevice = async grocerys => {
        try {
            const stringifygrocerys = JSON.stringify(grocerys);
            await AsyncStorage.setItem('grocerys', stringifygrocerys);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            {/* <Text>List</Text> */}
            <View style={styles.inpuWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder='Add Items'
                    value={textInput}
                    onChangeText={text => setTextInput(text)}
                />
                <TouchableOpacity onPress={addGrocery}>
                    <Image style={styles.icon}
                        source={require('../assets/plus.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={cleargrocery}>
                    <Image style={styles.dustbinIcon}
                        source={require('../assets/dustbin.png')}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                data={grocerys}
                renderItem={({ item }) => <ListItem grocery={item} />}
            />
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFFFFF'
    },
    inpuWrapper: {
        marginTop: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        height: 40,
        width: 40,
        backgroundColor: 'gray',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderColor: '#000000',
        borderWidth: 1,
        padding: 20,
        width: '70%',
        borderRadius: 20,
    },
    listItem: {
        padding: 20,
        backgroundColor: 'gray',
        flexDirection: 'row',
        borderRadius: 7,
        marginVertical: 10,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000'
    },
    dustbinIcon: {
        height: 20,
    }
}) 