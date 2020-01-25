import { ControlCommand } from "./ControlCommand";

export interface Effects {
  attach(target: any): void;
  detach(): void;
  run(command: ControlCommand): void;
}
