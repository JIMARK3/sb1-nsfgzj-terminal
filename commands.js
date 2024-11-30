export class CommandHandler {
  constructor() {
    this.commands = {
      help: this.helpCommand,
      clear: this.clearCommand,
      date: this.dateCommand,
      echo: this.echoCommand
    };
  }

  helpCommand() {
    return {
      output: [
        'Available commands:',
        '  help     - Show this help message',
        '  clear    - Clear the terminal',
        '  date     - Show current date',
        '  echo     - Echo the input'
      ],
      type: 'success'
    };
  }

  clearCommand() {
    return {
      clear: true
    };
  }

  dateCommand() {
    return {
      output: [new Date().toString()]
    };
  }

  echoCommand(args) {
    return {
      output: [args.join(' ')]
    };
  }
}