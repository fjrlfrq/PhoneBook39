import { View, Text, TouchableOpacity, ViewBase, StyleSheet } from "react-native"
import React, { Fragment, useCallback, useState } from "react"
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from "react-redux"
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { useCallback, useState } from "react"
import Modal from "react-native-modal";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UserItem(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: props.data.name,
        phone: props.data.phone,
        isEdit: false,
        modal: false
    })

    const handleEdit = useCallback(() => {
        setUser({
            name: user.name,
            phone: user.phone,
            isEdit: true
        });
    }, [user])

    const handleCancel = useCallback(() => {
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            isEdit: false
        });
    }, [])

    const saveEdit = useCallback(() => {
        props.update(user.name, user.phone)
        setUser({
            ...user,
            name: user.name,
            phone: user.phone,
            isEdit: false
        });
    }, [dispatch, user])

    const showModal = useCallback(() => {
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            modal: true
        })
    })

    const showHide = useCallback(() => {
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            modal: false
        })
    })

    return (
        <View>
            <View style={{ flex: 1 }}>
                <Text>{props.no}</Text>
                <View>
                    {user.isEdit ?
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Enter Your Name"
                            onChangeText={name => setUser({ ...user, name })}
                            defaultValue={user.name}
                            autoFocus={true}
                        />
                        :
                        <View>
                            <Text>{user.name}</Text>
                        </View>
                    }
                </View>

                <View>
                    {user.isEdit ?
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Enter Your Number"
                            onChangeText={name => setUser({ ...user, phone })}
                            defaultValue={user.phone}
                            autoFocus={true}
                        />
                        :
                        <View>
                            <Text>{user.phone}</Text>
                        </View>
                    }
                </View>


                <View>
                    {props.data.sent ?
                        user.isEdit ?
                        <View style={{}}>
                        <TouchableOpacity style={{}} onPress={saveEdit}>
                            <Icon name="" size={30} color="#85b35a" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={handleCancel}>
                            <Icon name="" size={30} color="#bdd9a0" />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{}}>
                        <TouchableOpacity style={{}} onPress={handleEdit}>
                            <Icon name="" size={30} color="#4a8122" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={showModal}>
                            <Icon name="" size={30} color="#85b35a" />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity style={{}} onPress={props.resend}>
                        <Icon name="" size={30} color="#4a8122" />
                    </TouchableOpacity>
                    }
                </View>
            </View>

            <View>
                <Modal show={user.showHide}>
                    <View style={{}}>
                        <Icon name="" size={80} color="#173e07"
                            style={{}} />
                    </View>

                    <Text style={{}}>Deleted Confirmation</Text>
                    <Text style={{}}>
                        Are you sure you want delete it?
                    </Text>
                    <Text style={{}}>
                        " {props.data.name} "
                    </Text>
                    <View>
                        <TouchableOpacity style={{}} onPress={showHide}>
                            <Text style={{}}> No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={props.remove}>
                            <Text style={{}}> Yes</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({})