import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

import palettes from './themes/palettes';

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
  });

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({ 'Image Background': { style: { flex: 1 }, props: {} } });

export const TextStyles = theme =>
  StyleSheet.create({
    Text: { style: { color: theme.colors.text.strong }, props: {} },
  });

export const WebViewStyles = theme =>
  StyleSheet.create({ 'Web View': { style: { flex: 1 }, props: {} } });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const BlurViewStyles = theme =>
  StyleSheet.create({
    'Blur View': {
      style: { flexBasis: 0, flexGrow: 1, flexShrink: 1 },
      props: {},
    },
  });

export const ImageStyles = theme =>
  StyleSheet.create({
    Image: { style: { height: 100, width: 100 }, props: {} },
  });

export const ExpoImageStyles = theme =>
  StyleSheet.create({
    'Image 2': { style: { height: 100, width: 100 }, props: {} },
    'Image 3': { style: { height: 100, width: 100 }, props: {} },
    'Image 4': { style: { height: 100, width: 100 }, props: {} },
    'Image 5': { style: { height: 100, width: 100 }, props: {} },
    'Image 6': { style: { height: 100, width: 100 }, props: {} },
    'Image 7': { style: { height: 100, width: 100 }, props: {} },
    'Image 8': { style: { height: 100, width: 100 }, props: {} },
  });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { style: { minHeight: 40 }, props: {} } });
