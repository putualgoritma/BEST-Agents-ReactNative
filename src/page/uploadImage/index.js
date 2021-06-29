import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import Config from 'react-native-config'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import RNFetchBlob from 'rn-fetch-blob'
import { Button, Header, Spinner } from '../../component'
import { SET_DATA_USER } from '../../redux/action'
import { colors } from '../../utils'

const UploadImage = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const dispatch = useDispatch();
    const [image, setImage] = useState({
        name : null,
        filename : null,
        data : null
    })
    const USER = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenReducer);

    const getFoto = () => {
        Alert.alert(
            'Image',
            `Pilih Image ? `,
            [
                {
                    text : 'Kamera',
                    onPress : () => handleCamera()
                },
                {
                    text : 'Galeri',
                    onPress : () => handleGaleri()
                }
            ]
        )
    }

    const handleCamera = () => {
        launchCamera(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 1000,
              maxWidth: 1000,
            },
            (response) => {
                setResponse(response);
                setImage({
                    name : 'img',
                    filename : response.fileName,
                    data : response.base64
                })
            },
        )
    }

    const handleGaleri = () => {
        launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 1000,
              maxWidth: 1000,
            },
            (response) => {
                setResponse(response);
                setImage({
                    name : 'img',
                    filename : response.fileName,
                    data : response.base64
                })
            },
        )
    }

    const handleUploadPhoto = () => {
        setLoading(true)
        RNFetchBlob.fetch(
            'POST',
            Config.REACT_APP_BASE_URL + Config.REACT_APP_API_UPLOAD_IMG + '/' + USER.id,
            {
              Authorization: `Bearer ${TOKEN}`,
              otherHeader: 'foo',
              'Accept' : 'application/json' ,
              'Content-Type': 'multipart/form-data',
            },
            [
              // name: image adalah nama properti dari api kita
              {name: 'img', filename: response.fileName, data: response.base64},
            ],
          ).then((result) => {
                let data = JSON.parse(result.data)
              dispatch(SET_DATA_USER(data.data))
              storeDataUser(data.data)
              navigation.navigate('Info', {notif : 'Profile diupdate', navigasi : 'Home'} )
              setLoading(false)
          }).catch((e) => {
              console.log(e);
              setLoading(false)
          })
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
                            title = 'Upload Image'
                            navigation = {() => navigation.goBack()}
                    />
                        <View style={{flex : 1, flexDirection : 'column', justifyContent :'center'}}>
                            {response && (
                                <View style={styles.image}>
                                    <Image
                                        style={{width: 500, height: 500}}
                                        source={{uri: response.uri}}
                                    />
                                </View>
                            )}
                            <Button 
                                title = 'Pilih Gambar'
                                width = '80%'
                                  onPress= {getFoto}
                            />
                            {response &&   <Button 
                                title = 'Upload Image'
                                width = '80%'
                                onPress= {handleUploadPhoto}
                                color = {colors.active}
                            />}
                        </View>
                </View>
            </View>
      )
}

export default UploadImage

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#ffffff'
    },
    wrapper : {
        flex : 1,
        // justifyContent : 'center'
    },
    image : {
        alignItems : 'center',
        marginBottom : 10
    }
})
