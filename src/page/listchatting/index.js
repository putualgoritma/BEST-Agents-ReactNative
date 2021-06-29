import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Profile } from '../../assets'
import { Header, Spinner } from '../../component'
import { FIREBASE } from '../../config'
import API from '../../service'
import { colors } from '../../utils'

const Item =(props)=>{
    return (
        <TouchableOpacity style={{flex:1, flexDirection : 'row', alignItems : 'center', borderBottomWidth : 1, paddingBottom : 8, marginVertical : 10}}
            onPress={props.navigation}
        >
            <View >
                <Image source={Profile} style={styles.profile} />
            </View>
            <View style={{marginRight : 10}}/>
            <View>
                <Text>{props.name}</Text>
                <Text style={{color:'grey'}}>{props.text}</Text>
                {/* <Text>{props.date}</Text> */}
            </View>
        </TouchableOpacity>
    )
}

const ListChatting = ({navigation}) => {

    const USER = useSelector((state) => state.UserReducer);

    const [historyChat, setHistoryChat] = useState([])

    const TOKEN = useSelector((state) => state.TokenReducer);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isAmmouted = false
        const urlHistoryMessages = `messages/${USER.id}/`

        API.members(TOKEN)
            .then(res =>{

                const dataMembers = res.data

                FIREBASE.database()
                .ref(urlHistoryMessages)
                .on('value', snapshot => {
                    // console.log('data history chat ',snapshot.val());

                    if(snapshot.val()) {
                        const oldData = snapshot.val();
                        const data = [];
                        const allDataChat = [];
                        Object.keys(oldData).map(key => {
                            // data.push({
                            //     id : key,
                            //     ...oldData[key]
                            // })

                            // const newDataMember = []
                            Object.keys(dataMembers).map(member => {
                                if(dataMembers[member].id == oldData[key].uidPartner){
                                    data.push({
                                        id : key,
                                        chatData : oldData[key],
                                        memberData : dataMembers[member]
                                    })
                                }
                            })
                            allDataChat.push(data)
                        })

                        console.log('data history chat : ', allDataChat );

                        setHistoryChat(data)

                    }
                    setLoading(false)
                })
            })
            .catch(err => {
                console.log(err.request);
                setLoading(false)
            })

        return () => {
            isAmmouted = true
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
                        title = 'Your Message'
                        navigation = {() => navigation.goBack()}
                    />
                    <View style={styles.body}>
                        <ScrollView>
                            {historyChat && historyChat.map(itemHistory => {
                                return (
                                    <Item
                                        key ={itemHistory.id}
                                        text = {itemHistory.chatData.lastContentChat}
                                        date = {itemHistory.chatData.lastChatDate}
                                        name = {itemHistory.memberData.name}
                                        navigation = {() => navigation.navigate('Chatting', {member : itemHistory.memberData})}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
            </View>
        </View>
    )
}

export default ListChatting

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
        paddingTop:20,
    }, 
    hr : {
        borderBottomColor: colors.shadow,
        borderBottomWidth: 3,
        width:'100%',
        marginVertical : 10
    },
    profile : {
        width : 50,
        height : 50
    }
})
