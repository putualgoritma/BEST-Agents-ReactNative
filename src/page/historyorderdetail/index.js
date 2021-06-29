import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Config from 'react-native-config'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Product } from '../../assets'
import { Button, Header, Spinner } from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../service'
import { colors } from '../../utils'

const Item =(props) => {
    return (
       <View>
            <View style={styles.boxItem}>
                <Text>Pesanan {props.no + 1}</Text>
                <View style={{flexDirection : 'row'}}>
                    <Image source = {!props.item.img ? Product : {uri : Config.REACT_APP_BASE_URL  + String(props.item.img).replace('public/', '')}} style={{height : 100, width:100}} />
                    <View style={{justifyContent : 'space-between', marginLeft : 10}}>
                        <Text style={{maxWidth : '80%'}} >{props.item.name}</Text>
                        <View >
                            <Text>Price {Rupiah(parseInt(props.item.price))} </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.hr} />
       </View>
    )
}

const HistoryOrderDetail = ({navigation, route}) => {
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    
    const handleBatal = () => {
        setLoading(true)
        API.historyordercancel(route.params.item.id, TOKEN).then((result) => {
              // console.log(result);
            navigation.navigate('Info', {notif : 'Pesanan dibatalkan', navigasi : 'Home'})
        }).catch((e) => {
              console.log(e.request);
              alert('pesanan gagal di batalkan')
              setLoading(false)
        })
    }

    const handleTerima = () => {
        setLoading(true)
        API.historyorderupdate(route.params.item.id, TOKEN).then((result) => {
              // console.log(result);
            navigation.navigate('Info', {notif : 'Pesanan Diterima', navigasi : 'Home'})
        }).catch((e) => {
            console.log(e.request);
            alert('pesanan gagal di konfirmasi, coba ulang!')
            setLoading(false)
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
                    title = 'History Order Detail'
                    navigation = {() => navigation.goBack()}
                />
                <ScrollView>
                    <View style={styles.body}>
                        {route.params.item && route.params.item.products.map((item,index) => {
                            return (
                                <Item
                                    key ={index}
                                    no = {index}
                                    item = {item}
                                    agent = {route.params.item.agents}
                                />
                            )
                        })}
                    </View>

                    {route.params.item.status === 'pending' && 
                        <Button
                            title = 'Batalkan Pesanan'
                            width = '80%'
                            onPress= {() => handleBatal()}
                            color = 'red'
                        />
                    }
                    {((route.params.item.status_delivery ==='process' && route.params.item.status ==='approved') || (route.params.item.status_delivery ==='received' && route.params.item.status ==='approved') || route.params.item.status === 'closed') && 
                        <Button
                            title = 'Kembali'
                            width = '80%'
                            onPress= {() => handleTerima()}
                            color = {colors.default}
                        />
                    }

                    {(route.params.item.status === 'approved' && route.params.item.status_delivery === 'delivered') && 
                        <Button
                            title = 'Terima'
                            width = '80%'
                            // onPress= {() => navigation.navigate('Register')}
                            color = {colors.default}
                        />
                    }
                  
                </ScrollView>
        </View>
    </View>
    )
}

export default  HistoryOrderDetail

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
})
