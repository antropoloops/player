import {
  DataStore,
  PersistentModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";
import { useEffect, useState } from "react";

export function useObserveModel<T extends PersistentModel>(
  Model: PersistentModelConstructor<T>
) {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    const fetch = () => DataStore.query(Model).then(setData);
    fetch();
    const subscription = DataStore.observe(Model).subscribe(() => fetch());
    return () => subscription.unsubscribe();
  }, [Model]);

  const isLoading = data === undefined;

  return { data, isLoading };
}

export default useObserveModel;
