# Multi-Action-Button

### actions

> type : *Array of objects*
```javascript
	onChoiceSelected={[
		{id: 0, img: require('./src.img'), label: "Lorem"},
		{id: 1, img: require('./src1.img'), label: "Ipsum"},
	]}
```
The array of action, needs all the three parameters

  

### onChoiceSelected

> type : *function*
```javascript
	onChoiceSelected={(id) => {
		// do something whith this id 
	}}
```

It's a callBack function triggered on choice selected, with the choice id in parameters

  

### mainBtnStyle
> type : *css*
```javascript
	mainBtnStyle= {{ background: "green" }}
```
style the main button (the one that trigger the multi-action).

  

### initalPositon
> type : *javascript object*
```javascript
	initalPositon={{ x: val, y: val }}
```
Change the position of the main button.

  

### labelStyle

> type : *css*
```javascript
	labelStyle= {{ color: "red" }}
```
style the label of each actions on hover.

  

### mainButton

> type : *react component*
```javascript
	mainButton={ <React-Component /> }
```

this props allow to personnalise the aspect of main button with another component (like an image).

  

### mainBtnOpen

> type : *react component*
```javascript
	mainBtnOpen={ <React-Component /> }
```

this props allow to personnalise the aspect of main button When triggerd.

  

### disabled

> type : *react component*
```javascript
	disabled={ <React-Component /> }
```

this props allow to personnalise the aspect of main button When it's disabled.

  

### isActive

> type : bool (default => true)
```javascript
	isActive={ false }
```



Activate or desacivate the main button.