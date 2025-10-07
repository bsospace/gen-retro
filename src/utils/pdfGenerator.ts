import { RetrospectiveData } from '@/types/retrospective';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const INVALID_FILENAME_CHARS = /[\\/:*?"<>|]/g;

const sanitizeFilenameSegment = (segment: string, fallback: string) => {
  const trimmed = segment?.toString().trim();
  if (!trimmed) {
    return fallback;
  }

  return trimmed
    .replace(INVALID_FILENAME_CHARS, '-')
    .replace(/\s+/g, '-');
};

const formatDateSegment = (dateValue: string) => {
  if (!dateValue) {
    return 'no-date';
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return sanitizeFilenameSegment(dateValue, 'no-date');
  }

  return parsed.toISOString().split('T')[0];
};

const buildSprintCycleSuffix = (formData: RetrospectiveData) => {
  if (formData.sprintNumber && formData.cycleNumber) {
    return `_${formData.cycleNumber}-${formData.sprintNumber}`;
  }
  if (formData.sprintNumber) {
    return `_Sprint-${formData.sprintNumber}`;
  }
  if (formData.cycleNumber) {
    return `_Cycle-${formData.cycleNumber}`;
  }
  return '';
};

export const getDefaultPdfFileName = (formData: RetrospectiveData) => {
  const sprintCycleSection = buildSprintCycleSuffix(formData);
  const teamSegment = sanitizeFilenameSegment(formData.teamName, 'team');
  const dateSegment = formatDateSegment(formData.date);

  return `retrospective${sprintCycleSection}_${teamSegment}_${dateSegment}.pdf`;
};

const createPDFTemplate = (formData: RetrospectiveData) => {
  let sprintCycleSection = "";
  if (formData.sprintNumber || formData.cycleNumber) {
    sprintCycleSection = `
    ${formData.cycleNumber ? `Cycle: ${formData.cycleNumber}` : ""}
      ${formData.sprintNumber ? `Sprint: ${formData.sprintNumber}` : ""} 
    `;
  }

  const template = document.createElement('div');
  template.innerHTML = `
    <div id="pdf-template" style="width: 794px; height: 1123px; padding: 40px; font-family: 'TH Sarabun New', Arial, sans-serif;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 18px;">
        <h1 style="margin: 0; font-size: 24px;">Sprint Retrospective Report</h1>
        <div style="text-align: right;">
          ทีม: ${formData.teamName || '..........'}
          ชื่อ: ${formData.name || '..........'}
          วันที่: ${new Date(formData.date).toLocaleDateString("th-TH", { year: 'numeric', month: 'long', day: 'numeric'}) || '..........'}
          ${sprintCycleSection}
        </div>
      </div>
      
      <div style="border: 1px solid #000; padding: 0px 15px 0px 15px;">
        <div style="font-weight: bold; margin-bottom: 10px;">(สิ่งที่ดำเนินไปได้ดี) Things That Went Well</div>
        <div style="min-height: 300px;" class="whitespace-pre-wrap">${formData.wentWell || ''}</div>
      </div>
      
      <div style="display: flex;">
        <div style="flex: 1; border-top: 0px; border-bottom: 1px solid #000; border-left: 1px solid #000; border-right: 1px solid #000; padding: 0px 15px 0px 15px;">
          <div style="font-weight: bold; margin-bottom: 10px;">(สิ่งที่ควรจะทำให้ดีกว่านี้) Things That Could Have Gone Better</div>
          <div style="min-height: 300px;" class="whitespace-pre-wrap">${formData.couldImprove || ''}</div>
        </div>
        <div style="flex: 1; border-top: 0px; border-bottom: 1px solid #000; border-left: 0px; border-right: 1px solid #000; padding: 0px 15px 0px 15px;">
          <div style="font-weight: bold; margin-bottom: 10px;">(สิ่งที่ทำให้ประหลาดใจ) Things That Surprised Us</div>
          <div style="min-height: 300px;" class="whitespace-pre-wrap">${formData.surprised || ''}</div>
        </div>
      </div>
      
      <div style="display: flex;">
        <div style="flex: 1.5; border-top: 0px; border-bottom: 1px solid #000; border-left: 1px solid #000; border-right: 1px solid #000; padding: 0px 15px 0px 15px;">
          <div style="font-weight: bold; margin-bottom: 10px;">(บทเรียนที่ได้เรียนรู้) Lessons Learned</div>
          <div style="min-height: 300px;" class="whitespace-pre-wrap">${formData.lessonsLearned || ''}</div>
        </div>
        <div style="flex:0.5; border-top: 0px; border-bottom: 1px solid #000; border-left: 0px; border-right: 1px solid #000; padding: 0px 15px 0px 15px;">
          <div style="font-weight: bold; margin-bottom: 10px;">(เรื่องอื่นๆ) Other</div>
          <div style="min-height: 300px;" class="whitespace-pre-wrap">${formData.other || ''}</div>
        </div>
      </div>
    </div>
  `;
  return template;
};

export const generatePDFPreview = async (formData: RetrospectiveData): Promise<string> => {
  const template = createPDFTemplate(formData);
  document.body.appendChild(template);
  
  try {
    const canvas = await html2canvas(template.querySelector('#pdf-template')!, {
      scale: 2,
      useCORS: true,
      logging: false
    });
    
    return canvas.toDataURL('image/png');
  } finally {
    document.body.removeChild(template);
  }
};

export const downloadPDF = async (formData: RetrospectiveData, providedFileName?: string) => {
  const template = createPDFTemplate(formData);
  document.body.appendChild(template);
  
  try {
    const canvas = await html2canvas(template.querySelector('#pdf-template')!, {
      scale: 3,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png', 0.9);
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [794, 1123]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123, '', 'FAST');
    
    const defaultName = getDefaultPdfFileName(formData);
    const rawName = providedFileName?.trim() || defaultName;
    const sanitizedName = rawName
      .replace(INVALID_FILENAME_CHARS, '-')
      .replace(/\s+/g, '-');
    const finalName = sanitizedName.toLowerCase().endsWith('.pdf')
      ? sanitizedName
      : `${sanitizedName}.pdf`;

    pdf.save(finalName);
  } finally {
    document.body.removeChild(template);
  }
};