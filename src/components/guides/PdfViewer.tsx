import React from "react";
import { pdfjs, Document } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  file: string;
};

/**
 * @example
  <Suspense fallback={<div>Loading...</div>}>
    <PdfViewer file={fileUrl} />
  </Suspense>
 * 
 */
const PdfViewer: React.FC<Props> = ({ file }) => {
  return <Document file={file} />;
};

export default PdfViewer;
