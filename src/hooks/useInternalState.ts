import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useInternalState<TProp>(prop: TProp): [TProp, Dispatch<SetStateAction<TProp>>] {
  const [internalState, setInternalState] = useState<TProp>(prop);

  useEffect(() => {
    setInternalState(prop);
  }, [prop]);

  return [internalState, setInternalState];
}
