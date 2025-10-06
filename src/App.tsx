import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RetrospectiveForm } from '@/components/retrospective/RetrospectiveForm';
import { RetrospectiveTextSections } from '@/components/retrospective/RetrospectiveTextSections';
import { PDFPreview } from '@/components/retrospective/PDFPreview';
import { RetrospectiveData } from '@/types/retrospective';
import { ClipboardList, Save } from 'lucide-react';
import { generatePDFPreview, downloadPDF } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const STORAGE_KEY = 'retrospective-journal-data';

function App() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
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
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.error('Failed to parse saved data:', error);
      }
    }
    setIsDataLoaded(true);
  }, []);

  // Save data to localStorage whenever formData changes (after initial load)
  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isDataLoaded]);

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

  const handleSaveJournal = () => {
    // Show login dialog
    setShowLoginDialog(true);
  };

  const handleLoginClick = () => {
    // This is where the actual login will be implemented later
    // For now, just close the dialog and show a message
    setShowLoginDialog(false);
    toast({
      title: t('dataSaved'),
      description: t('loginPromptMessage'),
    });
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
              <Button 
                onClick={handleSaveJournal}
                disabled={!formData.teamName || !formData.name}
                className="w-full"
                variant="outline"
              >
                <Save className="mr-2 h-4 w-4" />
                {t('saveJournal')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-4 h-fit">
          <PDFPreview 
            previewUrl={pdfPreviewUrl}
            onDownload={pdfPreviewUrl ? () => downloadPDF(formData) : undefined}
          />
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('loginRequired')}</DialogTitle>
            <DialogDescription>
              {t('loginPromptMessage')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              {t('cancelButton')}
            </Button>
            <Button onClick={handleLoginClick}>
              {t('loginButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}

export default App;
