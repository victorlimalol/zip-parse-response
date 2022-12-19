const Axios = require("axios");
const Path = require("path");
const Fs = require("fs");

const decompress = require("decompress");

async function download() {
  const url = "YOUR_URL";
  const path = Path.resolve(__dirname, "files", "gabriel.zip");

  const response = await Axios({
    method: "POST",
    url: url,
    responseType: "stream",
    data: {
      // fileIds: [
      //   "61f042ea26559810a0dddfcb",
      //   "6142117f26559815ec681990",
      //   "618a82062655980b4c58f755",
      // ],
    },
  });

  response.data.pipe(Fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      unzip();
      resolve();
    });

    response.data.on("error", () => {
      reject();
    });
  });
}

async function unzip() {
  decompress("./files/gabriel.zip", "unzip")
    .then((files) => {
      console.log(files);
    })
    .catch((error) => {
      console.log(error);
    });
}

download();
//unzip();
//findArquivos();
