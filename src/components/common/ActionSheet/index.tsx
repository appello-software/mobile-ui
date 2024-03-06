import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { AppText, AppTextProps } from '~/components/common/AppText';
import { BottomSheet } from '~/components/common/BottomSheet';
import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
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
   *  Size of the icons
   *
   *  @default 18
   *  */
  iconSize?: number;
  /**
   *  Size of the icons
   *
   *  @default `theme.colors.black['1']`
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
 *   'action-sheet__action'?: ViewStyle;
 *   'action-sheet__icon-container'?: ViewStyle;
 * }```
 * */
export const ActionSheet = forwardRef<BottomSheetModal, ActionSheetProps>((props, ref) => {
  const { colors } = useUIKitTheme();
  const {
    title,
    actions,
    iconSize = 18,
    iconColor = colors.black['1'],
    labelProps = { variant: 'p1', color: colors.black['1'] },
  } = useCombinedPropsWithConfig('ActionSheet', props);
  const styles = useCombinedStylesWithConfig('ActionSheet', useActionSheetStyles);

  return (
    <BottomSheet
      displayHandle
      enableDynamicSizing
      backgroundStyle={styles['action-sheet']}
      ref={ref}
    >
      {!!title && (
        <AppText {...labelProps} align="center">
          {title}
        </AppText>
      )}
      <View>
        {actions.map((action, index) => (
          <TouchableOpacity key={index} onPress={action.onPress}>
            {'icon' in action && (
              <View>
                <action.icon color={iconColor} height={iconSize} width={iconSize} />
              </View>
            )}
            <AppText align={'icon' in action ? 'left' : 'center'} {...labelProps}>
              {action.label}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
});

export const useActionSheetStyles = makeStyles(
  ({ colors, shadow }) =>
    ({
      'action-sheet': {
        paddingTop: 10,
        paddingHorizontal: 25,

        borderTopRadius: 14,

        backgroundColor: colors.white,
        ...shadow['3'],
      },
      'action-sheet__action': {
        marginTop: 25,
      },
      'action-sheet__icon-container': {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 20,

        backgroundColor: colors.gray['6'],
      },
    }) as ActionSheetStyle,
);
