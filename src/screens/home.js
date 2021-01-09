import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from "native-base";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.props.navigation.addListener('willFocus', this.getTasks());
    }

    getTasks = async () => {
        await AsyncStorage.getAllKeys()
            .then(async keys => {
                try {
                    const result = await AsyncStorage.multiGet(keys);
                    this.setState({
                        data: result
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            )
            .catch(error => { console.log(error); })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.addContainer}>
                    <Icon
                        raised
                        name='pluscircleo'
                        type='font-awesome'
                        size={150}
                        color='#757780'
                        onPress={() => this.props.navigation.navigate("Add")}
                    />
                </View>
                <View style={styles.taskContainer}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => item[0].toString()}
                        renderItem={({ item }) => {
                            var task = JSON.parse(item[1]);
                            return (
                                <Card >
                                    <View >
                                        <Text >
                                            {task.title[0].toUpperCase()}
                                        </Text>
                                    </View>
                                    <View >
                                        <Text >
                                            {task.title}
                                        </Text>
                                        <Text >
                                            {task.description}
                                        </Text>
                                        <Text >
                                            {task.date}
                                        </Text>
                                    </View>
                                </Card>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addContainer: {
        flex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    taskContainer: {
        flex: 5,
    },
    listItem: {
        flexDirection: "row",
        padding: 20
    },
    iconContainer: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B83227",
        borderRadius: 100
    },
    contactIcon: {
        fontSize: 28,
        color: "#fff"
    },
    infoContainer: {
        flexDirection: "column"
    },
    infoText: {
        fontSize: 16,
        fontWeight: "400",
        paddingLeft: 10,
        paddingTop: 2
    }
});
