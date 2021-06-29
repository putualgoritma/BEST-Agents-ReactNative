import React, { useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Header, Spinner } from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'

const Item =(props) => {
    const [color, setColor] = useState('#ffffff')
    useEffect( () => {
          let isAmounted = false
          if(!isAmounted) { 
                if(props.item.status === 'closed'){
                      setColor('#c8c5c5')
                }else if (props.item.status === 'pending'){
                      setColor('#FFCCCB')
                }else if(props.item.status === 'approved' && props.item.status_delivery ==='process'){
                      setColor('#FFFFCD')
                }else if (props.item.status === 'approved' && props.item.status_delivery ==='delivered'){
                      setColor('#CDFFCC')
                }else if (props.item.status === 'approved' && props.item.status_delivery === 'received'){
                      setColor('#00FFFF')
                }
          }
          return () => {
                Source.cancel('cancel api')
                isAmounted = true;
          }
    }, [])
    return (
       <TouchableOpacity onPress={() => props.navigation.navigate('HistoryOrderDetail', {item : props.item})}>
            <View style={[styles.boxItem, {backgroundColor:color}]}>
                <Text>{props.item.register}</Text>
                <Text style={{fontWeight:'bold'}}>{props.item.memo}</Text>
                <View style={{flexDirection : 'row', justifyContent:'space-between'}}>
                    <Text style={{color : 'black'}}>{props.item.customers.name}</Text>
                    <Text style={{color : 'black'}}>{Rupiah(parseInt(props.item.total))}</Text>
                </View>
            </View>
            <View style={styles.hr} />
       </TouchableOpacity>
    )
}

const HistoryOrder = ({navigation}) => {
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true)
    const [orderHistory, setOrderHistory] = useState(null)


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Promise.all([API.historyordermasuk(USER.id, TOKEN)]) 
        .then((result) => { 
            console.log('order', result);
            setOrderHistory(result[0].data)
            setRefreshing(false)
        }).catch((e) => {
            console.log(e);
            setRefreshing(false)
        })
    }, []);

    useEffect( () => {
        let isAmounted = false
        if(!isAmounted) { 
            Promise.all([API.historyorder(USER.id, TOKEN)]) 
            .then((result) => { 
                console.log('order history ', result);
                setOrderHistory(result[0].data)
                setLoading(false) 
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
       }
        return () => {
              Source.cancel('cancel api')
              isAmounted = true;
        }
    }, [])

    
    if(loading){
        return (
              <Spinner/>
        )
    }

    return (
        <View style={styles.container}>
        <View style={styles.wrapper}>
                <Header
                    title = 'History Order'
                    navigation = {() => navigation.goBack()}
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.body}>
                        {orderHistory && orderHistory.map((item, index) => {
                            return (
                                <Item
                                    key = {item.id}
                                    item = {item}
                                    navigation = {navigation}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
        </View>
    </View>
    )
}

export default HistoryOrder

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
        marginVertical : 10
    },
    boxItem : {
        padding : 10
    }
})
