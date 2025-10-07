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
            saveJournal: "Save Journal",
            loginRequired: "Login Required",
            loginPromptMessage: "You need to login to save your journal. Your current data will be preserved.",
            loginButton: "Login",
            cancelButton: "Cancel",
            dataSaved: "Your data is saved locally and will be available when you login.",
            filenameDialogTitle: "Choose file name",
            filenameDialogDescription: "Update the PDF name before downloading. We'll make sure it ends with .pdf.",
            filenameLabel: "File name",
            confirmDownloadButton: "Download",
            downloadingLabel: "Downloading...",
            downloadErrorTitle: "Download failed",
            downloadErrorMessage: "We couldn't download your PDF. Please try again.",
            postDownloadDialogTitle: "Save your journal?",
            postDownloadDialogDescription: "Log in to save this journal to your account. We'll keep your current data ready.",
            continueWithoutLogin: "Continue without login",
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
            saveJournal: "บันทึก Journal",
            loginRequired: "ต้องเข้าสู่ระบบ",
            loginPromptMessage: "คุณต้องเข้าสู่ระบบเพื่อบันทึก journal ข้อมูลที่คุณกรอกจะถูกเก็บไว้",
            loginButton: "เข้าสู่ระบบ",
            cancelButton: "ยกเลิก",
            dataSaved: "ข้อมูลของคุณถูกบันทึกไว้ในเครื่องและจะพร้อมใช้งานเมื่อคุณเข้าสู่ระบบ",
            filenameDialogTitle: "เลือกชื่อไฟล์",
            filenameDialogDescription: "แก้ไขชื่อไฟล์ PDF ก่อนดาวน์โหลด ระบบจะบันทึกเป็น .pdf ให้อัตโนมัติ",
            filenameLabel: "ชื่อไฟล์",
            confirmDownloadButton: "ดาวน์โหลด",
            downloadingLabel: "กำลังดาวน์โหลด...",
            downloadErrorTitle: "ดาวน์โหลดไม่สำเร็จ",
            downloadErrorMessage: "ไม่สามารถดาวน์โหลดไฟล์ PDF ได้ กรุณาลองใหม่อีกครั้ง",
            postDownloadDialogTitle: "ต้องการบันทึก Journal ไหม?",
            postDownloadDialogDescription: "เข้าสู่ระบบเพื่อบันทึก journal นี้ไว้ในบัญชีของคุณ ระบบจะเก็บข้อมูลที่กรอกไว้ให้พร้อม",
            continueWithoutLogin: "ดำเนินการต่อโดยไม่เข้าสู่ระบบ",
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
