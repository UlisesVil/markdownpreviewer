import React from "react";
import marked from 'marked'; /*https://forum.freecodecamp.org/t/marked-is-not-defined/300614/4 */

//import ReactDOM from 'react-dom';

//import Draggable from 'react-draggable'; 
//import {DraggableCore} from 'react-draggable'; 
import Draggable, {DraggableCore} from 'react-draggable';

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
//<i class="far fa-file-code"></i>
//fa-free-code-camp
//<i class="fas fa-expand"></i>
//fa-arrows-alt
//<i class="fas fa-compress"></i>
//fa fa-compress
        return(

            <div id="container">

                <div className={classes[0]}>
                    <Toolbar 
                        icon={classes[2]}
                        onClick={this.handleEditorMaximize}
                        text="Editor" />
                    
                    <Editor  
                        markdown={this.state.markdown}
                        onChange={this.handleChange} />

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
                        markdown={this.state.markdown} />
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
         type="text" />
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
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, <strong>\`<div></div>\`</strong>, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![Gif Image w/ Text](https://i.gifer.com/76X1.gif)
`


export default MarkdownPreviewer;