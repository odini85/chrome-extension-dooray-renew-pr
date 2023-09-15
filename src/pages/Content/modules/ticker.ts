/**
 * ticker를 생성하기 위한 타입
 */
type CreateTickerOption = {
  /** tick의 interval을 기다리지 않고 즉시 최초 ticker.run() 실행시 runCallback 실행 여부 */
  immediate: boolean;
  /** tick 의 interval */
  interval: number;
  /** interval 간격마다 실행되는 콜백 */
  runCallback: () => void;
  /** ticker.cancel()을 실행한 경우 실행되는 콜백 */
  cancelCallback: () => void;
};

/**
 * createTicker가 반환하는 타입
 */
type Ticker = {
  /** ticker를 실행합니다. */
  run: () => void;
  /** ticker를 멈춥니다. */
  stop: () => void;
};

/**
 * ticker를 생성합니다.
 * @param {Partial<CreateTickerOption>} param ticker 생성옵션
 * @returns
 */
export const createTicker = (param: Partial<CreateTickerOption>): Ticker => {
  /** 기본 옵션 */
  const defaultOption: CreateTickerOption = {
    immediate: true,
    interval: 1000,
    runCallback: () => {},
    cancelCallback: () => {},
  };

  /** 최종 옵션 */
  const option = Object.assign({}, defaultOption, param);

  /** request animation frame id */
  let rafId: ReturnType<typeof requestAnimationFrame>;

  /** tick이 실행된 마지막 시간 */
  let lastTime = Date.now();

  /** tick */
  const tick = () => {
    rafId = requestAnimationFrame(() => {
      const now = Date.now();
      if (now - lastTime > option.interval) {
        lastTime = now;
        option.runCallback();
      }
      tick();
    });
  };

  return {
    run: () => {
      if (option.immediate) {
        option.runCallback();
      }
      tick();
    },
    stop: () => {
      cancelAnimationFrame(rafId);
      option.cancelCallback();
    },
  };
};
