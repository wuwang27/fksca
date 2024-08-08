/*import * as vscode from 'vscode';
import { parsePomFile } from './dependencyParser';
import { checkVulnerabilities, Dependency } from './vulnerabilityScanner';
import { ResultsPanel } from './resultsPanel';
import { findPomFiles } from './findPomFiles';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-osv-scanner" is now active!');

  let disposable = vscode.commands.registerCommand('vscode-osv-scanner.scan', async (uri: vscode.Uri) => {
    console.log('Scan command triggered with URI:', uri);


    if (!uri) {
      vscode.window.showErrorMessage('No project selected for scanning.');
      return;
    }

    const rootPath = uri.fsPath;
    console.log('Root path for scanning:', rootPath);

    const fs = require('fs');
    let pomFiles: string[] = [];

    if (fs.lstatSync(rootPath).isDirectory()) {
      pomFiles = findPomFiles(rootPath);
    } else if (rootPath.endsWith('pom.xml')) {
      pomFiles = [rootPath];
    } else {
      vscode.window.showErrorMessage('Selected file is not a pom.xml file.');
      return;
    }

    console.log('Found pom.xml files:', pomFiles);

    if (pomFiles.length === 0) {
      vscode.window.showErrorMessage('No pom.xml files found in the selected project.');
      return;
    }

    let allDependencies: Dependency[] = [];
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBar.text = 'OSV Scanner: Scanning...';
    statusBar.show();

    try {
      for (const pomPath of pomFiles) {
        const dependencies = await parsePomFile(pomPath);
        allDependencies = allDependencies.concat(dependencies);
      }

      const totalDependencies = allDependencies.length;
      let processedDependencies = 0;

      const updateStatusBar = () => {
        statusBar.text = `OSV Scanner: Scanning... (${processedDependencies}/${totalDependencies})`;
      };

      const vulnerabilities = [];

      for (const dep of allDependencies) {
        const depVulnerabilities = await checkVulnerabilities([dep]);
        vulnerabilities.push(...depVulnerabilities);
        processedDependencies++;
        updateStatusBar();
      }

      ResultsPanel.createOrShow(context.extensionUri, vulnerabilities);
    } catch (error) {
      vscode.window.showErrorMessage('Error during scan: ' + (error as Error).message);
    } finally {
      statusBar.hide();
      statusBar.dispose();
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}*/
import * as vscode from 'vscode';
import { parsePomFile } from './dependencyParser';
import { checkVulnerabilities, Dependency } from './vulnerabilityScanner';
import { ResultsPanel } from './resultsPanel';
import { findPomFiles } from './findPomFiles';

interface ExtendedDependency extends Dependency {
  filePath: string;
}

interface ExtendedVulnerability {
  id: string;
  severity: string;
  dependencyName: string;
  version: string;
  url: string;
  filePath: string; // 新增字段
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-osv-scanner" is now active!');

  let disposable = vscode.commands.registerCommand('vscode-osv-scanner.scan', async (uri: vscode.Uri) => {
    console.log('Scan command triggered with URI:', uri);

    if (!uri) {
      vscode.window.showErrorMessage('No project selected for scanning.');
      return;
    }

    const rootPath = uri.fsPath;
    console.log('Root path for scanning:', rootPath);

    const fs = require('fs');
    let pomFiles: string[] = [];

    if (fs.lstatSync(rootPath).isDirectory()) {
      pomFiles = findPomFiles(rootPath);
    } else if (rootPath.endsWith('pom.xml')) {
      pomFiles = [rootPath];
    } else {
      vscode.window.showErrorMessage('Selected file is not a pom.xml file.');
      return;
    }

    console.log('Found pom.xml files:', pomFiles);

    if (pomFiles.length === 0) {
      vscode.window.showErrorMessage('No pom.xml files found in the selected project.');
      return;
    }

    let allDependencies: ExtendedDependency[] = [];
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBar.text = 'OSV Scanner: Scanning...';
    statusBar.show();

    try {
      for (const pomPath of pomFiles) {
        const dependencies = await parsePomFile(pomPath);
        allDependencies = allDependencies.concat(dependencies.map(dep => ({ ...dep, filePath: pomPath })));
      }

      const totalDependencies = allDependencies.length;
      let processedDependencies = 0;

      const updateStatusBar = () => {
        statusBar.text = `OSV Scanner: Scanning... (${processedDependencies}/${totalDependencies})`;
      };

      const vulnerabilities: ExtendedVulnerability[] = [];

      for (const dep of allDependencies) {
        const depVulnerabilities = await checkVulnerabilities([dep]);
        vulnerabilities.push(...depVulnerabilities.map(vul => ({
          ...vul,
          filePath: dep.filePath
        })));
        processedDependencies++;
        updateStatusBar();
      }

      ResultsPanel.createOrShow(context.extensionUri, vulnerabilities);
    } catch (error) {
      vscode.window.showErrorMessage('Error during scan: ' + (error as Error).message);
    } finally {
      statusBar.hide();
      statusBar.dispose();
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}


