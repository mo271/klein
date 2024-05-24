// Define the variable that will hold data from protokolle.json
let protokolle = [];

// Define the variable that will hold data from teilnehmer.json
let teilnehmer = [];
let show_teilnehmer = false;

var customPages = {
	'1': ["001", "...",
		"320", "321a", "..."],
	'2': ["000a", "000", "...",],
	'3': ["...", "041", "042a", "042b", "042", "...",
		"049", "050a", "050b", "050c", "050d", "050e", "050", "...",
		"057", "057a", "..."],
	'4': ["000a", "000", "...",
		"204", "205a", "205", "...",
		"223", "224a", "224", "...",
		"225", "226a", "226", "...",
		"227", "228a", "228", "...",
		"229", "230a", "230", "...",
		"231", "232a", "232", "..."],
	'5': ["000a", "000", "..."],
	'6': ["000a", "000", "...",
		"242", "243a", "243", "..."],
	'7': ["000a", "000b", "000c", "000d", "000e", "000f", "001", "...",
		"098", "099a", "099b", "099", "...",
		"139", "140a", "140", "..."],
	'8': ["000a", "000b", "000", "...",
		"125", "126a", "126b", "126c", "126d", "126e", "126f", "126", "...",
		"220", "221a", "221b", "221", "..."],
	'9': ["...", "052", "052a", "053", "...",
		"054", "054a", "055", "..."],
	'10': ["000a", "000b", "000c", "000d", "001", "..."],
	'11': ["000a", "000b", "000c", "000d", "001", "..."],
	'12': ["000a", "000b", "000", "...",
		"239", "240a", "240b", "240c", "240", "..."],
	'13': ["000a", "000b", "000c", "000d", "001", "...",
		"053", "054a", "054b", "054", "...",
		"063", "064a", "064b", "064", "...",
		"227", "228a", "228b", "228", "..."],
	'14': ["000a", "000b", "000c", "000d", "000e", "000f", "001", "...",
		"229", "230a", "230b", "230", "...",
		"285", "286a", "286b", "286", "...",
		"295", "296a", "296b", "296", "...",
		"297", "298a", "298b", "298", "...",
		"307", "308a", "308b", "308", "...",
		"311", "312a", "312b", "312", "...",
		"342", "343a", "343", "...",
		"362", "363a", "363b", "363c", "363", "...",
		"366", "367a", "367b", "367c", "367", "...",
		"368", "369a", "369b", "369c", "369d", "369e", "369f", "369g", "369h", "369i", "369j", "369k", "369l", "369m", "369n", "369o", "369p", "369q", "369r", "369", "..."],
	'15': ["000a", "000b", "000c", "000d", "001", "..."],
	'16': ["000a", "000b", "000c", "000d", "001", "..."],
	'16-part2': ["000a", "000b", "001", "..."],
	'17': ["000a", "000b", "000c", "000d", "001", "..."],
	'18': ["000a", "000b", "000c", "000d", "001", "...",
		"024", "025a", "025b", "025", "...",
		"028", "029a", "029b", "029", "...",
		"057a", "057", "..."],
	'19': ["000a", "000b", "000c", "000d", "001", "...",
		"029", "030a", "030b", "030", "...",
		"039", "040a", "040b", "040", "...",
		"061", "062a", "062b", "062", "..."],
	'20': ["000a", "000b", "000c", "000d", "001", "...",
		"065", "066a", "066b", "066", "...", "093", "094a", "094b", "094", "...",
		"210", "211a", "211", "212a", "212", "...",
		"256", "257a", "257", "...",
		"266", "267aa", "267b", "267", "...",
		"280", "281a", "281b", "281c", "281d", "281", "...",
		"293", "294a", "294b", "294d", "294", "..."],
	'21': ["000a", "000b", "000c", "000d", "001", "..."],
	'22': ["000a", "000b", "000c", "000d", "001", "...", "049", "050a", "050b", "050", "...",
		"125", "126a", "126", "...",
		"155", "156b", "156", "..."],
	'23': ["000a", "000b", "000c", "000d", "001", "..."],
	'24': ["000a", "000b", "000c", "000d", "001", "...",
		"119", "120a", "120b", "120c", "120", "..."],
	'25': ["000a", "000b", "000c", "000d", "000e", "000f", "001", "...",
		"073", "074a", "074b", "074", "...",
		"262", "263a", "263b", "263c", "263d", "263e", "263", "...",
		"264", "265a", "265b", "265c", "265", "..."],
	'26': ["000a", "000b", "000c", "000d", "001", "..."],
	'27': ["000a", "000b", "000c", "000d", "001", "...",
		"085", "086a", "086b", "086c", "086", "...",
		"177", "178a", "178b", "178", "...",
		"234", "235a", "235b", "235", "...",
		"254", "255a", "255b", "255", "...",
		"262", "263a", "263b", "263", "..."],
	'28': ["000a", "000b", "000c", "000d", "001", "...",
		"029", "030a", "030b", "030", "...",
		"037", "038a", "038b", "038", "...",
		"047", "048a", "048b", "048", "..."],
	'29': ["000a", "000b", "000c", "000d", "001", "...",
		"273", "274a", "274b", "274", "..."]
};


function getNextPage(currentPage, volume) {
	if (customPages[volume] && customPages[volume].includes(currentPage)) {
		let currentIndex = customPages[volume].indexOf(currentPage);
		if ((customPages[volume][currentIndex + 1]) != "...") {
			return customPages[volume][currentIndex + 1]
		}
	}
	return pad(parseInt(currentPage) + 1); // Fallback to normal increment
}

function getPrevPage(currentPage, volume) {
	if (customPages[volume] && customPages[volume].includes(currentPage)) {
		let currentIndex = customPages[volume].indexOf(currentPage);
		if ((customPages[volume][currentIndex - 1]) != "...") {
			return customPages[volume][currentIndex - 1]
		}
	}
	return pad(parseInt(currentPage) - 1); // Fallback to normal decrement
}


function processProtokolle() {
	var RMonat = new Array("I", "II", "III", "IV", "V", "VI",
		"VII", "VIII", "IX", "X", "XI", "XII");
	var Wochentag = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch",
		"Donnerstag", "Freitag", "Samstag");
	for (var i = 0; i < protokolle.length; i++) {
		protokolle[i].titel = protokolle[i].titel.replace(/\\\[/g, "latexinlinelinks").replace(/\\\]/g, "latexinlinerechts").replace(/\[/g, "<span class=\"hiddenkomm\">[").replace(/\]/g, "]</span>").replace(/\\\\newline/g, "<br>").replace(/\\newline/g, "<br>").replace(/\\textsuperscript{(.*?)}/g, "<sup>$1</sup>").replace(/--/g, "—").replace(/\\foreignlanguage{(.*?)}{(.*?)}/g, "$1: $2").replace(/latexinlinelinks/g, "\\\[").replace(/latexinlinerechts/g, "\\\]").replace(/!eKl!/g, "\$\[\$").replace(/!eKr!/g, "\$\]\$");
		protokolle[i].ktitel = protokolle[i].ktitel.replace(/\\\[/g, "latexinlinelinks").replace(/\\\]/g, "latexinlinerechts").replace(/\[/g, "<span class=\"hiddenkomm\">[").replace(/\]/g, "]</span>").replace(/\\\\newline/g, "<br>").replace(/\\newline/g, "<br>").replace(/\\textsuperscript{(.*?)}/g, "<sup>$0</sup>").replace(/--/g, "—").replace(/\\foreignlanguage{(.*?)}{(.*?)}/g, "$1: $2").replace(/latexinlinelinks/g, "\\\[").replace(/latexinlinerechts/g, "\\\]").replace(/!eKl!/g, "\$\[\$").replace(/!eKr!/g, "\$\]\$");
		// TODO: move to processTeilnehmer
		//protokolle[i].name=protokolle[i].name.replace(/\[/g,"<span class=\"hiddenkomm\">[").replace(/\]/g,"]</span>").replace(/\\newline/g,"<br>").replace(/\\foreignlanguage{(.*?)}{(.*?)}/g,"$1: $2").replace(/\\begin\{CJK\}\{UTF8\}\{min\}吉江琢兒\\end\{CJK\}/,"japanisch: 吉江琢兒");

		if (protokolle[i].dok) {
			var dt = new Date(protokolle[i].datum);
			protokolle[i].iso_date = protokolle[i].datum;
			var TagInWoche = dt.getDay();
			var Jahresmonat = dt.getMonth();
			protokolle[i].datum = Wochentag[TagInWoche] + ', ' + dt.getDate() + '.' + RMonat[Jahresmonat] + '.' + dt.getFullYear();
		}
		else { protokolle[i].datum = '<i class="fa fa-question-circle" data-toggle="tooltip" data-placement="left" title="Unklarheit beim Datum"></i> <span class="komm1">' + protokolle[i].datum + "</span>"; }

		if (protokolle[i]['derror']) {
			if (protokolle[i]['derror'] == 'andere Quelle') {
				protokolle[i].datum = '<i class="fa fa-question-circle" data-toggle="tooltip" data-placement="left" title="Datum der Niederschrift oder aus anderer Quelle"></i> ' + protokolle[i].datum;
			}
			if (protokolle[i]['derror'] == 'unbekannt') {
				protokolle[i].datum = '<i class="fa fa-question-circle"></i><span class="komm"> ohne Datum</span>';
			}
			if (protokolle[i]['derror'] == 'dito') {
				var olddate = '';
				olddate = protokolle[i - 1].datum;
				protokolle[i].datum = '<i class="fa fa-ellipsis-h" data-toggle="tooltip" data-placement="left" title="Datum vom vorigen Vortrag übernommen"></i> ' + olddate;
			}
		}

		if (!(protokolle[i].sok)) {
			protokolle[i].seite = '<i class="fa fa-question-circle"></i> ' + protokolle[i].seite;
		}
		if (protokolle[i].titel == "") {
			if (protokolle[i].ktitel != "") {
				protokolle[i].titel = '<i class="fa fa-info-circle" data-toggle="tooltip" data-placement="left" title="Titel aus Inhaltsverzeichnis von F. Klein"></i> ' + protokolle[i].ktitel;
			}
			else {
				protokolle[i].titel = '<i class="fa fa-question-circle"></i><span class="komm"> ohne Titel</span>';
			}
		}
		// TODO: move to processTeilnehmer
		//  if (protokolle[i].name.indexOf('?')>-1) {
		//      protokolle[i].name='<i class="fa fa-question-circle" data-toggle="tooltip" data-placement="left" title="Unsicherheit beim Namen"></i> ' +protokolle[i].name.replace(/\?/g,'');
		//  }
	}
}

$(function () {
	$('#side-menu').metisMenu();	//side menu collapse
});
$.dynatableSetup({
	dataset: {
		perPageDefault: 25,
		perPageOptions: [10, 25, 50, 100, 500, 1000, 1500],
	},
});
function hideprevnext(idnr) {
	if (idnr == 1) {
		$('#einzelalarm .prev').addClass("disabled");

	}
	else if (idnr == 1204) {
		$('#einzelalarm .next').addClass("disabled");
	}
	else {
		$('#einzelalarm .prev').removeClass("disabled");
		$('#einzelalarm .next').removeClass("disabled");
	}
	return false;
}

var updateeinzelwarnung = function () {
	if (typeof tabledata.settings.dataset.queries.frage != "undefined") {
		if (tabledata.settings.dataset.queries.frage.indexOf("id") > -1) {
			idnr = tabledata.settings.dataset.queries.frage.split('-')[1];

			semstr = protokolle[idnr - 1].sn;
			semstr = semstr % 1 ? semstr : semstr + '.0';
			semstr = 'sn-' + semstr
			$('#einzelalarm').show();
			$('#einzelband').html("Band " + protokolle[idnr - 1].band);
			$('#einzelband').attr("href", '#band-' + protokolle[idnr - 1].band);
			$('#einzelsemester').html(titeldict[semstr].replace('<br>', ''));
			$('#einzelsemester').attr("href", '#' + semstr);

			var idzahl = parseInt(tabledata.settings.dataset.queries.frage.split('-')[1])
			var prevint = parseInt(idzahl) - 1
			var nextint = parseInt(prevint) + 2

			hideprevnext(idnr);
			$('#einzelalarm a.controls.previous').attr("href", '#id-' + prevint)
			$('#einzelalarm a.controls.next').attr("href", '#id-' + nextint)

		}
		else if (tabledata.settings.dataset.queries.frage.indexOf("tn") > -1) {
			$('#einzelalarm').show();
			$('#einzelalarm .pagination').hide();
			$('#einzelalarm .einzelansichttext').hide();
		}
		else {
			$('#einzelalarm').hide();
		}
	}
	else {
		$('#einzelalarm').hide();
	}

}
var updatesuchwarnung = function () {
	if (typeof tabledata.settings.dataset.queries.search != "undefined") {
		if (tabledata.settings.dataset.queries.search != "") {
			$('.suchalarm').show();
			if ((window.location.hash == '') || (window.location.hash == '#')) {
				$('.suchealle').hide();
			}
			$('#suchwort').html(tabledata.settings.dataset.queries.search);
		}
		else {
			$('.suchalarm').hide();
		}
	}
	else {
		$('.suchalarm').hide();
	}

}
var updatetitel = function () {
	var seitentitel = (show_teilnehmer ? 'Teilnehmer' : 'Protokolle') + ' 1872–1912';
	if (typeof tabledata.settings.dataset.queries.frage != "undefined") {
		var anfrage = tabledata.settings.dataset.queries.frage.split('-');
		if ((anfrage[0] == 'band') || (anfrage[0] == 'sn')) {
			$('#seitentitel').show();
			$('#seitentitel').html(titeldict[tabledata.settings.dataset.queries.frage]);
		}
		else if (anfrage[0] == 'id' || anfrage[0] == 'tn') {
			$('#seitentitel').hide();
		}
		else {
			$('#seitentitel').show();
			$('#seitentitel').html(seitentitel);
		}
	}
	else {
		$('#seitentitel').show();
		$('#seitentitel').html(seitentitel);
	}
	$('#seitentitel').find('.nonorigtitel').prepend('<i class="fa fa-info-circle"></i> ');

}


protokolle_table = "";
tabledata = "";
$.fn.bootstrapSwitch.defaults.offText = 'aus';
$.fn.bootstrapSwitch.defaults.onText = 'an';
$.fn.bootstrapSwitch.defaults.size = "normal";


var processingComplete = function () {
	$(function () {
		$("[data-toggle='tooltip']").tooltip();
	});
	updatetitel();
	if ($('#check').is(':checked')) {
		$('#seitentitel').find('.hiddenkomm').show();
		$(".hiddenkomm").show();
	}
	else {
		$('#seitentitel').find('.hiddenkomm').hide();
		$(".hiddenkomm").hide();
	}
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, "my-final-table"]);
	updatesuchwarnung();
	updateeinzelwarnung();
	$(function () {
		$("[data-toggle='tooltip']").tooltip();
	});

}

function meinsort(record, queryValue) {
	anfrage = queryValue.split('-');
	if (!show_teilnehmer) {
		return (anfrage[1] == record[anfrage[0]]) ? true : false;
	} else {
		if (anfrage[0] == "tn") {
			return record.id == anfrage[1];
		}
		// Iterate over the ids_to_signatures to find a match
		for (var key in record.ids_to_signatures) {
			if (record.ids_to_signatures.hasOwnProperty(key)) {
				var adjusted_key = parseInt(key) - 1;

				// Check if the adjusted key is within the bounds of the protokolle array
				if (adjusted_key >= 0 && adjusted_key < protokolle.length) {
					var prot_record = protokolle[adjusted_key];

					// Check if the anfrage matches the prot_record
					if (anfrage[1] == prot_record[anfrage[0]]) {
						return true;
					}
				} else {
					console.log("unexpected out of range adjusted key:", adjusted_key);
				}
			}
		}
		return false;
	}

}


function pad(page) {
	return isNaN(page) ? page : (parseInt(page) < 10 ? "00" + page : (parseInt(page) < 100 ? "0" + page : page));
}
function unpad(page) {
	// The function will remove leading zeros, ensuring at least one digit remains, and captures all following characters
	return page.replace(/^0+(\d.*)/, '$1');
}

function genseitenlink(record) {
	var prefix = htmlprefixbaende[record.band - 1];
	var teil = '';
	var teil2 = '';
	if (record.band == 1 || record.band == 16) {
		if ((record.sn >= 1878.5 || record.sn == 1878.0) && record.sn != 1900) {
			var teil = '-part2';
			var teil2 = '.2';
		}
		else {
			var teil = '-part1';
			var teil2 = '.1';
		}
	}
	return '<a class="oeffneModal" href="#"  band="' + record.band + '" seite="' + record.seite.toString().replace(/\D/g, '') + '" prefix="' + prefix + '" teil="' + teil + '" ><i data-toggle="tooltip" data-placement="left" title="Öffne in Viewer" class="fa fa-file-text-o"></i> Band ' + record.band + teil2 + ', Seite ' + record.seite + '</a>'
}

function meinRowWriter(rowIndex, record, columns, cellWriter) {
	var daysOfWeekDict = {
		"Sonntag": "So",
		"Montag": "Mo",
		"Dienstag": "Di",
		"Mittwoch": "Mi",
		"Donnerstag": "Do",
		"Freitag": "Fr",
		"Samstag": "Sa"
	};
	var cssClass = "list-group-item", li, seitenzahllink;
	if (show_teilnehmer) {
		let talks = Object.entries(record.ids_to_signatures)
			.map(([key, value]) => {
				adjusted_key = key - 1
				// The adjusted key should always be present, but we kept the check...
				// TODO: find and fix the "kein Datum" entries
				var datum = (protokolle[adjusted_key] && protokolle[adjusted_key].datum) ? protokolle[adjusted_key].datum : 'kein Datum';
				datum = datum.replace(/Sonntag|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag/g, match => daysOfWeekDict[match]);
				return '<a href="#id-' + key + '">' + datum + '</a>';
			}).join(', ');
		name_non_latin_span = record.name_non_latin ? '<span id="name_non_latin_span"> (' + record.name_non_latin + ')<span>' : '';
		// Creating a list of links from record.sources
		sources_link = record.sources ? ' ' + Object.entries(record.sources).map(([name, href]) => {
			return '<a href="' + href + '">' + name + '</a>';
		}).join(', ') : '';

		origin_span = record.origin ? '<span id="origin_span"> aus ' + (record.pos ? '<a href="./map/?tn='+record.id+'">' + record.origin+'</a>': record.origin) + '</span>' : '';
		let semesters = record.sns
			.map(semester => `<a href="#sn-${semester}">${semester_titles[semester.toFixed(1)][0].replace("Wintersemester", "WS").replace("Sommersemester", "SS")}</a>`)
			.join(', ');

		li = '<li class="' + cssClass + '"><div><p class="namep"> <span id="namespan">' + record.first + ' ' + record.last + name_non_latin_span + origin_span + sources_link + '</span> <a href="#tn-' + record.id + '" data-toggle="tooltip" data-placement="right" title="Einzelansicht"><i class="fa fa-link"></i></a></p><p class="linkp">Vorträge: ' + talks + ', Semester: ' + semesters + '</p></div></li>';
		return li;

	}
	else {
		seitenzahllink = genseitenlink(record);
		speakers = record.speaker;
		// TODO handle the case with multiple speakers
		let speaker_id = speakers[0]

		let speaker_name = '<a href="#tn-' + speaker_id + '">' + teilnehmer[speaker_id]["ids_to_signatures"][record.id] + '</a>';
		li = '<li class="' + cssClass + '"<div><p class="datump"><span class="datumspan">' + record.datum + '</span></p><h4>' + record.titel + '</h4><p class="namep"><span id="namespan">' + speaker_name + '</span></p><p class="linkp">' + seitenzahllink + ' <a href="#id-' + record.id + '" data-toggle="tooltip" data-placement="right" title="Einzelansicht"><i class="fa fa-link"></i></a></p></div></li>';
		return li;
	}
}

function updateDynatable() {

	var teilnehmerArray = Object.keys(teilnehmer).map(function (key) {
		var item = teilnehmer[key];
		return {
			id: key,
			name: item.name,
			name_non_latin: item.hasOwnProperty('name_non_latin') ? item.name_non_latin : '',
			origin: item.hasOwnProperty('origin') ? item.origin : '',
			pos: item.hasOwnProperty('pos') ? item.pos : '',
			first: item.first,
			last: item.last,
			sources: item.hasOwnProperty('sources') ? item.sources : '',
			ids_to_signatures: item.ids_to_signatures,
			sns: item.sns
		};
	});
	// Sorting the array alphabetically by name
	teilnehmerArray.sort(function (a, b) {
		return a.last.localeCompare(b.last, 'de', { sensitivity: 'base' }); // 'de' for German
	});


	var dataset = show_teilnehmer ? teilnehmerArray : protokolle;
	var dynatable = $('#my-final-table').data('dynatable');
	var records_name = show_teilnehmer ? "Teilnehmern" : "Protokollen";

	if (dynatable) {
		dynatable.settings.dataset.originalRecords = dataset;
		dynatable.settings.params.records = records_name;
		dynatable.process();
		tabledata = protokolle_table.data("dynatable");

	} else {
		protokolle_table = $('#my-final-table').dynatable({
			dataset: {
				records: dataset
			},
			table: {
				bodyRowSelector: 'li'
			},
			features: {
				pushState: false,
				search: false
			},
			inputs: {
				queries: $('#search'),
				paginationClass: 'pagination',
				paginationActiveClass: 'active',
				paginationDisabledClass: 'disabled',
				paginationPrev: '«',
				paginationNext: '»',
				perPageText: 'Zeige: ',
				recordCountText: '',
				perPagePlacement: 'after'
			},
			params: {
				records: records_name
			},
			writers: { _rowWriter: meinRowWriter },
		});
		$('#dynatable-record-count-my-final-table').appendTo('#erstercontainer');
		$('#dynatable-pagination-links-my-final-table').appendTo('#zweitercontainer');
		$('.dynatable-per-page').appendTo('#drittercontainer');
		tabledata = protokolle_table.data("dynatable");
	}
	$('#dynatable-record-count-my-final-table').appendTo('#erstercontainer');
	$('#dynatable-pagination-links-my-final-table').appendTo('#zweitercontainer');
	$('.dynatable-per-page').appendTo('#drittercontainer');
	protokolle_table.bind('dynatable:afterProcess', processingComplete);
	tabledata.queries.functions['frage'] = meinsort;

	function tabelleanfrage() {
		var hash = window.location.hash;
		if ((hash == '') || (hash == '#')) {
			tabledata.queries.remove("frage");
			tabledata.process();
		}
		if (hash.indexOf('-') > -1) {
			if (hash.indexOf('suche') > -1) {
				tabledata.queries.remove("frage");
				tabledata.queries.remove("search");
				tabledata.queries.add("search", hash.split('-')[1]);
				tabledata.process();
			}
			else {
				tabledata.queries.remove("frage");
				tabledata.queries.add("frage", hash.replace('#', ''));
				tabledata.process();
			}
		}
		return false;
	}
	tabelleanfrage();
	processingComplete();
	tabledata.process();
}
// This function checks the current hash and updates the Dynatable if necessary.
function checkHashAndUpdate() {
	var hash = window.location.hash;
	if (hash.match(/^#id-\d+$/)) {
		// If the hash is an ID filter, click the "Protokolle" link and update the Dynatable
		show_teilnehmer = false;
		$("#protokollelink").trigger("click"); // Simulate clicking the "Protokolle" link
	} else if (hash.match(/^#tn-\d+$/)) {
		// If the hash is an ID filter, click the "Protokolle" link and update the Dynatable
		show_teilnehmer = true;
		$("#teilnehmerlink").trigger("click"); // Simulate clicking the "Protokolle" link
	} else {
		if (show_teilnehmer) {
			$("#teilnehmerlink").trigger("click");
		} else {
			$("#protokollelink").trigger("click");
		}

	}

	updateDynatable(); // Make sure to update the Dynatable
}
$(window).on('hashchange', function () {
	checkHashAndUpdate();
});
$('.englisch').toggle();
$(document).ready(function () {
	Promise.all([window.loadProtokolle(), window.loadTeilnehmer()]).then(function (loadedProtokolle) {
		$('.englisch').toggle();
		$('[data-toggle=offcanvas]').click(function () {
			$('.row-offcanvas').toggleClass('active')
		});
		$('.heimlink #homelink a').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
			return false;
		});
		$('#homelink').hide();
		$('.navbar-brand').click(function () {
			if ($('#fkp').hasClass('active')) {
				$("a#allebaende")[0].click();
			}
			$("#protokollelink").trigger("click");
			show_teilnehmer = false;
			updateDynatable();
			return false;
		});
		$("[name='my-checkbox']").bootstrapSwitch('state', true);
		$('.switchsprache').click(function (e) {
			e.preventDefault();
			$('.englisch').toggle();
			$('.deutsch').toggle();
		});
		checkHashAndUpdate();

		$("#dynatable-per-page-my-final-table").select2({
			minimumResultsForSearch: -1
		});
		$("#teilnehmerlink").click(function (e) {
			$("#homelink").trigger("click");
			show_teilnehmer = true;
			updateDynatable();
			processingComplete();
		});
		$("#protokollelink").click(function (e) {
			$("#homelink").trigger("click");
			show_teilnehmer = false;
			updateDynatable();
			processingComplete();
		});
		$("#kommentarlabel").click(function (e) {
			e.preventDefault();
			$("[name='my-checkbox']").bootstrapSwitch('toggleState');
			processingComplete();
		});
		$('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function (event, state) {
			processingComplete();
		});


		$('#my-final-table').delegate("a.oeffneModal", "click", function (event) {
			e = $(event.target)
			var prefix = $(event.target).attr("prefix")
			var band = e.attr("band")
			var teil = e.attr("teil")
			var seite = pad(e.attr("seite"))
			var bildurl = 'http:\/\/www.uni-math.gwdg.de\/aufzeichnungen\/klein-scans\/klein\/' + prefix + '/V' + band + teil + '-p' + seite + '_low.jpg'
			var longprefix = 'http:\/\/www.uni-math.gwdg.de\/aufzeichnungen\/klein-scans\/klein\/' + prefix + '/V' + band + teil + '-p'
			hideprev(seite, band);

			processbild = "ico/proc.gif";
			$('#hauptbild').attr("src", processbild);
			$('.magnify-large').css("background", "url('" + processbild + "') no-repeat");

			$('#myModal').modal({
				"backdrop": "true",
				"show": true
			})
			$('#hauptbild').attr("band", band);
			$('#hauptbild').attr("src", bildurl);
			$('#hauptbild').attr("longprefix", longprefix);
			$('#hauptbild').attr("seite", seite);
			$('.magnify-large').css("background", "url('" + bildurl + "') no-repeat");
			fuellelowmedhigh();

			return false;
		});
		$('#myModal').on('hidden.bs.modal', function () {
			processbild = "ico/proc.gif";
			$('#hauptbild').attr("src", processbild);
			$('.magnify-large').css("background", "url('" + processbild + "') no-repeat");
		})
		$('#myModal .controls').click(function (event) {
			var currentPage = $('#hauptbild').attr("seite");
			var volume = $('#hauptbild').attr("band");

			var newPage = $(this).hasClass('previous') ? getPrevPage(currentPage, volume) : getNextPage(currentPage, volume);

			hideprev(newPage, volume); // Adapted to check if it is the first or last in sequence
			var bildurl = $('#hauptbild').attr("longprefix") + newPage + '_low.jpg';
			$('#hauptbild').attr("src", bildurl);
			$('#hauptbild').attr("seite", newPage);
			$('.magnify-large').css("background", "url('" + bildurl + "') no-repeat");
			fuellelowmedhigh();
			return false;
		});

		function hideprev(page, volume) {
			var isFirstPage = customPages[volume] ? customPages[volume][0] === page : page === "000a";
			if (isFirstPage) {
				$('#myModal .prev').addClass("disabled");
			} else {
				$('#myModal .prev').removeClass("disabled");
			}
		}
		function fuellelowmedhigh() {
			var longprefix = $('#hauptbild').attr("longprefix");
			var seite = $('#hauptbild').attr("seite");
			var band = $('#hauptbild').attr("band");
			$('#kleinpic').attr("href", longprefix + seite + '_low.jpg');
			$('#mittelpic').attr("href", longprefix + seite + '_normal.jpg');
			$('#grosspic').attr("href", longprefix + seite + '_high.jpg');
			$('#myModalLabel').html("Band " + band + ", Seite " + unpad(seite));
			return false;
		}

		$('.sucheloeschen').click(function (e) {
			e.preventDefault();
			tabledata.queries.remove('search');
			tabledata.process();
		});
		$('.einzelloeschen').click(function (e) {
			//e.preventDefault();
			tabledata.queries.remove('frage');
			tabledata.process();
		});
		$('#search').bind('keypress', function (e) {
			if (e.which == 13) {
				$("#homelink").trigger("click");
			}
		});
		$('#searchbutton').on("click", function (event) {
			$("#homelink").trigger("click");
		});
	}).catch(function (error) {
		// Handle any errors from loading the JSON here
		console.error('Failed to load protokolle or teilnehmer:', error);
	});

	$("#kalenderlink").click(function () {
		// AJAX call to load content from another HTML file
		$("#kalender").load("kalender.html", function (response, status, xhr) {
			if (status == "error") {
				var msg = "Sorry but there was an error: ";
				$("#kalender").html(msg + xhr.status + " " + xhr.statusText);
			}
		});
	});
});