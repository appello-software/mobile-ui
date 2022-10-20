import { useUIKitTheme } from '@appello/mobile-ui';
import { makeStyles } from '@appello/mobile-ui/utils';
import React from 'react';
import { View, ViewProps } from 'react-native';

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
