import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { Profile } from '../../assets'
import {Button, Header, Spinner} from '../../component'
import { SET_DATA_USER } from '../../redux/action'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'

const Item = (props) => {
    return (
       <TouchableOpacity style={[styles.boxItem, {backgroundColor : (props.select === props.id ? colors.active : '#ffffff')}]} onPress={props.click} >
           <Image source={Profile} style={styles.img} />
           <Text style={styles.text}>{props.name}</Text>
           <Text style={styles.text}>{props.email}</Text>
           <Text style={styles.text}>{props.phone}</Text>
           {/* <TouchableOpacity style={styles.button} onPress={props.checkout}><Text style={styles.buttonText}>Pilih Agen</Text></TouchableOpacity> */}
       </TouchableOpacity>
    )
}



const Agen = ({navigation, route}) => {
    const [agen, setAgen] = useState(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [form, setForm] = useState({
        id :USER.id,
        package_id : route.params.idPackage ? route.params.idPackage : null,
        agents_id : null
    })
    const [formDownline, setFormDownline] = useState({
        register : route.params.dataMember ? route.params.dataMember.register : null ,
        password : route.params.dataMember? route.params.dataMember.password : null ,
        name : route.params.dataMember ? route.params.dataMember.name : null ,
        phone : route.params.dataMember ? route.params.dataMember.phone : null ,
        email : route.params.dataMember ? route.params.dataMember.email : null ,
        address : route.params.dataMember ? route.params.dataMember.address : null ,
        ref_id : route.params.dataMember ? route.params.dataMember.ref_id : null ,
        package_id : route.params ? route.params.idPackage : null,
        agents_id : null
    })
    useEffect(() => {
        let isAmounted = false
            if(!isAmounted) { 
                // console.log('focues', isFocused);
                Promise.all([API.agents()])
                .then((result) => {
                    setAgen(result[0].data)
                    setLoading(false)
                }).catch((e) => {
                    console.log(e.request._response);
                    setLoading(false)
                })
        }
        return () => {
                Source.cancel('home cancel axios')
                isAmounted = true;
                // console.log('cancel home');
        }
    }, [])

    const handleActivasi = () => {
        if (form.id !== null && form.agents_id !==null  && form.package_id !== null) {
            setLoading(true)
            API.activasi(form, TOKEN).then((result) => {
                console.log(result);
                dispatch(SET_DATA_USER(result.data))
                storeDataUser(result.data)
                navigation.navigate('Info', {notif : 'Activasi Berhasil', navigasi : 'Home'})
                setLoading(false)
            }).catch((e) => {
                console.log(e.response);
                alert('Activasi Gagal')
                setLoading(false)
            })
        }else{
            alert('mohon lengkapi data pilihan ')
        }

        console.log(form);
    }

    const handleRegisterDownline = () => {
        if(formDownline.agents_id !==null){
            setLoading(true)
            API.registerdownline(formDownline, TOKEN).then((result) => {
                    console.log(result);
                    navigation.navigate('Info', {notif : 'registrasi Downline Berhasil', navigasi : 'Home'})
            }).catch((e) => {
                console.log(e.response);
                alert('Registarsi gagal')
                setLoading(false)
            })
        }
    }

    const storeDataUser = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@LocalUser', jsonValue)
        } catch (e) {
          console.log('no save')
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
                            title = 'Agen'
                            navigation = {() => navigation.goBack()}
                    />
                    <ScrollView>
                    <View style={styles.body}>
                        {agen && agen.map((item, index) =>{
                            return (
                                <Item
                                    id = {item.id}
                                    key= {index}
                                    name = {item.name}
                                    email ={item.email}
                                    phone = {item.phone}
                                    click = {() => {
                                        setForm({...form, agents_id : item.id});
                                        setFormDownline({...formDownline, agents_id : item.id})
                                    }}
                                    select = {form.agents_id}
                                    // checkout ={() => navigation.navigate(page, {idAgen : item.id})}
                                />
                            )
                        })}
                    </View>
                    </ScrollView>
                </View>
                {route.params.idPackage && !route.params.dataMember?     
                    <Button
                        title = 'Activasi'
                        width = '80%'
                        onPress= {() => form.agents_id !==null ? 
                            Alert.alert(
                                'Peringatan',
                                `Activasi sekarang ? `,
                                [
                                    {
                                        text : 'Tidak',
                                        onPress : () => console.log('tidak')
                                    },
                                    {
                                        text : 'Ya',
                                        onPress : () => handleActivasi  ()
                                    }
                                ]
                            )
                            :  alert('pilih agen terlebih dahulu')}
                    /> : null}
                {route.params.page ? 
                    <Button
                        title = 'Pilih Agen'
                        width = '80%'
                        onPress= {() => form.agents_id !==null ? navigation.navigate('Checkout', {idAgen : form.agents_id})  : alert('pilih agen terlebih dahulu')}
                    /> : null
                }
                {route.params.idPackage && route.params.dataMember ? 
                    <Button
                        title = 'registri downline'
                        width = '80%'
                        onPress= {() => formDownline.agents_id !==null ? handleRegisterDownline()  : alert('pilih agen terlebih dahulu')}
                    /> : null
                }
        </View>
    )
}

export default Agen

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
    img : {
        height : 100,
        width : 100
    },
    boxItem : {
        alignItems : 'center',
        elevation: 1,
        padding : 20,
        borderWidth : 1,
        borderColor : colors.shadow,
        marginVertical : 5,
    },
    text : {
        backgroundColor  : '#F9F9FA',
        width : '100%',
        marginVertical :5,
        padding:8,
        fontSize : 12
    },
    button : {
        backgroundColor : colors.default,
        width : '100%',
        padding : 10,
        borderRadius : 5
    },
    buttonText : {
        textAlign :'center',
        fontSize : 15,
        color : '#ffffff'
    }
})
