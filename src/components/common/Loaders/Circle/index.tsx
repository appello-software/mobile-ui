import React, { FC, useEffect, useMemo } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle as RNCircle } from 'react-native-svg';

import { useUIKitTheme } from '../../../../config/utils';
import { useCombinedPropsWithConfig } from '../../../../hooks/useCombinedPropsWithConfig';

export const DEFAULT_SIZE = 25;
export const ANIMATION_DURATION = 1300;
const STROKE_BOLD = 4;
const STROKE_LIGHT = 3;

const AnimatedCircle = Animated.createAnimatedComponent(RNCircle);

export interface CircleProps {
  /**
   * Size for loader
   *
   * @default 25
   * */
  size?: number;
  /**
   * Duration of loader animation
   *
   * @default 1300
   * */
  duration?: number;
  /**
   * Color of spinner
   *
   * @default theme.colors.primary
   * */
  color?: string;
  /**
   * Color of the circle background
   *
   * @default theme.colors.gray['4']
   * */
  colorBack?: string;
}

export const Circle: FC<CircleProps> = props => {
  const theme = useUIKitTheme();

  const {
    size = DEFAULT_SIZE,
    duration = ANIMATION_DURATION,
    colorBack = theme.colors.gray['4'],
    color = theme.colors.primary,
  } = useCombinedPropsWithConfig('Circle', props);

  const progress = useSharedValue(0);
  const rotate = useSharedValue(0);
  const strokeWidth = size >= DEFAULT_SIZE ? STROKE_BOLD : STROKE_LIGHT;

  const { center, circleLength, radius } = useMemo(() => {
    const center = size / 2;
    const circleLength = size * 2.6;
    const radius = circleLength / (2 * Math.PI);

    return {
      center,
      circleLength,
      radius,
    };
  }, [size]);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, true);
    rotate.value = withRepeat(withTiming(360, { duration, easing: Easing.linear }), -1);

    return () => {
      cancelAnimation(progress);
      cancelAnimation(rotate);
    };
  }, [rotate, progress, duration]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circleLength * 0.3,
    opacity: interpolate(progress.value, [0, 1], [0.2, 1], Extrapolation.CLAMP),
  }));

  const rotateAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View style={[{ width: size, height: size }, rotateAnimation]}>
      <Svg height={size} width={size}>
        <RNCircle
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={colorBack}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={color}
          strokeDasharray={circleLength}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </Animated.View>
  );
};
