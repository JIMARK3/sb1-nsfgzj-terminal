export class Terminal {
  constructor(outputElement, inputElement) {
    this.outputElement = outputElement;
    this.inputElement = inputElement;
    this.commandHistory = [];
    this.historyIndex = -1;
  }

  init() {
    this.inputElement.addEventListener('keydown', (e) => this.handleKeyPress(e));
    this.displayWelcomeMessage();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const command = this.inputElement.value.trim();
      this.executeCommand(command);
      this.inputElement.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.navigateHistory('down');
    }
  }

  executeCommand(command) {
    if (command) {
      this.commandHistory.push(command);
      this.historyIndex = this.commandHistory.length;
      
      this.appendOutput(`guest@linux:~$ ${command}`);
      
      if (command === 'clear') {
        this.clearTerminal();
        return;
      }

      // Simulate command output
      if (command === 'help') {
        this.appendOutput('Available commands:', 'success');
        this.appendOutput('  help     - Show this help message');
        this.appendOutput('  clear    - Clear the terminal');
        this.appendOutput('  date     - Show current date');
        this.appendOutput('  echo     - Echo the input');
      } else if (command.startsWith('echo ')) {
        this.appendOutput(command.slice(5));
      } else if (command === 'date') {
        this.appendOutput(new Date().toString());
      } else {
        this.appendOutput(`Command not found: ${command}`, 'error');
      }
    }
  }

  appendOutput(text, className = '') {
    const line = document.createElement('div');
    line.className = `output-line ${className}`;
    line.textContent = text;
    this.outputElement.appendChild(line);
    this.scrollToBottom();
  }

  clearTerminal() {
    this.outputElement.innerHTML = '';
  }

  scrollToBottom() {
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
  }

  navigateHistory(direction) {
    if (this.commandHistory.length === 0) return;

    if (direction === 'up') {
      if (this.historyIndex > 0) {
        this.historyIndex--;
      }
    } else if (direction === 'down') {
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
      }
    }

    if (this.historyIndex >= 0 && this.historyIndex < this.commandHistory.length) {
      this.inputElement.value = this.commandHistory[this.historyIndex];
    }
  }

  displayWelcomeMessage() {
    this.appendOutput('Welcome to Web Terminal', 'success');
    this.appendOutput('Type "help" for available commands');
    this.appendOutput('');
  }
}