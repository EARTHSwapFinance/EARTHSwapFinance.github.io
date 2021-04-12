if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	$('.wrapper').css('min-height', '-webkit-fill-available');
}

function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function openDemo() {
	$('#aboutModal').modal('hide');
	$('#demoModal').modal('show');
}

$('#copyreferral').on('click', function(e) {
	e.preventDefault();
	var copyText = document.getElementById("referralLinkInput");
	copyText.select(); 
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	$('#copiedMessage').text('copied to clipboard');
});

$('#waitlist').on('click', function(e) {
	e.preventDefault();


	if (validateEmail($('#email').val())) {
		$('#email').css('border', '1px solid #333');
		$('#waitlist').attr('disabled', true);
		$('#waitlist').html('join the waitlist <i class="fas fa-spinner fa-spin"></i>');

		$.ajax({
			url: '/waitlist',
			type: "POST",
			data: {
				"email": $('#email').val(),
				"referrer": $('#referrer').val()
			},
			success: function(res) {
				
				$('#referralLinkInput').val('https://earthswapfinance.github.io/?ref=' + res.waitlistId);
				$('#waitlistSignup').hide();
				$('#referralLink').show();

			},
			error: function(jqXHR, textStatus, errorMessage) {
				alert(errorMessage);
				$('#waitlist').html('join the waitlist');
			}
		});
	} else {
		$('#email').css('border', '1px solid red');
		$('#waitlist').html('join the waitlist');
	}

});

$('#referralLinkInput').keypress(function(e) {
    e.preventDefault();
});

setInterval(function() {
	$.ajax({
		url: '/refresh',
		type: "POST",
		data: {},
		success: function(res) {
		},
		error: function(jqXHR, textStatus, errorMessage) {
			alert(errorMessage);
		}
	});
}, 20 * 60 * 1000);
