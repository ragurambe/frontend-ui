const toTitleCase = (title) => {
  return (
    (title &&
      title
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")) ||
    ""
  );
};

const dateFormat = (date) => {
  var dateObj = new Date(date);
  return (
    (dateObj.getMonth() > 8
      ? dateObj.getMonth() + 1
      : "0" + (dateObj.getMonth() + 1)) +
    "/" +
    (dateObj.getDate() > 9 ? dateObj.getDate() : "0" + dateObj.getDate()) +
    "/" +
    dateObj.getFullYear()
  );
};

function fileToByteArray(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      const fileByteArray = [];
      reader.readAsDataURL(file);
      reader.onloadend = (evt) => {
        if (evt.target.readyState == FileReader.DONE) {
          let arrayBuffer = evt.target.result,
            array = new Uint8Array(arrayBuffer);
          for (const byte of array) {
            fileByteArray.push(byte);
          }
        }
        resolve(reader.result);
      };
    } catch (e) {
      reject(e);
    }
  });
}

function downloadByteArrayAsFile(props) {
  console.log(props);
  const { byteArray, contentType, name } = props;
  if (window.navigator && window.navigator.msSaveBlob) {
    // const blob = Base64toBlob(byteArray, contentType);
    const blob = base64ToFile(byteArray, name);
    window.navigator.msSaveBlob(blob, name);
  } else {
    const linkSource = byteArray;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = name;
    downloadLink.click();
  }
}

function Base64toBlob(b64Data, contentType) {
  const sliceSize = 512;
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

function base64ToFile(base64, fileName = "users-import-template") {
  const byte = base64ToArrayBuffer(base64);
  return new File([byte], fileName, { type: "application/xlsx" });
}

function toBase64(file, cb) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

async function fileToBase64(file, cb) {
  return await toBase64(file, cb);
}

module.exports = {
  fileToByteArray,
  downloadByteArrayAsFile,
  dateFormat,
  toTitleCase,
  fileToBase64,
};
