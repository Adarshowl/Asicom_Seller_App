import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  I18nManager,
  Image,
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

const AddNewProduct = () => {
  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;

  const error = '';

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState('');
  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const appcurrency = useSelector(state => state.state?.appcurrency);

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
        // If editing an existing tag
        const newTags = [...tags];
        newTags[editIndex] = text.trim();
        setTags(newTags);
        setEditIndex(null);
      } else {
        // If adding a new tag
        setTags([...tags, text.trim()]);
      }
      setText('');
    }
  };
  const renderTag = (tag, index, onPress) => {
    return (
      <TouchableOpacity key={index} onPress={onPress}>
        <View style={{ backgroundColor: 'gray', padding: 5, margin: 3 }}>
          <Text style={{ color: 'white' }}>{tag}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleTagPress = index => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const [productName, setProductName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selctUnit, setSelectUnit] = useState([]);
  const [selctTax, setselectTax] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selctedColors, setSelectColors] = useState([]);

  const [quntity, setQuntity] = useState('');
  const [taxpercentage, setTaxPercentage] = useState('');
  const [taxAmount, setTaxAmount] = useState('');

  const [videoLink, setVideoLink] = useState('');

  const [weight, setWeight] = useState('');
  const [barcode, setBarcode] = useState('');
  const [slug, setSlug] = useState('');
  const [Productwarranty, setProductwarranty] = useState('');
  const [ReturnPolicy, setReturnPolicy] = useState('');
  const [meta_title, setMetaTitle] = useState('');
  const [description, setDecription] = useState('');
  const [ShippingDays, setShippingdays] = useState('');
  const [sku, setSku] = useState('');

  const [meta_description, setMetaDescription] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterLimit = 250;
  const [errorMessage, setErrorMessage] = useState('');

  const handleMetaDescriptionChange = text => {
    if (text?.length <= maxCharacterLimit) {
      setMetaDescription(text);
      setCharacterCount(text?.length);
      setErrorMessage('');
    } else {
      setErrorMessage('Character limit exceeded');
      setCharacterCount(text.length);
    }
  };
  console.log('tags>>>>---', tags);

  const [isRefundable, setIsRefundable] = useState(false);
  const [productDescription, setProductDescription] = useState('');
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
  const userToken = useSelector(state => state.state?.userToken);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);

  const [focused, setFocused] = React.useState(false);
  const [focused1, setFocused1] = React.useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const appPrimaryColor = useSelector(state => state.state?.appPrimaryColor);

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

  const AvailableColors = [
    { name: 'red', colorCode: '#873600' },
    { name: 'green', colorCode: '##515A5A' },
    { name: 'blue', colorCode: '#0000FF' },
    { name: 'yellow', colorCode: '#BB8FCE' },
    { name: 'magenta', colorCode: '#F39C12' },
    { name: 'cyan', colorCode: '#27AE60' },
  ];

  //   const [selectedColors, setSelectedColors] = useState([]);

  const onSelectedItemsChange = selectedItems => {
    setSelectedColors(selectedItems);
  };

  const sizes = [
    { label: 'Small', code: 'S', no: '6' },
    { label: 'Medium', code: 'M', no: '7' },
    { label: 'Large', code: 'L', no: '8' },
    { label: 'Small', code: 'XL', no: '9' },
    { label: 'Medium', code: 'XXL', no: '10' },
    { label: 'Large', code: 'XXXL', no: '11' },
  ];

  const toggleSizeSelection = sizeCode => {
    if (selectedSizes.includes(sizeCode)) {
      setSelectedSizes(selectedSizes.filter(code => code !== sizeCode));
    } else {
      setSelectedSizes([...selectedSizes, sizeCode]);
    }
  };
  // const handleColorSelect = (color) => {
  //     setSelectedColors(color);

  // };
  const [modalVisible, setModalVisible] = useState(false);

  const handleColorSelect = colorCode => {
    if (selectedColors.includes(colorCode)) {
      setSelectedColors(selectedColors.filter(color => color !== colorCode));
    } else {
      setSelectedColors([...selectedColors, colorCode]);
    }
  };

  const removeColor = colorCode => {
    setSelectedColors(selectedColors.filter(color => color !== colorCode));
  };

  const handleselet = selectedItems => {
    setSelectedCategories(selectedItems);
    getSubCategory(selectedItems);
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

  const handleColorChange = colors => {
    setSelectColors(selectedItems);
  };

  const handleBrandChange = selectedItems => {
    setSelectedBrands(selectedItems);
  };

  const [imageEditArray, setImageEditArray] = useState([]);
  const userData = useSelector(state => state.state?.userData);

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
      //     data:"data:image/jpeg;base64," + images.data,
      //     'Content-Type': 'image/jpeg',
      //     ext: 'jpeg',
      //     type: 'image',

      //     size: images?.size,
      // };
      var data = 'data:image/jpeg;base64,' + images.data;
      // img.push(data);
      // imageArray.push(images);
      setImageEditArray([...imageEditArray, data]);
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
      setThumbImage('data:image/jpeg;base64,' + images.data);
    });
    setCount(0);
    // setImageArray(imageArray);
    setCount(0);
  };

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to storage for photos',
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

  const richText = useRef();
  const [showEmpty, setShowEmpty] = useState(false);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    // isPermitted()
    //   .then(res => {
    //     setPermission(res);
    //     console.log('is permitted res - > ', res);
    //   })
    //   .catch(err => {
    //     setPermission(false);
    //     console.log('is permitted error - > ', err);
    //   });

    const requestExternalWritePermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs write permission',
            },
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          alert('Write permission err', err);
        }
        return false;
      } else return true;
    };
    requestExternalWritePermission();

    getbrand();
    getShopCategory();
    getSubCategory();
  }, []);

  const [category, setCategory] = useState([]);
  const [subcategory, setsubCategory] = useState([]);

  const [brand, setBrand] = useState([]);
  // console.log("brand", brand)

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
            console.log(
              'Response data: ',
              JSON.stringify(response?.data?.response),
            );
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
  console.log(selctedColors);

  const getSubCategory = selectedItems => {
    // console.log("Selected category", selectedCategories);
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
            // console.log("Sub category: ", JSON.stringify(response));
            const responseData = response?.data?.data;

            const subCategoryNames = responseData.map(
              item => item?.parent_category_id?.category_name,
            );
            console.log('Se subCategoryNames', subCategoryNames);
            console.log('selecte Categories', selectedItems);
            // const matchingCategories = subCategoryNames.filter(category => {
            //   return selectedItems.includes(category);
            // });
            const matchingCategories = responseData.filter(
              item => item.parent_category_id?.category_name === selectedItems,
            );
            console.log('Matching categories:', matchingCategories);

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

  // const getSubCategory = () => {

  //   console.log("selct category", selectedCategories)
  //   setLoading(true);
  //   try {

  //     ShowConsoleLogMessage(API_END_POINTS.SUB_CATEGORY_LIST);
  //     console.log(userToken);
  //     ApiCall('get', null, API_END_POINTS.SUB_CATEGORY_LIST, {
  //       'Content-Type': 'application/json',
  //       'x-access-token': userToken || userData?.jwtoken,
  //     })
  //       .then(response => {
  //         if (response?.statusCode === 200) {
  //           // console.log("sub category: ", JSON.stringify(response));
  //           const responseData = response?.data?.data;

  //           // const subCategoryNames = response?.data?.data?.parent_category_id?.category_name
  //           const subCategoryNames = responseData.map(item => item?.parent_category_id?.category_name);

  //           console.log("subCategoryNames", subCategoryNames)

  //           // Check if any selected category matches with subCategoryNames
  //           const matchingCategories = selectedCategories.filter(category =>
  //             subCategoryNames.includes(category)
  //           );
  //           console.log("matchingCategories", matchingCategories)

  //           if (matchingCategories.length > 0) {
  //             // If any selected category matches, set sub categories
  //             setsubCategory(responseData);
  //             setShowEmpty(false); // Assuming that if matching categories are found, it's not empty
  //           } else {
  //             // If no match found, handle accordingly (set sub categories to empty or show empty)
  //             // setsubCategory([]);
  //             setShowEmpty(true); // Empty since no matching categories found
  //           }
  //           if (response.data?.length !== 0) {
  //             setShowEmpty(true);
  //           }
  //         } else if (response?.statusCode === 500) {
  //           setShowEmpty(false);
  //         } else {
  //           setShowEmpty(true);
  //         }
  //       })
  //       .catch(error => {
  //         setShowEmpty(true);
  //         // console.log("Error with Axios request: ", error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   } catch (error) {
  //     // ShowToastMessage(`You selected: ${error.message}`);
  //     setLoading(false);
  //   }
  // };

  const updtaenowproduct = async () => {
    setLoading(true);

    const enteredAmount = parseInt(amount);
    const enterQuntity = parseInt(quntity);
    console.log(enterQuntity);
    try {
      if (!productName) {
        ShowToastMessage('product Name is Required');
        setLoading(false);
        return;
      }
      if (selectedCategories.length === 0) {
        ShowToastMessage('Categories is Required');
        setLoading(false);
        return;
      }
      if (selectedSubCategories.length === 0) {
        ShowToastMessage('Sub Categories is Required');
        setLoading(false);
        return;
      }
      if (selectedBrands.length === 0) {
        ShowToastMessage('Brand is Required');
        setLoading(false);
        return;
      }
      if (!amount) {
        ShowToastMessage('Amount is Required');
        setLoading(false);
        return;
      }
      if (!quntity) {
        ShowToastMessage('Quntity is Required');
        setLoading(false);
        return;
      }
      if (!weight) {
        ShowToastMessage('Weight is Required');
        setLoading(false);
        return;
      }
      if (!videoLink) {
        ShowToastMessage('Video Link is Required');
        setLoading(false);
        return;
      }
      if (selctUnit.length === 0) {
        ShowToastMessage('Unit is Required');
        setLoading(false);
        return;
      }
      if (selectedColors.length === 0) {
        ShowToastMessage('Please Select a Color');
        setLoading(false);
        return;
      }
      if (selectedSizes.length === 0) {
        ShowToastMessage('Size is Required');
        setLoading(false);
        return;
      }
      if (!description) {
        ShowToastMessage('Decription is Required');
        setLoading(false);
        return;
      }
      if (!barcode) {
        ShowToastMessage('BarCode is Required');
        setLoading(false);
        return;
      }
      if (!slug) {
        ShowToastMessage('Slug is Required');
        setLoading(false);
        return;
      }
      if (!sku) {
        ShowToastMessage('SKU is Required');
        setLoading(false);
        return;
      }
      if (!tags) {
        ShowToastMessage('Tags is Required');
        setLoading(false);
        return;
      }
      if (!ShippingDays) {
        ShowToastMessage('ShippingDays is Required');
        setLoading(false);
        return;
      }
      if (selctTax.length === 0) {
        ShowToastMessage('Tax is Required');
        setLoading(false);
        return;
      }
      if (!ShippingDays) {
        ShowToastMessage('ShippingDays is Required');
        setLoading(false);
        return;
      }
      if (!ReturnPolicy) {
        ShowToastMessage('ReturnPolicy is Required');
        setLoading(false);
        return;
      }
      if (!Productwarranty) {
        ShowToastMessage('Productwarranty is Required');
        setLoading(false);
        return;
      }

      if (!meta_title) {
        ShowToastMessage('Title is Required');
        setLoading(false);
        return;
      }
      if (!meta_description) {
        ShowToastMessage('Meta Description is Required');
        setLoading(false);
        return;
      }
      if (!thumbImage) {
        ShowToastMessage('ThumbImage is Required');
        setLoading(false);
        return;
      }
      if (imageEditArray.length === 0) {
        ShowToastMessage('Prodcut Image is Required');
        setLoading(false);
        return;
      }

      if (/^\d+\.\d+$/.test(quntity)) {
        ShowToastMessage('Decimal values are not Allowed');
        setLoading(false);
        return;
      }
      if (isNaN(enterQuntity) || enterQuntity <= 0) {
        ShowToastMessage('Quntity must be at least 1');
        setLoading(false);
        return;
      }
      if (/^\d+\.\d+$/.test(amount)) {
        ShowToastMessage('Decimal values are not Allowed');
        setLoading(false);
        return;
      }
      if (isNaN(enteredAmount) || enteredAmount <= 0) {
        ShowToastMessage('Amount must be at Least 1');
        setLoading(false);
        return;
      } else {
        const body = {
          product_name: productName,
          category: selectedCategories,
          subcategory: selectedSubCategories,
          brand: selectedBrands,
          slug: slug,
          product_barcode: barcode,
          product_warranty: Productwarranty,
          product_return_policy: ReturnPolicy,
          thumbnail_image: thumbImage,
          quantity: quntity,
          amount: amount,
          description: description,
          unittype: selctUnit,
          weight: weight,
          tags: tags,
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
          taxby: selctTax,
          taxamount: taxAmount,
          taxpercentage: taxpercentage,
          meta_title: meta_title,
          meta_description: meta_description,
          product_images: imageEditArray,
          // product_images: ['data:image/jpeg;base64,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']
        };
        ShowConsoleLogMessage(API_END_POINTS.ADD_PRODUCT_API);
        // console.log("body", imageEditArray?.length)

        try {
          const response = await ApiCall(
            'post',
            body,
            API_END_POINTS.ADD_PRODUCT_API,
            {
              'Content-Type': 'application/json',
              'x-access-token': userToken || userData?.remember_token,
            },
          );
          console.log(
            'Product Added Successfully',
            JSON.stringify(response.data),
          );

          if (response?.statusCode === 200) {
            // console.log(" producr add ", JSON.stringify(response.data));
            // setDashboard(response?.data?.data)
            navigation.goBack('Products');
            ShowToastMessage(
              'Product Added Successfully',
              response?.data?.message,
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
                      clearUserToken();
                    },
                  },
                ],
              );
            }
          } else {
          }
        } catch (error) {
          // console.error('Error making API call:', error);
          ShowToastMessage(response?.data?.message);
        }
      }
    } catch (error) {
      console.error('Error in login process:', error);
      ShowToastMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = index => {
    let a = [...imageEditArray];
    a.splice(index, 1);
    setImageEditArray(a);
    // setImageArray(a);
  };

  const renderPicture = ({ item, index }) => {
    // console.log(JSON.stringify(item));
    return (
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
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
            marginHorizontal: 10,
          }}
          source={{
            uri: item || item?.cause_image,
          }}
        />
      </View>
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
          title="Add Product"
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

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps={'handled'}>
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
            maxLength={100}
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
              <Picker.Item label="Select a Category" value={null} />

              {category.map(category => (
                <Picker.Item
                  label={category.category_name}
                  value={category.category_name}
                  key={category.category_id}
                />
              ))}
            </Picker>
          </View>

          {selectedCategories && selectedCategories.length > 0 && (
            <View>
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
                  <Picker.Item label="Select a Sub Category" value={null} />

                  {subcategory.map(category => (
                    <Picker.Item
                      label={category.sub_category_name}
                      value={category.sub_category_name}
                      key={category._id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )}

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
              <Picker.Item label="Select a Brand" value={null} />
              {brand.map(brand => (
                <Picker.Item
                  label={brand.brand_name}
                  value={brand._id}
                  key={brand?._id}
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
            placeholder="Enter Amount"
            label="Amount"
            value={amount}
            iconPosition={'left'}
            maxLength={20}
            icon={
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS?.gray,
                  marginHorizontal: 15,
                }}>
                {appcurrency}
              </Text>
              // <FontAwesome
              //     name={"dollar"}
              //     size={16}
              //     color={COLORS.grey}
              //     style={{
              //         marginHorizontal: 15
              //     }} />
            }
            keyBoardType={'number-pad'}
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
                  />
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
                marginBottom: 10,
              },
            ]}>
            <Picker
              selectedValue={selctUnit}
              onValueChange={itemValue => handleUnitType(itemValue)}
              mode="dropdown">
              <Picker.Item label="Select a Unit" value={null} />
              {unitType.map(name => (
                <Picker.Item
                  label={name.name}
                  value={name.name}
                  key={name.code}
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
              <Picker.Item label="Select a Tax" value={null} />
              {tax.map(name => (
                <Picker.Item
                  label={name.name}
                  value={name.name}
                  key={name.code}
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
            maxLength={20}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setProductwarranty(v)}
          />

          <VegUrbanEditText
            placeholder="Enter Return Policy"
            label="Return Policy"
            value={ReturnPolicy}
            maxLength={20}
            keyBoardType={'number-pad'}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setReturnPolicy(v)}
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
              submitButtonStyle={{ display: 'none', borderRadius: 10 }}
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

          {/* <View>
                        <Text style={{
                            flex: 1,
                            fontSize: 16,
                            color: COLORS?.black,
                            fontFamily: FONTS?.medium,
                            marginLeft: 5,
                            marginBottom: 2,
                            marginTop: 10
                        }}>
                            Color
                        </Text>
                    </View> */}
          {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text>Choose Colors</Text>
                    </TouchableOpacity> */}

          {/* <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={{
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: COLORS?.transparent
                        }}>

                            <View style={{

                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: COLORS?.black,
                                    fontFamily: FONTS?.medium,
                                    marginLeft: 5,
                                    marginBottom: 2,
                                    marginTop: 10
                                }}>
                                    colorList
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '90%',
                                    height: 1,
                                    backgroundColor: COLORS?.black,
                                    // borderColor: COLORS?.black
                                }}
                            ></View>
                            <View style={{
                                backgroundColor: COLORS?.white,
                                //  borderRadius: 10 ,
                                width: '100%',
                                height: 300,
                                paddingHorizontal: 30,
                                paddingVertical: 10
                            }}>
                                <FlatList
                                    data={colors}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item) => item.code}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => handleColorSelect(item.label)}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginVertical: 5,

                                            }} >
                                            <View
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 10,
                                                    backgroundColor: item.label,
                                                    marginRight: 10,
                                                    justifyContent: 'center'

                                                    // borderWidth: 1,
                                                    // borderColor: '#000',
                                                }}
                                            >
                                                {selectedColors.includes(item.label) && (
                                                    <Octicons
                                                        name="check"
                                                        size={15}
                                                        color="#FFF" style={{ alignSelf: 'center' }}
                                                    />
                                                )}
                                            </View>
                                            <Text>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                />

                                <View style={{
                                    alignItems: 'center'
                                }}>
                                    <VegUrbanCommonBtn
                                        height={35}
                                        width={'60%'}
                                        borderRadius={15}
                                        textSize={16}
                                        // textColor={COLORS?.white}

                                        textColor={COLORS?.white}

                                        text={('Close')}
                                        backgroundColor={COLORS?.colorPrimary}
                                        onPress={() => {
                                            setModalVisible(false)
                                            // navigation.navigate('Products');
                                        }}
                                        textStyle={{
                                            fontFamily: FONTS?.bold,

                                            // textTransform: 'uppercase',
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal> */}

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
                  paddingBottom: 10,
                  paddingEnd: 10,
                  // backgroundColor: 'red',
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
                        marginTop: 12,
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
            style={{
              color: theme?.colors?.white,
            }}
            maxLength={150}
            // onChangeText={handleDescriptionChange}

            onChangeText={v => setDecription(v)}
          />
          <Text style={{ color: COLORS?.gray, fontSize: 12, marginLeft: 5 }}>
            Maximum 150 Characters
          </Text>

          <VegUrbanEditText
            placeholder="Enter Shipping Days"
            label="Shipping Days"
            value={ShippingDays}
            keyBoardType={'number-pad'}
            maxLength={20}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setShippingdays(v)}
          />

          <VegUrbanEditText
            placeholder="Enter SKU"
            label="SKU"
            value={sku}
            maxLength={20}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setSku(v)}
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
            maxLength={50}
            multiline={true}
            style={{
              color: theme?.colors?.white,
            }}
            onChangeText={v => setMetaTitle(v)}
          />
          <Text style={{ color: COLORS?.gray, fontSize: 12 }}>
            Maximum 50 Characters
          </Text>

          <VegUrbanEditText
            placeholder="Enter Description"
            label="Meta Description (Maximum 250 Characters)"
            value={meta_description}
            multiline={true}
            maxLength={250}
            style={{
              color: 'black',
            }}
            onChangeText={v => setMetaDescription(v)}

          // onChangeText={handleMetaDescriptionChange}
          />
          <Text style={{ color: COLORS?.gray, fontSize: 12 }}>
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
          //   if (permission) {
          //     openThumbImagePicker();
          //   } else {
          //     ShowToastMessage('Storage permission required');
          //   }
          // }}
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
            borderColor: thumbSelected ? COLORS.primaryColor : COLORS.grey,
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
              marginEnd: 20,
            }}>
            Upload Thumbnail Image
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={25}
            color={COLORS?.gray}
            style={{
              marginEnd: 5,
            }}
          />
        </TouchableOpacity>
        {thumbImage ? (
          <Image
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
              uri: thumbImage?.startsWith('data')
                ? thumbImage
                : IMAGE_BASE_URL + thumbImage,
            }}
          />
        ) : null}

        {/*<Text>{thumbImage}</Text>*/}

        <TouchableOpacity
          onPress={() => {
            if (isPermitted() && imageEditArray?.length < 3) {
              openImagePicker();
              setSelectedImagesCount(prevCount => prevCount + 1);
            }
          }}
          // onPress={() => {
          //   if (permission && imageEditArray?.length < 3) {
          //     openImagePicker();
          //     setSelectedImagesCount(prevCount => prevCount + 1);
          //   } else {
          //     ShowToastMessage('Storage permission required');
          //   }
          // }}
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
        {/* {imageEditArray && imageEditArray.length > 0 ? (
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
                            uri: imageEditArray, // Accessing the first image URI from the array
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
        height={40}
        width={'100%'}
        borderRadius={2}
        textSize={16}
        // textColor={COLORS?.white}

        textColor={COLORS?.white}
        text={'Add Product'}
        backgroundColor={appPrimaryColor}
        onPress={() => {
          updtaenowproduct();
          // console.log("applied")
          // navigation.navigate('Products');
        }}
        textStyle={{
          fontFamily: FONTS?.bold,

          // textTransform: 'uppercase',
        }}
      />
    </View>
  );
};

export default AddNewProduct;
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

  colorBox: {
    width: 100,
    height: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  selectedColorText: {
    color: 'white',
    fontWeight: 'bold',
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
    marginHorizontal: 10,
    // paddingVertical:20,
    // height:50,
    // elevation:10,
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
