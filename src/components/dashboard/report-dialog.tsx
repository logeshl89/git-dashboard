
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";
import { type DialogProps } from "@radix-ui/react-dialog";

// Using ReactMarkdown and remark-gfm for rendering markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ReportDialogProps extends DialogProps {
  reportContent: string;
  isGenerating: boolean;
}

const MemoizedReactMarkdown = memo(ReactMarkdown);

export function ReportDialog({ reportContent, isGenerating, ...props }: ReportDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="max-w-3xl h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Generated Analytics Report</DialogTitle>
          <DialogDescription>
            An AI-generated analysis of your ESP32 hub's recent activity.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
            {isGenerating ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
                <MemoizedReactMarkdown remarkPlugins={[remarkGfm]}>
                    {reportContent}
                </MemoizedReactMarkdown>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
