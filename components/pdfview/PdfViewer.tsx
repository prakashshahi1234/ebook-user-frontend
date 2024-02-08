"use client"
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { PDFViewer } from "@react-pdf/renderer";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { cn } from "@/utils/cn";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "../ui/input";

function MyApp() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(10);
  const [scale, setScale] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      Math.min(prevPageNumber + 1, numPages || 1)
    );
  }

  const handleScaleChange = (newScale: number) => {
    setScale(Math.min(Math.max(newScale, 0.5), 3));
  };

  const handlePageNumberChange = (newPageNumber: number) => {
    setPageNumber(Math.min(Math.max(newPageNumber, 1), numPages));
  };


  return (
    <div className="border rounded border-gray-500 py-3 m-2 fixed top-0 bg-gray-200 w-[98%] h-screen overflow-auto">
      <div className="flex flex-row items-center justify-center cursor-pointer h-10 sticky -top-3 z-50 w-full border border-red-300 mb-3 bg-white">
        <MinusIcon
          onClick={() => {
            handleScaleChange(scale - 0.3);
          }}
        />
        <div className="text-sm">
          page{" "}
          <input
            onChange={(e) => {
              handlePageNumberChange(parseInt(e.target.value));
            }}
            max={numPages}
            className="border border-gray-400 p-2 m-0 w-10"
            defaultValue={pageNumber}
          />{" "}
          of {numPages}
        </div>
        <PlusIcon
          onClick={() => {
            handleScaleChange(scale + 0.3);
          }}
        />
      </div>
      <Document
        file="https://ebook-nepal-1.s3.ap-south-1.amazonaws.com/all-books/7feff91a-8ddf-44d3-8e1c-1c995548c848/1706453120664/pdf-1706453120664.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYWIBY2JWWBXUAQND%2F20240128%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240128T144642Z&X-Amz-Expires=3600&X-Amz-Signature=e427ef626a59f5f91f3a9ccb20351c8aff5219f4c9a94f760efbc780b70d7ac4&X-Amz-SignedHeaders=host&x-id=GetObject"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            scale={scale}
            className={cn(
              "m-auto mb-2 w-fit shadow-sm p-4 bg-white rounded-md",
              "border border-gray-400 bg-red-300 rounded"
            )}
            pageNumber={index + 1}
          />
        ))}
      </Document>
     
    </div>
  );
}

export default MyApp;
