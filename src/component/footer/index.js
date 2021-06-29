import { faAlignJustify, faCartPlus, faHome, faQrcode, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../../utils'

const Footer = (props) => {
      const CART = useSelector((state) => state.CartReducer);
      return (
            <View style={styles.container}>
                  <View style={styles.wrapper}>
                        <View style={styles.box}>
                              <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                                    <FontAwesomeIcon icon={ faHome } size={ 30 } color={ props.focus === 'Home' ? colors.active : colors.default } />
                              </TouchableOpacity>
                        </View>
                        <View style={styles.box}>
                              <TouchableOpacity onPress={() => props.navigation.navigate('Menu')}>
                                    <FontAwesomeIcon icon={ faAlignJustify } size={ 30 } color={ colors.default }  color={ props.focus === 'Menu' ? colors.active : colors.default } />
                              </TouchableOpacity>
                        </View>
                        <View style={[styles.box, styles.scan]}>
                              <TouchableOpacity onPress={() => props.navigation.navigate('Scan')}>
                                    <FontAwesomeIcon icon={ faQrcode } size={ 50} color={ colors.default }  color={ props.focus === 'Scan' ? colors.active : colors.default } />
                              </TouchableOpacity>
                        </View>
                        <View style={styles.box}>
                              <TouchableOpacity  onPress={() => props.navigation.navigate('Cart')}>
                                    <View style={styles.cart}>
                                          <FontAwesomeIcon icon={ faCartPlus } size={ 30 } color={ colors.default }  color={ props.focus === 'Cart' ? colors.active : colors.default }  />
                                          <View style={styles.boxTextCart}>
                                                <Text style={styles.textCart}>{CART.length}</Text>
                                          </View>
                                    </View>
                                    {/* <Text>Keranjang</Text> */}
                              </TouchableOpacity>
                        </View>
                        <View style={styles.box}>
                              <TouchableOpacity  onPress={() => props.navigation.navigate('Profile')}>
                                    <FontAwesomeIcon icon={ faUserAlt } size={ 30 } color={ colors.default }  color={ props.focus === 'Profile' ? colors.active : colors.default }  />
                              </TouchableOpacity>
                        </View>
                  </View>
            </View>
      )
}

export default Footer

const styles = StyleSheet.create({
      container : {
            backgroundColor:'#ffffff',
      },
      wrapper : {
            height:55,
            flexDirection:'row',
      },
      box : {
            alignItems:"center",
            justifyContent:"center",
            flex:1,
            // backgroundColor:'red',
      },
      scan : {
            
      },
      icon : {
            height : 25,
            width:27
      },
      boxTextCart : {
            position:'absolute',
            right : -10,
            top:-5,    
            backgroundColor:'#FF5C63',
            borderRadius : 100,
            height : 20,
            width : 20,
            padding :1,
            alignItems : 'center',
            justifyContent :'center'
      },
      textCart: {
            fontSize : 12,
            color :'#ffffff'
      }
})
