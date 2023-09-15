import { PARENT_SELECTOR } from './constants';
import { createTicker } from './modules/ticker';
import { initializeReactApp, unmountReactApp } from './ui/main';

const bootstrap = () => {
  /** ticker */
  const ticker = createTicker({
    immediate: true,
    interval: 500,
    runCallback: () => {
      initializeReactApp(PARENT_SELECTOR);
    },
    cancelCallback: () => {
      unmountReactApp();
    },
  });

  // 탭 활성화 여부에 따라 ticker를 제어합니다.
  if (document.visibilityState === 'visible') {
    ticker.run();
  } else {
    ticker.stop();
  }

  // 탭 활성화 상태를 감지하여 ticker를 제어합니다.
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      ticker.run();
      console.log(
        '[PR Extension] 탭이 활성화되어 클립보드 복사 UI가 마운트 되었습니다.'
      );
    } else {
      console.log(
        '[PR Extension] 탭이 비활성화되어 클립보드 복사 UI가 언마운트 되었습니다.'
      );
      ticker.stop();
    }
  });
};

bootstrap();
