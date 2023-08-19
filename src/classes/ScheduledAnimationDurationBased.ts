import { DrawBag } from "../components/Canvas";

type DoneCallback = () => void;

interface DurationBasedAnimationUpdateFunc {
  (bag: Pick<DrawBag, "ctx"> & { progress: number }): void;
}

type DurationBasedAnimationConfig = {
  duration: number;
  delay: number;
};

class ScheduledAnimationDurationBased {
  startTime: number = -1;
  elapsedTime: number = -1;
  duration: number;
  delay: number;
  updateFunc: DurationBasedAnimationUpdateFunc;

  constructor(
    updateFunc: DurationBasedAnimationUpdateFunc,
    config: DurationBasedAnimationConfig = { duration: 200, delay: 0 }
  ) {
    this.updateFunc = updateFunc;
    this.duration = config.duration;
    this.delay = config.delay;
  }

  update(bag: DrawBag, done: DoneCallback) {
    if (this.startTime < 0) {
      this.startTime = bag.t;
    }

    this.elapsedTime = bag.t - this.startTime;

    if (this.elapsedTime >= this.delay) {
      const progress = Math.min((this.elapsedTime - this.delay) / (this.duration - this.delay), 1);
      this.updateFunc({ ctx: bag.ctx, progress });
    }

    if (this.elapsedTime >= this.duration + this.delay) {
      done();
    }
  }
}

export default ScheduledAnimationDurationBased;
