import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {getDistance, getPreciseDistance} from 'geolib';
const Maps = () => {

  useEffect(() => {
    var dis = getDistance(
      {latitude: 20.0504188, longitude: 64.4139099},
      {latitude: 51.528308, longitude: -0.3817765},
    );

    console.log(dis);
  }, [])

  return (
    <View>
      <Text>Maps</Text>
    </View>
  )
}

export default Maps

const styles = StyleSheet.create({})
