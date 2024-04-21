import SearchIcon from '@appello/mobile-ui/icons/unicons/magnifier.svg';
import React from 'react';
import { View } from 'react-native';

import { makeStyles } from '../../../utils';
import { TextInput, TextInputProps } from '../../common/TextInput';
import { BasicHeader, BasicHeaderProps } from '../BasicHeader';

export interface ScreenHeaderProps extends BasicHeaderProps {
  /**
   * Callback to call when search value changes.
   * This prop is also responsible for displaying search input in the first place
   * */
  onSearchChange?: (value: string) => void;
  /**
   * Style of the search input if there is one
   * */
  searchInputStyle?: TextInputProps['style'];
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  onSearchChange,
  searchInputStyle,
  ...basicProps
}) => {
  const styles = useInnerStyles();
  return (
    <BasicHeader {...basicProps}>
      {!!onSearchChange && (
        <View style={styles.searchInput}>
          <TextInput
            Icon={SearchIcon}
            placeholder="Search"
            style={searchInputStyle}
            onChangeText={onSearchChange}
          />
        </View>
      )}
    </BasicHeader>
  );
};

const useInnerStyles = makeStyles(() => ({
  searchInput: {
    marginTop: 8.5,
  },
}));
