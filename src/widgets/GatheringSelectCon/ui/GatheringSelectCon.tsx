import { useNavigate } from 'react-router-dom';

import styles from './GatheringSelectCon.module.scss';

import { gatheringFilterOptions } from '@/features';
import type { Option } from '@/shared/model/SelectBtnTypes';
import { Button, SelectBtn } from '@/shared/ui';

type GatheringFilterKey = Exclude<keyof typeof gatheringFilterOptions, 'subject'>;

interface SelectConfig {
  key: GatheringFilterKey;
  isMulti: boolean;
  placeholder: string;
}

export const GatheringSelectCon = () => {
  const navigate = useNavigate();
  const selectConfigs: SelectConfig[] = [
    {
      key: 'contact',
      isMulti: false,
      placeholder: '진행 방식',
    },
    {
      key: 'period',
      isMulti: false,
      placeholder: '진행 기간',
    },
    {
      key: 'position',
      isMulti: true,
      placeholder: '포지션',
    },
    {
      key: 'personnel',
      isMulti: false,
      placeholder: '모집 인원',
    },
  ];

  return (
    <div className={styles.container}>
      {selectConfigs.map(config => {
        const options = gatheringFilterOptions[config.key] as Option[];

        return (
          <SelectBtn
            isMulti={config.isMulti}
            key={config.key}
            options={options}
            placeholder={config.placeholder}
            value={config.isMulti ? [] : null}
          />
        );
      })}
      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        게더링 등록하기
      </Button>
    </div>
  );
};
