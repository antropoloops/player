import {
  DataStore,
  PersistentModel,
  PersistentModelConstructor,
  ProducerModelPredicate,
} from "@aws-amplify/datastore";
import { useEffect, useRef, useState } from "react";

export function useObserveList<T extends PersistentModel>(
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

export function useObserveModel<T extends PersistentModel>(
  Model: PersistentModelConstructor<T>,
  id?: string
) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | undefined>();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    const fetch = () =>
      DataStore.query(Model, id)
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("ERROR", err);
          setIsLoading(false);
        });
    fetch();
    const subscription = DataStore.observe(Model, id).subscribe(() => fetch());
    return () => subscription.unsubscribe();
  }, [Model, id]);

  return { data, isLoading };
}
