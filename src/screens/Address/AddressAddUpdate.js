import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';

const DeliveryAddress = ({navigation}) => {
  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.commonToolbarBG}>
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar title={STRING.delivery_address} />
        <ToolBarIcon
          title={Ionicons}
          iconName={'person'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.light_gray,
          paddingHorizontal: 5,
          marginHorizontal: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}>
        <Ionicons name={'search'} size={20} color={COLORS.colorPrimary} />
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: 'OpenSans-Regular',
            paddingStart: 5,
            marginStart: 5,
          }}
          placeholder={STRING.search_for_location}
        />
      </View>
      <View
        style={{
          height: 0.5,
          backgroundColor: COLORS.colorAccent,
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DeliveryMap');
        }}
        activeOpacity={0.8}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: COLORS.colorPrimary,
          padding: 5,
          margin: 10,
          marginHorizontal: 20,
        }}>
        <Ionicons name={'locate-outline'} size={25} color={COLORS.grey} />
        <Text
          style={{
            color: COLORS.grey,
            textAlign: 'center',
            marginHorizontal: 10,
            fontSize: 16,
            fontFamily: 'OpenSans-Medium',
          }}>
          {STRING.choose_current_location}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({});
