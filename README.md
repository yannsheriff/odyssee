##Props 

#actions
- take: [{ id: val, img: src, label: "label" }]
    The array of action, needs all the three parameters

#onChoiceSelected
- take : function(id) 
    It's a callBack function triggered on choice selected, with the choice id in parameters

#mainBtnStyle
    style the main button (the one that trigger the multi-action).

#initalPositon 
- take : { x: val,  y: val }
    Change the position of the main button.

#labelStyle
    style the label of each actions on hover.

#mainButton 
- take : <React-Component />
    this props allow to personnalise the aspect of main button with another component (like an image).

#mainBtnOpen 
- take : <React-Component />
    this props allow to personnalise the aspect of main button When triggerd.

#disabled
- take : <React-Component />
    this props allow to personnalise the aspect of main button When it's disabled.

#isActive
- take : boolean
- default : true
    Activate or desacivate the main button.

