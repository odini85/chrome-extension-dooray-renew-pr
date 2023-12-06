import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { copy } from '../modules/clipboard';
import {
  INFO_SELECTOR,
  MESSAGE_TEMPLATE_COMMIT,
  MESSAGE_TEMPLATE_PR,
} from '../constants';

type MetaData = {
  taskNumber: string;
  subject: string;
  projectCode: string;
};

export const App = () => {
  /**
   * 타겟 요소의 dataset
   */
  const [dataset, setDataset] = useState({
    ...(document.querySelector<HTMLDivElement>(INFO_SELECTOR)?.dataset ?? {
      taskNumber: '',
      subject: '',
      projectCode: '',
    }),
  });

  /**
   * 메타 데이터
   */
  const metadata = useMemo<MetaData>(() => {
    if (!dataset) {
      console.log(
        '[PR Extension] 클립보드 데이터를 위한 타겟 엘리먼트가 존재하지 않습니다.'
      );
      return {
        taskNumber: '',
        subject: '',
        projectCode: '',
      };
    }

    return {
      taskNumber: dataset.taskNumber || '',
      subject: (dataset.subject || '').trim(),
      projectCode: (dataset.projectCode || '').trim(),
    };
  }, [dataset]);

  /**
   * 클립보드 복사
   */
  const executeCopy = useCallback((type: string, message: string) => {
    copy(message)
      .then(() => {
        toast.success(`${type}가 클립보드에 복사되었습니다.`, {
          autoClose: 250,
          position: 'top-center',
          hideProgressBar: true,
        });
      })
      .catch(() => {
        toast.error(`${type}의 클립보드 복사를 실패했습니다.`, {
          autoClose: 250,
          position: 'top-center',
          hideProgressBar: true,
        });
      });
  }, []);

  /**
   * 클립보드 복사 메시지 생성
   */
  const createCopyText = useCallback(
    (template: string, obj: Partial<MetaData>) => {
      let result = template;
      for (const key in obj) {
        const value = obj[key as keyof MetaData];
        if (value) {
          result = result.replace(new RegExp(`{{${key}}}`), value);
        }
      }
      return result;
    },
    []
  );

  /**
   * task number 복사
   */
  const handleCopyTaskNumber = useCallback(() => {
    executeCopy('Task Number', metadata.taskNumber);
  }, [executeCopy, metadata.taskNumber]);

  /**
   * 커밋 메시지 복사
   */
  const handleCopyCommit = useCallback(() => {
    const { taskNumber, subject } = metadata;
    const copyText = createCopyText(MESSAGE_TEMPLATE_COMMIT, {
      taskNumber,
      subject,
    });
    executeCopy('커밋 메시지', copyText);
  }, [createCopyText, executeCopy, metadata]);

  /**
   * PR 메시지 복사
   */
  const handleCopyPr = useCallback(() => {
    const { taskNumber, subject, projectCode } = metadata;
    const copyText = createCopyText(MESSAGE_TEMPLATE_PR, {
      projectCode,
      taskNumber,
      subject,
    });
    executeCopy('PR 메시지', copyText);
  }, [createCopyText, executeCopy, metadata]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDataset(() => {
        return {
          ...document.querySelector<HTMLDivElement>(INFO_SELECTOR)!.dataset,
        };
      });
    });

    observer.observe(document.querySelector(INFO_SELECTOR)!, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="chrome-extension-dooray-pr-container">
      <ToastContainer limit={3} />
      <button
        className="btn-cedpc"
        type="button"
        onClick={handleCopyTaskNumber}
        title="Commit"
      >
        {dataset.taskNumber}
      </button>
      {/* <button className="btn-cedpc" type="button" onClick={handleCopyCommit}>
        커밋 메시지
      </button> */}
      <button className="btn-cedpc" type="button" onClick={handleCopyPr}>
        PR 메시지
      </button>
    </div>
  );
};
