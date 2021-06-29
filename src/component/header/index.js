import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils'

const Header = (props) => {
      // const { navigation } = props;
      return (
            <View style={styles.container}>
                  <View style={styles.boxHeader}>
                        <TouchableOpacity style={styles.iconBack}onPress={props.navigation} >
                              <FontAwesomeIcon icon={faChevronCircleLeft} size={25} color='#ffffff' />
                        </TouchableOpacity>
                        <Text style={styles.text} >{props.title}</Text>
                  </View>
            </View>
      )
}

export default Header

const styles = StyleSheet.create({
      container : {
            // flex : 1,
            // height : 100
      },
      boxHeader : {
            flexDirection : 'row',
            paddingVertical : 10,
            paddingHorizontal : 20,
            alignItems : 'center',
            backgroundColor : colors.default,
      },
      iconBack : {
            marginRight :10,
      },
      text : {
            fontSize : 20,
            color : '#ffffff'
      }

})
