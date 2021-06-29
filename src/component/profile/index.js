import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Config from 'react-native-config';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../assets';
import { SET_DATA_USER } from '../../redux/action';
import { colors } from '../../utils';
import Button from '../button';
import Footer from '../footer';
import Header from '../header';
import Input from '../input';
import Spinner from '../spinner';
const Profile = (props) => {
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [form, setForm] = useState({
        id :USER.id,
        name : USER.name,
        password : null,
        phone :USER.phone,
        email:USER.email,
        address:USER.address
    })


    const handleProfile = () => {
        if(form.password !== null) {
              if(form.password === confirmPassword){
                    if(form.id !== null && form.name !=='' && form.email !=='' && form.address !=='' && form.phone !==''){
                            setLoading(true)
                            API.updateProfile(form, TOKEN).then((result) => {
                                    // window.location.reload();
                                    console.log(result.data);
                                    dispatch(SET_DATA_USER(result.data))
                                    storeDataUser(result.data)
                                    props.navigation.navigate('Info', {notif : 'Update Berhasil', navigasi : 'Home'})
                            }).catch((e) => {
                                    // console.log(e.response);
                                    alert('profile tidak bisa di update')
                                    setLoading(false)
                            })
                        }else{
                            alert('mohon lengkapi data anda')
                        }
                }
                else{
                        alert('password tidak sama')
                }
            }else{
                alert('mohon isi password')
            }
    }

    const onChangeForm = (name, value) => {
        setForm({
                ...form,
                [name] : value
        })
        
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:USER.ref_link,
          });
        } catch (error) {
          alert(error.message);
        }
    };
    
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
                            title = 'Profile'
                            navigation = {() => props.navigation.goBack()}
                    />
                    <ScrollView>
                        <View style={styles.body}>
                                <View style={{alignItems:'center'}}>
                                    <QRCode
                                        value={String(USER.id)}
                                        logoSize={30}
                                        logoBackgroundColor='transparent'
                                    />
                                </View>

                                {/* <View style={{flexDirection:'row', marginVertical : 15, justifyContent:'space-between', paddingRight:50}}>
                                    <Text>Link Referal</Text>
                                    <View style={{marginLeft:50}}>
                                        <Text onPress={() => Linking.openURL(USER.ref_link)}>{USER.ref_link}</Text>
                                        <View style={{flexDirection:'row', marginVertical : 10}}>
                                            <TouchableOpacity style={{alignItems:'center'}} onPress={() =>{ Clipboard.setString(USER.ref_link); alert('link is copy')}}>
                                                <FontAwesomeIcon icon={faCopy}  style={{marginHorizontal : 20}} size={25} color={colors.default}/>
                                                <Text>Copy</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{alignItems:'center'}} onPress={onShare}>
                                                <FontAwesomeIcon icon={faShare}  style={{marginHorizontal : 20}} size={25} color='orange'/>
                                                <Text>Copy</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View> */}
                                <>
                                    <Text style={styles.title}>Edit Profile</Text>
                                    {/* foto */}
                                    <View style = {{flexDirection:'row', alignItems:'center'}}>
                                        {/* <Image source={Product} /> */}
                                        {USER.img == null || USER.img == '' ?  
                                            <Image
                                                source={Product}
                                                style={{height: 50, width: 50, marginRight: 20}}
                                                /> : 
                                            <Image
                                                source = {{uri : Config.REACT_APP_BASE_URL + `${String(USER.img).replace('public/', '')}?time="` + new Date()}}
                                                style={{height: 50, width: 50, marginRight: 20}}
                                            />
                                        }
                                        <TouchableOpacity style={{borderWidth:1, borderColor:colors.default, padding:5, borderRadius:5}} onPress={() => props.navigation.navigate('UploadImage')} ><Text>Edit Profile</Text></TouchableOpacity>
                                    </View>
                                    <Input
                                        title = 'Nama Lengkap'
                                        placeholder = 'Nama Lengkap'
                                        value ={form.name}
                                        onChangeText={(value) => onChangeForm('name', value)}
                                    />
                                    <Input
                                        title = 'Password'
                                        placeholder = 'Password'
                                        secureTextEntry={true}
                                        onChangeText={(value) => onChangeForm('password', value)}
                                    />
                                    <Input
                                        title = 'Confirm Password'
                                        placeholder = 'Confirm Password'
                                        secureTextEntry={true}
                                        onChangeText={(value) => setConfirmPassword(value)}
                                    />
                                    <Input
                                        title = 'Email'
                                        placeholder = 'Email'
                                        value ={form.email}
                                        onChangeText={(value) => onChangeForm('email', value)}
                                    />
                                    <Input
                                        title = 'Phone'
                                        placeholder = 'Phone'
                                        value ={form.phone}
                                        onChangeText={(value) => onChangeForm('phone', value)}
                                    />
                                    <Input
                                        title = 'Alamat'
                                        placeholder = 'Alamat'
                                        value ={form.address}
                                        onChangeText={(value) => onChangeForm('address', value)}
                                    />
                                    <Text>Type</Text>
                                    <View style={{borderWidth:1, padding:10, width :'40%', marginVertical : 10, borderRadius:5, alignItems : 'center',backgroundColor:colors.default}}><Text style={{color:'#ffffff'}}>{USER.type}</Text></View>
                                </>
                        </View>
                        <Button
                            title = 'Update'
                            width = '80%'
                            onPress= {handleProfile}
                        />
                    </ScrollView>
                </View>
                <Footer
                    focus = 'Profile'
                    navigation = {props.navigation}
                />
        </View>
    )
}

export default Profile

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
    qrCode : {
        backgroundColor:colors.shadow,
        height : 120,
        width : 120
    },
    title : {
        fontSize : 20,
        fontWeight : 'bold',
        marginBottom:20
    },
})
