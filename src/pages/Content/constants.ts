/** 메타 데이터를 가져오기 위한 타겟 엘리먼트의 selector */
export const INFO_SELECTOR = '*[data-subject]';

/** app이 마운트 되는 루트 엘리먼트의 id */
export const ROOT_ELEMENT_ID = 'uid_chrome_extension_pr_root';

/** UI요소를 삽입하기위한 부모 엘리먼트의 selector */
export const PARENT_SELECTOR = '*[role="navigation"]';

/** 메시지 템플릿 - 커밋 */
export const MESSAGE_TEMPLATE_COMMIT = 'feat: [{{taskNumber}}] {{subject}}';

/** 메시지 템플릿 - PR */
export const MESSAGE_TEMPLATE_PR =
  '#{{projectCode}}/{{taskNumber}}: {{subject}}';

/** tick interval */
export const DEFAULT_TICK_INTERVAL = 1000;
