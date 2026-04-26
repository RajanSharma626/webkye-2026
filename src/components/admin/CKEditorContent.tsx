"use client";

import React, { useEffect, useState } from "react";

export default function CKEditorContent({ value, onChange, placeholder }: any) {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    // We import the pre-built classic editor which is a single file
    // and the react component. This avoids the duplicated modules error
    // caused by mixing ESM modules in Next.js/Turbopack.
    Promise.all([
      import("@ckeditor/ckeditor5-react"),
      import("@ckeditor/ckeditor5-build-classic")
    ]).then(([ckReact, ck5]) => {
      setComponent({
        CKEditor: ckReact.CKEditor,
        ClassicEditor: ck5.default || ck5
      });
    });
  }, []);

  if (!Component) {
    return <div className="h-40 bg-secondary/20 animate-pulse rounded-xl" />;
  }

  const { CKEditor, ClassicEditor } = Component;

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        placeholder: placeholder || "Start writing...",
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "outdent",
          "indent",
          "|",
          "blockQuote",
          "insertTable",
          "undo",
          "redo",
        ],
      }}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
