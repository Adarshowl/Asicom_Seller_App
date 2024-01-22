import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  I18nManager,
  Image,
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
import MultiSelect from 'react-native-multiple-select';

import { Picker } from '@react-native-picker/picker';
import GlobalStyle from '../../styles/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import { COLORS } from '../../constants/Colors';
import { ShowConsoleLogMessage, ShowToastMessage } from '../../utils/Utility';

import { useSelector } from 'react-redux';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS, IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import SellerEProgressBar from '../../utils/SellerEProgressBar';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';

const UpdateProduct = ({ route }) => {
  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);
  const appcurrency = useSelector(state => state.state?.appcurrency);

  const error = '';
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const removeTag = index => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const editTag = index => {
    const tagToEdit = tags[index];
    setText(tagToEdit);
    setEditIndex(index);
  };
  const addTag = () => {
    if (text.trim() !== '') {
      if (editIndex !== null) {
        const newTags = [...tags];
        newTags[editIndex] = text.trim();
        setTags(newTags);
        setEditIndex(null);
      } else {
        setTags([...tags, text.trim()]);
      }
      setText('');
    }
  };
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
  const [sku, setSku] = useState('');

  const [selectedImagesCount, setSelectedImagesCount] = useState(0);
  const [taxpercentage, setTaxPercentage] = useState('');
  const [taxAmount, setTaxAmount] = useState('');

  const [videoLink, setVideoLink] = useState('');
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
  // console.log('hhhhhhhh', item?.brand);
  const [apiSizes, setApiSizes] = useState([]);
  const [apiColors, setApiColors] = useState([]);

  useEffect(() => {
    getProdcutDetails();
  }, []);

  const [details, setDetails] = useState('');
  const [address, setAddressData] = useState({});

  const [OrderProduct, setOrderProduct] = useState({});

  // console.log(" Product details", details)

  const getProdcutDetails = () => {
    setLoading(true);
    try {
      // console.log(
      //   'response axios >>> ',
      //   JSON.stringify(API_END_POINTS.PRODUCT_DETAILS_API + id),
      // );
      // console.log('response axios >>> ', userToken);

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

  // console.log('Item in :', details?.productcolor);
  // console.log("jjjj", selectedBrands)

  useEffect(() => {
    if (details) {
      setProductName(details?.product_name);
      setAmount(details.amount.toString());
      setQuntity(details?.quantity.toString());
      setWeight(details?.weight.toString());
      setBarcode(details?.product_barcode);
      setSlug(details?.slug);
      setSku(details?.productsku);
      setSelectUnit(details?.unittype);
      setSelectedCategories(item?.category);
      setSelectedSubCategories(details?.subcategory);
      setSelectedBrands(item?.brand);
      // setSelectedSizes(apiSizes);
      setVideoLink(details?.videolink);
      setProductDescription(details?.meta_description);
      setMetaDcription(details?.meta_description);
      setMetaTitle(details?.meta_title);
      setReturnPolicy(details?.product_return_policy);
      setShippingdays(details?.estimateshippingdays.toString());
      setDecription(details?.description);
      setImageEditArray(details?.product_images);
      setProductColorArr(details?.productcolor);
      setThumbImage(details?.thumbnail_image);
      setSelectedSizes(details?.productsize);
      setSelectedColors(details?.productcolor);
      setTaxAmount(
        details?.taxamount !== null ? details.taxamount.toString() : '',
      );
      setTaxPercentage(
        details?.taxpercentage !== null ? details.taxpercentage.toString() : '',
      );
      setselectTax(details?.taxby);
      setProductwarranty(details?.product_warranty);
      setReturnPolicy(details?.product_return_policy.toString());
      setTags(details?.tags);
      // if (details?.tags && Array.isArray(details?.tags)) {
      //     setTags(details?.tags.join(','));
      // }
      // console.log("type of  ->>> ", typeof details?.product_images[0])
      //console.log(" 0 index image -> "  , details)
    }
  }, [details]);

  const initializeTags = () => {
    if (Array.isArray(details?.tags) && details?.tags.length > 0) {
      setTags([...details?.tags]);
    }
  };

  useEffect(() => {
    initializeTags();
  }, []);
  // console.log('-------', details?.tags);
  // useEffect(() => {
  //     if (details) {
  //         setProductName(details?.product_name);
  //         setAmount(details.amount !== null ? details.amount.toString() : '');
  //         setQuntity(details?.quantity !== null ? details.quantity.toString() : '');
  //         setWeight(details?.weight !== null ? details.weight.toString() : '');
  //         setBarcode(details?.product_barcode);
  //         // ... other setters with similar checks
  //         setTaxAmount(details?.taxamount !== null ? details.taxamount.toString() : '');
  //         setTaxPercentage(details?.taxpercentage !== null ? details.taxpercentage.toString() : '');
  //         // ... other setters with similar checks

  //         if (details?.tags && Array.isArray(details?.tags)) {
  //             setTags(details?.tags.join(','));
  //         }
  //     }
  // }, [details]);

  const AvailableColors = [
    { name: 'red', colorCode: '#873600' },
    { name: 'green', colorCode: '##515A5A' },
    { name: 'blue', colorCode: '#0000FF' },
    { name: 'yellow', colorCode: '#BB8FCE' },
    { name: 'magenta', colorCode: '#F39C12' },
    { name: 'cyan', colorCode: '#27AE60' },
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

  const onSelectedItemsChange = selectedItems => {
    console.log('ssssssss', selectedItems);
    setSelectedColors(selectedItems);
  };
  const handleUnitType = unit => {
    setSelectUnit(unit);
  };
  const handleTax = tax => {
    setselectTax(tax);
  };

  const handleSubCategoryselet = selectedItems => {
    setSelectedSubCategories(selectedItems);
  };

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
    getSubCategory(selectedItems);

  };

  const handleColorChange = colors => {
    setSelectColors(selectedItems);
  };

  const handleBrandChange = selectedItems => {
    setSelectedBrands(selectedItems);
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
      // var data = 'data:image/jpeg;base64,' + images.data;
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
      freeStyleCropEnabled: true,
      compressImageQuality: 0.4,
      forceJpg: true,
      includeBase64: true,
    }).then(images => {
      // setThumbImage(images.path || item?.thumbnail_image);
      setThumbImage(
        'data:image/jpeg;base64,' + images.data || item?.thumbnail_image,
      );
    });
    setCount(0);
    // setImageArray(imageArray);
    setCount(0);
  };

  const openModalWithImage = imageUri => {
    setSelectedImage(imageUri);
    setModalVisible(true);
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
    getSubCategory();
  }, []);

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [subcategory, setsubCategory] = useState([]);

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
  console.log(tags);

  const getSubCategory = (selectedItems) => {
    setLoading(true);
    try {
      ShowConsoleLogMessage(API_END_POINTS.SUB_CATEGORY_LIST);
      console.log(userToken);
      ApiCall('get', null, API_END_POINTS.SUB_CATEGORY_LIST, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response));
            const responseData = response?.data?.data;

            const subCategoryNames = responseData.map(item => item?.parent_category_id?.category_name);
            console.log("Se subCategoryNames", subCategoryNames);
            console.log("selecte Categories", selectedItems);
            // const matchingCategories = subCategoryNames.filter(category => {
            //   return selectedItems.includes(category);
            // });
            const matchingCategories = responseData.filter(item =>
              item.parent_category_id?.category_name === selectedItems
            );
            console.log("Matching categories:", matchingCategories);

            if (matchingCategories.length > 0) {
              setsubCategory(matchingCategories);
            } else {
              setsubCategory([]);
            }
            setShowEmpty(matchingCategories.length === 0); // Empty if no matching categories found

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

  const updateproductData = () => {
    setLoading(true);
    // console.log("iiiiiiii", bankList[0]?._id)
    // console.log('Selected Categories:', selectedCategories);
    // console.log('Item Category:', item?.category);

    let categoryValue = '';

    if (Array.isArray(selectedCategories) && selectedCategories.length > 0) {
      categoryValue = selectedCategories.join(',');
    } else if (
      typeof selectedCategories === 'string' &&
      selectedCategories.trim() !== ''
    ) {
      categoryValue = selectedCategories;
    } else if (item?.category) {
      categoryValue = item?.category;
    }

    let brandValue = '';

    if (Array.isArray(selectedBrands) && selectedBrands.length > 0) {
      brandValue = selectedBrands.join(',');
    } else if (
      typeof selectedBrands === 'string' &&
      selectedBrands.trim() !== ''
    ) {
      brandValue = selectedBrands;
    } else if (item?.brand) {
      brandValue = item?.brand;
    }

    let subcatValue = '';

    if (Array.isArray(selectedCategories) && selectedCategories.length > 0) {
      subcatValue = selectedBrands.join(',');
    } else if (
      typeof selectedCategories === 'string' &&
      selectedCategories.trim() !== ''
    ) {
      subcatValue = selectedCategories;
    } else if (details?.subcategory) {
      subcatValue = details?.subcategory;
    }

    let taxvalue = '';

    if (Array.isArray(selctTax) && selctTax.length > 0) {
      taxvalue = selctTax.join(',');
    } else if (typeof selctTax === 'string' && selctTax.trim() !== '') {
      taxvalue = selctTax;
    } else if (details?.taxby) {
      taxvalue = details?.taxby;
    }
    // const tagsString = details?.tags.join(', ');

    let unitValue = '';

    if (Array.isArray(selctUnit) && selctUnit.length > 0) {
      unitValue = selctUnit.join(',');
    } else if (typeof selctUnit === 'string' && selctUnit.trim() !== '') {
      unitValue = selctUnit;
    } else if (details?.unittype) {
      unitValue = details?.unittype;
    }
    let tagsValue = '';

    if (Array.isArray(tags) && tags.length > 0) {
      tagsValue = tags.join(',');
    } else if (typeof tags === 'string' && tags.trim() !== '') {
      tagsValue = tags;
    } else if (details?.tags) {
      tagsValue = details?.tags;
    }
    console.log('Constructed Category Value:', tagsValue);
    let imageToSend = [];
    imageEditArray?.forEach(item => {
      if (item?.startsWith('data')) {
        imageToSend?.push(item);
      }
    });
    // details?.tags
    try {
      const body = {
        updateId: item?._id,
        product_name: productName,
        category: categoryValue,
        subcategory: subcatValue,
        brand: brandValue,
        slug: slug,
        product_barcode: barcode,
        product_warranty: Productwarranty,
        product_return_policy: ReturnPolicy,
        thumbnail_image: thumbImage || item?.thumbnail_image,
        // thumbnail_image: '',
        quantity: quntity,
        amount: amount,
        description: description,
        unittype: unitValue,
        weight: weight,
        tags: tagsValue,
        videolink: videoLink,
        productcolor: selectedColors,
        productsize: selectedSizes,
        discountby: 'xx',
        discountpercentage: '5',
        discountamount: '5',
        productsku: sku,
        shippingtype: '2',
        shippingcharges: '2',
        estimateshippingdays: ShippingDays,
        taxby: taxvalue,
        taxamount: taxAmount,
        taxpercentage: taxpercentage,
        meta_title: meta_title,
        meta_description: meta_description,
        product_images: imageEditArray,
        // product_images: imageToSend,
        // product_images: [
        //   'data:image/jpeg;base64,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',
        //   'data:image/jpeg;base64,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',
        // ],
      };

      // console.log('body for update', body);
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.UPDATE_PRODUCT_API));

      ApiCall('post', body, API_END_POINTS.UPDATE_PRODUCT_API, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.jwtoken,
      })
        .then(response => {
          console.log(' update product response ', JSON.stringify(response));

          if (response?.statusCode === 200) {
            // console.log(" add  ------", JSON.stringify(response));

            // setDashboard(response?.data?.data)
            console.log(
              'Product Added Successfully',
              JSON.stringify(response.data),
            );

            navigation.goBack('Produxts');
            ShowToastMessage(
              'Product Update Successfully',
              response?.data?.messgae,
            );
          } else if (response?.statusCode === 500) {
            if (response.data?.message === 'Token Mismatch') {
              Alert.alert(
                'Session Expired',
                'Your session has expired due to a security issue. Please log in again to continue using the application.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      //clearUserToken();
                    },
                  },
                ],
              );
            } else {
              ShowToastMessage('Product Update Failed');
            }
          } else {
            ShowToastMessage('Product Update Failed');
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

  const removeImage = index => {
    let a = [...imageEditArray];
    a.splice(index, 1);
    setImageEditArray(a);
    // setImageArray(a);
  };

  const [modalImage, setModalImage] = useState(false);

  const renderPicture = ({ item, index }) => {
    // console.log(" rendre picture ->>> ", typeof item[0]);
    // console.log(' rendre picture ->>> ', item);
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
          <MaterialIcons
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
          />
          <VegUrbanImageLoader
            styles={{
              width: 80,
              height: 80,
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            source={item?.startsWith('data') ? item : IMAGE_BASE_URL + item}
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
          title="Update Product"
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
              color: COLORS?.black,
              marginBottom: 10,
            }}>
            Product Information
          </Text>

          <VegUrbanEditText
            placeholder="Enter Product Name"
            label="Product Name"
            value={productName}
            maxLength={50}
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
            <Picker
              selectedValue={selectedCategories}
              onValueChange={itemValue => handleselet(itemValue)}
              mode="dropdown">
              {/* <Picker.Item label={item?.category} value={null} /> */}
              <Picker.Item label={details?.category || "Select a Category"} value={null}
                style={{
                  color: COLORS?.black,
                  backgroundColor: COLORS?.bg
                }}
              />

              {category.map(category => (
                <Picker.Item
                  label={category.category_name}
                  value={category.category_name}
                  key={category.category_id}
                  style={{
                    color: COLORS?.black,
                    backgroundColor: COLORS?.white
                  }}
                />
              ))}
            </Picker>
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
              },
            ]}>
            <Picker
              selectedValue={selectedSubCategories}
              onValueChange={itemValue => handleSubCategoryselet(itemValue)}
              mode="dropdown">
              {/* <Picker.Item label="Select a Sub Category" value={null} /> */}
              <Picker.Item label={details?.subcategory || 'Select a Sub Category'} value={null}
                style={{
                  color: COLORS?.black,
                  backgroundColor: COLORS?.bg
                }}
              />

              {subcategory.map(category => (
                <Picker.Item
                  label={category.sub_category_name}
                  value={category.sub_category_name}
                  key={category._id}
                  style={{
                    color: COLORS?.black,
                    backgroundColor: COLORS?.bg
                  }}
                />
              ))}
            </Picker>
          </View>

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
              Brand
            </Text>
          </View>
          <View
            style={[
              styles.textView,
              {
                borderColor: getBorderColor(),
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
                backgroundColor: getBgColor(),
                borderWidth: getBorderWidth(),
                borderRadius: 12,
                marginTop: 10,
                elevation: 8,
                marginBottom: 8,
              },
            ]}>
            <Picker
              selectedValue={selectedBrands}
              onValueChange={itemValue => handleBrandChange(itemValue)}
              mode="dropdown">
              <Picker.Item
                label={details?.brand?.brand_name || 'Select Brand'}
                value={item?.brand}
                style={{
                  color: COLORS?.black,
                  backgroundColor: COLORS?.bg
                }}
              />

              {brand.map(brand => (
                <Picker.Item
                  label={brand.brand_name}
                  value={brand._id}
                  key={brand?._id}
                  style={{
                    color: COLORS?.black,
                    backgroundColor: COLORS?.bg
                  }}
                />
              ))}
            </Picker>
            {/* <Picker
                            selectedValue={selectedBrands}
                            onValueChange={handleBrandChange}
                            mode="dropdown"
                            multiple
                        >
                            {brand.map(brand => (

                                <Picker.Item label={brand?.brand_name} value={brand?._id} key={brand?._id} />
                            ))}
                        </Picker> */}
          </View>
          <VegUrbanEditText
            // placeholder="Enter Amount"
            label="Amount"
            value={amount}
            iconPosition={'left'}
            keyBoardType={'number-pad'}
            icon={
              // <FontAwesome
              //     name={"dollar"}
              //     size={16}
              //     color={COLORS.grey}
              //     style={{
              //         marginHorizontal: 15
              //     }} />
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS?.gray,
                  marginHorizontal: 15,
                }}>
                {appcurrency}
              </Text>
            }
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setAmount(v)}
          />
          <VegUrbanEditText
            placeholder="Enter Quantity"
            label="Quantity"
            value={quntity}
            maxLength={20}
            style={{
              color: theme?.colors?.white,
            }}
            keyBoardType={'number-pad'}
            onChangeText={v => setQuntity(v)}
          />
          <VegUrbanEditText
            placeholder="Product Weight"
            label="Weight"
            value={weight}
            maxLength={20}
            style={{
              color: theme?.colors?.white,
            }}
            keyBoardType={'number-pad'}
            onChangeText={v => setWeight(v)}
          />

          <VegUrbanEditText
            placeholder="Enter Video Link"
            label="Video Link"
            value={videoLink}
            // maxLength={20}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setVideoLink(v)}
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
            <Picker
              selectedValue={selctUnit}
              onValueChange={itemValue => handleUnitType(itemValue)}
              mode="dropdown">
              <Picker.Item
                label={details?.unittype || 'Select a Unit'}
                value={null}
                style={{
                  color: COLORS?.black,
                  backgroundColor: COLORS?.bg
                }}
              />
              {unitType.map(name => (
                <Picker.Item
                  label={name.name}
                  value={name.name}
                  key={name.code}
                  style={{
                    color: COLORS?.black,
                    backgroundColor: COLORS?.bg
                  }}
                />
              ))}
            </Picker>
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
            <Picker
              selectedValue={selctTax}
              onValueChange={itemValue => handleTax(itemValue)}
              mode="dropdown">
              <Picker.Item label={'Select a Tax'} value={null}
                style={{
                  color: COLORS?.black,
                  backgroundColor: COLORS?.bg
                }}
              />
              {tax.map(name => (
                <Picker.Item
                  label={name.name}
                  value={name.name}
                  key={name.code}
                  style={{
                    color: COLORS?.black,
                    backgroundColor: COLORS?.bg
                  }}
                />
              ))}
            </Picker>
          </View>

          {selctTax === 'Amount' && (
            <VegUrbanEditText
              placeholder="Enter Tax Amount"
              label="Tax Amount"
              value={taxAmount}
              maxLength={20}
              style={{
                color: theme?.colors?.white,
              }}
              keyBoardType={'number-pad'}
              onChangeText={v => setTaxAmount(v)}
            />
          )}
          {selctTax === 'Percentage' && (
            <VegUrbanEditText
              placeholder="Enter Tax Percentage"
              label="Tax Percentage"
              value={taxpercentage}
              maxLength={20}
              style={{
                color: theme?.colors?.white,
              }}
              keyBoardType={'number-pad'}
              onChangeText={v => setTaxPercentage(v)}
            />
          )}

          <VegUrbanEditText
            placeholder="Enter Bar Code"
            label="Bar Code"
            value={barcode}
            maxLength={20}
            style={{
              color: theme?.colors?.white,
            }}
            keyBoardType={'number-pad'}
            onChangeText={v => setBarcode(v)}
          />
          <VegUrbanEditText
            placeholder="Enter Slug"
            label="Slug"
            value={slug}
            maxLength={20}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setSlug(v)}
          />
          <VegUrbanEditText
            placeholder="Enter Product warranty"
            label="Product warranty"
            value={Productwarranty}
            maxLength={100}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setProductwarranty(v)}
          />

          <VegUrbanEditText
            placeholder="Enter Return Policy"
            label="Return Policy"
            value={ReturnPolicy}
            maxLength={100}
            keyBoardType={'number-pad'}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setReturnPolicy(v)}
          />

          <VegUrbanEditText
            placeholder="Enter SKU"
            label="SKU"
            value={sku}
            maxLength={50}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setSku(v)}
          />
          <VegUrbanEditText
            placeholder="Enter Tags"
            label="Tags"
            value={text}
            maxLength={20}
            iconPosition={'right'}
            icon={
              <TouchableOpacity
                onPress={addTag}
                style={[
                  styles.addButton,
                  {
                    backgroundColor: appPrimaryColor,
                  },
                ]}>
                <Text style={styles.buttonText}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            }
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={setText}
            onSubmitEditing={addTag}
          />
          {/* <View>
                        <TagInput
                            value={tags}
                            onChange={(emails) => setTags({ emails })}
                            labelExtractor={(email) => email}
                            // text={text}
                            onChangeText={(text) =>setTags(text )}
                        />
                    </View> */}

          <View style={styles.inputContainer}>
            {/* <TextInput
                                style={styles.input}
                                placeholder="Add a tag"
                                value={text}
                                onChangeText={setText}
                                onSubmitEditing={addTag}
                            /> */}
            {/* <VegUrbanEditText
                            placeholder="Enter Tags"
                            label="Tags"
                            value={text}
                            maxLength={20}

                            style={{
                                color: theme?.colors?.white,
                            }}
                            onChangeText={setText}
                            onSubmitEditing={addTag}
                        />
                        <TouchableOpacity onPress={addTag}
                            style={styles.addButton}>
                            <Text style={styles.buttonText}>
                                {editIndex !== null ? 'Update' : 'Add'}
                            </Text>
                        </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tagWrapper}>
                <TouchableOpacity
                  onPress={() => editTag(index)}
                  style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => removeTag(index)}
                // style={styles.removeButton}
                >
                  <MaterialIcons
                    name="cancel"
                    size={22}
                    color={COLORS.primaryColor}
                    style={{
                      alignSelf: 'flex-end',
                    }}
                  // onPress={() => {
                  //     removeImage(index);
                  //     // deletePhoto(item?.id);
                  // }}
                  />
                  {/* <Text style={styles.removeButtonText}>
                                        X
                                    </Text> */}
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
          <View style={styles.container}>
            <MultiSelect
              items={AvailableColors}
              uniqueKey="name"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedColors}
              selectText="Select Colors"
              searchInputPlaceholderText="Search Colors..."
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor={COLORS?.black}
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor={COLORS?.black}
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor={COLORS?.colorPrimary}
              submitButtonText="Close"
              submitButtonStyle={{ display: 'none' }}
              elevation={10}
            />
            <View style={styles.selectedColorsContainer}>
              {/* <Text style={styles.selectedColorsText}>Selected Colors:</Text>
                            {selectedColors.map((color) => (
                                <View key={color.id} style={[styles.colorBox, { backgroundColor: color.colorCode }]}>
                                    <Text style={styles.selectedColorText}>{color.name}</Text>
                                </View>
                            ))} */}
            </View>
          </View>

          {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text>Choose Colors</Text>
                    </TouchableOpacity> */}
          {/* <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={[styles.textView,
                        {
                            borderColor: getBorderColor(),
                            elevation: 8,
                            height: 65,
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            alinItem: 'center',

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
                            elevation: 8
                        },
                        ]}
                    >
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View>
                                <Text style={{
                                    fontSize: 14,
                                    color: COLORS?.black,
                                }}>Choose Colors</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            {productColorArr?.map((color) => (
                                <View
                                    key={color}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: 5,
                                        marginRight: 10,
                                        maxWidth: 100,

                                    }}
                                >
                                    <View
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 30,
                                            backgroundColor: color,

                                        }}
                                    />
                                    <TouchableOpacity onPress={() => removeColor(color)}>
                                        <AntDesign name="close" size={14} color={COLORS?.black}
                                            style={{ marginLeft: 2 }} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </TouchableOpacity> */}

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
              {sizes.map((size, index) => (
                <TouchableOpacity
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
                    },
                  ]}
                  onPress={() => toggleSizeSelection(size.code)}>
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
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* <View style={{
                        alinItem: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        marginBottom: 12
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 17,
                            color: COLORS?.black,
                            fontFamily: FONTS?.medium,
                            marginLeft: 5
                        }}>Refundable</Text>
                        <Switch
                            value={isRefundable}
                            onValueChange={value => setIsRefundable(value)}
                        />
                    </View> */}

          {/*
                    <View>
                        <Text style={{
                            flex: 1,
                            fontSize: 17,
                            color: COLORS?.black,
                            fontFamily: FONTS?.medium,
                            marginLeft: 5
                        }}>
                            Product Description
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: COLORS?.black,
                            fontFamily: FONTS?.regular,
                            marginLeft: 5,
                            marginVertical: 8
                        }}>
                            Description
                        </Text>
                    </View> */}

          <VegUrbanEditText
            placeholder="Enter Description"
            label="Description"
            value={description}
            multiline={true}
            maxLength={150}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setDecription(v)}
          />
          <Text style={{ color: COLORS?.gray, fontSize: 12, marginLeft: 8 }}>
            Maximum 150 Characters
          </Text>

          {/* <Button title="Save Product Description" onPress={handleSave} /> */}
          <VegUrbanEditText
            placeholder="Enter Shipping Days"
            label="Shipping Days"
            maxLength={20}
            value={ShippingDays}
            keyBoardType={'number-pad'}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setShippingdays(v)}
          />

          {/* <View style={{
                        alinItem: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12,
                        marginBottom: 12,
                        elevation: 8
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 17,
                            color: COLORS?.black,
                            fontFamily: FONTS?.medium,
                            marginLeft: 5
                        }}>Cash on Delivery</Text>
                        <Switch
                            value={isCashOnDelivery}
                            onValueChange={value => setIsCashOnDelivery(value)}
                        />
                    </View> */}
          <VegUrbanEditText
            placeholder="Enter Title"
            label="Meta Title (Maximum 50 Characters)"
            value={meta_title}
            maxLength={100}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setMetaTitle(v)}
          />
          <Text style={{ color: COLORS?.gray, fontSize: 12, marginLeft: 8 }}>
            Maximum 50 Characters
          </Text>

          <VegUrbanEditText
            placeholder="Enter Description"
            label="Meta Description (Maximum 250 Characters)"
            value={meta_description}
            multiline={true}
            maxLength={250}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setMetaDcription(v)}
          />
          <Text style={{ color: COLORS?.gray, fontSize: 12, marginLeft: 8 }}>
            Maximum 250 Characters
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (isPermitted()) {
              openThumbImagePicker();
            }
          }}
          // onPress={() => {
          //   setThumbSelected(!thumbSelected);
          // }}
          style={{
            width: '95%',
            height: 80,
            flexDirection: 'row',
            marginTop: 25,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: thumbSelected ? COLORS.colorPrimary : COLORS.grey,
            borderRadius: 10,
            marginHorizontal: 8,
            backgroundColor: thumbSelected ? COLORS.ghostwhite : COLORS.white,
          }}>
          <Image
            style={{
              marginStart: 15,
              height: 25,
              width: 25,
              // opacity: imageArray.length < 3 ? 1 : 0.3,
            }}
            source={{
              uri: 'https://t4.ftcdn.net/jpg/03/83/26/13/360_F_383261384_86BWn0mijMqqo6svwYvLEDzcq9qe8w47.jpg',
              // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6BR2GViXukYWZ0TtHuQkIaBI__EyrpkYPpXPkvr-EBF6isTvEeqyTNdSL2RSEkNMX3dA&usqp=CAU',
            }}
          />
          <Text
            style={{
              fontSize: 16,
              color: appPrimaryColor,
              fontFamily: 'OpenSans-ExtraBold',

              // marginBottom: 15,
              marginEnd: 20,
              // textAlign: 'left',
            }}>
            Upload Thumbnail Image
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={25}
            color={COLORS?.gray}
            style={{
              marginEnd: 5,
              // opacity: imageArray.length < 3 ? 1 : 0.3,
            }}
          />
        </TouchableOpacity>
        {thumbImage ? (
          <TouchableOpacity onPress={() => openModalWithImage(thumbImage)}>
            <VegUrbanImageLoader
              styles={{
                width: 80,
                height: 80,
                borderRadius: 10,
                marginHorizontal: 10,
                marginTop: 15,
                borderWidth: 0.2,
                borderColor: 'grey',
              }}
              source={
                thumbImage?.startsWith('data')
                  ? thumbImage
                  : IMAGE_BASE_URL + thumbImage
              }
            />
          </TouchableOpacity>
        ) : null}
        {/*<Text>{thumbImage}</Text>*/}

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

        <TouchableOpacity
          onPress={() => {
            if (isPermitted() && imageEditArray?.length < 3) {
              openImagePicker();
              setSelectedImagesCount(prevCount => prevCount + 1);
            }
          }}
          disabled={imageEditArray?.length >= 3}
          style={{
            opacity: imageEditArray.length < 3 ? 1 : 0.3,

            width: '95%',
            height: 80,
            flexDirection: 'row',
            marginTop: 25,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,

            borderRadius: 10,
            marginHorizontal: 8,
            borderColor: pictureSelected ? COLORS.primaryColor : COLORS.grey,
            backgroundColor: pictureSelected ? COLORS.ghostwhite : COLORS.white,
          }}>
          <Image
            style={{
              marginStart: 15,
              height: 25,
              width: 25,
              // opacity: imageArray.length < 3 ? 1 : 0.3,
            }}
            source={{
              uri: 'https://t4.ftcdn.net/jpg/03/83/26/13/360_F_383261384_86BWn0mijMqqo6svwYvLEDzcq9qe8w47.jpg',
              // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6BR2GViXukYWZ0TtHuQkIaBI__EyrpkYPpXPkvr-EBF6isTvEeqyTNdSL2RSEkNMX3dA&usqp=CAU',
            }}
          />
          <View style={{ flexDirection: 'column', marginEnd: 50 }}>
            <Text
              style={{
                fontSize: 16,
                color: appPrimaryColor,
                fontFamily: 'OpenSans-ExtraBold',

                // marginBottom: 15,
              }}>
              Upload Product Image
            </Text>
            {/* <Text
                            style={{
                                fontSize: 14,
                                color: COLORS.black,
                                marginTop: 5,
                                fontFamily: 'OpenSans-Medium',
                            }}>
                            Max Three
                        </Text> */}
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={25}
            color={COLORS?.gray}
            style={{
              marginEnd: 5,
              opacity: imageArray.length < 3 ? 1 : 0.3,
            }}
          // onPress={() => {
          //   if (isPermitted()) {
          //     if (imageEditArray.length < 3) {
          //       openImagePicker();
          //     }
          //   }
          // }}
          />
        </TouchableOpacity>
        <FlatList
          data={imageEditArray}
          extraData={imageEditArray}
          renderItem={renderPicture}
          horizontal
        />
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
      <VegUrbanCommonBtn
        height={45}
        width={'100%'}
        borderRadius={2}
        textSize={16}
        // textColor={COLORS?.white}

        textColor={COLORS?.white}
        text={'Update Product'}
        backgroundColor={appPrimaryColor}
        onPress={() => {
          updateproductData();
          // navigation.navigate('Produxts')
        }}
        // onPress={
        //     updateproductData()
        // }
        textStyle={{
          fontFamily: FONTS?.bold,

          // textTransform: 'uppercase',
        }}
      />

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

export default UpdateProduct;
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
  selectedColorsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  selectedColorsText: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  colorBox: {
    width: 100,
    height: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    // padding: 10,
    marginHorizontal: 8,
    // borderWidth:0.5,
    // borderColor:COLORS?.black,
    // paddingVertical:20,
    // height:50,
    // elevation:10,
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

  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: 5,
  },
  tag: {
    backgroundColor: COLORS?.bg_gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    color: COLORS?.black,
    fontWeight: FONTS?.bold,
    fontSize: 14,
  },
  removeButton: {
    marginLeft: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#E53935',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: COLORS?.black,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
