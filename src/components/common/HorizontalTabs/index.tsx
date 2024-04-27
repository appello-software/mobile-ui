import { mergeCollectionByKey } from '@appello/common';
import React, {
  FC,
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ColorValue, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useUIKitTheme } from '../../../config/utils';
import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '../../../hooks/useCombinedStylesWithConfig';
import { makeStyles } from '../../../utils';
import { AppText, AppTextProps } from '../AppText';

const DEFAULT_ITEM_SPACING = 16;
export const DEFAULT_TAB_HEIGHT = 52;

interface HorizontalTabsStyles {
  'horizontal-tabs'?: ViewStyle;
  'horizontal-tabs__text'?: TextStyle;
  'horizontal-tabs__item'?: ViewStyle;
  'horizontal-tabs__underline'?: ViewStyle;
}

interface HorizontalTabsState {
  key: string;
  x: number;
  width: number;
}

export interface HorizontalTabsRefType {
  scrollToIndex: (index: number) => void;
}

export interface HorizontalTabsProps {
  /** Ref component for calling methods */
  ref?: Ref<HorizontalTabsRefType>;
  /** Ref component for calling methods */
  style?: ViewStyle;
  /**
   * Adds the ability to scroll elements; if false, then all elements will stretch to the full width provided to them
   *
   * @default false
   * */
  scrollable?: boolean;
  /** Array of tabs */
  list: { key: string; title: string }[];
  /** Current active tab */
  currentTab: string;
  /** Callback for changing the active tab */
  onTabChange: (key: string) => void;
  /**
   * Tab height
   *
   * @default 52
   * */
  tabHeight?: number;
  /**
   * Additional content near the tab title (Suppose you need to show the number of elements)
   * */
  tabContent?: (key: string) => ReactElement;
  /**
   * If you want additional content (from tabContent) to be rendered on the left
   * */
  tabContentReverse?: boolean;
  /** Text props
   *
   * @default { variant: 'p1' }
   * */
  tabTextProps?: Omit<AppTextProps, 'style'>;
  /**
   * Tab height
   *
   * @default theme.colors.primary
   * */
  activeColor?: ColorValue;
}

export const HorizontalTabs = forwardRef<HorizontalTabsRefType, HorizontalTabsProps>(
  (props, ref) => {
    const { colors } = useUIKitTheme();
    // Themed functionality
    const {
      currentTab,
      list,
      onTabChange,
      scrollable = false,
      tabHeight = DEFAULT_TAB_HEIGHT,
      tabContent,
      tabContentReverse,
      tabTextProps = { variant: 'p1' },
      activeColor = colors.primary,
      style,
    } = useCombinedPropsWithConfig('HorizontalTabs', props);
    const styles = useCombinedStylesWithConfig('HorizontalTabs', useHorizontalTabsStyles);
    const innerStyles = useInnerStyles(
      useMemo(
        () => ({ tabHeight, tabContentReverse, scrollable, activeColor }),
        [tabHeight, tabContentReverse, scrollable, activeColor],
      ),
    );

    // Component functionality
    const [leftOffsetItems, setLeftOffsetItems] = useState<HorizontalTabsState[]>([]);
    const getCurrent = leftOffsetItems.find(item => item.key === currentTab);
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
            <React.Fragment key={key}>
              <TouchableOpacity
                style={[innerStyles['horizontal-tabs__item'], styles['horizontal-tabs__item']]}
                onLayout={({
                  nativeEvent: {
                    layout: { x, width },
                  },
                }) => {
                  setLeftOffsetItems(prevState => {
                    return mergeCollectionByKey(prevState, [{ key, x, width }], 'push', 'key');
                  });
                }}
                onPress={() => onTabChange(key)}
              >
                <AppText
                  style={styles['horizontal-tabs__text']}
                  {...{
                    ...tabTextProps,
                    color: key === currentTab ? activeColor : tabTextProps.color,
                  }}
                >
                  {title}
                </AppText>
                {tabContent?.(key)}
              </TouchableOpacity>
              {list.length - 1 !== index && (
                <View style={innerStyles['horizontal-tabs__item-separator']} />
              )}
            </React.Fragment>
          ))}
          <Animated.View
            style={[
              innerStyles['horizontal-tabs__underline'],
              styles['horizontal-tabs__underline'],
              animatedStyleUnderline,
            ]}
          />
        </View>
      );
    };

    return (
      <View style={[{ height: tabHeight }, styles['horizontal-tabs'], style]}>
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
      zIndex: 0,
    },
    'horizontal-tabs__item': {},
    'horizontal-tabs__text': {
      fontSize: 14,
      fontWeight: '500',
    },
    'horizontal-tabs__underline': {},
  } as HorizontalTabsStyles),
);

const useInnerStyles = makeStyles(
  (
    theme,
    {
      tabHeight,
      tabContentReverse,
      scrollable,
      activeColor,
    }: Pick<HorizontalTabsProps, 'tabHeight' | 'tabContentReverse' | 'scrollable' | 'activeColor'>,
  ) =>
    StyleSheet.create({
      'horizontal-tabs__row': {
        flexDirection: 'row',
        width: '100%',
      },
      'horizontal-tabs__item': {
        height: tabHeight,
        flexDirection: tabContentReverse ? 'row-reverse' : 'row',
        paddingHorizontal: scrollable ? DEFAULT_ITEM_SPACING : 'none',
      },
      'horizontal-tabs__item-separator': {
        width: DEFAULT_ITEM_SPACING,
      },
      'horizontal-tabs__underline': {
        position: 'absolute',
        height: 2,
        bottom: 0,
        backgroundColor: activeColor,
      },
    }),
);
