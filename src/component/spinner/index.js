import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconSpinner } from '../../assets'

const Spinner = (props) => {
    return (
        <View style={styles.container}>
            <IconSpinner/>
            <Text style={styles.text}>
                {props.info ? props.infp : 'Loading...'}
            </Text>
        </View>
    )
}

export default Spinner

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#ffffff',
        flexDirection :'column',
        justifyContent : 'center',
        alignItems : 'center',
    },
    text:{
        fontSize : 20
    }
})
