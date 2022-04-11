import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'    //same as html
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'   //by this we can control our own input and output with your wown onchange

function Editor(props) {

    const {
        displayName,
        language,
        value,
        onChange
    } = props

    const [open, setOpen] = useState(true)

    function handleChange(editor, data, value) {
        onChange(value)
    }

    return (
        <>
            <div className={`editor-container ${open ? '' : 'collapsed'}`}>     {/* it means: if open is true we dont want any other additional classes and if not we want a collapsed class */}
                <div className="editor-title">
                    {displayName}
                    <button
                        type="button"
                        className="btn"
                        onClick={() => setOpen(prevOpen => !prevOpen)}>
                        {open ? <i className="fas fa-compress-alt"></i> : <i className="fas fa-expand-alt"></i>}
                    </button>
                </div>
                <ControlledEditor
                    onBeforeChange={handleChange}
                    value={value}
                    className="code-mirror-wrapper"
                    options={{  //these options are from code mirror library
                        lineWrapping: true, //to wrap all the lines
                        lint: true,
                        mode: language,
                        theme: 'material',
                        lineNumbers: true
                    }}
                />
            </div>
        </>
    )
}

export default Editor;
