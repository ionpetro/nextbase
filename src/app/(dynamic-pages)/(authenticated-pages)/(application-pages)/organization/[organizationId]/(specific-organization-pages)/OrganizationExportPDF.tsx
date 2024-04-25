"use client"
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { Upload } from 'lucide-react';


export const OrganizationExportPDF = () => {

  const exportPDF = () => {
    const input = document.getElementById("export-container");
    if (input) {
      html2canvas(input, { scale: 2 }) // Use the ref here
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "portrait",
          });
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("download.pdf");
        });
    }
  };
  return (
    <Button variant={"outline"} onClick={exportPDF} className="mb-4 flex gap-4 items-center">
      <Upload className='size-4' />
      Export PDF
    </Button>
  )
}
