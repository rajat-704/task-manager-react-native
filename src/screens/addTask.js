import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Label, Form, Button, Item, Input } from "native-base";

export default class AddTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            date: ""
        }
    }

    saveTask = async () => {
        if (
            this.state.title !== "" &&
            this.state.description !== "" &&
            this.state.date !== ""
        ) {
            var task = {
                title: this.state.title,
                description: this.state.description,
                date: this.state.date
            }
            await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(task))
                .then(() => {
                    this.props.navigation.navigate("Home");
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            Alert.alert("Fill All The Fields")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>
                    <ScrollView style={styles.scrollContainer}>
                        <Form>
                            <Item style={styles.inputItem}>
                                <Label>Title</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    onChangeText={title => { this.setState({ title: title }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>Description</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='default'
                                    onChangeText={description => { this.setState({ description: description }) }}
                                />
                            </Item>
                            <Item style={styles.inputItem}>
                                <Label>Date</Label>
                                <Input
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    onChangeText={date => { this.setState({ date: date }) }}
                                />
                            </Item>
                        </Form>
                        <Button style={styles.button} full onPress={() => { this.saveTask(); }}>
                            <Text style={styles.buttonText}>Save</Text>
                        </Button>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10,
        height: 500
    },
    inputItem: {
        margin: 10
    },
    button: {
        backgroundColor: "#B83227",
        marginTop: 40
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    empty: {
        height: 500,
        backgroundColor: "#FFF"
    }
});
