import React from 'react';
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
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">What went well?</label>
        <Textarea
          name="wentWell"
          value={formData.wentWell}
          onChange={onInputChange}
          placeholder="Enter what went well during the sprint"
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">What could be improved?</label>
        <Textarea
          name="couldImprove"
          value={formData.couldImprove}
          onChange={onInputChange}
          placeholder="Enter what could be improved"
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">What surprised us?</label>
        <Textarea
          name="surprised"
          value={formData.surprised}
          onChange={onInputChange}
          placeholder="Enter what surprised the team"
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Lessons learned</label>
        <Textarea
          name="lessonsLearned"
          value={formData.lessonsLearned}
          onChange={onInputChange}
          placeholder="Enter lessons learned"
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Other comments</label>
        <Textarea
          name="other"
          value={formData.other}
          onChange={onInputChange}
          placeholder="Enter any other comments"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};