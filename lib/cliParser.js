const parse = function(command) {
  const args = [];
  const readingPart = false;
  const part = '';

  for(const i = 0; i < command.length; i++) {
    if(command.charAt(i) === ' ' && !readingPart) {
      args.push(part);
      part = '';
    } else {
      if(command.charAt(i) === '\"') {
        readingPart = !readingPart;
      } else {
        part += command.charAt(i);
      }
    }
  }
  args.push(part);
  return args;
}

module.exports = (cmd) => cmd.match(/'[^']*'|"[^"]*"|\S+/g) || []