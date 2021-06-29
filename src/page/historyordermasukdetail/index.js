import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
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
                        <Text>{props.item.name}</Text>
                        <View >
                            <Text style={{width : '50%'}}>Customer {props.customer}</Text>
                            <Text>Price {Rupiah(parseInt(props.item.price))} </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.hr} />
       </View>
    )
}

const HistoryOrderMasukDetail = ({navigation, route}) => {
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState('#000000')
    
    useEffect(() => {
        let isAmounted = false
        if(!isAmounted){
            console.log(route.params.item);

        }
        return () => {
            isAmounted = true
        }
    }, [])

    const handleBatal = () => {
        setLoading(true)
        API.orderCancel(route.params.item.id, TOKEN).then((result) => {
            console.log(result);
            navigation.navigate('Info', {notif : 'Pesanan telah dibatalkan', navigasi : 'Home'})
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            alert('pesanan gagal di batalkan')
            setLoading(false)
        })
    }

    const handleOrderProcess = () => {
        setLoading(true)
        API.orderProcess(route.params.item.id, TOKEN).then((result) => {
            console.log(result);
            navigation.navigate('Info', {notif : 'Pesanan telah Prosess', navigasi : 'Home'})
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            alert('gagal memproses pesanan')
            setLoading(false)
        })
    }

    const handleOrderSend = () => {
        setLoading(true)
        API.orderSend(route.params.item.id, TOKEN).then((result) => {
            console.log(result);
            navigation.navigate('Info', {notif : 'Mohon segera kirim pesanan anda', navigasi : 'Home'})
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            alert('gagal memproses pesanan')
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
                        {/* <Text style={{textAlign:'right', color : 'red'}}>status</Text> */}
                        {route.params.item && route.params.item.products.map((item,index) => {
                            return (
                                <Item
                                    key = {index}
                                    no = {index}
                                    item = {item}
                                    customer = {route.params.item.customers.name}
                                />
                            )
                        })}
                    </View>

                    {(route.params.item.status === 'closed' || (route.params.item.status ==='approved' && route.params.item.status_delivery ==='received') || (route.params.item.status==='approved' && route.params.item.status_delivery ==='delivered')) && 
                        <Button
                            title = 'Kembali'
                            width = '80%'
                            onPress= {() => navigation.goBack()}
                            color = {colors.default}
                        />
                    }
                    {(route.params.item.status === 'approved' && route.params.item.status_delivery === 'process') && 
                        <Button
                            title = 'Kirim'
                            width = '80%'
                            onPress= {() => handleOrderSend()}
                            color = {colors.default}
                        />
                    }
                    {(route.params.item.status === 'pending') && 
                        <View style={{flex : 1, flexDirection:'row', justifyContent : 'center', padding : 20}}>
                            <Button
                                title = 'Batal'
                                width = {Dimensions.get('window').width -230}
                                onPress= {() => handleBatal()}
                                color = 'red'
                            />
                            <Button
                                title = 'Proses'
                                width = {Dimensions.get('window').width -230}
                                onPress= {() => handleOrderProcess()}
                                color = {colors.default}
                            />
                        </View>
                    }
                </ScrollView>
        </View>
    </View>
    )
}

export default  HistoryOrderMasukDetail

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
