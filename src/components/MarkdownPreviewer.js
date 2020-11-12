import React from "react";
import marked from 'marked'; /*https://forum.freecodecamp.org/t/marked-is-not-defined/300614/4 */

marked.setOptions({
    breaks:true,
});

const renderer = new marked.Renderer();
renderer.link = function(href, title, text){
    return `<a target="_blank"
    href="${href}">${text}` + "</a>"; 
}

class MarkdownPreviewer extends React.Component{

    constructor (props){
        super(props);

        this.state ={
            markdown: placeholder,
            editorMaximized: false,
            previewMaximized: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
        this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
    }

    handleChange (e) {
        this.setState({
            markdown: e.target.value
        });
    }

    handleEditorMaximize () {
        this.setState({
            editorMaximized: !this.state.editorMaximized
        });
    }

    handlePreviewMaximize () {
        this.setState({
            previewMaximized: !this.state.previewMaximized
        });
    }

    render(){
        
        const classes = 
            this.state.editorMaximized ? 
                ['editorWrap maximized',
                'previewWrap hide',
                'fas fa-compress'] :
            this.state.previewMaximized ?
                ['editorWrap hide',
                'previewWrap maximized1',
                'fas fa-compress'] :
                ['editorWrap',
                'previewWrap',
                'fas fa-expand'];

        return(

            <div id="container">
                <div className={classes[0]}>
                    <Toolbar 
                        icon={classes[2]}
                        onClick={this.handleEditorMaximize}
                        text="Editor" 
                    />
                    
                    <Editor  
                        markdown={this.state.markdown}
                        onChange={this.handleChange} 
                    />
                </div>

                <div className="converter">
                </div>

                <div className={classes[1]}>
                    <Toolbar
                        text="Preview"
                        icon={classes[2]} 
                        onClick={this.handlePreviewMaximize} 
                    />

                    <Preview  
                        markdown={this.state.markdown} 
                    />
                </div>
            </div>
        )
    }
};

const Toolbar= (props)=>{
    return(
        <div className="toolbar">
            <i title=""
               className="far fa-file-code" />
            {props.text}
            <i onClick={props.onClick}
               className={props.icon}> 
            </i>
        </div>
    )
}

const Editor = (props) => {
    return (
        <textarea id="editor"
            value={props.markdown}
            onChange={props.onChange}
            type="text" 
        />
    )
}

const Preview = (props) => {
    return(
        <div id="preview"
            dangerouslySetInnerHTML={{__html: 
            marked(props.markdown, { renderer: renderer 
                })}} 
        />
    )
}

const placeholder=
`# This is my React Markdown Previewer!

## This is a sub-heading...
### And below this line you'll see what this project can do:
  
Heres some code, <strong>\`<div></div>\`</strong>, between 2 backticks.

\`\`\`
// this is multi-line code:

function multiLineCode(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**...
Or _italic_.
Or **_both!_**  if you want 
maybe you prefer ~~crossing some words out~~.

As you can see we have [links](https://www.freecodecamp.com) too and
> Block Quotes!

This is the section where I show you a table:

Header-1 | Header-2 | Header-3 | Header-4
------------ | ------------- | ------------- | ------------- 
content 1 | content 2 | content 3
content 4 | content 5 | content 6

- Have you been missing lists?.
  - This one is bulleted.
     - We can use indentation levels.
        - And this is the result.


1. Do you prefer numbererd lists?
1. It works if you use 1s 
1. We can continue and continue
- You can use dashes
* And asterisks

Look at this, it's an image!!!

![Gif Image w/ Text](https://i.gifer.com/76X1.gif)
`


export default MarkdownPreviewer;