import { faCommentDots, faDollarSign, faMoneyCheckAlt, faUserAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Button, Footer, Header, Spinner } from '../../component'
import API from '../../service'
import { colors } from '../../utils'

const Item = (props) => {
    return (
       <TouchableOpacity onPress={props.navigation}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.boxItem}>
                <FontAwesomeIcon icon={props.icon} size={30} />
                <Text style={styles.desc}>{props.desc}</Text>
            </View>
            <View style={styles.hr} />
       </TouchableOpacity>
    )
}


const Menu = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const logout = () => {
        API.logout(TOKEN).then((result) => {
            setLoading(true)
            AsyncStorage.clear()
            setTimeout(function () {
                setLoading(false)
                navigation.navigate('Login')
            }, 2000); 
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
            alert('logout failed')
        })
    }

    if(loading){
        return (
              <Spinner/>
        )
    }
    return (
            <View style={styles.container}>
                  <View style={styles.wrapper}>
                        <Header
                              title = 'Menu'
                              navigation = {() => navigation.goBack()}
                        />
                        <View style={styles.body}>
                            <ScrollView>
                                <Item
                                    title = 'Your Messages'
                                    icon ={faCommentDots}
                                    desc = 'Your Messages'
                                    navigation = {() => navigation.navigate('ListChatting')}
                                />
                                <Item
                                    title = 'Register Downline'
                                    icon ={faUserAlt}
                                    desc = 'Pendafataran Downline'
                                    navigation = {() => navigation.navigate('RegisterDownline')}
                                />
                                <Item
                                    title = 'List Mitra'
                                    icon ={faUserFriends}
                                    desc = 'List Mitra'
                                    navigation = {() => navigation.navigate('ListMitra')}
                                />
                                <Item
                                    title = 'Withdraw'
                                    icon ={faDollarSign}
                                    desc = 'Penarikan Uang'
                                    navigation = {() => navigation.navigate('Withdraw')}
                                />
                                <Item
                                    title = 'Info Bank'
                                    icon ={faMoneyCheckAlt}
                                    desc = 'No Rek Bank BEST'
                                />
                            </ScrollView>
                        </View>
                        <Button
                            title = 'Logout'
                            width = '80%'
                            onPress= {logout}
                        />
                  </View>
                  <Footer
                    focus = 'Menu'
                    navigation = {navigation}
                  />
            </View>
      )
}

export default Menu

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#ffffff'
    },
    wrapper : {
        flex : 1
    },
    body : {
        paddingHorizontal : 20,
        paddingTop:20
    }, 
    hr : {
        borderBottomColor: colors.shadow,
        borderBottomWidth: 3,
        width:'100%',
        marginVertical : 20
    },
    boxItem : {
        flexDirection : 'row',
        alignItems :'center'
    },
    title : {
        fontSize : 20,
        fontWeight : 'bold',
        marginBottom:20
    },
    desc : {
        marginLeft : 10,
        fontSize : 15
    }
})
