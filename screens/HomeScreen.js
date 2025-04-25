import React from 'react';
import {
  Button,
  ExpoImage,
  Icon,
  Markdown,
  Pressable,
  ScreenContainer,
  SimpleStyleScrollView,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import {
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoBackendApi from '../apis/XanoBackendApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const HomeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [showContentModal, setShowContentModal] = React.useState(false);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const result = (await XanoBackendApi.contentGET(Constants))?.json;
        setGlobalVariableValue({
          key: 'PRIVACY_POLICY',
          value: (() => {
            const e = (result && result[0])?.privacy?.url;
            console.log(e);
            return e;
          })(),
        });
        setGlobalVariableValue({
          key: 'TERMS_CONDITIONS',
          value: (() => {
            const e = (result && result[0])?.terms?.url;
            console.log(e);
            return e;
          })(),
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          alignItems: [
            { minWidth: Breakpoints.Tablet, value: 'center' },
            { minWidth: Breakpoints.Laptop, value: 'center' },
            { minWidth: Breakpoints.Desktop, value: 'center' },
          ],
        },
        dimensions.width
      )}
    >
      {/* Container */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
            flex: [
              { minWidth: Breakpoints.Mobile, value: 1 },
              { minWidth: Breakpoints.Tablet, value: 1 },
            ],
            justifyContent: {
              minWidth: Breakpoints.Tablet,
              value: 'space-between',
            },
            maxWidth: [
              { minWidth: Breakpoints.Laptop, value: 1200 },
              { minWidth: Breakpoints.Desktop, value: 1200 },
              { minWidth: Breakpoints.BigScreen, value: 1200 },
            ],
          },
          dimensions.width
        )}
      >
        {/* Header */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              borderBottomWidth: { minWidth: Breakpoints.Laptop, value: 1 },
              borderColor: {
                minWidth: Breakpoints.Laptop,
                value: theme.colors.border.brand,
              },
              flexDirection: [
                { minWidth: Breakpoints.Mobile, value: 'row' },
                { minWidth: Breakpoints.Tablet, value: 'row' },
              ],
              justifyContent: [
                { minWidth: Breakpoints.Mobile, value: 'space-between' },
                { minWidth: Breakpoints.Tablet, value: 'space-between' },
              ],
              padding: [
                { minWidth: Breakpoints.Mobile, value: 20 },
                { minWidth: Breakpoints.Laptop, value: 20 },
              ],
              paddingBottom: [
                { minWidth: Breakpoints.Mobile, value: 0 },
                { minWidth: Breakpoints.Laptop, value: 10 },
              ],
              paddingTop: [
                { minWidth: Breakpoints.Mobile, value: 6 },
                { minWidth: Breakpoints.Tablet, value: 6 },
                { minWidth: Breakpoints.Laptop, value: 10 },
              ],
              width: { minWidth: Breakpoints.Laptop, value: '100%' },
            },
            dimensions.width
          )}
        >
          {/* Logo */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: [
                  { minWidth: Breakpoints.Mobile, value: 'center' },
                  { minWidth: Breakpoints.Tablet, value: 'center' },
                ],
                flexDirection: [
                  { minWidth: Breakpoints.Mobile, value: 'row' },
                  { minWidth: Breakpoints.Tablet, value: 'row' },
                ],
                gap: 4,
              },
              dimensions.width
            )}
          >
            {/* logo */}
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              resizeMode={'cover'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              {...GlobalStyles.ExpoImageStyles(theme)['Image 2'].props}
              source={imageSource(Images['couponzapp'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['Image 2'].style,
                  {
                    borderRadius: [
                      { minWidth: Breakpoints.Mobile, value: 8 },
                      { minWidth: Breakpoints.Tablet, value: 8 },
                    ],
                    height: [
                      { minWidth: Breakpoints.Mobile, value: 48 },
                      { minWidth: Breakpoints.Tablet, value: 48 },
                      { minWidth: Breakpoints.Laptop, value: 45 },
                    ],
                    width: [
                      { minWidth: Breakpoints.Mobile, value: 48 },
                      { minWidth: Breakpoints.Tablet, value: 48 },
                      { minWidth: Breakpoints.Laptop, value: 45 },
                    ],
                  }
                ),
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['App Theme'],
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: palettes.App['App Theme'],
                      },
                    ],
                    fontFamily: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: 'BaiJamjuree_600SemiBold',
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: 'BaiJamjuree_600SemiBold',
                      },
                    ],
                    fontSize: [
                      { minWidth: Breakpoints.Mobile, value: 18 },
                      { minWidth: Breakpoints.Laptop, value: 25 },
                      { minWidth: Breakpoints.BigScreen, value: 27 },
                    ],
                    marginLeft: { minWidth: Breakpoints.Laptop, value: 6 },
                  }
                ),
                dimensions.width
              )}
            >
              {'VIP Couponz App ®'}
            </Text>
          </View>
          {/* Get App */}
          <View>
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  Linking.openURL('mailto:vipcouponz25@gmail.com');
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              activeOpacity={0.3}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['App Theme'],
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: palettes.App['App Theme'],
                      },
                    ],
                    borderRadius: [
                      { minWidth: Breakpoints.Mobile, value: 100 },
                      { minWidth: Breakpoints.Laptop, value: 100 },
                    ],
                    fontFamily: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: 'BaiJamjuree_300Light',
                      },
                      {
                        minWidth: Breakpoints.Laptop,
                        value: 'BaiJamjuree_300Light',
                      },
                      {
                        minWidth: Breakpoints.Desktop,
                        value: 'BaiJamjuree_400Regular',
                      },
                    ],
                    letterSpacing: { minWidth: Breakpoints.Laptop, value: 0.5 },
                    paddingLeft: [
                      { minWidth: Breakpoints.Mobile, value: 20 },
                      { minWidth: Breakpoints.Laptop, value: 20 },
                    ],
                    paddingRight: [
                      { minWidth: Breakpoints.Mobile, value: 20 },
                      { minWidth: Breakpoints.Laptop, value: 20 },
                    ],
                  }
                ),
                dimensions.width
              )}
              title={'Contact us'}
            />
          </View>
        </View>

        <SimpleStyleScrollView
          bounces={true}
          horizontal={false}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <ImageBackground
            {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
              .props}
            resizeMode={'repeat'}
            source={imageSource(Images['Rectangle2'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
                  .style,
                {
                  alignItems: [
                    { minWidth: Breakpoints.Tablet, value: 'center' },
                    { minWidth: Breakpoints.Laptop, value: 'center' },
                  ],
                  flexDirection: [
                    { minWidth: Breakpoints.Tablet, value: 'row' },
                    { minWidth: Breakpoints.Laptop, value: 'row' },
                  ],
                  justifyContent: [
                    { minWidth: Breakpoints.Tablet, value: 'space-between' },
                    { minWidth: Breakpoints.Laptop, value: 'space-between' },
                  ],
                  padding: [
                    { minWidth: Breakpoints.Mobile, value: 20 },
                    { minWidth: Breakpoints.Laptop, value: 20 },
                  ],
                  paddingTop: 0,
                }
              ),
              dimensions.width
            )}
          >
            {/* Left View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  justifyContent: {
                    minWidth: Breakpoints.Laptop,
                    value: 'center',
                  },
                  paddingRight: [
                    { minWidth: Breakpoints.Tablet, value: '6%' },
                    { minWidth: Breakpoints.Laptop, value: '12%' },
                  ],
                  width: [
                    { minWidth: Breakpoints.Tablet, value: '50%' },
                    { minWidth: Breakpoints.Laptop, value: '50%' },
                  ],
                },
                dimensions.width
              )}
            >
              {/* Title */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      fontFamily: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: 'BaiJamjuree_600SemiBold',
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: 'BaiJamjuree_600SemiBold',
                        },
                      ],
                      fontSize: [
                        { minWidth: Breakpoints.Mobile, value: 25 },
                        { minWidth: Breakpoints.Laptop, value: 25 },
                      ],
                      marginTop: [
                        { minWidth: Breakpoints.Mobile, value: 40 },
                        { minWidth: Breakpoints.Laptop, value: 40 },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Save More, Shop Smarter'}
              </Text>
              {/* Description */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: theme.colors.text.medium,
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: theme.colors.text.medium,
                        },
                      ],
                      fontFamily: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: 'BaiJamjuree_400Regular',
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: 'BaiJamjuree_400Regular',
                        },
                      ],
                      fontSize: { minWidth: Breakpoints.Laptop, value: 14 },
                      marginTop: [
                        { minWidth: Breakpoints.Mobile, value: 25 },
                        { minWidth: Breakpoints.Laptop, value: 25 },
                      ],
                      textAlign: [
                        { minWidth: Breakpoints.Mobile, value: 'justify' },
                        { minWidth: Breakpoints.Tablet, value: 'justify' },
                        { minWidth: Breakpoints.Laptop, value: 'justify' },
                      ],
                      whiteSpace: [
                        { minWidth: Breakpoints.Mobile, value: 'pre-line' },
                        { minWidth: Breakpoints.Tablet, value: 'pre-line' },
                        { minWidth: Breakpoints.Laptop, value: 'pre-line' },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {
                  'Download our app and keep all your favorite deals in one convenient location. No more lost paper coupons or expired discounts—just easy access to savings at local businesses. Simply show your offer or coupon to the staff and watch the savings roll in. With new businesses added each month, maximizing your savings potential has never been easier!'
                }
              </Text>
              {/* App Download Buttons */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: [
                      { minWidth: Breakpoints.Mobile, value: 'center' },
                      { minWidth: Breakpoints.Laptop, value: 'center' },
                    ],
                    flexDirection: [
                      { minWidth: Breakpoints.Mobile, value: 'row' },
                      { minWidth: Breakpoints.Laptop, value: 'row' },
                    ],
                    justifyContent: {
                      minWidth: Breakpoints.Laptop,
                      value: 'flex-start',
                    },
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 20 },
                      { minWidth: Breakpoints.Laptop, value: 40 },
                    ],
                  },
                  dimensions.width
                )}
              >
                {/* iOS */}
                <Pressable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await WebBrowser.openBrowserAsync(
                          `${Constants['APPLE_STORE_URL']}`
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  activeOpacity={0.3}
                >
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)['Image 3'].props}
                    resizeMode={'contain'}
                    source={imageSource(Images['AppStore'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)['Image 3'].style,
                        {
                          height: [
                            { minWidth: Breakpoints.Mobile, value: 57 },
                            { minWidth: Breakpoints.Laptop, value: 57 },
                          ],
                          width: [
                            { minWidth: Breakpoints.Mobile, value: 160 },
                            { minWidth: Breakpoints.Laptop, value: 160 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  />
                </Pressable>
                {/* Android */}
                <Pressable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        await WebBrowser.openBrowserAsync(
                          `${Constants['ANDROID_STORE_URL']}`
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  activeOpacity={0.3}
                  style={StyleSheet.applyWidth(
                    {
                      marginLeft: [
                        { minWidth: Breakpoints.Mobile, value: 15 },
                        { minWidth: Breakpoints.Laptop, value: 30 },
                      ],
                    },
                    dimensions.width
                  )}
                >
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)['Image 4'].props}
                    resizeMode={'contain'}
                    source={imageSource(Images['PlayStore'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)['Image 4'].style,
                        {
                          height: [
                            { minWidth: Breakpoints.Mobile, value: 61 },
                            { minWidth: Breakpoints.Laptop, value: 61 },
                          ],
                          width: [
                            { minWidth: Breakpoints.Mobile, value: 170 },
                            { minWidth: Breakpoints.Laptop, value: 170 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  />
                </Pressable>
              </View>
            </View>
            {/* Right View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: [
                    { minWidth: Breakpoints.Mobile, value: 'center' },
                    { minWidth: Breakpoints.Laptop, value: 'center' },
                  ],
                  flexDirection: [
                    { minWidth: Breakpoints.Mobile, value: 'row' },
                    { minWidth: Breakpoints.Laptop, value: 'row' },
                  ],
                  justifyContent: 'center',
                  paddingRight: [
                    { minWidth: Breakpoints.Mobile, value: '4%' },
                    { minWidth: Breakpoints.Laptop, value: '4%' },
                  ],
                  paddingTop: 20,
                  width: [
                    { minWidth: Breakpoints.Mobile, value: '100%' },
                    { minWidth: Breakpoints.Tablet, value: '50%' },
                  ],
                },
                dimensions.width
              )}
            >
              {/* Android */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['Image 6'].props}
                resizeMode={'contain'}
                source={imageSource(Images['appleft'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image 6'].style,
                    {
                      height: [
                        { minWidth: Breakpoints.Mobile, value: 340 },
                        { minWidth: Breakpoints.Tablet, value: 360 },
                        { minWidth: Breakpoints.Laptop, value: 550 },
                        { minWidth: Breakpoints.Desktop, value: 580 },
                      ],
                      marginTop: [
                        { minWidth: Breakpoints.Mobile, value: 20 },
                        { minWidth: Breakpoints.Laptop, value: 20 },
                      ],
                      width: [
                        { minWidth: Breakpoints.Mobile, value: 250 },
                        { minWidth: Breakpoints.Tablet, value: 280 },
                        { minWidth: Breakpoints.Laptop, value: 390 },
                        { minWidth: Breakpoints.Desktop, value: 440 },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              />
              {/* iOS */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['Image 5'].props}
                resizeMode={'contain'}
                source={imageSource(Images['appfront'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image 5'].style,
                    {
                      height: [
                        { minWidth: Breakpoints.Mobile, value: 300 },
                        { minWidth: Breakpoints.Tablet, value: 340 },
                        { minWidth: Breakpoints.Laptop, value: 500 },
                      ],
                      position: [
                        { minWidth: Breakpoints.Mobile, value: 'absolute' },
                        { minWidth: Breakpoints.Laptop, value: 'absolute' },
                      ],
                      right: [
                        { minWidth: Breakpoints.Mobile, value: 50 },
                        { minWidth: Breakpoints.Laptop, value: 10 },
                      ],
                      width: [
                        { minWidth: Breakpoints.Mobile, value: 140 },
                        { minWidth: Breakpoints.Tablet, value: 140 },
                        { minWidth: Breakpoints.Laptop, value: 230 },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              />
            </View>
          </ImageBackground>
          {/* Download App Section */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: [
                  { minWidth: Breakpoints.Tablet, value: 'center' },
                  { minWidth: Breakpoints.Laptop, value: 'center' },
                ],
                flexDirection: [
                  { minWidth: Breakpoints.Tablet, value: 'row' },
                  { minWidth: Breakpoints.Laptop, value: 'row' },
                ],
                justifyContent: [
                  { minWidth: Breakpoints.Tablet, value: 'space-between' },
                  { minWidth: Breakpoints.Laptop, value: 'space-between' },
                ],
                padding: [
                  { minWidth: Breakpoints.Mobile, value: 20 },
                  { minWidth: Breakpoints.Laptop, value: 20 },
                ],
              },
              dimensions.width
            )}
          >
            {/* Left */}
            <View
              style={StyleSheet.applyWidth(
                {
                  paddingRight: [
                    { minWidth: Breakpoints.Tablet, value: '6%' },
                    { minWidth: Breakpoints.Laptop, value: '12%' },
                  ],
                  width: [
                    { minWidth: Breakpoints.Tablet, value: '50%' },
                    { minWidth: Breakpoints.Laptop, value: '50%' },
                  ],
                },
                dimensions.width
              )}
            >
              {/* Download the */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      fontFamily: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: 'BaiJamjuree_600SemiBold',
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: 'BaiJamjuree_600SemiBold',
                        },
                      ],
                      fontSize: [
                        { minWidth: Breakpoints.Mobile, value: 21 },
                        { minWidth: Breakpoints.Laptop, value: 21 },
                      ],
                      marginTop: { minWidth: Breakpoints.Laptop, value: 40 },
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Download the'}
              </Text>
              {/* Vip Coupon title */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.App['App Theme'],
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: palettes.App['App Theme'],
                        },
                      ],
                      fontFamily: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: 'BaiJamjuree_600SemiBold',
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: 'BaiJamjuree_600SemiBold',
                        },
                      ],
                      fontSize: [
                        { minWidth: Breakpoints.Mobile, value: 21 },
                        { minWidth: Breakpoints.Laptop, value: 21 },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {'VIP Couponz® Today!'}
              </Text>
              {/* Description */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: theme.colors.text.medium,
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: theme.colors.text.medium,
                        },
                      ],
                      fontFamily: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: 'BaiJamjuree_400Regular',
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: 'BaiJamjuree_400Regular',
                        },
                      ],
                      fontSize: { minWidth: Breakpoints.Laptop, value: 14 },
                      marginTop: [
                        { minWidth: Breakpoints.Mobile, value: 25 },
                        { minWidth: Breakpoints.Laptop, value: 25 },
                      ],
                      textAlign: [
                        { minWidth: Breakpoints.Mobile, value: 'justify' },
                        { minWidth: Breakpoints.Laptop, value: 'justify' },
                      ],
                      whiteSpace: [
                        { minWidth: Breakpoints.Mobile, value: 'pre-line' },
                        { minWidth: Breakpoints.Laptop, value: 'pre-line' },
                      ],
                    }
                  ),
                  dimensions.width
                )}
              >
                {
                  'SaveMore Deals is your go-to app for finding the latest coupons, promo codes, and exclusive discounts from top online and local stores. Get notified of the best offers, save them for later, and apply them easily at checkout. Smart shopping starts here — download now and start saving every day!\n'
                }
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: [
                      { minWidth: Breakpoints.Mobile, value: 'center' },
                      { minWidth: Breakpoints.Laptop, value: 'center' },
                    ],
                    flexDirection: [
                      { minWidth: Breakpoints.Mobile, value: 'row' },
                      { minWidth: Breakpoints.Laptop, value: 'row' },
                    ],
                    justifyContent: [
                      { minWidth: Breakpoints.Mobile, value: 'space-between' },
                      { minWidth: Breakpoints.Laptop, value: 'space-between' },
                    ],
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 40 },
                      { minWidth: Breakpoints.Laptop, value: 40 },
                    ],
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: [
                        { minWidth: Breakpoints.Mobile, value: 'center' },
                        { minWidth: Breakpoints.Laptop, value: 'center' },
                      ],
                      borderColor: {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors.border.brand,
                      },
                      borderRightWidth: {
                        minWidth: Breakpoints.Laptop,
                        value: 2,
                      },
                      flex: { minWidth: Breakpoints.Laptop, value: 1 },
                    },
                    dimensions.width
                  )}
                >
                  {/* Label */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          fontFamily: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'BaiJamjuree_700Bold',
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'BaiJamjuree_700Bold',
                            },
                          ],
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 13 },
                            { minWidth: Breakpoints.Laptop, value: 13 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'4 Million +'}
                  </Text>
                  {/* value */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: palettes.App['App Theme'],
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: palettes.App['App Theme'],
                            },
                          ],
                          fontFamily: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'BaiJamjuree_500Medium',
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'BaiJamjuree_500Medium',
                            },
                          ],
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 10 },
                            { minWidth: Breakpoints.Laptop, value: 10 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Active Coupon'}
                  </Text>
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: [
                        { minWidth: Breakpoints.Mobile, value: 'center' },
                        { minWidth: Breakpoints.Laptop, value: 'center' },
                      ],
                      borderColor: {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors.border.brand,
                      },
                      borderRightWidth: {
                        minWidth: Breakpoints.Laptop,
                        value: 2,
                      },
                      flex: { minWidth: Breakpoints.Laptop, value: 1 },
                    },
                    dimensions.width
                  )}
                >
                  {/* Label */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          fontFamily: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'BaiJamjuree_700Bold',
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'BaiJamjuree_700Bold',
                            },
                          ],
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 13 },
                            { minWidth: Breakpoints.Laptop, value: 13 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'300K +'}
                  </Text>
                  {/* value */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: palettes.App['App Theme'],
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: palettes.App['App Theme'],
                            },
                          ],
                          fontFamily: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'BaiJamjuree_400Regular',
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'BaiJamjuree_500Medium',
                            },
                          ],
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 10 },
                            { minWidth: Breakpoints.Laptop, value: 10 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Buisness'}
                  </Text>
                </View>
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: [
                        { minWidth: Breakpoints.Mobile, value: 'center' },
                        { minWidth: Breakpoints.Laptop, value: 'center' },
                      ],
                      flex: { minWidth: Breakpoints.Laptop, value: 1 },
                    },
                    dimensions.width
                  )}
                >
                  {/* Label */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          fontFamily: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'BaiJamjuree_700Bold',
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'BaiJamjuree_700Bold',
                            },
                          ],
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 13 },
                            { minWidth: Breakpoints.Laptop, value: 13 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'25K +'}
                  </Text>
                  {/* value */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: palettes.App['App Theme'],
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: palettes.App['App Theme'],
                            },
                          ],
                          fontFamily: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'BaiJamjuree_400Regular',
                            },
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'BaiJamjuree_500Medium',
                            },
                          ],
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 10 },
                            { minWidth: Breakpoints.Laptop, value: 10 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Customers Served'}
                  </Text>
                </View>
              </View>
            </View>
            {/* Right */}
            <>
              {!(dimensions.width >= Breakpoints.Tablet) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: [
                        { minWidth: Breakpoints.Tablet, value: 'center' },
                        { minWidth: Breakpoints.Laptop, value: 'center' },
                      ],
                      flexDirection: [
                        { minWidth: Breakpoints.Tablet, value: 'row' },
                        { minWidth: Breakpoints.Laptop, value: 'row' },
                      ],
                      justifyContent: [
                        { minWidth: Breakpoints.Tablet, value: 'center' },
                        { minWidth: Breakpoints.Laptop, value: 'flex-end' },
                      ],
                      width: [
                        { minWidth: Breakpoints.Tablet, value: '50%' },
                        { minWidth: Breakpoints.Laptop, value: '50%' },
                      ],
                    },
                    dimensions.width
                  )}
                >
                  {/* Android */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: [
                          { minWidth: Breakpoints.Tablet, value: 'center' },
                          { minWidth: Breakpoints.Laptop, value: 'center' },
                        ],
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            fontFamily: [
                              {
                                minWidth: Breakpoints.Tablet,
                                value: 'BaiJamjuree_500Medium',
                              },
                              {
                                minWidth: Breakpoints.Laptop,
                                value: 'BaiJamjuree_500Medium',
                              },
                            ],
                            fontSize: [
                              { minWidth: Breakpoints.Tablet, value: 18 },
                              { minWidth: Breakpoints.Laptop, value: 18 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'For Android'}
                    </Text>
                    {/* Text 2 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            color: {
                              minWidth: Breakpoints.Laptop,
                              value: theme.colors.text.light,
                            },
                            fontFamily: [
                              {
                                minWidth: Breakpoints.Tablet,
                                value: 'BaiJamjuree_400Regular',
                              },
                              {
                                minWidth: Breakpoints.Laptop,
                                value: 'BaiJamjuree_400Regular',
                              },
                            ],
                            fontSize: [
                              { minWidth: Breakpoints.Tablet, value: 13 },
                              { minWidth: Breakpoints.Laptop, value: 13 },
                            ],
                            marginTop: [
                              { minWidth: Breakpoints.Tablet, value: 4 },
                              { minWidth: Breakpoints.Laptop, value: 4 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Android 13.2 +'}
                    </Text>
                    <Button
                      accessible={true}
                      iconPosition={'left'}
                      onPress={() => {
                        const handler = async () => {
                          try {
                            await WebBrowser.openBrowserAsync(
                              `${Constants['ANDROID_STORE_URL']}`
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                      activeOpacity={0.3}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ButtonStyles(theme)['Button'].style,
                          {
                            backgroundColor: [
                              {
                                minWidth: Breakpoints.Tablet,
                                value: palettes.App['App Theme'],
                              },
                              {
                                minWidth: Breakpoints.Laptop,
                                value: palettes.App['App Theme'],
                              },
                            ],
                            borderRadius: [
                              { minWidth: Breakpoints.Tablet, value: 100 },
                              { minWidth: Breakpoints.Laptop, value: 100 },
                            ],
                            fontFamily: [
                              {
                                minWidth: Breakpoints.Tablet,
                                value: 'BaiJamjuree_300Light',
                              },
                              {
                                minWidth: Breakpoints.Laptop,
                                value: 'BaiJamjuree_300Light',
                              },
                            ],
                            fontSize: [
                              { minWidth: Breakpoints.Tablet, value: 16 },
                              { minWidth: Breakpoints.Laptop, value: 16 },
                            ],
                            letterSpacing: {
                              minWidth: Breakpoints.Laptop,
                              value: 0.5,
                            },
                            marginTop: [
                              { minWidth: Breakpoints.Tablet, value: 45 },
                              { minWidth: Breakpoints.Laptop, value: 45 },
                            ],
                            paddingLeft: [
                              { minWidth: Breakpoints.Tablet, value: 20 },
                              { minWidth: Breakpoints.Laptop, value: 20 },
                            ],
                            paddingRight: [
                              { minWidth: Breakpoints.Tablet, value: 20 },
                              { minWidth: Breakpoints.Laptop, value: 20 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                      title={'Download App'}
                    />
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      resizeMode={'cover'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['Image 7'].props}
                      source={imageSource(Images['androidqrcode'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['Image 7'].style,
                          {
                            height: {
                              minWidth: Breakpoints.BigScreen,
                              value: 150,
                            },
                            marginTop: [
                              { minWidth: Breakpoints.Tablet, value: 45 },
                              { minWidth: Breakpoints.Laptop, value: 45 },
                            ],
                            width: {
                              minWidth: Breakpoints.BigScreen,
                              value: 150,
                            },
                          }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* iOS */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: [
                          { minWidth: Breakpoints.Tablet, value: 'center' },
                          { minWidth: Breakpoints.Laptop, value: 'center' },
                        ],
                        marginLeft: [
                          { minWidth: Breakpoints.Tablet, value: 60 },
                          { minWidth: Breakpoints.Laptop, value: 60 },
                        ],
                        marginRight: {
                          minWidth: Breakpoints.Laptop,
                          value: 50,
                        },
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            fontFamily: [
                              {
                                minWidth: Breakpoints.Tablet,
                                value: 'BaiJamjuree_500Medium',
                              },
                              {
                                minWidth: Breakpoints.Laptop,
                                value: 'BaiJamjuree_500Medium',
                              },
                            ],
                            fontSize: [
                              { minWidth: Breakpoints.Tablet, value: 18 },
                              { minWidth: Breakpoints.Laptop, value: 18 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'For iOS'}
                    </Text>
                    {/* Text 2 */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          {
                            color: {
                              minWidth: Breakpoints.Laptop,
                              value: theme.colors.text.light,
                            },
                            fontFamily: [
                              {
                                minWidth: Breakpoints.Tablet,
                                value: 'BaiJamjuree_400Regular',
                              },
                              {
                                minWidth: Breakpoints.Laptop,
                                value: 'BaiJamjuree_400Regular',
                              },
                            ],
                            fontSize: [
                              { minWidth: Breakpoints.Tablet, value: 13 },
                              { minWidth: Breakpoints.Laptop, value: 13 },
                            ],
                            marginTop: [
                              { minWidth: Breakpoints.Tablet, value: 4 },
                              { minWidth: Breakpoints.Laptop, value: 4 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'iOS 15.6 +'}
                    </Text>
                    <Button
                      accessible={true}
                      iconPosition={'left'}
                      onPress={() => {
                        const handler = async () => {
                          try {
                            await WebBrowser.openBrowserAsync(
                              `${Constants['APPLE_STORE_URL']}`
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                      activeOpacity={0.3}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ButtonStyles(theme)['Button'].style,
                          {
                            backgroundColor: [
                              {
                                minWidth: Breakpoints.Tablet,
                                value: palettes.App['App Theme'],
                              },
                              {
                                minWidth: Breakpoints.Laptop,
                                value: palettes.App['App Theme'],
                              },
                            ],
                            borderRadius: [
                              { minWidth: Breakpoints.Tablet, value: 100 },
                              { minWidth: Breakpoints.Laptop, value: 100 },
                            ],
                            fontFamily: [
                              {
                                minWidth: Breakpoints.Tablet,
                                value: 'BaiJamjuree_300Light',
                              },
                              {
                                minWidth: Breakpoints.Laptop,
                                value: 'BaiJamjuree_300Light',
                              },
                            ],
                            fontSize: [
                              { minWidth: Breakpoints.Tablet, value: 16 },
                              { minWidth: Breakpoints.Laptop, value: 16 },
                            ],
                            letterSpacing: {
                              minWidth: Breakpoints.Laptop,
                              value: 0.5,
                            },
                            marginTop: [
                              { minWidth: Breakpoints.Tablet, value: 45 },
                              { minWidth: Breakpoints.Laptop, value: 45 },
                            ],
                            paddingLeft: [
                              { minWidth: Breakpoints.Tablet, value: 20 },
                              { minWidth: Breakpoints.Laptop, value: 20 },
                            ],
                            paddingRight: [
                              { minWidth: Breakpoints.Tablet, value: 20 },
                              { minWidth: Breakpoints.Laptop, value: 20 },
                            ],
                          }
                        ),
                        dimensions.width
                      )}
                      title={'Download App'}
                    />
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['Image 8'].props}
                      resizeMode={'cover'}
                      source={imageSource(Images['iosqrcode'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['Image 8'].style,
                          {
                            height: {
                              minWidth: Breakpoints.BigScreen,
                              value: 150,
                            },
                            marginTop: [
                              { minWidth: Breakpoints.Tablet, value: 45 },
                              { minWidth: Breakpoints.Laptop, value: 45 },
                            ],
                            width: {
                              minWidth: Breakpoints.BigScreen,
                              value: 150,
                            },
                          }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                </View>
              )}
            </>
          </View>
        </SimpleStyleScrollView>
        {/* Footer */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              borderColor: theme.colors.border.brand,
              borderTopWidth: 1,
              flexDirection: { minWidth: Breakpoints.Tablet, value: 'row' },
              justifyContent: [
                { minWidth: Breakpoints.Mobile, value: 'center' },
                { minWidth: Breakpoints.Tablet, value: 'space-between' },
              ],
              minHeight: 50,
              paddingLeft: { minWidth: Breakpoints.Tablet, value: 20 },
              paddingRight: { minWidth: Breakpoints.Tablet, value: 20 },
              paddingTop: 10,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Privacy Policy */}
          <Pressable
            onPress={() => {
              try {
                /* hidden 'Set Variable' action */
                navigation.navigate('PrivacyPolicyScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            activeOpacity={0.3}
            style={StyleSheet.applyWidth(
              { width: { minWidth: Breakpoints.Tablet, value: '33%' } },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: [
                    { minWidth: Breakpoints.Mobile, value: 'center' },
                    { minWidth: Breakpoints.Tablet, value: 'center' },
                  ],
                  height: 40,
                  justifyContent: 'center',
                  width: { minWidth: Breakpoints.Tablet, value: '100%' },
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.App['App Theme'],
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: palettes.App['App Theme'],
                        },
                      ],
                      fontFamily: 'BaiJamjuree_400Regular',
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Privacy Policy'}
              </Text>
            </View>
          </Pressable>
          {/* Terms and Conditions */}
          <Pressable
            onPress={() => {
              try {
                /* hidden 'Set Variable' action */
                navigation.navigate('TermsAndConditionsScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            activeOpacity={0.3}
            style={StyleSheet.applyWidth(
              { width: { minWidth: Breakpoints.Tablet, value: '33%' } },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: [
                    { minWidth: Breakpoints.Mobile, value: 'center' },
                    { minWidth: Breakpoints.Tablet, value: 'center' },
                  ],
                  height: 40,
                  justifyContent: 'center',
                  width: { minWidth: Breakpoints.Tablet, value: '100%' },
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.App['App Theme'],
                        },
                        {
                          minWidth: Breakpoints.Laptop,
                          value: palettes.App['App Theme'],
                        },
                      ],
                      fontFamily: 'BaiJamjuree_400Regular',
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Terms and Conditions'}
              </Text>
            </View>
          </Pressable>
          {/* Copyright */}
          <View
            style={StyleSheet.applyWidth(
              {
                height: 70,
                justifyContent: 'center',
                width: { minWidth: Breakpoints.Tablet, value: '33%' },
              },
              dimensions.width
            )}
          >
            {/* copyright */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    fontFamily: 'BaiJamjuree_400Regular',
                    fontSize: 11,
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
            >
              {'@ Copyright 2025, All Rights Reserved by'}
            </Text>
            {/* Vip coupnz */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['App Theme'],
                    fontFamily: 'BaiJamjuree_500Medium',
                    marginTop: 3,
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
            >
              {'VIP Couponz App®'}
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
