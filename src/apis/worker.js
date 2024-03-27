import './algorithm-visualizer.esm'
export default ()=>{
    

   
    
    
    
    onmessage = e => {
        const process = { env: { ALGORITHM_VISUALIZER: '1' } };
        
        const sandbox = code => {
            console.log('require error')
            // const require = name => ({ 'algorithm-visualizer': AlgorithmVisualizer }[name]); // fake require
            require('./algorithm-visualizer')
            eval(code);
          };
        
        
    
      const lines = e.data.split('\n').map((line, i) => line.replace(/(\.\s*delay\s*)\(\s*\)/g, `$1(${i})`));
      const code = lines.join('\n');
      sandbox(code);
      console.log('post error')
      postMessage(AlgorithmVisualizer.Commander.commands);
    };

}
