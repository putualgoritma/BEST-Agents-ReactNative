import { faCartArrowDown, faHistory, faLuggageCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Header } from '../../component'
import { colors } from '../../utils'

const Item = (props) => {
    return (
       <TouchableOpacity onPress={props.navigation} onPress={() => props.navigation()}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.boxItem}>
                <FontAwesomeIcon icon={props.icon} size={30} />
                <Text style={styles.desc}>{props.desc}</Text>
            </View>
            <View style={styles.hr} />
       </TouchableOpacity>
    )
}


const History = ({navigation}) => {

    return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                        <Header
                            title = 'History'
                            navigation = {() => navigation.goBack()}
                        />
                        <ScrollView>
                            <View style={styles.body}>
                                <Item
                                    title = 'History Poin'
                                    icon ={faHistory}
                                    desc = 'Mutasi Poin'
                                    navigation = {() => navigation.navigate('HistoryPoint')}
                                />
                                <Item
                                    title = 'History Order'
                                    icon ={faLuggageCart}
                                    desc = 'History Order'
                                    navigation = {() => navigation.navigate('HistoryOrder')}
                                />
                                <Item
                                    title = 'History Order Masuk'
                                    icon ={faCartArrowDown}
                                    desc = 'History Order Masuk'
                                    navigation = {() => navigation.navigate('HistoryOrderMasuk')}
                                />
                            </View>
                        </ScrollView>
                </View>
            </View>
      )
}

export default History

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
