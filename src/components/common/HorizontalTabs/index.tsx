import { AnyObject } from '@appello/common/lib/types';
import React, {
  FC,
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { AppText, AppTextProps } from '~/components';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { makeStyles } from '~/utils';

interface HorizontalTabsStyles {
  'horizontal-tabs'?: ViewStyle;
  'horizontal-tabs__text'?: ViewStyle;
  'horizontal-tabs__item'?: ViewStyle;
}

interface HorizontalTabsState {
  key: string;
  x: number;
  width: number;
}

export interface HorizontalTabsRefType {
  scrollToIndex: (index: number) => void;
}

interface HorizontalTabsProps {
  ref?: Ref<HorizontalTabsRefType>;
  scrollable?: boolean;
  list: { key: string; title: string }[];
  tab: string;
  setTab: (v: string) => void;
  tabHeight?: number;
  tabContent?: (key: string) => ReactElement;
  tabContentReverse?: boolean;
  tabTextVariant?: AppTextProps['variant'];
}

const DEFAULT_TAB_HEIGHT = 52;

// Cool method for unit two collection by key
// @TODO: move it to @appello/common
export const mergeArraysByUniqKey = <T extends AnyObject>(
  arr1: T[],
  arr2: T[],
  key: string | ((item: T) => string | number) = 'id',
): T[] => {
  const map = new Map();
  const getKey = (item: T) => (typeof key === 'string' ? item[key] : key(item));
  arr1.forEach(item => map.set(getKey(item), item));
  arr2.forEach(item => map.set(getKey(item), { ...map.get(getKey(item)), ...item }));
  return Array.from(map.values());
};

export const HorizontalTabs = forwardRef<HorizontalTabsRefType, HorizontalTabsProps>(
  (props, ref) => {
    // Themed functionality
    const {
      tab,
      list,
      setTab,
      scrollable = false,
      tabHeight = DEFAULT_TAB_HEIGHT,
      tabContent,
      tabContentReverse,
      tabTextVariant = 'p1',
    } = useCombinedPropsWithConfig('HorizontalTabs', props);
    const styles = useCombinedStylesWithConfig('HorizontalTabs', useHorizontalTabsStyles);
    const innerStyles = useInnerStyles();

    // Component functionality
    const [leftOffsetItems, setLeftOffsetItems] = useState<HorizontalTabsState[]>([]);
    const getCurrent = leftOffsetItems.find(item => item.key === tab);
    const scrollOffsetX = useSharedValue(0);
    const scrollRef = useRef<Animated.ScrollView>(null);

    const onScroll = useAnimatedScrollHandler(
      {
        onScroll: ({ contentOffset: { x: value } }) => {
          scrollOffsetX.value = value;
        },
      },
      [],
    );

    useImperativeHandle(ref, () => ({
      scrollToIndex: index => {
        const getScrollOffsetX = leftOffsetItems.slice(0, index).reduce((acc, cur) => {
          acc += cur.width;
          return acc;
        }, 0);

        return scrollRef?.current?.scrollTo({
          x: getScrollOffsetX,
          animated: true,
        });
      },
    }));

    const animatedStyleUnderline = useAnimatedStyle(() => {
      if (getCurrent) {
        return {
          transform: [
            {
              translateX: -scrollOffsetX.value,
            },
          ],
          left: withSpring(getCurrent.x, { damping: 300, mass: 1 }),
          width: withSpring(getCurrent.width, { damping: 300, mass: 1 }),
        };
      }
      return {};
    });

    const renderTabs = () => {
      return (
        <View style={innerStyles['horizontal-tabs__row']}>
          {list.map(({ key, title }, index) => (
            <TouchableOpacity
              key={key}
              style={[
                {
                  height: tabHeight,
                  flexDirection: tabContentReverse ? 'row-reverse' : 'row',
                  paddingHorizontal: scrollable ? 16 : 'none',
                  marginRight: list.length - 1 !== index ? 16 : undefined,
                },
                styles['horizontal-tabs__item'],
              ]}
              onLayout={({
                nativeEvent: {
                  layout: { x, width },
                },
              }) => {
                setLeftOffsetItems(prevState => {
                  return [...mergeArraysByUniqKey([{ key, x, width }], prevState, 'key')];
                });
              }}
              onPress={() => setTab(key)}
            >
              <AppText style={styles['horizontal-tabs__text']} variant={tabTextVariant}>
                {title}
              </AppText>
              {tabContent?.(key)}
            </TouchableOpacity>
          ))}
        </View>
      );
    };

    return (
      <View style={[{ height: tabHeight }, styles['horizontal-tabs']]}>
        {scrollable ? (
          <Animated.ScrollView
            horizontal
            decelerationRate="fast"
            overScrollMode="never"
            ref={scrollRef}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
          >
            {renderTabs()}
          </Animated.ScrollView>
        ) : (
          <>{renderTabs()}</>
        )}
        <View style={[innerStyles['horizontal-tabs__underline'], animatedStyleUnderline]} />
      </View>
    );
  },
) as FC<HorizontalTabsProps>;

export const useHorizontalTabsStyles = makeStyles(({ colors }) =>
  StyleSheet.create({
    'horizontal-tabs': {
      borderBottomColor: colors.gray['1'],
      borderBottomWidth: 1,
      justifyContent: 'center',
      position: 'relative',
    },
    'horizontal-tabs__text': {
      fontSize: 14,
      fontWeight: '500',
    },
  } as HorizontalTabsStyles),
);

const useInnerStyles = makeStyles(theme =>
  StyleSheet.create({
    'horizontal-tabs__row': {
      flexDirection: 'row',
      width: '100%',
    },
    'horizontal-tabs__item': {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    'horizontal-tabs__underline': {
      position: 'absolute',
      height: 2,
      bottom: -1,
      backgroundColor: theme.colors.primary,
    },
  }),
);
