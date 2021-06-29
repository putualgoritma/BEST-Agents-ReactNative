import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const isMe = ({text, date}) => {
    return (
        <View>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <View style={styles.dialogBox}>
                    <Text>
                        {text}
                    </Text>
                </View>
            </View>
            <Text style={{fontSize:10, textAlign:'right', marginBottom:10}}>{date}</Text>
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
