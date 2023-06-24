## CSS Generator Module

This module could be used to generate a CSS code as a string from input data.

## Import

```
const { blpge_cssGen } = blpgelib.helpers;
```

## Inputs

- css_selector(str)\*: any CSS selector
- properties\*: array of strings to the css properties
- values\*: CSS properties' values, this could come with different structures:
  - Array of values(strings or numbers): for values that has exactly one word.(Ex. **color : red**) )
  - Array of arrays: for values that are combined of multiple words (Ex. **margin : 5px** )
  - Array of arrays of arrays: used for values that changes in different breakpoints (exactly 4 breakpoints), in that case the module will return a string with different media queries.
- style_string: to be combined with the new generated CSS

## Examples
### Example 01 (Simple properties and values):

```
let myCSS =  blpge_cssGen(".header", ["color", "margin"], ["red", [5, "px"]]);

/*
console.log(mycss) ->
.header {
  color: red;
  margin: 5px;
}
*/
```

### Example 02 (Media Queries & Combination)

```
let myCSS =  blpge_cssGen(".header", ["color", "margin"], ["red", [5, "px"]]);
myCss = blpge_cssGen(".links", ["margin", "color", "padding"],
      [[5, "px"], "red", [[1, "px"], [2, "%"], [3, "em"], [4, "px"]]], myCss);

/*
console.log(mycss) ->
    .header {
        color: red;
        margin: 5px;
    }

    .links {
        margin: 5px;
        color: red;
        padding: 1px;
    }
  
    @media (min-width: 768px) and (max-width: 991.98px) {
        .links {
          padding: 2%;
        }
    }
    
    @media (min-width: 576px) and (max-width: 767.98px) {
        .links {
          padding: 3em;
        }
    }
    
    @media (max-width: 575.98px) {
        .links {
          padding: 4px;
        }
    }
*/
```

## BreakPoints 
The Break points used are the same as for bootstrap: 
```
// Define Breakpoints
let blpge_breakpoints = {
  xs: "@media (max-width: 575.98px)",
  sm: "@media (min-width: 576px) and (max-width: 767.98px)",
  md: "@media (min-width: 768px) and (max-width: 991.98px)"
};
```
