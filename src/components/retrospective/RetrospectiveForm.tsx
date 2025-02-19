import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { RetrospectiveData } from '@/types/retrospective';

interface RetrospectiveFormProps {
  formData: RetrospectiveData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RetrospectiveForm: React.FC<RetrospectiveFormProps> = ({
  formData,
  onInputChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('teamName')}</label>
        <Input
          name="teamName"
          value={formData.teamName}
          onChange={onInputChange}
          placeholder={t('teamNamePlaceholder')}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('name')}</label>
        <Input
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder={t('namePlaceholder')}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('date')}</label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={onInputChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('cycleNumber')}</label>
          <Input
            name="cycleNumber"
            value={formData.cycleNumber}
            onChange={onInputChange}
            placeholder={t('cycleNumberPlaceholder')}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('sprintNumber')}</label>
          <Input
            name="sprintNumber"
            value={formData.sprintNumber}
            onChange={onInputChange}
            placeholder={t('sprintNumberPlaceholder')}
          />
        </div>
      </div>
    </div>
  );
};
