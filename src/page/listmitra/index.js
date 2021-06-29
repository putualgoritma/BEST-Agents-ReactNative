import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Profile } from '../../assets'
import { Header, Spinner } from '../../component'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'

const Item = (props) => {
    return (
       <TouchableOpacity onPress={props.navigation}>
            {/* <Text style={styles.title}>{props.title}</Text> */}
            <View style={styles.boxItem}>
                <Text style={{fontSize:18, marginRight:10}}>{props.no + 1}</Text>
                <Image source={Profile} style={{height:50, width : 50}} />
                <Text style={styles.desc}>{props.nama}</Text>
            </View>
            <View style={styles.hr} />
       </TouchableOpacity>
    )
}


const ListMitra = ({navigation}) => {
  const [mitra, setMitra] = useState(null)
  const [loading, setLoading] = useState(true)
  const USER = useSelector((state) => state.UserReducer);
  const TOKEN = useSelector((state) => state.TokenReducer);
  useEffect( () => {
        let isAmounted = false
        if(!isAmounted) { 
          Promise.all([API.downline(USER.id, TOKEN)]) 
          .then((result) => { 
                // console.log(result[0].data);
            setMitra(result[0].data)
            setLoading(false)
          }).catch((e) => {
            console.log(e);
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
                              title = 'List Mitra'
                              navigation = {() => navigation.goBack()}
                        />
                        <ScrollView>
                            <View style={styles.body}>
                              {mitra.map((item, index) => {
                                return (
                                  <Item
                                    key = {item.id}
                                    no = {index}
                                    nama = {item.name}
                                    code = {item.code}
                                    address = {item.address}
                                  />
                                  )
                              })}
                            </View>
                        </ScrollView>
                  </View>
            </View>
      )
}

export default ListMitra

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
