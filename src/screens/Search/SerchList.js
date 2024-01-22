import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    I18nManager,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import { images, STRING } from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { FONTS } from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';

const SerchList = ({ item, onPress, theme, index, favData, setFavData }) => {
   
    const navigation = useNavigation()
    // const theme = useContext(themeContext);
    const { t } = useTranslation();
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);


    const [amount, setAmount] = useState(100);
    return (
        <View
            style={[
                //   styles.itemWrapper,
                {
                    // marginHorizontal: 2,
                    // width: '500%',
                    flex: 0.5,
                    // // marginVertical: 5,
                },
            ]}
        >
            <TouchableOpacity
                style={[
                    styles.itemWrapper,
                    {
                        // backgroundColor: theme.colors.bg_color,

                        // backgroundColor: theme.colors.mainContainerBgColor,
                    },
                ]}
                activeOpacity={0.8}
                onPress={() => {
                    onPress
                    navigation.navigate('ProductDetail', { item: item });
                }}>
                <ImageBackground

                    style={[styles.itemImage, {
                        // backgroundColor:"#F2F4F4",
                        backgroundColor: theme?.colors?.colorimageback,
                        alignItems: 'center',
                        // alignSelf: 'center',
                        justifyContent: 'center',

                    }]}

                >
                    <View style={{ position: 'absolute', top: 8, right: 0 }}>
                        <ToolBarIcon
                            title={Octicons}
                            iconName={item.fav ? 'heart' : 'heart-fill'}
                            icSize={14}
                            icColor={item.fav ? theme?.colors?.hearttext : theme?.colors?.hearttext}
                            style={{
                                backgroundColor: theme?.colors?.heart,
                                borderRadius: 30,
                                width: 25,
                                height: 25
                            }}
                            onPress={() => {
                                // const updatedData = [...favData];
                                // updatedData[index].fav = !item.fav;
                                // setFavData(updatedData);
                              }}
                        />
                    </View>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            alignItems: 'center',
                            // alignSelf: 'center',
                            // resizeMode: 'center',
                            // marginTop: 30
                        }}
                        // style={styles.itemImage}
                        source={{
                            uri: item?.image,
                        }}
                    />
                </ImageBackground>

            </TouchableOpacity>
            <Text
                style={[
                    styles.itemName,
                    {
                        color: theme.colors.textColor,
                        marginTop: 10,
                        fontFamily: FONTS?.bold,
                        marginLeft:7

                        // fontWeight:'bold'
                        // color: theme.colors.textColor,
                        // alignItems:'center'
                        // alignSelf: 'flex-start',
                    },
                ]}
                numberOfLines={1}>
                {item?.name}
            </Text>
            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft:5
                }}
            // style={GlobalStyle.flexRowAlignCenter}
            >
                <AntDesign
                    name={'star'} size={20}
                    color={theme?.colors?.textColor}
                />
                <Text style={[styles.itemPrice, {
                    color: theme.colors.textColor,
                    marginLeft: 5,
                    alignItems: 'center',
                    // marginBottom: 5

                }]}>
                    4.3
                </Text>
                <View
                    style={{
                        // width: 0,
                        // height: 13,
                        paddingVertical: 6,
                        borderWidth: 0.8,
                        borderColor: theme?.colors?.white,
                        marginStart: 7,
                        marginEnd: 10,
                    }}
                />
                <View
                    style={{
                        backgroundColor: theme?.colors?.colorimageback,
                        paddingHorizontal: 15,
                        borderRadius: 5,
                        padding: 5,
                        marginTop: 5

                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            fontFamily: FONTS?.bold,

                            color: theme?.colors?.textColor

                        }}
                    >11.3k sold</Text>
                </View>
            </View>
            <Text style={[styles.itemPrice,

            { color: theme.colors.white,
                marginLeft:7,
                fontFamily:FONTS?.bold

             }]}>
                {STRING.APP_CURRENCY}120.00
            </Text>

        </View>
    );
};
export default SerchList;

const styles = StyleSheet.create({
    itemWrapper: {
        flex: 1,
        borderRadius: 5,
        // marginVertical: 10,
        paddingBottom: 0,
        padding: 5,
        // alignItems: 'center',
        borderRadius: 10,
        alignItems: 'center'
    },
    Wrapper: {
        marginTop: 10,
        flex: 1,
        // margin: 5,
        marginVertical: 2,
        // backgroundColor: COLORS.bg_color,
        // borderRadius: 5,
        // maxWidth: SIZES.width / 2 - 10,
        paddingBottom: 5,
        padding: 5,
        // alignItems: 'center',
        borderRadius: 10,
    },
    itemImage: {
        width: '100%',
        height: 170,
        borderRadius: 20,
        // resizeMode: 'center',
        alignItems: 'center',
        resizeMode: 'stretch',
        // marginBottom: 10

    },
    itemName: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 16,
        color: COLORS.black,
        marginTop: 2,

    },
    itemPrice: {
        fontSize: 16,
        fontFamily: FONTS?.regular
    },
    itemOriPrice: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 11,
        textDecorationLine: 'line-through',
        color: COLORS.gray,
        marginStart: 5,
    },
});

