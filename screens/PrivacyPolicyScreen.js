import React from 'react';
import {
  Icon,
  Markdown,
  Pressable,
  ScreenContainer,
  WebView,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoContentApi from '../apis/XanoContentApi.js';
import * as webView from '../custom-files/webView';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const PrivacyPolicyScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();

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
          {'Privacy Policy'}
        </Text>
        {/* close */}
        <Pressable
          onPress={() => {
            try {
              navigation.goBack();
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

      <XanoContentApi.FetchGetContentsGET>
        {({ loading, error, data, refetchGetContents }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              {/* Web Preview Container */}
              <View
                style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
              >
                <Utils.CustomCodeErrorBoundary>
                  <webView.WebViewComponent
                    url={`${fetchData?.[0]?.privacy?.url}`}
                  />
                </Utils.CustomCodeErrorBoundary>
              </View>
            </>
          );
        }}
      </XanoContentApi.FetchGetContentsGET>
    </ScreenContainer>
  );
};

export default withTheme(PrivacyPolicyScreen);
