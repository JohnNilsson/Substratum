// http://dev.opera.com/articles/view/rich-html-editing-in-the-browser-part-2/

//DONE: 
// evaluation The Humane Environment-style

//TODO: 
// Start with lambda calculus? 
// Add nesting blocks on ({[ and such 
// Use dl for binding names to expressions 
// GUID for identifier declarations 
// href and class? for references to enable refactoring inline expression


	
$(document).ready(function() {
	c = $("#content");
	c.bind('keydown', 'ctrl+space', auto_eval);
});

function auto_eval(e) {
	var rng = window.getSelection().getRangeAt(0);
	var val = eval(rng.toString());
	if(!!val)
		replace(rng,window.document.createTextNode(val));
	return false;
}



//
// Random utils picked up around the net...
//

function isTextNode(node) {
	return node.nodeType==3;
}
function rightPart(node, ix) {
	return node.splitText(ix);
}
function leftPart(node, ix) {
	node.splitText(ix);
	return node;
}

// overwrites the current selection with a node
function replace(rng, node) {
	rng.deleteContents();
	if (isTextNode(rng.startContainer)) {
		var refNode = rightPart(rng.startContainer, rng.startOffset)		
		refNode.parentNode.insertBefore(node, refNode);
	} else {
		if (rng.startOffset==rng.startContainer.childNodes.length) {
			refNode.parentNode.appendChild(node);
		} else {
			var refNode = rng.startContainer.childNodes[rng.startOffset];
			refNode.parentNode.insertBefore(node, refNode);
		}
	}	
}


if (!Array.prototype.map) {
	Array.prototype.map = function(fun) {
		var collect = [];
		for (var ix = 0; ix < this.length; ix++) { collect[ix] = fun(this[ix]); }
		return collect;
	}
}