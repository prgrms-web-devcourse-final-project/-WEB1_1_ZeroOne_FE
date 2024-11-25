import { useReducer, useState } from 'react';

import { WriteArchiveContainer, ColorChoiceStep } from '@/widgets';

type StepState = 'selectColor' | 'writeForm';

type StepAction = { type: 'SELECT_COLOR' } | { type: 'WRITE_FORM' };

const stepReducer = (state: StepState, action: StepAction): StepState => {
  switch (action.type) {
    case 'SELECT_COLOR':
      return 'writeForm';
    case 'WRITE_FORM':
      return 'selectColor';
    default:
      return state;
  }
};

export const WriteArchivePage = () => {
  const [currentStep, dispatch] = useReducer(stepReducer, 'selectColor');
  const [color, setColor] = useState<string | null>(null);

  const getGuideAndChildren = () => {
    if (currentStep === 'selectColor') {
      return {
        guide: '어떤 색상의 아카이브를 작성할지 골라주세요',
        children: (
          <ColorChoiceStep
            onClick={() => {
              dispatch({ type: 'SELECT_COLOR' });
            }}
            onSelectColor={setColor}
            selectedColor={color}
          />
        ),
      };
    }
    if (currentStep === 'writeForm') {
      return {
        guide: '기록해주세요',
        children: <></>,
      };
    }
    return { guide: '', children: null };
  };

  const { guide, children } = getGuideAndChildren();

  return <WriteArchiveContainer children={children} guide={guide} />;
};
