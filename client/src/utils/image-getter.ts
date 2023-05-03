export default async function getImage (filename: string) {
  if (filename) {
    filename = filename.split('\\')[1];
    console.log(filename);
    const image = await fetch(
      `http://localhost:8080/images/${filename}`
    );
    const blob = await image.blob();
    console.log(blob);
    console.log(URL.createObjectURL(blob));
    return URL.createObjectURL(blob);
  }
}