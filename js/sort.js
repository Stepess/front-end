window.onload = function() {
	var widthSortFlag = {value: true};
	var nameSortFlag = {value: true};
	var datetimeSortFlag = {value:true};

	document.getElementById("sort-by-name").onclick = function() {
		sortFiles((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0),
			(a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0), 
			nameSortFlag);
	};

	document.getElementById("sort-by-width").onclick = function() {
		sortFiles(function(a,b) { return a.width-b.width},
			function(a,b) { return b.width-a.width},
			widthSortFlag);
	};

	document.getElementById("sort-by-datetime").onclick = function() {
		sortFiles((a,b) => (a.datetime > b.datetime) ? 1 : ((b.datetime > a.datetime) ? -1 : 0),
			(a,b) => (a.datetime < b.datetime) ? 1 : ((b.datetime < a.datetime) ? -1 : 0),
			datetimeSortFlag);
	};

	function sortFiles(sortFunctionAsc, sortFunctionDesc, flag) {
		var table = document.getElementById("file-table")
		var files = extractFilesFromTable(table)
		files.sort(flag.value ? sortFunctionAsc : sortFunctionDesc);
		flag.value = !flag.value;
		writeFilesInTable(table, files);
	}

	function extractFilesFromTable(tableElement) {
		var table = tableElement;
		var rows = table.rows;
		var files = new Array(rows.length-1);
		for (let i=1; i< rows.length; i++) {
			files[i-1] = {}; 
			files[i-1].name = rows[i].getElementsByTagName("TD")[0].children[0].innerHTML;
			files[i-1].width = rows[i].getElementsByTagName("TD")[1].innerHTML;
			files[i-1].datetime = new Date(rows[i].getElementsByTagName("TD")[2].innerHTML);
		}
		return files;
	}

	function writeFilesInTable(tableElement, filesArray) {
		var table = tableElement;
		var rows = table.rows;
		var files = filesArray;
		for (let i=1; i< rows.length; i++) {
			rows[i].getElementsByTagName("TD")[0].children[0].innerHTML = files[i-1].name;
			rows[i].getElementsByTagName("TD")[1].innerHTML = files[i-1].width;
			rows[i].getElementsByTagName("TD")[2].innerHTML = formatDateTime(files[i-1].datetime);
		}
	}

	function formatDateTime(d) {
		var month = d.getMonth() + 1;
		if (month<10) {
			month = "0" + month;
		}
		var date = d.getDate();
		if (date<10) {
			date = "0" + date;
		}
		var hours = d.getHours();
		if (hours<10) {
			hours = "0" + hours;
		}
		var minutes = d.getMinutes();
		if (minutes<10) {
			minutes = "0" + minutes;
		}
		var seconds = d.getSeconds();
		if (seconds<10) {
			seconds = "0" + seconds;
		}
		return [d.getFullYear(),
		month,
		date].join('.') + ' ' +
		[hours,
		minutes,
		seconds].join(':');
	}
}