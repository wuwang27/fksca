"use strict";
/*import * as vscode from 'vscode';

export class ResultsPanel {
  public static currentPanel: ResultsPanel | undefined;

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private readonly _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // 监听面板被关闭事件
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = this._getHtmlForWebview();
  }

  public static createOrShow(extensionUri: vscode.Uri, results: any[]) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    if (ResultsPanel.currentPanel) {
      ResultsPanel.currentPanel._panel.reveal(column);
      ResultsPanel.currentPanel._update(results);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'resultsPanel',
      'Vulnerability Scan Results',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    ResultsPanel.currentPanel = new ResultsPanel(panel, extensionUri);
    ResultsPanel.currentPanel._update(results);
  }

  private _getHtmlForWebview() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vulnerability Scan Results</title>
      </head>
      <body>
        <h1>Vulnerability Scan Results</h1>
        <div id="results"></div>
        <script>
          const vscode = acquireVsCodeApi();
          window.addEventListener('message', event => {
            const results = event.data.results;
            document.getElementById('results').innerHTML = results.map(result =>
              \`<p><strong>Dependency:</strong> \${result.dependencyName || 'N/A'} \${result.version || 'N/A'}<br/>
              <strong>Vulnerability ID:</strong> <a href="\${result.url}" target="_blank">\${result.id}</a><br/>
              <strong>Severity:</strong> \${result.severity}</p>\`).join('');
          });
        </script>
      </body>
      </html>`;
  }

  private _update(results: any[]) {
    this._panel.webview.postMessage({ results });
  }

  public dispose() {
    ResultsPanel.currentPanel = undefined;

    // 释放资源
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }

    this._panel.dispose();
  }
}*/
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
exports.ResultsPanel = void 0;
const vscode = __importStar(require("vscode"));
class ResultsPanel {
    _panel;
    _extensionUri;
    _disposables = [];
    constructor(panel, extensionUri, results) {
        this._panel = panel;
        this._extensionUri = extensionUri;
        // 设置面板内容
        this._update(results);
        // 监听面板被关闭事件
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }
    static createOrShow(extensionUri, results) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        // 创建新的面板
        const panel = vscode.window.createWebviewPanel('resultsPanel', 'Vulnerability Scan Results', column || vscode.ViewColumn.One, {
            enableScripts: true,
        });
        // 创建并显示新的结果面板
        new ResultsPanel(panel, extensionUri, results);
    }
    _update(results) {
        this._panel.webview.html = this._getHtmlForWebview(results);
    }
    _getHtmlForWebview(results) {
        const vulnerabilityList = results.map((result) => `
      <p>
        <strong>Dependency:</strong> ${result.dependencyName || 'N/A'} ${result.version || 'N/A'}<br/>
        <strong>Vulnerability ID:</strong> <a href="${result.url}" target="_blank">${result.id}</a><br/>
        <strong>Severity:</strong> ${result.severity}<br/>
        <strong>File Path:</strong> ${result.filePath}
      </p>
    `).join('');
        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vulnerability Scan Results</title>
      </head>
      <body>
        <h1>Vulnerability Scan Results</h1>
        <div>${vulnerabilityList}</div>
      </body>
      </html>`;
    }
    dispose() {
        // 释放资源
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
        this._panel.dispose();
    }
}
exports.ResultsPanel = ResultsPanel;
//# sourceMappingURL=resultsPanel.js.map