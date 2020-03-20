import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HeaderTitle = (props) => {
    return (
        <View style={styles.view}>
            <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: 50,
        height: 50,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
    }
})
