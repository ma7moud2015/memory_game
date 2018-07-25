var secs = 0, // to hold seconds counts
	mins = 0, // to hold minutes counts
	clicks = 0, // to count for clicks, adds 1Click every 2 actual clicks
	sec = document.getElementById("seconds"), // get the seconds element to write  secs value inside
	min = document.getElementById("minutes"), // get the minutes element to write  mins value inside
	stbtn = document.getElementById("stplay"), // get start button to start actual game
	reset = document.getElementsByClassName("reload"), // get the reset button to reload at any time
	chsbtn = document.getElementById("difficulty"), // get the choose difficulty choice
	divs = document.getElementsByClassName("contets"), // get get the docks in the board
	hids = document.querySelectorAll("hid"), // get the hidden decks to toggle classes
	dis = document.getElementsByClassName("dis"), // get the displayed decks to toggle classes
	numOfClicks = document.getElementById("clicks"), // get the click element to write  clicks value inside
	E = document.getElementsByClassName("e"), // display 10 decks for easy mode
	M = document.getElementsByClassName("m"), // display 18 decks for medium mode
	H = document.getElementsByClassName("h"), // display 24 decks for hard mode
	complt = document.getElementById("completion"), // display congratulation message when puzzle //completion 100%
	openedCards = [], // temp array to hold opened decks
	// array for images used to append to decks * used as objects in array  during develoment process to //match each image by its type, but used src criteria instead*
	containerImgArry = [{
			"src": "Media/1.png",
			"type": "a"
	},
		{
			"src": "Media/13.png",
			"type": "b"
		},
		{
			"src": "Media/2.png",
			"type": "c"
		},
		{
			"src": "Media/7.png",
			"type": "d"
		},
		{
			"src": "Media/3.png",
			"type": "e"
		},
		{
			"src": "Media/15.png",
			"type": "f"
		},
		{
			"src": "Media/4.png",
			"type": "g"
		},
		{
			"src": "Media/9.png",
			"type": "h"
		},
		{
			"src": "Media/5.png",
			"type": "i"
		},
		{
			"src": "Media/10.png",
			"type": "j"
		},
		{
			"src": "Media/11.png",
			"type": "k"
		},
		{
			"src": "Media/12.png",
			"type": "l"
		}];
/*function trigered when hitting start button:
1. hiding choose difficulty option.
2. start timers.
3. hide images after showing for .8 seconds for easiness.
4. no more start button clickable.
5. creating related no. of images for easy, medium , and hard modes ant appent to decks.
*/
function start() {
	"use strict";
	chsbtn.setAttribute("class", "hid");
	scndsCount();
	setTimeout(doHide, 800);
	stbtn.removeEventListener("click", start);
	for (let c = 0; c < divs.length; c++) {
		divs[c].addEventListener("click", cardOpened);
		divs[c].addEventListener("click", tryMe);
	}
	if (chsbtn.value === "Easy") {
		var result = getRandomArrElem(containerImgArry, 5);
		for (let j = 0; j < 10; j++) {
			if (j < 5) {
				var imgs = new Image();
				imgs.src = result[j].src;
				imgs.setAttribute("data-img-type", result[j].type);
				divs[j].appendChild(imgs);
			} else {
				var imgs2 = new Image();
				result.sort((a, b) => a.type < b.type);
				imgs2.src = result[j - 5].src;
				imgs2.setAttribute("data-img-type", result[j - 5].type);
				divs[j].appendChild(imgs2);
			}
		}
	}
	if (chsbtn.value === "Medium") {
		var result = getRandomArrElem(containerImgArry, 9);
		for (let j = 0; j < 18; j++) {
			if (j < 9) {
				var imgs = new Image();
				imgs.src = result[j].src;
				imgs.setAttribute("data-img-type", result[j].type);
				divs[j].appendChild(imgs);
			} else {
				var imgs2 = new Image();
				result.sort((a, b) => a.type < b.type);
				imgs2.src = result[j - 9].src;
				imgs2.setAttribute("data-img-type", result[j - 9].type);
				divs[j].appendChild(imgs2);
			}
		}
	}
	if (chsbtn.value === "Hard") {
		var result = getRandomArrElem(containerImgArry, 12);
		for (let j = 0; j < 24; j++) {
			if (j < 12) {
				var imgs = new Image();
				imgs.src = result[j].src;
				imgs.setAttribute("data-img-type", result[j].type);
				divs[j].appendChild(imgs);
			} else {
				var imgs2 = new Image();
				result.sort((a, b) => a.type < b.type);
				imgs2.src = result[j - 12].src;
				imgs2.setAttribute("data-img-type", result[j - 12].type);
				divs[j].appendChild(imgs2);
			}
		}
	}
}
/*funtion loaded on window.load to dynamically display easy, medium , and hard related no. of decks*/
function display() {
	"use strict";
	if (chsbtn.value === "Easy") {
		document.body.style.height = "100vh";
		for (let i = 0; i < H.length; i++) {
			if (H[i].classList.contains("e")) {
				E[i].classList.replace("hid", "dis");
			} else {
				H[i].classList.replace("dis", "hid");
			}
		}
	} else if (chsbtn.value === "Medium") {
		document.body.style.height = "150vh";
		for (let i = 0; i < H.length; i++) {
			if (H[i].classList.contains("m")) {
				M[i].classList.replace("hid", "dis");
			} else {
				H[i].classList.replace("dis", "hid");
			}
		}
	} else {
		document.body.style.height = "170vh";
		for (let i = 0; i < H.length; i++) {
			H[i].classList.replace("hid", "dis");
		}
	}
}
/*function to count no. of clicks*/
function clicksCount() {
	clicks++;
	numOfClicks.innerHTML = clicks;
}
/* function for timer*/
function scndsCount() {
	secs++;
	if (secs === 60) {
		mins++;
		secs = 0;
	}
	var minuts = (mins < 10) ? ("0" + mins) : (mins);
	var secons = (secs < 10) ? ("0" + secs) : (secs);
	sec.innerHTML = secons;
	min.innerHTML = minuts;
	var timer = setTimeout(scndsCount, 1000);
	/*return timer;
	return secons;
	return minuts;*/
}
/*function for creating random images array every new game starts*/
function getRandomArrElem(arr, count) {
	var shuffled = arr.slice(0),
		i = arr.length,
		min = i - count,
		temp,
		index;
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random());
		temp = shuffled[index];
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
	}
	return shuffled.slice(min);
}
/*function to toggle images on/off ,and on-image is inclickable anymore*/
function tryMe() {
	this.firstChild.classList.add("open");
	this.firstChild.classList.remove("lolo");
	this.removeEventListener("click", cardOpened);
	this.removeEventListener("click", tryMe);
}
/*function to test matched/unmatched decks*/
function cardOpened() {
	openedCards.push(this.firstChild);
	if (openedCards.length === 2) {
		clicksCount();
		if (openedCards[1].classList.contains("match")) {
			openedCards.pop();
		}
		if (openedCards[0].src === openedCards[1].src) {
			matched();
		} else {
			unMatched();
		}
	}
}
/*easiness function that hids displayed images after .8 seconds*/
function doHide() {
	let imgs = document.getElementsByTagName("img");
	for (m = 0; m < imgs.length; m++) {
		imgs[m].classList.toggle("lolo");
	}
	clearTimeout(doHide);
}
/*1.matched images go green. and are inclickable anymore
  2.creating matched array to hold matched decks and finish game when 100% complete*/
function matched() {
	openedCards[0].classList.add("match");
	openedCards[1].classList.add("match");
	openedCards[0].classList.remove("open");
	openedCards[1].classList.remove("open", "lolo");
	openedCards = [];
	var mached = document.getElementsByClassName("match");
	for (let o = 0; o < mached.length; o++) {
		mached[o].parentNode.removeEventListener("click", cardOpened);
		mached[o].parentNode.removeEventListener("click", tryMe);
	}
	complt.innerHTML = (mached.length / dis.length) * 100;
	if (((mached.length / dis.length) * 100) === 100) {
		finished();
	}
}
/*unmatched decks go red for .7 seconds and then hidden and clickable again*/
function unMatched() {
	openedCards[0].classList.add("unmatched");
	openedCards[1].classList.add("unmatched");
	setTimeout(function () {
		openedCards[0].classList.remove("open", "unmatched");
		openedCards[1].classList.remove("open", "unmatched");
		openedCards[0].classList.add("lolo", "clk");
		openedCards[1].classList.add("lolo", "clk");
		openedCards = [];
		var clked = document.getElementsByClassName("clk");
		for (let c = 0; c < clked.length; c++) {
			clked[c].parentNode.addEventListener("click", cardOpened);
			clked[c].parentNode.addEventListener("click", tryMe);
		}
	}, 700);
}
/*display congratulation message includes rating based on difficulty mode and some game statisticks */
function finished(timer, clicks, minuts, secons) {
	var a = document.getElementById("window"),
		b = document.getElementById("clicks2"),
		star = document.getElementsByClassName("star"),
		m2 = document.getElementById("minutes2"),
		s2 = document.getElementById("seconds2");
	clearTimeout(timer);
	a.style.margin = 0;
	b.innerHTML = numOfClicks.innerHTML;
	m2.innerHTML = min.innerHTML;
	s2.innerHTML = sec.innerHTML;
	if (chsbtn.value === "Easy") {
		var com = Number(b.innerHTML);
		if (com < 8) {
			star[0].src = "Media/star-image.jpg";
			star[1].src = "Media/star-image.jpg";
			star[2].src = "Media/star-image.jpg";
			console.log("3stars");
		} else if (7 < com < 11) {
			star[0].src = "Media/star-image.jpg";
			star[1].src = "Media/star-image.jpg";
			star[2].src = "Media/icons8-star-50.png";
			console.log("2stars");
		} else {
			star[0].src = "Media/star-image.jpg";
			star[1].src = "Media/icons8-star-50.png";
			star[2].src = "Media/icons8-star-50.png";
			console.log("1star");
		}
	}
	if (chsbtn.value === "Medium") {
		a.style.height = "150vh";
		var com = Number(b.innerHTML);
		if (com < 12) {
			star[0].src = "Media/star-image.jpg";
			star[1].src = "Media/star-image.jpg";
			star[2].src = "Media/star-image.jpg";
		}
		if (11 < com < 15) {
			star[0].src = "Media/star-image.jpg";
			star[1].src = "Media/star-image.jpg";
			star[2].src = "Media/icons8-star-50.png";
		}
		if (com > 14) {
			star[0].src = "Media/star-image.jpg";
			star[1].src = "Media/icons8-star-50.png";
			star[2].src = "Media/icons8-star-50.png";
		}
	}
	if (chsbtn.value === "Hard") {
		a.style.height = "170vh";
		var com = Number(b.innerHTML);
		if (com < 16) {
			star[0].src = "Media/star-image.jpg";
			star[1].src = "Media/star-image.jpg";
			star[2].src = "Media/star-image.jpg";
		}
		if (15 < com < 20) {
			star[0].src = "Media/star-image.jpg";
			star[1].src = "Media/star-image.jpg";
			star[2].src = "Media/icons8-star-50.png";
		}
		if (com > 19) {
			star[0].src = "Media/star-image.jpg";
			star[1].src = "Media/icons8-star-50.png";
			star[2].src = "Media/icons8-star-50.png";
		}
	}
}
window.onload = display();
stbtn.addEventListener("click", start);
for (let t = 0; t < reset.length; t++) {
	reset[t].addEventListener("click", function () {
		location.reload();
	});
}
chsbtn.addEventListener("change", display);
