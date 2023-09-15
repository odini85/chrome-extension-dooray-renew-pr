import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ROOT_ELEMENT_ID } from '../constants';

/** app */
let appRoot: ReactDOM.Root | null = null;

/**
 * app을 초기화합니다.
 * @param {string} parentSelector 부모 셀렉터
 * @returns
 */
export const initializeReactApp = (parentSelector: string): void => {
  if (isMountedApp()) {
    return;
  }

  const parent = document.querySelector(parentSelector);
  if (!parent) {
    console.log(
      `[PR Extension] 클립보드 UI를 주입하기 위한 parent 엘리먼트가 존재하지 않습니다. Selector(${parentSelector})`
    );
    return;
  }

  const el = document.createElement('div');
  el.setAttribute('id', ROOT_ELEMENT_ID);
  parent.appendChild(el);
  appRoot = ReactDOM.createRoot(
    document.getElementById(ROOT_ELEMENT_ID) as HTMLDivElement
  );
  appRoot.render(<App />);
};

/**
 * app의 마운트된 상태 여부를 반환합니다
 * @returns
 */
export const isMountedApp = (): boolean => {
  return !!(appRoot && document.getElementById(ROOT_ELEMENT_ID));
};

/**
 * app을 언마운트 합니다.
 */
export const unmountReactApp = (): void => {
  if (!appRoot) {
    return;
  }

  const container = document.getElementById(ROOT_ELEMENT_ID);
  if (!container) {
    return;
  }

  appRoot.unmount();
  appRoot = null;
};
