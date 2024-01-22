import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  I18nManager,
  View,
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
import CartItem from './CartItem';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { FONTS } from '../../constants/Fonts';


const Cart = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);


  const [amount, setAmount] = useState(100);
  const [cartData, setCartData] = useState([
    {
      name: 'Sonia Headphone',
      image: 'https://cdn-icons-png.flaticon.com/512/772/772183.png',
      
      fav: true,
    },
    {
      name: 'Mini Leather Bag',
      image: "https://wwd.com/wp-content/uploads/2023/08/Kate-Spade-Sam-Tote.png?w=300",
    
      fav: true,
    },
    {
      name: 'Puma Casual Shoes',
      image: 'https://e7.pngegg.com/pngimages/107/770/png-clipart-black-shoe-illustration-sneakers-adidas-computer-icons-shoe-running-running-shoes-miscellaneous-white.png',
      fav: true,
    },
    {
      name: 'Fujifilm Camera',
      image: 'https://e7.pngegg.com/pngimages/315/760/png-clipart-black-dslr-camera-camera-lens-graphy-icon-slr-camera-lens-camera-icon.png',
      fav: true,
    },

    {
      name: 'Zonio SuperWatch',
      image: 'https://e7.pngegg.com/pngimages/686/779/png-clipart-round-silver-colored-chronograph-watch-with-black-band-watch-rolex-datejust-watch-free-image-file-formats-watch-accessory.png',

      fav: true,
    },
    {
      name: 'Gucci Leather Bag',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh0VI0Hs0YFFTbZQ47INOmGOtpePYRcmc87g&usqp=CAU',
      fav: true,
    },
  ]);
 
  const [saveLaterData, setSaveLaterData] = useState([]);

  const onAddClick = idx => {
    let a = cartData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.count = parseInt(temp.count) + 1;
        setAmount(prev => prev + 10);
      }

      return temp;
    });

    setCartData(a);
  };
  const onMinusClick = idx => {
    let a = cartData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        if (temp?.count > 1) {
          temp.count = parseInt(temp.count) - 1;
          setAmount(prev => prev - 10);
        } else {
          setAmount(100);
        }
      }
            return temp;
    });

    setCartData(a);
  };

  const onDeleteClick = idx => {
    let a = cartData.filter((item, index) => item?.name != idx);

    setCartData(a);
  };
  const onSaveLaterClick = idx => {
    let a = cartData.filter((item, index) => item?.name == idx);
    setSaveLaterData([...saveLaterData, ...a]);
    let b = cartData.filter((item, index) => item?.name != idx);
    setCartData(b);
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
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
          title="Cart"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
            fontFamily: FONTS?.bold
          }}
          textStyle={{
            color: theme.colors.white,
            fontFamily: FONTS?.bold,
            fontSize: 20
          }}
        />
        <AntDesign
          name={'search1'}
          size={26}
          style={{
            marginEnd: 15
          }}
          color={theme?.colors?.white}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
       
        <FlatList
          style={{
            paddingStart: 5,
            paddingEnd: 5,

          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          showsVerticalScrollIndicator={false}
          data={cartData}
          renderItem={({ item, index }) => (
            <CartItem
              fromSave={true}
              item={item}
              onAdd={() => {
                onAddClick(index);
              }}
              onMinus={() => {
                onMinusClick(index);
              }}
              onDelete={() => {
                onDeleteClick(item?.name);
              }}
              onSaveLater={() => {
                onSaveLaterClick(item?.name);
              }}
            />
          )}
        />

       
      </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            borderRadius: 5,
            paddingHorizontal: 5,
            marginVertical: 0,
            marginHorizontal: 0,
            marginTop: 10,
            // paddingVertical:10,
            backgroundColor: theme?.colors?.bg,
          }}>
          <View
            style={{
              paddingStart: 5,

            }}>
            <Text
              style={{
                fontFamily: FONTS?.medium,
                fontSize: 16,
                // fontWeight:'bold',
                color: theme?.colors?.textColor,
                marginLeft: 20
              }}>
              Total Price
                          </Text>
            <Text
              style={{
                fontFamily: FONTS?.bold,

                fontSize: 20,
                color: theme?.colors?.colorPrimary,
                marginLeft: 20

              }}>
              {STRING.APP_CURRENCY}{amount}.00
            </Text>
          </View>
          <View
            style={{
              // flex: 1,
              marginRight: 50
            }}
          />
          <VegUrbanCommonBtn
            height={40}
            width={'55%'}
            borderRadius={20}
            textSize={16}
            iconPosition={'right'}
            icon={
              <Octicons
                name={"arrow-right"}
                size={20}
                color={theme?.colors?.btnTextColor}
                style={{
                  marginHorizontal: 20,
                  marginStart: 30
                }} />
            }
            textColor={theme.colors?.btnTextColor}

            text={t('Check Out')}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              navigation.navigate('Checkout');
            }}
            textStyle={{
              fontFamily: FONTS?.bold
            }}
          />
        </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
