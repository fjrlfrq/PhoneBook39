import React, { useCallback, useState } from "react"
import UserForm from "./UserForm"
import UserList from "./UserList"
import { useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity } from "react-native"

export default function User(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        isAdd: false,
    })

    const handleAdd = useCallback((event) => {
        event.preventDefault()
        setUser({
            isAdd: true
        });
    }, [dispatch])

    const handleCancel = useCallback((event) => {
        event.preventDefault()
        setUser({
            isAdd: false
        })
    }, [dispatch])

    const cancelSearch = useCallback(() => {
        dispatch(resetSearch())
        setUser({ name: '', phone: '' })
    }, [dispatch])

    return (
        <View>
            <View>
                <View>
                    <View>
                        <TouchableOpacity onPress={cancelSearch}>
                            <Text>
                                PhoneBook
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    {user.isAdd ?
                        <View>
                            <View>
                                <Text>Adding Form</Text>
                            </View>

                            <View>
                                <UserForm
                                    cancel={handleCancel}
                                />
                            </View>
                        </View>
                        :
                        <View>
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
                    }

                    <View>
                        <View>
                            <Text style={{ color: '#2bb5ff' }}>Search Form</Text>
                        </View>
                        <View>
                            <UserForm
                                submitLabel="search"
                            />
                        </View>
                    </View>

                    <UserList />
                </View>
            </View>
        </View>
    )
} 