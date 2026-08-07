"use client";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={_back}
      className="btn btn-primary btn-outline"
    >
      回上一頁
    </button>
  );
}

function _back() {
  window.history.back();
}
