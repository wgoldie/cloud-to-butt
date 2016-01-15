window.onload = function () { walk(document.body); }

// Make this work on shitty webpages that load text in js
new MutationObserver(
  function walkMutation(records, observer) {
	  walk(document.body)
  }
).observe(document.body, { attributes:false, childList: true, characterData: true, subtree: true });

function walk(node) 
{
	// adapted from
	// http://is.gd/mwZp7E
	
	var child, next;
	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;
		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;
	if(!v.match(/[Tt]he\s+[Ff]acebook/g)) {
		v = v.replace( /\bFacebook/g, "The Facebook");
		v = v.replace( /\bfacebook/g, "the facebook");
	}
	
	textNode.nodeValue = v;
}