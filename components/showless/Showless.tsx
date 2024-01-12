"use client"
import React, { useState, useRef, useEffect } from 'react';
import {cn} from '@/utils/cn'; // Adjust the import path based on your project structure

interface HTMLViewerProps {
  htmlContent: string;
}

const HTMLViewer: React.FC<HTMLViewerProps> = ({ htmlContent }) => {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the content height exceeds 300px
    if (contentRef.current) {
      const contentHeight = contentRef.current.clientHeight;
      setShowMore(contentHeight > 300);
    }
  }, [htmlContent]);

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <div className="relative">
      <div
        className={`transition-all duration-300 ${
          showMore ? 'h-[300px]' : 'max-h-[300px]'
        } overflow-hidden`}
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {showMore && (
        <button
          className="absolute bottom-0 right-0 px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800"
          onClick={toggleShowMore}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default HTMLViewer;
