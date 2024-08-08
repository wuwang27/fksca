# vscode-osv-scanner

## Description

An extension to scan for vulnerabilities in Maven projects using OSV-Scanner.

## Installation

1. Download the latest `.vsix` file from the releases.
2. Open Visual Studio Code.
3. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
4. Click on the `...` (More Actions) button on the top right of the Extensions view and select `Install from VSIX...`.
5. Select the downloaded `.vsix` file and install.

## Usage

1. Right-click on a project folder or a `pom.xml` file in the Explorer view.
2. Select `Scan for Vulnerabilities`.
3. The extension will scan all the `pom.xml` files in the project and display the vulnerabilities found in a new panel.

## Features

- Parses Maven `pom.xml` files to extract dependencies.
- Checks the extracted dependencies for known vulnerabilities using the OSV-Scanner API.
- Displays the results in a separate panel with details including dependency name, version, vulnerability ID, severity, and a link to more information.

## Contributing

If you have any suggestions or find any issues, please open an issue or a pull request in the GitHub repository.

## License

MIT
"# fksca" 
