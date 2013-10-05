beforeEach(function(){

    this.addMatchers({
        toHave: function(expected){
            var actual = this.actual;

            if ((typeof expected === 'string') && (actual[expected])) {
                return true;
            } else {
                return _(expected).every( function(prop){ return u.existy(actual[prop]);});
            }


        }
    })
})
