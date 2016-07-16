TrelloPowerUp.initialize({
			'board-buttons': function(t, board) {
				
				return [
				{
					icon: './images/trello-icon-F6F6F6.svg',
					text: "Student's Google Calendar",
					// Pass a URL instead of a callback to make a simple link

					//url: 'https://calendar.google.com/calendar/b/render?aaronliu12@gmail.com#main_7',
					callback: function(t, board) {
						//var board = t.board('name');
						t.board('name').then(function(board) {
							localStorage.setItem("boardname", board.name);
							console.log(board.name);
						});
						t.overlay({url: "./connect.html"
						})

				}
				}
				];
			},
			'card-badges': function(t, card) {
				if(card.context.card === '563b532e4e998410d0d88e62') {
					return [{
						icon: './images/trello-icon-999.svg',
						text: '4'
					}];
				} else {
					return [];
				}
			},
			'card-detail-badges': function(t, card) {
				console.log("rendering card detail badge");
				return [{
					title: "Card Badge",
					text: 'OK'
					
					
				}];
			},
			'attachment-sections': function(t, options) {
				var attachments = options.entries;
				console.log(attachments.length + " attachments found.");
				console.log("This card has attachments ", attachments);
				var claims = [];

				for (var i = attachments.length - 1; i >= 0; i--) {
					attachment = attachments[i];
					if(attachment.url === 'https://trello.com/') {
						claims.push(attachment);
						console.log("Claiming attachment: " + attachment.id);
					}
				}

				if(claims.length === 0) {
					console.log('No attachments claimed');
					return [];
				}
				
				return {
					claimed: claims,
					icon: './images/trello-icon.png',
					title: function(){
						return 'Attachment Section Title';
					},
					content: {
						type: 'iframe',
						url: t.signUrl('./attachment-section.html', { url: claims[0].url })
					}
				};



				/*
				Here's a sample with two sections:

				return [{
					claimed: claims,
					icon: './images/trello-icon-999.svg',
					title: "Attachment Section Title",
					content: {
						type: 'iframe',
						url: t.signUrl('./attachment-section.html')
					}
				},
				{
					claimed: claims,
					icon: './images/trello-icon-999.svg',
					title: "Attachment Section 2 Title",
					content: {
						type: 'iframe',
						url: t.signUrl('./attachment-section.html')
					}
				}];
				*/
			},
			'attachment-thumbnail': function(t, attachment) {
				if(attachment.url == "https://developers.trello.com/") {
					return {
						url: "https://developers.trello.com/",
						openText: "Open With Sample",
						image: {
							url: './images/trello-icon.png',
							logo: './images/trello-icon.png'
						},
						initialize: {
							type: 'iframe',
							url: t.signUrl(TrelloPowerUp.util.relativeUrl('authorize-link.html'))
						}
					};
				} else {
					throw t.NotHandled("Not a handled URL");
				}
			},
			'card-buttons': function(t, card) {
				return [
				// Button with a nested popup callback
				{
					icon: './images/trello-icon-999.svg',
					text: "Student's Google Calendar",
					callback: function(t, card) {
						t.popup({
							title: 'Options',
							items: [
								{
									text: "Nested Popup",
									callback: function(t) {
										console.log("Option 1 chosen");
										t.popup({
											title: "Nested Options",
											items: [
												{text: "Link",url:"https://developers.trello.com/"},
												{text: "Link",url:"https://developers.trello.com/"}]

										});
									}
								},
								{
									text: "Board Bar",
									callback: function(t) {
										t.boardBar({
											url: "bar-contents.html",
											height:550
										});
										t.closePopup();
									}
								},
								{
									text: 'Popup Iframe',
									callback: function(t) {
										t.popup({
											title: 'Popup Iframe',
											url: t.signUrl("https://calendar.google.com/calendar/embed?src=aaron%40app-ark.com&ctz=Asia/Taipei"),
											url: "https://calendar.google.com/calendar/embed?src=aaron%40app-ark.com&ctz=Asia/Taipei"
										});
									}
								}
								,
								{
									text: "Authorize with Trello",
									callback: function(t) {
										t.popup({
											title: "Auth needed",
											url: 'auth-popup.html'});	
										}
								}
							]
						});
					}
				}];
			},
			'format-url': function(t, options) {
				if(options.url.length > 20) {
					return {
						icon: './images/trello-icon.png'

					};
				} else {
					throw t.NotHandled("Not a handled URL");
				}
			},
			'card-from-url': function(t, options) {
				return {
					name: 'All New Cards have this name',
					desc: 'All New cards have this description'
				};
			},


		});