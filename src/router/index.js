import React from 'react'
import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { Agen, Cart, Chatting, Checkout, ForgetPassword, History, HistoryOrder, HistoryOrderDetail, HistoryOrderMasuk, HistoryOrderMasukDetail, HistoryPoint, Home, ListMitra, ListProduct, Login, LogNotif, Maps, Menu, Notif, Product, Profile, Register, RegisterDownline, Splash, Topup, Transfer, UploadImage, Withdraw, ListChatting } from '../page';
import Scan from '../page/scan';
import { activasiDownline, Info } from '../component';

const Router = () => {
      const Stack = createStackNavigator();
      return (
            <Stack.Navigator initialRouteName={'Splash'}>
                  <Stack.Screen
                        name="Maps"
                        component={Maps}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Splash"
                        component={Splash}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Product"
                        component={Product}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Topup"
                        component={Topup}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Transfer"
                        component={Transfer}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="History"
                        component={History}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Menu"
                        component={Menu}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Cart"
                        component={Cart}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Scan"
                        component={Scan}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="RegisterDownline"
                        component={RegisterDownline}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="ListProduct"
                        component={ListProduct}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="ListMitra"
                        component={ListMitra}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Withdraw"
                        component={Withdraw}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Info"
                        component={Info}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Agen"
                        component={Agen}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Checkout"
                        component={Checkout}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="ActivasiDownline"
                        component={activasiDownline}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="UploadImage"
                        component={UploadImage}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="HistoryPoint"
                        component={HistoryPoint}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="HistoryOrder"
                        component={HistoryOrder}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="HistoryOrderMasuk"
                        component={HistoryOrderMasuk}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="HistoryOrderMasukDetail"
                        component={HistoryOrderMasukDetail}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="HistoryOrderDetail"
                        component={HistoryOrderDetail}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="ForgetPassword"
                        component={ForgetPassword}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="LogNotif"
                        component={LogNotif}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Notif"
                        component={Notif}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="Chatting"
                        component={Chatting}
                        options={{headerShown: false}}  
                  />
                  <Stack.Screen
                        name="ListChatting"
                        component={ListChatting}
                        options={{headerShown: false}}  
                  />
            </Stack.Navigator>
      )
}

export default Router
