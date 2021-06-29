import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import {Header, Spinner} from '../../component'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'

const wait = (timeout) => {
    return new Promise(resolve => {
          setTimeout(resolve, timeout);
    });
}
const Item = (props) => {
    return (
       <TouchableOpacity onPress={props.onPress}>
           <View style={styles.boxMessage} >
               <View>
                    <FontAwesomeIcon icon={faEnvelope} size={30} color='grey' />
                    {props.item.status === 'unread' ? <View style={styles.active} /> : null}
               </View>
                <View style={styles.messageText}>
                    <Text>{props.item.register}</Text>
                    <Text>{props.item.memo}</Text>
                </View>
           </View>
           <View style={styles.hr} />
       </TouchableOpacity>
    )
}


const LogNotif = ({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true)
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [notif, setNotif] = useState(null)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // history()
        // alert('refresh')
            Promise.all([API.logNotif({'customers_id' : USER.id}, TOKEN)])
            .then((result) => {
                    console.log('notif',result);
                    setNotif(result[0].data)
                    setLoading(false)
                    // wait(100).then(() => setRefreshing(false));
                    setRefreshing(false)
            }).catch((e) => {
                    console.log('error', e.request);
                    setLoading(false)
            })
    }, []);

    useEffect(() => {
        let isAmounted = false
        if(!isAmounted) { 
                // console.log('focues', isFocused);
                Promise.all([API.logNotif({'customers_id' : USER.id}, TOKEN)])
                .then((result) => {
                        console.log('notif',result);
                        setNotif(result[0].data)
                        setLoading(false)
                }).catch((e) => {
                        console.log('error', e.request);
                        setLoading(false)
                })
            }
            return () => {
                Source.cancel('home cancel axios')
                isAmounted = true;
            }
    }, [])

    const handleRead = (id) => {
        API.logupdate(id, TOKEN).then((result) => {
            console.log(result);
            onRefresh();
            console.log('handleRead');
        }).catch((e) => {
            console.log(e);
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
                            title = 'Notif'
                            navigation = {() => navigation.goBack()}
                        />
                        <ScrollView
                             refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View style={styles.body}>
                              {notif && notif.map((item, index) => {
                                return (
                                    <Item
                                        key = {index}
                                        item = {item}
                                        onPress = {() => {
                                            Alert.alert(
                                                  'Message',
                                                  item.memo,
                                                  [
                                                        {
                                                          text: "Oke",
                                                          onPress:() => handleRead(item.id),
                                                        //   style: "cancel"
                                                        },
                                                  ],
                                            );
                                        }}
                                    />
                                )
                              })}
                            </View>
                        </ScrollView>
                </View>
            </View>
      )
}

export default LogNotif

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
    boxMessage : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    messageText : {
        marginLeft : 20
    },
    active : {
        height : 10,
        width : 10,
        backgroundColor : 'red',
        position : 'absolute',
        top : 0,
        right : -3,
        borderRadius : 100
    }
})
