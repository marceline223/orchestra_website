export interface ConfirmDialogExpose {
  open: ( msg: string, onConfirmHandler?: () => void | Promise<void>, onCancelHandler?: () => void | Promise<void>) => void;
}
