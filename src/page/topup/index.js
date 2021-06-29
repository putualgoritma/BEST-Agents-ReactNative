import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { Button, Header, Spinner } from '../../component'
import { Rupiah } from '../../helper/Rupiah'
import API from '../../service'
import { Source } from '../../service/Config'
import { colors } from '../../utils'

const Nominal = (props) => {
    return (
        <TouchableOpacity style={[styles.nominal, {borderColor : props.borderColor}]} onPress={props.onPress} >
            <Text style={[styles.textNominal, {color : props.color}]}>Rp. {props.nominal}</Text>
        </TouchableOpacity>
    )
}

const Transfer = (props) => {
    return (
        <TouchableOpacity style={{width : '50%', padding : 10}} onPress={props.onPress} >
            <View style={[styles.transfer, {borderColor : props.borderColor}]}>
                <FontAwesomeIcon icon={faCreditCard} size={20} color={props.color}  />
                <Text style={[styles.textBoxTransfer, {color : props.color}]}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Topup = ({navigation}) => {
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [accountCash, setAccountCash] = useState(null);
    const [loading, setLoading] = useState(true);
    const [point, setPoint] = useState(0);
    const dateRegister = () => {
        let todayTime = new Date();
        let month = todayTime.getMonth() + 1;
        let day = todayTime.getDate();
        let year = todayTime.getFullYear();
        return year + "-" + month + "-" + day;
    }
    const [form, setForm] = useState({
            register : dateRegister(),
            customers_id : USER.id,
            memo : 'Top up poin',
            accounts_id : null,
            amount : 0,
    })

    const onChangeForm = (name, value) => {
        setForm({
              ...form,
              [name] : value
        })
    }


    useEffect( () => {
        let isAmounted = false
        if(!isAmounted) { 
            Promise.all([API.accountCash(TOKEN), API.point(USER.id, TOKEN)]) 
            .then((result) => { 
                // console.log(result);
                setAccountCash(result[0])
                setPoint(result[1].data[0].balance_points)
                setLoading(false) 
            }).catch((e) => {
                // console.log(e);
                alert('Mohon Buka Ulang Menu Topup')
                navigation.navigate('Home')
                setLoading(false)
            })
       }
        return () => {
              Source.cancel('cancel api')
              isAmounted = true;
        }
    }, [])

    const handleTopup = () => {
        if(form.accounts_id !== null && form.amount !== 0 && form.customers_id !== '' && form.memo !== '' && form.register !== ''){
              setLoading(true)
              API.topup(form, TOKEN).then((result) => {
                    console.log(result);
                    setForm({
                          register : dateRegister(),
                          customers_id : USER.id,
                          memo : 'Top up poin',
                          accounts_id : null,
                          amount : 0,
                    });
                    navigation.navigate('Info', {notif : result.message, navigasi : 'Home'})
              }).catch((e) => {
                    console.log(JSON.parse(e.request._response).message)
                    alert('topup gagal')
                    setForm({
                          register : dateRegister(),
                          customers_id : USER.id,
                          memo : 'Top up poin',
                          accounts_id : null,
                          amount : 0,
                    });
                    setLoading(false)
              })
        }else{
              alert('mohon isi data dengan lengkap');
              setLoading(false)
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
                              title = 'Topup'
                              navigation = {() => navigation.goBack()}
                        />
                        <ScrollView
                            keyboardShouldPersistTaps = 'always'
                        >
                            <View style={styles.body}>
                                <View style={styles.boxInfo}>
                                    <FontAwesomeIcon icon={faCreditCard} size={30} color={colors.default} />
                                    <View style={styles.boxTextInfo}>
                                        <Text style={{fontWeight:'bold', fontSize : 17}}>BEST Poin</Text>
                                        <Text>{Rupiah(parseInt(point))}</Text>
                                    </View>
                                </View>
                                <View style={styles.hr} />
                                <View style={styles.boxTopup}>
                                    <Text style={{fontSize:20, fontWeight : 'bold'}}>Pilih Nominal Topup</Text>
                                    <View style={styles.boxNominal}>
                                        <Nominal nominal ={20000} onPress= {() => onChangeForm('amount', 200000)} borderColor = {form.amount === 200000 ? colors.default : colors.shadow} color = {form.amount === 200000 ? colors.default : '#000000'}  />
                                        <Nominal nominal ={30000} onPress= {() => onChangeForm('amount', 300000)} borderColor = {form.amount === 300000 ? colors.default : colors.shadow} color = {form.amount === 300000 ? colors.default : '#000000'} />
                                        <Nominal nominal ={50000} onPress= {() => onChangeForm('amount', 500000)} borderColor = {form.amount === 500000 ? colors.default : colors.shadow} color = {form.amount === 500000 ? colors.default : '#000000'} />
                                    </View>
                                </View>
                                <Text>Atau Masukan Nominal Topup</Text>
                                <TextInput keyboardType='number-pad' defaultValue={String(form.amount)} style={styles.input} onChangeText ={(value) => onChangeForm('amount', value)} />
                                <View style={styles.hr} />  
                                <View>
                                    <Text style={{fontSize:20, fontWeight : 'bold'}}>Pilih Bank</Text>
                                    <View style={styles.boxTransfer}>
                                        {/* <Transfer name='BRI' onPress= {() => onChange('type', 'BRI')} borderColor = {form.type === 'BRI' ? colors.default : colors.shadow} color = {form.type === 'BRI' ? colors.default : '#000000'} />
                                        <Transfer name='BCA' onPress= {() => onChange('type', 'BCA')} borderColor = {form.type === 'BCA' ? colors.default : colors.shadow} color = {form.type === 'BCA' ? colors.default : '#000000'}/>
                                        <Transfer name='Kartu' onPress= {() => onChange('type', 'KARTU')} borderColor = {form.type === 'KARTU' ? colors.default : colors.shadow} color = {form.type === 'KARTU' ? colors.default : '#000000'}/> */}
                                        {accountCash && accountCash.map((item, index) => {
                                            return (
                                                <Transfer name={item.name} onPress= {() => onChangeForm('accounts_id', item.id)} borderColor = {form.accounts_id === item.id ? colors.default : colors.shadow} color = {form.accounts_id === item.id ? colors.default : '#000000'} key = {index}/>
                                            )
                                        })}
                                    </View>
                                </View>
                            <Button
                                    title = 'Topusp'
                                    width = '80%'
                                    onPress= {handleTopup}
                            />
                            </View>
                        </ScrollView>
                  </View>
            </View>
      )
}

export default Topup

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
    boxNominal : {
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical:20
    },
    nominal : {
        borderWidth : 1,
        borderColor : colors.shadow,
        borderRadius : 20,
        paddingVertical : 10,
        paddingHorizontal:18,
    }, 
    input : {
        // backgroundColor : '#f6f2f1',
        borderWidth : 1,
        borderColor : colors.shadow,
        paddingHorizontal : 20,
        borderRadius:10,
        marginVertical:20
    },
    boxTransfer : {
        flexDirection:'row',
        flexWrap : 'wrap'
    },
    transfer : {
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        padding:35,
        borderRadius:5,
        backgroundColor:'#FCFFFF',
        borderColor : colors.shadow
    }
})
