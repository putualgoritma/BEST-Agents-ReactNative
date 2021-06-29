import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import CheckBox from "@react-native-community/checkbox"
import React, { useEffect, useState } from 'react'
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Config from "react-native-config"
import { useDispatch, useSelector } from "react-redux"
import { Product } from "../../assets"
import { Button, Footer, Header } from '../../component'
import { Rupiah } from "../../helper/Rupiah"
import { SET_DATA_CART } from "../../redux/action"
import { colors } from '../../utils'


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Item = (props) => {
    const [qty, setQty] =useState(props.qty);
    const [cart, setCart] = useState(props.cart)
    // const [total, setTotal]= useState(props.harga * props.qty)
    const dispatch = useDispatch();
    const [selected, setSelected] =useState(props.selected)
    useEffect(() => {
        let isAmounted = false
        if(!isAmounted) {
            cart.some(function (entry, i){
                if(entry.id === props.id){
                        cart[i].qty = qty;
                        // console.log(cart);
                }
                return 0;
            })
            dispatch(SET_DATA_CART(cart));
       }
        return () => {
              isAmounted = true
        }
  }, [qty])

    const handleQty = (type) => {
        if(type === 'MIN'){
              if(qty > 0){
                    setQty(qty - 1);
                }
        }else if( type === 'PLUSH'){
              setQty(qty + 1)
        }
    }

    useEffect(() => {
        let isAmounted = false
        if(!isAmounted){
            cart.some(function (entry, i){
                if(entry.id === props.id){
                    cart[i].selected = selected;
                }
                return 0; 
            })
        }
        return () => {
           isAmounted= true
        }
    }, [selected])

    const cartDelete = () => {
        for (var i = 0; i < cart.length; i++) {
              if (cart[i].id === props.id) {
                    cart.splice(i, 1);
              }
        }
        dispatch(SET_DATA_CART(cart));

    }

    return (
        <View>
            <View style={{flexDirection:'row', alignItems:'center'}} >
                <CheckBox value={props.selectedAll ? props.selectedAll : selected} onValueChange={setSelected} />
                <Image source={!props.img ? Product : {uri : Config.REACT_APP_BASE_URL  + String(props.img).replace('public/', '')}} style={{height:70, width:70, marginRight :5}}/>
                <View >
                    <Text>{props.title}</Text>
                    <Text>{Rupiah(props.price * qty)}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop : 10}}>
                <TouchableOpacity onPress={() => {cartDelete(); props.delete()}}><FontAwesomeIcon icon={faTrash} size={20} color='red' /></TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor:'orange'}]} onPress={() => {handleQty('MIN'); setTimeout(function(){ props.onPress() }, 1000)}}><Text style={styles.textButton}>-</Text></TouchableOpacity>
                <Text style={styles.textQuantity}>{qty}</Text>
                <TouchableOpacity style={[styles.button, {backgroundColor:'green'}]} onPress={() => {handleQty('PLUSH'); setTimeout(function(){ props.onPress() }, 1000);}}><Text style={styles.textButton}>+</Text></TouchableOpacity>
            </View>
            <View style={styles.hr}/>
        </View>
    )
}


const Cart = ({navigation}) => {
    const CART = useSelector((state) => state.CartReducer);
    const [total, setTotal] = useState(CART.reduce((accum, item) => accum +( item.qty * item.harga), 0))
    const [cart, setCart] = useState(CART)
    const [selected, setSelected] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(100).then(() => setRefreshing(false));
    }, []);
    const [form, setForm] = useState({
        amount : null,
        type : null
    })

    const handleTotal = () => {
        let totalHarga = cart.reduce((accum, item) => accum +( item.qty * item.harga), 0)
        setTotal(totalHarga)
        console.log(totalHarga);
    }
    useEffect(() => {
        let isAmounted = false
        if(!isAmounted){
            cart.map((item, index) => {
                cart[index].selected = selected;
                return 0;
            })
        }
        return () => {
            isAmounted= true
        }
    }, [selected])

    const deleteSelected = async () => {
        if(selected){
            let i = 0;
            while (i < cart.length) {
                if (cart[i].selected === true) {
                    cart.splice(i, 1);
                } else {
                    ++i;
                }
            }
            dispatch(SET_DATA_CART(cart))
            onRefresh();
        }else{
            alert('Mohon centag Pilih semua')
        }
    }

    return (
            <View style={styles.container}>
                  <View style={styles.wrapper}>
                        <Header
                              title = 'Cart'
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
                                <Text style={styles.title}>Keranjang Belanja</Text>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                    <View style={{flexDirection:'row', alignItems : 'center'}}>
                                        <CheckBox
                                            value={selected}
                                            onValueChange ={ setSelected}
                                        />
                                        <Text>Pilih semua</Text>
                                    </View>
                                    <TouchableOpacity onPress={deleteSelected}><Text>Hapus</Text></TouchableOpacity>
                                </View>
                                <View style={styles.hr} />
                                <View>
                                   {cart &&  cart.map((item,index)=> {
                                       return (
                                            <View key = {index} >
                                                  <Item
                                                    id = {item.id}
                                                    title = {item.namaProduct}
                                                    price = {parseInt(item.harga)}
                                                    qty = {item.qty}
                                                    cart = {cart}
                                                    onPress={handleTotal}
                                                    selected = {item.selected}
                                                    selectedAll = {selected}
                                                    img = {item.img}
                                                    delete = {() => {onRefresh(); handleTotal()}}
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
                        title = 'Bayar'
                        width = {150}
                        onPress= {() => cart.length <=0 ? alert('keranjang kosong') : navigation.navigate('Checkout')}
                     />
                </View>
                <Footer
                    focus = 'Cart'
                    navigation = {navigation}
                />
            </View>
      )
}

export default Cart

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
