import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { makeStyles } from '~/utils';

export interface BottomSheetProps extends BottomSheetModalProps {
  /**
   * Height of the BottomSheet when it's opened.
   *
   * It accepts number or string. String value should be a percentage.
   *
   * If you need more flexible height set up use [snapPoints](https://ui.gorhom.dev/components/bottom-sheet/props#snappoints) prop
   * @default 250
   * */
  height?: number | string;
  /**
   * What should happen when user press backdrop?
   * @default 'close'
   */
  backdropPressBehavior?: React.ComponentProps<typeof BottomSheetBackdrop>['pressBehavior'];
}

/**
 * Basic bottom sheet component.
 *
 * It uses `BottomSheetModal` component from [@gorhom/bottom-sheet](https://ui.gorhom.dev/components/bottom-sheet/modal) under the hood and basically just adjust some default behavior to it. It extends all the props from the original component.
 *
 * Style configuration interface:
 * ```interface BottomSheetStyle {
 *   'bottom-sheet'?: ViewStyle;
 * }```
 */
export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>((props, ref) => {
  const styles = useCombinedStylesWithConfig('BottomSheet', useBottomSheetStyles);
  const {
    height = 250,
    backdropPressBehavior = 'close',
    ...restProps
  } = useCombinedPropsWithConfig('BottomSheet', props);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={backdropPressBehavior}
        style={StyleSheet.absoluteFill}
      />
    ),
    [backdropPressBehavior],
  );

  return (
    <BottomSheetModal
      enableDismissOnClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles['bottom-sheet']}
      handleComponent={null}
      index={0}
      ref={ref}
      snapPoints={useMemo(() => [height], [height])}
      {...restProps}
    />
  );
});

export const useBottomSheetStyles = makeStyles(({ colors, shadow }) => ({
  'bottom-sheet': {
    backgroundColor: colors.white,
    ...shadow['1'],
  },
}));
