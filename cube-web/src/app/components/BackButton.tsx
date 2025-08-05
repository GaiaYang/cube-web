"use client";

import React from "react";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="btn btn-primary btn-outline"
    >
      回上一頁
    </button>
  );
}
