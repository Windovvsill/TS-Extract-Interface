'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";

const objectTest = (o?: any) => {
    try {
        JSON.parse(o);
        return true;
    } catch (error) {
        return false;
    }
};

const previousJsonOpener = (range: vscode.Selection) => {
    const backRange = range.with(range.start.with(range.start.line, range.start.character - 1));
    const obj = vscode.window.activeTextEditor?.document.getText(backRange);
    if (objectTest(obj)) {
        return obj;
    }
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.extractInterface', () => {

        const currentRange = vscode.window.activeTextEditor?.selection;

        let selection = vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor.selection);

        // if (!objectTest(selection)) {
        //     selection = previousJsonOpener(currentRange!);
        // }


        // vscode.window.showInformationMessage(selection);

        const panel = vscode.window.createWebviewPanel(
            'catCoding', // Identifies the type of the webview. Used internally
            'Cat Coding', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in.
            {
                // localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'out'))]
                enableScripts: true,
            },
        );


        panel.webview.onDidReceiveMessage(e => {
            switch (e.type) {
                case 'apitest':
                    vscode.window.showInformationMessage(e.selection);
                    return;
            }
        });

        // And set its HTML content
        panel.webview.html = getWebviewContent(panel, context, selection);
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(panel: vscode.WebviewPanel, context: vscode.ExtensionContext, selection?: string): string {

    const scriptUri = panel.webview.asWebviewUri(vscode.Uri.file(
        path.join(context.extensionPath, 'out', 'compiled/bundle.js')
    )).toString();

    // const scriptUri = vscode.Uri.file(
    //     path.join(context.extensionPath, 'out', 'compiled/bundle.js')
    // ).toString();

    // const scriptUri = "vscode-webview-resource://dccfd03c-2862-4597-af38-385b00e2d1f6/Users/steve/vscodeextensions/extract-interface/out/compiled/bundle.js";

    const styleUri = panel.webview.asWebviewUri(vscode.Uri.file(
        path.join(context.extensionPath, 'out', 'compiled/bundle.css')
    )).toString();

    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${panel.webview.cspSource}; style-src ${panel.webview.cspSource}; script-src 'nonce-${nonce}';">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleUri}" rel="stylesheet" />
    <title>Cat Scratch</title>
</head>
<body>
    <!-- Added in this script tag -->
    <script nonce="${nonce}">
        const vscode = acquireVsCodeApi();
        const selection = \`${selection}\`;
    </script>

    <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {
}

const getNonce = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(Array(32)).map(() => possible.charAt(Math.floor(Math.random() * possible.length))).join("");
};
