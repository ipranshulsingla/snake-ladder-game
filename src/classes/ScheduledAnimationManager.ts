import { DrawBag } from "../components/Canvas";
import DeferredPromise from "../utils/DeferredPromise";
import ScheduledAnimationDurationBased from "./ScheduledAnimationDurationBased";

export type ScheduledAnimationItem = [ScheduleUpdateFunc | ScheduledAnimationDurationBased, DeferredPromise];

export interface ScheduleUpdateFunc {
  (bag: DrawBag, done: () => void): void;
}

class ScheduledAnimationManager {
  private scheduledAnimations: Array<ScheduledAnimationItem> = [];

  public draw(bag: DrawBag) {
    const currentScheduledAnimationItem = this.scheduledAnimations.at(0);

    if (!currentScheduledAnimationItem) return;

    const [obj, promise] = currentScheduledAnimationItem;

    if (obj instanceof ScheduledAnimationDurationBased) {
      obj.update(bag, this.markScheduledAnimationDone(promise));
    } else {
      obj(bag, this.markScheduledAnimationDone(promise));
    }
  }

  public scheduleAnimation(...funcs: (ScheduleUpdateFunc | ScheduledAnimationDurationBased)[]) {
    const funcsWithPromise = funcs.map((it) => [it, new DeferredPromise()] as ScheduledAnimationItem);
    this.scheduledAnimations.push(...funcsWithPromise);

    return Promise.all(funcsWithPromise.map((it) => it[1].promise));
  }

  private markScheduledAnimationDone = (deferredPromise: DeferredPromise) => () => {
    this.scheduledAnimations.shift();
    deferredPromise.resolve(undefined);
  };
}

export default ScheduledAnimationManager;
