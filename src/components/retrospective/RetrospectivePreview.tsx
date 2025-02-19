import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RetrospectiveData } from '@/types/retrospective';

interface RetrospectivePreviewProps {
  formData: RetrospectiveData;
}

export const RetrospectivePreview: React.FC<RetrospectivePreviewProps> = ({
  formData,
}) => {
  const { t } = useTranslation();
  
  const PreviewSection = ({ title, content }: { title: string; content: string }) => (
    <div className="mb-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
        {content || 'N/A'}
      </p>
    </div>
  );

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{t('previewTitle')}</CardTitle> {/* Translated title */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <PreviewSection title={t('teamName')} content={formData.teamName} />
          <PreviewSection title={t('name')} content={formData.name} />
          <PreviewSection title={t('date')} content={formData.date} />
          <PreviewSection title={t('cycleNumber')} content={formData.cycleNumber} />
        </div>
        <PreviewSection title={t('wentWell')} content={formData.wentWell} />
        <PreviewSection title={t('couldImprove')} content={formData.couldImprove} />
        <PreviewSection title={t('surprised')} content={formData.surprised} />
        <PreviewSection title={t('lessonsLearned')} content={formData.lessonsLearned} />
        <PreviewSection title={t('other')} content={formData.other} />
      </CardContent>
    </Card>
  );
};
