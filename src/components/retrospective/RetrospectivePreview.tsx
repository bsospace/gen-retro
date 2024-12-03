import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RetrospectiveData } from '@/types/retrospective';

interface RetrospectivePreviewProps {
  formData: RetrospectiveData;
}

export const RetrospectivePreview: React.FC<RetrospectivePreviewProps> = ({
  formData,
}) => {
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
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <PreviewSection title="Team Name" content={formData.teamName} />
          <PreviewSection title="Name" content={formData.name} />
          <PreviewSection title="Date" content={formData.date} />
          <PreviewSection title="Cycle Number" content={formData.cycleNumber} />
        </div>
        <PreviewSection title="What Went Well" content={formData.wentWell} />
        <PreviewSection title="What Could Be Improved" content={formData.couldImprove} />
        <PreviewSection title="What Surprised Us" content={formData.surprised} />
        <PreviewSection title="Lessons Learned" content={formData.lessonsLearned} />
        <PreviewSection title="Other Comments" content={formData.other} />
      </CardContent>
    </Card>
  );
};