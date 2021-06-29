import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils'

const Button = (props) => {
      return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.bntKeranjang, {width : props.width, backgroundColor : (props.color ? props.color : colors.default)}]} onPress={props.onPress}>
                    <Text style={styles.text}>{props.title}</Text>
                </TouchableOpacity>
            </View>
      )
}

export default Button

const styles = StyleSheet.create({
      container : {
            // flex : 1,
            // height : 100
            alignItems:'center',
            justifyContent : 'center',
      },
      
      boxButton : {
        flex : 1,
        flexDirection : "row",
        // backgroundColor:'red',
        height :30,
        padding : 30,
    },
    bntKeranjang : {
        alignItems : 'center',
        justifyContent : 'center',
        // backgroundColor:colors.button,
        // padding : 10,
        borderRadius : 5,
        height:45,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderColor: colors.shadow,
        borderWidth: 1,
        elevation: 5,
    },
    text : {
        color :'#ffffff',
        fontSize : 18,
        fontWeight : 'bold'
    }

})
