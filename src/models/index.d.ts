import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export declare class Group {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Group>);
  static copyOf(
    source: Group,
    mutator: (draft: MutableModel<Group>) => MutableModel<Group> | void
  ): Group;
}
