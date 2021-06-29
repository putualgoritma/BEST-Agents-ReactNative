import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Header, Spinner } from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'

const Item =(props) => {
    return (
       <View>
            <View style={styles.boxItem}>
                <Text>{props.item.orders.register}</Text>
                <Text style={{fontWeight:'bold'}}>{props.item.memo}</Text>
                <View style={{flexDirection : 'row', justifyContent:'space-between'}}>
                    <Text style={{color : (props.item.type === 'C' ? 'red' : 'green')}}>{props.item.type === 'C' ? 'Kredit' : 'Debet'}</Text>
                    <Text style={{color : (props.item.type === 'C' ? 'red' : 'green')}}>{Rupiah(parseInt(props.item.amount))}</Text>
                </View>
            </View>
            <View style={styles.hr} />
       </View>
    )
}

const HistoryPoint = ({navigation}) => {
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const [pointHistory, setPointHistory] = useState(null)


    useEffect( () => {
        let isAmounted = false
        if(!isAmounted) { 
            Promise.all([API.historypoint(USER.id, TOKEN)]) 
            .then((result) => { 
                    console.log(result);
                    setPointHistory(result[0].data)
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
                    title = 'History Point'
                    navigation = {() => navigation.goBack()}
                />
                <ScrollView>
                    <View style={styles.body}>
                        {pointHistory && pointHistory.map((item, index) => {
                            return (
                                <Item
                                    key = {item.id}
                                    item = {item}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
        </View>
    </View>
    )
}

export default HistoryPoint

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
        backgroundColor : '#f2f2f2',
        padding : 10
    }
})
