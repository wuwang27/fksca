import * as fs from 'fs';
import * as xml2js from 'xml2js';

interface Dependency {
  groupId: string;
  artifactId: string;
  version: string;
}

export async function parsePomFile(filePath: string): Promise<Dependency[]> {
  const pomData = fs.readFileSync(filePath, 'utf-8');
  const parser = new xml2js.Parser({ explicitArray: true, tagNameProcessors: [xml2js.processors.stripPrefix] });

  try {
    const result = await parser.parseStringPromise(pomData);
    console.log('Parsed POM:', result); // 调试信息，查看解析后的对象结构

    const properties = result.project.properties ? result.project.properties[0] : {};
    const dependencies: Dependency[] = [];

    // 解析 dependencyManagement 中的依赖项
    if (result.project.dependencyManagement && result.project.dependencyManagement[0].dependencies) {
      const deps = result.project.dependencyManagement[0].dependencies[0].dependency;

      for (const dep of deps) {
        const version = dep.version ? dep.version[0] : 'N/A';
        const resolvedVersion = resolveVersion(version, properties);
        dependencies.push({
          groupId: dep.groupId ? dep.groupId[0] : 'N/A',
          artifactId: dep.artifactId ? dep.artifactId[0] : 'N/A',
          version: resolvedVersion,
        });
      }
    }

    // 解析直接依赖项
    if (result.project.dependencies && result.project.dependencies[0].dependency) {
      const deps = result.project.dependencies[0].dependency;

      for (const dep of deps) {
        const version = dep.version ? dep.version[0] : 'N/A';
        const resolvedVersion = resolveVersion(version, properties);
        dependencies.push({
          groupId: dep.groupId ? dep.groupId[0] : 'N/A',
          artifactId: dep.artifactId ? dep.artifactId[0] : 'N/A',
          version: resolvedVersion,
        });
      }
    }

    return dependencies;
  } catch (err) {
    console.error('Error parsing POM file:', err);
    throw err;
  }
}

function resolveVersion(version: string, properties: any): string {
  if (version.startsWith('${') && version.endsWith('}')) {
    const propName = version.slice(2, -1);
    return properties[propName] ? properties[propName][0] : 'N/A';
  }
  return version;
}
