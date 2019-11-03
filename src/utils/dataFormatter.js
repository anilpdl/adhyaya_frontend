export const formatDate = (date) => {
  const newDate = new Date(date);

  return newDate.toLocaleString();
}

export default function encodeImageFileAsURL(element) {
  const { files } = element;
  files.forEach((f) => {
    const file = f;
    const reader = new FileReader();
    reader.onloadend = () => {
      file.path = reader.result;
    };
    reader.readAsDataURL(file);
  });
}