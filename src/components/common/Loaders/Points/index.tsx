import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { makeStyles } from '~/utils';

const SIZE = 8;
const ANIMATION_DURATION = 600;

export interface PointsProps {
  color?: string;
  size?: number;
  duration?: number;
}

export const Points: FC<PointsProps> = props => {
  const { colors } = useUIKitTheme();
  const {
    size = SIZE,
    color = colors.primary,
    duration = ANIMATION_DURATION,
  } = useCombinedPropsWithConfig('Points', props);
  const innerStyles = useInnerStyles({ color, size })();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, true);

    return () => {
      cancelAnimation(progress);
    };
  }, [progress]);

  const animatedStyle1 = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 0.5, 1], [1, 1.25, 1.5]);
    return {
      transform: [{ scale }],
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 0.5, 1], [1.25, 1.5, 1]);
    return {
      transform: [{ scale }],
    };
  });

  const animatedStyle3 = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 0.5, 1], [1.5, 1, 1.25]);
    return {
      transform: [{ scale }],
    };
  });

  return (
    <View style={innerStyles.container}>
      <Animated.View style={[innerStyles.dot, animatedStyle1]} />
      <Animated.View style={[innerStyles.dot, animatedStyle2]} />
      <Animated.View style={[innerStyles.dot, animatedStyle3]} />
    </View>
  );
};

const useInnerStyles = ({ color, size }: PointsProps) =>
  makeStyles(() => ({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    dot: {
      width: size,
      height: size,
      borderRadius: size,
      backgroundColor: color,
      marginHorizontal: 16,
    },
  }));
