import { Terminal } from './terminal.js';
import { CommandHandler } from './commands.js';

const terminal = new Terminal(
  document.getElementById('terminal-output'),
  document.getElementById('terminal-input')
);

const commandHandler = new CommandHandler();

terminal.init();