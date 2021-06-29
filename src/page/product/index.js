import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Config from 'react-native-config'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '../../assets'
import { Button, Header, Spinner } from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import { SET_DATA_CART } from '../../redux/action'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'

const Peoduct = ({navigation, route}) => {
      const [loading, setLoading] = useState(true)
      const [product, setProduct] = useState(null)
      const dispatch = useDispatch();
      const CART = useSelector((state) => state.CartReducer);
      const USER = useSelector((state) => state.UserReducer);
      var cartData = []
      useEffect(() => {
            let isAmounted = false
            if(!isAmounted) {
                  Promise.all([API.productDetail(route.params.id)])
                  .then(response => {
                        // console.log(response)
                        setProduct(response[0].data)
                        setLoading(false)
                  }).catch((e) => {
                        setLoading(false)
                  })
           }
            return () => {
                  Source.cancel('cancel axios')
                  isAmounted = true
            }
      }, [])

      const handleCart = () => {
            if(USER.status ==='active'){
                  let penanda = false; 
                  let message = '';
                  if(CART ){
                        cartData = CART
                        CART.some(function (entry, i) {
                              if (entry.id == product.id) {
                                    penanda = true;
                                    return true;
                              }
                        });
                  }
                  let data ={
                        id: product.id,
                        // id_user: USER.id,
                        namaProduct: product.name,
                        harga: product.price,
                        selected: false,
                        qty: 1,
                        img : product.img,
                        note: '',
                        status: 'pending',
                  }
                  if (!penanda) {
                        cartData.push(data)
                        dispatch(SET_DATA_CART(cartData));
                        navigation.navigate('Info', {notif : 'ditambahkan kekeranjang', navigasi : 'Home'});
                      } else {
                        alert('item sudah ada di dalam keranjang');
                  }

            }else{
                  alert('Mohon activasi dahulu')
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
                              title = 'Product'
                              navigation = {() => navigation.goBack()}
                        />
                        <ScrollView>
                              <View style={styles.body}>
                                    <Image source={!product.img ? Product : {uri : Config.REACT_APP_BASE_URL  + String(product.img).replace('public/', '')}} style={styles.image} />
                                    <Text style={styles.textRp}>{Rupiah(parseInt(product.price))}</Text>
                                    <Text style={styles.textDesc}>{product.name}</Text>
                                    <View style={styles.hr} />  
                                    <Text style={styles.textInfo} >Informasi Produk</Text>
                                    <View style={styles.boxInfo}>
                                          <Text>Kondisi</Text>
                                          <Text>Baru</Text>
                                    </View>
                                    <View style={styles.boxInfo}>
                                          <Text>Pemesanan min</Text>
                                          <Text>1 Buah</Text>
                                    </View>
                                    <View style={styles.boxInfo}>
                                          <Text>Date</Text>
                                          <Text>{product.updated_at}</Text>
                                    </View>
                                    <View style={styles.hr} />  
                                    <Text style={styles.textInfo} >Deskripsi</Text>
                                    <Text>{product.description}</Text>
                              </View>
                        </ScrollView>
                  </View>
                  <View style={{marginBottom:10}}>
                        <Button
                              title = 'Tambah Keranjang'
                              width = '80%'
                              onPress = {handleCart}
                        />
                  </View>
            </View>
      )
}

export default Peoduct

const styles = StyleSheet.create({
      container : {
            flex : 1,
            backgroundColor : '#ffffff',
      },
      wrapper : {
            flex : 1
      },
      body : {
            paddingHorizontal : 20,
            marginTop : 20
      },    
      image : {
            height : 300,
            width : '100%',
            resizeMode : 'stretch'
      }, 
      textRp : {
            fontSize : 20,
            fontWeight : 'bold',
            marginVertical : 4
      },
      textDesc : {
            fontSize : 20,
            width : '100%'
      },
      hr : {
            borderBottomColor: colors.shadow,
            borderBottomWidth: 3,
            width:'100%',
            marginVertical : 10
      },
      textInfo : {
            fontSize : 20,
            marginVertical : 5,
            fontWeight : 'bold'
      },
      boxInfo : {
            flexDirection:'row',
            justifyContent:'space-between',
            marginVertical : 3
      },
})
