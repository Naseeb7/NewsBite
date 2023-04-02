import React from 'react'
import "./Newsitem.css"

const Newsitem=(props)=> {
    let {title,description,imageurl,newsurl,author,date,source}=props
    return (
         <div className="cardContainer" id='cardContainer' style={{width:props.width}}>
          <span className='source'>{source}</span>
                    <img src={imageurl?imageurl:"https://st2.depositphotos.com/1092019/6705/i/600/depositphotos_67054009-stock-photo-top-news-on-green-puzzle.jpg"} style={{display:"flex",height:"20rem"}} alt="NewsImage" />
                        <div className="card">
                            <a href={newsurl} target="_blank" rel="noreferrer"className="readmore">Read more</a>
                            <h4><b>{title}</b></h4>
                            {description&&<p>{description}</p>}
                            <p style={{color:"#91cec4"}}>By <b>{author?author:"Unknown"}</b> on {new Date(date).toLocaleString()}</p>
                        </div>
                </div>
    )
}

export default Newsitem
