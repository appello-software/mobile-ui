import React from 'react';
import { View, ViewProps } from 'react-native';

import { useUIKitTheme } from '~/ui';
import { makeStyles } from '~/ui/utils';

export const AppView: React.FC<ViewProps> = ({ style, ...props }) => {
  const styles = useStyles();

  return <View style={[styles.view, style]} {...props} />;
};

const useStyles = makeStyles(() => {
  const theme = useUIKitTheme();

  return React.useMemo(
    () => ({
      view: {
        backgroundColor: theme.backgroundColor,
      },
    }),
    [theme],
  );
});
