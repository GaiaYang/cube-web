/** 取得`dialog`元素 */
export function getDialogElement(id: string) {
  return document?.getElementById(id) as HTMLDialogElement | null;
}

/** 顯示`dialog` */
export function openDialog(id: string) {
  getDialogElement(id)?.showModal();
}

/** 顯示`dialog` */
export function handleOpenDialog(id: string) {
  return () => {
    openDialog(id);
  };
}

/** 隱藏`dialog` */
export function closeDialog(id: string) {
  getDialogElement(id)?.close();
}

/** 隱藏`dialog` */
export function handleCloseDialog(id: string) {
  return () => {
    closeDialog(id);
  };
}
