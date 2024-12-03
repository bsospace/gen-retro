import React from 'react';
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
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">Team Name</label>
        <Input
          name="teamName"
          value={formData.teamName}
          onChange={onInputChange}
          placeholder="Enter team name"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Your Name</label>
        <Input
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={onInputChange}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Cycle Number</label>
        <Input
          name="cycleNumber"
          value={formData.cycleNumber}
          onChange={onInputChange}
          placeholder="Enter cycle number"
        />
      </div>
    </div>
  );
};