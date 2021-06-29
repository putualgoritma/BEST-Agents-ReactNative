import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Config from 'react-native-config'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Product } from '../../assets'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'
import Header from '../header'
import Spinner from '../spinner'
// import Config from 'react-native-config';


const ItemMarket = (props) => {
      return (
            <View style={styles.itemMarket}>
                  <TouchableOpacity style={{justifyContent : 'center', alignItems : 'center'}} onPress={props.navigation}>
                        <Text style={styles.textTitleProduct}>{props.title}</Text>
                        <Image source = {!props.img ? Product : {uri : Config.REACT_APP_BASE_URL  + String(props.img).replace('public/', '')}} style={{height : 100, width:100}} />
                        <View style={styles.iconStar}>
                              <FontAwesomeIcon icon={faStar} size={12} style={{marginHorizontal : 1}} />
                              <FontAwesomeIcon icon={faStar} size={12} style={{marginHorizontal : 1}} />
                              <FontAwesomeIcon icon={faStar} size={12} style={{marginHorizontal : 1}} />
                              <FontAwesomeIcon icon={faStar} size={12} style={{marginHorizontal : 1}} />
                              <FontAwesomeIcon icon={faStar} size={12} style={{marginHorizontal : 1}} />
                        </View>
                        <Text style={styles.textHarga}>{props.price}</Text>
                        <View style={styles.boxCart}>
                              <View style={styles.iconCart} >
                                    <FontAwesomeIcon icon={faShoppingCart} color = '#ffffff' />
                              </View>
                              <Text>Add to Cart</Text>
                        </View>
                  </TouchableOpacity>
            </View>
      )
}

const ActivasiDownline = ({navigation,route}) => {
      const [products, setProducts] = useState(null)
      const [loading, setLoading] = useState(true)
      const [point, setPoint] = useState(0)
      const TOKEN = useSelector((state) => state.TokenReducer);
      const USER = useSelector((state) => state.UserReducer);
    //   const [form, setForm] = useState({
    //     register : route.params.dataMember.register,
    //     password : route.params.dataMember.password,
    //     name : route.params.dataMember.name,
    //     phone : route.params.dataMember.phone,
    //     email : route.params.dataMember.email,
    //     address : route.params.dataMember.address,
    //     ref_id : route.params.dataMember.ref_id,
    // })
      useEffect(() => {
            let isAmounted = false
            if(!isAmounted) { 
                  // console.log( `${Config.REACT_APP_BASE_URL} ${props.img}`);
                  Promise.all([API.paketMembers(TOKEN), API.point(USER.id, TOKEN)])
                  .then((result) => {
                    //   console.log(result[1].data[0].balance_points);
                        setProducts(result[0].data)
                        setPoint(result[1].data[0].balance_points)
                        setLoading(false)
                  }).catch((e) => {
                        console.log(e.request._response);
                        setLoading(false)
                  })
           }
            return () => {
                  Source.cancel('home cancel axios')
                  isAmounted = true;
                  console.log('cancel home');
            }
      }, [])

      if(loading){
            return (
                  <Spinner/>
            )
      }
      return (
            <SafeAreaView style={styles.container}>
                    <Header
                              title = 'Activasi Downline'
                              navigation = {() => navigation.goBack()}
                        />
                  <ScrollView>
                        <View style={styles.wrapperBbanner}>
                            <View style={styles.menuMarket}>
                                <Text style={[styles.produkDigital,{backgroundColor :'#FF5C63'}]}>Market Place</Text>
                                <View style={styles.boxMarket}>
                                    <View style={styles.boxItemMarket}>
                                        {products && products.map((item, index)=> {
                                            return (
                                                <ItemMarket 
                                                    key ={item.id}
                                                    title = {item.name}
                                                    price = {Rupiah(parseInt(item.price))}
                                                    img = {item.img}
                                                    navigation = {() => point >= parseInt(item.price) ? navigation.navigate('Agen', {dataMember : route.params.dataMember, idPackage : item.id}) : alert('poin anda kurang')}
                                                />
                                            )
                                        })}
                                    </View>
                                </View>
                            </View>    
                        </View>
                  </ScrollView>
            </SafeAreaView>
      )
}

export default ActivasiDownline

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor:'#ffffff',
    },
    wrapperBbanner : {
        // height:300,
        marginVertical:10,
        // backgroundColor:'red'
    },
    hr : {
        borderBottomColor: colors.shadow,
        borderBottomWidth: 3,
        width:'100%',
        marginVertical : 10
    },
    produkDigital : {
        backgroundColor : '#5BC0E2',
        fontSize : 20,
        fontWeight : 'bold',
        color : '#ffffff',
        borderRadius : 5,
        padding : 10,
        marginHorizontal :20
    },
    itemBody : {
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center',
        alignItems : 'center',
        paddingVertical : 10,
    } ,
    itemIconBody : {
        marginHorizontal:20,
        // padding : 10,
        // backgroundColor :'red'
    }, 
    menuMarket : {
        flex : 1
    },
    boxMarket : {
        paddingVertical : 3,
        flex : 1,
        paddingHorizontal:20
    },
    boxItemMarket : {
        flexDirection : 'row',
        flexWrap : 'wrap',
        alignItems : 'center',
        paddingVertical : 10,
        justifyContent : 'space-between'
    } ,
    itemMarket : {
        // justifyContent : 'center',
        alignItems : 'center',
        margin: 5,
        paddingHorizontal : 10,
        backgroundColor :'#FAFCFB',
        paddingVertical : 15,
        width : '45%'
    },
    textTitleProduct : {
        fontWeight : 'bold',
    },
    iconStar : {
        flexDirection : 'row'
    },
    textHarga : {
        marginVertical : 3
    },
    boxCart : {
        flexDirection : 'row',
    },
    iconCart : {
        backgroundColor :colors.default,
        alignItems : 'center',
        justifyContent : 'center',
        padding : 3,
        borderRadius : 100,
        marginRight : 2
    },
})
