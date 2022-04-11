import React, { useEffect } from "react";
import Editor from './Editor';
import useLocalStorage from "../hooks/useLocalStorage";

function App() {

  // const [html, setHtml] = useState('');
  // const [css, setCss] = useState('');
  // const [js, setJs] = useState('');
  // const [srcDoc,setSrcDoc]=useState('');

  //we've used useLocalStorage instead of useState because we want to save the value even after refreshing the page

  const [html, setHtml] = useLocalStorage('html','');
  const [css, setCss] = useLocalStorage('css','');
  const [js, setJs] = useLocalStorage('js','');
  const [srcDoc,setSrcDoc]=useLocalStorage('');

  useEffect(()=>{
    const timeout=setTimeout(()=>{
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `)
    },250)                            //by this and settimeout we can write a code and when we pause for like 250milliseconds the output will be displayed
    return()=>clearTimeout(timeout)
  },[html,css,js])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          displayName="HTML"
          language="xml"
          value={html}
          onChange={setHtml} />
        <Editor
          displayName="CSS"
          language="css"
          value={css}
          onChange={setCss} />
        <Editor
          displayName="JS"
          language="javascript"
          value={js}
          onChange={setJs} />
      </div>

      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts" //It helps with security. When you run an application il'll not able to access the bunch of other things like the document cookies,etc.
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
