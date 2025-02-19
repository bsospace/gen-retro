import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
.use(initReactI18next)
.init({
    resources: {
        en: {
            translation: {
            title: 'SCRUM Retrospective',
            generatePreview: 'Generate Preview',
            downloadPDF: 'Download PDF',
            teamName: 'Team Name',
            name: 'Name',
            date: 'Date',
            cycleNumber: 'Cycle Number',
            wentWell: 'What went well?',
            couldImprove: 'What could be improved?',
            surprised: 'What surprised you?',
            lessonsLearned: 'Lessons learned',
            other: 'Other',
            pdfPreviewTitle: "PDF Preview",
            pdfPreviewMessage: "Generate a preview to see your PDF here",
            pdfPreviewAlt: "PDF Preview Image",
            wentWellPlaceholder: "Enter what went well during the sprint",
            couldImprovePlaceholder: "Enter what could be improved",
            surprisedPlaceholder: "Enter what surprised the team",
            lessonsLearnedPlaceholder: "Enter lessons learned",
            otherPlaceholder: "Enter any other comments",
            teamNamePlaceholder: "Enter team name",
            namePlaceholder: "Enter your name",
            cycleNumberPlaceholder: "Enter cycle number",
            sprintNumber: "Sprint Number",
            sprintNumberPlaceholder: "Enter sprint number",
            disclaimerNote: "*Some features may not work as expected on Mobile.",
            }
        },
        th: {
            translation: {
            title: 'SCRUM Retrospective',
            generatePreview: 'แสดงตัวอย่าง',
            downloadPDF: 'ดาวน์โหลด PDF',
            teamName: 'ชื่อทีม',
            name: 'ชื่อ',
            date: 'วันที่เขียน',
            cycleNumber: 'วงรอบที่',
            wentWell: 'สิ่งที่ทำได้ดี',
            couldImprove: 'สิ่งที่คิดว่าทำได้ดีกว่านี้',
            surprised: 'สิ่งที่ทำให้ประหลาดใจ',
            lessonsLearned: 'บทเรียนที่ได้รับ',
            other: 'เรื่องอื่นๆ',
            pdfPreviewTitle: "ตัวอย่าง PDF",
            pdfPreviewMessage: "แสดงตัวอย่างเอกสารที่นี่",
            pdfPreviewAlt: "ภาพตัวอย่าง PDF",
            wentWellPlaceholder: "สิ่งที่ทำได้ดีระหว่างสปรินต์",
            couldImprovePlaceholder: "สิ่งที่คิดส่าควรพัฒนาให้ดีขึ้น",
            surprisedPlaceholder: "สิ่งที่ทำให้ทีมประหลาดใจ",
            lessonsLearnedPlaceholder: "บทเรียนที่ได้เรียนรู้",
            otherPlaceholder: "ความคิดเห็นเพิ่มเติม",
            teamNamePlaceholder: "กรอกชื่อทีม",
            namePlaceholder: "กรอกชื่อของคุณ",
            cycleNumberPlaceholder: "กรอกวงรอบ",
            sprintNumber: "สปรินต์ที่",
            sprintNumberPlaceholder: "กรอกเลขสปรินต์",
            disclaimerNote: "*บางฟีเจอร์อาจทำงานไม่สมบูรณ์บนมือถือ",
            }
        }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // If a language is missing, fall back to English
    interpolation: {
      escapeValue: false // React already protects against XSS
    }
});

export default i18n;
