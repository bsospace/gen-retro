import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface PDFPreviewProps {
  previewUrl: string;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ previewUrl }) => {
  if (!previewUrl) {
    return (
      <Card className="h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
        <FileText className="h-16 w-16 mb-4" />
        <p className="text-lg">Generate a preview to see your PDF here</p>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>PDF Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[1/1.4] w-full overflow-hidden rounded-lg border">
          <img 
            src={previewUrl} 
            alt="PDF Preview" 
            className="w-full h-full object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
};