
let semester_titles = {
  "1872.0": ["Sommersemester 1872", "Seminar (mit Clebsch zusammen) über verschiedene, hauptsächlich geometrische Gegenstände"],
  "1872.5": ["Wintersemester 1872/73", "Seminar über verschiedene Gegenstände"],
  "1873.0": ["Sommersemester 1873", "Seminar über verschiedene Gegenstände der Geometrie und Algebra"],
  "1873.5": ["Wintersemester 1873/74", "Seminar über verschiedene Gegenstände der Geometrie und Algebra"],
  "1874.0": ["Sommersemester 1874", "Seminar über geometrische Gegenstände"],
  "1874.5": ["Wintersemester 1874/75", "Seminar über verschiedene Gegenstände der Geometrie und Algebra"],
  "1875.0": ["Sommersemester 1875", "Seminar über ausgewählte Gegenstände der mathematischen Physik"],
  "1875.5": ["Wintersemester 1875/76", "Seminar über verschiedene Gegenstände"],
  "1876.4": ["Vorträge Sommersemester 1876", "??Proseminar über verschiedene Gegenstände"],
  "1876.5": ["Wintersemester 1876/77", "Seminar über verschiedene Gegenstände"],
  "1876.5": ["Wintersemester 1876/77", "Seminar über verschiedene Gegenstände der Geometrie und Algebra"],
  "1876.9": ["Vorträge Wintersemester 1876/77", "Proseminar über verschiedene Gegenstände"],
  "1877.0": ["Sommersemester 1877", "Seminar über verschiedene Gegenstände der Geometrie und elliptische Funktionen"],
  "1877.4": ["Vorträge Sommersemester 1877", "Proseminar über verschiedene Gegenstände"],
  "1877.5": ["Wintersemester 1877/78", "Seminar über Geometrie und Invariantentheorie"],
  "1877.9": ["Vorträge Wintersemester 1877/78", "Proseminar über ausgewählte Gegenstände der mathematischen Physik"],
  "1878.0": ["Sommersemester 1878", "Seminar über verschiedene Gegenstände"],
  "1878.4": ["Vorträge Sommersemester 1878", "Proseminar über ausgewählte Gegenstände der mathematischen Physik"],
  "1878.5": ["Wintersemester 1878/79", "Seminar über Geometrie und elliptische Funktionen"],
  "1879.0": ["Sommersemester 1879", "Seminar über Geometrie und elliptische Funktionen"],
  "1879.5": ["Wintersemester 1879/80", "Seminar über Geometrie und elliptische Funktionen"],
  "1880.0": ["Sommersemester 1880", "Seminar über elliptische Funktionen"],
  "1880.5": ["Wintersemester 1880/81", "Seminar über Geometrie und Funktionentheorie"],
  "1881.0": ["Sommersemester 1881", "Seminar über Geometrie und Funktionentheorie"],
  "1881.5": ["Wintersemester 1881/82", "Seminar über Funktionentheorie (Klein trägt selbst über seine Schrift \"Über Riemanns Theorie der algebraischen Funktionen und ihre Integrale\" vor)"],
  "1882.0": ["Sommersemester 1882", "Seminar über Fouriersche Reihen und Funktionentheorie"],
  "1882.5": ["Wintersemester 1882/83", "Seminar (nur bis Weihnachten) über hyperelliptische, Abelsche und Thetafunktionen"],
  "1883.0": ["Sommersemester 1883", "Seminar über lineare Differentialgleichungen und die hypergeometrische Funktion (von Pfingsten an durch Dyck abgehalten)"],
  "1883.5": ["Wintersemester 1883/84", "Seminar über elementare Funktionentheorie"],
  "1884.0": ["Sommersemester 1884", "Seminar über elleiptische Funktionen"],
  "1884.5": ["Wintersemester 1884/85", "Seminar über elliptische Funktionen; Klein trägt selbst mehrmals über elliptische Normalkurven vor"],
  "1885.0": ["Sommersemester 1885", "Seminar über algebraische Funktionen und ihre Integrale"],
  "1885.5": ["Wintersemester 1885/86", "Seminar über hyperelliptische Funktionen und die Kummersche Fläche"],
  "1886.0": ["Sommersemester 1886", "Seminar über reguläre Körper und Dreiecksfunktionen"],
  "1886.5": ["Wintersemester 1886/87", "Seminar über Gruppentheorie und algebraische Gleichungen"],
  "1887.0": ["Sommersemester 1887", "Seminar über die Kreiseltheorie"],
  "1887.4": ["Colloquium Sommer 1887", "Kolloquium über Gruppentheorie und algebraische Gleichungen"],
  "1887.5": ["Wintersemester 1887/88", "Seminar über hyperelliptische Funktionen"],
  "1888.0": ["Sommersemester 1888", "Seminar über hyperelliptische Funktionen"],
  "1888.5": ["Wintersemester 1888/89", "Seminar über Abelsche Funktionen"],
  "1889.5": ["Wintersemester 1889/90", "Seminar über partielle Differentialgleichungen der Physik, über Zykliden und Lamésche Funktionen"],
  "1890.0": ["Sommersemester 1890", "Seminar über Besselsche Funktionen, Kugelfunktionen und hypergeometrische Funktionen"],
  "1891.0": ["Sommersemester 1891", "Seminar über hypergeometrische und automorphe Funktionen"],
  "1891.5": ["Wintersemester 1891/92", "Seminar über hypergeometrische und Lamésche Funktionen"],
  "1892.0": ["Sommersemester 1892", "Seminar über Zahlentheorie"],
  "1892.5": ["Wintersemester 1892/93", "Seminar über verschiedene Gegenstände"],
  "1893.0": ["Sommersemester 1893", "Seminar über Wahrscheinlichkeitsrechnung"],
  "1893.5": ["Wintersemester 1893/94", "Seminar über lineare Differentialgleichungen und die P-Funktion"],
  "1894.0": ["Sommersemester 1894", "Seminar über lineare Differentialgleichungen und Kugelfunktionen"],
  "1894.5": ["Wintersemester 1894/95", "Seminar über die Grundlagen der Analysis bei Funktionen einer Veränderlichen"],
  "1895.0": ["Sommersemester 1895", "Seminar über die Grundlagen der Analysis bei Funktionen mehrerer Veränderlichen, Differenzenrechnung"],
  "1895.5": ["Wintersemester 1895/96", "Seminar über Zahlentheorie"],
  "1896.0": ["Sommersemester 1896", "Seminar über Zahlentheorie"],
  "1896.5": ["Wintersemester 1896/97", "Seminar (mit Hilbert zusammen) über Funktionentheorie und konforme Abbildung"],
  "1897.0": ["Sommersemester 1897", "Seminar (mit Hilbert zusammen) über Funktionentheorie"],
  "1897.5": ["Wintersemester 1897/98", "Seminar (mit Hilbert zusammen) über Mechanik"],
  "1898.0": ["Sommersemester 1898", "Seminar (mit Hilbert zusammen) über Mechanik"],
  "1898.5": ["Wintersemester 1898/99", "Seminar über die Analysis reeller Funktionen"],
  "1899.0": ["Sommersemester 1899", "Seminar über Funktionentheorie und Potentialtheorie"],
  "1899.5": ["Wintersemester 1899/1900", "Seminar über die Theorie der Schiffsbewegung"],
  "1900.0": ["Sommersemester 1900", "Seminar (mit Abraham zusammen) über technische Anwendungen der Elastizitätstheorie"],
  "1900.5": ["Wintersemester 1900/01", "Seminar über projektive Geometrie und darstellende Geometrie"],
  "1901.0": ["Sommersemester 1901", "Seminar über Geodäsie"],
  "1901.5": ["Wintersemester 1901/02", "Seminar über ausgewählte Kapitel der Mechanik"],
  "1902.0": ["Sommersemester 1902", "Seminar (mit Schwarzschild zusammen) über Astronomie"],
  "1902.5": ["Wintersemester 1902/03", "Seminar (mit Schwarzschild zusammen) über Prinzipien der Mechanik"],
  "1903.0": ["Sommersemester 1903", "Seminar (mit Schwarzschild zusammen) über graphische Statik und Festigkeitslehre"],
  "1903.5": ["Wintersemester 1903/04", "Seminar (mit Schwarzschild zusammen) über ausgewählte Kapitel der Hydrodynamik"],
  "1904.0": ["Sommersemester 1904", "Seminar (mit Schwarzschild, Brendel, und Carathéodory) über Wahrscheinlichkeitsrechnung"],
  "1904.5": ["Wintersemester 1904/05", "Seminar (mit Prandtl, Runge, Voigt zusammen) über ausgewählte Kapitel der Elastizitätstheorie"],
  "1905.0": ["Sommersemester 1905", "Seminar (mit Prandtl, Runge, Simon zusammen) über Elektrotechnik"],
  "1905.5": ["Wintersemester 1905/06", "Seminar (mit Hilbert und Minkowski zusammen): Vorträge von Klein über lineare Differentialgleichungen und automorphe Funktionen"],
  "1906.0": ["Sommersemester 1906", "Seminar (mit Hilbert und Minkowski zusammen) über lineare Differentialgleichungen und automorphe Funktionen"],
  "1906.5": ["Wintersemester 1906/07", "Seminar (mit Hilbert und Minkowski zusammen) über lineare Differentialgleichungen und automorphe Funktionen"],
  "1907.0": ["Sommersemester 1907", "Seminar (mit Hilbert und Minkowski zusammen) Vorträge von Klein über lineare Differentialgleichungen und automorphe Funktionen"],
  "1907.5": ["Wintersemester 1907/08", "Seminar (mit Prandtl, Runge, Wiechert zusammen) über Hydrodynamik"],
  "1908.0": ["Sommersemester 1908", "Seminar (mit Prandtl, Runge, Wiechert zusammen) über Schiffstheorie und dynamische Meteorologie"],
  "1908.5": ["Wintersemester 1908/09", "Seminar (mit Prandtl und Runge zusammen) über Theorie der Baukonstruktionen"],
  "1909.0": ["Sommersemester 1909", "Seminar (mit Prandtl und Runge zusammen) über Festigkeitslehre"],
  "1909.5": ["Wintersemester 1909/10", "Seminar über Mathematik und Psychologie"],
  "1910.5": ["Wintersemester 1910/11", "Seminar über mathematischen Unterricht"],
  "1911.0": ["Sommersemester 1911", "Seminar (mit Bernstein zusammen) über Versicherungsmathematik"],
  "1911.5": ["Wintersemester 1911/12", "Seminar über Geschichte der Infinitesimalrechnung (von Ende November ab durch Herrn Schimmack geleitet)"],
  "1912.0": ["Sommersemester 1912", "Das angekündigte Seminar über Fragen des Unterrichtswesens wird durch Herrn Schimmack geleitet"],
};


function loadTeilnehmer() {
    console.log("loading teilnehmer");
	return fetch('./js/data/teilnehmer.json')
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
};

window.loadTeilnehmer = loadTeilnehmer;


function loadProtokolle() {
    console.log("loading protokolle");
	return fetch('./js/data/protokolle.json')
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
};
window.loadProtokolle = loadProtokolle;
