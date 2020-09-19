// NOT USED
export default function downloadFile(title: string, url: string) {
  return fetch(url, { mode: "no-cors" }).then((response) =>
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = title;
      a.click();
    })
  );
}
