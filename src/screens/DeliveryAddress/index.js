import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import ProductItem from '../Products/ProductItem';

const Search = ({navigation}) => {
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
        <VegUrbanCommonToolBar title={STRING.search} />
        <ToolBarIcon
          title={Ionicons}
          iconName={'cart'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.white,
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
          placeholder={STRING.search_by_product_name}
        />
        <Ionicons name={'close'} size={20} color={COLORS.black} />
      </View>
      <FlatList
        style={{
          paddingStart: 5,
          paddingEnd: 5,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 15,
        }}
        showsVerticalScrollIndicator={false}
        data={[1, 2]}
        numColumns={2}
        renderItem={({item, index}) => <ProductItem />}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
