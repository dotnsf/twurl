//.  app.js
var express = require( 'express' ),
    app = express();
var { execSync } = require( 'child_process' );
var settings = require( './settings' );

app.get( '/', function( req, res ){
  var screen_name = req.query.screen_name;
  if( screen_name ){
    try{
      var stdout = execSync( settings.twurl_command + ' /1.1/users/show.json?screen_name=' + screen_name );
      var obj = JSON.parse( stdout.toString() );
      var profile_image_url_https = obj.profile_image_url_https;
      res.redirect( profile_image_url_https );
    }catch( e ){
      return res.status( 403 ).send( { status: false, error: e } );
    }
  }else{
    return res.status( 403 ).send( { status: false, error: 'No screen_name provided.' } );
  }
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
