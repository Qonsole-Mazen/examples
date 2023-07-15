const uploadBox = document.querySelector(".upload-box"),
  previewImg = uploadBox.querySelector("img"),
  widthInput = document.querySelector(".sizes .width input"),
  heightInput = document.querySelector(".sizes .height input"),
  rationInput = document.querySelector(".checkboxes .ratio input"),
  qualityInput = document.querySelector(".checkboxes .quality input"),
  downloadBtn = document.querySelector(".content .download-btn"),
  fileInput = uploadBox.querySelector("input[type='file']");

heightInput.value = "";
widthInput.value = "";
let ogImageRation;
const loadFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  document.querySelector(".wrapper").classList.add("active");
  previewImg.classList.add("uploaded");
  previewImg.addEventListener("load", () => {
    uploadBox.classList.add("active");
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    ogImageRation = previewImg.naturalWidth / previewImg.naturalHeight;
  });
  previewImg.src = URL.createObjectURL(file);
};

const changeWdith = () => {
  const width = rationInput.checked
    ? heightInput.value * ogImageRation
    : widthInput.value;
  widthInput.value = Math.floor(width);
};
const changeHeight = () => {
  const height = rationInput.checked
    ? widthInput.value / ogImageRation
    : heightInput.value;
  heightInput.value = Math.floor(height);
};

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");
  const imgQuality = qualityInput.checked ? 0.7 : 1;
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click();
};

widthInput.addEventListener("keyup", changeHeight);
widthInput.addEventListener("change ", changeHeight);

heightInput.addEventListener("keyup", changeWdith);
heightInput.addEventListener("change", changeWdith);

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
