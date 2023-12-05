import React, { ReactElement, useState } from 'react';
import { FlatList, FlatListProps } from 'react-native';

import {
  BaseUseQuery,
  ResultOfQuery,
  RTKQueryInfiniteListPage,
  RTKQueryInfiniteListPageProps,
} from './RTKQueryInfiniteListPage';

type Props<TQuery extends BaseUseQuery, TItem, TPaginationParams extends object> = Omit<
  RTKQueryInfiniteListPageProps<TQuery>,
  'index' | 'onQuery'
> &
  Omit<FlatListProps<TItem>, 'data' | 'onEndReached'> & {
    getItems: (queryData: ResultOfQuery<TQuery>['data']) => TItem[];
    getPaginationParams: (pageIndex: number) => TPaginationParams;
    shouldRequestNext?: (queryResults: ResultOfQuery<TQuery>[]) => boolean;
  };

export const RTKQueryInfiniteList = <
  TQuery extends BaseUseQuery,
  TItem,
  TPaginationParams extends object,
>({
  useQuery,
  queryArgs,
  getItems,
  getPaginationParams,
  shouldRequestNext: shouldRequestNextProp,
  ...flatListProps
}: Props<TQuery, TItem, TPaginationParams>): ReactElement => {
  const [pagesCount, setPagesCount] = React.useState(1);
  const [queryResults, setQueryResults] = useState<ResultOfQuery<TQuery>[]>([]);

  const handleQuery = React.useCallback<RTKQueryInfiniteListPageProps<TQuery>['onQuery']>(
    (index, queryResult) => {
      setQueryResults(results => {
        const newResults = [...results];
        newResults[index] = queryResult;
        return newResults;
      });
    },
    [],
  );

  const items = React.useMemo(() => {
    return queryResults.flatMap(pageData => getItems(pageData.data));
  }, [queryResults, getItems]);

  const isAnyLoading = React.useMemo(() => {
    return queryResults.some(result => result.isLoading);
  }, [queryResults]);

  const shouldRequestNext = React.useMemo(() => {
    const shouldRequest = shouldRequestNextProp?.(queryResults) ?? true;

    return !isAnyLoading && shouldRequest;
  }, [isAnyLoading, queryResults, shouldRequestNextProp]);

  const handleEndReached = React.useCallback<NonNullable<FlatListProps<any>['onEndReached']>>(
    ({ distanceFromEnd }) => {
      if (distanceFromEnd >= 0 && shouldRequestNext) {
        setPagesCount(index => ++index);
      }
    },
    [shouldRequestNext],
  );

  const renderPages = React.useMemo(() => {
    return new Array(pagesCount)
      .fill(null)
      .map((_, index) => (
        <RTKQueryInfiniteListPage
          key={index}
          index={index}
          useQuery={useQuery}
          queryArgs={{ ...queryArgs, ...getPaginationParams(index) }}
          onQuery={handleQuery}
        />
      ));
  }, [pagesCount, useQuery, queryArgs, getPaginationParams, handleQuery]);

  return (
    <>
      {renderPages}
      <FlatList {...flatListProps} data={items} onEndReached={handleEndReached} />
    </>
  );
};
