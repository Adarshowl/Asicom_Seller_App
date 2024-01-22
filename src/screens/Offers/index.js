import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {images, SIZES, STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Favorite = ({navigation}) => {
  const onFavClick = idx => {
    let a = favData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.fav = !temp.fav;
      }
      // ShowToastMessage('HI CLIXK' + temp.fav);

      return temp;
    });

    setFavData(a);
  };

  const [favData, setFavData] = useState([
    {
      name: 'test 1',
      image:
        'https://t4.ftcdn.net/jpg/02/71/66/91/360_F_271669174_2dHs4FO3SV83lQ4MjswEBa4LQTGjMO4E.jpg',
      price: '₹120.00',
      old: '₹100.00',
      rate: '2',
      qty: '2 kg',
      sold: '1.2k',
      fav: true,
    },
    {
      name: 'test 2',
      image:
        'https://media.istockphoto.com/id/185284489/photo/orange.jpg?s=612x612&w=0&k=20&c=m4EXknC74i2aYWCbjxbzZ6EtRaJkdSJNtekh4m1PspE=',
      price: '₹130.00',
      old: '₹80.00',
      qty: '1 kg',
      rate: '1',
      sold: '1.5k',
      fav: true,
    },
    {
      name: 'test 3',
      image:
        'https://media.istockphoto.com/id/171575811/photo/guava.jpg?s=612x612&w=0&k=20&c=cjVDpisFrT8JlqFbSEImkfsXgQbtrNCdSTILGAzIj2Q=',
      price: '₹50.00',
      old: '₹700.00',
      rate: '3',
      sold: '3.2k',
      qty: '3 kg',
      fav: true,
    },
    {
      name: 'test 4',
      image:
        'https://media.istockphoto.com/id/467328250/photo/mango.jpg?s=612x612&w=0&k=20&c=cYSHeExkHZVYQM6xkWehclgYDqkmB7o4E494xz5GbXs=',
      price: '₹1050.00',
      qty: '4 kg',
      old: '₹500.00',
      rate: '4',
      sold: '11.5k',
      fav: true,
    },
  ]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ProductDetail', {item: item});
        }}>
        <Image
          style={styles.itemImage}
          source={{
            uri: item?.image,
          }}
        />
        <AntDesign
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          name={item?.fav ? 'heart' : 'hearto'}
          color={item?.fav ? COLORS.bitter_sweet : COLORS.grey}
          size={20}
          onPress={() => onFavClick(index)}
        />
        <View
          style={{
            marginHorizontal: 8,
          }}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item?.name}
          </Text>
          <View style={GlobalStyle.flexRowAlignCenter}>
            <Text style={styles.itemPrice}>{item?.price}</Text>
            <Text style={styles.itemOriPrice}>{item?.price}</Text>
          </View>
        </View>
        <Text style={styles.offerText} numberOfLines={1}>
          {item?.rate}% off
        </Text>
        {/*<Text*/}
        {/*  style={{*/}
        {/*    fontFamily: 'OpenSans-SemiBold',*/}
        {/*    fontSize: 11,*/}
        {/*    color: COLORS.red,*/}
        {/*    position: 'absolute',*/}
        {/*    left: 0,*/}
        {/*    top: 0,*/}
        {/*    padding: 3,*/}
        {/*    borderTopLeftRadius: 5,*/}
        {/*    borderTopRightRadius: 5,*/}
        {/*    borderBottomRightRadius: 5,*/}
        {/*  }}*/}
        {/*  numberOfLines={1}>*/}
        {/*  Out of stock*/}
        {/*</Text>*/}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: COLORS.bg_color,
        },
      ]}>
      <View style={GlobalStyle.commonToolbarBG}>
        <Image source={images.app_logo} style={GlobalStyle.toolbarAppIcon} />
        <VegUrbanCommonToolBar title={STRING.hi_user} />
        <ToolBarIcon
          title={Ionicons}
          iconName={'search'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 0,
          }}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
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
      {/*<View style={GlobalStyle.alignJustifyCenter}>*/}
      {/*  <AntDesign name={'heart'} size={80} color={COLORS.gray} />*/}
      {/*  <Text style={styles.no_wish}>{STRING.no_wish_list_found}</Text>*/}
      {/*  <Text style={styles.no_wish_item}>*/}
      {/*    {STRING.you_have_no_wish_list_items_yet}*/}
      {/*  </Text>*/}
      {/*  <Text style={styles.no_wish_item}>*/}
      {/*    {STRING.tap_the_heart_shape_of_items_to_add_one}*/}
      {/*  </Text>*/}
      {/*</View>*/}

      <FlatList
        style={{
          paddingStart: 5,
          paddingEnd: 5,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        data={favData}
        numColumns={2}
        // renderItem={({item, index}) => (
        //   <FavoriteProductItem
        //     item={item}
        //     onFavClick={() => onFavClick(index)}
        //   />
        // )}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  no_wish: {
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: 'OpenSans-Bold',
    color: COLORS.gray,
    fontSize: 18,
  },
  no_wish_item: {
    marginHorizontal: 15,
    marginTop: 15,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.gray,
    fontSize: 16,
  },
  itemWrapper: {
    flex: 1,
    margin: 5,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    maxWidth: SIZES.width / 2 - 10,
    paddingBottom: 5,
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    resizeMode: 'center',
  },
  itemName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.black,
    marginTop: 5,
  },
  itemPrice: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.black,
  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  offerText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 11,
    color: COLORS.bitter_sweet,
    backgroundColor: COLORS.pale_pink,
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
