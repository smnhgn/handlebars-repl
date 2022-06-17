import { useEffect, useState } from "react";

const sampleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Hello world!</h1>
</body>
</html>`;

type PreviewProps = {
  html?: string;
};

export const Preview = ({ html = sampleHtml }: PreviewProps) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const createPdf = async (html: string) => {
    try {
      const formData = new FormData();
      const indexBlob = new Blob([html], { type: "text/html" });

      formData.append("files", indexBlob, "index.html");

      const pdfApi = `/gotenberg/forms/chromium/convert/html`;
      const pdfBlob = await (await fetch(pdfApi, { method: "POST", body: formData })).blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);

      console.log({ indexBlob, pdfBlob, formData });

      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    createPdf(html);
  }, [html]);

  return <iframe className="preview" src={pdfUrl} />;
};
