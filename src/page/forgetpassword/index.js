import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { BannerLogin } from '../../assets'
import { Button, Input, Spinner } from '../../component'
import API from '../../service'
import { colors } from '../../utils'

const ForgetPassword = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: null,
    })

    const onChange = (key, value) => {
        setForm({
            ...form,
            [key] : value
        })
    }

    const handleReset = () => {
        if(form.email !== null){
            setLoading(true)
            API.reset(form).then((result) => {
                console.log(result);
                navigation.navigate('Info', {notif : 'Reset password sukses', navigasi : 'Login'})
            }).catch((e) => {
                console.log(e.request);
                alert('Reset Password gagal')
            })
        }else{
            alert('mohon isi email anda')
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
                    <ImageBackground source={BannerLogin} style={{flex:1}} >
                        <ScrollView>
                            <View style={styles.body}>
                                <Input
                                    title='Email'
                                    icon = {faEnvelope}
                                    placeholder = 'example@example.com'
                                    color={colors.default}
                                    onChangeText = {(value) => onChange('email', value)}
                                />
                                <TouchableOpacity style={{alignItems:'flex-end', marginVertical:10}} onPress={() => navigation.navigate('Login')}>
                                    <Text style={{color : 'grey'}}>Login ?</Text>
                                </TouchableOpacity>
                                <Button
                                    title = 'Forget Password'
                                    width = '80%'
                                    onPress ={handleReset}
                                />
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </View>
      )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#ffffff'
    },
    wrapper : {
        flex : 1,
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
        paddingTop : '80%'
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
