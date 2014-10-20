// Global jQuery AJAX Settings
$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  }
});

// Customize the Renderer to use Namespacing
Backbone.Marionette.Renderer.render = function(template, data) {
  return IssueTrackerTemplates[template](data);
};

// Create the Application
window.IssueTrackerApp = new Backbone.Marionette.Application();

// Navigate to a route
IssueTrackerApp.navigate = function(route, options) {
  options = options || {};
  Backbone.history.navigate(route, options);
};

// Retrieve the current route
IssueTrackerApp.getCurrentRoute = function() {
  return Backbone.history.fragment;
};
  
// Create the top-level Regions
IssueTrackerApp.addRegions({
  headerRegion : '#header-region',
  messageRegion : '#message-region',
  mainRegion   : '#main-region',
  footerRegion : '#footer-region'
});

// Initialize the Router
IssueTrackerApp.on('start', function(options) {
  logger.debug("Backbone.history.start");
  Backbone.history.start();
});


// Start the Application
$( function() {
  // Configure log4javascript Library
  window.logger = log4javascript.getLogger();
  consoleAppender = new log4javascript.BrowserConsoleAppender();
  consoleAppender.setLayout(new log4javascript.PatternLayout('%d{HH:mm:ss} %-5p - %m'));
  window.logger.addAppender(consoleAppender);
  
  // Start Marionette Application
  logger.debug("IssueTrackerApp.start");
  IssueTrackerApp.start();
});

