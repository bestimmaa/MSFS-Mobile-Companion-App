let altitude;
let fuel_percentage;
let vertical_speed;
let compass;
let airspeed;
let latitude;
let longitude;

let autopilot_master;
let autopilot_nav_selected;
let autopilot_wing_leveler;
let autopilot_heading_lock;
let autopilot_heading_lock_dir;
let autopilot_altitude_lock;
let autopilot_altitude_lock_var;
let autopilot_attitude_hold;
let autopilot_glidescope_hold;
let autopilot_approach_hold;
let autopilot_backcourse_hold;
let autopilot_vertical_hold;
let autopilot_vertical_hold_var;
let autopilot_pitch_hold;
let autopilot_pitch_hold_ref;
let autopilot_flight_director_active;
let autopilot_airspeed_hold;
let autopilot_airspeed_hold_var;

let gear_handle_position;

window.setInterval(function(){
    getSimulatorData();
    displayData()
    updateMap()
}, 2000);


function getSimulatorData() {
    $.getJSON($SCRIPT_ROOT + '/ui', {}, function(data) {

        //Navigation
        altitude = data.ALTITUDE;
        vertical_speed = data.VERTICAL_SPEED;
        compass = data.MAGNETIC_COMPASS;
        airspeed = data.AIRSPEED_INDICATE;
        latitude = data.LATITUDE;
        longitude = data.LONGITUDE;

        //Fuel
        fuel_percentage = data.FUEL_PERCENTAGE;

        //Autopilot
        autopilot_master = data.AUTOPILOT_MASTER;
        autopilot_nav_selected = data.AUTOPILOT_NAV_SELECTED;
        autopilot_wing_leveler = data.AUTOPILOT_WING_LEVELER;
        autopilot_heading_lock = data.AUTOPILOT_HEADING_LOCK;
        autopilot_heading_lock_dir = data.AUTOPILOT_HEADING_LOCK_DIR;
        autopilot_altitude_lock = data.AUTOPILOT_ALTITUDE_LOCK;
        autopilot_altitude_lock_var = data.AUTOPILOT_ALTITUDE_LOCK_VAR;
        autopilot_attitude_hold = data.AUTOPILOT_ATTITUDE_HOLD;
        autopilot_glidescope_hold = data.AUTOPILOT_GLIDESLOPE_HOLD;
        autopilot_approach_hold = data.AUTOPILOT_APPROACH_HOLD;
        autopilot_backcourse_hold = data.AUTOPILOT_BACKCOURSE_HOLD;
        autopilot_vertical_hold = data.AUTOPILOT_VERTICAL_HOLD
        autopilot_vertical_hold_var = data.AUTOPILOT_VERTICAL_HOLD_VAR;
        autopilot_pitch_hold = data.AUTOPILOT_PITCH_HOLD;
        autopilot_pitch_hold_ref = data.AUTOPILOT_PITCH_HOLD_REF;
        autopilot_flight_director_active = data.AUTOPILOT_FLIGHT_DIRECTOR_ACTIVE
        autopilot_airspeed_hold = data.AUTOPILOT_AIRSPEED_HOLD
        autopilot_airspeed_hold_var = data.AUTOPILOT_AIRSPEED_HOLD_VAR

        //Control surfaces
        gear_handle_position = data.GEAR_HANDLE_POSITION

    });
    return false;
}


function displayData() {
    //Navigation
    $("#altitude").text(altitude);
    $("#compass").text(compass);
    $("#vertical-speed").text(vertical_speed);
    $("#airspeed").text(airspeed);

    //Fuel
    $("#fuel-percentage").text(fuel_percentage);
    $("#fuel-percentage-bar").css("width", fuel_percentage+"%");

    //Autopilot
    $("#autopilot-master").prop('checked', autopilot_master).change()
    $("#autopilot_wing_leveler").prop('checked', autopilot_wing_leveler).change()
    $("#autopilot_heading_lock").prop('checked', autopilot_heading_lock).change()
    $("#autopilot_altitude_lock").prop('checked', autopilot_altitude_lock).change()
    $("#autopilot_airspeed_hold").prop('checked', autopilot_airspeed_hold).change()
    $("#autopilot_attitude_hold").prop('checked', autopilot_attitude_hold).change()
    $("#autopilot_pitch_hold").prop('checked', autopilot_pitch_hold).change()
    $("#autopilot_backcourse_hold").prop('checked', autopilot_backcourse_hold).change()
    $("#autopilot_glidescope_hold").prop('checked', autopilot_glidescope_hold).change()
    $("#autopilot_approach_hold").prop('checked', autopilot_approach_hold).change()

    $("#autopilot_heading_lock_dir").attr('placeholder', autopilot_heading_lock_dir);
    $("#autopilot_altitude_lock_var").attr('placeholder', autopilot_altitude_lock_var);
    $("#autopilot_airspeed_hold_var").attr('placeholder', autopilot_airspeed_hold_var);
    $("#autopilot_pitch_hold_ref").attr('placeholder', autopilot_pitch_hold_ref);

    //Control surfaces
    $("#gear-handle-position").html(gear_handle_position);
    if (gear_handle_position === "UP"){
        $("#gear-handle-position").removeClass("btn-success").addClass("btn-danger");
    }
    if (gear_handle_position === "DOWN"){
        $("#gear-handle-position").removeClass("btn-danger").addClass("btn-success");
    }




}

function toggleFollowPlane() {
    followPlane = !followPlane;
    if (followPlane === true) {
        $("#followMode").text("Moving map enabled")
        $("#followModeButton").removeClass("btn-outline-danger").addClass("btn-primary")
    }
    if (followPlane === false) {
        $("#followMode").text("Moving map disabled")
        $("#followModeButton").removeClass("btn-primary").addClass("btn-outline-danger")
    }
}

function updateMap() {
    var pos = L.latLng(latitude, longitude);

    marker.slideTo(	pos, {
        duration: 1500,
    });
    marker.setRotationAngle(compass);

    if (followPlane === true) {
        map.panTo(pos);
    }
}

function setSimDatapoint(datapointToSet, valueToUse) {
    url_to_call = "/datapoint/"+datapointToSet+"/set";
    $.post( url_to_call, { value_to_use: valueToUse } );
}

function triggerSimEvent(eventToTrigger, valueToUse){
    url_to_call = "/event/"+datapointToSet+"/trigger";
    $.post( url_to_call, { value_to_use: valueToUse } );
}





