import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { Profile } from '../../assets'
import { Chattime, Header, Spinner } from '../../component'
import { FIREBASE } from '../../config'
import { colors, getChatTime, setDateChat } from '../../utils'

const Chatting = ({navigation, route}) => {
    const [loading, setLoading] = useState(false)
    const [chatContent, setChatContent] = useState('');
    const dispatch = useDispatch();
    const USER = useSelector((state) => state.UserReducer);
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const memberId = route.params.member.id
    const[focus, setFocus] = useState()
    const [chatData, setChatData] = useState([])

    useEffect(() => {

        let isAmmounted = false

        // console.log('data member : ', route.params.member.id );

        const chatId = `${memberId}_${USER.id}`;

        const urlFirebase =  `chatting/${chatId}/allChat/`;
        console.log('url firebase : ', urlFirebase );
        FIREBASE.database()
            .ref(urlFirebase)
            .on('value', (snapshot) => {

                // console.log('data chat : ', snapshot.val());
                if(snapshot.val()){
                    const dataSnapshot = snapshot.val();
                    const allDataChat = [];
                    Object.keys(dataSnapshot).map(key => {
                        const dataChat = dataSnapshot[key];
                        const newDataChat =[];

                        Object.keys(dataChat).map(itemChat => {
                            newDataChat.push(dataChat[itemChat])
                        }) 

                        allDataChat.push({
                            id : key,
                            data : newDataChat
                        })

                    })
                    console.log('all Data Chat : ',allDataChat);
                    setChatData(allDataChat)
                }    
        })

        return () => {
            isAmmounted = true
        }


    }, [USER, memberId])


    // const getDataChating = () => {

    //     const chatId = `${USER.id}_${memberId}`;

    //     const urlFirebase =  `chatting/${chatId}/allChat/`;

    //     FIREBASE.database().ref(urlFirebase).on('value', (snapshot) => {
    //         console.log('data chat : ', snapshot.val());
    //     })
    // }


    const chatSend = () => {
        
        const chatId = `${memberId}_${USER.id}`;

        const urlFirebase =  `chatting/${chatId}/allChat/${setDateChat(today)}`;

        let data = {
            sendBy : USER.id,
            chatDate : today.getTime(),
            chatTime : `${getChatTime(today)}`,
            chatContent : chatContent
        }

        // console.log('date : ', chatId);
        // setLoading(true)
        FIREBASE.database().ref(urlFirebase)
            .push(data)
            .then(res => {
                console.log('suscces databse',res);
                setChatContent('')

                const urlMessagesUser = `messages/${USER.id}/${chatId}`
                const urlMessagesAgent = `messages/${memberId}/${chatId}`

                const dataHistoryChatForUser = {
                    lastContentChat : chatContent,
                    lastChatDate : today.getTime(),
                    uidPartner : memberId
                }

                const dataHistoryChatForAgent = {
                    lastContentChat : chatContent,
                    lastChatDate : today.getTime(),
                    uidPartner : USER.id
                }

                // set history for user
                FIREBASE.database()
                    .ref(urlMessagesUser)
                    .set(dataHistoryChatForUser)

                // set history for agent
                FIREBASE.database()
                    .ref(urlMessagesAgent)
                    .set(dataHistoryChatForAgent)
            }) 
            .catch(err => {
                console.log('error databse : ',err.message);
                setChatContent('')
                // setLoading(false)
            })
    }
    


    const handleFocus = () => {
        setFocus(true)
    }


    const handleBlur = () => {
        setFocus(false)
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
                        title = 'Chatting'
                        navigation = {() => navigation.goBack()}
                    />
                    <View style={{ backgroundColor:colors.default, height:75, paddingHorizontal:20, paddingBottom:5}} >
                        <View>
                            <Image source={Profile} style={{width:50, height:50}}/>
                            <Text style={{color:'white'}}>Nama Agen</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.body}>
                            {chatData && chatData.map(chat => {
                                return(
                                    <View key={chat.id} > 
                                        <Text style={{textAlign:'center', marginVertical:10}}>{chat.id}</Text>
                                        {chat && chat.data.map((itemChat, index) => {
                                            return <Chattime key={index} IsMe = {itemChat.sendBy == USER.id ? false : true} text={itemChat.chatContent} date={itemChat.chatTime} />
                                        })}
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={{padding : 16}}>
                    <View style={{flexDirection : 'row', alignItems:'center'}}>
                        <TextInput 
                            placeholder='Tulis Pesan Anda'
                            style={styles.chatting(focus, chatContent)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={chatContent}
                            onChangeText={(value) => setChatContent(value)}
                        />
                        <View style={{marginHorizontal:5}}/>
                        <TouchableOpacity onPress={chatContent === '' ? null : chatSend}>
                            <FontAwesomeIcon icon={faPaperPlane} size={33} color={chatContent !=='' ? '#3366ff' : colors.shadow} />
                            <Text>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
      )
}

export default Chatting

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
        marginVertical : 3,
    },
    chatting : (focus, chatContent) => ({
        backgroundColor : focus ? '#ffffff' :(chatContent !=='' ? '#ffffff' : colors.shadow), 
        padding :14,
        borderRadius:15,
        flex:5,
        borderWidth : 1,
        borderColor : focus ? '#3366ff' : colors.shadow, 
    })
})
