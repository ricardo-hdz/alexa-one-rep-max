var AlexaAppServer = require('alexa-app-server');
AlexaAppServer.start({
	server_root: '../',     // Path to root 
	// public_html:"public_html", // Static content 
	app_dir:"../",            // Where alexa-app modules are stored 
	app_root:"/alexa/",        // Service root 
	port:80                    // What port to use, duh 
});