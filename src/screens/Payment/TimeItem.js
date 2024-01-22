import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {COLORS} from '../../constants/Colors';

const DateItem = ({item, show}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {
          backgroundColor: show ? COLORS.colorPrimary : COLORS.white,
        },
      ]}
      onPress={() => {}}>
      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          fontSize: 14,
          color: show ? COLORS.white : COLORS.gray,
          flexWrap: 'wrap',
        }}>
        Day
      </Text>
      <Text
        style={{
          fontFamily: 'OpenSans-Bold',
          fontSize: 17,
          color: show ? COLORS.white : COLORS.gray,

          flexWrap: 'wrap',
          marginVertical: 2,
        }}>
        29
      </Text>
      <Text
        style={{
          fontFamily: 'OpenSans-Regular',
          fontSize: 14,
          color: show ? COLORS.white : COLORS.gray,
          flexWrap: 'wrap',
        }}>
        Mon
      </Text>
    </TouchableOpacity>
  );
};

export default memo(DateItem);

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
    backgroundColor: COLORS.white,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
    marginHorizontal: 5,
    width: 60,
    height: 80,
    padding: 10,
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
