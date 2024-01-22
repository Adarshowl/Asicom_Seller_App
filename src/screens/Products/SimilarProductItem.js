import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {STRING} from '../../constants';
import ToolBarIcon from '../../utils/ToolBarIcon';
import {ShowToastMessage} from '../../utils/Utility';

const ProductItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.wrapper}
      onPress={() => {
        navigation.navigate('ProductDetail');
      }}>
      <View
        style={{
          height: 125,
          width: '100%',
        }}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/4020559/pexels-photo-4020559.jpeg?auto=compress&cs=tinysrgb&w=600',
          }}
          style={{
            height: 128,
            borderRadius: 10,
            width: '100%',
          }}
        />
        <Image
          style={{
            position: 'absolute',
            bottom: 5,
            right: 10,
            height: 10,
            width: 10,
          }}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9WDy2HXg7Qd9J7wq_Qbv07kxtkgMl70on7U0V6qdHQ&s',
          }}
        />

        <AntDesign
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
          }}
          name="hearto"
          color={COLORS.grey}
          size={20}
        />
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 11,
            color: COLORS.bitter_sweet,
            backgroundColor: COLORS.pale_pink,
            position: 'absolute',
            left: 0,
            top: 0,
            padding: 4,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
          numberOfLines={1}>
          15% off
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 5,
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 14,
            color: COLORS.colorPrimary,
          }}>
          ₹ 40.00
        </Text>
        <Text
          style={{
            fontFamily: 'OpenSans-Regular',
            fontSize: 12,
            textDecorationLine: 'line-through',
            color: COLORS.gray,
            marginStart: 5,
            textDecorationColor: COLORS.black,
          }}>
          ₹ 60.00
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'OpenSans-Medium',
          fontSize: 14,
          color: COLORS.black,
          textAlign: 'center',
        }}
        numberOfLines={2}>
        Product name Product
      </Text>
      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          fontSize: 14.5,
          color: COLORS.grey,
          textAlign: 'center',
          marginTop: 1,
        }}
        numberOfLines={2}>
        200 gm
      </Text>
      <VegUrbanCommonBtn
        height={35}
        width={'93%'}
        borderRadius={3}
        textSize={14}
        textColor={COLORS.white}
        text={STRING.add_to_cart}
        marginTop={23}
        backgroundColor={COLORS.colorPrimary}
        onPress={() => {}}
        textStyle={{
          fontFamily: 'OpenSans-Medium',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <ToolBarIcon
          title={AntDesign}
          iconName={'minus'}
          icSize={15}
          icColor={COLORS.colorPrimary}
          style={{
            marginStart: 10,
            height: 25,
            width: 25,
          }}
          onPress={() => {
            ShowToastMessage('hi person');
          }}
        />
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 16,
            color: COLORS.black,
            textAlign: 'center',
            flex: 1,
          }}>
          1
        </Text>
        <ToolBarIcon
          title={AntDesign}
          iconName={'plus'}
          icSize={15}
          icColor={COLORS.colorPrimary}
          style={{
            marginStart: 10,
            height: 25,
            width: 25,
          }}
          onPress={() => {
            ShowToastMessage('hi person');
          }}
        />
      </View>
      <View
        style={{
          paddingBottom: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default memo(ProductItem);
// export default ProductItem;

const styles = StyleSheet.create({
  imageStyle: {
    // height: 120,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    resizeMode: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    elevation: 5,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    maxHeight: 35,
    minHeight: 35,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'OpenSans-Bold',
    color: COLORS.black,
    backgroundColor: COLORS.search_bg_grey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
