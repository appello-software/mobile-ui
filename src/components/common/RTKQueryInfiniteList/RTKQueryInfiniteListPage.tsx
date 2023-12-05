import { QueryArgFrom, QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { UseQueryHookResult } from '@reduxjs/toolkit/src/query/react/buildHooks';
import React from 'react';

export type BaseUseQuery = UseQuery<QueryDefinition<any, any, any, any>>;

export interface RTKQueryInfiniteListPageProps<TQuery extends BaseUseQuery> {
  index: number;
  useQuery: TQuery;
  queryArgs: ArgumentsOfQuery<TQuery>;
  onQuery: (pageIndex: number, queryResult: ResultOfQuery<TQuery>) => void;
}

export type ArgumentsOfQuery<TQuery extends BaseUseQuery> = TQuery extends UseQuery<infer TQueryDef>
  ? QueryArgFrom<TQueryDef> extends object
    ? QueryArgFrom<TQueryDef>
    : never
  : unknown;

export type ResultOfQuery<TQuery extends BaseUseQuery> = TQuery extends UseQuery<infer TQueryDef>
  ? UseQueryHookResult<TQueryDef>
  : unknown;

export const RTKQueryInfiniteListPage = <TQuery extends BaseUseQuery>({
  index,
  useQuery,
  queryArgs,
  onQuery,
}: RTKQueryInfiniteListPageProps<TQuery>): null => {
  const queryResult = useQuery(queryArgs) as ResultOfQuery<TQuery>;

  React.useEffect(() => {
    onQuery(index, queryResult);
  }, [queryResult, index]);

  return null;
};
