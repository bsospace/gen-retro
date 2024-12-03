import { RetrospectiveData } from '@/types/retrospective';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const createPDFTemplate = (formData: RetrospectiveData) => {
  const template = document.createElement('div');
  template.innerHTML = `
    <div id="pdf-template" style="width: 800px; padding: 40px; font-family: 'TH Sarabun New', Arial, sans-serif;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px;">Sprint Retrospective Report</h1>
        <div style="text-align: right;">
          ทีม: ${formData.teamName || '..........'}
          ชื่อ: ${formData.name || '..........'}
          วันที่: ${formData.date || '..........'}
          วงรอบที่: ${formData.cycleNumber || '..........'}
        </div>
      </div>
      
      <div style="border: 1px solid #000; padding: 0px 15px 0px 15px;">
        <div style="font-weight: bold; margin-bottom: 10px;">(สิ่งที่ดำเนินไปได้ดี) Things That Went Well</div>
        <div style="min-height: 200px;" class="whitespace-pre-wrap">${formData.wentWell || ''}</div>
      </div>
      
      <div style="display: flex;">
        <div style="flex: 1; border: 1px solid #000; padding: 0px 15px 0px 15px;">
          <div style="font-weight: bold; margin-bottom: 10px;">(สิ่งที่ควรจะทำให้ดีกว่านี้) Things That Could Have Gone Better</div>
          <div style="min-height: 200px;" class="whitespace-pre-wrap">${formData.couldImprove || ''}</div>
        </div>
        <div style="flex: 1; border: 1px solid #000; padding: 0px 15px 0px 15px;">
          <div style="font-weight: bold; margin-bottom: 10px;">(สิ่งที่ทำให้ประหลาดใจ) Things That Surprised Us</div>
          <div style="min-height: 200px;" class="whitespace-pre-wrap">${formData.surprised || ''}</div>
        </div>
      </div>
      
      <div style="display: flex;">
        <div style="flex: 1.5; border: 1px solid #000; padding: 0px 15px 0px 15px;">
          <div style="font-weight: bold; margin-bottom: 10px;">(บทเรียนที่ได้เรียนรู้) Lessons Learned</div>
          <div style="min-height: 200px;" class="whitespace-pre-wrap">${formData.lessonsLearned || ''}</div>
        </div>
        <div style="flex:0.5; border: 1px solid #000; padding: 0px 15px 0px 15px;">
          <div style="font-weight: bold; margin-bottom: 10px;">(เรื่องอื่นๆ) Other</div>
          <div style="min-height: 200px;" class="whitespace-pre-wrap">${formData.other || ''}</div>
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

export const downloadPDF = async (formData: RetrospectiveData) => {
  const template = createPDFTemplate(formData);
  document.body.appendChild(template);
  
  try {
    const canvas = await html2canvas(template.querySelector('#pdf-template')!, {
      scale: 2,
      useCORS: true,
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [800, 965]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, 800, 965);
    pdf.save(`retrospective_${formData.teamName}_${formData.date}_T${formData.teamName}.pdf`);
  } finally {
    document.body.removeChild(template);
  }
};