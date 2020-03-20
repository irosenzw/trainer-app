import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const HomeScreenBtn = ({text, action}) => {
    return (
        <TouchableOpacity style={styles.btnStyle} onPress={action} >
            <Text style={styles.txt}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: '#d6a51e',
        width: 150,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        paddingBottom: 4,
        // flex: 1
    },
    txt: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default HomeScreenBtn;