const terminal = document.querySelector('.terminal');
const commandInput = document.getElementById('command-input');
const history = [];
let historyIndex = 0;

// Function to process the command and generate output
function processCommand(command) {
  // Trim leading/trailing whitespace and convert the command to lowercase
  command = command.trim().toLowerCase();

  // Execute different commands and generate corresponding outputs
  let output = '';
  try {
    switch (command) {
      case 'help':
        output = 'Available commands: help, about, contact, open, simulate, date, neofetch, weather, banner';
        break;
      case 'about':
        output = 'This is a terminal-style website.';
        break;
      case 'contact':
        output = 'You can reach us at example@example.com';
        break;
      case 'open':
        output = 'Opening external link...';
        openExternalLink('https://example.com');
        break;
      case 'simulate':
        output = 'Running simulation...';
        runSimulation();
        break;
      case 'date':
        output = 'Current date: ' + getCurrentDate();
        break;
      case 'neofetch':
        output = 'Running neofetch...\n' + getNeofetchOutput();
        break;
      case 'weather':
        output = 'Fetching weather information...';
        fetchWeatherInfo();
        break;
      case 'banner':
        output = 'Displaying banner...\n' + getBanner();
        break;
      case 'clear':
        clearTerminal();
        return;
      case 'history':
        output = 'Command History:\n' + history.join('\n');
        break;
      default:
        throw new Error('Command not found.');
    }
  } catch (error) {
    output = 'Error: ' + error.message;
  }

  addOutput(output);
  addToHistory(command, output);
}

// Function to execute a command when Enter key is pressed
function handleCommandInput() {
  const command = commandInput.value.trim();
  if (command !== '') {
    processCommand(command);
    commandInput.value = '';
    historyIndex = history.length;
  }
}

// Function to add output to the terminal window
function addOutput(output) {
  const outputDiv = document.createElement('div');
  outputDiv.classList.add('output');
  outputDiv.textContent = output; // Use textContent instead of innerHTML for security
  terminal.appendChild(outputDiv);
  terminal.scrollTop = terminal.scrollHeight;
}

// Function to clear the terminal window
function clearTerminal() {
  terminal.innerHTML = ''; // Clear all child elements
}

// Function to add command and output to history
function addToHistory(command, output) {
  history.push('$ ' + command);
  history.push(output);
}

// Function to handle arrow key navigation through command history
function navigateHistory(event) {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = history[historyIndex * 2];
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (historyIndex < history.length / 2 - 1) {
      historyIndex++;
      commandInput.value = history[historyIndex * 2];
    } else {
      commandInput.value = '';
    }
  }
}

// Function to open an external link
function openExternalLink(url) {
  if (url.startsWith('https://github.com/')) {
    // GitHub repository URL
    const parts = url.split('/');
    const username = parts[3];
    const repository = parts[4];
    const githubUrl = `https://github.com/${maurice267}/${Terminal}`;
    window.open(githubUrl, '_blank');
  } else {
    // Other external links
    window.open(url, '_blank');
  }
}

// Function to run a simulation
function runSimulation() {
  // Logic to run the simulation
  throw new Error('Simulation failed.');
}

// Function to get the current date
function getCurrentDate() {
  const now = new Date();
  return now.toDateString();
}

// Function to get the output of the neofetch command
function getNeofetchOutput() {
  const neofetchOutput = `
..............                                     kali@kali-raspberry-pi 
            ..,;:ccc,.                             ---------------------- 
          ......''';lxO.                           OS: Kali GNU/Linux Rolling aarch64 
.....''''..........,:ld;                           Host: Raspberry Pi 4 Model B Rev 1.4 
           .';;;:::;,,.x,                          Kernel: 5.15.44-Re4son-v8l+ 
      ..'''.            0Xxoc:,.  ...              Uptime: 1 day, 39 mins 
  ....                ,ONkc;,;cokOdc',.            Packages: 3346 (dpkg) 
 .                   OMo           ':ddo.          Shell: zsh 5.9 
                    dMc               :OO;         Resolution: 1360x768 
                    0M.                 .:o.       DE: Xfce 4.18 
                    ;Wd                            WM: Xfwm4 
                     ;XO,                          WM Theme: Kali-Dark 
                       ,d0Odlc;,..                 Theme: Kali-Dark [GTK2], adw-gtk3-dark [GTK3] 
                           ..',;:cdOOd::,.         Icons: Flat-Remix-Blue-Dark [GTK2/3] 
                                    .:d;.':;.      Terminal: qterminal 
                                       'd,  .'     Terminal Font: FiraCode 10 
                                         ;l   ..   CPU: BCM2835 (4) @ 1.500GHz 
                                          .o       Memory: 2730MiB / 3794MiB 
                                            c
                                            .'                             
                                             . 
`;

  return neofetchOutput;
}

// Function to fetch weather information
function fetchWeatherInfo() {
  // Logic to fetch weather information
  // Display the output when ready
}

// Function to get the banner
function getBanner() {
  // Logic to generate the banner
  return 'Banner text goes here';
}

// Event listener for command input
commandInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleCommandInput();
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    navigateHistory(event);
  }
});
