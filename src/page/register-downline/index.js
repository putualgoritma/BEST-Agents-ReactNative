import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Button, Header, Input, Spinner } from '../../component'
import { colors } from '../../utils'


const RegisterDownline = ({navigation}) => {
    const USER = useSelector((state) => state.UserReducer);
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const dateRegister = () => {
        var todayTime = new Date();
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        return year + "-" + month + "-" + day;
    }
    const [form, setForm] = useState({
        register : dateRegister(),
        password : null,
        name : null,
        phone : null,
        email : null,
        address : null,
        ref_id : USER.id,
    })

    const onChangeForm = (name, value) => {
        setForm(
              { 
                    ...form,
                    [name] : value
              }
        )
    }

    const register = () => {
        if(form.password !== null){
            if(form.password === confirmPassword){
                if(form.address !==null && form.name !==null && form.email !==null && form.password !==null && form.phone !==null && form.ref_id !==null && form.register !==null){
                    navigation.navigate('ActivasiDownline', {dataMember :form})
                }else{
                    alert('mohon isi data dengan lengkap')
                }
            }else{
                alert('password anda tidak sama')
            }
        }else{
            alert('Mohon isi Password')
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
                        title = 'Register Downline'
                        navigation = {() => navigation.goBack()}
                />
                <ScrollView>
                    <View style={styles.body}>
                        <Input 
                            title='Nama'
                            placeholder = 'Nama Lengkap'
                            onChangeText = {(value) => onChangeForm('name', value)}
                        />
                        <Input 
                            title='Password'
                            placeholder = '*********'
                            secureTextEntry={true}
                            onChangeText = {(value) => onChangeForm('password', value)}
                        />
                        <Input 
                            title='Confirm Password'
                            placeholder = '*********'
                            secureTextEntry={true}
                            onChangeText = {(value) =>setConfirmPassword(value)}
                        />
                        <Input 
                            title='No Hp'
                            placeholder = '082*********'
                            keyboardType = 'number-pad'
                            onChangeText = {(value) => onChangeForm('phone', value)}
                        />
                        <Input 
                            title='Email'
                            placeholder = 'example@gmail.com'
                            onChangeText = {(value) => onChangeForm('email', value)}
                            // keyboardType = 'account'
                        />
                        <Input 
                            title='Alamat'
                            placeholder = 'Jl Raya Tabanan'
                            onChangeText = {(value) => onChangeForm('address', value)}
                        />
                    </View>
                    <Button
                        title = 'Register'
                        width = '80%'
                        onPress = {register}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

export default RegisterDownline

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
