## Border Collection 

This collection provides options to set borders and border radius for a box using border and border-radius css properties 

## Options Provided 

- Border Size: Top, Right, Bottom, Left 
- Border Radius: Top lef, Top Right, Bottom Right, Bottom Left. 
- Border Style: options select: Solid, Dashed, Dotted, Double 
- Border Color  

## Usage 
### Inspector 
 - First Import the collection from the blockypage library 
 ```
 cosnt { Border } = blpge.collections;
 ```
 - Add new attribute to your block attributes with the following data structure: 
 ```
 border: `{
		type: "string",
		default: `{
				"borderSize": {
					"values": {
						"top": null,
						"right": null,
						"bottom": null,
						"left": null
					},
					"locked": true
				},
				"borderRadius": {
					"values": {
						"topLeft": null,
						"topRight": null,
						"bottomRight": null,
						"bottomLeft": null
					},
					"unit": "px",
					"locked": true
				},
				"borderStyle": "solid",
				"borderColor": "#333333"
			}`
	}` 
```
You can set the default values as you see suitable. 

- Add the collection to your inspector: 
```
<InspectrControls>
<Border attributeName="border" {...this.props}>
<InspectorControls>
```
**props**
- **attribute(String):** The name of the attribute used for the collection. 
- Since the collection uses setAttributes method to update the attribute you need to pass the props: {...this.props}

### Block
To create a style object out of the shadow attribute, use the method: blpge_border_style_object 
```
const { blpge_border_style_object } = blpge.utilities

let objectStyle = blpge_border_style_object(attribute)
```

Then you can add the style object inline to any JSX element 
```
<div style={objectStyle}> This is a box with borders </div>
```

