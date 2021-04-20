import React from 'react'
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview';

export default function NewDetail({ route, navigation }) {
    const { url } = route.params;

    if (url === '') {
        return (
            <View style={{ flex: 1, backgroundColor: "#13141C", alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ color: '#FFF', fontSize: 36, fontFamily: "Poppins-SemiBold" }}>Sem link para a matéria :(</Text>
            </View>
        )
    }else{
        return (
            <SafeAreaView style={{flex: 1}}>
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Image source={require('../assets/icons/left-arrow.png')}  style={{width: '10%', height: undefined, aspectRatio: 1}} />
                </TouchableOpacity>
                <WebView
                    source={{ uri: url }}
                    style={{ marginTop: 20}}
                />
            </SafeAreaView>
        )
    }
}
