import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const command = 'extension.transformToTranslationKey';

  const commandHandler = () => {
    const { activeTextEditor } = vscode.window;
    if (activeTextEditor) {
      const { document } = activeTextEditor;

      let edit = new vscode.WorkspaceEdit();
      for (const selection of activeTextEditor.selections) {
        let name = activeTextEditor.document.getText(selection);
        let title = '';
        title = name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '_').toUpperCase();
        edit.replace(document.uri, selection, title);
      }
      vscode.workspace.applyEdit(edit);
      return
    }
  };

  context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}
