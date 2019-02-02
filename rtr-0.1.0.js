/*
 Realtime Rail Javascipt v 0.1.0 (c) James Fennell 2018

 This file has a number of distinct sections

 * Data section: contains constants and data related to the subway (for example, the subway colors).
 
 * Page navigation section: controls the process of changing pages (animation, updating the history, etc) and also related functionality
   like the reload and back buttons. The code that launches the homepage on startup is included here.
 
 * Utilities section: contains some random functions such as a function that converts a route_id into the html for the route logo image.
   If a function has not place elsewhere, it's in here.
 
 * Service status section: code to fetch and display the service status on the home page.
 
 * The last four sections contain code for, respectively:
    * Home page
    * Route page
    * Stop page
    * Trip page
   In general, the page loading process is (page requested from user) -> load_[page](id) called -> AJAX request sent -> update_[page](json) called
   with AJAX response as an argument. Each also has a load_[page]_from_event(event), which maps to load_[page](id).
   The home page does not have a update_home() function because the home page doesn't require AJAX. However there is a generate_home() function
   which generates the home page html.
*/


// DATA SECTION

var fade_time = 150  // specifies, in milliseconds, how long the fade out/in animations should take

var current_time = Math.floor((new Date()).getTime() / 1000)

var route_colors = {
	"1": "#ee352e",
	"2": "#ee352e",
	"3": "#ee352e",
	"g": "#6cbe45",
	"a" : "#2850ad",
	"c" : "#2850ad",
	"e" : "#2850ad",
	"b" : "#ff6319",
	"d" : "#ff6319",
	"f" : "#ff6319",
	"m" : "#ff6319",
	"j" : "#996633",
	"z" : "#996633",
	"l" : "#a7a9ac",
	"n" : "#fccc0a",
	"q" : "#fccc0a",
	"r" : "#fccc0a",
	"w" : "#fccc0a",
	"7" : "#b933ad",
	"4" : "#00933c",
	"5" : "#00933c",
	"5x" : "#00933c",
	"6" : "#00933c",
	"6x" : "#00933c",
	"s" : "gray",
	"gs" : "gray",
	"si" : "navy"
}

// These variables will become jQuery references to the associated elements on load up
var $home = null
var $route = null
var $stop = null
var $trip = null
var $loading = null
var $header = null
var $footer = null
var $pages = null

// PAGE NAVIGATION SECTION

// This specifies what to do on start up.
$(document).ready(function() {
	// Populate the jQuery handlers
	$home = $('#home')
	$route = $('#route')
	$stop = $('#stop')
	$trip = $('#trip')
	$loading = $('#loading')
	$header = $('#header')
	$footer = $('#footer')
	$pages = $('#pages')

	// The history entry is special here as it *replaces* the history. In future, history pages are made when the page changes.
	window.history.replaceState({page : 'home', uid : '' },'','')
	generate_home()
	show_page('home')
})

// This function is called when the user clicks the reload button...
function reload() {
	load_page_from_event(window.history)
}
//...while this function is called if the user presses the back button on the app OR on their phone/web browser
window.onpopstate = load_page_from_event

// In both cases this function is called.
// Note that in the reload case we don't want to write a new history entry, whereas for the back button event we do.
// This is handled downstream in the update_history() function, which is called though load_[page]().
function load_page_from_event(event) {
	if (event.state.page == 'stop') {
		load_stop(event.state.uid)
	}
	if (event.state.page == 'route') {
		load_route(event.state.uid)
	}
	if (event.state.page == 'trip') {
		load_trip(event.state.uid)
	}
	if (event.state.page == 'home') {
		load_home()
	}

}

function hide_all_pages() {
	// The current time is rest, so that new data received on the page reload is interpreted correctly.
	// However, this should really be in update_[page]() functions, as the JSON request may take multiple seconds
	current_time = Math.floor((new Date()).getTime() / 1000)

	// The ordering of the routes in the loading animation is now shuffled.
	// This ensures that a new route is almost always seen in the animation.
	$('#spinner', $loading).shuffleChildren();

	// Fade out the pages and the footer.
	$pages.fadeOut(fade_time);
	$footer.fadeOut(fade_time);

	// Place the shield over the header, and fade it slightly to indicate it's out of use.
	$header.fadeTo(fade_time, 0.5);
	$('header-shield', $header).css('display', 'block');

	//When the fade out is complete, begin the animation.
	setTimeout(function(){
		$loading.css('display', 'block')
	}, fade_time*1.2)
}

function show_page(name) {
	// Hide the other pages
	$home.css('display','none')
	$route.css('display','none')
	$stop.css('display','none')
	$trip.css('display','none')

	//Show the relevant page
	$('#' + name).css('display','block')

	//Fade in the header, page and footer
	$pages.fadeIn(fade_time);
	$footer.fadeIn(fade_time);
	$header.fadeTo(fade_time, 1);

	// When the page is faded in, turn off the loading screen. 
	// Even in the background, this can have significant CPU costs unless fully disabled.
	// The header shield is also lifted at this point.
	setTimeout(function(){ 
		$loading.css('display', 'none');
		$('#header-shield', $header).css('display', 'none');
	}, fade_time*2)
}


// Set the current history state.
// If the current history state is the same as the new state, do nothing (presumed to be a reload).
function set_history_state(page, uid, url) {
	if (window.history.state != null) {
		if ((window.history.state.uid == uid) && (window.history.state.page == page)) {
			return
		}
	}
	url = '' // The url feature has yet to be implemented (requires backend work as well)
	window.history.pushState({page : page, uid : uid },'',url)
}


// UTILITY FUNCTIONS SECTION

// Return a HTML element of the route logo, clickable to go to that route page.
function route_logo(route_id) {
	$img = $('<img src="/images/routes/' + route_id.toLowerCase() + '.svg">')
	$img.click({route_id : route_id}, load_route_from_event)
	return $img
}

// Replace route markers of the form [L] in a service message with the relevant image.
function insert_images_in_message(message) {
	// The function works recursively. It finds the first occurrence of [<route_id>]. What comes before is left intact,
	// the [<route_id>] string is replaced by an image, and the remainder of the message is processed by the same function
	// to see if there another [<route_id>] string.
	a = message.indexOf('[')
	b = message.indexOf(']', a)
	if (a<0 || b<0) {
		return message
	}
	pre = message.substring(0,a)
	route_id = message.substring(a+1,b)
	post = message.substring(b+1)
	return pre + '<img src="/images/routes/' + route_id.toLowerCase() + '.svg">' + insert_images_in_message(post)
}

// This jQuery extension shuffles the children of the element it is called on.
// It is used in the loading animation to shuffle the order in which the route logos appear
$.fn.shuffleChildren = function() {
    $.each(this.get(), function(index, el) {
        var $el = $(el);
        var $find = $el.children();

        $find.sort(function() {
            return 0.5 - Math.random();
        });

        $el.empty();
        $find.appendTo($el);
    });
};

// This jQuery extension sets the route color of a list of stops element.
$.fn.set_color = function(color) {
	this.find('.los-route-bar').css('border-color',color)
	this.find('.los-route-start').css('background',color)
	this.find('.los-route-end').css('background',color)
	this.find('#los-separator-trip-arrow').css('border-top-color',color)
}


// SERVICE STATUS SECTION

// Because the service status changes so infrequently, it is only ever loaded once.
// The following variable keeps track of whether it has been loaded.
var service_status_loaded = false

function load_service_status() {
	// If the service status hasn't been loaded, fade out the button text and initiate the AJAX request.
	if (!service_status_loaded){
		$service_status_button = $('#home-status span', $home)
		$service_status_button.fadeOut(fade_time)
		service_status_loaded = true
		setTimeout(function(){
			$.ajax({dataType: "json", url: "/json/service_status.json", success: update_service_status, cache: false});
		}, fade_time)
	}
}

function update_service_status(json, status){
	var all_good_service = true
	// Iterate over each service status message
	$.each(json,function(){
		$service_status_marker = $('#home-route-' + this.route_id.toLowerCase() + ' .home-row-route-status', $home)
		// The type of message determines the color of the marker - orange for these...
		if (this.service_status == "Planned Work" || this.service_status == "Service Change") {
			$service_status_marker.addClass('orange')
		}
		//... and red for these
		if (this.service_status == "Delays" ){
			$service_status_marker.addClass('red')
		}
		// Fade in the marker.
		$service_status_marker.fadeIn(fade_time)
		all_good_service = false
	})
	// The message depends on whether there are planned/works or delays.
	if (all_good_service) {
		$('#home-status span', $home).text('Good service on all lines')
	}
	else{
		$('#home-status span', $home).text('Good service except where marked')
	}
	// Fade in the message.
	$('#home-status', $home).css('cursor', 'default')
	$('#home-status span', $home).fadeIn(150)
	service_status_loaded = true
}

// HOME PAGE

function load_home() {
	set_history_state('home','','')
	hide_all_pages()
	setTimeout(function(){
		show_page('home')
	},fade_time)
}

function generate_home() {
	// This defines the layout of the routes of the homepage.
	layout = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "g", "l"],
		["a", "c", "e"],
		["b", "d", "f", "m"],
		["n", "q", "r", "w"],
		["j", "z"],
		["gs", "si"]
	]
	// Based on the layout, the page is constructed.
	for(var i=0, len=layout.length; i < len; i++){
		cols = layout[i].length
		$new_row = $('<div class="home-row"></div>')
		$new_row.append('<div class="home-row-spacer-' + cols + '"></div>')
		for(var j=0; j < cols; j++) {
			$new_route = $('<div class="home-row-route" id="home-route-' + layout[i][j] + '"></div>')
			$new_route.append('<div class="home-row-route-status"></div>')
			$new_route.append('<img src="/images/routes/' + layout[i][j] + '.svg">')
			$new_row.append($new_route)
			$new_route.click({route_id : layout[i][j]}, load_route_from_event)
		}
		$new_row.append('<div class="home-row-spacer-' + cols + '"></div>')
		$home.append($new_row)
	}
	$('#route-s', $home).append('<div class="home-row-route-title">42nd Street Shuttle</div>')
	$('#route-si', $home).append('<div class="home-row-route-title">Staten Island Railway</div>')
	$home.append('<div class="home-row"></div>')
}

// ROUTE PAGE

function load_route_from_event(event) {
	load_route(event.data.route_id)
}

function load_route(route_id) {
	hide_all_pages()
	setTimeout(function(){
		$.ajax({dataType: "json", url: "/json/routes/" + route_id + ".json", success: update_route, cache: false});
	},fade_time)
}

function update_route(json, status){
	// FIRST (of 3): Set the route image
	var route_id = json.route_id
	$('#route-logo img', $route).attr('src', '/images/routes/' + route_id.toLowerCase() + '.svg')

	// FIRST and a half: determine if the feed has not been updated recently, and note if it hasn't.
	if (current_time - json.feed_last_updated > 180) {
		$('#route-bad-feed', $route).css('display', 'block')
		$('#route-bad-feed-route', $route).attr('src', '/images/routes/' + route_id.toLowerCase() + '.svg')
		$('#route-bad-feed-mins', $route).text(  Math.floor((current_time-json.feed_last_updated)/60) )
	}
	else {
		$('#route-bad-feed', $route).css('display', 'none')
	}

	// SECOND: set the service status indicators, of which there are a few.
	// There is main button that gives the service status text, with a relevant color
	// (green=good service, red=delays, orange=service change or planner work, white=no service)
	// Depending on the service status there are also other elements, 
	// * Good service: an estimated frequency message
	// * No service: a message suggestion to check the stops anyway for alternative trains
	// * Other statuses: a drop down message box containing details
	
	// We cache handles to the service status elements for performance first.
	var $route_status_button = $('#route-status-button', $route)
	var $route_status_messages = $('#route-status-messages-cont', $route)
	var $route_status_frequency = $('#route-status-frequency', $route)
	var $route_status_no_service = $('#route-status-no-service', $route)

	// Then reset them.
	$route_status_button.html(json.service_status)
	$route_status_button.off("click") // removes clickability if previously displayed a status with a drop down message
	$route_status_button.css('cursor', 'default') // again, the pointer cursor is a possible artifact of a previous status
	$route_status_button.removeClass() // the class of the button determines its color, so reset
	$route_status_messages.css('display', 'none')
	$route_status_frequency.css('display', 'none')
	$route_status_no_service.css('display', 'none')

	// What happens next is determined by the service status.
	// If good service, make the button green and display the frequency information.
	if (json.service_status == "Good Service"){
		$route_status_button.addClass('green')
		if (json.hasOwnProperty('frequency')){
			$('#mins', $route_status_frequency).html(json.frequency)
			$route_status_frequency.css('display', 'block')
		}
	}
	// If no service, make the button white and display the no service message.
	else if (json.service_status == "No Service"){
		$route_status_button.addClass('white')
		$route_status_no_service.css('display', 'block')
	}
	//Otherwise display the relevant button and the service announcements
	else {
		//Depending on the service status severity, a different color is used for the button
		if (json.service_status == "Delays") {
			$route_status_button.addClass('red')
		}
		else {
			$route_status_button.addClass('orange')
		}
		//The service status button will be used to open messages, so mark it as a button
		$route_status_button.css('cursor', 'pointer')

		//Populate the messages container with messages
		var first_message = true
		$route_status_messages.html('') // delete previous messages
		$route_status_messages.css('display', 'none') // the messages are hidden by default, they may be open from previous status
		$.each(json.service_status_messages, function(){
			$new_message = $('<div class="route-status-message"></div>')
			// jQuery's slideDown/slideUp interacts funkily with margins at the top and bottom of the sliding element.
			// A spacer is used between messages instead to avoid using the css margin attribute
			if (first_message == true) {
				first_message = false
			}
			else {
				$new_message.append('<p class="route-status-message-spacer"></div>')
			}
			$new_message.append('<p class="route-status-message-title">' + insert_images_in_message(this.message_heading) + '</p>')
			// Sometimes the MTA doesn't provide description text in a non-html format
			// (ironically, this is usually when the service change is the most serious)
			// so instead a link is added to the MTA website.
			if (this.message_text == ''){
				$new_message.append('<p class="route-status-message-body">See the <a href="http://www.mta.info">MTA website</a> for information.</p>')
			}
			else {
				$new_message.append('<p class="route-status-message-body">' + insert_images_in_message(this.message_text) + '</p>')
			}
			$new_message.append('<p class="route-status-message-time">' + this.posted_time + '</p>')
			$route_status_messages.append($new_message)
		})

		//Make the service status button clickable to open the messages
		$route_status_button.click(function(){
			var $route_status_messages = $('#route-status-messages-cont', $route)
			if ($route_status_messages.css('display') == 'none') {
				$route_status_messages.slideDown()
			}
			else {
				$route_status_messages.slideUp()
			}
		})
	}

	// THIRD: Make the list of stops structure.
	var $los = $('#route-list-of-stops', $route)
	$los.html('<div class="los-route-bar"></div>' + 
		  '<div class="los-route-start"></div>' +
		  '<div class="los-route-end"></div>')
	$los.set_color(route_colors[route_id.toLowerCase()])
	// Now iterate through all of the stops.
	// We keep a track of the borough to know when to note that the borough has changed.
	var borough = null
	$.each(json.stops,function(){
		// Place the borough, if it has changed since the last stop.
		// By default, the borough of the first stop is not specified.
		if(borough == null){
			borough = this.borough
		}
		else if(borough != this.borough) {
			var $borough_divider =	'<div class="los-separator">' +
						'<div class="los-separator-borough-name">' + borough + '</div>' +
						'<div class="los-separator-borough-name">' + this.borough + '</div>' +
						'</div>'
			$los.append($borough_divider)
			borough = this.borough
		}
		//Now place the stop proper
		var stop_uid = this.stop_uid
		var name = this.name
		$new_stop = $('<div class="los-entry"></div>').text(name)
		$los.append($new_stop)
		//If trains are stopping here, add a stop marker
		if (this.current_service)  {
			$new_stop.html('<div class="los-stop-marker"></div>' + name) 
		}
		//Otherwise apply the skipping class (makes the text smaller)
		else if (json.service_status != "No Service") {
			$new_stop.addClass('skipping')
		}
		//Finally add the click event
		$new_stop.click({stop_uid : stop_uid}, load_stop_from_event)
	})
	// Show the page now
	set_history_state('route', route_id.toLowerCase(), '')
	show_page('route')
}

// STOP PAGE

function load_stop_from_event(event) {
	load_stop(event.data.stop_uid)
}

function load_stop(stop_uid) {
	hide_all_pages()
	setTimeout(function(){
		$.ajax({dataType: "json", url: "/json/stops/" + stop_uid + ".json", success: update_stop, cache: false});
	},fade_time)
}

function update_stop(json, status) {
	// Basic information
	var stop_uid = json.stop_uid
	var name = json.name 
	$('#stop-title', $stop).text(name)

	// Next construct the list of trips
	var $lot = $('#stop-list-of-trips', $stop)
	$lot.html('') 
	var all_assigned = true // this variable will determine whether the explanation for starred trips will need to printed.
	var feed_problem = false // this will determine whether an explanation for trips from deleted feeds will need to be printed
	var min_feed_delay = 100000 //minimum feed delay gives the "at least" delay in minutes for the station

	// Now iterate over each direction.
	$.each(json.directions, function(){
		// Make the directions title
		var direction_name = this.name
		$lot.append('<div class="lot-direction">' + direction_name + '</div>')
		if (this.trips.length == 0) {
			$lot.append('<div class="lot-all-assigned">No trains scheduled.</div>')
		}
		// Iterate over each trip.
		$.each(this.trips, function(){
			var route_id = this.route_id
			var terminus = this.terminus
			var minutes = ''
			// First calculate the number of seconds until the trip arrives.
			if (this.departure_time == null) {
				var seconds = (this.arrival_time - current_time) // in this case, the train is going nowhere...should be noted
			}
			else {
				var seconds = (this.departure_time - current_time)
			}
			// Now based on the seconds, calculate the minutes display.
			if (seconds >= 60) {
				minutes = Math.floor(seconds/60)
			}
			else if (seconds >= 30) {
				minutes = '&#189;'
			}
			else {
				minutes = 'Arr'
			}
			// If the trip is not assigned, add a start to the terminus text.
			if (current_time - this.feed_last_updated > 180) {
				feed_problem = true
				terminus = terminus + ' <img src="/images/icons/ex.svg" class="lot-entry-warning">'
				if (current_time - this.feed_last_updated < min_feed_delay) {
					min_feed_delay = current_time - this.feed_last_updated
				}
			}
			else if (this.is_assigned == false) {
				all_assigned = false
				terminus = terminus + ' &#9733;'
			}
			// Put the HTML in the list of trips
			$new_trip = $('<div class="lot-entry">' +
				      '    <img class="lot-entry-route-logo" src="/images/routes/' + route_id.toLowerCase() + '.svg">' +
				      '    <div class="lot-entry-time">' + minutes + '</div>' + terminus +
				      '</div>')
			$lot.append($new_trip)
			$new_trip.click({trip_uid : this.trip_uid}, load_trip_from_event)
		})
	})
	// Put in the stars or feed delay explanation, if necessary.
	if (feed_problem) {
		$lot.append('<div class="lot-all-assigned">' +
			    '    The feeds for trains marked with <img src="/images/icons/ex.svg"> have not been updated for at least ' +
			         Math.floor(min_feed_delay/60) +
			    '    minutes; predictions may be inaccurate.' + 
			    '</div>')
	}
	if (!all_assigned) {
		$lot.append('<div class="lot-all-assigned">' +
			    '    Trains marked with &#9733; are scheduled and have not entered into service yet.' + 
			    '</div>')
	}
	// If this stop has sibling stops, display the sibling stops header and them list the stops
	if(json.sibling_stops.length > 0) {
		$lot.append('<div class="lot-other-platforms-header">Other platforms at this station</div>')
		$.each(json.sibling_stops, function(){
			var images = ''
			$.each(this.daytime_routes, function(){
				images = images + '<img src="/images/routes/' + this.toLowerCase() + '.svg">'
			})
			$new_sibling = $('<div class="lot-other-platform">' + images + '</div>')
			$lot.append($new_sibling)
			$new_sibling.click({stop_uid : this.stop_uid}, load_stop_from_event)

		})
	}
	set_history_state('stop', stop_uid, 'union-sq/')
	show_page('stop')
}

// TRIP PAGE 

function load_trip_from_event(event) {
	load_trip(event.data.trip_uid)
}

function load_trip(trip_uid) {
	hide_all_pages()
	setTimeout(function(){
		$.ajax({dataType: "json", url: "/json/trips/" + trip_uid + ".json", success: update_trip, cache: false});

	},fade_time)
}

function update_trip(json, status) {
	// Set the basic page information
	$('#trip-header-route-logo img', $trip).attr('src','/images/routes/' + json.route_id.toLowerCase() + '.svg')
	$('#trip-header-origin', $trip).text(json.origin_name)
	$('#trip-header-terminus', $trip).text(json.terminating_stop_name)
	$('#rtr-trip-uid', $trip).text(json.trip_uid)
	$('#train-id', $trip).text(json.train_id)

	// Calculate the update time in minutes, and add that too
	m = Math.ceil((current_time - json.update_time)/60)
	if (m == 1) {
		$('#data-last-updated', $trip).text('1 minute ago')
	}
	else {
		$('#data-last-updated', $trip).text(m + ' minutes ago')
	}

	// Now make the list of stops structure
	var $los = $('#trip-list-of-stops', $trip)
	$platform_cont = $los
	$los.html('<div class="los-route-bar"></div>' +
		  '<div class="los-route-start"></div>' +
		  '<div class="los-route-end"></div>')
	// If the full data set is not present, the origin inferred from the train_id and the missing data are shown
	if (!json.full_dataset) {
		$los.append('<div class="los-entry">' + 
			    '    <div class="los-stop-marker"></div>' + json.origin_name +
			    '</div>' + 
			    '<div class="los-data-missing skipping cream">(Some data missing)</div>')
	}

	// Now iterate over the stops
	var first = true
	var future = false
	$.each(json.stops,function(){
		// If no future stops have been placed and the present stop being placed is in the future, add the 'in transit' information
		if(!future && this.future == 1)
		{
			future = true
			$('#next-stop', $trip).text(this.name)
			// If this is not the first stop, this trip has already left. Add the in transit element
			if (!first || !json.full_dataset)
			{
				$('#trip-not-left', $trip).css('display', 'none')
				$los.append('<div class="los-separator">' +
					    '    <div id="los-separator-trip">' +
					    '	     <div id="los-separator-trip-arrow"></div>' + 
					    '	     <div id="los-separator-trip-route-logo">' + 
					    '            <img src="/images/routes/' + json.route_id.toLowerCase() + '.svg">' +
					    '	     </div>' +
					    '	     <div id="los-separator-trip-text">En route to<br /> ' + this.name + '</div>' +
					    '    </div>' + 
					    '</div>')
			}
			// Otherwise this trip has not left. Add that note.
			else {
				$('#trip-not-left').css('display', 'block')
			}
		}
		first = false

		// Now place the stop proper
		// Get the information
		var stop_uid = this.stop_uid
		var name = this.name
		t = this.arrival_time
		if (t == null) {
			t = this.departure_time
		}
		// Place in the element, and add the element to the lsit
		$new_stop = $('<div class="los-entry">' + 
			      '    <div class="los-stop-marker"></div>' + 
			      '    <div class="los-time">' + t + '</div>' + name +
			      '</div>')
		$los.append($new_stop)
		//Finally add the click event
		$new_stop.click({stop_uid : stop_uid}, load_stop_from_event)
	})
	$los.set_color(route_colors[json.route_id.toLowerCase()])
	set_history_state('trip', json.trip_uid, 'union-sq/')
	show_page('trip')
}



