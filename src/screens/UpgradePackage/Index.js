import React, { useContext, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    I18nManager,
    ImageBackground,
    SafeAreaView
} from 'react-native'; import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { FONTS } from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';

const UpgradePackage = () => {


    const theme = useContext(themeContext);
    const [show, setShow] = useState(false);
    const navigation = useNavigation();


    return (
        <SafeAreaView

            style={{
                flex: 1,
                backgroundColor: COLORS?.white
            }}>
            <View
                style={[
                    GlobalStyle.commonToolbarBG,
                    {
                        backgroundColor: theme?.colors.bg_color_onBoard,
                        elevation: 5
                    },
                ]}>
                <Ionicons
                    name="ios-arrow-back"
                    color={theme.colors.white}
                    size={25}
                    style={[
                        styles.backIcon,
                        {
                            opacity: !show ? 1 : 0.0,
                            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                            marginStart: 10
                        },
                    ]}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />

                <VegUrbanCommonToolBar
                    title="Premium Package for seller"
                    style={{
                        backgroundColor: theme.colors.bg_color_onBoard,
                        marginStart: 10,
                        fontFamily: FONTS?.bold,
                        alinItem: 'center'
                    }}
                    textStyle={{
                        color: theme.colors.white,
                        fontFamily: FONTS?.bold,
                        fontSize: 18,
                        textAlin: 'center'

                    }}
                />

            </View>

            <View style={{
                flex: 1,
                marginHorizontal: 10,
                marginTop: 15
            }}>


                <TouchableOpacity
                    style={styles?.fileds}
                >
                    <View style={{
                        // alinItem:'center',
                        // justifyContent:'center'
                    }}>
                        <Image
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/128/4225/4225100.png"
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                resizeMode: 'center'
                            }}
                        />
                        <Text style={styles?.text}>Silver</Text>


                    </View>
                    <VegUrbanCommonBtn
                        height={35}
                        width={'70%'}
                        borderRadius={10}
                        textSize={16}
                        marginTop={10}
                        // textColor={COLORS?.white}
                        textColor={COLORS?.white}
                        text={('$10.000/9Days')}
                        backgroundColor={COLORS?.colorPrimary}
                        onPress={() => {
                            navigation.navigate('Products');
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,

                            // textTransform: 'uppercase',
                        }}
                    />
                    <Text style={styles?.prodcut}>100 Product Upload Limit</Text>


                </TouchableOpacity>


                {/* Delivery Boy Pickup Point */}
                <TouchableOpacity
                    style={styles?.fileds}
                >
                    <View style={{
                        // alinItem:'center',
                        // justifyContent:'center'
                    }}>
                        <Image
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/128/4225/4225100.png"
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                resizeMode: 'center'
                            }}
                        />
                        <Text style={styles?.text}>Gold</Text>


                    </View>
                    <VegUrbanCommonBtn
                        height={35}
                        width={'70%'}
                        borderRadius={10}
                        textSize={16}
                        marginTop={10}
                        // textColor={COLORS?.white}
                        textColor={COLORS?.white}
                        text={('$20.000/9Days')}
                        backgroundColor={COLORS?.colorPrimary}
                        onPress={() => {
                            navigation.navigate('Products');
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,

                            // textTransform: 'uppercase',
                        }}
                    />
                    <Text style={styles?.prodcut}>200 Product Upload Limit</Text>


                </TouchableOpacity>

                {/* Social Media Links */}
                <TouchableOpacity
                    style={styles?.fileds}
                >
                    <View style={{
                        // alinItem:'center',
                        // justifyContent:'center'
                    }}>
                        <Image
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/128/4225/4225100.png"
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                resizeMode: 'center'
                            }}
                        />
                        <Text style={styles?.text}>Platinum</Text>


                    </View>
                    <VegUrbanCommonBtn
                        height={35}
                        width={'70%'}
                        borderRadius={10}
                        textSize={16}
                        marginTop={10}
                        // textColor={COLORS?.white}
                        textColor={COLORS?.white}
                        text={('$50.000/9Days')}
                        backgroundColor={COLORS?.colorPrimary}
                        onPress={() => {
                            navigation.navigate('Products');
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,

                            // textTransform: 'uppercase',
                        }}
                    />
                    <Text style={styles?.prodcut}>500 Product Upload Limit</Text>


                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default UpgradePackage;
const styles = StyleSheet.create({
    fileds: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 16,
        borderBottomWidth: 1,
        // borderWidth: 0.2,
        borderColor: COLORS?.black,
        paddingHorizontal: 35,
        backgroundColor: COLORS?.bg_color,
        marginVertical: 10,
        borderRadius: 12,
        paddingVertical: 10,
        alinItem: 'center',
        marginHorizontal: 10,
        justifyContent: 'center',
    },

    text: {
        fontSize: 16,
        color: COLORS?.black,
        fontFamily: FONTS?.bold,
        // marginLeft: 18,
        textAlign: 'center',
        marginTop: 10
    },
    prodcut:{
        fontSize: 14,
        color: COLORS?.black,
        fontFamily: FONTS?.regular,
        // marginLeft: 18,
        textAlign: 'center',
        marginTop: 10
    }

})

