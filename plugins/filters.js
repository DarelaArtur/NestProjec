import Vue from 'vue'
import moment from "moment"
import momentTimezone from "moment-timezone"

Vue.filter('stringMonth', function (value) {
     
    return moment().month(value).format("MMMM");
});