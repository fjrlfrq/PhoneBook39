import React, { useCallback, useState } from "react"
import { View, TextInput } from "react-native"

import { useDispatch } from 'react-redux'

import {
    create,
    resetSearch,
    searchUserAsync,
} from './UserSlice'

export default function UserForm(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: '',
        phone: ''
    })

    const handleSubmit = useCallback(() => {
        dispatch(create(user.name, user.phone))
        setUser({ name: '', phone: '' })
    }, [dispatch, user])

    const handleSearch = useCallback((event) => {
        event.preventDefault()
        dispatch(searchUserAsync({ name: user.name, phone: user.phone }))
    }, [dispatch, user])

    const cancelSearch = () => {
        dispatch(resetSearch())
        setUser({ name: '', phone: '' })
    }

    return (
        <View onSubmit={
            props.submitLabel
                ? handleSearch :
                handleSubmit}>
            <View>

                <TextInput
                    style={{ height: 40 }}
                    placeholder="Enter Your Name"
                    onChangeText={name => setUser({ ...user, name })}
                    defaultValue={user.name}
                />

                <TextInput
                    style={{ height: 40 }}
                    placeholder="Enter Your Number"
                    onChangeText={phone => setUser({ ...user, phone })}
                    defaultValue={user.phone}
                />

                <View>
                    
                    

                </View>
            </View>
        </View>

    )
}