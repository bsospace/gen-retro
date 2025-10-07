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
import { Input } from '@/components/ui/input';
import { RetrospectiveForm } from '@/components/retrospective/RetrospectiveForm';
import { RetrospectiveTextSections } from '@/components/retrospective/RetrospectiveTextSections';
import { PDFPreview } from '@/components/retrospective/PDFPreview';
import { RetrospectiveData } from '@/types/retrospective';
import { ClipboardList, Globe } from 'lucide-react';
import { generatePDFPreview, downloadPDF, getDefaultPdfFileName } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const STORAGE_KEY = 'retrospective-journal-data';
const TEMP_LOGIN_STORAGE_KEY = 'retrospective-journal-temp';
const INVALID_FILENAME_CHARS = /[/:*?"<>|]/g;
const DEFAULT_FILE_EXTENSION = '.pdf';
const PDF_EXTENSION_REGEX = /\.pdf$/i;

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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isFilenameDialogOpen, setIsFilenameDialogOpen] = useState(false);
  const [filenameInput, setFilenameInput] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPostDownloadDialogOpen, setIsPostDownloadDialogOpen] = useState(false);

  const sanitizeBaseFileName = (value: string) => {
    if (!value) {
      return '';
    }

    return value
      .replace(INVALID_FILENAME_CHARS, '-')
      .replace(/\./g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

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

  const handleOpenFilenameDialog = () => {
    const defaultName = getDefaultPdfFileName(formData);
    const defaultBase = sanitizeBaseFileName(defaultName.replace(PDF_EXTENSION_REGEX, '')) || 'retrospective';
    setFilenameInput(defaultBase);
    setIsFilenameDialogOpen(true);
  };

  const handleFilenameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeBaseFileName(event.target.value);
    setFilenameInput(sanitized);
  };

  const buildFinalFilename = (rawValue: string) => {
    const fallbackBase = sanitizeBaseFileName(
      getDefaultPdfFileName(formData).replace(PDF_EXTENSION_REGEX, '')
    ) || 'retrospective';
    const sanitizedInput = sanitizeBaseFileName(rawValue.trim());
    const finalBase = sanitizedInput || fallbackBase;
    return `${finalBase}${DEFAULT_FILE_EXTENSION}`;
  };

  const handleConfirmDownload = async () => {
    setIsDownloading(true);
    const finalName = buildFinalFilename(filenameInput);

    try {
      await downloadPDF(formData, finalName);
      setIsFilenameDialogOpen(false);
      setIsPostDownloadDialogOpen(true);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      toast({
        variant: 'destructive',
        title: t('downloadErrorTitle'),
        description: t('downloadErrorMessage'),
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleProceedToLogin = () => {
    try {
      localStorage.setItem(TEMP_LOGIN_STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Failed to persist temporary login data:', error);
    }

    setIsPostDownloadDialogOpen(false);
    window.location.href = '/login';
  };

  return (
    <div className="container mx-auto p-4 min-h-screen min-w-full bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[2000px] mx-auto">
        {/* Form Section */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div></div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <ClipboardList className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl font-bold">{t('title')}</CardTitle>
              </div>
              {/* Language Selector */}
              <div className="flex justify-end mb-4">
                <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
                  <SelectTrigger className="w-36">
                    <Globe className="h-4 w-4" />
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="th">ไทย</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <div className="lg:sticky lg:top-4 h-fit">
          <PDFPreview 
            previewUrl={pdfPreviewUrl}
            onDownload={pdfPreviewUrl ? handleOpenFilenameDialog : undefined}
          />
        </div>
      </div>

      {/* Filename Dialog */}
      <Dialog open={isFilenameDialogOpen} onOpenChange={setIsFilenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('filenameDialogTitle')}</DialogTitle>
            <DialogDescription>
              {t('filenameDialogDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <label className="text-sm font-medium" htmlFor="pdf-file-name">
              {t('filenameLabel')}
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="pdf-file-name"
                value={filenameInput}
                onChange={handleFilenameInputChange}
                autoFocus
                className="flex-1"
              />
              <span className="text-sm font-medium text-muted-foreground select-none">
                {DEFAULT_FILE_EXTENSION}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilenameDialogOpen(false)}>
              {t('cancelButton')}
            </Button>
            <Button onClick={handleConfirmDownload} disabled={isDownloading}>
              {isDownloading ? t('downloadingLabel') : t('confirmDownloadButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Post Download Login Prompt */}
      <Dialog open={isPostDownloadDialogOpen} onOpenChange={setIsPostDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('postDownloadDialogTitle')}</DialogTitle>
            <DialogDescription>
              {t('postDownloadDialogDescription')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPostDownloadDialogOpen(false)}>
              {t('continueWithoutLogin')}
            </Button>
            <Button onClick={handleProceedToLogin}>
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
