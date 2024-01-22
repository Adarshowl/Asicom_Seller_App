import React, { memo, useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, ImageBackground, Modal } from 'react-native';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToolBarIcon from '../../utils/ToolBarIcon';
import { STRING } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useTranslation } from 'react-i18next';
import { FONTS } from '../../constants/Fonts';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';


const DeleteConfirmationModal = ({ visible, onCancel, onConfirm, item }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [count, setCount] = useState(1);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={[styles.modalContainer, {
        // backgroundColor: "#B3B3B3"
        // backgroundColor: theme?.colors?.transparent
      }]}>
        <View style={[styles.modalContent, {
          backgroundColor: theme?.colors?.bg_color_onBoard
        }]}>
          <View style={{
            width: '20%',
            height: 3,
            backgroundColor: theme?.colors?.grey,
            // borderWidth:1,
            alignSelf: 'center',
            marginTop: 5,
            marginBottom: 10
          }}></View>
          <Text style={[styles.textName, {
            color: theme?.colors?.textColor
          }]}>Remove From Cart?</Text>
          <View style={styles.divLine} />

          {/* <Text style={styles.itemName}>{item?.name}</Text> */}


          {/* <CartItem
            item={{
              image: item.image, // Pass the image URL or path
              name: item.name,   // Pass the item name
              // Add other item details as needed
            }}

          // ... other props
          /> */}

          <View
            style={[
              styles.wrapper,
              {
                elevation: 5,
                backgroundColor: theme?.colors?.bg
                // backgroundColor: theme?.colors?.bg_color_onBoard,
              },
            ]}>
            <View
              style={[GlobalStyle.flexRowAlignCenter, {
                paddingVertical: 5,
                alignItems: 'center',
                backgroundColor: theme?.colors?.bg
              }]}
            >
              <ImageBackground
                style={[styles.itemImage, {
                  backgroundColor: theme?.colors?.colorimageback,
                  alignItems: 'center',
                  justifyContent: 'center'
                }]}
              >
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    alignSelf: 'center',
                    margin: 8
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
                      styles.textNa,
                      {
                        alignSelf: 'flex-start',
                        color: theme?.colors?.white,
                      },
                    ]}
                    numberOfLines={1}>
                    {item?.name}
                  </Text>
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
                        color: theme?.colors?.white,
                        marginRight: 5
                      },
                    ]}>
                    Color
                  </Text>
                  <View
                    style={{
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
                        alignSelf: 'center',
                        width: '40%',
                        marginTop: 5,
                        backgroundColor: theme.colors.addtocart,
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
          <View style={styles.divLine} />

          <View style={[styles.buttonContainer, {
            // backgroundColor: theme?.colors?.bg
          }]}>
            <VegUrbanCommonBtn
              height={40}
              width={'48%'}
              borderRadius={20}
              textSize={16}
              textColor={theme.colors?.textColor}
              text={t('Cancel')}
              backgroundColor={theme?.colors?.colorimageback}
              onPress={onCancel}
              // onPress={() => {
              //   navigation.navigate('Checkout');
              // }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
            <VegUrbanCommonBtn
              height={40}
              width={'48%'}
              borderRadius={20}
              textSize={16}
              textColor={theme.colors?.btnTextColor}
              text={t('Yes, Remove')}
              backgroundColor={theme?.colors?.colorPrimary}
              onPress={onConfirm}
              // onPress={() => {
              //   navigation.navigate('Checkout');
              // }}
              textStyle={{
                fontFamily: FONTS?.bold,

              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  divLine: {
    height: 0.5,
    width: '90%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
    marginBottom: 10
  },
  modalContent: {
    backgroundColor: COLORS?.white,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textName: {
    fontFamily: FONTS?.bold,
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 10,
    textAlign: 'center'
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0
  },
  textNa: {
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.regular,

    fontSize: 13,
    color: COLORS.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: COLORS.colorPrimary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
  
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
});
