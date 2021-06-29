import { faCreditCard, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Button, Header, Spinner } from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'

const Transfer = ({navigation, route}) => {
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true);
    const [point, setPoint] = useState(0);
    const [members, setMembers] = useState(null)
    const [scan, setScan] = useState(null)
    const dateRegister = () => {
        let todayTime = new Date();
        let month = todayTime.getMonth() + 1;
        let day = todayTime.getDate();
        let year = todayTime.getFullYear();
        return year + "-" + month + "-" + day;
    }
    const [form, setForm] = useState({
            register : dateRegister(),
            amount : 0,
            from : USER.id,
            to : route.params ? route.params.dataId : null
    })

    useEffect( () => {
        let isAmounted = false
        console.log(route.params ? route.params.dataId : 'tidak');
        if(!isAmounted) { 
            if(USER!== null && TOKEN !==null){
                Promise.all([API.members(TOKEN), API.point(USER.id, TOKEN)]) 
                .then((result) => { 
                    let memberData = [];
                    result[0].data.map((item, index) => {
                            memberData[memberData.length] ={
                                label : `${item.name} (${item.code})`,
                                value : item.id,
                                icon: () => <FontAwesomeIcon icon={faUserAlt} size={18} />,
                            }
                    })
                    setMembers(memberData)
                    setPoint(parseInt(result[1].data[0].balance_points))
                    setLoading(false)
                }).catch((e) => {
                    console.log(e);
                    setLoading(false)
                })
            }
        }
        return () => {
                Source.cancel('cancel api')
                console.log('cnacel tranfer');
                isAmounted = true;
        }
    }, [])

    const onChangeForm = (key, value) => {
        setForm({
            ...form,
            [key] : value
        })
    }

    const handleTransfer = () => {
        if(form.register !==null && form.amount > 0 && form.from !==null && form.to !== ''){
              if(point >= form.amount){
                    setLoading(true)
                    API.transfer(form, TOKEN).then((result) => {
                          // window.location.reload();
                          navigation.navigate('Info',{ notif: 'Transfer sukses', navigasi : 'Home'})
                    }).catch((e) => {
                          console.log(e.request);
                          alert('transfer gagal')
                    })
              }else{
                    alert('poin anda kurang')
              }
        }else{
              alert('mohon isi data dengan lengkap')
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
                              title = 'Transfer'
                              navigation = {() => navigation.goBack()}
                        />
                        <ScrollView>
                            <View style={styles.body}>
                                <DropDownPicker
                                    items={members}
                                    // defaultValue={this.state.country}
                                    containerStyle={{height: 60}}
                                    style={{backgroundColor: '#ffffff'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    defaultValue={route.params ? route.params.dataId : ''}
                                    searchable={true}
                                    searchablePlaceholder="Search for an member"
                                    searchablePlaceholderTextColor="gray"
                                    dropDownStyle={{backgroundColor: '#ffffff'}}
                                    dropDownMaxHeight = {600}
                                    onChangeItem={(value )=> onChangeForm('to', value.value)}
                                />
                                <View style={styles.hr} />
                                <View style={styles.boxInfo}>
                                    <FontAwesomeIcon icon={faCreditCard} size={30} color={colors.default} />
                                    <View style={styles.boxTextInfo}>
                                        <Text style={{fontWeight:'bold', fontSize : 17}}>BEST Poin</Text>
                                        <Text>{Rupiah(parseInt(point))}</Text>
                                    </View>
                                </View>
                                <View style={styles.hr} />
                                <Text>Masukan Nominal Transfer</Text>
                                <TextInput defaultValue='0' style={styles.input} onChangeText = {(value) => onChangeForm('amount', value)} keyboardType='number-pad' />
                            </View> 
                        </ScrollView>
                  </View>
                  <Button
                        title = 'Transfer'
                        width = '80%'
                        onPress= {handleTransfer}
                  />
            </View>
      )
}

export default Transfer

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
    boxInfo : {
        flexDirection : 'row',
        alignItems : 'center',
        borderWidth : 1,
        padding:10,
        borderRadius:10,
        borderColor:colors.shadow
    },
    boxTextInfo : {
        marginLeft : 20
    },
    input : {
        // backgroundColor : '#f6f2f1',
        borderWidth : 1,
        borderColor : colors.shadow,
        paddingHorizontal : 20,
        borderRadius:10,
        marginVertical:20,
        fontSize :20
    },
})
