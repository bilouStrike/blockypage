## Shadow Collection 

This collection could be used to set a shadow for a box or text using box-shadow or text-shadow css properties. 

## Components 

The collection has 5 required components. 
- 4 RangeControl components are used to set the value for:
 Horizantal offset, Vertical offset, Blur, and Spread.
- Color pallete component to choose the shadow color


## Usage 
### Inspector 
 - First Import the collection from the blockypage library 
 ```
 cosnt { Shadow } = blpgelib.collections;
 ```
 - Add new attribute to your block attributes with the following data structure: 
 ```
 shadow: {
		type: "string",
		default:
			'{"hoffset": 0, "voffset": 0, "blur": 0, "spread": 0, "color": "#333"}'
	}
```

- Add the collection to your inspector: 
```
<InspectrControls>
<Shadow attributeName="shadow" {...this.props}>
<InspectorControls>
```
**props**
- **attribute(String):** The name of the attribute used for the collection. 
- Since the collection uses setAttributes method to update the attribute you need to pass the props: {...this.props}

### Block
To create a style object out of the shadow attribute, use the method: blpge_shadow_style_object 
```
const { blpge_shadow_style_object } = blpgelib.utilities

let objectStyle = blpge_shadow_style_object(attribute)
```

Then you can add the style object inline to any JSX element 
```
<div style={objectStyle}> This is a box with shadow </div>
```

