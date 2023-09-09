import { View, Text, TouchableOpacity, ViewBase } from "react-native"
import React, { Fragment, useCallback, useState } from "react"
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from "react-redux"

export default function UserItem(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: props.data.name,
        phone: props.data.phone,
        isEdit: false,
        showHide: false
    })

    const handleEdit = useCallback((event) => {
        event.preventDefault()
        setUser({
            name: user.name,
            phone: user.phone,
            isEdit: true
        });
    }, [user])

    const handleCancel = useCallback((event) => {
        event.preventDefault()
        setUser({
            name: props.data.name,
            phone: props.data.phone,
            isEdit: false
        });
    }, [])

    const saveEdit = useCallback((event) => {
        event.preventDefault()
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
                            <View>
                                <TouchableOpacity style={{ marginHorizontal: 5, elevation: 2 }} onPress={saveEdit}>
                                    <Icon name="save" size={30} color="#85b35a" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginHorizontal: 2, elevation: 2 }} onPress={handleCancel}>
                                    <Icon name="arrow-back-circle" size={30} color="#bdd9a0" />
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <TouchableOpacity style={{ marginHorizontal: 5, elevation: 2 }} onPress={handleEdit}>
                                    <Icon name="create" size={30} color="#85b35a" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginHorizontal: 2, elevation: 2 }} onPress={showModal}>
                                    <Icon name="close-circle" size={30} color="#bdd9a0" />
                                </TouchableOpacity>
                            </View>
                        :
                        <TouchableOpacity style={{ marginHorizontal: 2, elevation: 2 }} onPress={props.resend}>
                            <Icon name="refresh-circle" size={30} color="#4a8122" />
                        </TouchableOpacity>
                    }
                </View>
            </View>

            <View>
                <Modal show={user.showHide}>
                    <View style={styles.modalListIcon}>
                        <Icon name="alert-circle" size={80} color="#173e07"
                            style={styles.modalIcon} />
                    </View>

                    <Text style={styles.titleModal}>Deleted Confirmation</Text>
                    <Text style={{ textAlign: 'center', fontSize: 17, color: 'gray' }}>
                        Are you sure you want delete it?
                    </Text>
                    <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold', color: '#173e07' }}>
                        " {props.data.name} "
                    </Text>
                    <View>
                        <TouchableOpacity style={styles.modalNo} onPress={hideModal}>
                            <Text style={{ color: '#ffffff' }}> No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalYes} onPress={props.remove}>
                            <Text style={{ color: '#ffffff' }}> Yes</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {

    },
})