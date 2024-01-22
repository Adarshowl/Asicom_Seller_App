import React, { memo, useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToolBarIcon from '../../utils/ToolBarIcon';
import { STRING } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { FONTS } from '../../constants/Fonts';


const CartItem = ({
  item,
  onAdd,
  onMinus,
  onDelete,
  onSaveLater,
  fromSave,
  onSaveRemove,
}) => {
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);

  return (
    <View
      // activeOpacity={0.8}
      style={[
        styles.wrapper,
        {
          // backgroundColor: '#F2F3F4',
          elevation: 5,
          backgroundColor: theme?.colors?.bg
          // backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[GlobalStyle.flexRowAlignCenter, {
          paddingVertical: 5,
          alignItems: 'center',
          // backgroundColor:'#373a43'
          backgroundColor: theme?.colors?.bg

        }]}
      >
        <ImageBackground
          style={[styles.itemImage, {
            // backgroundColor:"#F2F4F4",
            backgroundColor: theme?.colors?.colorimageback,
            alignItems: 'center',
            // alignSelf: 'center',
            justifyContent:'center'
          }]}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              alignSelf: 'center',
              margin: 8,
              // resizeMode:'contain',
              borderRadius: 10,
              // marginTop: 30
            }}
            // style={styles.itemImage}
            source={{
              uri: item?.image,
            }}
          />
        </ImageBackground>
        <View style={styles.innnerWrapper}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: theme?.colors?.white,
                },
              ]}
              numberOfLines={1}>
              {item?.name}
            </Text>
            <MaterialIcons
              name='delete-outline'
              size={22}
              color={theme?.colors?.textColor}
              style={{
                marginEnd: 10
              }}
              onPress={toggleModal}
            />
            <DeleteConfirmationModal
              visible={isModalVisible}
              onCancel={toggleModal}
              onConfirm={() => {
                // Handle delete action here
                toggleModal();
              }}
              item={item}
            />

          </View>
          <View
            style={[
              {
                flexWrap: 'wrap',
                marginTop: 5
              },
              GlobalStyle.flexRowAlignCenter,
            ]}>
            <View
              style={{
                borderRadius: 20,
                width: 15,
                height: 15,
                backgroundColor: theme?.colors?.gray,
                marginEnd: 10,
                marginTop: 8,
                marginBottom: 8
              }}
            />
            <Text
              style={[
                styles.discountPrice,
                {
                  // color: COLORS?.black,
                  color: theme?.colors?.white,
                  // color: theme?.colors?.,
                  marginRight: 5
                },
              ]}>
              Color
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
            <Text
              style={[
                styles.discountPrice,
                {
                  color: theme?.colors?.white,
                },
              ]}>
              Size = S
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
            <Text
              style={[
                styles.discountPrice,
                {
                  color: theme?.colors?.white,
                },
              ]}>
              Qty = 1
            </Text>

          </View>
         
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Text
              style={[
                styles.finalPriceText,
                {
                  alignSelf: 'flex-start',
                  color: theme?.colors?.colorPrimary,
                  marginTop: 5
                },
              ]}>
              {STRING.APP_CURRENCY} 200.00
            </Text>
            <View
              style={[
                GlobalStyle.flexRowAlignCenter,
                {
                  paddingVertical: 5,
                  // marginHorizontal: 15,
                  alignSelf: 'center',
                  // flex: 1,
                  width: '40%',
                  marginTop: 5,
                  backgroundColor: theme.colors.addtocart,

                  // backgroundColor: "#E5E8E8",
                  borderRadius: 20,
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 2
                },
              ]}>
              <AntDesign
                name='minus'
                size={18}
                color={theme?.colors?.textColor}
                onPress={() => {
                  setCount(prev => (prev > 1 ? prev - 1 : prev));
                }}
              />
              <Text
              numberOfLines={1}
                style={[
                  styles.qtyText,
                  {
                    color: theme.colors.white,
                  },
                ]}>
                {count}
              </Text>
              <AntDesign
                name='plus'
                size={18}
                color={theme?.colors?.textColor}
                onPress={() => {
                  setCount(prev => prev + 1);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(CartItem);
const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    borderRadius: 10,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    // paddingVertical:5
  },
  itemImage: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius: 10

  },
  qtyText: {
    fontFamily: FONTS?.regular,
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
    // flex: 0.3,
  },
  image: {
    height: 90,
    width: '28%',
    // margin:6,
    marginTop: 5,
    resizeMode: 'stretch',
    borderRadius: 5,
    // paddingTop:10
    // resizeMode:'contain',
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0
  },
  textName: {
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.bold,

    fontSize: 13,
    color: COLORS.black,
  },
  finalPriceText: {
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.colorPrimary,
    marginTop: 3,
  },
});
