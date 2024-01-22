import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  I18nManager,
  Linking,
  Modal,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GlobalStyle from '../../styles/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import { COLORS } from '../../constants/Colors';
import { ShowToastMessage } from '../../utils/Utility';

import { useSelector } from 'react-redux';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS, IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import SellerEProgressBar from '../../utils/SellerEProgressBar';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';

const ProductDetail = ({ route }) => {
  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;

  const error = '';

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState('');
  const [productName, setProductName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selctedColors, setSelectColors] = useState([]);

  const [selctUnit, setSelectUnit] = useState([]);
  const [selctTax, setselectTax] = useState([]);
  const [quntity, setQuntity] = useState('');
  const [weight, setWeight] = useState('');
  const [barcode, setBarcode] = useState('');
  const [slug, setSlug] = useState('');
  const [Productwarranty, setProductwarranty] = useState('');
  const [ReturnPolicy, setReturnPolicy] = useState('');
  const [meta_title, setMetaTitle] = useState('');
  const [description, setDecription] = useState('');
  const [ShippingDays, setShippingdays] = useState('');

  const [meta_description, setMetaDcription] = useState('');
  // console.log("barand", selectedColors)

  const [isRefundable, setIsRefundable] = useState(false);
  const [productDescription, setProductDescription] = useState('');
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
  const userToken = useSelector(state => state.state?.userToken);

  const [focused, setFocused] = React.useState(false);
  const [focused1, setFocused1] = React.useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const { item } = route.params;
  const id = item?._id;
  // console.log("hhhhhhhh", userToken)
  const [apiSizes, setApiSizes] = useState([]);
  const [apiColors, setApiColors] = useState([]);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

  useEffect(() => {
    getProdcutDetails();
  }, []);
  const [tags, setTags] = useState([]);
  const [sku, setSku] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [taxpercentage, setTaxPercentage] = useState('');
  const [taxAmount, setTaxAmount] = useState('');

  const [details, setDetails] = useState(null);
  const [address, setAddressData] = useState({});

  const [OrderProduct, setOrderProduct] = useState({});

  // console.log(" Product details", details)

  const handleVideoLinkCLick = () => {
    try {
      Linking?.openURL(videoLink);
    } catch (e) {
      ShowToastMessage('Unable to open video link');
    }
  };

  const getProdcutDetails = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.PRODUCT_DETAILS_API + id));
      // console.log("response axios >>> ", userToken);

      ApiCall('get', null, API_END_POINTS.PRODUCT_DETAILS_API + id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          // console.log("product data for  ", JSON.stringify(response));

          if (response?.statusCode === 200) {
            // console.log("product data for  ", JSON.stringify(response?.data));
            setDetails(response?.data?.response);
            setOrderProduct(response?.data?.response?.product_id);
            setAddressData(response?.data?.addressData);

            if (response.data?.length === 0) {
              setShowEmpty(true);
            }
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
            setShowEmpty(true);
          }
        })

        .catch(error => {
          setShowEmpty(true);
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

  useEffect(() => {
    if (details?.productsize) {
      setApiSizes(details?.productsize);
    }
  }, [details]);
  useEffect(() => {
    if (details?.productcolor) {
      setApiColors(details?.productcolor);
    }
  }, [details]);

  // console.log('Item in :', selectedColors);

  useEffect(() => {
    if (details) {
      setProductName(details?.product_name);
      setAmount(String(details?.amount, ''));
      setQuntity(String(details?.quantity, ''));
      setWeight(String(details?.weight));
      setBarcode(details?.product_barcode);
      setSlug(details?.slug);
      setSku(details?.productsku);
      setSelectUnit(details?.unittype);
      // setSelectedSizes(apiSizes);
      setVideoLink(details?.videolink);
      setProductDescription(details?.meta_description);
      setProductwarranty();
      setMetaDcription(details?.meta_description);
      setMetaTitle(details?.meta_title);
      setReturnPolicy(details?.product_return_policy);
      setShippingdays(String(details?.estimateshippingdays));
      setDecription(details?.description);
      setImageEditArray(details?.product_images);
      setProductColorArr(details?.productcolor);
      setThumbImage(details?.thumbnail_image);
      setSelectedSizes(details?.productsize);
      setSelectedColors(details?.productcolor);
      setTaxAmount(String(details?.taxamount));
      setTaxPercentage(String(details?.taxpercentage));
      setselectTax(details?.taxby);
      setProductwarranty(details?.product_warranty);
      setReturnPolicy(String(details?.product_return_policy));

      // setTags(details?.tags?.split(','));
      setTags(details?.tags);
      console.log('type of  ->>> ', details?.tags);
      //console.log(" 0 index image -> "  , details)
    }
  }, [details]);

  const [selectedImage, setSelectedImage] = useState(null);

  const openModalWithImage = imageUri => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };
  const colors = [
    { label: 'red', code: '#873600' },
    { label: 'green', code: '#515A5A' },
    { label: 'blue', code: '#CCD1D1' },
    { label: 'yellow', code: '#BB8FCE' },
    { label: 'magenta', code: '#F39C12' },
    { label: 'cyan', code: '#27AE60' },
  ];
  const sizes = [
    { label: 'Small', code: 'S', no: '6' },
    { label: 'Medium', code: 'M', no: '7' },
    { label: 'Large', code: 'L', no: '8' },
    { label: 'Small', code: 'XL', no: '9' },
    { label: 'Medium', code: 'XXL', no: '10' },
    { label: 'Large', code: 'XXXL', no: '11' },
  ];
  const unitType = [
    { name: 'Kg', code: '1' },
    { name: 'Liter', code: '1' },
    { name: 'Piece', code: '3' },
    { name: 'Meter', code: '4' },
    { name: 'Pound', code: '5' },
  ];

  const tax = [
    { name: 'Amount', code: '1' },
    { name: 'Percentage', code: '2' },
  ];

  const toggleSizeSelection = sizeCode => {
    if (selectedSizes.includes(sizeCode)) {
      setSelectedSizes(selectedSizes.filter(code => code !== sizeCode));
    } else {
      setSelectedSizes([...selectedSizes, sizeCode]);
    }
    // if (productSizesArr.includes(sizeCode)) {
    //     setprodcutSizesArr(productSizesArr.filter((color) => color !== sizeCode));
    // } else {
    //     setprodcutSizesArr([...productSizesArr, sizeCode]);
    // }
  };
  // const handleColorSelect = (color) => {
  //     setSelectedColors(color);

  // };
  const [modalVisible, setModalVisible] = useState(false);
  const handleUnitType = unit => {
    setSelectUnit(unit);
  };
  const handleTax = tax => {
    setselectTax(tax);
  };
  const handleColorSelect = colorCode => {
    // if (selectedColors.includes(colorCode)) {
    //     setSelectedColors(selectedColors.filter((color) => color !== colorCode));
    // } else {
    //     setSelectedColors([...selectedColors, colorCode]);
    // }
    if (productColorArr.includes(colorCode)) {
      setProductColorArr(productColorArr.filter(color => color !== colorCode));
    } else {
      setProductColorArr([...productColorArr, colorCode]);
    }
  };

  const removeColor = colorCode => {
    // setSelectedColors(selectedColors.filter((color) => color !== colorCode));
    setProductColorArr(productColorArr?.filter(color => color !== colorCode));
  };

  const handleselet = selectedItems => {
    setSelectedCategories(selectedItems);
  };

  const handleColorChange = colors => {
    setSelectColors(selectedItems);
  };

  const handleBrandChange = selectedItems => {
    setSelectedBrands(selectedItems);
  };

  const handleSubmit = () => {
    // Handle submission of product details
  };
  const [productColorArr, setProductColorArr] = useState([]);
  const [imageEditArray, setImageEditArray] = useState([]);
  const userData = useSelector(state => state.state?.userData);

  const [productSizesArr, setprodcutSizesArr] = useState([]);

  const [thumbImage, setThumbImage] = useState('');
  const [pictureSelected, setPictureSelected] = useState(false);
  const [thumbSelected, setThumbSelected] = useState(false);
  const [imageArray, setImageArray] = useState([
    // {
    //     image:
    //         'https://images.unsplash.com/photo-1584055482118-3f355578daef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGZvciUyMHBob25lfGVufDB8fDB8fA%3D%3D',
    // },
    // {
    //     image:
    //         'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHw%3D',
    // },
    // {
    //     image:
    //         'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHw%3D',
    // },
  ]);

  const [img, setImg] = useState([]);

  // console.log("image",imageArray)
  // console.log("image edit ", imageEditArray)
  const openImagePicker = () => {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.4,
      forceJpg: true,
      includeBase64: true,
    }).then(images => {
      // setImage(images.path);
      // var filename = images.path.split('/');
      // var data = {
      //     url: images.path,
      //     filename: filename[filename.length - 1],
      //     data: images.data,
      //     'Content-Type': 'image/jpeg',
      //     ext: 'jpeg',
      //     type: 'image',

      //     size: images?.size,
      // };
      var data = 'data:image/jpeg;base64,' + images.data;
      // img.push(data);
      // imageArray.push(images);
      setImageEditArray([...imageEditArray, data] || item?.product_images);
      setImageArray([...imageArray, data]);
    });
    setCount(0);
    // setImageArray(imageArray);
    setCount(0);
  };

  const openThumbImagePicker = () => {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
    }).then(images => {
      setThumbImage(images.path || item?.thumbnail_image);
    });
    setCount(0);
    // setImageArray(imageArray);
    setCount(0);
  };

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to Camera to upload profile photo',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

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

  // const [productDescription, setProductDescription] = useState('');
  // const colorsText = item.productcolor.join(', ');
  const colorsText = Array.isArray(item?.productcolor)
    ? item.productcolor.join(', ')
    : '';
  // const sizesText = dashboard?.productsize.join(',');
  const sizesText = Array.isArray(item?.productsize)
    ? item.productsize.join(', ')
    : '';

  const richText = useRef();
  const [showEmpty, setShowEmpty] = useState(false);

  const handleSave = () => {
    richText.current.getContentHtml().then(content => { });
  };
  useEffect(() => {
    getbrand();
    getShopCategory();
  }, []);

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  // console.log("brand", brand)
  // console.log("category", category)

  const getbrand = () => {
    setLoading(true);
    try {
      // ShowConsoleLogMessage(API_END_POINTS.DASHBOARD)
      ApiCall('get', null, API_END_POINTS.BRAND_LIST_API, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response));
            const responseData = response?.data?.response;
            setBrand(responseData);

            // if (responseData && responseData.length > 0) {
            //   // const imageUrlsArray = responseData.map((item) => item.image);
            //   setCategory(response?.data);
            // }
            if (response.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            setShowEmpty(false);
            // ShowToastMessage(response.data?.message)
            // if (response.data?.message === "Token Mismatch") {
            //   Alert.alert(
            //     'Session Expired',
            //     'Your session has expired due to a security issue. Please log in again to continue using the application.',
            //     [
            //       {
            //         text: 'OK',
            //         onPress: () => {
            //           clearUserToken();
            //         },
            //       },
            //     ]
            //   );
            // }
          } else {
            setShowEmpty(true);
          }
        })
        .catch(error => {
          setShowEmpty(true);
          // console.log("Error with Axios request: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      // ShowToastMessage(`You selected: ${error.message}`);
      setLoading(false);
    }
  };

  const getShopCategory = () => {
    setLoading(true);
    try {
      // ShowConsoleLogMessage(API_END_POINTS.DASHBOARD)
      ApiCall('get', null, API_END_POINTS.CATEGORY_LIST, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response));
            const responseData = response?.data?.response;
            setCategory(responseData);

            // if (responseData && responseData.length > 0) {
            //   // const imageUrlsArray = responseData.map((item) => item.image);
            //   setCategory(response?.data);
            // }
            if (response.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            setShowEmpty(false);
          } else {
            setShowEmpty(true);
          }
        })
        .catch(error => {
          setShowEmpty(true);
          // console.log("Error with Axios request: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      // ShowToastMessage(`You selected: ${error.message}`);
      setLoading(false);
    }
  };
  // console.log(brand)

  const sizeesArr = Array.isArray(details?.productsize)
    ? details.productsize.join(', ')
    : '';

  const removeImage = index => {
    let a = [...imageEditArray];
    a.splice(index, 1);
    setImageEditArray(a);
    // setImageArray(a);
  };
  const renderPicture = ({ item, index }) => {
    // console.log(" rendre picture ->>> ", typeof item[0]);
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(item);
          setModalVisible(true);
        }}>
        <View
          style={{
            width: 100,
            height: 100,
          }}>
          {/* <MaterialIcons
            name="cancel"
            size={20}
            color={COLORS.primaryColor}
            style={{
              alignSelf: 'flex-end',
            }}
            onPress={() => {
              removeImage(index);
              // deletePhoto(item?.id);
            }}
          /> */}
          <VegUrbanImageLoader
            styles={{
              width: 80,
              height: 80,
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            source={IMAGE_BASE_URL + item}
          />
          {/* <Text>hello want {item}</Text> */}
        </View>
      </TouchableOpacity>
    );
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
          title="Product Details"
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

      <SellerEProgressBar loading={loading} />

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
              color: appPrimaryColor,
              marginBottom: 10,
            }}>
            Product Information
          </Text>

          <VegUrbanEditText
            placeholder="Enter Product Name"
            label="Product Name"
            value={productName}
            maxLength={50}
            editable={false}
            style={{
              color: theme?.colors?.white,
            }}
            // keyBoardType={'email-address'}
            onChangeText={v => setProductName(v)}
          />

          <View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: COLORS?.black,
                fontFamily: FONTS?.medium,
                marginLeft: 5,
                marginBottom: 8,
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
              },
              {
                backgroundColor: getBgColor1(),
                borderWidth: getBorderWidth1(),
                borderRadius: 12,
              },
            ]}>
            <Text
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                marginLeft: 10,
                color: COLORS?.black,
                fontFamily: FONTS?.regular,
              }}>
              {item?.category}
            </Text>
          </View>
          <View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: COLORS?.black,
                fontFamily: FONTS?.medium,
                marginLeft: 5,
                marginBottom: 8,
                marginTop: 10,
              }}>
              Sub Category
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
                marginBottom: 10,
              },
            ]}>
            <Text
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                marginLeft: 10,
                color: COLORS?.black,
                fontFamily: FONTS?.regular,
              }}>
              {item?.subcategory}
            </Text>
          </View>
          <View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: COLORS?.black,
                fontFamily: FONTS?.medium,
                marginLeft: 5,
                marginBottom: 8,
              }}>
              Brand
            </Text>
          </View>
          <View
            style={[
              styles.textView,
              {
                borderColor: getBorderColor1(),
                elevation: 8,
              },
              {
                backgroundColor: getBgColor1(),
                borderWidth: getBorderWidth1(),
                borderRadius: 12,
              },
            ]}>
            <Text
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                marginLeft: 10,
                color: COLORS?.black,
                fontFamily: FONTS?.regular,
              }}>
              {details?.brand?.brand_name}
            </Text>
          </View>
          <VegUrbanEditText
            // placeholder="Enter Amount"
            label="Amount"
            value={amount}
            iconPosition={'left'}
            keyBoardType={'number-pad'}
            editable={false}
            icon={
              <FontAwesome
                name={'dollar'}
                size={16}
                color={COLORS.grey}
                style={{
                  marginHorizontal: 15,
                }}
              />
            }
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setAmount(v)}
          />
          <VegUrbanEditText
            // placeholder="Enter Quantity"
            label="Quantity"
            value={quntity}
            maxLength={20}
            editable={false}
            style={{
              color: theme?.colors?.white,
            }}
            keyBoardType={'number-pad'}
            onChangeText={v => setQuntity(v)}
          />
          <VegUrbanEditText
            // placeholder="Product Weight"
            label="Weight"
            value={weight}
            maxLength={20}
            editable={false}
            style={{
              color: theme?.colors?.white,
            }}
            keyBoardType={'number-pad'}
            onChangeText={v => setWeight(v)}
          />

          {/*<VegUrbanEditText*/}
          {/*  // placeholder="Enter Video Link"*/}
          {/*  label="Video Link"*/}
          {/*  value={videoLink}*/}
          {/*  editable={false}*/}
          {/*  style={{*/}
          {/*    color: theme?.colors?.white,*/}
          {/*  }}*/}
          {/*  onChangeText={v => setVideoLink(v)}*/}
          {/*/>*/}
          {videoLink ? (
            <>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: COLORS?.black,
                  fontFamily: FONTS?.medium,
                  marginLeft: 5,
                  marginBottom: 2,
                  marginTop: 10,
                }}>
                Video Link
              </Text>

              <Text
                onPress={() => {
                  handleVideoLinkCLick();
                }}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: 'blue',
                  fontFamily: FONTS?.regular,
                  marginLeft: 5,
                  marginBottom: 2,
                  marginTop: 10,
                  textDecorationLine: 'underline',
                }}>
                {videoLink}
              </Text>
            </>
          ) : null}
          <View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: COLORS?.black,
                fontFamily: FONTS?.medium,
                marginLeft: 5,
                marginBottom: 2,
                marginTop: 10,
              }}>
              Tags
            </Text>
          </View>
          {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text>Choose Colors</Text>
                    </TouchableOpacity> */}
          <View
            // onPress={() => setModalVisible(true)}
            // style={{ flexDirection: 'row', alignItems: 'center' }}
            style={[
              styles.textView,
              {
                borderColor: getBorderColor(),
                elevation: 8,
                // height: 65,
                paddingHorizontal: 15,
                paddingVertical: 10,
                alinItem: 'center',
                // flexDirection: 'row'

                // flexDirection: getFlexDirection(),
              },
              {
                shadowOffset: {
                  width: 3,
                  height: 3,
                },
              },
              {
                backgroundColor: getBgColor(),
                borderWidth: getBorderWidth(),
                borderRadius: 12,
                marginTop: 10,
                elevation: 8,
                marginBottom: 10,
              },
            ]}>
            {/* <Text>Selected Colors:</Text> */}
            <View
              style={{
                flexDirection: 'row',
                alinItem: 'center',
                // height:30
              }}>
              {/*<Text*/}
              {/*  style={{*/}
              {/*    // marginLeft:5,*/}
              {/*    fontSize: 14,*/}
              {/*    fontFamily: FONTS?.bold,*/}
              {/*    color: COLORS?.white,*/}
              {/*  }}>*/}
              {/*  {details?.tags}*/}
              {/*</Text>*/}
              <View style={styles.tagContainer}>
                <FlatList
                  data={tags}
                  numColumns={3}
                  renderItem={({ item }) => {
                    console.log(item, ' tag item');
                    return (
                      <View
                        style={{
                          height: 30,
                          borderRadius: 8,
                          backgroundColor: COLORS?.colorPrimary,
                          borderWidth: 0.5,
                          borderColor: COLORS?.black,
                          justifyContent: 'center',
                          alinItem: 'center',
                          paddingHorizontal: 20,
                          margin: 5,
                        }}>
                        <Text
                          style={{
                            // marginLeft:5,
                            fontSize: 14,
                            fontFamily: FONTS?.regular,
                            color: COLORS?.white,
                          }}>
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
                {/*{tags?.map((tag, index) => (*/}
                {/*  <View*/}
                {/*    style={{*/}
                {/*      height: 30,*/}
                {/*      maxWidthwidth: '100%',*/}
                {/*      borderRadius: 8,*/}
                {/*      backgroundColor: COLORS?.colorPrimary,*/}
                {/*      borderWidth: 0.5,*/}
                {/*      borderColor: COLORS?.black,*/}
                {/*      justifyContent: 'center',*/}
                {/*      alinItem: 'center',*/}
                {/*      paddingHorizontal: 20,*/}
                {/*    }}>*/}
                {/*    <Text*/}
                {/*      style={{*/}
                {/*        // marginLeft:5,*/}
                {/*        fontSize: 14,*/}
                {/*        fontFamily: FONTS?.bold,*/}
                {/*        color: COLORS?.white,*/}
                {/*      }}>*/}
                {/*      {tag}*/}
                {/*    </Text>*/}
                {/*  </View>*/}
                {/*))}*/}
              </View>
            </View>
          </View>

          <View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: COLORS?.black,
                fontFamily: FONTS?.medium,
                marginLeft: 5,
                marginBottom: 8,
              }}>
              Unit
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
              },
            ]}>
            <Text
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                marginLeft: 10,
                color: COLORS?.black,
                fontFamily: FONTS?.regular,
              }}>
              {details?.unittype}
            </Text>
          </View>
          <View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: COLORS?.black,
                fontFamily: FONTS?.medium,
                marginLeft: 5,
                marginBottom: 8,
                marginTop: 10,
              }}>
              TAX
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
                marginBottom: 10,
              },
            ]}>
            <Text
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                marginLeft: 10,
                color: COLORS?.black,
                fontFamily: FONTS?.regular,
              }}>
              {details?.taxby}
            </Text>
          </View>

          {selctTax === 'Amount' && (
            <VegUrbanEditText
              // placeholder="Enter Tax Amount"
              label="Tax Amount"
              value={taxAmount}
              maxLength={20}
              editable={false}
              style={{
                color: theme?.colors?.white,
              }}
              keyBoardType={'number-pad'}
              onChangeText={v => setTaxAmount(v)}
            />
          )}
          {selctTax === 'Percentage' && (
            <VegUrbanEditText
              // placeholder="Enter Tax Percentage"
              label="Tax Percentage"
              value={taxpercentage}
              maxLength={20}
              editable={false}
              style={{
                color: theme?.colors?.white,
              }}
              keyBoardType={'number-pad'}
              onChangeText={v => setTaxPercentage(v)}
            />
          )}

          <VegUrbanEditText
            // placeholder="Enter Bar Code"
            label="Bar Code"
            value={barcode}
            maxLength={20}
            editable={false}
            style={{
              color: theme?.colors?.white,
            }}
            keyBoardType={'number-pad'}
            onChangeText={v => setBarcode(v)}
          />
          <VegUrbanEditText
            // placeholder="Enter Slug"
            label="Slug"
            value={slug}
            maxLength={20}
            editable={false}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setSlug(v)}
          />
          <VegUrbanEditText
            // placeholder="Enter Product warranty"
            label="Product warranty"
            value={Productwarranty}
            maxLength={50}
            editable={false}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setProductwarranty(v)}
          />

          <VegUrbanEditText
            // placeholder="Enter Return Policy"
            label="Return Policy"
            value={ReturnPolicy}
            maxLength={50}
            editable={false}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setReturnPolicy(v)}
          />

          <VegUrbanEditText
            // placeholder="Enter SKU"
            label="SKU"
            value={sku}
            editable={false}
            maxLength={20}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setSku(v)}
          />
          <View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: COLORS?.black,
                fontFamily: FONTS?.medium,
                marginLeft: 5,
                marginBottom: 2,
                marginTop: 10,
              }}>
              Color
            </Text>
          </View>
          {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text>Choose Colors</Text>
                    </TouchableOpacity> */}
          <View
            // onPress={() => setModalVisible(true)}
            // style={{ flexDirection: 'row', alignItems: 'center' }}
            style={[
              styles.textView,
              {
                borderColor: getBorderColor(),
                elevation: 8,
                // height: 65,
                paddingHorizontal: 15,
                paddingVertical: 10,
                alinItem: 'center',
                // flexDirection: 'row'

                // flexDirection: getFlexDirection(),
              },
              {
                shadowOffset: {
                  width: 3,
                  height: 3,
                },
              },
              {
                backgroundColor: getBgColor(),
                borderWidth: getBorderWidth(),
                borderRadius: 12,
                marginTop: 10,
                elevation: 8,
                marginBottom: 10,
              },
            ]}>
            {/* <Text>Selected Colors:</Text> */}
            <View
              style={{
                flexDirection: 'row',
                // height:30
              }}>
              {productColorArr?.map(color => (
                <View
                  key={color}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                    marginRight: 10,
                    maxWidth: 100,
                  }}>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 30,
                      backgroundColor: color,
                    }}
                  />
                  {/* <TouchableOpacity onPress={() => removeColor(color)}>
                    <AntDesign name="close" size={14} color={COLORS?.black}
                      style={{ marginLeft: 2 }} />
                  </TouchableOpacity> */}
                </View>
              ))}
            </View>
          </View>

          <Text
            style={[
              styles.productNameText,
              {
                flex: 1,
                fontSize: 16,
                color: COLORS?.black,
                fontFamily: FONTS?.medium,
                marginLeft: 5,
                marginBottom: 2,
                // marginTop: 10
              },
            ]}>
            Size
          </Text>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.colorList,
                {
                  // marginRight: 10,
                  marginBottom: 10,
                },
              ]}>
              {sizes
                .filter(size => selectedSizes.includes(size?.code))
                .map((size, index) => (
                  <View
                    key={index}
                    style={[
                      styles.colorItem,
                      {
                        // theme?.colors?.categorycolor
                        // : theme?.colors?.btntextColor,
                        borderWidth: 1,
                        borderColor: theme.colors?.grey,
                        backgroundColor: selectedSizes.includes(size?.code)
                          ? theme?.colors?.categorycolor
                          : theme?.colors?.btntextColor,
                          marginBottom:10
                      },
                    ]}
                  // onPress={() => toggleSizeSelection(size.code)}
                  >
                    <Text
                      style={[
                        styles.sizeLabel,
                        {
                          color: selectedSizes.includes(size.code)
                            ? 'white'
                            : theme?.colors?.white,
                        },
                      ]}>
                      {size.code}
                    </Text>
                  </View>
                ))}
            </ScrollView>
          </View>

          <VegUrbanEditText
            placeholder="Enter Description"
            label="Description"
            value={description}
            editable={false}
            maxLength={50}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setDecription(v)}
          />

          {/* <Button title="Save Product Description" onPress={handleSave} /> */}
          <VegUrbanEditText
            placeholder="Enter Shipping Days"
            label="Shipping Days"
            value={ShippingDays}
            keyBoardType={'number-pad'}
            editable={false}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setShippingdays(v)}
          />

          <VegUrbanEditText
            placeholder="Enter Title"
            label="Meta Title"
            value={meta_title}
            editable={false}
            maxLength={50}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setMetaTitle(v)}
          />

          <VegUrbanEditText
            placeholder="Enter Description"
            label="Meta Description"
            value={meta_description}
            maxLength={250}
            editable={false}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setMetaDcription(v)}
          />
        </View>
        <View
          style={{
            marginHorizontal: 15,
            // marginVertical: 5
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              color: COLORS?.black,
              fontFamily: FONTS?.medium,
              marginLeft: 5,
              marginBottom: 2,
              marginTop: 10,
            }}>
            Thumbnail Image
          </Text>

          {thumbImage ? (
            <TouchableOpacity onPress={() => openModalWithImage(thumbImage)}>
              <VegUrbanImageLoader
                styles={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginHorizontal: 20,
                  marginTop: 15,
                  borderWidth: 0.2,
                  borderColor: 'grey',
                  marginLeft: 10,
                }}
                source={IMAGE_BASE_URL + thumbImage}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* <Image
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 10,
                        marginHorizontal: 10,
                        marginTop: 15,
                        borderWidth: 0.2,
                        borderColor: 'grey',
                    }}
                    source={{
                        uri: item?.thumbnail_image,
                    }}
                /> */}
        <View
          style={{
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              color: COLORS?.black,
              fontFamily: FONTS?.medium,
              marginLeft: 5,
              marginBottom: 2,
              marginTop: 10,
            }}>
            Product Image
          </Text>

          <FlatList
            data={imageEditArray}
            extraData={imageEditArray}
            renderItem={renderPicture}
            horizontal
          />
        </View>

        {/* {details && details.product_images[0] && details.product_images[0].length > 0 ? (
                    <ImageBackground
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 10,
                            marginHorizontal: 10,
                            marginTop: 15,
                            borderWidth: 0.2,
                            borderColor: 'grey',
                        }}
                        source={{
                            uri: details.product_images[0],
                        }}
                    />
                ) : null} */}

        <View
          style={{
            flex: 1,
            marginBottom: 50,
          }}></View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedImage(null);
        }}>
        <View
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalInnerContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedImage(null);
              }}>
              <MaterialIcons name="close" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <VegUrbanImageLoader
              styles={{
                // height: 300,
                height: '100%',
                width: Dimensions.get('window').width,
                resizeMode: 'contain',
                justifyContent: 'center',
                marginTop: 20,
              }}
              // resizeMode={'contain'}
              source={
                selectedImage?.startsWith('data')
                  ? selectedImage
                  : IMAGE_BASE_URL + selectedImage
              }

            // PlaceholderContent={
            //     <ActivityIndicator color={COLORS.white} size="large" />
            // }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  tagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 5,
  },
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
  colorItem: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginLeft: 10,
  },
  colorLabel: {
    fontSize: 16,
    fontFamily: FONTS?.bold,
    // fontWeight: 'bold',
    color: 'white',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: 'black',
  },
  modalContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: Dimensions.get('window').width,
    // backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backgroundColor: COLORS?.colorPrimary,
  },
  modalInnerContainer: {
    alignItems: 'center',
    // flex: 1,
    // height: '100%',
    // width: Dimensions.get('window').width,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  fullScreenImage: {
    width: '50%',
    height: '30%',
    // Other styles
    backgroundColor: 'white',
    flex: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    // Other styles
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 10,
    // Other styles
  },
});
