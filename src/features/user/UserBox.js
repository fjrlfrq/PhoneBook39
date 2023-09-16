import React, { useCallback, useState } from "react"
import UserForm from "./UserForm"
import UserList from "./UserList"
import { useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export default function User(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        isAdd: false,
        activeMenu: '',
    })

    const handleAdd = useCallback(() => {
        setUser({
            isAdd: true,
            activeMenu: 'Add',
        });
    }, [dispatch])

    const handleCancel = useCallback(() => {
        setUser({
            isAdd: false,
        })
    }, [dispatch])

    return (
        <SafeAreaView style={{}}>
            <View style={{}}>
                <View>
                    {user.activeMenu == 'Add' ?
                        <TouchableOpacity onPress={handleCancel}>
                            <Text style={{}}>
                                PhoneBook
                            </Text>
                            <Icon name="backward" size={20} color="#4a8122" style={{}} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity>
                            <Text style={{}}>
                                PhoneBook
                            </Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={{}}>

                    <View>
                        <View style={{}}>

                            <TouchableOpacity style={{}}>
                                <Text style={{}}>
                                    Add
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <View>
                            {user.isAdd ?
                                <View>
                                    <UserForm />
                                </View>
                                :
                                ''
                            }
                        </View>
                    </View>

                </View>
            </View>
            <View style={{}}>
                <UserList />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({});