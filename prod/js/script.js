$(document).ready(function() {
	var socket 		= io.connect(),
	$form_message 	= $('#form_message'),
	$form_username	= $('#form_username'),
	$username 		= $('#username'),
	$error			= $('.error'),
	$chat			= $('#chat'),
	$chat_wrap		= $('#chat_wrap'),
	$username_wrap	= $('#username_wrap'),
	$message 		= $('#message'), 
	$username_list	= $('#user-list');

	$form_username.submit(function(e) {
		e.preventDefault();
		socket.emit('new user', $username.val(), function(data) {
			if(!data){
				$error.addClass('active');
			} else {
				$error.removeClass('active');
				$username_wrap.hide();
				$chat_wrap.show();

			}
		});
		$username.val('');
	});

	$username.keypress(function(e) {
		if (e.which == 13) {
			$form_username.submit();
			return false;
		}
	})

	$form_message.submit(function(e) {
		e.preventDefault();
		socket.emit('send message', $message.val());
		$message.val('');
	});

	$message.keypress(function(e) {
		if (e.which == 13) {
    		$form_message.submit();
    		return false;    
  		}
	});

	socket.on('new message', function(data) {
		$chat.append('<b>' + data.name + ':</b> ' + data.msg + '<br />');
		$chat.animate({ 
			scrollTop: $chat.prop("scrollHeight") - $chat.height() }, 
			500);
	});

	socket.on('usernames', function(usernames) {
		
		var list = '';
		for (var i = 0; i < usernames.length; i++) {
			list = list + usernames[i] + '<br />';
		};

		$username_list.html(list);		
		
		$username_list.animate({ 
			scrollTop: $username_list.prop("scrollHeight") - $username_list.height() }, 
			500);
	})
})