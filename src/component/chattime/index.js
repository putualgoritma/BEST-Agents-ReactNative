import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IsMe from './isMe'
import Other from './other'

const index = (props) => {
    if(props.IsMe){
        return <IsMe text={props.text} date={props.date} />
    }
    return <Other text={props.text} date={props.date} />
}

export default index

const styles = StyleSheet.create({})
