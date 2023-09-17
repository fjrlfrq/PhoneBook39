import { useCallback, useState } from "react"
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from "react-redux"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView } from "react-native"
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
                            <Icon name="save" size={30} color="#85b35a" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={handleCancel}>
                            <Icon name="arrow-back-circle" size={30} color="#bdd9a0" />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{}}>
                        <TouchableOpacity style={{}} onPress={handleEdit}>
                            <Icon name="create" size={30} color="#4a8122" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={showModal}>
                            <Icon name="close-circle" size={30} color="#85b35a" />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity style={{}} onPress={props.resend}>
                        <Icon name="refresh-circle" size={30} color="#4a8122" />
                    </TouchableOpacity>
                    }
                </View>
            </View>

            <View>
                <Modal show={user.showHide}>
                    <View style={{}}>
                        <Icon name="alert-circle" size={80} color="#173e07"
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

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: windowWidth * 0.02,
        // marginVertical: windowHeight * 0.01,
    },
    cardWrapper: {
        borderBottomWidth: 1.5,
        borderColor: '#173e07'
    },
    cardList: {
        borderColor: 'red',
        flexDirection: 'row',
        paddingBottom: 3,
        paddingTop: 0,
        width: '100%'
    },
    number: {
        width: 25,
        alignItems: 'center'
    },
    noText: {
        paddingVertical: 10,
        fontSize: 11,
        color: '#173e07',
        fontWeight: 'bold',
    },
    icon: {
        width: 55,
        alignContent: 'center'
    },
    card: {
        paddingBottom: 5,
        paddingTop: 5,
        justifyContent: 'flex-start',
        borderColor: "red",
        width: '73%',
    },
    userName: {
        height: 25,
        width: "100%",
        marginTop: -5,
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 2,
        paddingBottom: 2,
        color: '#4a8122'
    },
    userPhone: {
        height: 25,
        paddingVertical: 5,
        width: "100%",
        marginBottom: -5,
        fontSize: 15,
        paddingTop: 2,
        paddingBottom: 2,
        color: '#4a8122'
    },
    cardTitleName: {
        color: '#173e07',
        fontWeight: '700',
        fontSize: 18
    },
    cardTitlePhone: {
        color: 'gray',
        fontWeight: '500',
        fontSize: 15,
    },
    buttonList: {
        borderColor: "blue",
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
        justifyContent: 'center'
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    modalListIcon: {
        alignItems: 'center',
        borderColor: '#ffffff',
        bottom: 85
    },
    modalIcon: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 85,
        paddingHorizontal: 5,
        borderRadius: 50,
        zIndex: 1
    },
    titleModal: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#173e07',
        textAlign: 'center',
        marginTop: 0
    },
    buttonModal: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
    },
    modalNo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#85b35a',
        paddingVertical: 5,
        borderRadius: 50,
        elevation: 3,
        width: '20%',
        marginHorizontal: 7
    },
    modalYes: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4a8122',
        paddingVertical: 5,
        borderRadius: 50,
        elevation: 3,
        width: '20%',
        marginHorizontal: 7
    },
});
