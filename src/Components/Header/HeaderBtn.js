import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export const HeaderBtn = (props) => {
    return (
        <TouchableOpacity style={[styles.btn, props.btnStyle]} onPress={props.action}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 50,
        textAlign: 'center',
        margin: 20
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
})