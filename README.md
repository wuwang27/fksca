# vscode-osv-scanner


纯工作需求下的产物 sca扫描的vscode插件

只能检测Maven 构建的 Java 项目。 提取pom的依赖信息，再调的OSV-Scanner接口进行查询，不用担心代码有泄露的风险。 

- OSV-Scanner的漏洞库是我对比各家开源sca后觉得最全面准确的。 
- 直接依赖间接依赖都获取了，包括 groupId、artifactId 和 version。

### 一、安装

- 打开 Visual Studio Code。
- 进入扩展视图（可以通过点击左侧活动栏中的扩展图标或使用快捷键 Ctrl+Shift+X）。
- 点击右上角的 ... 菜单，然后选择 Install from VSIX...。
- 选择下载的 .vsix 文件并安装。

### 二、使用方法

#### 1.右键扫描项目

- 在 VSCode 的文件资源管理器中，右键点击一个项目文件夹或 pom.xml 文件。
- 选择 Scan for Vulnerabilities。

- 插件将扫描项目中的所有 pom.xml 文件，并展示漏洞扫描结果。


#### 2.查看扫描结果

扫描完成后，插件会在新的面板中展示漏洞扫描结果。
每个依赖项的漏洞信息包括：

- 依赖名称
- 依赖版本
- 文件路径
- 漏洞 ID
- 危害等级
- 漏洞详情 URL	
