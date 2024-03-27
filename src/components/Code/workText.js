export default ()=>{
    self.addEventListener('message', e => { 
        if (!e) return;
  
        function reset(cmds){
            const chunks = [
              {
                commands:[],
                lineNumber:undefined
              }
            ]
            
            while (cmds.length) {
              const command = cmds.shift();
              const { method, args } = command;
              if ( method === 'delay') {
                const [lineNumber] = args;
                chunks[chunks.length - 1].lineNumber = lineNumber;
                chunks.push({
                  commands: [],
                  lineNumber: undefined,
                });
              } else {
                chunks[chunks.length - 1].commands.push(command);
              }
            }
            // console.log(chunks);
            // dispatch(actions.setChunks(chunks))
            // dispatch(actions.setCursor(1))
            return chunks
          }

          const temp = reset(e.data)

        // const temp = eval(code)
        // console.log(temp)
        postMessage(temp);
    })
}