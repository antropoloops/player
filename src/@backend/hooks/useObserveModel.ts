import {
  DataStore,
  PersistentModel,
  PersistentModelConstructor,
  ProducerModelPredicate,
} from "@aws-amplify/datastore";
import { useEffect, useRef, useState } from "react";

export function useObserveModel<T extends PersistentModel>(
  Model: PersistentModelConstructor<T>,
  criteria?: ProducerModelPredicate<T>
  // paginationProducer?: ProducerPaginationInput<T>
) {
  const [data, setData] = useState<T[]>([]);
  const query = useRef(criteria);

  useEffect(() => {
    const criteria = query.current;
    const fetch = () => DataStore.query(Model, criteria).then(setData);
    fetch();
    const subscription = DataStore.observe(Model, criteria).subscribe(() =>
      fetch()
    );
    return () => subscription.unsubscribe();
  }, [Model]);

  const isLoading = data === undefined;

  return { data, isLoading };
}

export default useObserveModel;
