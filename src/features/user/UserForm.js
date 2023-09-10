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
                    <button type="submit" className="btn btn-success"
                        style={{ backgroundColor: '#1159a6', borderWidth: 0 }}>
                        {props.submitLabel !== "search" &&
                            
                        }
                        {props.submitLabel === "search" &&
                            
                        }
                        &nbsp;
                        {props.submitLabel || "Save"
                        }
                    </button>
                    &nbsp;
                    {props.submitLabel !== "search" &&
                        <button type="submit"
                            onClick={props.cancel}
                            className="btn btn-warning"
                            style={{ backgroundColor: 'a-so#f2af05', borderWidth: 0, color: 'white' }}>
                            <i className="bi bi-arrow-left"></i>
                            &nbsp;
                            Back</button>
                    }
                    {props.submitLabel === "search" &&
                        <button type="submit"
                            onClick={cancelSearch}
                            className="btn btn-warning"
                            style={{ backgroundColor: '#f2af05', borderWidth: 0, color: 'white' }}>
                            <i className="bi bi-arrow-clockwise"></i>
                            &nbsp;
                            Reset</button>
                    }

                </View>
            </View>
        </View>

    )
}