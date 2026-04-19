"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description = "削除したデータは元に戻せません。",
  cancelText = "戻る",
  confirmText = "削除する",
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        showCloseButton={false}
        className="max-w-[340px] sm:max-w-[400px] rounded-3xl p-6 md:p-8 gap-6 border-none shadow-2xl"
      >
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-red-500" />
          </div>
          <div className="space-y-2 text-center">
            <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3 sm:gap-4 sm:justify-center">
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="flex-1 h-12 rounded-xl font-bold text-base bg-red-600 hover:bg-red-700 active:scale-95 transition-all"
          >
            {confirmText}
          </Button>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-12 rounded-xl font-bold text-base bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition-all"
          >
            {cancelText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
