$(document).ready(function () {
  fetchTwitchJSON(drawInterface);

  $("#all").click(function() {
    $(".indicator-online, .indicator-offline").closest("a").show();
    //$(".indicator-offline").closest("a").show();
    console.log("Test");
  });
  $("#online").click(function(){
    $(".indicator-offline").closest("a").hide();
    $(".indicator-online").closest("a").show();
  });
  $("#offline").click(function() {
    $(".indicator-online").closest("a").hide();
    $(".indicator-offline").closest("a").show();
  });
});

function fetchTwitchJSON(callback) {
    var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                      "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas",
                     "comster404", "brunofin"];
    var twitchData = [];

  for(i=0;i<usernames.length;i++) {
    var currentUser = usernames[i];
    jsonCalls(currentUser, callback);
  }
}

function jsonCalls(i, callback) {
  $.getJSON("https://api.twitch.tv/kraken/channels/" + i +
            "?callback=?", function(channel) {
      $.getJSON("https://api.twitch.tv/kraken/streams/" + i +
                "?callback=?", function(stream) {
                  //console.log(stream);
                  if (channel.status === 422) {
                    channel.display_name = i;
                  }
                  callback(channel, stream);
      });
  });
}

function drawInterface(channel, stream) {
    var displayName = channel.display_name;
    var logo = channel.logo;
    var indicatorClass = "indicator-offline";
    var streamingTitle = "";
    if(stream.stream != null) {
      indicatorClass = "indicator-online";
      streamingTitle = "<div class='status'>" + stream.stream.channel.status + "</div>";
    }
    else {
      streamingTitle = "";
    }
    if(channel.status === 422) {
      streamingTitle = "<div class='status'>Account Closed</div>";
      logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/2000px-Question_Mark.svg.png";
    }
    var html = "<a href='" + channel.url +"' target='_blank'><div class='row user'><img class='logo' src='" + logo + "'><h3>" + displayName + "</h3>" + "<div class='pull-right " + indicatorClass + "'></div>" + streamingTitle  + "</div></a>";
    $("#content").append(html);
}
