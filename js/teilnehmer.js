// Define the variable that will hold data from protokolle.json
let protokolle = [];

// Define the variable that will hold data from teilnehmer.json
let teilnehmer = [];

function loadTeilnehmer() {
	return fetch('../js/data/teilnehmer.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			return response.json();
		})
		.then(data => {
			teilnehmer = data;
			return teilnehmer; // Resolve the promise with the data
		})
		.catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
			throw error; // Re-throw the error to be handled by the caller
		});
}

function loadProtokolle() {
	return fetch('../js/data/protokolle.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			return response.json();
		})
		.then(data => {
			protokolle = data;
			processProtokolle();
			return protokolle; // Resolve the promise with the data
		})
		.catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
			throw error; // Re-throw the error to be handled by the caller
		});
}

function processTeilnehmer() {

}

function processProtokolle() {
	var RMonat = new Array("I", "II", "III", "IV", "V", "VI",
		"VII", "VIII", "IX", "X", "XI", "XII");
	var Wochentag = new Array("So.", "Mo.", "Di.", "Mi.",	"Do.", "Fr.", "Sa.");
	for (var i = 0; i < protokolle.length; i++) {
		protokolle[i].titel = protokolle[i].titel.replace(/\\\[/g, "latexinlinelinks").replace(/\\\]/g, "latexinlinerechts").replace(/\[/g, "<span class=\"hiddenkomm\">[").replace(/\]/g, "]</span>").replace(/\\\\newline/g, "<br>").replace(/\\newline/g, "<br>").replace(/\\textsuperscript{(.*?)}/g, "<sup>$1</sup>").replace(/--/g, "—").replace(/\\foreignlanguage{(.*?)}{(.*?)}/g, "$1: $2").replace(/latexinlinelinks/g, "\\\[").replace(/latexinlinerechts/g, "\\\]").replace(/!eKl!/g, "\$\[\$").replace(/!eKr!/g, "\$\]\$");
		protokolle[i].ktitel = protokolle[i].ktitel.replace(/\\\[/g, "latexinlinelinks").replace(/\\\]/g, "latexinlinerechts").replace(/\[/g, "<span class=\"hiddenkomm\">[").replace(/\]/g, "]</span>").replace(/\\\\newline/g, "<br>").replace(/\\newline/g, "<br>").replace(/\\textsuperscript{(.*?)}/g, "<sup>$0</sup>").replace(/--/g, "—").replace(/\\foreignlanguage{(.*?)}{(.*?)}/g, "$1: $2").replace(/latexinlinelinks/g, "\\\[").replace(/latexinlinerechts/g, "\\\]").replace(/!eKl!/g, "\$\[\$").replace(/!eKr!/g, "\$\]\$");
		// TODO: move to processTeilnehmer
		//protokolle[i].name=protokolle[i].name.replace(/\[/g,"<span class=\"hiddenkomm\">[").replace(/\]/g,"]</span>").replace(/\\newline/g,"<br>").replace(/\\foreignlanguage{(.*?)}{(.*?)}/g,"$1: $2").replace(/\\begin\{CJK\}\{UTF8\}\{min\}吉江琢兒\\end\{CJK\}/,"japanisch: 吉江琢兒");

		if (protokolle[i].dok) {
			var dt = new Date(protokolle[i].datum);
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

			$('#einzelalarm a.controls.previous').attr("href", '#id-' + prevint)
			$('#einzelalarm a.controls.next').attr("href", '#id-' + nextint)

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
	if (typeof tabledata.settings.dataset.queries.frage != "undefined") {
		var anfrage = tabledata.settings.dataset.queries.frage.split('-');
		if ((anfrage[0] == 'band') || (anfrage[0] == 'sn')) {
			$('#seitentitel').show();
			$('#seitentitel').html(titeldict[tabledata.settings.dataset.queries.frage]);
		}
		else if (anfrage[0] == 'id') {
			$('#seitentitel').hide();

		}
		else {
			$('#seitentitel').show();
			$('#seitentitel').html('Sämtliche Teilnehmer 1872–1912');
		}
	}
	else {
		$('#seitentitel').show();
		$('#seitentitel').html('Sämtliche Teilnehmer 1872–1912');
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
function meinsemestersort(record, queryValue) {
	if (queryValue == record.sn) {
		return true;
	}
	return false;
}
function meinbandsort(record, queryValue) {
	if (queryValue == record.band) {
		return true;
	}
	return false;
}

function meinsort(record, queryValue) {
	anfrage = queryValue.split('-');
	if (anfrage[0] == "id") {
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


function pad(n) {
	return (n < 10) ? ("00" + n) : (n < 100) ? ("0" + n) : n;
}
function genseitenlink(record) {
	var prefix = htmlprefixbaende[record.band - 1];
	var teil = '';
	var teil2 = '';
	if (record.band == 1 || record.band == 16) {
		if (record.sn >= 1878 && record.sn != 1900) {
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
	var cssClass = "list-group-item", li, seitenzahllink;
	//seitenzahllink = genseitenlink(record);
	//speakers = record.speaker;
	//let speaker_name = teilnehmer[speakers[0]]["ids_to_signatures"][record.id];
	//li = '<li class="' + cssClass + '"<div><p class="datump"><span class="datumspan">' + record.datum + '</span></p><h4>' + record.titel + '</h4><p class="namep"><span id="namespan">' + speaker_name + '</span></p><p class="linkp">' + seitenzahllink + ' <a href="#id-' + record.id + '" data-toggle="tooltip" data-placement="right" title="Einzelansicht"><i class="fa fa-link"></i></a></p></div></li>';
	let talks = Object.entries(record.ids_to_signatures)
		.map(([key, value]) => {
			adjusted_key = key - 1
			// The adjusted key should always be present, but we kept the check...
			// TODO: find and fix the "kein Datum" entries
			const datum = (protokolle[adjusted_key] && protokolle[adjusted_key].datum) ? protokolle[adjusted_key].datum : 'kein Datum';
			return '<a href="../#id-' + key + '">' + datum + '</a>';
		}).join(', ');
	name_non_latin_span = record.name_non_latin ? '<span id="name_non_latin_span"> (' + record.name_non_latin + ')<span>' : '';
	// Creating a list of links from record.sources
	sources_link = record.sources ? ' ' + Object.entries(record.sources).map(([name, href]) => {
		return '<a href="' + href + '">' + name + '</a>';
	}).join(', ') : '';

	origin_span = record.origin ? '<span id="origin_span"> aus ' + record.origin + '</span>' : '';
	li = '<li class="' + cssClass + '"<div<p class="namep"> <span id="namespan">' + record.first + ' ' + record.last + name_non_latin_span + origin_span + sources_link + '</span> <a href="#id-' + record.id + '" data-toggle="tooltip" data-placement="right" title="Einzelansicht"><i class="fa fa-link"></i></a></p><p class="linkp">' + talks + '</p></div></li>';
	return li;
}
$('.englisch').toggle();
$(document).ready(function () {
	Promise.all([loadProtokolle(), loadTeilnehmer()]).then(function (loadedProtokolle) {
		$('.englisch').toggle();
		$('[data-toggle=offcanvas]').click(function () {
			$('.row-offcanvas').toggleClass('active')
		});
		$('#aboutlink a').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});
		$('.heimlink').click(function (e) {
			$("#homelink").trigger("click");
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
			$("#homelink").trigger("click");
			return false;
		});
		$("[name='my-checkbox']").bootstrapSwitch('state', true);
		$('.switchsprache').click(function (e) {
			e.preventDefault();
			$('.englisch').toggle();
			$('.deutsch').toggle();
		});
		var teilnehmerArray = Object.keys(teilnehmer).map(function (key) {
			var item = teilnehmer[key];
			return {
				id: key,
				name: item.name,
				name_non_latin: item.hasOwnProperty('name_non_latin') ? item.name_non_latin : '',
				origin: item.hasOwnProperty('origin') ? item.origin : '',
				first: item.first,
				last: item.last,
				sources: item.hasOwnProperty('sources') ? item.sources : '',
				ids_to_signatures: item.ids_to_signatures
			};
		});
		// Sorting the array alphabetically by name
		// TODO: split first and last name and sort by last name...
		teilnehmerArray.sort(function (a, b) {
			if (a.last < b.last) {
				return -1;
			}
			if (a.last > b.last) {
				return 1;
			}
			return 0;
		});
		console.log(teilnehmerArray.length)
		protokolle_table = $('#my-final-table').dynatable({
			dataset: {
				records: teilnehmerArray
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
				records: 'Teilnehmer'
			},
			writers: { _rowWriter: meinRowWriter },
		});

		$('#dynatable-record-count-my-final-table').appendTo('#erstercontainer');
		$('#dynatable-pagination-links-my-final-table').appendTo('#zweitercontainer');
		$('.dynatable-per-page').appendTo('#drittercontainer');
		tabledata = protokolle_table.data("dynatable");
		protokolle_table.bind('dynatable:afterProcess', processingComplete);
		tabledata.queries.functions['frage'] = meinsort;

		function tabelleanfrage() {
			if ((window.location.hash == '') || (window.location.hash == '#')) {
				tabledata.queries.remove("frage");
				tabledata.process();
			}
			if (window.location.hash.indexOf('-') > -1) {
				if (window.location.hash.indexOf('suche') > -1) {
					tabledata.queries.remove("frage");
					tabledata.queries.remove("search");
					tabledata.queries.add("search", window.location.hash.split('-')[1]);
					tabledata.process();
				}
				else {
					tabledata.queries.remove("frage");
					tabledata.queries.add("frage", window.location.hash.replace('#', ''));
					tabledata.process();
				}
			}
			return false;
		}
		tabelleanfrage();
		$(window).on('hashchange', function () {
			tabelleanfrage();
		});
		processingComplete();
		$("#dynatable-per-page-my-final-table").select2({
			minimumResultsForSearch: -1
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
			var seite = e.attr("seite")
			var bildurl = 'https:\/\/www.uni-math.gwdg.de\/aufzeichnungen\/klein-scans\/klein\/' + prefix + '/V' + band + teil + '-p' + pad(seite) + '_low.jpg'
			var longprefix = 'https:\/\/www.uni-math.gwdg.de\/aufzeichnungen\/klein-scans\/klein\/' + prefix + '/V' + band + teil + '-p'
			hideprev(seite);

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
			var seite = parseInt($('#hauptbild').attr("seite"));
			var prevint = parseInt(seite) - 1
			var nextint = parseInt(prevint) + 2
			var neuseite
			$('#hauptbild').hide()
			processbild = "ico/proc.gif";
			$('#hauptbild').attr("src", processbild);
			$('.magnify-large').css("background", "url('" + processbild + "') no-repeat");
			$('#hauptbild').show()
			$('#myModal').modal({
				"backdrop": "true",
				"show": true
			})
			if ($(this).hasClass('previous')) {
				neuseite = prevint;
			}
			else {
				neuseite = nextint;
			}
			hideprev(neuseite);


			var bildurl = $('#hauptbild').attr("longprefix") + pad(neuseite) + '_low.jpg';
			$('#hauptbild').attr("src", bildurl);
			$('#hauptbild').attr("seite", neuseite);
			$('.magnify-large').css("background", "url('" + bildurl + "') no-repeat");
			fuellelowmedhigh();
			return false;
		});
		function hideprev(seite) {
			if (seite == 1) {
				$('#myModal .prev').addClass("disabled");

			}
			else {
				$('#myModal .prev').removeClass("disabled");
			}
			return false;
		}
		function fuellelowmedhigh() {
			var longprefix = $('#hauptbild').attr("longprefix");
			var seite = $('#hauptbild').attr("seite");
			var band = $('#hauptbild').attr("band");
			$('#kleinpic').attr("href", longprefix + pad(seite) + '_low.jpg');
			$('#mittelpic').attr("href", longprefix + pad(seite) + '_normal.jpg');
			$('#grosspic').attr("href", longprefix + pad(seite) + '_high.jpg');
			$('#myModalLabel').html("Band " + band + ", Seite " + seite);
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
});
