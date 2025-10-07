import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

interface PDFPreviewProps {
  previewUrl: string;
  onDownload?: () => void;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ previewUrl, onDownload }) => {
  const { t } = useTranslation();

  if (!previewUrl) {
    return (
      <Card className="h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
        <FileText className="h-16 w-16 mb-4" />
        <p className="text-lg">{t('pdfPreviewMessage')}</p>
        <span className='text-sm text-red-600'>{t('disclaimerNote')}</span>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-0">
        <div className="flex w-full items-center justify-between gap-4">
          <CardTitle className="truncate">{t('pdfPreviewTitle')}</CardTitle>
          {onDownload && (
            <Button 
              onClick={onDownload}
              variant="outline"
              className="flex-shrink-0"
            >
              <Download className="mr-2 h-4 w-4" />
              {t('downloadPDF')}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-hidden rounded-lg border">
          <img 
            src={previewUrl} 
            alt={t('pdfPreviewAlt')} 
            className="w-full h-full object-contain"
          />
        </div>
      </CardContent>
      <CardFooter>
        <span className='text-sm text-red-600'>{t('disclaimerNote')}</span>
      </CardFooter>
    </Card>
  );
};
