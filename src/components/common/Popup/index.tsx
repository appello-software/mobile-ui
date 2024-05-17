import { useUpdateEffect } from '@appello/common';
import CloseIcon from '@appello/mobile-ui/icons/unicons/close.svg';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { useUIKitTheme } from '../../../config/utils';
import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '../../../hooks/useCombinedStylesWithConfig';
import { makeStyles } from '../../../utils';
import { AppText } from '../AppText';
import { Button, ButtonProps } from '../Button';

export interface PopupProps {
  /**
   *  Is Popup opened
   *  */
  opened?: boolean;
  /**
   * A component to render above the title (icon, image, etc.)
   * */
  topAccessory?: Nullable<React.ReactNode>;
  /**
   *  Popup main title
   *  */
  title: string;
  /**
   *  Message to display under the title
   *  */
  message?: string;
  /**
   * Props of buttons to display under the message
   *
   * @default []
   * */
  buttons?: [ButtonProps] | [ButtonProps, ButtonProps] | [ButtonProps, ButtonProps, ButtonProps];
  /**
   *  A callback for a close icon press.<br>
   *  The icon is being displayed when the callback is defined
   *  */
  onClose?: () => void;
}

interface PopupStyle {
  popup?: ViewStyle;
  popup__content?: ViewStyle;
  'popup__content--no-buttons'?: ViewStyle;
  popup__title?: TextStyle;
  popup__message?: TextStyle;
  popup__buttons?: ViewStyle;
}

/**
 * A component for displaying informational messages and completing an actions with up to 3 buttons.
 *
 * Style configuration interface:
 * ```interface PopupStyle {
 *   popup?: ViewStyle;
 *   popup__content?: ViewStyle;
 *   'popup__content--no-buttons'?: ViewStyle;
 *   popup__title?: TextStyle;
 *   popup__message?: TextStyle;
 *   popup__buttons?: ViewStyle;
 * }```
 * */
export const Popup: React.FC<PopupProps> = props => {
  const {
    opened,
    topAccessory,
    title,
    message,
    buttons = [],
    onClose,
  } = useCombinedPropsWithConfig('Popup', props);
  const styles = useCombinedStylesWithConfig('Popup', usePopupStyles);

  const { height: windowHeight } = useWindowDimensions();
  const ref = useRef<BottomSheetModal>(null);

  useUpdateEffect(() => {
    if (opened) {
      ref.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [opened]);

  const [bottomInset, setBottomInset] = useState(0);
  const handleContentLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setBottomInset((windowHeight - layout.height) / 2);
    },
    [windowHeight],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="none"
        style={StyleSheet.absoluteFill}
      />
    ),
    [],
  );

  const innerStyles = useInnerStyles();
  const { colors } = useUIKitTheme();
  return (
    <BottomSheetModal
      detached
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      bottomInset={bottomInset}
      enableContentPanningGesture={false}
      enablePanDownToClose={false}
      handleComponent={null}
      ref={ref}
      style={styles.popup}
    >
      <BottomSheetView
        style={[styles.popup__content, !buttons.length && styles['popup__content--no-buttons']]}
        onLayout={handleContentLayout}
      >
        {onClose ? (
          <TouchableOpacity style={innerStyles.closeButton} onPress={onClose}>
            <CloseIcon color={colors.black['1']} height={20} width={20} />
          </TouchableOpacity>
        ) : null}
        {topAccessory}
        <AppText align="center" style={styles.popup__title} variant="h5">
          {title}
        </AppText>
        <AppText align="center" style={styles.popup__message} variant="p3">
          {message}
        </AppText>
        {buttons.length ? (
          <>
            <View style={styles.popup__buttons}>
              {buttons.slice(0, 2).map((buttonProps, index) => (
                <Button key={index} style={innerStyles.button} {...buttonProps} />
              ))}
            </View>
            {!!buttons.at(2) && <Button style={innerStyles.bottomButton} {...buttons.at(2)} />}
          </>
        ) : null}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const useInnerStyles = makeStyles(() => ({
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  button: {
    flex: 1,
  },
  bottomButton: {
    marginTop: 14,
  },
}));

export const usePopupStyles = makeStyles(
  ({ shadow, colors }) =>
    ({
      popup: {
        marginHorizontal: 20,
        ...shadow['1'],
      },
      popup__content: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        paddingHorizontal: 20,
      },
      'popup__content--no-buttons': {
        paddingTop: 45,
        paddingBottom: 45,
        paddingHorizontal: 30,
      },
      popup__title: {
        marginVertical: 7,
        color: colors.black['1'],
      },
      popup__message: {
        color: colors.gray['1'],
      },
      popup__buttons: {
        flexDirection: 'row',
        marginTop: 24,
        gap: 13,
      },
    }) as PopupStyle,
);
