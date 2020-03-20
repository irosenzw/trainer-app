import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import Title from './Title';
import { HeaderTitle } from './HeaderTitle';
import { HeaderBtn } from './HeaderBtn';

const Header = (props) => {
    return(
        <View style={styles.view}>
            <HeaderBtn text='back' action={props.backNav}/>
            <HeaderTitle title={props.title} />
            <HeaderBtn text='btn2'/>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30
    },
    text: {
        color: 'white',
        padding: 10,
        borderColor: 'yellow',
        borderWidth: 3
    }
})

export default Header;