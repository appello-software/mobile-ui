import SearchIcon from '@appello/mobile-ui/icons/unicons/magnifier.svg';
import { makeStyles } from '@appello/mobile-ui/utils';
import React from 'react';
import { View } from 'react-native';

import { TextInput } from '../../common/TextInput';
import { BasicHeader, BasicHeaderProps } from '../BasicHeader';

export interface ScreenHeaderProps extends BasicHeaderProps {
  /**
   * Callback to call when search value changes.
   * This prop is also responsible for displaying search input in the first place
   * */
  onSearchChange?: (value: string) => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ onSearchChange, ...basicProps }) => {
  const styles = useInnerStyles();
  return (
    <BasicHeader {...basicProps}>
      <View>
        {!!onSearchChange && (
          <TextInput Icon={SearchIcon} placeholder="Search" style={styles.searchInput} />
        )}
      </View>
    </BasicHeader>
  );
};

const useInnerStyles = makeStyles(() => ({
  searchInput: {
    marginTop: 8.5,
  },
}));
