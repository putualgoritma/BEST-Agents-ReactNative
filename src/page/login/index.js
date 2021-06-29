import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Config from 'react-native-config'
import { ScrollView } from 'react-native-gesture-handler'
import OneSignal from 'react-native-onesignal'
import { useDispatch } from 'react-redux'
import { BannerLogin } from '../../assets'
import { Button, Input, Spinner } from '../../component'
import { SET_DATA_TOKEN, SET_DATA_USER } from '../../redux/action'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'
const Login = ({navigation}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [block, setBlock] = useState(0)
    // const [deviceId, setDeviceId] = useState()
    const [form, setForm] = useState({
        email: '',
        password: null,
        id_onesignal : ''
    })
    const onChange = (key, value) => {
        setForm({
            ...form,
            [key] : value
        })
    }

   
      
    useEffect(() => {
        let isAmounted = false
       if(!isAmounted){
              Promise.all([getDataBlock(), notif()])
              .then(response => {
                //   setDeviceId(response[1]['userId']);
                    setForm({...form,id_onesignal : response[1]['userId'] })
                  if(response[0] === undefined){
                        // console.log(response[0]);
                  }else{
                        // console.log(response[0]);
                        setBlock(parseInt(response[0]))
                  }
                  setLoading(false)
              }).catch((e) => {
                    console.log(e.request);
                    setLoading(false)
              })
       }
        return () => {
              isAmounted= true
        }
    }, [])

    const notif = async () => {
        try{
          OneSignal.setAppId(Config.REACT_APP_ONESIGNAL_APPID);
          OneSignal.setLogLevel(6, 0);
          OneSignal.setRequiresUserPrivacyConsent(false);
          const device = await OneSignal.getDeviceState()
          console.log(device['userId']);
          console.log(Config.REACT_APP_ONESIGNAL_APPID);
          return device;
        } catch(e){
          console.log(e);
        }
      }

    const handleLogin = () => {
        if(form.email !==null && form.password !==null){
              setLoading(true)
              API.login(form).then(result => {
                    dispatch(SET_DATA_USER(result.user))
                    dispatch(SET_DATA_TOKEN(result.token.token))
                    storeDataToken(result.token.token)
                    storeDataUser(result.user)
                    storeDataBlock('0')
                    setForm({
                          email:null,
                          password:null,
                          id_onesignal:null
                    })
                    setLoading(false)
                    navigation.replace('Home')
              }).catch((e) => {
                    // console.log();
                    console.log(e.request);
                    let mes = JSON.parse(e.request._response)
                    setBlock(block + 1)
                    let counter = block + 1;
                    storeDataBlock(counter.toString())
                    alert(mes.message)
                    setLoading(false)

              })
        }else{
              alert('mohon isi data dengan benar')
        }
        Source.cancel('home cancel axios')
    }

    useEffect(() => {
        let isAmounted = false
        if(!isAmounted){
            if(block === 3) {
                API.block({email : form.email}).then((result) => {
                    console.log(result);
                }).catch((e) => {
                    console.log(e.request);
                })
            }
        }
        return () => {
            isAmounted = true
        }
    }, [block])
    
    const getDataBlock = async () => {
        try {
          const value = await AsyncStorage.getItem('@LocalBlock')
          if(value !== null) {
              console.log('nilai ', value);
              return value
          }
        } catch(e) {
          // error reading value
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

    const storeDataToken = async (value) => {
        try {
          await AsyncStorage.setItem('@LocalToken', value)
        } catch (e) {
          console.log('TOken not Save ')
        }
    }

    const storeDataBlock = async (value) => {
        try {
          await AsyncStorage.setItem('@LocalBlock', value)
        } catch (e) {
          console.log('block not Save ')
        }
    }
    if(loading){
        return (
              <Spinner/>
        )
    }
    return (
            <ImageBackground style={styles.container} source={BannerLogin}>
                <View style={styles.wrapper}>
                    {/* <Image source={BannerLogin} style={styles.banner} /> */}
                    <View style={styles.body}>
                        <ScrollView>
                            <Input
                                title='Email'
                                icon = {faEnvelope}
                                placeholder = 'example@example.com'
                                color={colors.default}
                                onChangeText = {(value) => onChange('email', value)}
                            />
                            <Input
                                title='Password'
                                icon = {faLock}
                                placeholder = '*********'
                                color={colors.default}
                                secureTextEntry={true}
                                onChangeText = {(value) => onChange('password', value)}
                            />
                            <TouchableOpacity style={{alignItems:'flex-end', marginVertical:10}} onPress={() => navigation.navigate('ForgetPassword')}>
                                <Text style={{color : 'grey'}}>Forget Your Password ?</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <Button
                        title = 'Login'
                        width = '80%'
                        onPress= {handleLogin}
                    />
                   <View ><Text style={{textAlign:'center', marginVertical : 10}}>OR</Text></View>
                   <Button
                        title = 'Sign in Up'
                        width = '80%'
                        onPress= {() => navigation.navigate('Register')}
                        color = {colors.active}
                    />
                </View>
            </ImageBackground>
      )
}

export default Login

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#ffffff'
    },
    wrapper : {
        flex : 1,
        // alignItems : 'center',
        justifyContent : "center"
    },
    banner: {
        // flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        height:'30%',
        width:'100%'
    },
    body : {
        paddingHorizontal : 20,
        paddingTop:'35%'
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
