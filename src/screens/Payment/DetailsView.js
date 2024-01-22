import React, { memo, useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToolBarIcon from '../../utils/ToolBarIcon';
import { STRING } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { FONTS } from '../../constants/Fonts';
import Feather from 'react-native-vector-icons/Feather'
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const DetailsView = ({
  item,
}) => {
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PaymentDetsils', { item });
      }}
      activeOpacity={0.8}
      style={[
        // styles.wrapper,
        {
          backgroundColor: COLORS?.bg_color,
          elevation: 2,
          //   backgroundColor: theme?.colors?.bg
          // backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={{
          margin: 10,
          padding: 10,
          elevation: 3,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          // flexGrow: 1,
        }}>

        {/* <View
          style={{
            flexDirection: 'row',
            marginVertical: 2,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,

          }}>

          <Text
            style={{
              fontSize: 20,
              color: COLORS.black,
              fontFamily: FONTS.bold,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Payment History
          </Text>

        </View> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
              padding: 6

            }}>
            <Text
              style={{
                fontFamily: FONTS.bold,

                fontSize: 14,
                color: COLORS.grey,
              }}>
              Shop Total Amount
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: COLORS.black,
                fontFamily: FONTS.bold,
                fontWeight: 'bold'

              }}>
              {/* ₹100 */}
              ₹{item?.amount}
             
            </Text>
          </View>
          <View style={{
            height: 45,
            borderWidth: 0.2,
            width: 1,
            marginTop: 10

          }}></View>
          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
              padding: 6
            }}>
            <Text
              style={{
                fontFamily: FONTS.bold,

                fontSize: 14,
                color: COLORS.grey,
              }}>
              Shop Due Amount
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: COLORS.black,
                fontFamily: FONTS.bold,
                fontWeight: 'bold'
              }}>
              {/* ₹{totalDue} */}
              {/* ₹{item?.total_due || dueshopdata?.total_order_due_shop} */}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexGrow: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              // marginStart: 10,
            }}
          />

          {/* <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: COLORS.grey,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.grey,
              marginHorizontal: 10,
              fontFamily: FONTS.medium,

              marginTop: -2,
            }}>
          
            {moment(item?.created_at).format('L')}
            {'  '}
            {moment(item?.created_at).format('LTS')}
          </Text>
        </View> */}

          <View
            style={{
              // flexGrow: 1,
              // height: 1,
              backgroundColor: COLORS.grey,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginVertical: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.grey,
              marginHorizontal: 10,
              fontFamily: FONTS.medium,
            }}>
            Invoice Id
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.grey,
              marginHorizontal: 10,
              fontFamily: FONTS.bold,
            }}>
            {/* {item?.invoice_id} */}
          </Text>
        </View>

        {/* {item?.amount > 0 ? (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.medium,
              }}>
              Transaction Id
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.bold,
              }}>
              #{item?.tras_id}
            </Text>
          </View>
        ) : null} */}

        {/* {item?.total_amount > 0 ? (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.medium,
              }}>
              Total Paid
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.bold,
              }}>
              ₹{item?.total_paid}/-
            </Text>
          </View>
        ) : null}
        {item?.total_amount > 0 ? (
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.medium,
              }}
            >
              Transaction Date
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.bold,
              }}
            >
              {moment(item?.created_at).format('L')}
            </Text>
          </View>
        ) : null} */}

        {/* {item?.total_amount > 0 ? ( */}
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 5,
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.medium,
              }}>
              Transaction Time
            </Text>
            <View
              style={{
                flex: 1,
                marginVertical: 5,

              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.grey,
                  marginHorizontal: 10,
                  fontFamily: FONTS.bold,
                  // flexGrow: 1,
                  marginStart: 'auto',
                  // textAlign: 'right',
                }}>
                {moment(item?.created_at).format('LTS')}
              </Text>
            </View>

          </View>
        {/* ) : null} */}

        {/* {item?.total_amount > 0 ? ( */}

          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginHorizontal: 10,
                fontFamily: FONTS.medium,
              }}>
              Payment Mode
            </Text>

            {/* <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            marginHorizontal: 10,
            fontFamily: FONTS.bold,
          }}>

          {item?.payment_type == 1 ? 'Online' : 'Cash'}
        </Text> */}

            <View>
              {item?.payment_status == 1 ? (
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.bold,
                  }}>
                  Online
                </Text>
              ) : item?.payment_status === 2 ? (
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.bold,
                  }}>
                  Cash
                </Text>
              ) : item?.payment_status === 3 ? (
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.bold,
                  }}>
                  cheque
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.grey,
                    marginHorizontal: 10,
                    fontFamily: FONTS.bold,
                  }}>
                  All Dues
                </Text>
              )}

            </View>


          </View>
        {/* ) : null} */}
        <View>
          {/* {(dueshopdata?.total_due_shop > 0) && ( */}
            <VegUrbanCommonBtn
              height={30}
              // width={'100%'}
              borderRadius={5}
              textSize={16}
              textColor={'white'}
              text={('Pay Now')}
              marginTop={10}
              activeOpacity={0.8}
              backgroundColor={theme?.colors?.colorPrimary}
              onPress={() => {
                navigation.navigate('DuePayment', { item });
              }}
              textStyle={{
                fontFamily: 'OpenSans-Medium',
              }}
            />
          {/* )} */}
        </View>




        {/* <View
        style={{
          flexGrow: 1,
          height: 1,
          backgroundColor: COLORS.grey,
          marginVertical: 15,
        }}
      /> */}
        {/* <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            marginHorizontal: 10,
            fontFamily: FONTS.medium,
          }}>
          Transaction Date:
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            marginHorizontal: 10,

            fontFamily: FONTS.bold,
          }}>
          {moment(item?.created_at).format('L')}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            marginHorizontal: 10,
            fontFamily: FONTS.medium,
          }}>
          Transaction Time
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: COLORS.grey,
            marginHorizontal: 10,

            fontFamily: FONTS.bold,
          }}>
          {moment(item?.created_at).format('LTS')}
        </Text>
      </View> */}

      </View>
    </TouchableOpacity>
  );
};

export default memo(DetailsView);
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 10,
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
    borderRadius: 10

  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0
  },
  textName: {
    fontFamily: FONTS?.regular,
    fontSize: 14,
    color: COLORS.black,
  },

});
