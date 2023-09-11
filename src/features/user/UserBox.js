import React, { useCallback, useState } from "react"
import UserForm from "./UserForm"
import UserList from "./UserList"
import { useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function User(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        isAdd: false,
    })

    const handleAdd = useCallback((event) => {
        event.preventDefault()
        setUser({
            isAdd: true,
            activeMenu: 'Add',
        });
    }, [dispatch])

    const handleCancel = useCallback((event) => {
        event.preventDefault()
        setUser({
            isAdd: false,
            isSearch: false,

        })
    }, [dispatch])

    const cancelSearch = useCallback(() => {
        dispatch(resetSearch())
        setUser({ name: '', phone: '' })
    }, [dispatch])

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{
                paddingHorizontal: windowWidth * 0.05,
                backgroundColor: '#e9f3e0',
            }}>
                <View>
                    {user.activeMenu == 'Search' || user.activeMenu == 'Add' ?
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleCancel}>
                            <Text style={{
                                fontSize: 32,
                                fontWeight: '700',
                                color: '#4a8122',
                                marginTop: 10,
                            }}>
                                PhoneBook
                            </Text>
                            <Icon name="backward" size={20} color="#4a8122" style={{ paddingHorizontal: 4, marginTop: 20 }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={cancelSearch}>
                            <Text style={styles.title}>
                                PhoneBook
                            </Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={styles.box}>

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            marginBottom: 5,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                            borderRadius: 10,
                            backgroundColor: '#ffffff',
                            elevation: 2,
                            width: '100%',
                        }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: user.activeMenu == 'Search' ? '#4a8122' : '#ffffff',
                                elevation: user.activeMenu == 'Search' ? 2 : 0,
                                paddingVertical: 10,
                                borderRadius: 10,
                            }}
                                onPress={handleAdd}
                            >
                                <Text style={{ color: user.activeMenu == 'Search' ? '#ffffff' : '#4a8122', fontWeight: 'bold', letterSpacing: 1, fontSize: 19, margin: -2 }}>
                                    search
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: user.activeMenu == 'Add' ? '#4a8122' : '#ffffff',
                                elevation: user.activeMenu == 'Add' ? 2 : 0,
                                paddingVertical: 10,
                                borderRadius: 10,
                            }}
                                onPress={handleAdd}
                            >
                                <Text style={{ color: user.activeMenu == 'Add' ? '#ffffff' : '#4a8122', fontWeight: 'bold', letterSpacing: 1, fontSize: 19, margin: -2 }}>
                                    add
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: windowWidth * 0.05,
        // marginVertical: windowHeight * 0.01,
        backgroundColor: '#e9f3e0',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#173e07',
        marginTop: 10,
    },
    box: {
        marginHorizontal: windowWidth * 0.03,
        justifyContent: 'center',
    },
    footer: {
        // flex: 1,
        backgroundColor: '#e9f3e0',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textFooter: {
        color: '#173e07',
        fontSize: 12
    },
    textFooterName: {
        color: '#173e07',
        fontWeight: 'bold',
        paddingHorizontal: 3,
        fontSize: 12
    }
});