var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

/*
- Open a connection to /gs-guide-websocket
- SockJS server waits connections
- Client subscribes to destination
- Destination append paragraph for displaying reply message
- showGreeting is the autoreply that will take parse JSON that has reply key
*/
function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).reply);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

/*
retrieve the message entered by user and use STOMP client to send to /app/hello
destination, where MessageController will receive it
*/
function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'message': $("#name").val()}));
}

function showGreeting(reply) {
    $("#greetings").append("<tr><td>" + reply + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});