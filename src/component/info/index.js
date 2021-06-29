import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconSpinner } from '../../assets'

const Info = ({navigation, route}) => {
    useEffect(() => {
        let isAmounted = false
        if(!isAmounted) { 
           setTimeout(() => {
               navigation.navigate(route.params.navigasi)
           }, 1000);
        }
        return () => {
              isAmounted = true;
        }
  }, [])
    return (
        <View style={styles.container}>
            <IconSpinner/>
            <Text style={styles.text}>
                {route.params.notif ? route.params.notif : 'Error'}
            </Text>
        </View>
    )
}

export default Info

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
