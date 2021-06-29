import React, { useEffect, useState } from 'react'
import { Alert, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import Config from "react-native-config"
import { useDispatch, useSelector } from "react-redux"
import { Product } from "../../assets"
import { Button, Footer, Header, Spinner } from '../../component'
import { Rupiah } from "../../helper/Rupiah"
import { SET_DATA_CART } from "../../redux/action"
import API from '../../service'
import { colors } from '../../utils'


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Item = (props) => {
    return (
        <View>
            <Text style={{fontSize : 15, marginRight : 10, fontWeight :'bold'}} >Pesanan {props.no + 1}</Text>
            <View style={{flexDirection:'row', alignItems:'center'}} >
                <Image source={!props.img ? Product : {uri : Config.REACT_APP_BASE_URL  + String(props.img).replace('public/', '')}} style={{height:70, width:70, marginRight :5}}/>
                <View >
                    <Text style={{width : '80%'}}>{props.title}</Text>
                    <Text>{Rupiah(props.price)}</Text>
                </View>
            </View>
            <View style={{marginTop :5, justifyContent : 'space-between', flexDirection:'row'}}>
                <Text style={{fontSize : 15,fontWeight :'bold'}}>Sub Total</Text>
                <Text style={{fontSize : 15,fontWeight :'bold'}}>{Rupiah(props.price * props.qty)}</Text>
            </View>
            <View style={styles.hr}/>
        </View>
    )
}


const Checkout = ({navigation}) => {
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const CART = useSelector((state) => state.CartReducer);
    const total = (CART.reduce((accum, item) => accum +( item.qty * item.harga), 0))
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [point, setPoint] = useState(0)
    const dispatch = useDispatch();
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(100).then(() => setRefreshing(false));
    }, []);
    const dateRegister = () => {
        var todayTime = new Date();
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        return year + "-" + month + "-" + day;
  }
   const [orders, setOrders] = useState({
         register: dateRegister(),
         customers_id: USER.id,
         memo: "Checkout User" + USER.name,
         agents_id : null,
         cart: null,
    });

    useEffect(() => {
        let isAmounted = false 
        if(!isAmounted){
            let cart = []
            CART.map((item, index) => {
                cart[index] = {
                    products_id : item.id,
                    price : item.harga,
                    quantity : item.qty,
                } 
                return 0;
            })
            setOrders({...orders, cart : cart})
            Promise.all([API.point(USER.id, TOKEN)])
            .then((result) => {
                setPoint(result[0].data[0].balance_points)
                console.log(result);
                setLoading(false)
                console.log(cart);
            }).catch((e) => {
                console.log(e.request._response);
                setLoading(false)
            })
        }
        return () => {  
            isAmounted = true
        }
    }, [])


    const handleCheckout = () => {
        if(USER.status !== 'active'){
              alert('mohon lakukan activasi dahulu')
        }else{
                if(point >= total){
                    if(orders.register !== null && orders.customers_id !== null && orders.cart){
                            setLoading(true)
                            API.orderAgent(orders, TOKEN).then((result) => {
                                console.log(result)
                                dispatch(SET_DATA_CART([]))
                                navigation.navigate('Info', {notif :'Belanja Berhasil', navigasi : 'Home'})
                                setLoading(false)
                            }).catch((e) => {
                                    console.log(e.request)
                                    setLoading(false)
                            })
                        }else{
                            alert('data order tidak lengkap ')
                        }
                }else{
                        alert(point)
                }
            }
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
                              title = 'Complate Order'
                              navigation = {() => navigation.goBack()}
                        />
                        <ScrollView   
                            refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />}
                        >
                            <View style={styles.body}>
                                <Text style={styles.title}>Complate Order</Text>
                                <View style={styles.hr} />
                                <View>
                                   {CART &&  CART.map((item,index)=> {
                                       return (
                                            <View key = {index} >
                                                  <Item
                                                    no ={index}
                                                    id = {item.id}
                                                    title = {item.namaProduct}
                                                    price = {parseInt(item.harga)}
                                                    qty = {item.qty}
                                                    img = {item.img}
                                                />
                                            </View>
                                       )
                                   })}
                                </View>
                            </View>
                        </ScrollView>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, alignItems : 'center'}}>
                    <Text style={{fontSize : 15, fontWeight :'bold'}}>{Rupiah(total)}</Text>
                    <Button
                        title = 'Chekout'
                        width = {150}
                        onPress= {() => CART.length <=0 ? alert('keranjang kosong') :
                            Alert.alert(
                                'Peringatan',
                                `Checkout sekarang ? `,
                                [
                                    {
                                        text : 'Tidak',
                                        onPress : () => console.log('tidak')
                                    },
                                    {
                                        text : 'Ya',
                                        onPress : () => handleCheckout()
                                    }
                                ]
                            )
                        }
                     />
                </View>
                <Footer
                focus = 'Cart'
                navigation = {navigation}
                />
            </View>
      )
}

export default Checkout

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
    },  
    button : {
        // backgroundColor:'red',
        width : 30,
        height : 30,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 100
    },
    textButton : {
        color :'#ffffff',
        fontSize :20
    },
    textQuantity :{
        fontSize : 18,
        borderBottomWidth : 1,
        borderColor : colors.shadow
    }
})
