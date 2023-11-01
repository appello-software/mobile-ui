import React, { ElementType } from 'react';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type PartialProps<T extends ElementType> = Partial<React.ComponentProps<T>>;
