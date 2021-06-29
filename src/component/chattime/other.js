import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const isMe = ({text, date}) => {
    return (
        <View>
            <View style={{flexDirection:'row'}}>
                <View style={styles.dialogBox}>
                    <Text>
                        {text}
                    </Text>
                </View>
            </View>
            <Text style={{fontSize:10, marginBottom:10}}>{date}</Text>
        </View>
    )
}

export default isMe

const styles = StyleSheet.create({
    dialogBox : {
        backgroundColor  : 'red',
        maxWidth:'80%',
        padding:10,
        borderRadius : 15,
        marginBottom:5,
    }
})
