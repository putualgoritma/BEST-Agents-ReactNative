import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '../../utils'

const Input = ({title,icon,color, ...rest}) => {
    return (
        <View style={{marginVertical:10}}>
            <View style={{flexDirection:'row', alignItems : 'center'}}>
                {icon ? <FontAwesomeIcon icon={icon} size={25} color={color ? color : '#000000'} style={{marginRight : 10}} /> : null}
                <Text>{title}</Text>
            </View>
            <TextInput
                style={styles.input}
                {...rest}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    input : {
        borderBottomWidth : 1,
        borderColor: colors.default
    }
})
