	
	$(function() {
	    $(window).load(function() {
	       loaded = true;
	    });
	    setTimeout(function() { 
	        if(!loaded) {
	            window.location.reload();
	        }  
	    },time);
	});

	/**
	 * GUI to GUI communication between self and Marcom  
	 * Login credentials are sent,
	 * Custom code in Marcom handler will submit the form 
	 * Redirect self to user page 
	 * 
	 **/

	function login(user, password) {
		layer = $("<div></div>");
		layer.css("position", "fixed")
			.css("width", "100%")
			.css("height", "100%")
			.css("background", "rgba(103, 103, 103, 0.7)")
			.css("z-index", "10000")
			.css("top", "0px")
			.css("left", "0px");
		$("body").append(layer);
		$('html, body').css("cursor", "wait");
		
		var loginPage = "https://marcomcentral.app.pti.com/printone/login.aspx?company_id=17351&amp;CustomDomain=university.ricoh-cec.com&amp;EpsilonDomain=university.ricoh-cec.com";
		//var homePage = "http://university.ricoh-cec.com";
		var homePage = "https://marcomcentral.app.pti.com/printone/addToCart.aspx?uigroup_id=26727&product_id=17";
		
		var source = $("#marcomiframe");
		source.attr("src", loginPage);

		loginObj = {me: "Marcom University", user: user, password: password };
		var marcomLoaded = false;
		var time = 20000;
		var dontTry = false;
		// If frame is not loaded in 20 second then remove the layer
		setTimeout(function() { 
	        if(!marcomLoaded) {
	        	dontTry = true;
	        	layer.remove();
	        	$('html, body').css("cursor", "auto");
	        }  
	    }, time);
		// Dupa ce s-a incarcat continutul din iframe se face un init cu sursa
		// Destinatia ar trebui sa salveze sursa pentru un viitor dialog
		source.on('load', function(){
					// Se transmite un object cu atributele necesare
					// si un targetOrigin: Specifies what the origin of otherWindow must be for the event to be dispatched 
					// In cazul de fata se apeleaza o pagina din Marcom 
					if (dontTry)
						return;
					this.contentWindow.postMessage(JSON.stringify(loginObj), 'https://marcomcentral.app.pti.com');
					$(this).off();
					marcomLoaded = true;
		});

		// Se adauga handlerul pentru evenimentul de receivedMessage from destination
		function messageEvent(event) {
			var origin = event.origin || event.originalEvent.origin;
			if (origin !== "https://marcomcentral.app.pti.com")
				return;
			$('html, body').css("cursor", "auto");
			if (event.data == "logged!") {
				window.location.href = homePage;
			} else {
				if (event.data.includes("timeout")) {
					layer.remove();
				} else {
					window.location.href = loginPage;
				}
			}
			
			window.removeEventListener("message", messageEvent);
		};

		// Se adauga un listener pentru message
		window.addEventListener("message", messageEvent, false);
	}


/**


    CUSTOMIZE LOGIN MARCOM PAGE CODE 
	<script>
	jQuery(document).ready(function() {
		var channel;
	
		messageHandler = function(e) {
			window.removeEventListener('message', messageHandler);
			message = JSON.parse(e.data);
			if (!message.me)
				return;
			if  (message.me != "Marcom University")
				return;
			 
			channel = e;
	
			theForm.ctl00_content_Login_txtLoginId.value = message.user;
			theForm.ctl00_content_Login_txtPassword.value = message.password;
			theForm.__EVENTTARGET.value = "ctl00$content$Login$btnLogin";
	        theForm.__EVENTARGUMENT.value = "";
			
			jQuery.ajax({
				type: theForm.method,
				url: theForm.action,
				data: $(theForm).serialize(),
				success: function (data, textStatus, jqXHR) {
					channel.source.postMessage("logged!", channel.origin);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					channel.source.postMessage(textStatus + " " +  + errorThrown, channel.origin);
				},
				done: function(data) {
					channel.source.postMessage("done!", channel.origin);
				},
				timeout: 10000 
			});
	
		}
	
		window.addEventListener('message', messageHandler, false);
	});
	
	</script>

**/