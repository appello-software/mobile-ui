import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { AppText, AppTextProps } from '~/components/common/AppText';
import { BottomSheet } from '~/components/common/BottomSheet';
import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { layout } from '~/styles/layout';
import { makeStyles } from '~/utils';

export interface Action {
  label: string;
  onPress: () => void;
}

export interface ActionWithIcon extends Action {
  icon: React.FC<SvgProps>;
}

export interface ActionSheetProps {
  /**
   *  The title to display on top of the action sheet
   *  */
  title?: string;
  /**
   *  List of actions to display on the sheet.
   *  */
  actions: Action[] | ActionWithIcon[];
  /**
   *  Should the sheet close automatically on action press.
   *
   *  @default true
   *  */
  closeOnAction?: boolean;
  /**
   *  Size of the icons
   *
   *  @default 18
   *  */
  iconSize?: number;
  /**
   *  Size of the icons
   *
   *  @default theme.colors.black['1']
   *  */
  iconColor?: string;
  /**
   *  Props to pass to the label text component
   *
   *  @default {
   *    variant: 'p1',
   *    color: theme.colors.black['1']
   *  }
   *  */
  labelProps?: AppTextProps;
}

interface ActionSheetStyle {
  'action-sheet'?: ViewStyle;
  'action-sheet__background'?: ViewStyle;
  'action-sheet__header'?: ViewStyle;
  'action-sheet__handle'?: ViewStyle;
  'action-sheet__action'?: ViewStyle;
  'action-sheet__icon-container'?: ViewStyle;
}

/**
 * An action sheet is a bottom sheet that displays a list of actions.
 * It is commonly used for displaying a list of options or actions, such as "Save", "Cancel", or "Delete".
 *
 * Style configuration interface:
 * ```interface ActionSheetStyle {
 *   'action-sheet'?: ViewStyle;
 *   'action-sheet__background'?: ViewStyle;
 *   'action-sheet__header'?: ViewStyle;
 *   'action-sheet__handle'?: ViewStyle;
 *   'action-sheet__action'?: ViewStyle;
 *   'action-sheet__icon-container'?: ViewStyle;
 * }```
 * */
export const ActionSheet = forwardRef<BottomSheetModal, ActionSheetProps>((props, ref) => {
  const { colors } = useUIKitTheme();
  const {
    title,
    actions,
    closeOnAction = true,
    iconSize = 18,
    iconColor = colors.black['1'],
    labelProps = { variant: 'p1', color: colors.black['1'] },
  } = useCombinedPropsWithConfig('ActionSheet', props);
  const styles = useCombinedStylesWithConfig('ActionSheet', useActionSheetStyles);

  return (
    <BottomSheet
      displayHandle
      enableDynamicSizing
      backgroundStyle={styles['action-sheet__background']}
      handleIndicatorStyle={styles['action-sheet__handle']}
      ref={ref}
      snapPoints={useMemo(() => [], [])}
      style={styles['action-sheet']}
    >
      {!!title && (
        <View style={[styles['action-sheet__header']]}>
          <AppText {...labelProps} align="center">
            {title}
          </AppText>
        </View>
      )}
      <BottomSheetView>
        <SafeAreaView edges={['bottom']}>
          {actions.map((action, index) => {
            const withIcon = 'icon' in action && action.icon;
            const handlePress = () => {
              action.onPress();
              if (closeOnAction && ref && 'current' in ref) {
                ref.current?.close();
              }
            };

            return (
              <TouchableOpacity
                key={index}
                style={[styles['action-sheet__action'], !withIcon && layout.justifyContentCenter]}
                onPress={handlePress}
              >
                {withIcon && (
                  <View style={styles['action-sheet__icon-container']}>
                    <action.icon color={iconColor} height={iconSize} width={iconSize} />
                  </View>
                )}
                <AppText align={withIcon ? 'left' : 'center'} {...labelProps}>
                  {action.label}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheet>
  );
});

export const useActionSheetStyles = makeStyles(
  ({ colors, shadow }) =>
    ({
      'action-sheet': {
        paddingTop: 10,
        paddingHorizontal: 25,
      },
      'action-sheet__background': {
        borderTopRadius: 14,

        backgroundColor: colors.white,
        ...shadow['3'],
      },
      'action-sheet__header': {
        minHeight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      'action-sheet__handle': {
        width: 36,
        height: 4,
        backgroundColor: colors.gray['4'],
      },
      'action-sheet__action': {
        minHeight: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 25,
      },
      'action-sheet__icon-container': {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 20,

        backgroundColor: colors.gray['6'],
      },
    }) as ActionSheetStyle,
);
