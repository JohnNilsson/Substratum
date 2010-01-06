var Substratum = function() {
	function wrapElems(prefix, array, postfix) {
		return prefix + array.join(postfix + prefix) + postfix;
	}

	function renderExpr(inputs,outputs) {
		return '<ol class="expression">' +
					wrapElems('<li class="input">',inputs,'</li>') +
					wrapElems('<li class="output">',outputs,'</li>') +
				'</ol>';
	}

	function renderBooleanInput(value) {
		if(value) {
			return '<input type="checkbox" checked="checked"/>';
		} else {
			return '<input type="checkbox"/>';
		}
	}

	function renderBooleanValue(value) {
		return ''+value;
	}

	function renderBooleanExpr(inputs,outputs) {
		return renderExpr(
				inputs.map(renderBooleanInput),
				outputs.map(renderBooleanValue));
	}

	return {
		Bool: {
			renderInput: renderBooleanInput,
			renderValue: renderBooleanValue,
			renderExpr: renderBooleanExpr
		}
	};
}();

YUI({combine: true, timeout: 10000}).use('node','dd',function(Y) {
	var ws = Y.Node.get('#workspace');

	var bool = Substratum.Bool.renderExpr([true],[true]);

	ws.append(bool);
	ws.append(bool);
	ws.append(bool);

	var currentDrop = null;
	var oldExpr = null;

	Y.DD.DDM.on('drag:enter', function(e) {
		var drop = Y.DD.DDM.activeDrop;
		if(drop != currentDrop)
		{
			if(currentDrop != null) {
				drop.get('node').set('innerHTML',oldExpr);
			}
			currentDrop = drop;
			var n = drop.get('node');
			oldExpr = n.get('innerHTML');
			n.set('innerHTML',bool);
		}
	});

	Y.DD.DDM.on('drag:exit', function(e) {
		var drop = Y.DD.DDM.activeDrop;
		if(drop == currentDrop)
		{
			drop.get('node').set('innerHTML',oldExpr);
			oldExpr = null;
			currentDrop = null;
		}
	});

	/*
	 * Y.DD.DDM.on('drag:start', function() {
	 * ws.queryAll('.input').addClass('dropTarget'); });
	 *
	 * Y.DD.DDM.on('drag:end', function() {
	 * ws.queryAll('.input').removeClass('dropTarget'); });
	 */

	ws.queryAll('.input').each(function(n) {
		var d = new Y.DD.Drop({node: n});
    });

    ws.queryAll('.expression').each(function(n) {
		var d = new Y.DD.Drag({node: n, dragMode: 'intersect'});
    });
});