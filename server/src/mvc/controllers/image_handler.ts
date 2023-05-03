import { Request, Response } from "express";
import path from "path";

export default async function handleImage(file: any) {
  const oldPath = file.path;
  console.log('Image saved here:', oldPath);
  return oldPath;
}

export async function serveImage(request: Request, response: Response) {
  const currentPath = __dirname;
  const filename = request.params.filename;
  console.log(path.join(currentPath, `..\\..\\..\\uploads\\${filename}`));
  const image = path.join(currentPath, `..\\..\\..\\uploads\\${filename}`);
  response.sendFile(image);
}