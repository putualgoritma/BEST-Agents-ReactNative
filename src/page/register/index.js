import { faAddressBook,  faEnvelope, faLock, faMapMarkedAlt, faUserAlt} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { BannerLogin } from '../../assets'
import {Button, Input, Spinner} from '../../component'
import { colors } from '../../utils'
import API from '../../service'
import { Source } from '../../service/Config'


const Register = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(null)
    const dateRegister = () => {
            var todayTime = new Date();
            var month = todayTime.getMonth() + 1;
            var day = todayTime.getDate();
            var year = todayTime.getFullYear();
        
            return year + "-" + month + "-" + day;
    }
    const [form, setForm] = useState({
            register: dateRegister(),
            password: '',
            name: '',
            phone: '',
            email: '',
            address: '',
            type: 'member',
            status: 'active',
    })

    const onChangeForm = (name, value) => {
        setForm(
             { ...form,
              [name] : value}
        )
    }

    const handleRegister = () => {
        let message = ''
        if(form.email !== null && form.name !==null && form.password !==null && form.phone !==null && form.address !== null){
              if(form.password === confirmPassword){
                    setLoading(true)
                    API.register(form).then((res) => {
                          message= 'registrai berhasil'
                          setForm({
                                register : dateRegister(),
                                email : null,
                                name : null,
                                password : null,
                                phone : null,
                                address : null
                          })
                          setLoading(false)
                          navigation.navigate('Info', {notif : 'register berhasil', navigasi : 'Login'})
                        //    history.push(`landing/Register berhasil/login`)
                    }).catch((e) => {
                          message = 'register gagal';
                          console.log(e.request);
                          alert(message)
                          setLoading(false)

                    })
              }else{
                    message = 'password tidak sama'
                    alert(message)
              }
        }else{
              message ='mohon lengkapi data diri anda'
              alert(message)
        }
        // console.log(form);
        Source.cancel('home cancel axios')
    }

  if(loading ){
        return (
              <Spinner/>
        )
  }

    return (
            <ImageBackground style={styles.container} source={BannerLogin}>
                <View style={styles.wrapper}>
                    {/* <Image source={BannerLogin} style={styles.banner} /> */}
                    <View style={{marginTop : '65%'}} />
                    <ScrollView>
                        <View style={styles.body}>
                            <Input
                                title='Name'
                                icon = {faUserAlt}
                                placeholder = 'Your name'
                                color={colors.default}
                                onChangeText = {(value) => onChangeForm('name', value)}
                            />
                            <Input
                                title='Email'
                                icon = {faEnvelope}
                                placeholder = 'example@example.com'
                                color={colors.default}
                                onChangeText = {(value) => onChangeForm('email', value)}
                            />
                            <Input
                                title='Password'
                                icon = {faLock}
                                placeholder = '*********'
                                color={colors.default}
                                onChangeText = {(value) => onChangeForm('password', value)}
                                secureTextEntry={true}
                            />
                            <Input
                                title='Confitm Password'
                                icon = {faLock}
                                placeholder = '*********'
                                color={colors.default}
                                secureTextEntry={true}
                                onChangeText = {(value) => setConfirmPassword(value)}
                            />
                            <Input
                                title='Phone number'
                                icon = {faAddressBook}
                                placeholder = '082+++++++'
                                color={colors.default}
                                keyboardType = 'number-pad'
                                onChangeText = {(value) => onChangeForm('phone', value)}
                            />
                            <Input
                                title='Address'
                                icon = {faMapMarkedAlt}
                                placeholder = 'Jl. Raya Tabanan'
                                color={colors.default}
                                onChangeText = {(value) => onChangeForm('address', value)}
                            />
                        </View>
                           <View style={{marginBottom : 40}}>
                                <Button
                                    title = 'Register'
                                    width = '80%'
                                    onPress= {handleRegister}
                                />
                                <View ><Text style={{textAlign:'center', marginVertical : 10}}>OR</Text></View>
                                <Button
                                        title = 'Login'
                                        width = '80%'
                                        onPress= {() => navigation.navigate('Login')}
                                        color = {colors.active}
                                />
                           </View>
                    </ScrollView>
                </View>
            </ImageBackground>
      )
}

export default Register

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#ffffff'
    },
    wrapper : {
        flex : 1
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
        paddingTop:20,
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
