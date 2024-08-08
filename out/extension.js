"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
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
const vscode = __importStar(require("vscode"));
const dependencyParser_1 = require("./dependencyParser");
const vulnerabilityScanner_1 = require("./vulnerabilityScanner");
const resultsPanel_1 = require("./resultsPanel");
const findPomFiles_1 = require("./findPomFiles");
function activate(context) {
    console.log('Congratulations, your extension "vscode-osv-scanner" is now active!');
    let disposable = vscode.commands.registerCommand('vscode-osv-scanner.scan', async (uri) => {
        console.log('Scan command triggered with URI:', uri);
        if (!uri) {
            vscode.window.showErrorMessage('No project selected for scanning.');
            return;
        }
        const rootPath = uri.fsPath;
        console.log('Root path for scanning:', rootPath);
        const fs = require('fs');
        let pomFiles = [];
        if (fs.lstatSync(rootPath).isDirectory()) {
            pomFiles = (0, findPomFiles_1.findPomFiles)(rootPath);
        }
        else if (rootPath.endsWith('pom.xml')) {
            pomFiles = [rootPath];
        }
        else {
            vscode.window.showErrorMessage('Selected file is not a pom.xml file.');
            return;
        }
        console.log('Found pom.xml files:', pomFiles);
        if (pomFiles.length === 0) {
            vscode.window.showErrorMessage('No pom.xml files found in the selected project.');
            return;
        }
        let allDependencies = [];
        const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        statusBar.text = 'OSV Scanner: Scanning...';
        statusBar.show();
        try {
            for (const pomPath of pomFiles) {
                const dependencies = await (0, dependencyParser_1.parsePomFile)(pomPath);
                allDependencies = allDependencies.concat(dependencies.map(dep => ({ ...dep, filePath: pomPath })));
            }
            const totalDependencies = allDependencies.length;
            let processedDependencies = 0;
            const updateStatusBar = () => {
                statusBar.text = `OSV Scanner: Scanning... (${processedDependencies}/${totalDependencies})`;
            };
            const vulnerabilities = [];
            for (const dep of allDependencies) {
                const depVulnerabilities = await (0, vulnerabilityScanner_1.checkVulnerabilities)([dep]);
                vulnerabilities.push(...depVulnerabilities.map(vul => ({
                    ...vul,
                    filePath: dep.filePath
                })));
                processedDependencies++;
                updateStatusBar();
            }
            resultsPanel_1.ResultsPanel.createOrShow(context.extensionUri, vulnerabilities);
        }
        catch (error) {
            vscode.window.showErrorMessage('Error during scan: ' + error.message);
        }
        finally {
            statusBar.hide();
            statusBar.dispose();
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map