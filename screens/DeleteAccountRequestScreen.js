import React from 'react';
import {
  Button,
  Icon,
  Markdown,
  Pressable,
  ScreenContainer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { BlurView } from 'expo-blur';
import { Modal, Platform, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoVIPCouponzApi from '../apis/XanoVIPCouponzApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const DeleteAccountRequestScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const inputValidations = () => {
    const expr =
      /^([\w-\.]+)@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;

    let foundError = false;

    if (name.length < 1) {
      setErrorMessage('Please enter your name');
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }

    if (email.length < 1) {
      setErrorMessage('Please enter your email');
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }

    if (!expr.test(email)) {
      setErrorMessage('Please enter a valid email');
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }

    if (password.length < 1) {
      setErrorMessage('Please enter a password');
      foundError = true;
      return foundError;
    } else {
      setErrorMessage('');
    }

    return foundError;
  };
  const xanoVIPCouponzDeleteRequestPOST =
    XanoVIPCouponzApi.useDeleteRequestPOST();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          dimensions.width
        )}
      >
        <>
          {Platform.OS === 'web' ? null : (
            <View
              style={StyleSheet.applyWidth({ height: 48 }, dimensions.width)}
            />
          )}
        </>
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              flex: 1,
              fontFamily: 'BaiJamjuree_600SemiBold',
              fontSize: 21,
              marginLeft: 48,
              textAlign: 'center',
            }),
            dimensions.width
          )}
        >
          {'Delete Account'}
        </Text>
        {/* close */}
        <Pressable
          onPress={() => {
            try {
              if (navigation.canGoBack()) {
                navigation.popToTop();
              }
              navigation.replace('HomeScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          activeOpacity={0.3}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 48,
                justifyContent: 'center',
                width: 48,
              },
              dimensions.width
            )}
          >
            <Icon
              size={24}
              color={palettes.App['App Theme']}
              name={'AntDesign/closecircleo'}
            />
          </View>
        </Pressable>
      </View>

      <KeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        contentContainerStyle={StyleSheet.applyWidth(
          { padding: 20 },
          dimensions.width
        )}
      >
        {/* Top View */}
        <View
          style={StyleSheet.applyWidth(
            {
              marginLeft: [
                { minWidth: Breakpoints.Laptop, value: '12%' },
                { minWidth: Breakpoints.Desktop, value: '25%' },
              ],
              marginRight: [
                { minWidth: Breakpoints.Laptop, value: '12%' },
                { minWidth: Breakpoints.Desktop, value: '25%' },
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
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                flex: 1,
                fontFamily: 'BaiJamjuree_600SemiBold',
                fontSize: 16,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'We are sorry to see you leave\nIf you delete your account:'}
          </Text>

          <Markdown
            style={StyleSheet.applyWidth(
              {
                fontFamily: 'BaiJamjuree_400Regular',
                lineHeight: 22,
                marginTop: 30,
                textAlign: { minWidth: Breakpoints.Tablet, value: 'center' },
              },
              dimensions.width
            )}
          >
            {
              '- You will lose all your order history.\n\n\n- All your information will be erased from our system and can not be retrieved back'
            }
          </Markdown>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: [
                  { minWidth: Breakpoints.Mobile, value: 'stretch' },
                  { minWidth: Breakpoints.Tablet, value: 'stretch' },
                ],
              },
              dimensions.width
            )}
          >
            {/* Form */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'stretch', margin: 15, marginTop: 25 },
                dimensions.width
              )}
            >
              {/* name */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newNameValue => {
                  const textInputValue = newNameValue;
                  try {
                    setName(newNameValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                autoComplete={'name'}
                placeholder={'Please enter your name'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      backgroundColor: theme.colors.border.brand,
                      fontFamily: 'BaiJamjuree_400Regular',
                      height: 45,
                      paddingLeft: 16,
                    }
                  ),
                  dimensions.width
                )}
                value={name}
              />
              {/* email */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newEmailValue => {
                  try {
                    setEmail(newEmailValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                autoComplete={'email'}
                keyboardType={'email-address'}
                placeholder={'Enter your email'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      backgroundColor: theme.colors.border.brand,
                      fontFamily: 'BaiJamjuree_400Regular',
                      height: 45,
                      marginTop: 20,
                      paddingLeft: 16,
                    }
                  ),
                  dimensions.width
                )}
                value={email}
              />
              {/* password */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newPasswordValue => {
                  try {
                    setPassword(newPasswordValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                placeholder={'Enter your password'}
                placeholderTextColor={theme.colors.text.light}
                secureTextEntry={true}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      backgroundColor: theme.colors.border.brand,
                      fontFamily: 'BaiJamjuree_400Regular',
                      height: 45,
                      marginTop: 20,
                      paddingLeft: 16,
                    }
                  ),
                  dimensions.width
                )}
                value={password}
              />
              {/* error */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: theme.colors.background.danger,
                      flex: 1,
                      fontFamily: 'BaiJamjuree_400Regular',
                      marginTop: 20,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {errorMessage}
              </Text>
              {/* info */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      flex: 1,
                      fontFamily: 'BaiJamjuree_400Regular',
                      marginTop: 30,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {
                  'Since this process is manual, it might take some time to get your account deleted.'
                }
              </Text>
              {/* Submit */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    const foundError = inputValidations();
                    if (foundError) {
                    } else {
                      setShowConfirmationModal(true);
                    }
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
                      backgroundColor: palettes.App['App Theme'],
                      fontFamily: 'BaiJamjuree_700Bold',
                      marginTop: 30,
                    }
                  ),
                  dimensions.width
                )}
                title={'Submit'}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* Confirmation Pop up */}
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        transparent={true}
        visible={Boolean(showConfirmationModal)}
      >
        {/* BG View */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: theme.colors.text.strong,
              bottom: 0,
              left: 0,
              opacity: 0.5,
              position: 'absolute',
              right: 0,
              top: 0,
            },
            dimensions.width
          )}
        >
          <BlurView
            experimentalBlurMethod={'none'}
            intensity={50}
            tint={'default'}
            {...GlobalStyles.BlurViewStyles(theme)['Blur View'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.BlurViewStyles(theme)['Blur View'].style,
                { flex: 1 }
              ),
              dimensions.width
            )}
          />
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flex: 1, justifyContent: 'center' },
            dimensions.width
          )}
        >
          {/* Alert */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Brand.Surface,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderRadius: 8,
                padding: 15,
                width: 280,
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
                    fontFamily: 'BaiJamjuree_600SemiBold',
                    fontSize: 17,
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
            >
              {'Delete Account!'}
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
                    fontFamily: 'BaiJamjuree_400Regular',
                    fontSize: 14,
                    marginTop: 10,
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
            >
              {
                'Are you sure you want to delete your account?\nThis can not be undone.'
              }
            </Text>
          </View>
          {/* CTAs */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.Brand.Surface,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderColor: theme.colors.border.brand,
                borderTopWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 280,
              },
              dimensions.width
            )}
          >
            {/* No */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  setShowConfirmationModal(false);
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
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderRadius: 0,
                    color: theme.colors.text.strong,
                    fontFamily: 'BaiJamjuree_600SemiBold',
                    width: '50%',
                  }
                ),
                dimensions.width
              )}
              title={'No'}
            />
            {/* Yes */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    setIsLoading(true);
                    const res = (
                      await xanoVIPCouponzDeleteRequestPOST.mutateAsync({
                        email: email,
                        name: name,
                        password: password,
                      })
                    )?.json;
                    if (res?.status === 'Success!') {
                      setShowSuccessModal(true);
                    } else {
                      setErrorMessage(res?.message);
                    }

                    setShowConfirmationModal(false);
                    setIsLoading(false);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              activeOpacity={0.3}
              loading={Boolean(isLoading)}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: theme.colors.border.brand,
                    borderLeftWidth: 1,
                    borderRadius: 0,
                    color: theme.colors.background.danger,
                    fontFamily: 'BaiJamjuree_600SemiBold',
                    width: '50%',
                  }
                ),
                dimensions.width
              )}
              title={'YES'}
            />
          </View>
        </View>
      </Modal>
      {/* Success modal */}
      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        transparent={false}
        visible={Boolean(showSuccessModal)}
      >
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flex: 1 },
            dimensions.width
          )}
        >
          <Icon
            color={palettes.App['Custom Color']}
            name={'Ionicons/checkmark-circle-outline'}
            size={100}
            style={StyleSheet.applyWidth({ marginTop: 80 }, dimensions.width)}
          />
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                fontFamily: 'BaiJamjuree_400Regular',
                marginTop: 25,
                padding: 25,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {
              'Your account deletion request has been submitted with us and will be processed within a few working days.'
            }
          </Text>
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                if (navigation.canGoBack()) {
                  navigation.popToTop();
                }
                navigation.replace('HomeScreen');
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
                  fontFamily: 'BaiJamjuree_500Medium',
                  marginTop: 55,
                  maxWidth: 500,
                  width: '90%',
                }
              ),
              dimensions.width
            )}
            title={'OK'}
          />
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(DeleteAccountRequestScreen);
