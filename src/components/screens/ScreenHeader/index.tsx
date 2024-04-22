import SearchIcon from '@appello/mobile-ui/icons/unicons/magnifier.svg';
import React from 'react';
import { View } from 'react-native';

import { makeStyles } from '../../../utils';
import { TextInput, TextInputProps } from '../../common/TextInput';
import { BasicHeader, BasicHeaderProps } from '../BasicHeader';

export interface ScreenHeaderProps extends BasicHeaderProps {
  /**
   * Props of the search input.
   * This prop is also responsible for displaying search input in the first place
   * */
  searchInput?: TextInputProps;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ searchInput, ...basicProps }) => {
  const styles = useInnerStyles();
  return (
    <BasicHeader {...basicProps}>
      {!!searchInput && (
        <View style={styles.searchInput}>
          <TextInput Icon={SearchIcon} placeholder="Search" {...searchInput} />
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
