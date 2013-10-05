beforeEach(function(){

    this.addMatchers({
        toHave: function(expected){
            var actual = this.actual;
            if ((typeof expected === 'string') && (actual[expected])) {
                return true;
            } else if ((typeof expected === 'array') && (_.every( expected, function(prop){ u.existy(actual[prop]) } ))) {
                return true;
            }else {
                return false;
            }


        }
    })
})
