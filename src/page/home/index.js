import { faEnvelope, faExchangeAlt, faHistory, faMoneyBillWaveAlt, faPlusCircle, faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import Config from 'react-native-config'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Banner, Bpjs, Corousel, Corousel2, Corousel3, Game, Ipulsa, Lainnya, Paketdata, Pdam, Pln, Product, Profile, Telkompln } from '../../assets'
import { Footer, Spinner } from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'
const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
}
    

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

const Home = ({navigation}) => {
      const USER = useSelector((state) => state.UserReducer);
      const TOKEN = useSelector((state) => state.TokenReducer);
      const [products, setProducts] = useState(null)
      const [loading, setLoading] = useState(true)
      const [point, setPoint] = useState(0)
      const [refreshing, setRefreshing] = useState(false);
      const [count,setCount] = useState(0)
      const onRefresh = React.useCallback(() => {
            setRefreshing(true);
            API.point(USER.id, TOKEN).then((result) => {
                  // setPoint(result[0].balance_points);
                  // wait(1000).then(() => setRefreshing(false));
                  console.log(result);
                  setPoint(result.data[0].balance_points);
                  setRefreshing(false)
            }).catch((e)=> {
                  console.log(e.request);
                  setRefreshing(false)
            })
      }, []);
      
      const focused = useIsFocused();
      useEffect(() => {
            let isAmounted = false
            if(!isAmounted) { 
                  // console.log('focues', isFocused);
                  Promise.all([API.products(), API.point(USER.id, TOKEN), API.countunread(USER.id, TOKEN)])
                  .then((result) => {
                        console.log('data ',result[2]);
                        setCount(result[2].count)
                        setProducts(result[0])
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
      }, [focused])

      if(loading){
            return (
                  <Spinner/>
            )
      }
      return (
            <SafeAreaView style={styles.container}>
                  <ScrollView
                        refreshControl={
                              <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                              />
                        }
                  >
                        <View style={styles.wrapperBbanner}>
                              <ImageBackground source={Banner} style={styles.banner}>
                                    <View style={styles.bell}>
                                         <TouchableOpacity onPress={() => navigation.navigate('LogNotif')}>
                                               <FontAwesomeIcon icon={faEnvelope} size={30} color='#ffffff' />
                                          </TouchableOpacity>
                                          <View style={styles.count}><Text>{count}</Text></View>
                                    </View>
                                    <View style={styles.boxProfile}>
                                    {USER.img == null || USER.img == '' ?  
                                            <Image
                                                source={Profile}
                                                style={styles.imgProfile}
                                                /> : 
                                            <Image
                                                source = {{uri : Config.REACT_APP_BASE_URL + `${String(USER.img).replace('public/', '')}?time="` + new Date()}}
                                                style={styles.imgProfile}
                                            />
                                        }
                                          <Text style={styles.textProfile}>{USER.name} - {USER.code}</Text>
                                    </View>
                              </ImageBackground>    
                              <View style={styles.boxTextMenuHeader}>
                                    <View style={{flexDirection : 'row', alignItems :'center'}}>
                                          <FontAwesomeIcon icon={faMoneyBillWaveAlt} size={20} color='green' />
                                          <Text style={styles.textHeader}>Poin : {Rupiah(parseInt(point))}</Text>
                                    </View>
                              </View>
                              <View style={styles.boxMenu}>
                                    <View style={styles.boxMenuIcon}>
                                          <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.navigate('Topup')}>
                                                <FontAwesomeIcon icon ={faPlusCircle} size={25} color='red' />
                                                <Text style={styles.textMenuIcon}>Topup</Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.menuIcon}  onPress={() => navigation.navigate('Transfer')}>
                                                <FontAwesomeIcon icon={faExchangeAlt} size={25} color='#248DBF' />
                                                <Text style={styles.textMenuIcon}>Transfer</Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.menuIcon}   onPress={() => navigation.navigate('History')}>
                                                <FontAwesomeIcon icon={faHistory} size={25} color='#271D66' />
                                                <Text style={styles.textMenuIcon}>History</Text>
                                          </TouchableOpacity>
                                    </View>
                              </View>
                        </View>
                        <View style={styles.hr} />  
                        {/* content */}
                        <View style={styles.boxContent}>
                              <View style={styles.content}>
                                    <ScrollView horizontal={true} >
                                          <Corousel2 width ={Dimensions.get('window').width -30}/>
                                          <Corousel width ={Dimensions.get('window').width -30}/>
                                          <Corousel3 width ={Dimensions.get('window').width -30}/>
                                    </ScrollView>
                              </View>
                        </View>
                        {/* batas content */}
                        <View style={styles.hr} />  
                        <View style={styles.menuBody}>
                              <Text style={styles.produkDigital}>Produk Digital</Text>
                              <View style={styles.boxBody}>
                                    <View style={styles.itemBody}>
                                          <TouchableOpacity style={styles.itemIconBody}  >
                                                <Ipulsa/>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.itemIconBody}>
                                                <Paketdata/>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.itemIconBody}>
                                                <Pln/>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.itemIconBody}>
                                                <Telkompln/>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.itemIconBody}>
                                                <Bpjs/>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.itemIconBody}>
                                                <Pdam/>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.itemIconBody}>
                                                <Game/>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.itemIconBody}>
                                                <Lainnya/>
                                          </TouchableOpacity>
                                    </View>
                              </View>           
                        </View>
                        <View style={styles.hr} />  
                        <View style={styles.menuMarket}>
                              <Text style={[styles.produkDigital,{backgroundColor :colors.active}]}>Market Place</Text>
                              <View style={styles.boxMarket}>
                                    <View style={styles.boxItemMarket}>
                                          {products && products.slice(0,6).map((item, index)=> {
                                                return (
                                                      <ItemMarket 
                                                            key ={item.id}
                                                            title = {item.name}
                                                            price = {Rupiah(parseInt(item.price))}
                                                            img = {item.img}
                                                            navigation = {() => navigation.navigate('Product', {id: item.id})}
                                                      />
                                                )
                                          })}
                                    </View>
                                    <TouchableOpacity style={styles.btnLihatSemua} onPress={() => navigation.navigate('ListProduct')}>
                                          <Text style={styles.lihatSemua}>Lihat Semua</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  </ScrollView>
                  <Footer
                        focus = 'Home'
                        navigation = {navigation}
                  />
            </SafeAreaView>
      )
}

export default Home

const styles = StyleSheet.create({
      container : {
            flex : 1,
            backgroundColor:'#ffffff',
      },
      wrapperBbanner : {
            height:230,
            marginBottom:20,
            // backgroundColor:'red'
      },
      banner: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            width : '100%',
            height:200
      },
      boxProfile : {
            alignItems :'center',
            // justifyContent : 'flex-start'
      },    
      imgProfile : {
            height : 60,
            width : 60,
            borderRadius : 100
      },
      textProfile : {
            color : '#ffffff',
            fontSize : 13,
            fontWeight : 'bold',
      },    
      bell :{
            position:'absolute',
            top:0,
            right:0,
            marginTop:10,
            marginRight : 5
      },
      boxMenu :{
            top:2,
            backgroundColor : '#FAFCFB',
            marginHorizontal : 17,
            borderRadius : 5,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            borderColor: colors.shadow,
            borderWidth: 1,
            elevation: 5,
            // position:'absolute',
            // width:'90%'
      },
      boxTextMenuHeader : {
            paddingHorizontal :20,
      },
      textHeader : {
            fontSize : 15,
            color : colors.default,
            fontWeight : 'bold',
            marginLeft : 10
      },
      hr : {
            borderBottomColor: colors.shadow,
            borderBottomWidth: 3,
            width:'100%',
            marginVertical : 10
      },
      boxMenuIcon : {
            flexDirection:'row',
            justifyContent:'space-around',
      },
      menuIcon : {
            justifyContent:'center',
            alignItems : 'center',
      },
      textMenuIcon : {
            fontSize:15,
            color: '#00000f',
      },
      content : {
            // padding :20,
      },
      boxContent : {
            flex : 1,
      },
      content : {
            justifyContent : 'center',
            alignItems :'center'
      },
      menuBody : {
            paddingVertical :3,
            // paddingHorizontal : 10 ,
            flex :1
      },
      produkDigital : {
            backgroundColor : '#76E358',
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
      btnLihatSemua : {
            paddingHorizontal : 20,
            alignItems : 'flex-end',
            marginVertical : 10
      },
      lihatSemua : {
            color : colors.active,
            borderBottomWidth : 1,
            borderColor :colors.active
      },
      count : {
            height : 20,
            width : 20,
            backgroundColor : colors.active,
            position : 'absolute',
            top : -5,
            right : -5,
            alignItems : 'center',
            borderRadius :100
      }
})
