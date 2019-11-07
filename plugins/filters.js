import Vue from 'vue'
import moment from "moment"
import momentTimezone from "moment-timezone"

Vue.filter('stringMonth', function (value) {
     
    return moment().month(value).format("MMMM");
});

Vue.filter('languageFilter', function (value) {
    var language = 'English'
    
    if(value == 'PT') {
        language = 'Português'
    } else if (value == 'ES') {
        language = 'Español'
    }
     
    return language;
});

Vue.filter('currencyFilter', function (value) {
    var currency = 'Euro - €'
    
    if(value == 'R$') {
        currency = 'Real - R$'

    } else if (value == '$') {
        currency = 'Dollar - $'
    }
     
    return currency;
});
