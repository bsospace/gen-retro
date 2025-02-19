import React from 'react';
import { useTranslation } from 'react-i18next';
import { Textarea } from '@/components/ui/textarea';
import { RetrospectiveData } from '@/types/retrospective';

interface RetrospectiveTextSectionsProps {
  formData: RetrospectiveData;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const RetrospectiveTextSections: React.FC<RetrospectiveTextSectionsProps> = ({
  formData,
  onInputChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('wentWell')}</label>
        <Textarea
          name="wentWell"
          value={formData.wentWell}
          onChange={onInputChange}
          placeholder={t('wentWellPlaceholder')}
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('couldImprove')}</label>
        <Textarea
          name="couldImprove"
          value={formData.couldImprove}
          onChange={onInputChange}
          placeholder={t('couldImprovePlaceholder')}
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('surprised')}</label>
        <Textarea
          name="surprised"
          value={formData.surprised}
          onChange={onInputChange}
          placeholder={t('surprisedPlaceholder')}
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('lessonsLearned')}</label>
        <Textarea
          name="lessonsLearned"
          value={formData.lessonsLearned}
          onChange={onInputChange}
          placeholder={t('lessonsLearnedPlaceholder')}
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('other')}</label>
        <Textarea
          name="other"
          value={formData.other}
          onChange={onInputChange}
          placeholder={t('otherPlaceholder')}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};
