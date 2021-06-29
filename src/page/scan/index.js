import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { Footer, Header } from '../../component'
import { colors } from '../../utils'

const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
);


const Scan = ({navigation, navigate}) => {

    const [data, setData] = useState(null)
    return (
            <View style={styles.container}>
                  <View style={styles.wrapper}>
                        <Header
                              title = 'Scan'
                              navigation = {() => navigation.goBack()}
                        />
                        <RNCamera
                            style={{ width : '100%',
                            height : '100%',
                            // position : 'absolute',
                            // top:0,
                            // left : 0,
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center',}}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.on}
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            onBarCodeRead={(barcode) => {
                                setData(barcode);
                                // console.log(barcode);
                                navigation.navigate('Transfer', {dataId : parseInt(barcode.data)})
                            }}
                        >
                            {({ status }) => {
                                if (status !== 'READY') return <PendingView />;
                            }}
                        </RNCamera>
                  </View>
                  <Footer
                    focus = 'Scan'
                    navigation = {navigation}
                  />
            </View>
    )
}

export default Scan

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
