import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "bracket-pair-toggler.run",
    () => {
      const workspaceConfiguration = vscode.workspace.getConfiguration(
        "editor.bracketPairColorization"
      );
      const isEnabled = workspaceConfiguration.get<boolean>("enabled");

      if (isEnabled === undefined) {
        const message = `Bracket Pair Colorization setting was not found`;

        return vscode.window.showErrorMessage(message);
      }

      workspaceConfiguration
        .update("enabled", !isEnabled, vscode.ConfigurationTarget.Global)
        .then(
          () => {
            const message = `Bracket Pair Colorization is ${
              !isEnabled ? "enabled" : "disabled"
            }`;

            vscode.window.showInformationMessage(message);
          },
          () => {
            const message = `Error toggling Bracket Pair Colorization`;

            vscode.window.showErrorMessage(message);
          }
        );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
