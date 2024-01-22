import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ShowToastMessage} from '../../utils/Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import RNRestart from 'react-native-restart';

const Language = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const [currentLanguage, setLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
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
    {name: 'English', code: 'en', selected: false},
    {name: 'हिंदी', code: 'hi', selected: false},
    {name: 'Chinese', code: 'zh', selected: false},
    {name: 'Japanese', code: 'ja', selected: false},
    {name: 'German', code: 'de', selected: false},
    {name: 'French', code: 'fr', selected: false},
    {name: 'Russian', code: 'ru', selected: false},
    {name: 'Arabic', code: 'ar', selected: false},
  ]);
  const onItemClick = idx => {
    let a = favData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        if (temp?.name == 'English') {
          changeLanguage(temp?.code);
          AsyncStorage.setItem(STRING.app_lang, temp?.code + '');
          temp.selected = !temp.selected;
          ShowToastMessage(`App language changed to ${temp?.name}`);
          RNRestart.restart();
        } else if (temp?.name == 'हिंदी') {
          changeLanguage(temp?.code);
          AsyncStorage.setItem(STRING.app_lang, temp?.code + '');
          temp.selected = !temp.selected;
          ShowToastMessage(`App language changed to ${temp?.name}`);
          RNRestart.restart();
        } else {
          ShowToastMessage(`Language not supported NOW!!!!`);
          ShowToastMessage(`Please select English / हिंदी for now`);
          changeLanguage(currentLanguage);
        }
      } else {
        temp.selected = false;
      }
      return temp;
    });

    setFavData(a);
  };

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem(STRING.app_lang, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            STRING.APP_LANGUAGE = value;
            let a = favData.map((item, index) => {
              let temp = Object.assign({}, item);
              console.log(temp?.code == value);
              setLanguage(value);
              if (temp?.code == value) {
                temp.selected = !temp.selected;
              }
              return temp;
            });

            setFavData(a);
          } else {
            STRING.APP_LANGUAGE = 'en';
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };
  useEffect(() => {
    getUserFromStorage();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.wrapper]}
        onPress={() => {
          onItemClick(index);
        }}>
        <View style={styles.innerWrapper}>
          <MaterialCommunityIcons
            name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
            size={22}
            color={COLORS.colorPrimary}
          />
          <Text style={styles.textName}>{item?.name}</Text>
          <Text style={styles.textSymbol}>{item?.symbol}</Text>
        </View>
        <View style={styles.divLine} />
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
        <VegUrbanCommonToolBar title={STRING.currency + ' Changer'} />
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
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        data={favData}
        renderItem={renderItem}
      />

      {/*<View*/}
      {/*  style={{*/}
      {/*    flex: 1,*/}
      {/*    backgroundColor: 'white',*/}
      {/*    alignItems: 'center',*/}
      {/*    justifyContent: 'space-evenly',*/}
      {/*  }}>*/}
      {/*  <Text style={{fontWeight: 'bold', fontSize: 25, color: '#33A850'}}>*/}
      {/*    {t('january')}*/}
      {/*    {t('hello')} {t('person')}{' '}*/}
      {/*  </Text>*/}
      {/*  <Text style={{fontWeight: 'bold', fontSize: 25, color: '#33A850'}}>*/}
      {/*    {t('this line is translated')}*/}
      {/*  </Text>*/}
      {/*  <Pressable*/}
      {/*    onPress={() => changeLanguage('en')}*/}
      {/*    style={{*/}
      {/*      backgroundColor: currentLanguage === 'en' ? '#33A850' : '#d3d3d3',*/}
      {/*      padding: 20,*/}
      {/*    }}>*/}
      {/*    <Text>Select English</Text>*/}
      {/*  </Pressable>*/}
      {/*  <Pressable*/}
      {/*    onPress={() => changeLanguage('hi')}*/}
      {/*    style={{*/}
      {/*      backgroundColor: currentLanguage === 'hi' ? '#33A850' : '#d3d3d3',*/}
      {/*      padding: 20,*/}
      {/*    }}>*/}
      {/*    <Text>हिंदी का चयन करें</Text>*/}
      {/*  </Pressable>*/}
      {/*</View>*/}
    </SafeAreaView>
  );
};

export default Language;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
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
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  textName: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
    marginStart: 15,
  },
  textSymbol: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: COLORS.black,
    marginStart: 15,
    marginEnd: 15,
  },
  image: {
    height: 25,
    width: 50,
    resizeMode: 'center',
  },
  divLine: {
    backgroundColor: COLORS.gray,
    height: 0.5,
    width: '100%',
    marginTop: 15,
  },
});
