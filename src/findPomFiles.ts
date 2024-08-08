import * as fs from 'fs';
import * as path from 'path';

export function findPomFiles(dir: string, pomFiles: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.lstatSync(fullPath);

    if (stat.isDirectory()) {
      findPomFiles(fullPath, pomFiles);
    } else if (stat.isFile() && file === 'pom.xml') {
      pomFiles.push(fullPath);
    }
  });

  return pomFiles;
}
