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

import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';

const ANIMATION_DURATION = 1300;

const AnimatedCircle = Animated.createAnimatedComponent(RNCircle);

export interface CircleProps {
  /** Size for loader */
  size?: number;
  /** Duration for loader */
  duration?: number;
  /** Color spinner */
  color?: string;
  /** Color background circle */
  colorBack?: string;
}

export const Circle: FC<CircleProps> = props => {
  const theme = useUIKitTheme();

  const {
    size = 24,
    duration = ANIMATION_DURATION,
    colorBack = theme.colors.gray['4'],
    color = theme.colors.primary,
  } = useCombinedPropsWithConfig('Circle', props);

  const progress = useSharedValue(0);
  const rotate = useSharedValue(0);
  const strokeWidth = size > 25 ? 4 : 3;

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
