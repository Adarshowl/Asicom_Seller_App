import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddressItem = ({item, show}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.wrapper}
      onPress={() => {}}>
      <MaterialCommunityIcons
        // name={'circle-outline'}
        name={show ? 'circle-slice-8' : 'circle-outline'}
        size={25}
        color={COLORS.colorPrimary}
      />
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-Medium',
              fontSize: 15,
              color: COLORS.colorPrimary,
              marginStart: 5,
              flexWrap: 'wrap',
              flexGrow: 1,
              maxWidth: 180,
            }}
            numberOfLines={2}>
            test address test
          </Text>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Medium',
                fontSize: 12,
                color: COLORS.white,
                backgroundColor: COLORS.colorPrimary,
                marginStart: 10,
                paddingHorizontal: 5,
                borderRadius: 10,
                textAlignVertical: 'center',
              }}
              numberOfLines={2}>
              Home
            </Text>
            {show ? (
              <Text
                style={{
                  fontFamily: 'OpenSans-Medium',
                  fontSize: 12,
                  color: COLORS.white,
                  backgroundColor: COLORS.colorPrimary,
                  marginStart: 5,
                  paddingHorizontal: 5,
                  borderRadius: 10,
                  textAlignVertical: 'center',
                }}
                numberOfLines={2}>
                Default
              </Text>
            ) : null}
            <MaterialIcons
              name={'edit'}
              color={COLORS.gray}
              size={20}
              style={{
                // marginHorizontal: 5,
                marginStart: 5,
              }}
            />
            <MaterialIcons
              name={'delete'}
              color={COLORS.gray}
              size={20}
              style={{
                marginHorizontal: 5,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5,
            marginStart: 5,
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 14,
              color: COLORS.black,
            }}>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(AddressItem);

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
    marginBottom: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
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
