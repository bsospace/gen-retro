import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RetrospectiveForm } from '@/components/retrospective/RetrospectiveForm';
import { RetrospectiveTextSections } from '@/components/retrospective/RetrospectiveTextSections';
import { PDFPreview } from '@/components/retrospective/PDFPreview';
import { RetrospectiveData } from '@/types/retrospective';
import { ClipboardList, Download } from 'lucide-react';
import { generatePDFPreview, downloadPDF } from '@/utils/pdfGenerator';

function App() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<RetrospectiveData>({
    teamName: '',
    name: '',
    date: '',
    sprintNumber: '',
    cycleNumber: '',
    wentWell: '',
    couldImprove: '',
    surprised: '',
    lessonsLearned: '',
    other: ''
  });

  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGeneratePDF = async () => {
    const previewUrl = await generatePDFPreview(formData);
    setPdfPreviewUrl(previewUrl);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen min-w-full bg-gray-50 dark:bg-gray-900">
      {/* Language Selector */}
      <div className="flex justify-end mb-4">
        <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="th">ไทย</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[2000px] mx-auto">
        {/* Form Section */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ClipboardList className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl font-bold">{t('title')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <RetrospectiveForm 
              formData={formData}
              onInputChange={handleInputChange}
            />
            <RetrospectiveTextSections
              formData={formData}
              onInputChange={handleInputChange}
            />
            <div className="flex space-x-4 mt-6">
              <Button 
                onClick={handleGeneratePDF}
                disabled={!formData.teamName || !formData.name}
                className="w-full"
              >
                {t('generatePreview')}
              </Button>
              {pdfPreviewUrl && (
                <Button 
                  onClick={() => downloadPDF(formData)}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('downloadPDF')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-4 h-fit">
          <PDFPreview previewUrl={pdfPreviewUrl} />
        </div>
      </div>
    </div>
  );
}

export default App;
