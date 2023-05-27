import React from 'react'
import defaultStyles from '../styles/DefaultItemCard.module.css'

function invertColor(hex, bw=true) {
  function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
      // https://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}
let template_image_source="/undefined_template.jpg"
function checkDefaults({styleClass,
  coloring={
    borderColor:'',
    backgroundColor:'',
    fontColor:''
}})
{
  return {
    styleClass:styleClass||defaultStyles,
    coloring:{
      borderColor:(coloring && coloring.borderColor)||'black',
      titleBackgroundColor:(coloring && coloring.backgroundColor)||'white',
      titleFontColor:((coloring && coloring.fontColor)||(coloring && coloring.backgroundColor && invertColor(coloring.backgroundColor))||'black')
    }
  }
}

export default function ItemCard({
  imageUrl=template_image_source,
  title='',
  isActive=false,
  styleClass,
  coloring={
    borderColor:'',
    backgroundColor:'',
    fontColor:''
}
}) {
  ({styleClass,coloring}=checkDefaults({styleClass,coloring}));
  const {borderColor, titleBackgroundColor, titleFontColor} = coloring;

  const cardActiveStyle=styleClass['container']+' '+(isActive?styleClass['active']:'');

  return (
    <div className={cardActiveStyle}>
        <div className={styleClass['image-container']} style={{borderColor}}>
          <img className={styleClass.image} src={imageUrl} alt={title}/>
        </div>
        <div className={styleClass['title']} style={{color:titleFontColor,background:titleBackgroundColor}}>
          {title}
        </div>
    </div>
  )
}
