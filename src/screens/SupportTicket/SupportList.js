import React, {memo, useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useSelector} from 'react-redux';

const SupportList = ({item}) => {
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);

  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UpdateSupportT', {item});
      }}
      activeOpacity={0.8}
      style={[
        styles.wrapper,
        {
          // backgroundColor: '#F2F3F4',
          elevation: 5,
          //   backgroundColor: theme?.colors?.bg
          // backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.flexRowAlignCenter,
          {
            paddingVertical: 5,
            alignItems: 'center',
            paddingHorizontal: 5,
            // backgroundColor:'#373a43'
            //   backgroundColor: theme?.colors?.bg
          },
        ]}>
        <View style={styles.innnerWrapper}>
          <View
            style={[
              {
                flexWrap: 'wrap',
                // marginTop: 5
              },
              // GlobalStyle.flexRowAlignCenter,
            ]}>
            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: appPrimaryColor,
                  fontFamily: FONTS?.bold,
                },
              ]}
              numberOfLines={1}>
              {item?.ticketId}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  marginTop: 2,
                },
              ]}>
              User Name
            </Text>
            <Text
              style={[
                styles.textName,
                {
                  // alignSelf: 'flex-start',
                  textAlign: 'right',
                  color: COLORS?.black,
                  flex: 1,
                  marginStart: 10,
                  // fontFamily: FONTS?.bold
                },
              ]}>
              {item?.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 2,
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                },
              ]}>
              Category
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  // alignSelf: 'flex-start',
                  textAlign: 'right',
                  color: COLORS?.black,
                  flex: 1,
                  marginStart: 10,
                  // fontFamily: FONTS?.bold
                },
              ]}
              numberOfLines={1}>
              {item?.category}
            </Text>
          </View>
         
          <View
            style={{
              marginTop: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                },
              ]}>
              Date
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: COLORS?.black,
                  // fontFamily: FONTS?.bold
                },
              ]}
              numberOfLines={1}>
              {moment(item?.createdAt).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 2,
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                },
              ]}>
              Status
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color:
                    item?.status === 'Active'
                      ? COLORS?.green
                      : item?.status === 'Deactive'
                      ? COLORS?.red
                      : COLORS?.black,
                  fontFamily: FONTS?.bold,
                },
              ]}
              numberOfLines={1}>
              {item?.status}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 2,
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  alignSelf: 'flex-start',
                  // marginTop: 2,
                },
              ]}>
              Subject :
            </Text>

            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: COLORS?.black,
                  flex: 1,
                  marginStart: 5,
                  // backgroundColor: 'red',
                  // fontFamily: FONTS?.bold
                },
              ]}
              numberOfLines={2}>
              {item?.subject}
            </Text>
          </View>

          <View
            style={{
              // alignItems: 'flex-end'
              alignItems: 'center',
            }}>
            <VegUrbanCommonBtn
              height={30}
              width={'45%'}
              borderRadius={10}
              textSize={13}
              marginTop={10}
              // textColor={COLORS?.white}

              textColor={appPrimaryColor}
              text={'View Details'}
              backgroundColor={COLORS?.bg_gray}
              onPress={() => {
                navigation.navigate('SupportDetails', {item});
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(SupportList);
const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    // borderWidth: 0.1
    // paddingVertical:5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius: 10,
  },
  innnerWrapper: {
    flex: 1,
    marginTop: 0,
  },
  textName: {
    fontFamily: FONTS?.regular,
    fontSize: 14,
    color: COLORS.black,
  },
});
