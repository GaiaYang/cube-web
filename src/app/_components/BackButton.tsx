"use client";

import { Button } from "@/components/daisy-ui/button";

export default function BackButton() {
  return (
    <Button type="button" onClick={_back} color="primary" variant="outline">
      回上一頁
    </Button>
  );
}

function _back() {
  window.history.back();
}
