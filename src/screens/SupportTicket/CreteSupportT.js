import React, { useContext, useState } from 'react';
import {
  Alert,
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import GlobalStyle from '../../styles/GlobalStyle';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';

import { ShowToastMessage } from '../../utils/Utility';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import SellerEProgressBar from '../../utils/SellerEProgressBar';

const CreteSupportT = ({ route }) => {
  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;
  const [loading, setLoading] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleselet = selectedItems => {
    setSelectedCategories(selectedItems);
  };
  const error = '';
  const navigation = useNavigation();

  const [subject, setsubject] = useState('');
  // const [category, setcategory] = useState('');

  const [description, setdescription] = useState('');

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const [focused, setFocused] = React.useState(false);
  const [focused1, setFocused1] = React.useState(false);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  console.log('category', selectedCategories);
  // useEffect(() => {
  //     getPaymentlist();
  // }, []);

  const category = [
    { name: 'Support', id: 1 },
    { name: 'Bug', id: 2 },
    { name: 'Questions', id: 3 },
  ];

  const isFocused = useIsFocused();

  const getBorderWidth = () => {
    if (error) {
      return 1;
    }
    if (focused) {
      return 0.5;
    } else {
      return 0.2;
    }
  };
  const getBorderWidth1 = () => {
    if (error) {
      return 1;
    }
    if (focused1) {
      return 0.5;
    } else {
      return 0.2;
    }
  };

  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return COLORS?.white;
    } else {
      return COLORS?.white;
    }
  };
  const getBorderColor1 = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused1) {
      return COLORS?.white;
    } else {
      return COLORS?.white;
    }
  };

  const getBgColor = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused) {
      return theme?.colors?.bg;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return theme?.colors?.bg;
    }
  };
  const getBgColor1 = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused1) {
      return theme?.colors?.bg;
    } else {
      // return COLORS.lightest_gray1;
      return theme?.colors?.bg;
      // return COLORS?.colorSecondary;
    }
  };

  // { use Token } , accountholdername, accountnumber, bankname, ifsccode
  const getCreteSupportT = () => {
    setLoading(true);

    try {
      if (!subject) {
        ShowToastMessage('Please enter subject');
        setLoading(false);
        return;
      }

      if (selectedCategories.length === 0) {
        ShowToastMessage('Please select selectedCategories');
        setLoading(false);
        return;
      }
      if (!description) {
        ShowToastMessage('Please Enter description');
        setLoading(false);
        return;
      }

      const body = {
        subject: subject,
        category: selectedCategories,
        description: description,
      };

      // console.log(body)
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.Create_SUPPORT_Ticket));

      ApiCall('post', body, API_END_POINTS.Create_SUPPORT_Ticket, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          // console.log(" add product ", JSON.stringify(response));

          if (response?.statusCode === 200) {
            // setDashboard(response?.data?.data)

            navigation.goBack('SupportTicket');
            ShowToastMessage(response?.data?.message);
          } else if (response?.statusCode === 500) {
            if (response.data?.message === 'Token Mismatch') {
              Alert.alert(
                'Session Expired',
                'Your session has expired due to a security issue. Please log in again to continue using the application.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      clearUserToken();
                    },
                  },
                ],
              );
            }
          } else {
          }
        })
        .catch(error => {
          console.log('error axios -> ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToastMessage(` You selected : ${error.message}`);
      setLoading(false);
    }
  };
  const clearUserToken = async () => {
    try {
      await AsyncStorage.clear();
      // await AsyncStorage.removeItem('userToken');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        }),
      );
    } catch (error) {
      console.error('Error clearing userToken:', error);
    }
  };

  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color_onBoard,
          borderRadius: 5,
          flex: 1,
        },
      ]}>
      <SellerEProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme?.colors.bg_color_onBoard,
            elevation: 5,
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
          color={COLORS?.black}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title="Add Support Ticket"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
            fontFamily: FONTS?.bold,
            alinItem: 'center',
          }}
          textStyle={{
            color: COLORS?.black,
            fontFamily: FONTS?.bold,
            fontSize: 18,
            textAlin: 'center',
          }}
        />
      </View>
      <ScrollView>
        <View
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            flex: 1,
            backgroundColor: COLORS?.white,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTS?.bold,
              color: COLORS?.black,
              marginBottom: 10,
            }}>
            Support Ticket Add
          </Text>

          <VegUrbanEditText
            placeholder="Enter subject"
            label="Subject"
            value={subject}
            maxLength={50}
            style={{
              color: theme?.colors?.white,
            }}
            // keyBoardType={'email-address'}
            onChangeText={v => setsubject(v)}
          />
          <Text style={{ color: COLORS?.gray, fontSize: 12 }}>
            Maximum 50 Characters
          </Text>
          {/* <VegUrbanEditText
                        placeholder="selct Category"

                        label="Category"
                        value={category}

                        style={{
                            color: theme?.colors?.white,
                        }}
                        // keyBoardType={'number-pad'}
                        // onChangeText={v => setcategory(v)}
                    /> */}
          <View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: COLORS?.black,
                fontFamily: FONTS?.medium,
                marginLeft: 5,
                marginBottom: 5,
                marginTop: 10,
              }}>
              Category
            </Text>
          </View>
          <View
            style={[
              styles.textView,
              {
                borderColor: getBorderColor1(),
                elevation: 8,

                // flexDirection: getFlexDirection(),
              },
              {
                shadowOffset: {
                  width: 3,
                  height: 3,
                },
              },
              {
                backgroundColor: getBgColor1(),
                borderWidth: getBorderWidth1(),
                borderRadius: 12,
                elevation: 8,
                marginBottom: 18,
              },
            ]}>
            <Picker
              selectedValue={selectedCategories}
              onValueChange={itemValue => handleselet(itemValue)}
              mode="dropdown">
              {/* Default "Select a Category" option */}
              <Picker.Item label="Select a Category" value={null} />

              {/* Rendering categories from the API */}
              {category.map(category => (
                <Picker.Item
                  label={category.name}
                  value={category.name}
                  key={category.id}
                />
              ))}
            </Picker>
          </View>

          <VegUrbanEditText
            placeholder="Eenter Description"
            label="Description"
            value={description}
            maxLength={250}
            multiline={true}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setdescription(v)}
          />

          <Text style={{ color: COLORS?.gray, fontSize: 12 }}>
            Maximum 250 Characters
          </Text>

          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={10}
            textSize={16}
            marginTop={20}
            // textColor={COLORS?.white}

            textColor={COLORS?.white}
            text={'Save'}
            backgroundColor={appPrimaryColor}
            onPress={() => {
              getCreteSupportT();
            }}
            textStyle={{
              fontFamily: FONTS?.bold,

              // textTransform: 'uppercase',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreteSupportT;
const styles = StyleSheet.create({
  textView: {
    // flexDirection: 'row',
    flex: 1,
    // width: '100%',
    // borderWidth: 0.2,
    // alignSelf: 'center',
    // marginVertical: 12,
    // // backgroundColor: theme?.colors?.bg_color,
    // // borderColor: COLORS?.bg_color,
    // // placeholderTextColor:theme?.colors?.textColor,

    // // placeholderTextColor: COLORS.editTextBorder,
    // paddingHorizontal: 10,
    // height: 42,
    // marginHorizontal: 0,
    // // borderRadius: 10,
    // fontFamily: 'Quicksand-Regular',
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
